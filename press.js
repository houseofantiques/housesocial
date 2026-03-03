"use strict";

/* =========================================================
  HOA — press.js (clean, NO image code)
  - Year chips (dynamic)
  - Search
  - Filters HTML cards
  - Lightbox (uses existing <img> src from HTML)
  REQUIREMENTS in press.html:
  - Cards inside #pressGrid
  - Each card element has:
      data-year="1989"
      data-title="..."
      data-source="..."
      data-full="(optional) full image url"
    And contains an <img> tag (thumb).
  - Chips container: #yearChips
  - Search input: #pressSearch
  - Lightbox:
      #lightbox, #lbImg, #lbMeta, #lbClose
========================================================= */

const grid = document.getElementById("pressGrid");
const chipRow = document.getElementById("yearChips");
const search = document.getElementById("pressSearch");

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbMeta = document.getElementById("lbMeta");
const lbClose = document.getElementById("lbClose");

let activeYear = "الكل";
let q = "";

/* =========================
   Helpers: read items from HTML
========================= */
function readItemsFromDOM() {
  if (!grid) return [];
  const nodes = Array.from(grid.querySelectorAll("[data-press-item]"));

  return nodes.map((el) => {
    const yearRaw = (el.getAttribute("data-year") || "").trim();
    const year = Number(yearRaw) || 0;

    const title = (el.getAttribute("data-title") || "").trim();
    const source = (el.getAttribute("data-source") || "").trim();

    // thumb from <img>
    const img = el.querySelector("img");
    const thumbSrc = img ? img.getAttribute("src") || "" : "";

    // optional: full image for lightbox (if not provided we use thumbSrc)
    const fullSrc = (el.getAttribute("data-full") || "").trim() || thumbSrc;

    return { el, year, title, source, thumbSrc, fullSrc };
  });
}

function normalize(str) {
  return String(str || "").toLowerCase();
}

/* =========================
   Years + chips
========================= */
function getYears(items) {
  const ys = items
    .map((x) => x.year)
    .filter((y) => Number(y) > 0);

  return Array.from(new Set(ys)).sort((a, b) => a - b);
}

function makeChip(label) {
  const b = document.createElement("button");
  b.className = "chip";
  b.type = "button";
  b.textContent = String(label);

  b.addEventListener("click", () => {
    activeYear = label;
    renderChips();   // re-mark active
    applyFilters();  // update visibility
  });

  return b;
}

function renderChips() {
  if (!chipRow) return;

  const items = readItemsFromDOM();
  const years = getYears(items);
  const chips = ["الكل", ...years];

  chipRow.innerHTML = "";
  chips.forEach((c) => {
    const b = makeChip(c);
    if (String(c) === String(activeYear)) b.classList.add("active");
    chipRow.appendChild(b);
  });
}

/* =========================
   Filtering logic
========================= */
function matches(item) {
  // year filter
  if (activeYear !== "الكل") {
    // items year=0 show ONLY in "الكل"
    if (item.year === 0) return false;
    if (String(item.year) !== String(activeYear)) return false;
  }

  // search filter
  if (!q) return true;

  const hay = normalize(`${item.title} ${item.source} ${item.year}`);
  return hay.includes(normalize(q));
}

function applyFilters() {
  const items = readItemsFromDOM();
  let any = false;

  items.forEach((item) => {
    const ok = matches(item);
    item.el.style.display = ok ? "" : "none";
    if (ok) any = true;
  });

  // Empty state
  let empty = grid ? grid.querySelector(".pressEmpty") : null;
  if (!any) {
    if (!empty && grid) {
      empty = document.createElement("div");
      empty.className = "pressEmpty";
      empty.textContent = "لا توجد نتائج حالياً.";
      grid.appendChild(empty);
    }
  } else {
    if (empty) empty.remove();
  }
}

/* =========================
   Lightbox
========================= */
function openLB(item) {
  if (!lb || !lbImg || !lbMeta) return;

  lbImg.src = item.fullSrc || item.thumbSrc || "";
  const y = item.year ? String(item.year) : "بدون سنة";
  const srcTxt = item.source ? ` — ${item.source}` : "";
  const tTxt = item.title ? ` — ${item.title}` : "";
  lbMeta.textContent = `${y}${srcTxt}${tTxt}`;

  lb.classList.add("show");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLB() {
  if (!lb) return;

  lb.classList.remove("show");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbImg) lbImg.src = "";
}

/* Delegate clicks from grid */
function bindCardClicks() {
  if (!grid) return;

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-press-item]");
    if (!card) return;

    // ignore clicks on links inside card if you add any
    const a = e.target.closest("a");
    if (a) return;

    const items = readItemsFromDOM();
    const found = items.find((x) => x.el === card);
    if (found) openLB(found);
  });
}

if (lbClose) lbClose.addEventListener("click", closeLB);
if (lb) {
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLB();
  });
}
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLB();
});

/* =========================
   Search
========================= */
if (search) {
  search.addEventListener("input", () => {
    q = (search.value || "").trim();
    applyFilters();
  });
}

/* =========================
   INIT
========================= */
bindCardClicks();
renderChips();
applyFilters();