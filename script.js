// Project filters + small page details.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const countElement = document.getElementById("project-count");

function updateCount() {
  const visibleCount = [...projectCards].filter(card => !card.classList.contains("is-hidden")).length;
  if (countElement) countElement.textContent = String(visibleCount).padStart(2, "0");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    projectCards.forEach(card => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
    updateCount();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
updateCount();
