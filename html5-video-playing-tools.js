// ==UserScript==
// @name         HTML5 Video Playing Tools
// @namespace    https://greasyfork.org/users/7036
// @version      2.2.3.260923
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
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/i18n.js?v=2.2.3.260923
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/runtime.js?v=2.2.3.260923
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/fullscreen.js?v=2.2.3.260923
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/actions.js?v=2.2.3.260923
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/app.js?v=2.2.3.260923
// @require      https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools/sites.js?v=2.2.3.260923
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        window.onurlchange
// @GM_info
// ==/UserScript==

/* globals Vue, GM_addStyle, GM_getValue, GM_info, GM_registerMenuCommand, GM_setValue, unsafeWindow */
