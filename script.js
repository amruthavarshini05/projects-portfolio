// Tabs: works for any number of <button class="tab" data-tab="id"> + <section class="panel" id="id">.
const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".panel")];

function show(id, updateHash = true) {
  if (!panels.some(p => p.id === id)) id = tabs[0].dataset.tab;   // unknown hash -> first tab
  tabs.forEach(t => {
    const on = t.dataset.tab === id;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
  });
  panels.forEach(p => { p.hidden = p.id !== id; });
  if (updateHash) history.replaceState(null, "", "#" + id);       // so a tab can be linked directly
  window.scrollTo({ top: 0 });
}

tabs.forEach((t, i) => {
  t.addEventListener("click", () => show(t.dataset.tab));
  t.addEventListener("keydown", e => {                            // arrow keys move between tabs
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1 }[e.key];
    if (next === undefined) return;
    const target = tabs[(next + tabs.length) % tabs.length];
    target.focus(); show(target.dataset.tab);
  });
});

window.addEventListener("hashchange", () => show(location.hash.slice(1), false));
show(location.hash.slice(1), false);
document.getElementById("year").textContent = new Date().getFullYear();