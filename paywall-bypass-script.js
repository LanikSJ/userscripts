// ==UserScript==
// @name         Paywall Bypass Script 
// @namespace    http://github.com/
// @version      2.0.0
// @description  Mobile and desktop-friendly paywall bypass with dropdown menu and right-click options.
// @author       sharmanhall and LanikSJ
// @license      MIT
// @icon         data:image/png;base64,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
// @match        *://*.adelaidenow.com.au/*
// @match        *://*.adweek.com/*
// @match        *://*.americanbanker.com/*
// @match        *://*.ambito/*
// @match        *://*.afr.com/*
// @match        *://*.ampproject.org/*
// @match        *://*.arstechnica.com/*
// @match        *://*.avclub.com/*
// @match        *://*.baltimoresun.com/*
// @match        *://*.barrons.com/*
// @match        *://*.bbc.co.uk/*
// @match        *://*.bizjournals.com/*
// @match        *://*.bloomberg.com/*
// @match        *://*.bloombergquint.com/*
// @match        *://*.bostonglobe.com/*
// @match        *://*.brisbanetimes.com.au/*
// @match        *://*.britannica.com/*
// @match        *://*.businessinsider.com/*
// @match        *://*.caixinglobal.com/*
// @match        *://*.cbsnews.com/*
// @match        *://*.cen.acs.org/*
// @match        *://*.centralwesterndaily.com.au/*
// @match        *://*.chicagobusiness.com/*
// @match        *://*.chicagotribune.com/*
// @match        *://*.clickhole.com/*
// @match        *://*.cnbc.com/*
// @match        *://*.corriere.it/*
// @match        *://*.courant.com/*
// @match        *://*.couriermail.com.au/*
// @match        *://*.crunchbase.com/*
// @match        *://*.cnn.com/*
// @match        *://*.dailymail.co.uk/*
// @match        *://*.dailypress.com/*
// @match        *://*.dailytelegraph.com.au/*
// @match        *://*.delfi.ee/*
// @match        *://*.demorgen.be/*
// @match        *://*.denverpost.com/*
// @match        *://*.df.cl/*
// @match        *://*.discovermagazine.com/*
// @match        *://*.dynamed.com/*
// @match        *://*.economist.com/*
// @match        *://*.elmercurio.com/*
// @match        *://*.elmundo.es/*
// @match        *://*.elu24.ee/*
// @match        *://*.english.elpais.com/*
// @match        *://*.entertainment.ie/*
// @match        *://*.entreprenal.com/*
// @match        *://*.engadget.com/*
// @match        *://*.examiner.com.au/*
// @match        *://*.expansion.com/*
// @match        *://*.espn.com/*
// @match        *://*.ew.com/*
// @match        *://*.fd.nl/*
// @match        *://*.financialpost.com/*
// @match        *://*.fnlondon.com/*
// @match        *://*.faz.net/*
// @match        *://*.foreignpolicy.com/*
// @match        *://*.fortune.com/*
// @match        *://*.forbes.pl/*
// @match        *://*.ft.com/*
// @match        *://*.gelocal.it/*
// @match        *://*.genomeweb.com/*
// @match        *://*.glassdoor.com/*
// @match        *://*.globes.co.il/*
// @match        *://*.google.com/news/*
// @match        *://*.groene.nl/*
// @match        *://*.haaretz.co.il/*
// @match        *://*.haaretz.com/*
// @match        *://*.harpers.org/*
// @match        *://*.hbr.org/*
// @match        *://*.hbrchina.org/*
// @match        *://*.heraldsun.com.au/*
// @match        *://*.historyextra.com/*
// @match        *://*.hollywoodreporter.com/*
// @match        *://*.humo.be/*
// @match        *://*.ilmanifesto.it/*
// @match        *://*.independent.co.uk/*
// @match        *://*.independent.ie/*
// @match        *://*.inc.com/*
// @match        *://*.inkl.com/*
// @match        *://*.insight.kontan.co.id/*
// @match        *://*.interest.co.nz/*
// @match        *://*.investorschronicle.co.uk/*
// @match        *://*.irishtimes.com/*
// @match        *://*.ipolitics.ca/*
// @match        *://*.japantimes.co.jp/*
// @match        *://*.jalopnik.com/*
// @match        *://*.jezebel.com/*
// @match        *://*.journalnow.com/*
// @match        *://*.kansascity.com/*
// @match        *://*.kotaku.com/*
// @match        *://*.labusinessjournal.com/*
// @match        *://*.lanacion.com.ar/*
// @match        *://*.lastampa.it/*
// @match        *://*.latercera.com/*
// @match        *://*.latimes.com/*
// @match        *://*.lavoixdunord.fr/*
// @match        *://*.lecho.be/*
// @match        *://*.leparisien.fr/*
// @match        *://*.lesechos.fr/*
// @match        *://*.lifehacker.com/*
// @match        *://*.loebclassics.com/*
// @match        *://*.lrb.co.uk/*
// @match        *://*.mcall.com/*
// @match        *://*.marketwatch.com/*
// @match        *://*.medium.com/*
// @match        *://*.medscape.com/*
// @match        *://*.mercurynews.com/*
// @match        *://*.motherboard.vice.com/*
// @match        *://*.motherjones.com/*
// @match        *://*.mv-voice.com/*
// @match        *://*.nationalpost.com/*
// @match        *://*.newstatesman.com/*
// @match        *://*.newyorker.com/*
// @match        *://*.newyorktimes.com/*
// @match        *://*.nbcnews.com/*
// @match        *://*.nrc.nl/*
// @match        *://*.ntnews.com.au/*
// @match        *://*.nydailynews.com/*
// @match        *://*.nymag.com/*
// @match        *://*.nytimes.com/*
// @match        *://*.nzherald.co.nz/*
// @match        *://*.nzz.ch/*
// @match        *://*.ocregister.com/*
// @match        *://*.onet.pl/*
// @match        *://*.orlandosentinel.com/*
// @match        *://*.outbrain.com/*
// @match        *://*.paloaltoonline.com/*
// @match        *://*.parool.nl/*
// @match        *://*.pagesix.com/*
// @match        *://*.people.com/*
// @match        *://*.pitchbook.com/*
// @match        *://*.piano.io/*
// @match        *://*.politico.com/*
// @match        *://*.poool.fr/*
// @match        *://*.postimees.ee/*
// @match        *://*.propublica.org/*
// @match        *://*.qiota.com/*
// @match        *://*.qz.com/*
// @match        *://*.repubblica.it/*
// @match        *://*.republic.ru/*
// @match        *://*.reuters.com/*
// @match        *://*.rp-online.de/*
// @match        *://*.rp.pl/*
// @match        *://*.rollingstone.com/*
// @match        *://*.sandiegouniontribune.com/*
// @match        *://*.scientificamerican.com/*
// @match        *://*.scmp.com/*
// @match        *://*.seattletimes.com/*
// @match        *://*.seekingalpha.com/*
// @match        *://*.slate.com/*
// @match        *://*.smh.com.au/*
// @match        *://*.sofrep.com/*
// @match        *://*.spectator.co.uk/*
// @match        *://*.spectator.com.au/*
// @match        *://*.spectator.us/*
// @match        *://*.speld.nl/*
// @match        *://*.spiegel.de/*
// @match        *://*.startribune.com/*
// @match        *://*.statista.com/*
// @match        *://*.stuff.co.nz/*
// @match        *://*.sueddeutsche.de/*
// @match        *://*.sun-sentinel.com/*
// @match        *://*.tagesspiegel.de/*
// @match        *://*.tagesanzeiger.ch/*
// @match        *://*.techcrunch.com/*
// @match        *://*.techinasia.com/*
// @match        *://*.technologyreview.com/*
// @match        *://*.telegraaf.nl/*
// @match        *://*.telegraph.co.uk/*
// @match        *://*.tijd.be/*
// @match        *://*.the-tls.co.uk/*
// @match        *://*.theadvocate.com.au/*
// @match        *://*.theage.com.au/*
// @match        *://*.theathletic.co.uk/*
// @match        *://*.theathletic.com/*
// @match        *://*.theatlantic.com/*
// @match        *://*.theaustralian.com.au/*
// @match        *://*.thediplomat.com/*
// @match        *://*.theglobeandmail.com/*
// @match        *://*.theherald.com.au/*
// @match        *://*.thehindu.com/*
// @match        *://*.themarker.com/*
// @match        *://*.themercury.com.au/*
// @match        *://*.thenation.com/*
// @match        *://*.thenational.scot/*
// @match        *://*.theolivepress.es/*
// @match        *://*.thesaturdaypaper.com.au/*
// @match        *://*.thestar.com/*
// @match        *://*.thewrap.com/*
// @match        *://*.theguardian.com/*
// @match        *://*.thejournal.ie/*
// @match        *://*.theverge.com/*
// @match        *://*.tmz.com/*
// @match        *://*.tinypass.com/*
// @match        *://*.towardsdatascience.com/*
// @match        *://*.trouw.nl/*
// @match        *://*.usatoday.com/*
// @match        *://*.usmagazine.com/*
// @match        *://*.vanityfair.com/*
// @match        *://*.vox.com/*
// @match        *://*.vn.nl/*
// @match        *://*.volkskrant.nl/*
// @match        *://*.washingtonpost.com/*
// @match        *://*.welt.de/*
// @match        *://*.wired.com/*
// @match        *://*.wz.de/*
// @match        *://*.wsj.com/*
// @match        *://*.wyborcza.pl/*
// @match        *://*.zeit.de/*
// @match        *://*.elpais.com/*
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
      `Floating button ${
        showFloatingButton ? "enabled" : "disabled"
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
