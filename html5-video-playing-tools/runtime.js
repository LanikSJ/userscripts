'use strict';

// Shared browser state and small DOM/URL utilities.
const w = unsafeWindow || window;
// Target origin for frame messaging: use our own origin when the top frame is readable
// (same origin), otherwise fall back to '*' because cross-origin player frames only accept
// a wildcard target origin.
const topOrigin = (() => {
  try {
    return top.location.origin;
  } catch (e) {
    return '*';
  }
})();
const postToTop = msg => {
  if (top !== self) top.postMessage(msg, topOrigin);
};
const { host, pathname: path } = location;
const d = document, find = [].find;
let tipBox, tipTimer, v, _fp, _fs, by; // by: document.body
const observeOpt = { childList: true, subtree: true };
const noopFn = function () { /* intentionally empty */ };
const validEl = e => e && e.offsetWidth > 1;
// <video> and <audio> both expose the media element API
const isMediaEl = el => !!el && (el.tagName === 'VIDEO' || el.tagName === 'AUDIO');
const q = (css, p = d) => p.querySelector(css);
const log = console.log.bind(
  console,
  MSG.console,
  'color:#c3c;font-size:1.2em',
  GM_info.script.name,
  GM_info.script.homepage
);
const gmFuncOfCheckMenu = (title, saveName, defaultVal = true) => {
  const r = GM_getValue(saveName, defaultVal);
  if (r) title = '√  ' + title;
  GM_registerMenuCommand(title, () => {
    GM_setValue(saveName, !r);
    location.reload();
  });
  return r;
};
const sleep = ms => new Promise(resolve => { setTimeout(resolve, ms) });
const hookAttachShadow = (cb) => {
  try {
    const _attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (opt) {
      opt.mode = 'open';
      const shadowRoot = _attachShadow.call(this, opt);
      cb(shadowRoot);
      return shadowRoot;
    };
  } catch (e) {
    console.error('Hack attachShadow error', e);
  }
};
// read an inline or computed CSS value; only plain property names are accepted so
// the style object is never indexed with a dynamic key
const getStyle = (o, s) => {
  if (typeof s !== 'string' || !/^[a-zA-Z-]+$/.test(s)) return '';
  s = s.replace(/([A-Z])/g, '-$1').toLowerCase();
  const inline = o.style.getPropertyValue(s);
  if (inline) return inline;
  const cs = typeof getComputedStyle === 'function' ? getComputedStyle(o, '') : null;
  return (cs && cs.getPropertyValue(s)) || '';
};
const doClick = e => {
  if (typeof e === 'string') e = q(e);
  if (e) {
    if (e.click) e.click();
    else e.dispatchEvent(new MouseEvent('click'));
  }
};
const clickDualButton = btn => { // 2-in-1 button, Element.previousElementSibling
  if (!btn.nextElementSibling || getStyle(btn, 'display') !== 'none') doClick(btn);
  else doClick(btn.nextElementSibling);
};
const polling = (cb, condition, stop = true) => {
  const fn = typeof condition === 'string' ? q.bind(null, condition) : condition;
  const t = setInterval(() => {
    if (fn()) {
      if (stop) clearInterval(t);
      cb();
    }
  }, 300);
  return t;
};
const goNextMV = () => {
  const m = /(\d+)(\D*)$/.exec(location.pathname);
  const d = +m[1] + 1;
  location.assign(location.pathname.slice(0, m.index) + d + m[2]);
};
// "www.youtube.com" → "youtube", "www.news.co.uk" → "news"
const getMainDomain = host => {
  const a = host.split('.');
  const i = a.length - 2 - Number(/^(com?|cc|tv|net|org|gov|edu)$/.test(a.at(a.length - 2) || ''));
  return a.at(i) || host;
};
// URL that ends in a numeric episode id, e.g. /watch/123, /123/ or /123.html
const numIdRe = /[_\W]\d+$/;
const numIdDirRe = /[_\W]\d+\/$/;
const numIdExtRe = /[_\W]\d+\.[a-z]{3,8}$/;
const isNumIdURL = p => numIdRe.test(p) || numIdDirRe.test(p) || numIdExtRe.test(p);
const inRange = (n, min, max) => Math.max(min, n) === Math.min(n, max);
const adjustRate = n => {
  n += v.playbackRate;
  if (n < 0.1) v.playbackRate = 0.1;
  else if (n > 16) v.playbackRate = 16;
  else v.playbackRate = +n.toFixed(2);
};
const adjustVolume = n => {
  n += v.volume;
  if (inRange(n, 0, 1)) v.volume = +n.toFixed(2);
};
const tip = (msg) => {
  if (!tipBox || !tipBox.offsetHeight) {
    // build the tip element without injecting an HTML string
    tipBox = d.createElement('div');
    Object.assign(tipBox.style, {
      maxWidth: '455px',
      minWidth: '333px',
      background: '#EEE',
      color: '#111',
      height: '22px',
      top: '-30px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      borderRadius: '8px',
      border: '1px solid orange',
      textAlign: 'center',
      fontSize: '15px',
      position: 'fixed',
      zIndex: '2147483647',
      transition: 'top .3s ease-in-out'
    });
    by.appendChild(tipBox);
  }
  if (!msg?.length) return;
  // slide the reused element in, hold it, then slide it back out
  clearTimeout(tipTimer);
  tipBox.textContent = msg;
  tipBox.style.width = `${msg.length * 15}px`;
  tipBox.style.top = '190px';
  tipTimer = setTimeout(() => { tipBox.style.top = '-30px'; }, 1900);
};
const u = getMainDomain(host);
const cfg = {
  isLive: !1,
  disableDBLClick: !1,
  isClickOnVideo: !1,
  multipleV: !1, // multi-video page
  isNumURL: !1 // URL with numeric episodes
};
const bus = new Vue();
if (typeof window.onurlchange === 'undefined') {
  history.pushState = (f => function pushState() {
    const ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('urlchange'));
    return ret;
  })(history.pushState);

  history.replaceState = (f => function replaceState() {
    const ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('urlchange'));
    return ret;
  })(history.replaceState);

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('urlchange'))
  });
};
