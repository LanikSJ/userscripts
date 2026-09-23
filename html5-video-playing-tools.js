// ==UserScript==
// @name         HTML5 Video Playing Tools
// @namespace    https://greasyfork.org/users/7036
// @version      2.2.1.260920
// @description  Enable hotkeys for HTML5 playback: video screenshot; enable/disable picture-in-picture; copy cached video; send any video to full screen or browser window size; fast forward, rewind, pause/play, volume, skip to next video, skip to previous or next frame, set playback speed. Supported sites: YouTube, TED, Twitch, Vimeo, Dailymotion, Odysee, Kick, PeerTube; custom sites can be added (any URL containing "play")
// @downloadURL  https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools.js
// @updateURL    https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools.js
// @homepageURL  https://laniksj.github.io/userscripts
// @homepage     https://github.com/LanikSJ/userscripts
// @author       LanikSJ
// @license      MIT
// @match        https://odysee.com/*
// @match        https://vimeo.com/*
// @match        https://www.dailymotion.com/video/*
// @match        https://www.ted.com/talks/*
// @match        https://www.twitch.tv/*
// @match        https://www.youtube.com/*
// @include      /^https:\/\/kick\.com\/[^/]*?$/
// @include      /^https:\/\/[^/]+\/w\/[^/]*?$/
// @include      */play*
// @include      *play/*
// @exclude      https://www.dj92cc.net/dance/play/id/*
// @inject-into  content
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        window.onurlchange
// @GM_info
// ==/UserScript==

/* globals $, Vue, GM_addStyle, GM_getValue, GM_info, GM_registerMenuCommand, GM_setValue, unsafeWindow */

'use strict';

const curLang = navigator.language.slice(0, 2);
// Thanks to Dario Costa for the English and Italian translations
const i18n = {
  'en': {
    'console': '%cScript[%s] Feedback: %s\n%s',
    'cacheStoringConfirm': 'Do you want all segments of the video to be cached? The detection method used is as follows: when the page is refreshed, the watched video clips will be cached so that no additional network traffic is generated. If you want all segments of the videos to be cached, select OK; or select Cancel to buffer a portion of the video based on the default buffer size (which is the default browser behavior). When buffering, press M key again to cancel buffering.',
    'cantOpenPIP': 'Unable to access picture-in-picture mode! Error: \n',
    'cantExitPIP': 'Unable to exit picture-in-picture mode! Error: \n',
    'rememberRateMenuOption': 'Remember video playback speed',
    'speedRate': 'Speed rate ',
    'helpMenuOption': 'Hotkeys list:',
    'helpBody': `Double-click: activate full screen.
Middle mouse button: fast forward 5 seconds

P key:  Take a screenshot
I key:  Enter/Exit picture-in-picture mode
M key:  Enable/disable caching of video
Chrome browsers add startup parameters to set the media cache to 840MB:  --media-cache-size=880008000

Arrow keys ← and →:  Fast forward or rewind by 5 seconds
Shift + Arrow keys ← and →:  Fast forward or rewind 20 seconds
Arrow keys ↑ and ↓:  Raise or lower the volume

ESC:  Exit full screen (or exit video enlarged to window size)
Spacebar:  Stop/Play
Enter:  Enable/disable full screen video
Shift + Enter: Set/unset video enlarged to window size

N key:  Play the next video (if any)
C key(YouTube:V key):  Speed up video playback by 0.1
X key: Slow down video playback by 0.1
Z key, Set video playback speed: 1.0 ←→ X
D key: Previous frame
F key: Next frame (except on YouTube)
E key: Next frame (YouTube only)`
  },
  'it': {
    'console': '%cScript[%s] Feedback: %s\n%s',
    'cacheStoringConfirm': 'Vuoi che tutti i segmenti del video siano memorizzati nella cache? Il metodo di rilevamento utilizzato è il seguente: all\'aggiornamento della pagina, i video clip guardati saranno memorizzati nella cache in modo da non generare ulteriore traffico di rete. Se vuoi che tutti i segmenti dei video siano memorizzati nella cache, seleziona OK; seleziona invece Annulla per bufferizzare una parte del video in base alla dimensione predefinita del buffer (come da comportamento predefinito del browser).Durante il buffering, premere nuovamente il tasto M per annullare il buffering.',
    'cantOpenPIP': 'Impossibile accedere alla modalità picture-in-picture! Errore: \n',
    'cantExitPIP': 'Impossibile uscire dalla modalità picture-in-picture! Errore: \n',
    'rememberRateMenuOption': 'Memorizza la velocità di riproduzione dei video',
    'speedRate': 'Velocità di riproduzione ',
    'helpMenuOption': 'Elenco dei tasti di scelta rapida',
    'helpBody': `Doppio clic: attiva lo schermo intero
Pulsante centrale del mouse: avanzamento rapido di 5 secondi

Tasto P: Esegui uno screenshot
Tasto I:  Attiva modalità picture-in-picture
Tasto M:  Attiva/disattiva memorizzazione del video nella cache
I browser Chrome aggiungono parametri di avvio per impostare la cache multimediale a 840MB:  --media-cache-size=880008000

Tasti freccia ← e →:  Avanza o riavvolgi di 5 secondi
Shift + Tasti freccia ← e →: Avanza o riavvolgi di 20 secondi
Tasti freccia ↑ e ↓:  Alza o abbassa il volume
ESC:  Esci da schermo intero
Barra spaziatrice: Ferma/Riproduci
Invio:  Attiva/disattiva ingrandimento del video a schermo intero
Shift + Invio: Attiva/disattiva ingrandimento del video a dimensione della finestra

Tasto N:  Riproduzione del video successivo (se presente)
Tasto C(YouTube: Tasto V): Velocizza riproduzione video di 0,1
Tasto X: Rallenta riproduzione video di 0,1
Tasto Z, Impostare la velocità di riproduzione video: 1,0 ←→ X
Tasto D: Vai al frame precedente
Tasto F: Vai al frame successivo (escluso YouTube)
Tasto E: Vai al frame successivo (solo su YouTube)`
  }
};
const MSG = Object.prototype.hasOwnProperty.call(i18n, curLang) ? i18n[curLang] : i18n.en;

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
let $msg, v, _fp, _fs, by; // document.body
const observeOpt = { childList: true, subtree: true };
const noopFn = function () { /* intentionally empty */ };
const validEl = e => e && e.offsetWidth > 1;
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
const getStyle = (o, s) => {
  if (typeof s !== 'string' || !/^[a-zA-Z-]+$/.test(s)) return; // avoid dynamic style lookups
  if (o.style[s]) return o.style[s];
  if (getComputedStyle) {
    const x = getComputedStyle(o, '');
    s = s.replace(/([A-Z])/g, '-$1').toLowerCase();
    return x && x.getPropertyValue(s);
  }
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
  const s = location.pathname;
  const m = s.match(/(\d+)(\D*)$/);
  const d = +m[1] + 1;
  location.assign(s.slice(0, m.index) + d + m[2]);
};
const getMainDomain = host => {
  const a = host.split('.');
  let i = a.length - 2;
  if (/^(com?|cc|tv|net|org|gov|edu)$/.test(a[i])) i--;
  return i >= 0 ? a[i] : host;
};
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
  if (!$msg?.get(0)?.offsetHeight) {
    // build the tip element without injecting an HTML string
    const el = d.createElement('div');
    Object.assign(el.style, {
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
      zIndex: '2147483647'
    });
    $msg = $(el).appendTo(by);
  }
  if (!msg?.length) return;
  const len = msg.length * 15;
  $msg.stop(true, true).text(msg)
    .css({ width: `${len}px` })
    .animate({ top: '190px' })
    .animate({ top: '+=9px' }, 1900)
    .animate({ top: '-30px' });
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

class FullScreen {
  constructor(e) {
    let fn = d.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen || noopFn;
    this.exit = fn.bind(d);
    fn = e.requestFullscreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullScreen || noopFn;
    this.enter = fn.bind(e);
  }
  static isFull() {
    return !!(d.fullscreen || d.webkitIsFullScreen || d.mozFullScreen ||
      d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement);
  }
  toggle() {
    if (FullScreen.isFull()) this.exit();
    else this.enter();
  }
}

// Universal web full screen, reference: https://github.com/gooyie/ykh5p
class FullPage {
  constructor(container) {
    this._isFull = !1;
    this.container = container || FullPage.getPlayerContainer(v);
    GM_addStyle(
      `.gm-fp-body .gm-fp-zTop {
        position: relative !important;
        z-index: 2147483646 !important;
      }
      .gm-fp-wrapper, .gm-fp-body{ overflow:hidden !important; }
      .gm-fp-wrapper .gm-fp-innerBox {
        width: 100% !important;
        height: 100% !important;
      }
      .gm-fp-wrapper {
        display: block !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        top: 0 !important;
        left: 0 !important;
        background: #000 !important;
        z-index: 2147483646 !important;
      }`
    );
  }
  static getPlayerContainer(video) {
    let e = video, p = e.parentNode;
    const { clientWidth: wid, clientHeight: h } = e;
    do {
      e = p;
      p = e.parentNode;
    } while (p && p !== by && p.clientWidth - wid < 5 && p.clientHeight - h < 5);
    // e is the return value, don't change it after this point
    // while (p !== by) p = p.parentNode || p.host;
    return e;
  }
  static isFull(e) {
    return w.innerWidth - e.clientWidth < 5 && w.innerHeight - e.clientHeight < 5;
  }
  toggle() {
    // assert(this.container);
    if (!this.container.contains(v)) this.container = FullPage.getPlayerContainer(v);
    bus.$emit('switchFP', !this._isFull);
    by.classList.toggle('gm-fp-body');
    let e = v;
    while (e !== this.container) {
      e.classList.toggle('gm-fp-innerBox');
      e = e.parentNode;
    }
    e.classList.toggle('gm-fp-wrapper');
    e = e.parentNode;
    while (e !== by) {
      e.classList.toggle('gm-fp-zTop');
      e = e.parentNode;
    }
    this._isFull = !this._isFull;
  }
}

const cacheMV = {
  check() {
    const buf = v.buffered;
    const i = buf.length - 1;
    this.iEnd = buf.end(i);
    return this.mode ? this.iEnd > v.duration - 55 : buf.start(0) >= this.playPos || this.iEnd > v.duration - 55;
  },
  finish() {
    v.removeEventListener('canplaythrough', this.onChache);
    v.currentTime = this.playPos;
    this.cached = !1;
    setTimeout(() => v.pause(), 33);
    HTMLMediaElement.prototype.play = this.originalPlay;
  },
  onChache() {
    if (!this.cached) return;
    if (this.check()) this.finish();
    else {
      v.currentTime = this.iEnd;
      v.pause();
    }
  },
  exec() {
    if (cfg.isLive || !v) return;
    this.mode = confirm(MSG.cacheStoringConfirm);
    // start caching
    this.cached = true;
    v.pause();
    this.originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = () => new Promise(noopFn);
    this.playPos = v.currentTime;
    v.addEventListener('canplaythrough', this.onChache);
    this.check();
    v.currentTime = this.iEnd;
  }
};
cacheMV.onChache = cacheMV.onChache.bind(cacheMV);

// shared full screen helpers: prefer the site's own button when the native API is unavailable
const toggleFS = () => {
  if (_fs) _fs.toggle();
  else clickDualButton(cfg.btnFS);
};
const toggleFP = () => {
  if (_fp) _fp.toggle();
  else clickDualButton(cfg.btnFP);
};

const actList = new Map();
actList.set(90, () => { // key Z: toggle boosted speed
  if (v.playbackRate === 1 || v.playbackRate === 0) {
    v.playbackRate = +localStorage.mvPlayRate || 1.3;
  } else {
    // localStorage.mvPlayRate = v.playbackRate;
    v.playbackRate = 1;
  }
})
  .set(88, adjustRate.bind(null, -0.1)) // key X
  .set(67, adjustRate.bind(null, 0.1)) // key C
  .set(40, adjustVolume.bind(null, -0.1)) // down: lower volume
  .set(38, adjustVolume.bind(null, 0.1)) // up: raise volume
  .set(37, () => { v.currentTime -= 5 }) // key left arrow
  .set(37 + 1024, () => { v.currentTime -= 20 }) // key shift + left arrow
  .set(39, () => { v.currentTime += 5 }) // key right arrow
  .set(39 + 1024, () => { v.currentTime += 20 }) // key shift + right arrow
  .set(68, () => { v.currentTime -= 0.03; v.pause() }) // key D: previous frame
  .set(70, () => { v.currentTime += 0.03; v.pause() }) // key F: next frame
  .set(32, () => {  // key space
    if (cfg.btnPlay) clickDualButton(cfg.btnPlay);
    else if (v.paused) v.play();
    else v.pause();
  })
  .set(13, () => {  // Enter key. Full screen
    toggleFS();
  })
  .set(13 + 1024, () => { // web full screen
    if (self !== top) postToTop({ id: 'gm-h5-toggle-iframeWebFull' });
    else toggleFP();
  })
  .set(27 + 1024, noopFn)  // ignore key shift + esc
  .set(27, () => {  // key esc
    if (FullScreen.isFull()) {
      if (_fs) _fs.exit();
      else clickDualButton(cfg.btnFS);
    } else if (self !== top) {
      postToTop({ id: 'gm-h5-is-iframeWebFull' });
    } else if (FullPage.isFull(v)) {
      toggleFP();
    }
  })
  .set(73, () => { // key I: picture-in-picture mode
    if (!d.pictureInPictureElement) {
      v.requestPictureInPicture().catch(err => {
        alert(MSG.cantOpenPIP + err)
      });
    } else {
      d.exitPictureInPicture().catch(err => {
        alert(MSG.cantExitPIP + err)
      });
    }
  })
  .set(80, () => { // key P: screenshot
    const canvas = d.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext('2d').drawImage(v, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const dataURL = URL.createObjectURL(blob);
      const link = d.createElement('a');
      link.onclick = ev => { ev.stopPropagation() };
      link.href = dataURL;
      link.download = Date.now().toString(36) + '.png';
      link.style.display = 'none';
      d.body.appendChild(link);
      link.click();
      link.remove();
      await sleep(500);
      URL.revokeObjectURL(dataURL);
    });
  })
  .set(77, () => { // M: cache video
    if (cacheMV.cached) cacheMV.finish();
    else cacheMV.exec();
  })
  .set(78, () => { // N: next episode
    if (self !== top) postToTop({ id: 'gm-h5-play-next' });
    else if (cfg.btnNext) doClick(cfg.btnNext);
    else if (cfg.isNumURL) goNextMV();
  });

const app = {
  shellEvent() {
    const fn = ev => {
      if (ev.target.closest('svg,img,button')) return;
      ev.stopPropagation(); // preventDefault
      ev.stopImmediatePropagation();
      this.checkUI();
      actList.get(1037)(); // web full screen
    };
    const e = cfg.isClickOnVideo ? v : cfg.mvShell;
    e.addEventListener('mousedown', ev => {
      if (ev.button === 1) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        if (!cfg.isLive) {
          if (actList.has(39)) actList.get(39)();
          else v.currentTime += 5;
        }
      }
    });
    if (!cfg.disableDBLClick) e.addEventListener('dblclick', fn);
  },
  setShell() {
    const e = this.getDPlayer() || this.getArtplayer() || this.getVjsPlayer() ||
      (cfg.shellCSS && q(cfg.shellCSS)) ||
      (top !== self ? by : FullPage.getPlayerContainer(v));
    if (e && cfg.mvShell !== e) {
      cfg.mvShell = e;
      this.shellEvent();
    }
  },
  checkMV() {
    if (this.vList) {
      const e = this.findMV();
      if (e && e !== v) {
        v = e;
        cfg.btnPlay = cfg.btnNext = cfg.btnFP = cfg.btnFS = _fs = _fp = null;
        if (!cfg.isLive && GM_getValue('remberRate', true)) {
          v.playbackRate = +localStorage.mvPlayRate || 1;
          v.addEventListener('ratechange', () => {
            if (v.playbackRate && v.playbackRate !== 1) localStorage.mvPlayRate = v.playbackRate;
          });
        }
        this.setShell();
      }
    }
    if (!validEl(cfg.mvShell)) {
      cfg.mvShell = null;
      this.setShell();
    }
    this.checkUI();
    return v;
  },
  getArtplayer() {
    const e = v.parentNode;
    if (!v.matches('.art-video') || !e.matches('.art-video-player')) return !1;
    cfg.btnFP = q('.art-control-fullscreenWeb', e);
    cfg.btnFS = q('.art-control-fullscreen', e);
    e.closest('body > *')?.classList.add('gm-dp-zTop');
    return e;
  },
  getDPlayer() {
    if (!v.matches('.dplayer-video')) return !1;
    const e = v.closest('.dplayer');
    if (e) {
      cfg.btnFP = q('.dplayer-full-in-icon > span', e);
      cfg.btnFS = q('.dplayer-full-icon', e);
      e.closest('body > *').classList.add('gm-dp-zTop');
    }
    return e;
  },
  getVjsPlayer() {
    const e = v.closest('.video-js');
    if (e) {
      cfg.btnFS = q('.vjs-control-bar > button.vjs-button:nth-last-of-type(1)');
    }
    return e;
  },
  // true when the key event must be ignored (modifiers, form fields, unhandled shift combos)
  ignoreKey(e, t) {
    if (e.ctrlKey || e.metaKey || e.altKey || t.contentEditable === 'true' || // e.isComposing
      /INPUT|TEXTAREA|SELECT/.test(t.nodeName)) return true;
    if (e.shiftKey && ![13, 37, 39, 27].includes(e.keyCode)) return true;
    return false;
  },
  // space/arrows are left to the site's own player controls when typed inside the shell
  isShellKey(e, t) {
    return !e.shiftKey && cfg.mvShell && cfg.mvShell.contains(t) &&
      [32, 37, 39].includes(e.keyCode);
  },
  hotKey(e) {
    const t = e.target;
    if (this.ignoreKey(e, t)) return;
    if (!this.checkMV() || this.isShellKey(e, t)) return;
    const key = e.shiftKey ? e.keyCode + 1024 : e.keyCode;
    if (actList.has(key)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      actList.get(key)(e);
      if ([67, 88, 90].includes(e.keyCode)) tip(MSG.speedRate + v.playbackRate);
    }
  },
  checkUI() {
    if (cfg.webfullCSS && !validEl(cfg.btnFP)) cfg.btnFP = q(cfg.webfullCSS);
    if (cfg.btnFP) _fp = null;
    else if (!_fp && self === top) _fp = new FullPage(cfg.mvShell);

    if (cfg.fullCSS && !validEl(cfg.btnFS)) cfg.btnFS = q(cfg.fullCSS);
    if (cfg.btnFS) _fs = null;
    else if (!_fs) _fs = new FullScreen(v);

    if (cfg.nextCSS && (!validEl(cfg.btnNext) || !cfg.btnNext.matches(cfg.nextCSS))) cfg.btnNext = q(cfg.nextCSS);
    if (cfg.playCSS && !validEl(cfg.btnPlay)) cfg.btnPlay = q(cfg.playCSS);
  },
  onGrowVList() {
    if (this.vList.length === this.vCount) return;
    if (this.viewObserver) {
      for (let e of this.vList) {
        if (!this.vSet.has(e)) this.viewObserver.observe(e);
      }
    } else {
      const config = {
        rootMargin: '0px',
        threshold: 0.9
      };
      this.viewObserver = new IntersectionObserver(this.onIntersection.bind(this), config);
      for (let e of this.vList) this.viewObserver.observe(e);
    }
    this.vSet = new Set(this.vList);
    this.vCount = this.vList.length;
  },
  onIntersection(entries) {
    if (this.vList.length < 2) return;
    const entry = find.call(entries, k => k.isIntersecting);
    if (!entry || v === entry.target) return;
    v = entry.target;
    _fs = new FullScreen(v);
    _fp = new FullPage(v);
    bus.$on('switchFP', async (toFull) => {
      // const c = toFull ? this.vSet : this.vList;
      // for (const e of c) this.viewObserver.unobserve(e);
      sleep(200);
      if (!toFull) v.scrollIntoView();
    });
    bus.$emit('switchMV');
  },
  bindEvent() {
    clearInterval(this.timer);
    by = d.body;
    v = v || this.findMV();
    log('bind event\n', v);
    bus.$emit('foundMV');
    const bRate = gmFuncOfCheckMenu(MSG.rememberRateMenuOption, 'remberRate');
    window.addEventListener('urlchange', async () => {
      await sleep(990);
      this.checkMV();
      if (bRate) v.playbackRate = +localStorage.mvPlayRate || 1;
      bus.$emit('urlchange');
    });
    if (top !== self) {
      postToTop({ id: 'gm-h5-init-MVframe' });
      window.addEventListener("message", ev => {
        if (!ev.source || !ev.data || !ev.data.id) return;
        switch (ev.data.id) {
          case 'gm-h5-toggle-fullScreen':
            toggleFS();
            break;
        }
      }, false);
    }
    $(v).one('canplay', () => {
      cfg.isLive = cfg.isLive || v.duration === Infinity;
      if (cfg.isLive) for (const k of [37, 1061, 39, 1063, 67, 77, 78, 88, 90]) actList.delete(k);
      else {
        if (bRate) v.playbackRate = +localStorage.mvPlayRate || 1;
        v.addEventListener('ratechange', () => {
          if (bRate && v.playbackRate && v.playbackRate !== 1) localStorage.mvPlayRate = v.playbackRate;
        });
      }

      this.checkMV();
      bus.$emit('canplay');
    });
    $(by).keydown(this.hotKey.bind(this));

    if (cfg.mvShell) this.shellEvent();
    else this.setShell();
    this.checkUI();
    if (cfg.multipleV) {
      new MutationObserver(this.onGrowVList.bind(this)).observe(by, observeOpt);
      this.vCount = 0;
      this.onGrowVList();
    }
  },
  init() {
    const rawAel = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (...args) {
      const inMV = this instanceof HTMLMediaElement;
      const block = inMV && (args[0] === 'dblclick' && !args[1].toString().includes('actList.get(1037)'));
      if (!block) return rawAel.apply(this, args);
    };
    this.vList = d.getElementsByTagName('video');
    const fn = e => cfg.cssMV ? e.matches(cfg.cssMV) : e.offsetWidth > 9;
    this.findMV = find.bind(this.vList, fn);
    this.timer = polling(e => {
      v = e;
      this.bindEvent();
    }, this.findMV);

    hookAttachShadow(async shadowRoot => {
      bus.$emit('addShadowRoot', shadowRoot);
      await sleep(600);
      if (v) return;
      const mv = q('video', shadowRoot); // mv.getRootNode() == shadowRoot
      if (mv) {
        v = mv;
        log('Found MV in ShadowRoot\n', v, shadowRoot);
        if (!cfg.shellCSS) cfg.mvShell = shadowRoot.host;
        this.bindEvent();

        this.vList = shadowRoot.getElementsByTagName('video');
        this.findMV = find.bind(this.vList, fn);
      }
    });
  }
};

const router = {
  ted() {
    cfg.fullCSS = 'button[title=Fullscreen]';
  },
  youtube() {
    GM_addStyle(
      `.gm-fp-body #player-container-inner{padding-top:0!important}
      .gm-fp-body #player-container-outer{
        max-width:100%!important;
        margin:0!important;
      }`
    );
    cfg.shellCSS = '#player';
    cfg.playCSS = 'button.ytp-play-button';
    cfg.nextCSS = 'a.ytp-next-button';
    cfg.fullCSS = 'button.ytp-fullscreen-button';
    cfg.isClickOnVideo = true;
    actList.delete(32);
    actList.set(69, actList.get(70)).delete(70); // key F >> E key
    actList.set(86, actList.get(67)).delete(67); // key C >> V key
  },
  twitch() {
    cfg.isLive = !path.startsWith('/videos/');
    cfg.fullCSS = 'button[data-a-target=player-fullscreen-button]';
    cfg.webfullCSS = '.player-controls__right-control-group > div:nth-child(4) > button';
    cfg.playCSS = 'button[data-a-target=player-play-pause-button]';
  },
  vimeo() {
    cfg.fullCSS = 'button[aria-label*="Fullscreen"], button[title*="Fullscreen"]';
    cfg.playCSS = 'button[aria-label="Play"], button[aria-label="Pause"], button[title="Play"], button[title="Pause"]';
  },
  dailymotion() {
    cfg.fullCSS = 'button[aria-label*="ullscreen"]';
  },
  kick() {
    cfg.isLive = !0;
    cfg.fullCSS = '[data-testid="full_screen_button"], button[aria-label*="ullscreen"]';
    cfg.playCSS = '[data-testid="play_pause_button"]';
  }
};

Reflect.defineProperty(navigator, 'plugins', {
  get() { return { length: 0 } }
});
GM_registerMenuCommand(MSG.helpMenuOption, alert.bind(w, MSG.helpBody));
if (!router[u] || !router[u]()) app.init();
if (!router[u] && !cfg.isNumURL) cfg.isNumURL = /[_\W]\d+(\/|\.[a-z]{3,8})?$/.test(path);
