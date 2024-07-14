const activeTicketWrapper = document.querySelector('.active-ticket-wrapper');


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

  if (ticketData) {
    const ticket = JSON.parse(ticketData);
    const validityPeriod = 2; // Ticket validity period in hours

    const remainingTime = getRemainingTime(ticket, validityPeriod);

    if (remainingTime > 0) {
      console.log("Ticket is valid");
      // Perform actions for valid ticket
      activeTicketWrapper.style.display = "block";
    } else {
      console.log("Ticket has expired");
      // Perform actions for expired ticket
      localStorage.removeItem("ticket"); // Optionally remove expired ticket
      activeTicketWrapper.style.display = "none";
    }
  } else {
    console.log("No ticket found in localStorage");
  }
}

window.onload = checkTicketValidityOnLoad;
