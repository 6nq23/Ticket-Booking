document.addEventListener("DOMContentLoaded", function() {
  const headerPrise = document.getElementById('total-prise-in-header');
  const paySecurlyRate = document.getElementById('pay-securly-rate');

  function changeData(){
    const tempTicketDetailsRaw = localStorage.getItem('tempTicketDetails');
    console.log("tempTicketDetailsRaw:", tempTicketDetailsRaw); // Debug log
  
    if (!tempTicketDetailsRaw) return;
  
    const tempTicketDetails = JSON.parse(tempTicketDetailsRaw);
  
    const prise = parseFloat(localStorage.getItem('prise')) || 0;
  
    if (headerPrise) headerPrise.innerText = prise * tempTicketDetails.numberOfTickets;
    if (paySecurlyRate) paySecurlyRate.innerText = prise * tempTicketDetails.numberOfTickets;
  }
  
  changeData();
});