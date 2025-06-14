const userId = localStorage.getItem("userId");

const fromStopInput = document.querySelector(".from-input");
const toStopInput = document.querySelector(".to-input");

const buyTicketBtn = document.querySelector(".buy-button");
const buyTicketBtnText = document.getElementById("rate-in-button");
const rateBeforeDiscount = document.getElementById("before-discount-rate");
const rateAfterDiscount = document.getElementById("after-discount-rate");
const loader = document.querySelector(".loader-container");

const priceEditorModal = document.getElementById("price-editor-modal");
const modalOverlay = document.getElementById("modal-overlay");
const secretPriceInput = document.getElementById("secret-price-input");
const savePriceBtn = document.getElementById("save-price-btn");
const closePriceEditorBtn = document.getElementById("close-price-editor-btn");

const fullscreenBtn = document.getElementById("fullscreen-btn");

let longPressTimer;

window.addEventListener("DOMContentLoaded", () => {
  // Initialize tickets array if not already present
  if (!localStorage.getItem("tickets")) {
    localStorage.setItem("tickets", JSON.stringify([]));
  }

  // Initialize default totalTickets (passenger count)
  if (!localStorage.getItem("totalTickets")) {
    localStorage.setItem("totalTickets", "1"); // default 1 adult passenger
  }

  // Initialize default price if not set
  if (!localStorage.getItem("price")) {
    localStorage.setItem("price", "5"); // default price per ticket
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

function setSelectedStop(from, to) {
  fromStopInput.value = from;
  toStopInput.value = to;

  buyTicketBtn.disabled = false;
  buyTicketBtn.classList.remove("disable-btn");
  buyTicketBtnText.style.display = "contents";

  updatePrices();
}

function updatePrices() {
  const totalTickets = parseInt(localStorage.getItem("totalTickets")) || 1;
  const price = parseInt(localStorage.getItem("price")) || 0;

  rateBeforeDiscount.innerText = "₹" + (price * totalTickets * 1.2); // +2 as some fee
  rateAfterDiscount.innerText = "₹" + (price * totalTickets);
}

// Buy ticket button - press and hold for 8 seconds to open secret price editor

function showPriceEditor() {
  secretPriceInput.value = localStorage.getItem("price") || "50";
  modalOverlay.style.display = "block";
  priceEditorModal.style.display = "block";
}

function hidePriceEditor() {
  modalOverlay.style.display = "none";
  priceEditorModal.style.display = "none";
}

buyTicketBtn.addEventListener("mousedown", () => {
  longPressTimer = setTimeout(() => {
    showPriceEditor();
  }, 3000);
});

buyTicketBtn.addEventListener("mouseup", () => {
  clearTimeout(longPressTimer);
});

buyTicketBtn.addEventListener("mouseleave", () => {
  clearTimeout(longPressTimer);
});

// Touch support for mobile
buyTicketBtn.addEventListener("touchstart", () => {
  longPressTimer = setTimeout(() => {
    showPriceEditor();
  }, 3000);
});

buyTicketBtn.addEventListener("touchend", () => {
  clearTimeout(longPressTimer);
});

// Save price button in modal
savePriceBtn.addEventListener("click", () => {
  const newPrice = parseInt(secretPriceInput.value);
  if (isNaN(newPrice) || newPrice < 0) {
    alert("Please enter a valid price.");
    return;
  }
  localStorage.setItem("price", newPrice.toString());
  updatePrices();
  hidePriceEditor();
});

// Close modal without saving
closePriceEditorBtn.addEventListener("click", () => {
  hidePriceEditor();
});

// When clicking outside modal, close modal
modalOverlay.addEventListener("click", () => {
  hidePriceEditor();
});

function openPaymentGatwayPage() {
  const from = fromStopInput.value;
  const to = toStopInput.value;
  const numberOfTickets = localStorage.getItem("totalTickets") || "1";

  const tempTicketDetails = { from, to, numberOfTickets };
  localStorage.setItem("tempTicketDetails", JSON.stringify(tempTicketDetails));

  window.location.href = "https://idyllic-druid-c0a009.netlify.app/paymentGatway.html";
}

// Fullscreen toggle button
// const fullscreenBtn = document.getElementById("fullscreen-btn");/

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

// Listen for fullscreen change to toggle button visibility
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullscreenBtn.style.display = "none"; // Hide button in fullscreen
  } else {
    fullscreenBtn.style.display = "block"; // Show button when not fullscreen
  }
});

async function openTicketViewPage(payment = false) {
  if (payment === true) {
    const payBtn = document.querySelector(".pay-secure");
    const btnLoader = document.getElementById("btn-loader");

    payBtn.style.display = "none";
    btnLoader.style.display = "flex";

    const ticketDetail = JSON.parse(localStorage.getItem("tempTicketDetails"));
    ticketDetail.userId = userId;
    ticketDetail.prise = parseInt(localStorage.getItem("price")) || 0;
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


// Open stop selection page when clicking from/to inputs
fromStopInput.addEventListener("click", () => {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/stopSelection.html";
});

toStopInput.addEventListener("click", () => {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/stopSelection.html";
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

function openTicketDetailsPage() {
  window.location.href = "https://idyllic-druid-c0a009.netlify.app/ticketDetails.html";
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
