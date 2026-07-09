// ==UserScript==
// @name         Paywall Bypass
// @namespace    http://github.com/
// @version      2.0.4
// @description  Mobile and desktop-friendly paywall bypass with dropdown menu and right-click options.
// @downloadURL  https://raw.githubusercontent.com/LanikSJ/userscripts/main/paywall-bypass-script.js
// @updateURL    https://raw.githubusercontent.com/LanikSJ/userscripts/main/paywall-bypass-script.js
// @homepageURL  https://laniksj.github.io/userscripts
// @author       sharmanhall and LanikSJ
// @license      MIT
// @icon         data:image/png;base64,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
// @match        *://*.adweek.com/*
// @match        *://adweek.com/*
// @match        *://*.americanbanker.com/*
// @match        *://americanbanker.com/*
// @match        *://*.ampproject.org/*
// @match        *://ampproject.org/*
// @match        *://*.arstechnica.com/*
// @match        *://arstechnica.com/*
// @match        *://*.avclub.com/*
// @match        *://avclub.com/*
// @match        *://*.baltimoresun.com/*
// @match        *://baltimoresun.com/*
// @match        *://*.barrons.com/*
// @match        *://barrons.com/*
// @match        *://*.bbc.co.uk/*
// @match        *://bbc.co.uk/*
// @match        *://*.bizjournals.com/*
// @match        *://bizjournals.com/*
// @match        *://*.bloomberg.com/*
// @match        *://bloomberg.com/*
// @match        *://*.bostonglobe.com/*
// @match        *://bostonglobe.com/*
// @match        *://*.britannica.com/*
// @match        *://britannica.com/*
// @match        *://*.businessinsider.com/*
// @match        *://businessinsider.com/*
// @match        *://*.cbsnews.com/*
// @match        *://cbsnews.com/*
// @match        *://*.chicagobusiness.com/*
// @match        *://chicagobusiness.com/*
// @match        *://*.chicagotribune.com/*
// @match        *://chicagotribune.com/*
// @match        *://*.clickhole.com/*
// @match        *://clickhole.com/*
// @match        *://*.cnbc.com/*
// @match        *://cnbc.com/*
// @match        *://*.corriere.it/*
// @match        *://corriere.it/*
// @match        *://*.courant.com/*
// @match        *://courant.com/*
// @match        *://*.crunchbase.com/*
// @match        *://crunchbase.com/*
// @match        *://*.cnn.com/*
// @match        *://cnn.com/*
// @match        *://*.dailymail.co.uk/*
// @match        *://dailymail.co.uk/*
// @match        *://*.dailypress.com/*
// @match        *://dailypress.com/*
// @match        *://*.denverpost.com/*
// @match        *://denverpost.com/*
// @match        *://*.discovermagazine.com/*
// @match        *://discovermagazine.com/*
// @match        *://*.economist.com/*
// @match        *://economist.com/*
// @match        *://*.engadget.com/*
// @match        *://engadget.com/*
// @match        *://*.espn.com/*
// @match        *://espn.com/*
// @match        *://*.ew.com/*
// @match        *://ew.com/*
// @match        *://*.financialpost.com/*
// @match        *://financialpost.com/*
// @match        *://*.fortune.com/*
// @match        *://fortune.com/*
// @match        *://*.ft.com/*
// @match        *://ft.com/*
// @match        *://*.genomeweb.com/*
// @match        *://genomeweb.com/*
// @match        *://*.glassdoor.com/*
// @match        *://glassdoor.com/*
// @match        *://*.hollywoodreporter.com/*
// @match        *://hollywoodreporter.com/*
// @match        *://*.independent.co.uk/*
// @match        *://independent.co.uk/*
// @match        *://*.inc.com/*
// @match        *://inc.com/*
// @match        *://*.inkl.com/*
// @match        *://inkl.com/*
// @match        *://*.jezebel.com/*
// @match        *://jezebel.com/*
// @match        *://*.journalnow.com/*
// @match        *://journalnow.com/*
// @match        *://*.kotaku.com/*
// @match        *://kotaku.com/*
// @match        *://*.labusinessjournal.com/*
// @match        *://labusinessjournal.com/*
// @match        *://*.latimes.com/*
// @match        *://latimes.com/*
// @match        *://*.lifehacker.com/*
// @match        *://lifehacker.com/*
// @match        *://*.loebclassics.com/*
// @match        *://loebclassics.com/*
// @match        *://*.mcall.com/*
// @match        *://mcall.com/*
// @match        *://*.marketwatch.com/*
// @match        *://marketwatch.com/*
// @match        *://*.medium.com/*
// @match        *://medium.com/*
// @match        *://*.medscape.com/*
// @match        *://medscape.com/*
// @match        *://*.mercurynews.com/*
// @match        *://mercurynews.com/*
// @match        *://*.motherjones.com/*
// @match        *://motherjones.com/*
// @match        *://*.mv-voice.com/*
// @match        *://mv-voice.com/*
// @match        *://*.nationalpost.com/*
// @match        *://nationalpost.com/*
// @match        *://*.newstatesman.com/*
// @match        *://newstatesman.com/*
// @match        *://*.newyorker.com/*
// @match        *://newyorker.com/*
// @match        *://*.nbcnews.com/*
// @match        *://nbcnews.com/*
// @match        *://*.nydailynews.com/*
// @match        *://nydailynews.com/*
// @match        *://*.nymag.com/*
// @match        *://nymag.com/*
// @match        *://*.nytimes.com/*
// @match        *://nytimes.com/*
// @match        *://*.ocregister.com/*
// @match        *://ocregister.com/*
// @match        *://*.orlandosentinel.com/*
// @match        *://orlandosentinel.com/*
// @match        *://*.paloaltoonline.com/*
// @match        *://paloaltoonline.com/*
// @match        *://*.pagesix.com/*
// @match        *://pagesix.com/*
// @match        *://*.people.com/*
// @match        *://people.com/*
// @match        *://*.pitchbook.com/*
// @match        *://pitchbook.com/*
// @match        *://*.politico.com/*
// @match        *://politico.com/*
// @match        *://*.propublica.org/*
// @match        *://propublica.org/*
// @match        *://*.qz.com/*
// @match        *://qz.com/*
// @match        *://*.reuters.com/*
// @match        *://reuters.com/*
// @match        *://*.rollingstone.com/*
// @match        *://rollingstone.com/*
// @match        *://*.sandiegouniontribune.com/*
// @match        *://sandiegouniontribune.com/*
// @match        *://*.scientificamerican.com/*
// @match        *://scientificamerican.com/*
// @match        *://*.scmp.com/*
// @match        *://scmp.com/*
// @match        *://*.seattletimes.com/*
// @match        *://seattletimes.com/*
// @match        *://*.seekingalpha.com/*
// @match        *://seekingalpha.com/*
// @match        *://*.slate.com/*
// @match        *://slate.com/*
// @match        *://*.startribune.com/*
// @match        *://startribune.com/*
// @match        *://*.statista.com/*
// @match        *://statista.com/*
// @match        *://*.sun-sentinel.com/*
// @match        *://sun-sentinel.com/*
// @match        *://*.techcrunch.com/*
// @match        *://techcrunch.com/*
// @match        *://*.techinasia.com/*
// @match        *://techinasia.com/*
// @match        *://*.technologyreview.com/*
// @match        *://technologyreview.com/*
// @match        *://*.telegraph.co.uk/*
// @match        *://telegraph.co.uk/*
// @match        *://*.the-tls.co.uk/*
// @match        *://the-tls.co.uk/*
// @match        *://*.theathletic.co.uk/*
// @match        *://theathletic.co.uk/*
// @match        *://*.theathletic.com/*
// @match        *://theathletic.com/*
// @match        *://*.theatlantic.com/*
// @match        *://theatlantic.com/*
// @match        *://*.thedailybeast.com/*
// @match        *://thedailybeast.com/*
// @match        *://*.thediplomat.com/*
// @match        *://thediplomat.com/*
// @match        *://*.theglobeandmail.com/*
// @match        *://theglobeandmail.com/*
// @match        *://*.thenation.com/*
// @match        *://thenation.com/*
// @match        *://*.thestar.com/*
// @match        *://thestar.com/*
// @match        *://*.thestreet.com/*
// @match        *://thestreet.com/*
// @match        *://*.thewrap.com/*
// @match        *://thewrap.com/*
// @match        *://*.theguardian.com/*
// @match        *://theguardian.com/*
// @match        *://*.theverge.com/*
// @match        *://theverge.com/*
// @match        *://*.tmz.com/*
// @match        *://tmz.com/*
// @match        *://*.tinypass.com/*
// @match        *://tinypass.com/*
// @match        *://*.wsj.com/*
// @match        *://wsj.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  "use strict";

  // Configuration - Load saved preference or default to true
  let showFloatingButton = GM_getValue("showFloatingButton", true);

  // Register menu commands
  GM_registerMenuCommand(
    showFloatingButton ? "Hide Floating Button" : "Show Floating Button",
    toggleFloatingButton,
  );
  GM_registerMenuCommand("Archive Today", () =>
    archivePage("https://archive.today/newest/"),
  );
  GM_registerMenuCommand("Archive Is", () =>
    archivePage("https://archive.is/newest/"),
  );
  GM_registerMenuCommand("Archive Ph", () =>
    archivePage("https://archive.ph/newest/"),
  );
  GM_registerMenuCommand("Archive.org", () =>
    archivePage("https://web.archive.org/web/"),
  );
  GM_registerMenuCommand("Remove Paywall", () =>
    archivePage("https://removepaywall.com/search?url="),
  );

  // Function to toggle floating button visibility
  function toggleFloatingButton() {
    showFloatingButton = !showFloatingButton;
    GM_setValue("showFloatingButton", showFloatingButton);

    const container = document.getElementById("bypassContainer");
    if (container) {
      container.style.display = showFloatingButton ? "block" : "none";
    }

    // Show notification
    alert(
      `Floating button ${showFloatingButton ? "enabled" : "disabled"
      }. Refresh the page for the change to take effect.`,
    );
    location.reload();
  }

  // Add styles for floating button and dropdown
  GM_addStyle(`
        #bypassContainer {
            position: fixed;
            bottom: 10px;
            right: 10px;
            z-index: 99999999999;
            font-family: Arial, sans-serif;
            display: ${showFloatingButton ? "block" : "none"};
        }
        #bypassButton {
            background: #333;
            color: white;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            opacity: 0.8;
            border-radius: 4px;
            min-width: 150px;
        }
        #bypassButton:hover {
            opacity: 1;
        }
        #bypassButton img {
            width: 20px;
            margin-right: 8px;
        }
        #bypassDropdown {
            display: none;
            position: absolute;
            bottom: 100%;
            right: 0;
            background: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 5px;
            width: 200px;
        }
        #bypassDropdown.show {
            display: block;
        }
        .bypass-option {
            padding: 10px 15px;
            cursor: pointer;
            color: #333;
            border-bottom: 1px solid #eee;
            font-size: 14px;
        }
        .bypass-option:last-child {
            border-bottom: none;
        }
        .bypass-option:hover {
            background: #f5f5f5;
        }
        @media (max-width: 768px) {
            #bypassButton {
                padding: 10px 15px;
                font-size: 16px;
            }
            .bypass-option {
                padding: 12px 15px;
                font-size: 16px;
            }
        }
    `);

  // Only create the floating button if enabled
  if (showFloatingButton) {
    // Create container and button elements
    const container = document.createElement("div");
    container.id = "bypassContainer";

    const button = document.createElement("button");
    button.id = "bypassButton";
    button.innerHTML = "Bypass Paywall";

    const dropdown = document.createElement("div");
    dropdown.id = "bypassDropdown";

    // Add dropdown options
    const options = [
      {
        text: "Archive.today",
        action: () => archivePage("https://archive.today/newest/"),
      },
      {
        text: "Archive.is",
        action: () => archivePage("https://archive.is/newest/"),
      },
      {
        text: "Archive.ph",
        action: () => archivePage("https://archive.ph/newest/"),
      },
      {
        text: "Archive.org",
        action: () => archivePage("https://web.archive.org/web/"),
      },
      {
        text: "RemovePaywall",
        action: () => archivePage("https://removepaywall.com/search?url="),
      },
    ];

    options.forEach((option) => {
      const div = document.createElement("div");
      div.className = "bypass-option";
      div.textContent = option.text;
      div.addEventListener("click", (e) => {
        e.stopPropagation();
        option.action();
        dropdown.classList.remove("show");
      });
      dropdown.appendChild(div);
    });

    // Add elements to container
    container.appendChild(button);
    container.appendChild(dropdown);
    document.body.appendChild(container);

    // Toggle dropdown on button click
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdown.classList.remove("show");
    });
  }

  // Check if the protocol is valid (http or https)
  function isValidProtocol(url) {
    return new URL(url).protocol.startsWith("http");
  }

  // Remove banner on 12ft.io
  function removeBanner() {
    const banner = document.getElementById("ad");
    if (banner) {
      banner.remove();
    }
  }

  // Function to open archive pages
  function archivePage(baseURL) {
    const currentUrl = window.location.href;
    if (isValidProtocol(currentUrl)) {
      window.location.href = baseURL + encodeURIComponent(currentUrl);
    }
  }

  // Mutation observer to remove banner if it appears
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        removeBanner();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial banner removal
  removeBanner();

  // Remove duplicate button inside iframe
  function removeDuplicateButton() {
    const iframe = document.getElementById("proxy-frame");
    if (iframe) {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const duplicateButton = iframeDocument.getElementById("bypassButton");
      if (duplicateButton) {
        duplicateButton.remove();
      }
    }
  }

  window.addEventListener("load", removeDuplicateButton);
})();
