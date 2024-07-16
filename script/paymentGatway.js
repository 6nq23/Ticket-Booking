const paySecurlyRate = document.getElementById('pay-securly-rate');

function changeData(){
  const tempTicketDetails = JSON.parse(localStorage.getItem('tempTicketDetails'))
  paySecurlyRate.innerText = localStorage.getItem('prise')*tempTicketDetails.numberOfTickets
}

window.onload = changeData();