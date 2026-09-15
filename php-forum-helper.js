// ==UserScript==
// @name         [LanikSJ] phpBB Forum Helper
// @namespace    grom & LanikSJ
// @description  phpBB: view user's posts and topics; removes ads and hidden metadata.
// @version      1.0.9.260915
////          ProSilver          \\\\
// @match        *://adblockplus.org/forum/*
// @match        *://custombuttons.sourceforge.net/forum/*
// @match        *://foldingforum.org/*
// @match        *://forums.debian.net/*
// @match        *://forums.informaction.com/*
// @match        *://forums.lanik.us/*
// @match        *://forums.linuxmint.com/*
// @match        *://forums.sandboxie.com/*
// @match        *://forums.virtualbox.org/*
// @match        *://forums.wesnoth.org/*
// @match        *://forums.xkcd.com/*
// @match        *://forum.enjoysudoku.com/*
// @match        *://forum.freegamedev.net/*
// @match        *://forum.openoffice.org/*
// @match        *://forum.palemoon.org/*
// @match        *://forum.videolan.org/*
// @match        *://ibdof.com/*
// @match        *://newsgroup.xnview.com/*
// @match        *://www.sublimetext.com/forum/*
// @match        *://*.synthesiagame.com/forum/*
// @grant        none
// @noframes
// @run-at       document-end
// ==/UserScript==

// shorthands
//function $i(a) { return document.getElementById(a); }
//function $(a,b) { return (b||document.body).querySelector(a); }
function $$(a, b) { return (b || document.body).querySelectorAll(a); }
function $c(a, b) { return (b || document.body).getElementsByClassName(a); }
function $t(a, b) { return (b || document.body).getElementsByTagName(a); }
//function $n(a,b) { return (b||document.body).getElementsByName(a); }
//var $body = document.body;

var loc = location.hostname;

// if on Custom Buttons forum
if (loc.match('custombuttons.sourceforge.net')) {
  // attach favicon
  var link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAU58Ald3/lQA+PJimAAAAI0lEQVQIW2MIBQIGBwYGRiChtRAHAZYFEl4rgEqwEWBZkFEAf58RlaqHEPcAAAAASUVORK5CYII=';
  $t('head', document)[0].appendChild(link);
}

// remove ads and some metadata
var trash = $$('#gootop, #goobot, .adsbygoogle, meta[name="description"], meta[name="keywords"], meta[name="copyright"], meta[content="IE=EmulateIE7; IE=EmulateIE9"]', document);
for (var i = 0, len = trash.length; i < len; i++) trash[i].remove();

// shared pill-button style for injected post/topic links
var helperCSS = document.createElement('style');
helperCSS.textContent = '.php-helper-btn { display:inline-block; margin:.25em .25em 0 0; padding:1px 8px; font-size:11px; font-weight:600; line-height:1.6; text-decoration:none; border-radius:10px; color:#368AD2; background-color:rgba(54,138,210,.12); border:1px solid rgba(54,138,210,.45); transition:background-color .15s, color .15s; } .php-helper-btn:hover { color:#fff; background-color:#368AD2; text-decoration:none; }';
$t('head', document)[0].appendChild(helperCSS);

// view user's posts; DO NOT 'use strict';
// ProSilver
var list = $c('postprofile'),
  user;
if (list) {
  function mkLink(word, user) { // < breaking 'use strict';
    var a = document.createElement('a');
    a.title = 'View ' + word + 's';
    a.textContent = word;
    a.href = 'search.php?sr=' + word + 's&author_id=' + user;
    a.className = 'php-helper-btn';
    return a;
  }
  for (var i = 0, len = list.length; i < len; i++) {
    user = $t('a', list[i])[0];
    if (!user) { continue; } // where registration not required
    user = user.href.match(/\d+/)[0];
    // anchor: below the contact row, else below the post count, else end of profile
    var anchor = list[i].querySelector('dd.profile-contact') || list[i].querySelector('dd.profile-posts');
    if (anchor) {
      if (anchor.nextSibling) {
        anchor.parentNode.insertBefore(mkLink('post', user), anchor.nextSibling);
        anchor.parentNode.insertBefore(mkLink('topic', user), anchor.nextSibling);
      } else {
        anchor.parentNode.appendChild(mkLink('post', user));
        anchor.parentNode.appendChild(mkLink('topic', user));
      }
    } else { // fallback: append at the end of the profile
      list[i].appendChild(mkLink('post', user));
      list[i].appendChild(mkLink('topic', user));
    }
  }
}
