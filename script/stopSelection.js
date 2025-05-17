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
    name: "D.G.V.C.L Urja Sadan Brts",
    popular: false,
  },
  {
    name: "Someshwar Junction Brts",
    popular: false,
  },
  {
    name: "Utran Power House",
    popular: false,
  },
  {
    name: "Pandesara Brts",
    popular: false,
  },
  {
    name: "Unn Char Rasta Brts",
    popular: false,
  },
  {
    name: "Sachin Railway Station",
    popular: false,
  },
  {
    name: "Sachin Gidc Junction",
    popular: false,
  },
  {
    name: "Navin Fluorine Brts",
    popular: false,
  },
  {
    name: "Dindoli Varigruh Brts",
    popular: false,
  },
  {
    name: "Jai Jogani Mata Chowk Brts",
    popular: false,
  },
  {
    name: "Utran R.O.B Bridge Brts",
    popular: false,
  },
  {
    name: "Shree Swami Dayanand Saraswati Bridge",
    popular: false,
  },
  {
    name: "Linear Bus Stop",
    popular: true,
  },
  {
    name: "VNSG Convention Hall Brts",
    popular: false,
  },
  {
    name: "VNSG University Brts",
    popular: false,
  },
  {
    name: "Model Town Dumbhal",
    popular: false,
  },
  {
    name: "Model Town Junction Brts",
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
    name: "Devadh Gam Road Brts",
    popular: false,
  },
  {
    name: "Althan Khadi Brts",
    popular: false,
  },
  {
    name: "Althan Depot Terminal",
    popular: false,
  },
  {
    name: "Magob parvat Khadi Bridge Brts",
    popular: false,
  },
  {
    name: "Magob Gam Brts",
    popular: false,
  },
  {
    name: "Amazia Amusement Park Brts",
    popular: false,
  },
  {
    name: "Sitanagar Brts",
    popular: false,
  },
  {
    name: "Bharthana Brts",
    popular: false,
  },
  {
    name: "Althan Bharthana Brts",
    popular: false,
  },
  {
    name: "Anuvrat Dwar Junction (East) Brts",
    popular: false,
  },
  {
    name: "Anuvrat Dwar Junction (West) Brts",
    popular: false,
  },
  {
    name: "Kharwarnagar Brts",
    popular: false,
  },
  {
    name: "Rupali Junction Brts",
    popular: false,
  },
  {
    name: "Unique hospital Junction Brts",
    popular: false,
  },
  {
    name: "Aaspas Dada Temple Brts",
    popular: false,
  },
  {
    name: "Kadodara",
    popular: false,
  },
  {
    name: "Saroli Brts",
    popular: false,
  },
  {
    name: "Sabar Gaam",
    popular: false,
  },
  {
    name: "Sarthana Nature Park Brts",
    popular: false,
  },
  {
    name: "S.M.V.S. Swaminarayan Temple Brts",
    popular: false,
  },
  {
    name: "Shantanu Residency Godadara",
    popular: false,
  },
  {
    name: "Gotalawadi",
    popular: false,
  },
  {
    name: "Palanpur Patiya Brts",
    popular: false,
  },
  {
    name: "Tulsidham Brts",
    popular: false,
  },
  {
    name: "Athwa gate Brts",
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
  function popularStops() {
    stopNameContainer.innerHTML="";
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
  }

  popularStops();

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
      toStopInput.value = "";
      toStopInput.focus();
      stopInputName = "to";
      popularStops();
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
