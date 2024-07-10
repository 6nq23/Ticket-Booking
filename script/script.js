const stopSelectionDialog = document.querySelector(".stop-selection-dialog");
const startingStopInput = document.querySelector(".starting-stop-input");
const endingStopInput = document.querySelector(".ending-stop-input");

const fromStopInput = document.querySelector(".from-input");
const toStopInput = document.querySelector(".to-input");

function openStopSelectionPage() {
  // window.location = "https://paytm-ticket-booking.vercel.app/stopSelection.html";
  stopSelectionDialog.classList.add("open-dialog-from-left");
  stopSelectionDialog.classList.remove("close-dialog-in-right");
  endingStopInput.focus();
  startingStopInput.focus();
}

function back() {
  window.history.back();
}

function closeStopSelectionPage() {
  stopSelectionDialog.classList.add("close-dialog-in-right");
  stopSelectionDialog.classList.remove("open-dialog-from-left");
}

function setSelectedStop(from, to) {
  fromStopInput.focus();
  fromStopInput.value = from;
  toStopInput.focus();
  toStopInput.value = to;
}
