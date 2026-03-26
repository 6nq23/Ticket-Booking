document.addEventListener("DOMContentLoaded", function() {
  const listContainer = document.getElementById("recent-orders-list");
  const recentOrderTempalate = document.getElementById("recent-order-item-template");

  function crateResentOrderList(limit = 0) {
    const pastTicketsData = localStorage.getItem("tickets");
    if (!pastTicketsData) return;
    const tickets = (JSON.parse(pastTicketsData)).reverse();
    if (tickets.length > 0 && listContainer && recentOrderTempalate) {
      listContainer.innerHTML = '';
      let count = 0

      for (let i = 0; i < tickets.length; i++) {
        if (limit > 0 && count >= limit) break;

        const ticket = tickets[i];
        const recentOrderTempalateClone = recentOrderTempalate.content.cloneNode(true);
        
        recentOrderTempalateClone.querySelector('.past-ticket-passenger').textContent  = ticket.numberOfTickets; 
        recentOrderTempalateClone.querySelector('.from-past').innerText = ticket.from;
        recentOrderTempalateClone.querySelector('.to-past').innerText = ticket.to;
        recentOrderTempalateClone.querySelector('.past-order-price').innerText = ticket.ticketPrice || ticket.ticketPrise || ticket.price || 0;

        const buyAgainBtn = recentOrderTempalateClone.querySelector('.buy-again-btn');
        if (buyAgainBtn) {
          buyAgainBtn.addEventListener('click', () => {
            if (typeof setSelectedStop === 'function') {
              setSelectedStop(ticket.from, ticket.to);
              localStorage.setItem("totalTickets", ticket.numberOfTickets || "1");
              const passengerInput = document.querySelector(".passenger-input");
              if (passengerInput) {
                passengerInput.value = (ticket.numberOfTickets || "1") + " Adult";
                passengerInput.dispatchEvent(new Event('input'));
              }
              const buyTicketSection = document.querySelector(".buy-ticket");
              if (buyTicketSection) {
                buyTicketSection.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              localStorage.setItem("selectedFromStop", ticket.from);
              localStorage.setItem("selectedToStop", ticket.to);
              location.reload(); 
            }
          });
        }

        listContainer.appendChild(recentOrderTempalateClone);
        count++;
      };
      
      // Ensure the section is visible
      const wrapper = document.querySelector(".recent-orders");
      if (wrapper) wrapper.style.display = 'block';
    }
  }

  crateResentOrderList(2);
});