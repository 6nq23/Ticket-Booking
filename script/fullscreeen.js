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
});
