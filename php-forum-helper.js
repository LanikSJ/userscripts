// ==UserScript==
// @name         [LanikSJ] phpBB Forum Helper
// @namespace    grom & LanikSJ
// @description  phpBB: view user's posts and topics; removes ads and hidden metadata.
// @version      1.1.2.260915
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
function $$(a, b) { return (b || document.body).querySelectorAll(a); }
function $c(a, b) { return (b || document.body).getElementsByClassName(a); }

const loc = location.hostname;

// if on Custom Buttons forum
if (loc === 'custombuttons.sourceforge.net') {
  // attach favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAU58Ald3/lQA+PJimAAAAI0lEQVQIW2MIBQIGBwYGRiChtRAHAZYFEl4rgEqwEWBZkFEAf58RlaqHEPcAAAAASUVORK5CYII=';
  document.head.appendChild(link);
}

// remove ads and some metadata
for (const node of $$('#gootop, #goobot, .adsbygoogle, meta[name="description"], meta[name="keywords"], meta[name="copyright"], meta[content="IE=EmulateIE7; IE=EmulateIE9"]')) node.remove();

// shared pill-button style for injected post/topic links
const helperCSS = document.createElement('style');
helperCSS.textContent = '.php-helper-btn { display:inline-block; margin:.25em .25em 0 0; padding:1px 8px; font-size:11px; font-weight:600; line-height:1.6; text-decoration:none; border-radius:10px; color:#368AD2; background-color:rgba(54,138,210,.12); border:1px solid rgba(54,138,210,.45); transition:background-color .15s, color .15s; } .php-helper-btn:hover { color:#fff; background-color:#368AD2; text-decoration:none; }';
document.head.appendChild(helperCSS);

function mkLink(word, user) {
  const a = document.createElement('a');
  a.title = `View ${word}s`;
  a.textContent = word;
  a.href = `search.php?sr=${word}s&author_id=${user}`;
  a.className = 'php-helper-btn';
  return a;
}

// make forum/topic rows fully clickable (middle-click ignored)
function rowClickHandler(e) {
  if (e.which === 2) return; // let middle-click through
  const title = this.querySelector('.forumtitle, .topictitle');
  if (title) location.assign(title.href);
}
for (const row of document.querySelectorAll('.row')) {
  row.onclick = null;
  row.addEventListener('click', rowClickHandler, false);
}

// view user's posts/topics
for (const profile of $c('postprofile')) {
  const userLink = profile.querySelector('a');
  if (!userLink) continue; // where registration not required
  const user = userLink.href.match(/\d+/)[0];
  // anchor: below the contact row, else below the post count, else end of profile
  const anchor = profile.querySelector('dd.profile-contact') || profile.querySelector('dd.profile-posts');
  const post = mkLink('post', user);
  const topic = mkLink('topic', user);
  if (anchor) {
    if (anchor.nextSibling) {
      anchor.parentNode.insertBefore(post, anchor.nextSibling);
      anchor.parentNode.insertBefore(topic, anchor.nextSibling);
    } else {
      anchor.parentNode.append(post, topic);
    }
  } else { // fallback: append at the end of the profile
    profile.append(post, topic);
  }
}
