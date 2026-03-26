const CACHE_NAME = "ticket-app-cache-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./cityBusBooking.html",
  "./ticketView.html",
  "./AllPastTicketViewPage.html",
  "./allCityPage.html",
  "./help.html",
  "./loading.html",
  "./paymentGatway.html",
  "./stopSelection.html",
  "./ticketDetails.html",
  "./css/homePage.css",
  "./css/AllPastTicketViewPage.css",
  "./css/allCityPage.css",
  "./css/buyingSteps.css",
  "./css/commonStyles.css",
  "./css/flotingLableInput.css",
  "./css/help.css",
  "./css/loader.css",
  "./css/passengerInputDialog.css",
  "./css/paymentGatway.css",
  "./css/stopSelection.css",
  "./css/styles.css",
  "./css/ticket.css",
  "./css/ticketDetails.css",
  "./css/ticketView.css",
  "./script/homePage.js",
  "./script/script.js",
  "./script/buyingSteps.js",
  "./script/checkValidTicket.js",
  "./script/flotingLabel.js",
  "./script/fullscreeen.js",
  "./script/passengerInputDialog.js",
  "./script/paymentGatway.js",
  "./script/resentOrder.js",
  "./script/share-modal.js",
  "./script/stopSelection.js",
  "./script/ticketDetails.js",
  "./script/ticketView.js",
  "./script/timer.js",
  "./images/paytmlogonew192.png",
  "./images/paytmlogonew.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
