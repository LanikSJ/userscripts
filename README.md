# 📱 userscripts

![GitHub Repo Size](https://img.shields.io/github/repo-size/laniksj/userscripts)
![GitHub Code Size in Bytes](https://img.shields.io/github/languages/code-size/laniksj/userscripts)
![GitHub Last Commit](https://img.shields.io/github/last-commit/laniksj/userscripts)
![GitHub Commit Activity](https://img.shields.io/github/commit-activity/m/laniksj/userscripts)

A collection of user scripts for AdGuard, TamperMonkey, and ViolentMonkey to enhance your browsing experience.

## 🚀 Quick Install

[![Install Script](https://img.shields.io/badge/Install-HTML5%20Video%20Playing%20Tools-red?style=for-the-badge&logo=greasyfork)](https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools.js)

[![Install Script](https://img.shields.io/badge/Install-Instacart%20Ad%20Remover-orange?style=for-the-badge&logo=greasyfork)](https://raw.githubusercontent.com/LanikSJ/userscripts/main/instacart-ad-remover.js)

[![Install Script](https://img.shields.io/badge/Install-Paywall%20Bypass%20Script-green?style=for-the-badge&logo=greasyfork)](https://raw.githubusercontent.com/LanikSJ/userscripts/main/paywall-bypass-script.js)

[![Install Script](https://img.shields.io/badge/Install-phpBB%20Forum%20Helper-blue?style=for-the-badge&logo=greasyfork)](https://raw.githubusercontent.com/LanikSJ/userscripts/main/php-forum-helper.js)

**One-click installation:** Click the buttons above to install the HTML5 Video Playing Tools, the
Instacart Ad Remover, the Paywall Bypass Script, or the phpBB Forum Helper directly to your browser
extension.

**Manual installation:** Download the script file and import it into your user script manager.

### 🔖 Versioning

All scripts follow a `semver.YYMMDD` versioning scheme (e.g. `2.0.5.260916` = version 2.0.5 released on
2026-09-16). Every script header also includes `@downloadURL`, `@updateURL` (pointing to the raw file on GitHub),
and `@homepageURL` metadata so user script managers can detect and install updates automatically.

| Script               | Current Version |
| -------------------- | --------------- |
| HTML5 Video Tools    | `2.2.1.260920`  |
| Instacart Ad Remover | `72.0.0.260916` |
| Paywall Bypass       | `2.0.6.260916`  |
| phpBB Forum Helper   | `1.2.5.260915`  |

## 📚 Table of Contents

- [📱 userscripts](#-userscripts)
- [🚀 Quick Install](#-quick-install)
  - [🔖 Versioning](#-versioning)
- [🎬 HTML5 Video Playing Tools](#-html5-video-playing-tools)
  - [✨ HTML5 Video Features](#-html5-video-features)
  - [📥 HTML5 Video Installation](#-html5-video-installation)
  - [🎮 HTML5 Video Hotkeys](#-html5-video-hotkeys)
  - [🌐 HTML5 Video Supported Sites](#-html5-video-supported-sites)
- [🛒 Instacart Ad Remover](#-instacart-ad-remover)
  - [✨ Instacart Features](#-instacart-features)
  - [📥 Instacart Installation](#-instacart-installation)
  - [🌐 Instacart Supported Sites](#-instacart-supported-sites)
- [🔓 Paywall Bypass Script](#-paywall-bypass-script)
  - [✨ Features](#-features)
  - [📥 Installation](#-installation)
    - [🌐 Browser Extensions](#-browser-extensions)
    - [🛡️ AdGuard Extension](#️-adguard-extension)
    - [📱 AdGuard App (Desktop/Mobile)](#-adguard-app-desktopmobile)
  - [🎮 Usage](#-usage)
  - [🌐 Supported Sites](#-supported-sites)
- [💬 phpBB Forum Helper](#-phpbb-forum-helper)
  - [✨ phpBB Features](#-phpbb-features)
  - [📥 phpBB Installation](#-phpbb-installation)
  - [🎮 phpBB Usage](#-phpbb-usage)
  - [🌐 phpBB Supported Sites](#-phpbb-supported-sites)
- [🛠️ Scripts Directory](#️-scripts-directory)
- [📜 License](#-license)
- [🤝 Contributing](#-contributing)
- [⚠️ Disclaimer](#️-disclaimer)

## 🎬 HTML5 Video Playing Tools

Adds playback hotkeys to HTML5 video players across mainstream video and live streaming sites, with
per-site UI integration. Current version: `2.2.1.260920`.

### ✨ HTML5 Video Features

- **Playback Hotkeys**: Fast forward/rewind (5s and 20s with Shift), pause/play, volume up/down
- **Frame Stepping**: Skip to previous or next frame (D/F keys, E on YouTube)
- **Playback Speed**: Speed up/slow down by 0.1 (C/X keys, V key on YouTube), toggle
  boosted speed (Z key), and optionally remember playback speed per browser
- **Full Screen Modes**: Toggle video full screen (Enter) and web/page full screen (Shift+Enter)
- **Picture-in-Picture**: Enter/exit picture-in-picture mode (I key)
- **Video Screenshot**: Capture a PNG screenshot of the current frame (P key)
- **Video Caching**: Buffer the whole video for lag-free playback (M key)
- **Next Episode**: Skip to the next video or episode (N key)
- **Custom Sites**: Works on any `/play` URL and supports sites not explicitly listed

### 📥 HTML5 Video Installation

1. Install a user script manager:
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - AdGuard (see the detailed steps in the [Paywall Bypass installation section](#-installation))
2. Install the script:
   - One-click: use the **Install HTML5 Video Playing Tools** button above
   - Download [`html5-video-playing-tools.js`](html5-video-playing-tools.js) and import it into
     your user script manager, **or**
   - Install from URL:
     `https://raw.githubusercontent.com/LanikSJ/userscripts/main/html5-video-playing-tools.js`
3. Verify installation:
   - Visit a supported video site (e.g. YouTube)
   - Open the hotkey list from the user script manager's menu ("Hotkeys list")
   - Playback hotkeys should work immediately

### 🎮 HTML5 Video Hotkeys

| Key                 | Action                           |
| ------------------- | -------------------------------- |
| `←` / `→`           | Rewind / fast forward 5 seconds  |
| `Shift` + `←` / `→` | Rewind / fast forward 20 seconds |
| `↑` / `↓`           | Raise / lower the volume         |
| `Space`             | Pause / play                     |
| `Enter`             | Toggle full screen               |
| `Shift` + `Enter`   | Toggle web (page) full screen    |
| `Esc`               | Exit full screen                 |
| `P`                 | Take a screenshot                |
| `I`                 | Toggle picture-in-picture        |
| `M`                 | Enable/disable video caching     |
| `N`                 | Play the next video/episode      |
| `C` / `X`           | Speed up / slow down by 0.1      |
| `Z`                 | Toggle boosted playback speed    |
| `D` / `F`           | Previous / next frame            |

Notes: YouTube remaps some keys (`V` for speed and `E` for next frame); see the
"Hotkeys list" menu entry for the complete per-site mapping.

### 🌐 HTML5 Video Supported Sites

| Site        | URL Pattern                 |
| ----------- | --------------------------- |
| YouTube     | `www.youtube.com`           |
| TED         | `www.ted.com/talks`         |
| Twitch      | `www.twitch.tv`             |
| Vimeo       | `vimeo.com`                 |
| Dailymotion | `www.dailymotion.com/video` |
| Odysee      | `odysee.com`                |
| Kick        | `kick.com`                  |
| PeerTube    | any instance `/w/` pages    |
| Custom      | any URL containing `play`   |

## 🛒 Instacart Ad Remover

A user script that blocks sponsored content, promo carousels, and dynamically inserted ad placements across
Instacart (both `.com` and `.ca`). Also available on
[Greasy Fork](https://greasyfork.org/en/scripts/510324-instacart-ad-remover). Current version: `72.0.0.260916`.

**Note:** The script header includes `@downloadURL`, `@updateURL`, and `@homepageURL` metadata (pointing to GitHub),
so your user script manager can check GitHub for updates automatically.

### ✨ Instacart Features

- **Search Page Ads**: Hides sponsored product listings and merges non-sponsored rows back into the main list
- **Product Listing Ads**: Detects sponsored items via `data-cfp-eligible` markers and "promoted" image attributes
- **Sponsored Carousels**: Removes sponsored carousel blocks (including ones rendered in closed Shadow DOM, which
  are forced open)
- **Placement Blocks**: Hides unified data-placement ad blocks and recommendation feeds, including dynamically
  inserted ones (tracked via a debounced `MutationObserver`)
- **Cart Cleanup**: Hides "Suggested items" upsells in the cart
- **Offer/Announcement Banners**: Hides promotional banners and the "Treatment Tracker modal"
- **Auto-Continue**: Clicks "Continue to checkout" when the button appears
- **Default Tip**: Auto-selects the tip dialog's "Other" flow (opt-in behavior of the original script)

### 📥 Instacart Installation

1. Install a user script manager:
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - AdGuard (see the detailed steps in the [Paywall Bypass installation section](#-installation))
2. Install the script:
   - One-click: use the **Install Instacart Ad Remover** button above, or the
     [Greasy Fork page](https://greasyfork.org/en/scripts/510324-instacart-ad-remover)
   - Download [`instacart-ad-remover.js`](instacart-ad-remover.js) and import it into your user script manager, **or**
   - Install from URL: `https://raw.githubusercontent.com/LanikSJ/userscripts/main/instacart-ad-remover.js`
3. Verify installation:
   - Visit [instacart.com](https://www.instacart.com/) or [instacart.ca](https://www.instacart.ca/)
   - Sponsored listings, promo carousels, and ad placements should be hidden automatically

### 🌐 Instacart Supported Sites

| Site         | URL Pattern       |
| ------------ | ----------------- |
| Instacart US | `*.instacart.com` |
| Instacart CA | `*.instacart.ca`  |

## 🔓 Paywall Bypass Script

A comprehensive user script designed to help bypass paywalls on news websites by redirecting to archive services.
Current version: `2.0.6.260916`.

### ✨ Features

- **Floating Button Interface**: Mobile and desktop-friendly floating button with dropdown menu
- **Multiple Archive Services**: Access to Archive.today, Archive.is, Archive.ph,Archive.org, and RemovePaywall
- **Right-Click Menu Integration**: Quick access through browser context menu
- **Extensive Site Support**: Works with hundreds of news websites including:
  - Major publications (NY Times, Washington Post, The Guardian, etc.)
  - Business news (Bloomberg, Financial Times, Wall Street Journal, etc.)
  - Tech sites (Wired, The Verge, TechCrunch, etc.)
  - Regional news outlets worldwide
- **Auto Banner Removal**: Automatically removes archive service banners
- **Persistent Settings**: Button visibility preference is saved between sessions

### 📥 Installation

#### 🌐 Browser Extensions

1. Install a user script manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge, Opera)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Safari, Edge, Opera)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. Install the script:
   - Download [`paywall-bypass-script.js`](paywall-bypass-script.js)
   - Open your user script manager
   - Import the script file

#### 🛡️ AdGuard Extension

1. Install AdGuard Extension:
   - [AdGuard for Chrome](https://chrome.google.com/webstore/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg)
   - [AdGuard for Firefox](https://addons.mozilla.org/firefox/addon/adguard-adblocker/)
   - [AdGuard for Safari](https://apps.apple.com/app/adguard-for-safari/id1437211857)
   - [AdGuard for Edge](https://microsoftedge.microsoft.com/addons/detail/adguard-adblocker/ocampobgifmogmbnmjokkkhljpkbjghnk)

2. Enable User Scripts:
   - Open AdGuard settings
   - Go to "Extensions" or "User Scripts" section
   - Enable user scripts functionality

3. Install the script:
   - **Option 1: Download and Import**
     - Download [`paywall-bypass-script.js`](paywall-bypass-script.js)
     - In AdGuard settings, navigate to the user scripts section
     - Click "Add script" or "Import script"
     - Select the downloaded JavaScript file
     - Save the configuration

   - **Option 2: Direct URL Installation**
     - Copy the direct URL to the script: `https://raw.githubusercontent.com/LanikSJ/userscripts/main/paywall-bypass-script.js`
     - In AdGuard settings, navigate to the user scripts section
     - Click "Add script" or "Import script"
     - Choose "Install from URL" option
     - Paste the copied URL
     - Click "Install" or "Add"
     - Save the configuration

4. Verify installation:
   - Visit a supported news website
   - Look for the floating button in the bottom-right corner
   - The script should be active and functional

#### 📱 AdGuard App (Desktop/Mobile)

1. Install AdGuard Application:
   - [AdGuard for Windows](https://adguard.com/en/adguard-windows/overview.html)
   - [AdGuard for Mac](https://adguard.com/en/adguard-mac/overview.html)
   - [AdGuard for Android](https://adguard.com/en/adguard-android/overview.html)
   - [AdGuard for iOS](https://adguard.com/en/adguard-ios/overview.html)

2. Enable User Scripts:
   - Open AdGuard application
   - Go to Settings → Content Blocking → User Scripts
   - Enable user scripts functionality

3. Install the script:
   - **Option 1: Download and Import**
     - Download [`paywall-bypass-script.js`](paywall-bypass-script.js)
     - In AdGuard app, go to Settings → Content Blocking → User Scripts
     - Click "Add script" or "Import script"
     - Select the downloaded JavaScript file
     - Save the configuration

   - **Option 2: Direct URL Installation**
     - Copy the direct URL to the script: `https://raw.githubusercontent.com/LanikSJ/userscripts/main/paywall-bypass-script.js`
     - In AdGuard app, go to Settings → Content Blocking → User Scripts
     - Click "Add script" or "Import script"
     - Choose "Install from URL" option
     - Paste the copied URL
     - Click "Install" or "Add"
     - Save the configuration

4. Verify installation:
   - Visit a supported news website in your browser
   - Look for the floating button in the bottom-right corner
   - The script should be active and functional

**Note:** The AdGuard app works system-wide and will apply the user script to all browsers on your device, while the
browser extension only works in the specific browser where it's installed.

### 🎮 Usage

- **Floating Button**: A small button appears in the bottom-right corner of your browser
- **Dropdown Menu**: Click the button to reveal archive service options
- **Right-Click Menu**: Access archive services through your browser's context menu
- **Menu Commands**: Use the user script manager's menu to toggle the floating button

### 🌐 Supported Sites

The script supports paywall bypass for hundreds of news websites across the globe, including but not limited to:

- **News**: New York Times, Washington Post, The Guardian, BBC, CNN, etc.
- **Business**: Bloomberg, Financial Times, Wall Street Journal, Economist, etc.
- **Tech**: Wired, The Verge, TechCrunch, Ars Technica, etc.
- **Regional**: Sites from Australia, Europe, Asia, and the Americas

## 💬 phpBB Forum Helper

A user script that enhances phpBB forums running the ProSilver style. Current version: `1.2.5.260915`.

**Note:** The script header now includes `@downloadURL`, `@updateURL`, and `@homepageURL` metadata, so your user
script manager can check GitHub for updates automatically.

[![Install Script](https://img.shields.io/badge/Install-phpBB%20Forum%20Helper-blue?style=for-the-badge&logo=greasyfork)](https://raw.githubusercontent.com/LanikSJ/userscripts/main/php-forum-helper.js)

**One-click installation:** Click the button above to install the phpBB Forum Helper directly to your browser extension,
or download [`php-forum-helper.js`](php-forum-helper.js) for manual import.

### ✨ phpBB Features

- **View User's Posts & Topics**: Injects pill-style **post** / **topic** buttons into each poster's profile panel,
  placed directly under the Contact row (falls back to under Posts or the end of the profile). They link to
  `search.php` filtered by that author.
- **Clickable Rows**: Makes entire forum and topic list rows (`.row`) clickable — clicking anywhere opens the
  forum/topic title link, while middle-click still performs the browser's native behavior.
- **Ad & Metadata Removal**: Removes injected ad containers (`#gootop`, `#goobot`, `.adsbygoogle`) and hidden
  metadata (`description`, `keywords`, `copyright` meta tags).
- **Favicon Fix**: Restores the favicon on the Custom Buttons forum.

### 📥 phpBB Installation

1. Install a user script manager (Tampermonkey, Violentmonkey, Greasemonkey, or AdGuard — see the detailed steps in the
   [Paywall Bypass installation section](#-installation)).
2. Install the script:
   - One-click: use the **Install phpBB Forum Helper** button above
   - Download [`php-forum-helper.js`](php-forum-helper.js) and import it into your user script manager, **or**
   - Install from URL: `https://raw.githubusercontent.com/LanikSJ/userscripts/main/php-forum-helper.js`
3. Verify installation:
   - Visit a supported phpBB forum (see [Supported Sites](#-phpbb-supported-sites))
   - Look for the **post** / **topic** buttons in each user's profile panel

### 🎮 phpBB Usage

- Visit any supported phpBB forum — everything runs automatically.
- Look for the **post** / **topic** buttons in each user's profile panel when reading a topic.
- Click anywhere in a forum or topic row to open it; middle-click to open in a background tab.
- On a supported board's registration page, form fields are validated live as you type.

### 🌐 phpBB Supported Sites

All matched forums run the ProSilver style:

| Forum                | URL                                   |
| -------------------- | ------------------------------------- |
| AdBlock Plus         | `adblockplus.org/forum`               |
| Custom Buttons       | `custombuttons.sourceforge.net/forum` |
| Folding Forum        | `foldingforum.org`                    |
| Debian Forums        | `forums.debian.net`                   |
| InformAction         | `forums.informaction.com`             |
| Lanik Forums         | `forums.lanik.us`                     |
| Linux Mint Community | `forums.linuxmint.com`                |
| Sandboxie            | `forums.sandboxie.com`                |
| VirtualBox           | `forums.virtualbox.org`               |
| Battle for Wesnoth   | `forums.wesnoth.org`                  |
| xkcd                 | `forums.xkcd.com`                     |
| Enjoy Sudoku         | `forum.enjoysudoku.com`               |
| FreeGameDev          | `forum.freegamedev.net`               |
| OpenOffice           | `forum.openoffice.org`                |
| Pale Moon            | `forum.palemoon.org`                  |
| VideoLAN             | `forum.videolan.org`                  |
| IBDOF                | `ibdof.com`                           |
| XnView               | `newsgroup.xnview.com`                |
| Sublime Text         | `www.sublimetext.com/forum`           |
| Synthesia            | `*.synthesiagame.com/forum`           |

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! If you find additional sites that could be supported or have improvements to suggest, please
submit a pull request.

## 🛠️ Scripts Directory

The `/scripts/` directory contains utility tools for maintaining and validating the userscript:

### `domain_checker.py`

A Python script that:

- Extracts all domains from the `@match` section of the userscript
- Validates domain accessibility by making HTTP requests
- Reports which domains are alive, offline, or timing out
- Helps identify broken or inaccessible domains in the filter list

**Usage:**

```bash
cd LanikSJ/userscripts/scripts
python3 domain_checker.py
```

### `run_checker.sh`

A shell script wrapper that:

- Creates a Python virtual environment
- Installs required dependencies from `requirements.txt`
- Runs the domain checker script
- Cleans up the virtual environment after execution
- Provides a simple one-command solution for domain validation

**Usage:**

```bash
cd LanikSJ/userscripts/scripts
./run_checker.sh
```

### `requirements.txt`

Python dependencies required for the domain validation tools:

- `requests`: For making HTTP requests to validate domains
- `certifi`, `charset-normalizer`, `idna`, `urllib3`: Supporting libraries for HTTP functionality

**Purpose:**

These scripts help maintain the quality of the userscript by:

- Identifying domains that are no longer accessible
- Ensuring the filter list remains up-to-date
- Providing automated validation before releases
- Helping contributors verify their domain additions

## ⚠️ Disclaimer

This script is intended for educational purposes and to access content that may be temporarily restricted.
Please respect copyright and terms of service of content providers. Use at your own risk.
