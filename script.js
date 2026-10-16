// Two jobs: filter projects by category, and fill in the year.
const buttons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
const count = document.getElementById("project-count");

function updateCount() {
  // Count only cards that are not hidden, so the number always matches what you see.
  count.textContent = [...projects].filter(p => !p.hidden).length;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => b.classList.toggle("active", b === btn));
    // `hidden` is the native HTML attribute: it also removes the card from screen readers.
    projects.forEach(p => { p.hidden = !(f === "all" || p.dataset.category === f); });
    updateCount();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
updateCount();