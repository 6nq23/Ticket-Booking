// DIALOG OPEN AND CLOSE LOGIC

const txnDetailsWrapper = document.querySelector(".tc-details");
const downArrow = document.querySelector(".changing-arrow");

let flag = 1;
txnDetailsWrapper.addEventListener("click", () => {
  if (flag == 1) {
    openDialog();
    flag = 0;
  } else {
    closeDialog();
    flag = 1;
  }
});

function openDialog() {
  txnDetailsWrapper.classList.remove("open-wrapper");
  downArrow.classList.add("arrow-up");
  downArrow.classList.remove("arrow-down");
}
function closeDialog() {
  txnDetailsWrapper.classList.add("open-wrapper");
  downArrow.classList.remove("arrow-up");
  downArrow.classList.add("arrow-down");
}



const activeTicketCount1 = document.getElementById("active-ticket-count-1");
const activeTicketCount2 = document.getElementById("active-ticket-count-2");
const activeStartingStop = document.getElementById("from-location");
const activeEndingStop = document.getElementById("to-location");
const ticketBookingTime = document.getElementById("booking-time");
const orderIdWrapper = document.getElementById("order-id");
const totalTicketId = document.getElementById("total-tocket-count");

function setActiveTicketDetails() {
  const activeTicketDetails = JSON.parse(localStorage.getItem("ActiveTicket"));
  const formattedTime = dayjs(activeTicketDetails.buyedAt).format("hh:mm A, DD MMM YYYY");
  const orderId = generateOrderId()
  activeTicketCount1.innerText = activeTicketDetails.numberOfTickets;
  activeTicketCount2.innerText = activeTicketDetails.numberOfTickets;
  activeStartingStop.innerText = activeTicketDetails.from;
  activeEndingStop.innerText = activeTicketDetails.to;
  ticketBookingTime.innerText = formattedTime;
  orderIdWrapper.innerText = orderId;
}

function generateOrderId() {
  const prefix = '23';
  const remainingLength = 9; 
  const randomPart = Math.floor(Math.random() * Math.pow(10, remainingLength)).toString().padStart(remainingLength, '0');
  const randomNumber = prefix + randomPart;

  return randomNumber;
}

window.onload = setActiveTicketDetails();
