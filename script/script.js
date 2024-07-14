const userId = localStorage.getItem("userId");

const stopSelectionDialog = document.querySelector(".stop-selection-dialog");
const startingStopInput = document.querySelector(".starting-stop-input");
const endingStopInput = document.querySelector(".ending-stop-input");

const fromStopInput = document.querySelector(".from-input");
const toStopInput = document.querySelector(".to-input");

const buyTicketBtn = document.querySelector(".buy-button");

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`https://ticket-booking-backend-gqin.onrender.com/api/v1/ticket/${userId}`);
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
}

async function openTicketViewPage(payment = false) {
  if (payment == true) {
    const ticketDetail = JSON.parse(localStorage.getItem("tempTicketDetails"));
    ticketDetail.userId = userId;

    const response = await fetch(`https://ticket-booking-backend-gqin.onrender.com/api/v1/ticket/create`, {
    // const response = await fetch(`http://127.0.0.1:3000/api/v1/ticket/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketDetail),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      loca;
    }

    const data = await response.json();

    if (data.status === "success") {
      localStorage.setItem("ActiveTicket", JSON.stringify(data.newTicket));
      localStorage.removeItem("tempTicketDetails");
    }

    console.log("payment done");
    console.log(data);
  }

  window.location = "https://paytm-ticket-booking.vercel.app/ticketView.html";
}

function openPaymentGatwayPage() {
  const from = fromStopInput.value;
  const to = toStopInput.value;
  const numberOfTickets = localStorage.getItem("totalTickets");

  const tempTicketDetails = { from, to, numberOfTickets };
  localStorage.setItem("tempTicketDetails", JSON.stringify(tempTicketDetails));
  localStorage.removeItem("totalTickets");
  window.location = "https://paytm-ticket-booking.vercel.app/paymentGatway.html";
}
