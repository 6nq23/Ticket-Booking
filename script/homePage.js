document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('global-loader');
    const searchTrigger = document.getElementById('search-trigger');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const mainSearchInput = document.getElementById('main-search-input');
    const cityBusChip = document.getElementById('city-bus-chip');
    const busTicketsBtn = document.getElementById('bus-tickets-btn');
    const quickBusBtn = document.getElementById('quick-bus-btn');
    const header = document.querySelector('.home-header');
    const errorModal = document.getElementById('error-modal');
    const errorClose = document.getElementById('error-close');

    // Scroll listener for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (busTicketsBtn) {
        busTicketsBtn.addEventListener('click', () => {
            navigateToBooking();
        });
    }

    if (cityBusChip) {
        cityBusChip.addEventListener('click', () => {
            navigateToBooking();
        });
    }

    if (quickBusBtn) {
        quickBusBtn.addEventListener('click', () => {
            navigateToBooking();
        });
    }

    // Hide loader
    setTimeout(() => {
        if (loader) loader.style.display = 'none';
    }, 1000);

    function navigateToBooking() {
        const globalLoader = document.getElementById('loader');
        if (globalLoader) globalLoader.style.display = 'flex';
        setTimeout(() => {
            window.location.href = './cityBusBooking.html';
        }, 800);
    }

    // Search Toggle
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.add('active');
            if (mainSearchInput) mainSearchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            if (searchOverlay) searchOverlay.classList.remove('active');
        });
    }

    // Search Logic (Induction)
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query === 'city bus') {
                navigateToBooking();
            }
        });
    }

    // Active Ticket logic for Home Page
    function checkActiveTicket() {
        const activeTicketHome = document.getElementById('active-ticket-home');
        const fromSpan = document.getElementById('home-ticket-from');
        const toSpan = document.getElementById('home-ticket-to');
        const countSpan = document.getElementById('home-ticket-count');

        if (!activeTicketHome) return;

        const ticketData = localStorage.getItem("ActiveTicket");
        if (ticketData) {
            const ticket = JSON.parse(ticketData);
            const now = new Date().getTime();
            const ticketTime = ticket.buyedAt || now;
            
            // Show ticket if it's less than 2 hours old
            if (now - ticketTime < 2 * 60 * 60 * 1000) {
                if (fromSpan) fromSpan.innerText = ticket.from;
                if (toSpan) toSpan.innerText = ticket.to;
                if (countSpan) countSpan.innerText = ticket.numberOfTickets;
                activeTicketHome.style.display = 'block';

                activeTicketHome.addEventListener('click', (e) => {
                    // Prevent navigation if clicking specific future buttons (if any)
                    if (e.target.classList.contains('buy-btn-home')) return;
                    window.location.href = './ticketView.html';
                });

                const homeBuyBtn = document.getElementById('home-buy-again-btn');
                if (homeBuyBtn) {
                    homeBuyBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Set stops for booking page
                        localStorage.setItem("selectedFromStop", ticket.from);
                        localStorage.setItem("selectedToStop", ticket.to);
                        localStorage.setItem("totalTickets", ticket.numberOfTickets || "1");
                        
                        // Navigate to booking page (it will auto-detect these stops)
                        navigateToBooking();
                    });
                }
            } else {
                activeTicketHome.style.display = 'none';
            }
        }
    }

    checkActiveTicket();

    if (errorClose) {
        errorClose.addEventListener('click', () => {
            if (errorModal) errorModal.style.display = 'none';
        });
    }

    // Ripple effect & Server Error simulation
    const items = document.querySelectorAll('.service-item, .popular-item, .search-chip, .loan-item, .travel-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            // Check if this item is functional
            const isFunctional = 
                item.id === 'bus-tickets-btn' || 
                item.id === 'city-bus-chip' || 
                item.id === 'quick-bus-btn' ||
                item.innerText.includes('Scan & Pay');

            if (isFunctional) {
                item.style.opacity = '0.5';
                setTimeout(() => item.style.opacity = '1', 100);
                return; // Navigation handled separately
            }

            // Simulate Server Error via loading.html
            window.location.href = './loading.html?service=' + encodeURIComponent(item.innerText.trim());
        });
    });
});
