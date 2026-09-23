'use strict';

// Per-site configuration and script startup.
// per-site configuration, keyed by main domain (see getMainDomain); a Map keeps the
// host-derived key out of object property lookups
const routers = new Map([
  ['ted', () => {
    cfg.fullCSS = 'button[title=Fullscreen]';
  }],
  ['youtube', () => {
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
  }],
  ['twitch', () => {
    cfg.isLive = !path.startsWith('/videos/');
    cfg.fullCSS = 'button[data-a-target=player-fullscreen-button]';
    cfg.webfullCSS = '.player-controls__right-control-group > div:nth-child(4) > button';
    cfg.playCSS = 'button[data-a-target=player-play-pause-button]';
  }],
  ['vimeo', () => {
    cfg.fullCSS = 'button[aria-label*="Fullscreen"], button[title*="Fullscreen"]';
    cfg.playCSS = 'button[aria-label="Play"], button[aria-label="Pause"], button[title="Play"], button[title="Pause"]';
  }],
  ['dailymotion', () => {
    cfg.fullCSS = 'button[aria-label*="ullscreen"]';
  }],
  ['kick', () => {
    cfg.isLive = !0;
    cfg.fullCSS = '[data-testid="full_screen_button"], button[aria-label*="ullscreen"]';
    cfg.playCSS = '[data-testid="play_pause_button"]';
  }]
]);

Reflect.defineProperty(navigator, 'plugins', {
  get() { return { length: 0 } }
});
GM_registerMenuCommand(MSG.helpMenuOption, alert.bind(w, MSG.helpBody));
// per-site setup runs first (when the site is known), then the generic init
const route = routers.get(u);
if (!route || !route()) app.init();
// numeric episode URLs (e.g. /watch/123) are only guessed on unconfigured sites
if (!route && !cfg.isNumURL) cfg.isNumURL = isNumIdURL(path);
