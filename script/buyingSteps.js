document.addEventListener("DOMContentLoaded", function() {
  // FOR BUYING step guide DIALOG OPEN OR CLOSE
  const buyingStepsDialog = document.querySelector(".buy-ticket-info-dialog");
  const buyingInfoBtn = document.querySelector(".buying-info-btn");

  if (buyingInfoBtn && buyingStepsDialog) {
    buyingInfoBtn.addEventListener("click", () => {
      const modalBackdrop = document.getElementById("modal-backdrop-2");
      if (modalBackdrop) modalBackdrop.style.display = "block";
      buyingStepsDialog.classList.add("open-dialog");
      buyingStepsDialog.classList.remove("close-dialog");
    });
  }

  window.closePassengerDialog2 = function() {
    const modalBackdrop = document.getElementById("modal-backdrop-2");
    if (modalBackdrop) modalBackdrop.style.display = "none";
    if (buyingStepsDialog) {
      buyingStepsDialog.classList.add("close-dialog");
      buyingStepsDialog.classList.remove("open-dialog");
    }
  }
});