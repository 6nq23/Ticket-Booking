document.addEventListener("DOMContentLoaded", function() {
  const inputs = document.querySelectorAll(".text-input, .passenger-input");

  inputs.forEach(input => {
      input.addEventListener("focus", function() {
          input.classList.add("focused");
      });

      input.addEventListener("blur", function() {
          if (input.value === "") {
              input.classList.remove("focused");
          }
      });

      input.addEventListener("input", function() {
          if (input.value !== "") {
              input.classList.add("not-empty");
          } else {
              input.classList.remove("not-empty");
          }
      });

      // Check initial input state
      if (input.value !== "") {
          input.classList.add("not-empty");
      }

      // Arrow effect for passenger-input
      if (input.classList.contains("passenger-input")) {
          const container = input.closest(".input-container");
          container.addEventListener("click", function() {
              container.classList.toggle("open");
              // Call a function or open a dialog here
          });

          input.addEventListener("blur", function() {
              container.classList.remove("open");
          });
      }
  });
});
