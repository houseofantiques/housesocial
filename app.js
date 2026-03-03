"use strict";

/* Helpers */
const $  = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

/* =========================================================
   1) HERO background slider (images already in HTML)
========================================================= */
const heroImgs = $$(".hero__bgImg");
let heroIndex = 0;

const prev = $("#prevHero");
const next = $("#nextHero");
const dots = $("#heroDots");

function renderDots(){
  if(!dots || !heroImgs.length) return;

  dots.innerHTML = heroImgs
    .map((_, i) =>
      `<button class="dot ${i===0 ? "is-active" : ""}" type="button" data-dot="${i}" aria-label="Hero ${i+1}"></button>`
    )
    .join("");

  dots.addEventListener("click", (e) => {
    const b = e.target.closest("[data-dot]");
    if(!b) return;
    goHero(Number(b.dataset.dot));
    restartHero();
  });
}

function updateHero(){
  if(!heroImgs.length) return;
  heroImgs.forEach((img, i) => img.classList.toggle("is-active", i === heroIndex));
  if(dots) $$(".dot", dots).forEach((d, i) => d.classList.toggle("is-active", i === heroIndex));
}

function goHero(n){
  const len = heroImgs.length || 1;
  heroIndex = (n + len) % len;
  updateHero();
}

prev && prev.addEventListener("click", () => { goHero(heroIndex - 1); restartHero(); });
next && next.addEventListener("click", () => { goHero(heroIndex + 1); restartHero(); });

let heroTimer = null;
function startHero(){
  stopHero();
  if(heroImgs.length <= 1) return;
  heroTimer = setInterval(() => goHero(heroIndex + 1), 5200);
}
function stopHero(){
  if(heroTimer) clearInterval(heroTimer);
  heroTimer = null;
}
function restartHero(){ stopHero(); startHero(); }

// swipe on hero
const hero = $(".hero");
if(hero){
  let x0 = null;
  hero.addEventListener("pointerdown", (e) => x0 = e.clientX);
  hero.addEventListener("pointerup", (e) => {
    if(x0 == null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if(dx < -40){ goHero(heroIndex + 1); restartHero(); }
    if(dx >  40){ goHero(heroIndex - 1); restartHero(); }
  });
}

renderDots();
updateHero();
startHero();

/* =========================================================
   2) Count-up stats
========================================================= */
(function(){
  const nums = $$(".num[data-count]");
  if(!nums.length) return;

  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const run = (el) => {
    const target = Number(el.dataset.count || "0");
    const dur = 900;
    const t0 = performance.now();

    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const v = Math.round(target * ease(p));

      // لو انت بالانكليزي خليها en-US، لو عربي خلي ar-IQ
      const currentLang = localStorage.getItem("hoa_lang") || "ar";
      const locale = currentLang === "en" ? "en-US" : "ar-IQ";
      el.textContent = v.toLocaleString(locale);

      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        run(en.target);
        io.unobserve(en.target);
      }
    });
  }, { threshold: .35 });

  nums.forEach(n => io.observe(n));
})();

/* =========================================================
   3) i18n (keep your existing structure)
   - Supports:
     A) Old chips: .chip[data-lang="ar|en"]
     B) New button: [data-lang-toggle] + .langToggle__txt
========================================================= */
let lang = localStorage.getItem("hoa_lang") || "ar";

/**
 * Expect a global object:
 *   window.I18N = {
 *     ar: { dir:"rtl", ...keys },
 *     en: { dir:"ltr", ...keys }
 *   }
 *
 * Your existing code used I18N directly. We keep it.
 */
function applyLang(l){
  const I18N = window.I18N || window.i18n || window.DICT; // fallback if you renamed it
  if(!I18N) return;

  const d = I18N[l] || I18N.ar;
  lang = l;

  // dir
  document.documentElement.dir = d.dir || (l === "ar" ? "rtl" : "ltr");
  document.documentElement.lang = (l === "ar" ? "ar" : "en");

  // old chips (if exist)
  $$(".chip").forEach(b => b.classList.toggle("is-active", b.dataset.lang === l));

  // apply data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if(d[key] != null) el.textContent = d[key];
  });

  // NEW: language button label (AR/EN) without using data-i18n
  const t = $(".langToggle__txt");
  if(t) t.textContent = (l === "ar") ? "AR" : "EN";

  localStorage.setItem("hoa_lang", l);
}

// old chips
$$(".chip").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));

// new toggle button
const langToggleBtn = $("[data-lang-toggle]");
if(langToggleBtn){
  langToggleBtn.addEventListener("click", () => {
    applyLang(lang === "ar" ? "en" : "ar");
  });
}

applyLang(lang);

/* =========================================================
   4) NEW Topbar Mobile Menu (hoaTopbar)
   Works with:
     - open button: [data-menu-open]
     - menu wrapper: [data-menu]
     - close triggers: [data-menu-close] (backdrop + close btn)
========================================================= */
(function(){
  const menu = $("[data-menu]");
  const openBtn = $("[data-menu-open]");
  const closeBtns = $$("[data-menu-close]");

  if(!menu || !openBtn) return;

  const open = () => {
    menu.classList.add("is-open");
    // prevent background scroll
    document.documentElement.classList.add("menu-open");
  };

  const close = () => {
    menu.classList.remove("is-open");
    document.documentElement.classList.remove("menu-open");
  };

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      close();
    });
  });

  // close when clicking a link inside panel
  const panel = $(".mobileMenu__panel", menu);
  if(panel){
    panel.addEventListener("click", (e) => {
      if(e.target.closest("a")) close();
    });
  }

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") close();
  });
})();

/* =========================================================
   5) LEGACY nav handlers (DISABLED)
   You had old nav systems:
     - .navV2__burger / #navLinks
     - .topbar / #mobileMenu / .topbar__overlay
   They don't match your new HTML and were breaking behavior.
   Remove them to avoid conflicts.
========================================================= */
// intentionally removed
/* =========================
   Mobile Menu (Safe)
   uses: data-menu, data-menu-open, data-menu-close
========================= */
(function () {
  const menu = document.querySelector("[data-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeEls = document.querySelectorAll("[data-menu-close]");

  if (!menu || !openBtn) return;

  function openMenu() {
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // يمنع سكرول بالخلف
  }

  function closeMenu() {
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // يرجع الطبيعي
  }

  openBtn.addEventListener("click", openMenu);

  closeEls.forEach((el) => {
    el.addEventListener("click", closeMenu);
  });

  // ESC closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // close when clicking a link inside menu
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });
})();