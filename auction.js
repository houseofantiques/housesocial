"use strict";

/* =========================
   0) Mobile menu toggle (ONE clean source of truth)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".navToggle");
  const panel = document.getElementById("mobileMenu");
  if (!btn || !panel) return;

  const close = () => {
    document.body.classList.remove("menuOpen");
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  };

  const open = () => {
    document.body.classList.add("menuOpen");
    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menuOpen");
    isOpen ? close() : open();
  });

  panel.querySelectorAll("a").forEach(a => a.addEventListener("click", close));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) close();
  });

  // Click outside closes (optional but nice)
  document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("menuOpen")) return;
    const inside = e.target.closest(".topbar");
    if (!inside) close();
  });
});


/* =========================
   1) Fix typeRight direction + page title by language
   - يعتمد على localStorage key: hoa_lang
========================= */
function getLangSafe(){
  try { return (localStorage.getItem("hoa_lang") || "ar").toLowerCase(); }
  catch { return "ar"; }
}

function syncAuctionLangUI(){
  const lang = getLangSafe();

  // typeRight direction (details block)
  const r = document.querySelector(".typeRight");
  if (r) r.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

  // title fallback (إذا i18n ما يغطي title)
  if (lang === "en") document.title = "Auction | House of Antiques";
  else document.title = "المزاد | بيت التحفيات";
}

document.addEventListener("DOMContentLoaded", syncAuctionLangUI);

// إذا i18n.js عندك يستدعي window.setLang، نخليها تمر من هنا بدون ما نكسر شي
(function hookSetLang(){
  const old = window.setLang;
  if (typeof old !== "function") return;
  window.setLang = (lang) => {
    old(lang);
    syncAuctionLangUI();
  };
})();


/* =========================
   2) Countdown (اختياري)
========================= */
const AUCTION_DATE_ISO = "2026-01-30T19:00:00+03:00";
const end = new Date(AUCTION_DATE_ISO).getTime();

const $d = document.getElementById("cdDays");
const $h = document.getElementById("cdHours");
const $m = document.getElementById("cdMins");
const $s = document.getElementById("cdSecs");

function pad2(n){ return String(n).padStart(2, "0"); }

function tick(){
  if (!$d && !$h && !$m && !$s) return;

  const now = Date.now();
  let diff = end - now;

  if (diff <= 0){
    if ($d) $d.textContent = "00";
    if ($h) $h.textContent = "00";
    if ($m) $m.textContent = "00";
    if ($s) $s.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  if ($d) $d.textContent = pad2(days);
  if ($h) $h.textContent = pad2(hours);
  if ($m) $m.textContent = pad2(mins);
  if ($s) $s.textContent = pad2(secs);
}

tick();
setInterval(tick, 1000);
