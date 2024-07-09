// FOR BUYING step guide DIALOG OPEN OR CLOSE
const buyingStepsDialog = document.querySelector(".buy-ticket-info-dialog");
const buyingInfoBtn = document.querySelector(".buying-info-btn");

buyingInfoBtn.addEventListener("click", () => {
  document.getElementById("modal-backdrop-2").style.display = "block";
  buyingStepsDialog.classList.add("open-dialog");
  buyingStepsDialog.classList.remove("close-dialog");
});

function closePassengerDialog2() {
  document.getElementById("modal-backdrop-2").style.display = "none";
  buyingStepsDialog.classList.add("close-dialog");
  buyingStepsDialog.classList.remove("open-dialog");
}