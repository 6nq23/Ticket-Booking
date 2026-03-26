document.addEventListener("DOMContentLoaded", function() {
  const headerPrice = document.getElementById('total-prise-in-header');
  const paySecurelyRate = document.getElementById('pay-securly-rate');

  function changeData() {
    const tempTicketDetailsRaw = localStorage.getItem('tempTicketDetails');
    if (!tempTicketDetailsRaw) return;

    const tempTicketDetails = JSON.parse(tempTicketDetailsRaw);
    const price = parseFloat(localStorage.getItem('price')) || 0;
    const numberOfTickets = parseInt(tempTicketDetails.numberOfTickets) || 1;
    const totalAmount = price * numberOfTickets;

    if (headerPrice) headerPrice.innerText = totalAmount;
    if (paySecurelyRate) paySecurelyRate.innerText = totalAmount;
  }

  changeData();
});
