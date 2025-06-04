const stops = [
  { name: "Railway Station Terminal", popular: true },
  { name: "Golden Point", popular: true },
  { name: "Linear Bus Stop", popular: true },
  { name: "Sahara Darwaja", popular: true },
  { name: "Maan Darwaja", popular: true },
  { name: "Textile Market", popular: true },
  { name: "Majura gate", popular: false },
  // ... (add remaining stops as needed)
];

document.addEventListener("DOMContentLoaded", () => {
  const stopNameContainer = document.querySelector(".stop-names");
  const fromStopInput = document.querySelector(".from-input");
  const toStopInput = document.querySelector(".to-input");

  let stopInputName = "from"; // default focus

  fromStopInput.addEventListener("focus", () => stopInputName = "from");
  toStopInput.addEventListener("focus", () => stopInputName = "to");

  function popularStops() {
    stopNameContainer.innerHTML = "";
    stops.forEach((stop) => {
      if (stop.popular) {
        const p = document.createElement("p");
        p.innerHTML = stop.name;
        p.addEventListener("click", () => addValueInTextbox(stop.name, stopInputName));
        stopNameContainer.appendChild(p);
      }
    });
  }

  function updateStopSuggetion(searchStop, inputFor) {
    const filteredStops = stops.filter(stop =>
      stop.name.toLowerCase().includes(searchStop.toLowerCase())
    );
    updateStopList(filteredStops, inputFor);
  }

  function updateStopList(resultedStops, inputFor) {
    stopNameContainer.innerHTML = "";
    resultedStops.forEach((stop) => {
      const p = document.createElement("p");
      p.innerHTML = stop.name;
      p.addEventListener("click", () => addValueInTextbox(stop.name, inputFor));
      stopNameContainer.appendChild(p);
    });
  }

  function addValueInTextbox(stopName, inputFor) {
    if (inputFor === "from") {
      fromStopInput.value = stopName;
      toStopInput.value = "";
      toStopInput.focus();
      stopInputName = "to";
      popularStops();
    } else if (inputFor === "to") {
      if (fromStopInput.value === "") {
        alert("Please select starting stop first.");
        fromStopInput.focus();
        return;
      }
      toStopInput.value = stopName;

      // Save to localStorage and go back to bookTicket.html
      localStorage.setItem("selectedFromStop", fromStopInput.value);
      localStorage.setItem("selectedToStop", toStopInput.value);
      window.location.href = "http://127.0.0.1:5500/Ticket-Booking/index.html";
    }
  }

  // Handle input search
  fromStopInput.addEventListener("input", (e) => {
    updateStopSuggetion(e.target.value, "from");
  });

  toStopInput.addEventListener("input", (e) => {
    updateStopSuggetion(e.target.value, "to");
  });

  // Load popular stops on start
  popularStops();
});
