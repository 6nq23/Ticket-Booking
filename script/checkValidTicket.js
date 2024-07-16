const activeTicketWrapper = document.querySelector(".active-ticket-wrapper");
const activeTicketCount = document.getElementById("active-ticket-count");
const activeStartingStop = document.getElementById(
  "active-ticket-starting-stop"
);
const activeEndingStop = document.getElementById("active-ticket-ending-stop");
const activeTicketExpiryTime = document.getElementById("active-ticket-expiration-time");

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
  const userId = localStorage.getItem('userId');

  if (userId) {
    setInterval(() => {
      loader.style.display = 'none'
    }, 1500);
  }

  if (ticketData) {
    const ticket = JSON.parse(ticketData);
    const validityPeriod = 2;

    const remainingTime = getRemainingTime(ticket, validityPeriod);

    if (remainingTime > 0) {
      console.log(remainingTime);
      console.log("Ticket is valid");
      setActiveTicketDetails();
      activeTicketWrapper.style.display = "block";
    } else {
      console.log("Ticket has expired");
      localStorage.removeItem("ticket"); 
      activeTicketWrapper.style.display = "none";
    }
  } else {
    console.log("No ticket found in localStorage");
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
  console.log(activeTicketDetails);
}

window.onload = checkTicketValidityOnLoad;
