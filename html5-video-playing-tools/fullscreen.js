'use strict';

// Native and page-level fullscreen presentation plus media caching.
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

// <video>/<audio> inherit play() from the media prototype, two levels up the chain
const getMediaProto = el => {
  const p = Object.getPrototypeOf(Object.getPrototypeOf(el));
  return p && p.play ? p : null;
};
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
    const proto = getMediaProto(v);
    if (proto && this.originalPlay) proto.play = this.originalPlay;
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
    const proto = getMediaProto(v);
    if (proto) {
      this.originalPlay = proto.play;
      proto.play = () => new Promise(noopFn);
    }
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
