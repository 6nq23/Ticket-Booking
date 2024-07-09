// FOR PASSENGER DIALOG OPEN OR CLOSE
const addPassengerDialog = document.getElementById("add-passenger");
const passengerInput = document.querySelector(".passenger-input");

passengerInput.addEventListener("click", () => {
  document.getElementById("modal-backdrop-1").style.display = "block";
  addPassengerDialog.classList.add("open-dialog");
  addPassengerDialog.classList.remove("close-dialog");
});

function closePassengerDialog1() {
  document.getElementById("modal-backdrop-1").style.display = "none";
  addPassengerDialog.classList.add("close-dialog");
  addPassengerDialog.classList.remove("open-dialog");
}

// FOR PASSENGER QUANTITY INCREMENT DECREMENT
const childPassenger = document.querySelector(".child-passenger");
const adultPassenger = document.querySelector(".adult-passenger");

let value1 = 0;
let value2 = 1;
const maxValue = 5;

function onIncrement(name) {
  if (value1 + value2 < maxValue) {
    name === "child" ? value1++ : name === "adult" ? value2++ : "";
    updateOutputs();
  }
}

function onDecrement(name) {
  if (name === "child") {
    if (value1 > 0) {
      value1--;
      updateOutputs();
    } else {
    }
  } else if (name === "adult") {
    if (value2 > 0) {
      value2--;
      updateOutputs();
    }
  }
  return;
}

function updateOutputs() {
  childPassenger.textContent = value1;
  adultPassenger.textContent = value2;

  // Disable decrement buttons when count is zero
  if (value1 === 0) {
    document.querySelector(".child-minus-icon").classList.add("disable");
    document.querySelector(".child-minus-icon").classList.remove("active");
  } else {
    document.querySelector(".child-minus-icon").classList.remove("disable");
    document.querySelector(".child-minus-icon").classList.add("active");
  }

  if (value2 === 0) {
    document.querySelector(".adult-minus-icon").classList.add("disable");
    document.querySelector(".adult-minus-icon").classList.remove("active");
  } else {
    document.querySelector(".adult-minus-icon").classList.remove("disable");
    document.querySelector(".adult-minus-icon").classList.add("active");
  }

  if (value1 + value2 === maxValue) {
    document.querySelector(".child-plus-icon").classList.add("disable");
    document.querySelector(".child-plus-icon").classList.remove("active");
    document.querySelector(".adult-plus-icon").classList.add("disable");
    document.querySelector(".adult-plus-icon").classList.remove("active");

    document.querySelector(".ticket-booking-info").classList.remove("show");
    document.querySelector(".ticket-booking-info").classList.add("hide");
    document.querySelector(".ticket-booking-warning").classList.remove("hide");
    document.querySelector(".ticket-booking-warning").classList.add("show");
  } else {
    document.querySelector(".child-plus-icon").classList.add("active");
    document.querySelector(".adult-plus-icon").classList.add("active");
    document.querySelector(".child-plus-icon").classList.remove("disable");
    document.querySelector(".adult-plus-icon").classList.remove("disable");

    document.querySelector(".ticket-booking-warning").classList.remove("show");
    document.querySelector(".ticket-booking-warning").classList.add("hide");
    document.querySelector(".ticket-booking-info").classList.remove("hide");
    document.querySelector(".ticket-booking-info").classList.add("show");
  }
}

// SAVING THE PASSENGER DETAIL
function savePassengerDetail() {
  let result = "";
  if (value1 == 1) {
    result += `${value1} child`;
  }
  if (value1 > 1) {
    result += `${value1} childrean`;
  }
  if (value1 > 0 && value2 > 0) {
    result += `, `;
  }
  if (value2 > 0) {
    result += `${value2} ${value2==1?'Adult':'Adults'}`;
  }

  passengerInput.value = result;
  closePassengerDialog1();
  return ``;
}

updateOutputs();
savePassengerDetail();