function filterMagazines(category) {
  let cards = document.querySelectorAll(".magazine-card");
  let tabs = document.querySelectorAll(".tab-btn");

  // Update active tab
  tabs.forEach(tab => tab.classList.remove("active"));
  event.target.classList.add("active");

  // Filter magazines
  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      if (card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}
