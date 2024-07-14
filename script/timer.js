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
      startTimer(remainingTime);
    } else {
      console.log("Ticket has expired");
      // Perform actions for expired ticket
      localStorage.removeItem("ticket"); // Optionally remove expired ticket
    }
  } else {
    console.log("No ticket found in localStorage");
  }
}

function startTimer(remainingTime) {
  let duration = dayjs.duration(remainingTime);

  const timerInterval = setInterval(() => {
    duration = duration.subtract(1, "second");

    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");

    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (duration.asSeconds() <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
    }
  }, 1000);
}

window.onload = checkTicketValidityOnLoad;
