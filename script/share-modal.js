// Utility to wait for an element to appear in the DOM
function waitForElement(selector, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const interval = 50;
    const maxAttempts = timeout / interval;
    let attempts = 0;

    const check = () => {
      const element = document.querySelector(selector);
      if (element) resolve(element);
      else if (++attempts > maxAttempts) reject(new Error("Element not found: " + selector));
      else setTimeout(check, interval);
    };

    check();
  });
}

// Optional safe i18n text fallback
function getMessage(key) {
  return (chrome?.i18n?.getMessage && chrome.i18n.getMessage(key)) || key;
}

document.addEventListener("DOMContentLoaded", function () {
  waitForElement(".tui-image-editor-main-container .tui-image-editor-download-btn")
    .then(downloadBtn => {
      const dialogHTML = `
        <div id="xxdialog-rate" class="xxflex-container">
          <div class="xxdialog">
            <h2 class="xxdialog-header" i18n="rateDialogTitle"></h2>
            <div class="xxdialog-content">
              <p i18n="rateDialogDesc"></p>
            </div>
            <div class="xxdialog-button">
              <a href="#" id="xxdialog-yes" class="xxcancel" i18n="rateDialogYes"></a>
              <a href="#" id="xxdialog-no" i18n="rateDialogNo"></a>
            </div>
          </div>
        </div>`;

      downloadBtn.addEventListener("click", event => {
        event.preventDefault();

        chrome.storage.local.get(["openTimes", "rateClicked"], function (result) {
          let openTimes = result.openTimes || 0;
          let rateClicked = result.rateClicked || false;

          openTimes += 1;
          chrome.storage.local.set({ openTimes });

          const shouldShowDialog = !rateClicked && openTimes % 4 === 0;
          if (shouldShowDialog && !document.getElementById("xxdialog-rate")) {
            document.body.insertAdjacentHTML("beforeend", dialogHTML);

            // i18n text replacement
            document.querySelectorAll("[i18n]").forEach(el => {
              el.textContent = getMessage(el.getAttribute("i18n"));
            });

            document.querySelectorAll("[i18n-alt]").forEach(el => {
              const msg = getMessage(el.getAttribute("i18n-alt"));
              el.alt = msg;
              el.title = msg;
            });

            // Dialog buttons
            const yesBtn = document.getElementById("xxdialog-yes");
            const noBtn = document.getElementById("xxdialog-no");
            const dialog = document.getElementById("xxdialog-rate");

            if (yesBtn && dialog) {
              yesBtn.addEventListener("click", () => {
                chrome.storage.local.set({ rateClicked: true });
                dialog.remove();
                window.open(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`, "_blank").focus();
              });
            }

            if (noBtn && dialog) {
              noBtn.addEventListener("click", () => {
                dialog.remove();
              });
            }
          }
        });
      });
    })
    .catch(error => {
      console.warn("Download button not found in time:", error);
    });
});
