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
let flag1=1
tripDetailwrapper.addEventListener("click", () => {
  if(flag1==1){
    openDialog("trip");
    flag1=0;
  }else{
    closeDialog("trip");
    flag1=1;
  }
});

let flag2=1
paymentwrapper.addEventListener("click", () => {
  if(flag2==1){
    openDialog("payment");
    flag2=0;
  }else{
    closeDialog("payment");
    flag2=1;
    console.log('abd');
  }
});

function openDialog(name) {
  if (name == "trip") {
    tripDetailwrapper.classList.add("show-dialog");
  }
  if (name == "payment") {
    paymentwrapper.classList.add("show-dialog");
  }
}
function closeDialog(name) {
  if (name == "trip") {
    tripDetailwrapper.classList.remove("show-dialog");
  }
  if (name == "payment") {
    paymentwrapper.classList.remove("show-dialog");
  }
}
