const recentOrderWrapper = document.querySelector(".recent-orders");
const recentOrderTempalate = document.getElementById(
  "recent-order-item-template"
);

function crateResentOrderList(limit=0) {
  const pastTicketsData = localStorage.getItem("tickets");
  const tickets = (JSON.parse(pastTicketsData)).reverse();
  if (tickets.length > 0) {
    recentOrderWrapper.innerHTML = '';
    let count = 0

    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i];
      const recentOrderTempalateClone = recentOrderTempalate.content.cloneNode(true);
      
      recentOrderTempalateClone.querySelector('.past-ticket-passenger').textContent  = ticket.numberOfTickets; 
      recentOrderTempalateClone.querySelector('.from-past').innerText = ticket.from;
      recentOrderTempalateClone.querySelector('.to-past').innerText = ticket.to;
      recentOrderTempalateClone.querySelector('.past-order-prise').innerText = ticket.ticketPrise;

      recentOrderWrapper.appendChild(recentOrderTempalateClone)

      count++;
      if(count == limit && limit==2){
        break;
      }
    };
  }
}

window.onload = crateResentOrderList();