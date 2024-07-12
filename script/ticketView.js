function openTicketDetailPage() {
  window.location =
    "https://paytm-ticket-booking.vercel.app/ticketDetails.html";
}

// TIMER COUNTDOWN USING DAYJS LIBERARY
dayjs.extend(window.dayjs_plugin_duration);

// Set the starting time to 2 hours
let duration = dayjs.duration({
  hours: 2,
  minutes: 0,
  seconds: 0,
});

// Update the timer every second
const timerInterval = setInterval(() => {
  // Reduce the duration by 1 second
  duration = duration.subtract(1, "second");

  // Format the remaining time
  const hours = String(duration.hours()).padStart(2, "0");
  const minutes = String(duration.minutes()).padStart(2, "0");
  const seconds = String(duration.seconds()).padStart(2, "0");

  // Display the remaining time in different spans
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // Check if the countdown has reached zero
  if (duration.asSeconds() <= 0) {
    clearInterval(timerInterval);
    alert("Time is up!");
  }
}, 1000);

const tripDetailwrapper = document.querySelector(".trip-detail-wrapper");
const paymentwrapper = document.querySelector(".payment-wrapper");
const downArrow1 = document.querySelector(".changing-arrow1");
const downArrow2 = document.querySelector(".changing-arrow2");

let flag1 = 1;
tripDetailwrapper.addEventListener("click", () => {
  if (flag1 == 1) {
    openDialog("trip");
    flag1 = 0;
  } else {
    closeDialog("trip");
    flag1 = 1;
  }
});

let flag2 = 1;
paymentwrapper.addEventListener("click", () => {
  if (flag2 == 1) {
    openDialog("payment");
    flag2 = 0;
  } else {
    closeDialog("payment");
    flag2 = 1;
  }
});

function openDialog(name) {
  if (name == "trip") {
    tripDetailwrapper.classList.remove("open-wrapper");
    downArrow1.classList.add("arrow-up");
    downArrow1.classList.remove("arrow-down");
  }
  if (name == "payment") {
    paymentwrapper.classList.remove("open-wrapper");
    downArrow2.classList.add("arrow-up");
    downArrow2.classList.remove("arrow-down");
  }
}
function closeDialog(name) {
  if (name == "trip") {
    tripDetailwrapper.classList.add("open-wrapper");
    downArrow1.classList.remove("arrow-up");
    downArrow1.classList.add("arrow-down");
  }
  if (name == "payment") {
    paymentwrapper.classList.add("open-wrapper");
    downArrow2.classList.remove("arrow-up");
    downArrow2.classList.add("arrow-down");
  }
}
