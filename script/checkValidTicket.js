const activeTicketWrapper = document.querySelector(".active-ticket-wrapper");
const recentOrderWrapper = document.querySelector(".recent-orders");
const activeTicketCount = document.getElementById("active-ticket-count");
const activeStartingStop = document.getElementById(
  "active-ticket-starting-stop"
);
const activeEndingStop = document.getElementById("active-ticket-ending-stop");
const activeTicketExpiryTime = document.getElementById(
  "active-ticket-expiration-time"
);

const recentOrderTempalate = document.getElementById(
  "recent-order-item-template"
);

dayjs.extend(window.dayjs_plugin_duration);

function getRemainingTime(ticket, validityPeriodHours) {
  const createdAt = dayjs(ticket.buyedAt);
  const now = dayjs();
  const elapsedMilliseconds = now.diff(createdAt);
  const validityMilliseconds = validityPeriodHours * 60 * 60 * 1000;
  const remainingMilliseconds = validityMilliseconds - elapsedMilliseconds;

  return remainingMilliseconds > 0 ? remainingMilliseconds : 0;
}

function checkTicketValidityOnLoad() {
  const ticketData = localStorage.getItem("ActiveTicket");
  const userId = localStorage.getItem("userId");

  crateResentOrderList(2);

  if (userId) {
    setInterval(() => {
      loader.style.display = "none";
    }, 1500);
  }

  if (ticketData) {
    const ticket = JSON.parse(ticketData);
    const validityPeriod = 2;

    const remainingTime = getRemainingTime(ticket, validityPeriod);

    if (remainingTime > 0) {
      setActiveTicketDetails();
      activeTicketWrapper.style.display = "block";
    } else {
      alert("Ticket has expired");
      localStorage.removeItem("ActiveTicket");
      activeTicketWrapper.style.display = "none";
      window.location =
      "https://paytm-ticket-booking.vercel.app";
      // "http://127.0.0.1:5500";
    }
  } else {
    console.log("No ticket found in localStorage");
  }
}

function crateResentOrderList(limit=0) {
  const pastTicketsData = localStorage.getItem("tickets");
  const tickets = (JSON.parse(pastTicketsData)).reverse();
  if (tickets.length > 0) {
    recentOrderWrapper.style.display = "block";
    let count = 0

    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      const recentOrderTempalateClone = recentOrderTempalate.content.cloneNode(true);
      
      recentOrderTempalateClone.querySelector('.past-ticket-passenger').textContent  = ticket.numberOfTickets; 
      recentOrderTempalateClone.querySelector('.from-past').innerText = ticket.from;
      recentOrderTempalateClone.querySelector('.to-past').innerText = ticket.to;
      recentOrderTempalateClone.querySelector('.past-order-prise').innerText = ticket.ticketPrise;

      recentOrderWrapper.appendChild(recentOrderTempalateClone)

      count++;
      if(count == limit && limit==2){
        break;
      }
    };
  }
}

function setActiveTicketDetails() {
  const activeTicketDetails = JSON.parse(localStorage.getItem("ActiveTicket"));
  const newTime = dayjs(activeTicketDetails.buyedAt).add(2, "hour");
  const formattedTime = newTime.format("hh:mm A, DD MMM YYYY");
  activeTicketCount.innerText = activeTicketDetails.numberOfTickets;
  activeStartingStop.innerText = activeTicketDetails.from;
  activeEndingStop.innerText = activeTicketDetails.to;
  activeTicketExpiryTime.innerText = formattedTime;
}

window.onload = checkTicketValidityOnLoad;
