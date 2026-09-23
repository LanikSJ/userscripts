'use strict';

// Media discovery, UI binding, and per-player lifecycle.
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
    v.addEventListener('canplay', () => {
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
    }, { once: true });
    by.addEventListener('keydown', this.hotKey.bind(this));

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
      const inMV = isMediaEl(this);
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
