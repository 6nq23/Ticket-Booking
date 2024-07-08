function openStopSelectionPage() {
  window.location = "https://paytm-ticket-booking.vercel.app/stopSelection.html";
}

function back() {
  window.history.back();
}

function setSelectedStop(from, to) {
  console.log(from, to);
  const fromStopInput = document.querySelector(".from-input");
  const toStopInput = document.querySelector(".to-input");

  fromStopInput.value = from;
  toStopInput.value = to;
}
