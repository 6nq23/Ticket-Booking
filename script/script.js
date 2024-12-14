const userId = localStorage.getItem("userId");

const stopSelectionDialog = document.querySelector(".stop-selection-dialog");
const startingStopInput = document.querySelector(".starting-stop-input");
const endingStopInput = document.querySelector(".ending-stop-input");

const fromStopInput = document.querySelector(".from-input");
const toStopInput = document.querySelector(".to-input");

const buyTicketBtn = document.querySelector(".buy-button");
const buyTicketBtnText = document.getElementById("rate-in-button");
var rateBeforeDiscount = document.getElementById("before-discount-rate");
var rateAfterDiscount = document.getElementById("after-discount-rate");
const loader = document.querySelector(".loader-container");

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    `https://ticket-booking-backend-fgj7.onrender.com/api/v1/ticket/${userId}`
  );
  // const response = await fetch(`http://127.0.0.1:3000/api/v1/ticket/${userId}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data.status === "success") {
    localStorage.setItem("tickets", JSON.stringify(data.tickets));
  }

  console.log(data);
});

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

function backToHome() {
  window.location = "https://paytm-ticket-booking.vercel.app";
  // window.location = "http://127.0.0.1:5500";
}

function openHelpPage() {
  window.location = "https://paytm-ticket-booking.vercel.app/help.html";
  // window.location = 'http://127.0.0.1:5500/help.html'
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

  buyTicketBtn.disabled = false;
  buyTicketBtn.classList.remove("disable-btn");
  buyTicketBtnText.style.display = "contents";
  rateBeforeDiscount.innerText =
    "₹" +
    (localStorage.getItem("prise") * localStorage.getItem("totalTickets") + 2);
  rateAfterDiscount.innerText =
    localStorage.getItem("prise") * localStorage.getItem("totalTickets");
}

async function openTicketViewPage(payment = false) {
  if (payment == true) {
    const payBtn = document.querySelector(".pay-secure");
    const btnLoader = document.getElementById("btn-loader");
    payBtn.style.display = "none"
    btnLoader.style.display = "flex"

    console.log(payBtn);

    const ticketDetail = JSON.parse(localStorage.getItem("tempTicketDetails"));
    ticketDetail.userId = userId;

    ticketDetail.ticketPrise =
      localStorage.getItem("prise") * localStorage.getItem("totalTickets");

    const response = await fetch(
      `https://ticket-booking-backend-fgj7.onrender.com/api/v1/ticket/create`,
      {
        // const response = await fetch(`http://127.0.0.1:3000/api/v1/ticket/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketDetail),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    data.newTicket.prise = localStorage.getItem("prise");

    if (data.status === "success") {
      localStorage.setItem("ActiveTicket", JSON.stringify(data.newTicket));
      localStorage.removeItem("totalTickets");
      localStorage.removeItem("tempTicketDetails");

      payBtn.style.display = "flex"
      btnLoader.style.display = "none"
    }
    
    console.log("payment done");
  }

  window.location = "https://paytm-ticket-booking.vercel.app/ticketView.html";
  // window.location = "http://127.0.0.1:5500/ticketView.html";
}

function openPaymentGatwayPage() {
  const from = fromStopInput.value;
  const to = toStopInput.value;
  const numberOfTickets = localStorage.getItem("totalTickets");

  const tempTicketDetails = { from, to, numberOfTickets };
  localStorage.setItem("tempTicketDetails", JSON.stringify(tempTicketDetails));
  window.location =
    "https://paytm-ticket-booking.vercel.app/paymentGatway.html";
  // window.location = "http://127.0.0.1:5500/paymentGatway.html";
}

// Loader showing
function checkUserAuthentication() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    setInterval(() => {
      loader.style.display = "none";
    }, 1500);
  }
}

window.onload = checkUserAuthentication();
