// ==UserScript==
// @name               GitHub Enhancer Tools
// @description        Enhanced Features: One-click access to repository homepage, repository cover and repository analysis; one-click intelligent repository analysis; one-click download of files and folders; one-click preview of HTML files; one-click browsing of repositories via JSDelivr.
// @namespace          https://github.com/LanikSJ/github-enhancer-tools
// @author             RunningCheese and LanikSJ
// @version            1.5.6.261007
// @match              https://github.com/*
// @icon               https://t1.gstatic.cn/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://github.com
// @license            MIT
// @downloadURL        https://raw.githubusercontent.com/LanikSJ/userscripts/main/github-enhancer-tools.js
// @updateURL          https://raw.githubusercontent.com/LanikSJ/userscripts/main/github-enhancer-tools.js
// @homepageURL        https://laniksj.github.io/userscripts
// @homepage           https://github.com/LanikSJ/userscripts
// @run-at             document-start
// ==/UserScript==

'use strict'

// Inline SVG markup for JSDelivr and Preview icons
const jsdelivrSvgMarkup = `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="height: 20px; width: 20px; vertical-align: middle;">
    <g transform="matrix(1, 0, 0, 1, -2.349005, -12.474996)">
      <path d="M 249.749 24.95 L 205.472 182.301 L 205.472 341.153 L 249.749 500 L 295.279 341.153 L 295.279 182.301 L 249.749 24.95 Z" style="fill: rgb(189, 72, 59);"/>
      <path fill="#e64e3d" d="M 249.749 24.95 L 30.413 103.952 L 61.577 396.078 L 249.749 500"/>
      <path d="M 249.749 500 L 438.888 395.01 L 474.285 102.913 L 249.749 24.95" style="fill: rgb(189, 72, 59);"/>
      <path d="M 209.947 377.775 C 188.616 371.106 169.308 359.19 153.778 343.117 L 153.739 343.088 C 138.906 327.783 127.962 309.135 121.832 288.72 C 125.426 292.028 129.21 295.103 133.181 297.943 C 133.238 298.049 133.291 298.177 133.333 298.729 C 133.291 298.167 133.238 298.038 133.181 297.943 C 140.723 303.22 148.83 307.634 157.357 311.099 C 159.898 312.1 162.471 313.025 165.084 313.879 C 165.242 313.964 165.427 313.964 165.584 314.021 C 166.037 314.193 166.499 314.35 166.967 314.494 C 168.044 325.26 176.129 334.012 186.782 335.933 C 190.871 352.425 198.656 366.525 209.947 377.775 M 218.212 188.259 C 218.212 192.878 219.471 197.201 221.678 200.848 C 203.96 225.839 191.63 252.966 186.338 279.811 C 185.752 282.796 185.252 285.736 184.842 288.635 C 178.726 290.246 173.583 294.235 170.36 299.498 C 170.184 299.478 170.017 299.43 169.86 299.354 C 169.531 299.268 169.288 299.155 168.993 299.054 C 153.992 294.102 140.345 285.731 129.135 274.606 C 127.604 273.076 126.126 271.499 124.697 269.873 L 124.116 269.177 L 122.476 267.223 L 121.803 266.379 C 121.613 266.136 121.442 265.921 121.278 265.741 L 121.035 265.412 C 120.75 265.077 120.498 264.759 120.278 264.444 L 119.954 264.029 L 119.897 263.914 C 119.71 263.714 119.554 263.443 119.368 263.218 C 118.586 262.175 117.838 261.103 117.128 260.011 C 116.989 259.848 116.87 259.663 116.775 259.453 L 116.489 259.067 C 114.153 224.289 125.554 189.98 148.234 163.516 C 164.46 144.516 185.694 130.455 209.518 122.927 C 209.9 125.531 210.352 128.162 210.872 130.811 C 213.609 144.597 218.184 158.496 224.4 172.124 C 220.539 176.399 218.212 182.072 218.212 188.259 M 203.99 312.072 C 204.018 315.79 202.411 319.331 199.599 321.763 C 195.356 325.494 189.174 326.019 184.374 323.045 C 182.268 321.766 180.576 319.912 179.499 317.701 C 178.65 315.947 178.217 314.021 178.231 312.072 C 178.231 307.93 180.233 304.04 183.603 301.633 C 189.58 297.324 197.95 298.916 201.82 305.127 C 203.294 307.181 204.013 309.603 203.99 312.072 M 255.321 188.259 C 255.363 195.385 249.587 201.176 242.466 201.163 C 241.836 201.163 241.227 201.134 240.64 201.077 C 240.525 201.028 240.407 201 240.282 200.99 C 230.491 199.537 225.945 188.03 232.098 180.28 C 234.6 177.124 238.438 175.322 242.466 175.417 L 243.004 175.417 C 249.873 175.742 255.282 181.386 255.321 188.259" style="fill: rgb(254, 200, 47);"/>
      <path d="M 383.267 250.258 C 383.267 263.191 381.426 275.66 378.018 287.466 C 366.212 284.263 354.752 279.897 343.804 274.434 C 344.743 269.773 344.284 264.939 342.493 260.535 C 356.492 246.55 368.48 230.691 378.119 213.408 C 381.455 225.109 383.267 237.497 383.267 250.258 M 370.85 193.993 C 369.935 195.991 368.981 197.964 367.985 199.922 C 358.757 217.97 346.796 234.481 332.531 248.877 C 324.16 243.824 313.573 244.295 305.684 250.073 C 298.245 244.19 291.152 237.87 284.445 231.153 C 275.955 222.679 268.109 213.584 260.97 203.941 C 267.667 196.081 268.629 184.831 263.362 175.942 C 279.87 159.959 298.692 146.56 319.203 136.198 C 341.734 149.954 359.701 170.06 370.85 193.993 M 332.874 269.643 C 333.317 279.544 322.878 286.213 314.084 281.647 C 310.004 279.53 307.362 275.392 307.153 270.803 L 307.554 270.488 C 307.401 270.393 307.258 270.283 307.124 270.159 L 307.11 269.63 C 307.162 261.021 315.461 254.863 323.722 257.313 C 329.137 258.986 332.845 263.977 332.874 269.643 M 336.22 287.667 C 327.968 295.132 315.695 296.018 306.457 289.816 C 305.895 290.188 305.351 290.532 304.817 290.841 C 287.815 301.709 269.235 309.874 249.734 315.051 L 249.734 383.819 C 303.535 383.819 352.083 351.544 372.898 301.933 C 360.235 298.396 347.951 293.62 336.22 287.667" style="fill: rgb(223, 156, 38);"/>
      <path d="M 249.749 315.051 C 238.623 317.959 227.231 319.713 215.749 320.279 L 213.923 320.394 C 211.773 326.238 207.45 331 201.963 333.793 C 205.457 346.753 211.773 358.003 220.768 366.969 C 228.238 374.438 237.332 380.082 247.722 383.79 L 249.749 383.819 L 249.749 315.051 Z" style="fill: rgb(254, 200, 47);"/>
      <path d="M 295.738 269.643 C 295.747 267.174 296.099 264.806 296.79 262.547 C 279.064 248.638 263.248 232.46 249.749 214.418 L 249.749 299.183 C 266.471 294.283 282.409 287.027 297.09 277.642 C 296.195 275.074 295.738 272.371 295.738 269.643" style="fill: rgb(223, 156, 38);"/>
      <path d="M 249.749 214.418 C 249.105 213.579 248.452 212.807 247.866 211.94 C 243.043 213.046 237.99 212.65 233.399 210.8 C 217.231 233.694 206.139 258.428 201.32 282.776 C 200.877 285.083 200.481 287.342 200.138 289.545 C 206.939 292.328 212.226 298.043 214.337 305.112 C 214.547 305.065 214.767 305.046 214.995 305.055 C 226.526 304.503 238.186 302.491 249.749 299.183 L 249.749 214.418 Z" style="fill: rgb(254, 200, 47);"/>
      <path d="M 249.749 116.755 L 249.749 165.14 C 250.439 165.356 251.131 165.618 251.817 165.922 C 267.061 151.022 284.182 138.177 302.749 127.704 C 286.023 120.449 267.981 116.721 249.749 116.755" style="fill: rgb(223, 156, 38);"/>
      <path d="M 249.749 116.755 C 241.065 116.755 232.636 117.556 224.472 119.153 C 224.828 121.96 225.33 124.911 225.911 127.79 C 228.308 140.049 232.313 152.381 237.732 164.498 C 241.727 163.696 245.859 163.916 249.749 165.14 L 249.749 116.755 Z" style="fill: rgb(254, 200, 47);"/>
    </g>
  </svg>`

const previewSvgMarkup = `<svg viewBox="0 0 24 24" width="16" height="16" fill="#f0883e" style="vertical-align: middle;">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>`

const homepageSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 16 16" style="display:block"><rect x="0.75" y="0.75" width="14.5" height="14.5" rx="3" stroke="currentColor" stroke-width="1"/><path d="M3 8l5-4.5 5 4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 7.5v6h3v-3.5h1v3.5h3v-6" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`
const coverSvgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 16 16" style="display:block"><rect x="0.75" y="0.75" width="14.5" height="14.5" rx="3" stroke="currentColor" stroke-width="1"/><circle cx="5.5" cy="5.5" r="1.4" stroke="currentColor" stroke-width="1"/><path d="M2.5 12.5l3-4 2.5 3 2-2.5 3.5 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" style="stroke-linejoin:round"/></svg>`

// ====== Shared Safety Helpers ======

const VALID_NAVIGATION_ORIGINS = [
  'https://github.com',
  'https://htmlpreview.github.io',
  'https://cdn.jsdelivr.net'
]

const FORBIDDEN_URL_CHARS = ['<', '>', '"', "'"]

function openHttpsUrl(target) {
  if (typeof target !== 'string' || FORBIDDEN_URL_CHARS.some(char => target.includes(char))) {
    console.warn('Blocked navigation to an invalid target:', target)
    return
  }
  let parsed
  try {
    parsed = new URL(target, window.location.href)
  } catch (error) {
    console.warn('Blocked navigation to an invalid URL:', target)
    return
  }
  // Enhanced validation: check both protocol and hostname origin
  if (parsed.protocol !== 'https:') {
    console.warn('Blocked navigation to a non-HTTPS URL:', parsed.href)
    return
  }
  // Validate hostname is from a trusted origin (same site or github pages)
  const origin = `${parsed.protocol}//${parsed.hostname}`
  const isTrustedOrigin = origin === window.location.origin ||
    VALID_NAVIGATION_ORIGINS.includes(origin) ||
    parsed.hostname.startsWith('127.0.0.1') ||
    parsed.hostname.startsWith('localhost')

  if (!isTrustedOrigin) {
    console.warn('Blocked navigation to untrusted origin:', origin)
    return
  }
  // Use window.open with _blank and explicit features for safer navigation
  const win = window.open(parsed.href, '_blank', 'noopener,noreferrer')
  if (win) {
    win.opener = null // Additional security: null out opener reference
  }
}

function setSvgMarkup(element, markup) {
  const svgRoot = new DOMParser().parseFromString(markup, 'text/html').body.querySelector('svg')
  if (svgRoot) element.replaceChildren(document.importNode(svgRoot, true))
}

// ====== Auto-Width Style Injection ======

function injectAutoWidthStyle() {
  if (document.getElementById('gek-auto-width-style')) return
  const autoWidthStyle = document.createElement('style')
  autoWidthStyle.id = 'gek-auto-width-style'
  autoWidthStyle.textContent = `
    /* Target Primer CSS Grid container directly */
    body div[class*="PageLayout-module__container"],
    body page-layout {
      grid-template-columns: minmax(0, 1fr) 320px !important;
      max-width: 100vw !important;
      width: 100% !important;
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    /* Prevent inner content blowout in grid column */
    body div[class*="PageLayout-module__main"],
    body div[class*="PageLayout-module__content"],
    body div[class*="PageLayout-module__centerColumn"] {
      min-width: 0 !important;
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Expand legacy layout containers if present */
    .container-xl,
    .container-lg,
    .AppHeader-context,
    .repository-content {
      max-width: 100% !important;
      width: 100% !important;
    }

    /* Make file table and code containers stretch edge-to-edge */
    table.react-directory-table,
    div[class*="react-repos-overview-margin-offset"],
    div[aria-label="Code"],
    div.react-blob-print-hide {
      width: 100% !important;
      max-width: 100% !important;
    }
  `
  document.head.appendChild(autoWidthStyle)
}

// ====== GitHub Folder & File Downloader ======

function injectFolderDownloadStyle() {
  const folderDownloadStyle = document.createElement('style')
  folderDownloadStyle.textContent = `
    .github-download-icon {
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    .github-download-icon:hover {
      transform: scale(1.1);
    }
  `
  document.head.appendChild(folderDownloadStyle)
}

const DOWNLOAD_ALLOWED_HOSTS = ['raw.githubusercontent.com']

async function downloadFile(fileInfo) {
  if (!fileInfo || !fileInfo.url) return
  const safeUrl = new URL(fileInfo.url, 'https://raw.githubusercontent.com')
  if (safeUrl.protocol !== 'https:' || !DOWNLOAD_ALLOWED_HOSTS.includes(safeUrl.hostname)) {
    console.error(`Refusing to download from untrusted origin: ${safeUrl.origin}`)
    return
  }
  try {
    const response = await fetch(safeUrl.href)
    if (!response.ok) throw new Error(`Download failed with HTTP status ${response.status}`)
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileInfo.fileName
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Download failed:', error)
  }
}

function replaceFolderIcons(row) {
  const folderSvgs = row.querySelectorAll('.react-directory-filename-column svg.icon-directory')
  folderSvgs.forEach(svg => {
    if (svg.dataset.replaced) return
    svg.innerHTML = '<path d="M14.2,3H7.5C7.4,3,7.3,3,7.3,2.9L6.4,1.7C6.1,1.3,5.5,1,5,1H1.8C0.8,1,0,1.8,0,2.8v10.5c0,1,0.8,1.8,1.8,1.8h12.5c1,0,1.8-0.8,1.8-1.8V4.8C16,3.8,15.2,3,14.2,3z M10.8,9.8l-2.4,2.4c-0.2,0.2-0.6,0.2-0.8,0L5.2,9.8C5,9.6,5,9.2,5.2,9C5.3,8.7,5.8,8.7,6,9l1.4,1.3V7c0-0.3,0.3-0.6,0.6-0.6S8.5,6.7,8.5,7v3.3L10,9c0.2-0.2,0.6-0.2,0.8,0C11,9.2,11,9.6,10.8,9.8z"/>'
    svg.classList.add('github-download-icon')
    svg.dataset.replaced = 'true'

    const folderLink = row.querySelector('a[href*="/tree/"]')
    if (folderLink) {
      const fullUrl = folderLink.href
      const downloadUrl = `https://downgit.evecalm.com/#/home?url=${encodeURIComponent(fullUrl)}`
      svg.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        openHttpsUrl(downloadUrl)
      })
    }
  })
}

function replaceFileIcons(row) {
  const fileSvgs = row.querySelectorAll('.react-directory-filename-column svg.color-fg-muted')
  fileSvgs.forEach(svg => {
    if (svg.dataset.replaced) return
    svg.innerHTML = '<g><path d="M14.5,3.4l-2.9-2.9C11.2,0.2,10.8,0,10.3,0H3.8C2.8,0,2,0.8,2,1.8v12.5c0,1,0.8,1.8,1.8,1.8h9.5c1,0,1.8-0.8,1.8-1.8V4.7C15,4.2,14.8,3.8,14.5,3.4z M10.5,1.6L10.5,1.6l2.9,2.9l0,0h-2.7c-0.1,0-0.2-0.1-0.2-0.2V1.6z M13.5,14.2c0,0.1-0.1,0.2-0.2,0.2H3.8c-0.1,0-0.2-0.1-0.2-0.2V1.8c0-0.1,0.1-0.2,0.2-0.2H9v2.8C9,5.2,9.8,6,10.8,6h2.8V14.2z"/><path d="M9.1,10.6V7.3c0-0.3-0.3-0.6-0.6-0.6S7.9,7,7.9,7.3v3.3L6.5,9.3C6.3,9,5.9,9,5.7,9.3c-0.2,0.2-0.2,0.6,0,0.8l2.4,2.4c0.2,0.2,0.6,0.2,0.8,0h0l2.4-2.4c0.2-0.2,0.2-0.6,0-0.8c-0.2-0.2-0.6-0.2-0.8,0L9.1,10.6z"/></g>'
    svg.setAttribute('viewBox', '0 0 16 16')
    svg.classList.add('github-download-icon')
    svg.dataset.replaced = 'true'

    const fileLink = row.querySelector('a[href]')
    if (fileLink) {
      const downloadUrl = fileLink.href
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/')
      const fileName = fileLink.textContent.trim()
      svg.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        downloadFile({ url: downloadUrl, fileName })
      })
    }
  })
}

function replaceIcons() {
  const directoryRows = document.querySelectorAll('tr.react-directory-row')
  directoryRows.forEach(row => {
    replaceFolderIcons(row)
    replaceFileIcons(row)
  })
}

// ====== End folder & file downloader ======

function buildFileLinks(pathname) {
  const isFolder = pathname.includes('/tree/')
  const isFile = pathname.includes('/blob/')
  if (!isFolder && !isFile) return null

  const marker = isFolder ? '/tree/' : '/blob/'
  const markerIndex = pathname.indexOf(marker)
  const author = pathname.slice(1, markerIndex)
  const rest = pathname.slice(markerIndex + marker.length)
  const version = rest.slice(0, rest.indexOf('/'))
  const filepath = rest.slice(rest.indexOf('/'))

  const link = `https://cdn.jsdelivr.net/gh/${author}@${version}${filepath}${isFolder ? '/' : ''}`
  const isHtmlDoc = !isFolder && isFile && /\.html?$/i.test(filepath)
  const previewUrl = isHtmlDoc
    ? `https://htmlpreview.github.io/?https://raw.githubusercontent.com/${author}/${version}${filepath}`
    : null
  return { link, previewUrl }
}

function ensureFileButton(copyPathButton, { label, svgMarkup, onClick }) {
  const existingButton = document.querySelector(`button[aria-label="${label}"]`)
  if (existingButton) {
    existingButton.onclick = onClick
    return
  }

  const wrapper = copyPathButton.parentElement
  const container = wrapper.parentElement
  const node = wrapper.cloneNode(true)
  const button = node.querySelector('button')
  button.setAttribute('title', label)
  button.setAttribute('aria-label', label)
  setSvgMarkup(button, svgMarkup)
  container.appendChild(node)
  Array.from(node.children).forEach(child => child.getAttribute('title') !== label && node.removeChild(child))
  button.onclick = onClick
}

function runFileButtons(copyPathButton) {
  const links = buildFileLinks(window.location.pathname)
  if (!links) return

  if (links.previewUrl) {
    ensureFileButton(copyPathButton, {
      label: 'Preview HTML',
      svgMarkup: previewSvgMarkup,
      onClick: () => openHttpsUrl(links.previewUrl)
    })
  }

  ensureFileButton(copyPathButton, {
    label: 'Open JsDelivr Link',
    svgMarkup: jsdelivrSvgMarkup,
    onClick: () => openHttpsUrl(links.link)
  })
}

// ====== Repo Header Buttons ======

const HEADER_CONTAINER_ID = 'gek-header-buttons'
const HEADER_SELECTOR = 'strong[itemprop="name"] a'
const ALLOWED_API_HOSTS = ['api.github.com']

function findHeaderInsertTarget(titleLink, titleComponent) {
  const mr1 = titleComponent ? titleComponent.querySelector('.mr-1') : null
  if (mr1) return mr1
  const titleContainer = titleLink.closest('li, h1, strong')
  if (titleContainer) {
    return titleContainer.querySelector('.mr-1, .Label') || titleContainer
  }
  const parentEl = titleLink.parentElement
  return (parentEl && parentEl.querySelector('.mr-1, .Label')) || titleLink
}

function createRepoSizeBadge(repoInfo) {
  const sizeBadge = document.createElement('span')
  sizeBadge.textContent = 'loading...'
  sizeBadge.classList.add('Label')
  sizeBadge.style.fontSize = '11px'
  sizeBadge.style.fontWeight = '500'

  const safeOwner = encodeURIComponent(repoInfo.owner)
  const safeRepo = encodeURIComponent(repoInfo.repo)
  const apiUrl = new URL(`https://api.github.com/repos/${safeOwner}/${safeRepo}`)

  if (ALLOWED_API_HOSTS.includes(apiUrl.hostname)) {
    fetch(apiUrl.href)
      .then(r => r.json())
      .then(data => {
        const kb = data.size || 0
        if (kb >= 1048576) sizeBadge.textContent = `${(kb / 1048576).toFixed(2)} GB`
        else if (kb >= 1024) sizeBadge.textContent = `${(kb / 1024).toFixed(1)} MB`
        else sizeBadge.textContent = `${kb} KB`
      })
      .catch(() => { sizeBadge.textContent = 'n/a' })
  }

  return sizeBadge
}

function createHeaderActionLink(href, title, svgMarkup) {
  const link = document.createElement('a')
  link.href = href
  link.target = '_blank'
  link.title = title
  link.classList.add('Link', 'Link--muted')
  link.style.display = 'inline-flex'
  link.style.alignItems = 'center'
  link.style.color = 'inherit'
  setSvgMarkup(link, svgMarkup)
  return link
}

function createHeaderContainer(repoInfo) {
  const container = document.createElement('span')
  container.id = HEADER_CONTAINER_ID
  container.style.display = 'inline-flex'
  container.style.alignItems = 'center'
  container.style.gap = '8px'
  container.style.marginLeft = '8px'
  container.style.whiteSpace = 'nowrap'

  container.appendChild(createRepoSizeBadge(repoInfo))

  const pagesHref = (window.location.host === 'github.com' && window.location.href.includes('.html'))
    ? 'https://htmlpreview.github.io/?' + window.location.href
    : `https://${repoInfo.owner}.github.io/${repoInfo.repo}`
  container.appendChild(createHeaderActionLink(pagesHref, 'GitHub Pages', homepageSvgMarkup))

  const ogImage = document.querySelector('meta[property="og:image"]')
  if (ogImage && ogImage.content) {
    container.appendChild(createHeaderActionLink(ogImage.content, 'View cover image', coverSvgMarkup))
  }
  return container
}

function addHeaderButtons() {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  if (pathParts.length !== 2) return
  const [owner, repo] = pathParts
  const repoInfo = { owner, repo }

  const titleComponent = document.getElementById('repo-title-component')
  const titleLink = (titleComponent && titleComponent.querySelector('a[data-testid="repo-name-link"]'))
    || document.querySelector(HEADER_SELECTOR)
  if (!titleLink) return

  const insertTarget = findHeaderInsertTarget(titleLink, titleComponent)
  const existing = document.getElementById(HEADER_CONTAINER_ID)
  if (existing) {
    if (existing.previousElementSibling === insertTarget) return
    existing.remove()
  }

  const titleParent = titleLink.closest('strong, li, h1')
  if (titleParent) {
    titleParent.style.whiteSpace = 'nowrap'
  }

  insertTarget.insertAdjacentElement('afterend', createHeaderContainer(repoInfo))
}

// ====== Unified Immediate Injection ======

const runAllInjections = () => {
  addHeaderButtons()
  const copyPathButton = document.querySelector('[aria-label="Copy path"]')
  if (copyPathButton) runFileButtons(copyPathButton)
  replaceIcons()
}

let _rafId = 0
const globalObserver = new MutationObserver(() => {
  cancelAnimationFrame(_rafId)
  _rafId = requestAnimationFrame(runAllInjections)
})

globalObserver.observe(document.documentElement, { childList: true, subtree: true })

const onSoftNav = () => requestAnimationFrame(runAllInjections)
document.addEventListener('turbo:render', onSoftNav)
document.addEventListener('turbo:load', onSoftNav)
document.addEventListener('soft-nav:rendered', onSoftNav)

const init = () => {
  injectAutoWidthStyle()
  injectFolderDownloadStyle()
  runAllInjections()
}

if (document.head) {
  injectAutoWidthStyle()
  injectFolderDownloadStyle()
} else {
  document.addEventListener('DOMContentLoaded', () => {
    injectAutoWidthStyle()
    injectFolderDownloadStyle()
  }, { once: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true })
} else {
  init()
}
