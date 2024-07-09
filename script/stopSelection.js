const stops = [
  {
    name: "Railway Station Terminal",
    popular: true,
  },
  {
    name: "Golden Point",
    popular: true,
  },
  {
    name: "D.G.V.C.L Urja sadan",
    popular: false,
  },
  {
    name: "Someshwar Junction Brts",
    popular: false,
  },
  {
    name: "utran power house",
    popular: false,
  },
  {
    name: "Jai Jogani mata chock",
    popular: false,
  },
  {
    name: "utran R.O.B Bridge",
    popular: false,
  },
  {
    name: "Linear Bus Stop",
    popular: true,
  },
  {
    name: "VNSG convention hall",
    popular: false,
  },
  {
    name: "Sahara Darwaja",
    popular: true,
  },
  {
    name: "Majura gate",
    popular: false,
  },
  {
    name: "Maan Darwaja",
    popular: true,
  },
  {
    name: "Textile Market",
    popular: true,
  },
  {
    name: "Shyam Mandir Brts",
    popular: false,
  },
  {
    name: "Althan parvat Khadi Bridge",
    popular: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const stopNameContainer = document.querySelector(".stop-names");
  const fromStopInput = document.querySelector(".starting-stop-input");
  const toStopInput = document.querySelector(".ending-stop-input");

  var stopInputName;

  fromStopInput.addEventListener("focus", () => {
    stopInputName = "from";
  });
  toStopInput.addEventListener("focus", () => {
    stopInputName = "to";
  });

  // fromStopInput.focus();

  stops.forEach((stop) => {
    if (stop.popular) {
      let p = document.createElement("p");
      p.innerHTML = stop.name;
      p.addEventListener("click", () =>
        addValueInTextbox(stop.name, stopInputName)
      );
      stopNameContainer.appendChild(p);
    }
  });

  fromStopInput.addEventListener("input", (e) => {
    let searchStop = e.target.value.toLowerCase();
    updateStopSuggetion(searchStop, stopInputName);
  });
  toStopInput.addEventListener("input", (e) => {
    let searchStop = e.target.value.toLowerCase();
    updateStopSuggetion(searchStop, stopInputName);
  });

  function updateStopSuggetion(searchStop, inputFor) {
    const filteredStops = stops.filter((stop) => {
      return stop.name.toLowerCase().includes(searchStop);
    });
    updateStopList(filteredStops, inputFor);
  }

  function updateStopList(resultedStops, inputFor) {
    stopNameContainer.innerHTML = "";
    fromStopName = fromStopInput.value.toLowerCase();

    resultedStops.forEach((stop) => {
      let stopName = document.createElement("p");
      stopName.innerHTML = stop.name;
      stopName.addEventListener("click", () =>
        addValueInTextbox(stop.name, inputFor)
      );
      stopNameContainer.appendChild(stopName);
    });
  }

  function addValueInTextbox(stopName, inputFor) {
    if (inputFor == "from") {
      fromStopInput.focus();
      fromStopInput.value = stopName;
      toStopInput.focus();
      stopInputName = "to";
      toStopInput.value = "";
    }
    if (inputFor == "to") {
      if (fromStopInput.value == "") {
        fromStopInput.focus();
        return;
      }
      toStopInput.value = stopName;
      setSelectedStop(fromStopInput.value, toStopInput.value);
      closeStopSelectionPage();
    }
  }
});
