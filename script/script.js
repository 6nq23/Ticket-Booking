const userId = localStorage.getItem("userId");

const fromStopInput = document.querySelector(".from-input");
const toStopInput = document.querySelector(".to-input");

const buyTicketBtn = document.querySelector(".buy-button");
const buyTicketBtnText = document.getElementById("rate-in-button");
const rateBeforeDiscount = document.getElementById("before-discount-rate");
const rateAfterDiscount = document.getElementById("after-discount-rate");
const loader = document.querySelector(".loader-container");

window.addEventListener("DOMContentLoaded", () => {
  // Initialize tickets array if not already present
  if (!localStorage.getItem("tickets")) {
    localStorage.setItem("tickets", JSON.stringify([]));
  }

  // Retrieve selected stops from localStorage
  const from = localStorage.getItem("selectedFromStop");
  const to = localStorage.getItem("selectedToStop");

  if (from && to) {
    setSelectedStop(from, to);
    localStorage.removeItem("selectedFromStop");
    localStorage.removeItem("selectedToStop");
  }
});

function openStopSelectionPage() {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/stopSelection.html";
}

function back() {
  window.history.back();
}

function backToHome() {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/";
}

function openHelpPage() {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/help.html";
}

function setSelectedStop(from, to) {
  fromStopInput.focus();
  fromStopInput.value = from;
  toStopInput.focus();
  toStopInput.value = to;

  buyTicketBtn.disabled = false;
  buyTicketBtn.classList.remove("disable-btn");
  buyTicketBtnText.style.display = "contents";

  const totalTickets = parseInt(localStorage.getItem("totalTickets")) || 1;
  const price = parseInt(localStorage.getItem("prise")) || 0;

  rateBeforeDiscount.innerText = "₹" + (price * totalTickets + 2);
  rateAfterDiscount.innerText = price * totalTickets;
}

async function openTicketViewPage(payment = false) {
  if (payment === true) {
    const payBtn = document.querySelector(".pay-secure");
    const btnLoader = document.getElementById("btn-loader");

    payBtn.style.display = "none";
    btnLoader.style.display = "flex";

    const ticketDetail = JSON.parse(localStorage.getItem("tempTicketDetails"));
    ticketDetail.userId = userId;
    ticketDetail.prise = parseInt(localStorage.getItem("prise")) || 0;
    ticketDetail.ticketPrise = ticketDetail.prise * parseInt(localStorage.getItem("totalTickets"));
    ticketDetail.buyedAt = Date.now();
    ticketDetail.ticketId = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

    // Store as active ticket
    localStorage.setItem("ActiveTicket", JSON.stringify(ticketDetail));

    // Add to tickets history
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticketDetail);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    // Cleanup temp data
    localStorage.removeItem("totalTickets");
    localStorage.removeItem("tempTicketDetails");

    payBtn.style.display = "flex";
    btnLoader.style.display = "none";

    console.log("Payment done (frontend simulated)");
  }

  window.location.href = "https://idyllic-druid-c0a009.netlify.app/ticketView.html";
}

function openPaymentGatwayPage() {
  const from = fromStopInput.value;
  const to = toStopInput.value;
  const numberOfTickets = localStorage.getItem("totalTickets") || "1";

  const tempTicketDetails = { from, to, numberOfTickets };
  localStorage.setItem("tempTicketDetails", JSON.stringify(tempTicketDetails));

  window.location.href = "https://idyllic-druid-c0a009.netlify.app/paymentGatway.html";
}

function checkUserAuthentication() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  }
}

window.onload = checkUserAuthentication;
