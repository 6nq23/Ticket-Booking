document.addEventListener("DOMContentLoaded", function() {
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
        // Perform actions for valid ticket
        startTimer(remainingTime);
      } else {
        console.log("Ticket has expired");
        // Perform actions for expired ticket
        localStorage.removeItem("ActiveTicket"); // Optionally remove expired ticket
        window.location =
        "https://idyllic-druid-c0a009.netlify.app/";
        // "http://127.0.0.1:5500";
      }
    } else {
      console.log("No ticket found in localStorage");
    }
  }

  function startTimer(remainingTime) {
    let duration = dayjs.duration(remainingTime);
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    if (!hoursEl || !minutesEl || !secondsEl) return;
    const timerInterval = setInterval(() => {
      duration = duration.subtract(1, "second");
      const hours = String(duration.hours()).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");
      hoursEl.innerText = hours;
      minutesEl.innerText = minutes;
      secondsEl.innerText = seconds;
      if (duration.asSeconds() <= 0) {
        clearInterval(timerInterval);
        console.log("Time is up!");
      }
    }, 1000);
  }

  checkTicketValidityOnLoad();
});
