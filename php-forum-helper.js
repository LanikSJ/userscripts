// ==UserScript==
// @name         [LanikSJ] phpBB Forum Helper
// @namespace    grom & LanikSJ
// @description  phpBB: view user's posts and topics; removes ads and hidden metadata.
// @version      1.2.1.260915
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

// AJAX registration check (cleaned from the pcgf/ajaxregistrationcheck extension);
// a no-op unless the page provides the extension's config globals (e.g. UCP register).
function initAJAXRegistrationCheck($) {
  const ext = 'pcgfAJAXRegistrationCheck';
  const cfg = {
    usernameMin: window[ext + 'UsernameMin'],
    usernameMax: window[ext + 'UsernameMax'],
    usernameRule: window[ext + 'UsernameRule'],
    usernameInvalid: window[ext + 'UsernameInvalidBoundaries'],
    usernameLink: window[ext + 'UsernameCheckLink'],
    emailRule: window[ext + 'EMailRule'],
    emailInvalid: window[ext + 'EMailInvalid'],
    emailLink: window[ext + 'EMailCheckLink'],
    passwordMin: window[ext + 'PasswordMin'],
    passwordRule: window[ext + 'PasswordRule'],
    passwordInvalid: window[ext + 'PasswordInvalid'],
    passwordValid: window[ext + 'PasswordValid'],
    confirmValid: window[ext + 'ConfirmPasswordValid'],
    confirmInvalid: window[ext + 'ConfirmPasswordInvalid'],
    strengthLabel: window[ext + 'PasswordStrength'],
    veryWeak: window[ext + 'PasswordVeryWeak'],
    weak: window[ext + 'PasswordWeak'],
    normal: window[ext + 'PasswordNormal'],
    strong: window[ext + 'PasswordStrong'],
    veryStrong: window[ext + 'PasswordVeryStrong'],
    loading: window[ext + 'Loading']
  };
  if (Object.values(cfg).some(v => typeof v === 'undefined')) return false; // config not ready yet

  const msg = {
    username: $('#pcgf-ajaxregistrationcheck-username'),
    email: $('#pcgf-ajaxregistrationcheck-email'),
    password: $('#pcgf-ajaxregistrationcheck-password'),
    confirmPassword: $('#pcgf-ajaxregistrationcheck-confirm-password')
  };
  const EVENTS = 'input keyup change blur';
  let usernameRE = /^.+$/i;
  let emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  // values come from the board's own admin-configured inline script (not user input);
  // length-capped and compiled in try/catch, so a bad/oversized pattern just falls back
  // to the safe default above.
  if (typeof cfg.usernameRule === 'string' && cfg.usernameRule.length <= 200) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    try { usernameRE = new RegExp(cfg.usernameRule, 'i'); } catch (e) { /* keep default */ }
  }
  if (typeof cfg.emailRule === 'string' && cfg.emailRule.length <= 200) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    try { emailRE = new RegExp(cfg.emailRule, 'i'); } catch (e) { /* keep default */ }
  }

  const getField = (selector, name) => ($(selector).length ? $(selector) : $(`[name="${name}"]`)).first();

  const setValidity = (field, message) => {
    if (field.length && field[0].setCustomValidity) field[0].setCustomValidity(message);
  };
  const setInvalid = (message, messageField, field) => {
    messageField.removeClass('valid password-strength').addClass('invalid').text(message);
    setValidity(field, message);
  };
  const setValid = (message, messageField, field) => {
    messageField.removeClass('invalid password-strength').addClass('valid').text(message);
    setValidity(field, '');
  };
  const setLoading = (message, messageField, field) => {
    const circles = document.createElement('div');
    circles.className = 'loading-circle';
    for (let i = 1; i <= 12; i++) {
      const circle = document.createElement('div');
      circle.className = `circle${i} circle`;
      circles.appendChild(circle);
    }
    messageField.removeClass('invalid valid password-strength').empty().append(circles, document.createTextNode('\u00A0\u00A0\u00A0' + message));
    setValidity(field, '');
  };
  return {cfg, msg, EVENTS, usernameRE, emailRE, getField, setValidity, setInvalid, setValid, setLoading};
}

// bind all fields, shared server-side check lives here too
function bindAJAXRegistrationCheck($) {
  const c = initAJAXRegistrationCheck($);
  if (!c) return false;
  const {cfg, msg, EVENTS, usernameRE, emailRE, getField, setInvalid, setValid, setLoading} = c;

  // shared server-side check for username/e-mail
  function serverCheck(value, messageField, checkLink, inputField) {
    setLoading(cfg.loading, messageField, inputField);
    $.ajax({
      url: checkLink,
      type: 'POST',
      dataType: 'json',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      data: {search: value, ajax: 1},
      success: result => {
        (result[0] === 'OK' ? setValid : setInvalid)(result[1], messageField, inputField);
      },
      error: () => setInvalid(cfg.loading, messageField, inputField)
    });
  }

  function validateConfirmPassword(passwordField, confirmField) {
    if (!confirmField.length || !passwordField.length) return;
    if (confirmField.val() === passwordField.val()) {
      setValid(cfg.confirmValid, msg.confirmPassword, confirmField);
    } else {
      setInvalid(cfg.confirmInvalid, msg.confirmPassword, confirmField);
    }
  }

  function validatePassword(passwordField, confirmField) {
    if (!passwordField.length) return;
    validateConfirmPassword(passwordField, confirmField);

    const value = passwordField.val();
    const lower = value.match(/[a-z]/g);
    const upper = value.match(/[A-Z]/g);
    const number = value.match(/[0-9]/g);
    const symbol = value.match(/[^a-zA-Z0-9]/g);
    let valid = false;

    if (value.length < cfg.passwordMin) {
      setInvalid(cfg.passwordInvalid, msg.password, passwordField);
    } else if (cfg.passwordRule <= 0) {
      valid = true;
    } else if (lower && upper) {
      if (cfg.passwordRule <= 10 || (number && (cfg.passwordRule <= 100 || symbol))) {
        valid = true;
      } else {
        setInvalid(cfg.passwordInvalid, msg.password, passwordField);
      }
    } else {
      setInvalid(cfg.passwordInvalid, msg.password, passwordField);
    }
    if (!valid) return;

    setValid(cfg.passwordValid, msg.password, passwordField);

    // strength meter percentage
    let percentage = 0;
    if (lower) percentage += Math.min(lower.length, 5) * 5;
    if (upper) percentage += Math.min(upper.length, 3) * 7;
    if (number) percentage += Math.min(number.length, 2) * 10;
    if (symbol) percentage += Math.min(symbol.length, 2) * 14;

    const username = getField('#username', 'username');
    const email = getField('#email', 'email');
    if ((username.val() === '' || value.indexOf(username.val()) < 0) &&
        (email.val() === '' || value.indexOf(email.val()) < 0)) {
      percentage += 6;
    }

    if (!$('#pcgf-ajaxregistrationcheck-security').length || !$('#pcgf-ajaxregistrationcheck-strength').length) {
      // built with DOM APIs (textContent) so config values are never parsed as HTML
      const label = document.createElement('span');
      label.className = 'pcgf-ajaxregistrationcheck-strength-label';
      label.textContent = cfg.strengthLabel + ' ';
      const bar = document.createElement('div');
      bar.className = 'progressbar';
      const fill = document.createElement('div');
      fill.id = 'pcgf-ajaxregistrationcheck-security';
      fill.textContent = '\u00A0';
      bar.appendChild(fill);
      const text = document.createElement('span');
      text.id = 'pcgf-ajaxregistrationcheck-strength';
      text.className = 'pcgf-ajaxregistrationcheck-strength-text';
      msg.password.removeClass('invalid valid').addClass('password-strength').empty().append(label, bar, text);
    }

    const bar = $('#pcgf-ajaxregistrationcheck-security');
    const text = $('#pcgf-ajaxregistrationcheck-strength');
    bar.stop().animate({width: percentage + '%'}, 800);

    const levels = [
      [95, cfg.veryStrong, 'very-strong'],
      [85, cfg.strong, 'strong'],
      [60, cfg.normal, 'normal'],
      [45, cfg.weak, 'weak']
    ];
    for (const [min, label, css] of levels) {
      if (percentage >= min) {
        text.text(label);
        bar.removeClass().addClass(css);
        return;
      }
    }
    text.text(cfg.veryWeak);
    bar.removeClass().addClass('very-weak');
  }

  const usernameField = getField('#username', 'username');
  const emailField = getField('#email', 'email');
  const passwordField = getField('#new_password', 'new_password');
  const confirmField = getField('#password_confirm', 'password_confirm');

  if (confirmField.length) {
    msg.confirmPassword.insertAfter(confirmField);
    confirmField.on(EVENTS, () => validateConfirmPassword(passwordField, confirmField));
  }
  if (passwordField.length) {
    msg.password.insertAfter(passwordField);
    passwordField.on(EVENTS, () => validatePassword(passwordField, confirmField));
    validatePassword(passwordField, confirmField);
  }
  if (usernameField.length) {
    msg.username.insertAfter(usernameField);
    usernameField.on(EVENTS, () => {
      if (passwordField.length) validatePassword(passwordField, confirmField);
      const value = usernameField.val();
      if (value.length < cfg.usernameMin || value.length > cfg.usernameMax || !value.match(usernameRE)) {
        setInvalid(cfg.usernameInvalid, msg.username, usernameField);
        return;
      }
      serverCheck(value, msg.username, cfg.usernameLink, usernameField);
    });
    usernameField.triggerHandler('input');
  }
  if (emailField.length) {
    msg.email.insertAfter(emailField);
    emailField.on(EVENTS, () => {
      if (passwordField.length) validatePassword(passwordField, confirmField);
      const value = emailField.val();
      if (!value.match(emailRE)) {
        setInvalid(cfg.emailInvalid, msg.email, emailField);
        return;
      }
      serverCheck(value, msg.email, cfg.emailLink, emailField);
    });
    emailField.triggerHandler('input');
  }

  $('#ucp').on('submit', () =>
    !(msg.username.hasClass('invalid') || msg.email.hasClass('invalid') ||
      msg.password.hasClass('invalid') || msg.confirmPassword.hasClass('invalid'))
  );
  return true;
}

(function waitForRegistrationCheck() {
  if (typeof jQuery === 'undefined' || !document.getElementById('ucp')) {
    return; // no jQuery or not a UCP/registration page; nothing to do
  }
  if (bindAJAXRegistrationCheck(window.jQuery)) return;
  setTimeout(waitForRegistrationCheck, 50); // retry until config globals appear
})();
