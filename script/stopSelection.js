const stops = [
  { name: "Railway Station Terminal", popular: true },
  { name: "Golden Point", popular: false },
  { name: "Sarthana Nature Park Brts", popular: true },
  { name: "Simadanaka Brts", popular: true },
  { name: "MoraBhagal", popular: false },
  { name: "MoraBhagal Brts", popular: true },
  { name: "ONGC Colony Brts", popular: true },
  { name: "D.G.V.C.L Urja Sadan Brts", popular: true },
  { name: "Someshwar Junction Brts", popular: true },
  { name: "Utran Power House", popular: false },
  { name: "Pandesara Brts", popular: false },
  { name: "Unn Char Rasta Brts", popular: false },
  { name: "Sachin Railway Station", popular: true },
  { name: "Sachin Gidc Junction", popular: true },
  { name: "Navin Fluorine Brts", popular: false },
  { name: "Dindoli Varigruh Brts", popular: false },
  { name: "Jai Jogani Mata Chowk Brts", popular: false },
  { name: "Utran R.O.B Bridge Brts", popular: false },
  { name: "Linear Bus Stop", popular: false },
  { name: "VNSG Convention Hall Brts", popular: false },
  { name: "VNSG University Brts", popular: false },
  { name: "Model Town Dumbhal", popular: false },
  { name: "Model Town Junction Brts", popular: false },
  { name: "Sahara Darwaja", popular: false },
  { name: "Majura gate", popular: false },
  { name: "Maan Darwaja", popular: false },
  { name: "Textile Market", popular: false },
  { name: "Shyam Mandir Brts", popular: true },
  { name: "Devadh Gam Road Brts", popular: false },
  { name: "Althan Khadi Brts", popular: false },
  { name: "Althan Depot Terminal", popular: true },
  { name: "Magob parvat Khadi Bridge Brts", popular: false },
  { name: "Magob Gam Brts", popular: false },
  { name: "Amazia Amusement Park Brts", popular: false },
  { name: "Sitanagar Brts", popular: false },
  { name: "Bharthana Brts", popular: true },
  { name: "Althan Bharthana Brts", popular: false },
  { name: "Anuvrat Dwar Junction (East) Brts", popular: false },
  { name: "Anuvrat Dwar Junction (West) Brts", popular: true },
  { name: "Kharwarnagar Brts", popular: true },
  { name: "Rupali Junction Brts", popular: false },
  { name: "Unique hospital Junction Brts", popular: false },
  { name: "Aaspas Dada Temple Brts", popular: false },
  { name: "Palanpur Patiya Brts", popular: true },
  { name: "Ramnagar Brts", popular: true },
  { name: "Vashnodevi Sky", popular: true },
  { name: "Vashnodevi Heights", popular: true },
  { name: "Vashnodevi Township", popular: true },
  { name: "Jahangirpura Community Hall Brts", popular: true },
  { name: "Jahangirpura Community Hall Brts", popular: true },
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

      localStorage.setItem("selectedFromStop", fromStopInput.value);
      localStorage.setItem("selectedToStop", toStopInput.value);
      window.location.href = "https://idyllic-druid-c0a009.netlify.app/index.html";
    }
  }

  // ✅ Enable custom entry (user-typed value) when pressing Enter
  fromStopInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (fromStopInput.value.trim()) {
        addValueInTextbox(fromStopInput.value.trim(), "from");
      }
    }
  });

  toStopInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      if (toStopInput.value.trim()) {
        addValueInTextbox(toStopInput.value.trim(), "to");
      }
    }
  });

  fromStopInput.addEventListener("input", (e) => {
    updateStopSuggetion(e.target.value, "from");
  });

  toStopInput.addEventListener("input", (e) => {
    updateStopSuggetion(e.target.value, "to");
  });

  popularStops();
});
