// DIALOG OPEN AND CLOSE LOGIC

document.addEventListener("DOMContentLoaded", function() {
  const txnDetailsWrapper = document.querySelector(".tc-details");
  const downArrow = document.querySelector(".changing-arrow");

  let flag = 1;
  if (txnDetailsWrapper && downArrow) {
    txnDetailsWrapper.addEventListener("click", () => {
      if (flag == 1) {
        openDialog();
        flag = 0;
      } else {
        closeDialog();
        flag = 1;
      }
    });
  }

  function openDialog() {
    if (txnDetailsWrapper && downArrow) {
      txnDetailsWrapper.classList.remove("open-wrapper");
      downArrow.classList.add("arrow-up");
      downArrow.classList.remove("arrow-down");
    }
  }
  function closeDialog() {
    if (txnDetailsWrapper && downArrow) {
      txnDetailsWrapper.classList.add("open-wrapper");
      downArrow.classList.remove("arrow-up");
      downArrow.classList.add("arrow-down");
    }
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
    if (!activeTicketDetails) return;
    const formattedTime = dayjs(activeTicketDetails.buyedAt).format("hh:mm A, DD MMM YYYY");
    const orderId = generateOrderId();
    if (activeTicketCount1) activeTicketCount1.innerText = activeTicketDetails.numberOfTickets;
    if (activeTicketCount2) activeTicketCount2.innerText = activeTicketDetails.numberOfTickets;
    if (activeStartingStop) activeStartingStop.innerText = activeTicketDetails.from;
    if (activeEndingStop) activeEndingStop.innerText = activeTicketDetails.to;
    if (ticketBookingTime) ticketBookingTime.innerText = formattedTime;
    if (orderIdWrapper) orderIdWrapper.innerText = orderId;
  }

  function generateOrderId() {
    const prefix = '23';
    const remainingLength = 9; 
    const randomPart = Math.floor(Math.random() * Math.pow(10, remainingLength)).toString().padStart(remainingLength, '0');
    const randomNumber = prefix + randomPart;
    return randomNumber;
  }

  setActiveTicketDetails();
});
