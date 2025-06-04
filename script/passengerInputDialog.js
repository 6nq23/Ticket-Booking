document.addEventListener("DOMContentLoaded", function() {
  // FOR PASSENGER DIALOG OPEN OR CLOSE
  const addPassengerDialog = document.getElementById("add-passenger");
  const passengerInput = document.querySelector(".passenger-input");
  var rateBeforeDiscount = document.getElementById("before-discount-rate");
  var rateAfterDiscount = document.getElementById("after-discount-rate");

  if (passengerInput && addPassengerDialog) {
    passengerInput.addEventListener("click", () => {
      const modalBackdrop = document.getElementById("modal-backdrop-1");
      if (modalBackdrop) modalBackdrop.style.display = "block";
      addPassengerDialog.classList.add("open-dialog");
      addPassengerDialog.classList.remove("close-dialog");
    });
  }

  window.closePassengerDialog1 = function() {
    const modalBackdrop = document.getElementById("modal-backdrop-1");
    if (modalBackdrop) modalBackdrop.style.display = "none";
    if (addPassengerDialog) {
      addPassengerDialog.classList.add("close-dialog");
      addPassengerDialog.classList.remove("open-dialog");
    }
  }

  // FOR PASSENGER QUANTITY INCREMENT DECREMENT
  const childPassenger = document.querySelector(".child-passenger");
  const adultPassenger = document.querySelector(".adult-passenger");

  var totalTickets;
  let value1 = 0;
  let value2 = 1;
  const maxValue = 5;

  window.onIncrement = function(name) {
    if (value1 + value2 < maxValue) {
      name === "child" ? value1++ : name === "adult" ? value2++ : "";
      updateOutputs();
    }
  }

  window.onDecrement = function(name) {
    if (name === "child") {
      if (value1 > 0) {
        value1--;
        updateOutputs();
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
    if (childPassenger) childPassenger.textContent = value1;
    if (adultPassenger) adultPassenger.textContent = value2;

    // Disable decrement buttons when count is zero
    const childMinus = document.querySelector(".child-minus-icon");
    const adultMinus = document.querySelector(".adult-minus-icon");
    const childPlus = document.querySelector(".child-plus-icon");
    const adultPlus = document.querySelector(".adult-plus-icon");
    const ticketBookingInfo = document.querySelector(".ticket-booking-info");
    const ticketBookingWarning = document.querySelector(".ticket-booking-warning");

    if (childMinus) {
      if (value1 === 0) {
        childMinus.classList.add("disable");
        childMinus.classList.remove("active");
      } else {
        childMinus.classList.remove("disable");
        childMinus.classList.add("active");
      }
    }
    if (adultMinus) {
      if (value2 === 0) {
        adultMinus.classList.add("disable");
        adultMinus.classList.remove("active");
      } else {
        adultMinus.classList.remove("disable");
        adultMinus.classList.add("active");
      }
    }
    if (childPlus && adultPlus && ticketBookingInfo && ticketBookingWarning) {
      if (value1 + value2 === maxValue) {
        childPlus.classList.add("disable");
        childPlus.classList.remove("active");
        adultPlus.classList.add("disable");
        adultPlus.classList.remove("active");
        ticketBookingInfo.classList.remove("show");
        ticketBookingInfo.classList.add("hide");
        ticketBookingWarning.classList.remove("hide");
        ticketBookingWarning.classList.add("show");
      } else {
        childPlus.classList.add("active");
        adultPlus.classList.add("active");
        childPlus.classList.remove("disable");
        adultPlus.classList.remove("disable");
        ticketBookingWarning.classList.remove("show");
        ticketBookingWarning.classList.add("hide");
        ticketBookingInfo.classList.remove("hide");
        ticketBookingInfo.classList.add("show");
      }
    }
  }

  // SAVING THE PASSENGER DETAIL
  window.savePassengerDetail = function() {
    totalTickets = 0;
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
      result += `${value2} ${value2 == 1 ? "Adult" : "Adults"}`;
    }
    if (passengerInput) passengerInput.value = result;
    totalTickets = value1 + value2;
    localStorage.setItem('totalTickets',totalTickets);
    if (rateBeforeDiscount && rateAfterDiscount) {
      rateBeforeDiscount.innerText = '₹'+(localStorage.getItem('prise')*localStorage.getItem('totalTickets')+2);
      rateAfterDiscount.innerText = localStorage.getItem('prise')*localStorage.getItem('totalTickets');
    }
    window.closePassengerDialog1();
    return ``;
  }

  updateOutputs();
  window.savePassengerDetail();
});
