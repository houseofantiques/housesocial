"use strict";

/* =========================
  1) Matterport URL
========================= */
const TOUR_URL = "https://my.matterport.com/show/?m=33mzsiPWyX2"; // بدّلها لو لازم
const frame = document.getElementById("mpFrame");
if (frame) frame.src = TOUR_URL;

/* =========================
  2) Mobile menu (FIXED)
========================= */
const menuRoot = document.querySelector("[data-menu]");
const openBtn = document.querySelector("[data-menu-open]");
const closeBtns = document.querySelectorAll("[data-menu-close]");

function setMenu(open) {
  if (!menuRoot) return;
  menuRoot.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.style.overflow = open ? "hidden" : "";
}

if (openBtn) openBtn.addEventListener("click", () => setMenu(true));
closeBtns.forEach((b) => b.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* =========================
  3) Smooth scroll
========================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-scroll]");
  if (!btn) return;

  const sel = btn.getAttribute("data-scroll");
  if (!sel) return;

  if (sel === "body") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector(sel);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* =========================
  4) i18n (FORCE APPLY)
  - يقرأ DICT من i18n.js إذا موجود
  - يطبق على data-i18n
========================= */
const LS_KEY = "hoa_lang";
const langBtn = document.querySelector("[data-lang-toggle]");
const langTxt = document.querySelector(".langToggle__txt");

function getDictForCurrentLang() {
  // إذا i18n.js عندك معرف DICT بشكل global
  // جرّب أسماء شائعة بدون ما نكسر الصفحة
  return (
    window.DICT ||
    window.I18N_DICT ||
    window.TRANSLATIONS ||
    null
  );
}

function applyTranslations(dict) {
  if (!dict) return;

  // title
  const tEl = document.querySelector("title[data-i18n]");
  if (tEl) {
    const k = tEl.getAttribute("data-i18n");
    if (dict[k]) document.title = dict[k];
  }

  // elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;

    const val = dict[key];
    if (!val) return;

    // inputs placeholders لو عندك
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = val;
      return;
    }

    el.textContent = val;
  });
}

function applyLang(lang) {
  const html = document.documentElement;
  const isAr = lang === "ar";

  html.lang = isAr ? "ar" : "en";
  html.dir = isAr ? "rtl" : "ltr";

  if (langTxt) langTxt.textContent = isAr ? "AR" : "EN";
  localStorage.setItem(LS_KEY, lang);

  // إذا i18n.js عندك دالة setLang استخدمها
  if (typeof window.setLang === "function") {
    window.setLang(lang);
    return;
  }

  // غير هذا: نطبق ترجمة محلية من DICT/DICT_EN لو متوفر
  const dict = getDictForCurrentLang();
  if (dict && typeof dict === "object") {
    // إذا DICT وحدة بس، ما نكدر نفرق AR/EN
    // لهذا الأفضل يكون عندك DICT_AR و DICT_EN أو i18n.js مسؤول
    // بس نحاول:
    applyTranslations(dict);
  }

  // نطلق event حتى i18n.js لو يسمع
  window.dispatchEvent(new CustomEvent("hoa:lang", { detail: { lang } }));
}

function nextLang() {
  const cur = localStorage.getItem(LS_KEY) || document.documentElement.lang || "ar";
  return cur === "ar" ? "en" : "ar";
}

document.addEventListener("DOMContentLoaded", () => {
  // init
  applyLang(localStorage.getItem(LS_KEY) || "ar");

  if (langBtn) {
    langBtn.addEventListener("click", () => applyLang(nextLang()));
  }

  /* ===== Language toggle (delegation - never breaks) ===== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-lang-toggle]");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  applyLang(nextLang());
}, true); // <-- capture = true
});