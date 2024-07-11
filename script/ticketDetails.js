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
  txnDetailsWrapper.classList.add("open-wrapper");
  downArrow.classList.add("arrow-up");
  downArrow.classList.remove("arrow-down");
}
function closeDialog() {
  txnDetailsWrapper.classList.remove("open-wrapper");
  downArrow.classList.remove("arrow-up");
  downArrow.classList.add("arrow-down");
}
