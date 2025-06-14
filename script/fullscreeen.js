document.addEventListener("DOMContentLoaded", () => {
  const fullscreenBtn = document.getElementById("fullscreen-btn");

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen().then(() => {
          localStorage.setItem("fullscreenEnabled", "true");
        });
      }
    });
  }

  // Prompt to re-enter fullscreen if previously enabled
  if (localStorage.getItem("fullscreenEnabled") === "true") {
    // alert("Please click the 'Enter Fullscreen' button to continue in fullscreen mode.");
  }
});
