"use strict";

/*
  about.js (clean)
  - Single language toggle (mobile + desktop share same state)
  - Language stored in localStorage: hoa_lang
  - Language is inside HTML via data-ar / data-en (NO external i18n.js)
  - Mobile menu slide (open/close + esc + backdrop)
  - ReadMore stable (toggle card open) + button label updates by lang
*/

function normalizeLang(lang){
  lang = (lang || "ar").toLowerCase().trim();
  return (lang === "en") ? "en" : "ar";
}

function getLang(){
  try { return normalizeLang(localStorage.getItem("hoa_lang") || "ar"); }
  catch { return "ar"; }
}

function setLang(lang){
  lang = normalizeLang(lang);
  try { localStorage.setItem("hoa_lang", lang); } catch {}
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";
  return lang;
}

function applyInlineLang(lang){
  const attr = (lang === "en") ? "data-en" : "data-ar";

  document.querySelectorAll(`[${attr}]`).forEach(el=>{
    const val = el.getAttribute(attr);
    if (val == null) return;

    // if element has direct text (common)
    // keep icons/spans safe: we only update when it has no child elements OR it's a simple element
    const hasElementChildren = Array.from(el.childNodes).some(n => n.nodeType === 1);
    if (!hasElementChildren){
      el.textContent = val;
      return;
    }

    // Special cases: buttons/links that wrap text in a span
    const textSpan = el.querySelector(".mapBtn__text");
    if (textSpan && el.classList.contains("mapBtn")){
      textSpan.textContent = val;
      return;
    }
  });

  // placeholders (if you add later)
  document.querySelectorAll("[data-ph-ar],[data-ph-en]").forEach(el=>{
    const ph = (lang === "en") ? el.getAttribute("data-ph-en") : el.getAttribute("data-ph-ar");
    if (ph != null) el.setAttribute("placeholder", ph);
  });
}

function setLangToggleLabel(lang){
  const txt1 = document.getElementById("langToggleTxt");
  const txt2 = document.getElementById("langToggleDeskTxt");
  const label = (lang === "en") ? "EN" : "AR";
  if (txt1) txt1.textContent = label;
  if (txt2) txt2.textContent = label;
}

function refreshReadMoreLabels(){
  const lang = getLang();
  document.querySelectorAll(".overlayCard").forEach(card=>{
    const btn = card.querySelector(".readMore");
    if (!btn) return;

    const isOpen = card.classList.contains("is-open");
    const moreTxt = btn.getAttribute(lang === "en" ? "data-en" : "data-ar") || btn.textContent;
    const lessTxt = (lang === "en") ? "Show less" : "إخفاء";

    btn.textContent = isOpen ? lessTxt : moreTxt;
  });
}

function bindReadMore(){
  document.querySelectorAll(".overlayCard .readMore").forEach(btn=>{
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      const card = btn.closest(".overlayCard");
      if (!card) return;
      card.classList.toggle("is-open");
      refreshReadMoreLabels();
    }, { passive:false });
  });
}

/* =========================
   Mobile menu
========================= */
function menuOpen(){
  const m = document.getElementById("mobileMenu");
  const btn = document.getElementById("menuBtn");
  if (!m) return;
  m.classList.add("is-open");
  m.setAttribute("aria-hidden", "false");
  if (btn) btn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function menuClose(){
  const m = document.getElementById("mobileMenu");
  const btn = document.getElementById("menuBtn");
  if (!m) return;
  m.classList.remove("is-open");
  m.setAttribute("aria-hidden", "true");
  if (btn) btn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function bindMenu(){
  const btn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("menuClose");
  const menu = document.getElementById("mobileMenu");
  if (btn) btn.addEventListener("click", menuOpen);
  if (closeBtn) closeBtn.addEventListener("click", menuClose);

  if (menu){
    menu.addEventListener("click", (e)=>{
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-close") === "1") menuClose();
    });
  }

  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape") menuClose();
  });
}

/* =========================
   Boot
========================= */
function boot(){
  const current = setLang(getLang());
  applyInlineLang(current);
  setLangToggleLabel(current);

  // lang toggles (mobile + desktop)
  const t1 = document.getElementById("langToggle");
  const t2 = document.getElementById("langToggleDesk");
  const toggle = ()=>{
    const next = (getLang() === "en") ? "ar" : "en";
    const lang = setLang(next);
    applyInlineLang(lang);
    setLangToggleLabel(lang);
    refreshReadMoreLabels();
  };
  if (t1) t1.addEventListener("click", toggle);
  if (t2) t2.addEventListener("click", toggle);

  bindMenu();
  bindReadMore();
  refreshReadMoreLabels();
}

document.addEventListener("DOMContentLoaded", boot);
function ensureBackdrop() {
  let bd = document.querySelector(".storyModalBackdrop");
  if (!bd) {
    bd = document.createElement("div");
    bd.className = "storyModalBackdrop is-hidden";
    bd.setAttribute("data-close-modal", "1");
    document.body.appendChild(bd);
  }
  return bd;
}

function closeAnyOpenCard() {
  document.querySelectorAll(".overlayCard.is-open").forEach(c => c.classList.remove("is-open"));
  const bd = document.querySelector(".storyModalBackdrop");
  if (bd) bd.classList.add("is-hidden");
  document.body.style.overflow = "";
}

function openCard(card) {
  const bd = ensureBackdrop();
  bd.classList.remove("is-hidden");
  card.classList.add("is-open");
  document.body.style.overflow = "hidden"; // يمنع سكرول الصفحة و المودال مفتوح
  refreshReadMoreLabels();
}

function wireModalClose() {
  const bd = ensureBackdrop();

  // ضغط خارج الكارد
  bd.addEventListener("click", closeAnyOpenCard);

  // زر "إخفاء" يسكر ويحرر الصفحة
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".readMore");
    if (!btn) return;
    const card = btn.closest(".overlayCard");
    if (!card) return;

    // إذا كان مفتوح: اغلق بدل toggle العشوائي
    if (card.classList.contains("is-open")) {
      closeAnyOpenCard();
    } else {
      openCard(card);
    }
  }, true);

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAnyOpenCard();
  });

  // إذا المستخدم حاول يسكرول الصفحة (wheel/touchmove) وهو مفتوح -> اغلق
  window.addEventListener("wheel", () => {
    if (document.querySelector(".overlayCard.is-open")) closeAnyOpenCard();
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    // إذا اللمس مو داخل نص الكارد (body) اغلقه
    const body = e.target.closest(".overlayCard.is-open .overlayCard__body");
    if (!body && document.querySelector(".overlayCard.is-open")) closeAnyOpenCard();
  }, { passive: true });
}