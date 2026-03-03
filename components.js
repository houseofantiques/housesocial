"use strict";

/* =========================================================
  components.js
  - Injects unified Topbar + Footer into:
    #siteHeader, #siteFooter
  - One language toggle button (AR <-> EN)
  - Uses existing i18n.js if present: window.I18N.apply(lang)
  - Saves lang in localStorage: hoa_lang
========================================================= */

function normalizeLang(x) {
  x = String(x || "ar").toLowerCase().trim();
  return x === "en" ? "en" : "ar";
}

function getLang() {
  try { return normalizeLang(localStorage.getItem("hoa_lang") || "ar"); }
  catch { return "ar"; }
}

function setLang(lang) {
  lang = normalizeLang(lang);

  // dir + lang attrs
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "en") ? "ltr" : "rtl";

  try { localStorage.setItem("hoa_lang", lang); } catch {}

  // apply translations from your existing i18n.js if available
  if (window.I18N && typeof window.I18N.apply === "function") {
    window.I18N.apply(lang);
  } else {
    // fallback: only swaps textContent for [data-i18n] (won't change your text keys)
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const dict = window.I18N?.DICT?.[lang];
      if (dict && key in dict) el.textContent = dict[key];
    });
  }

  // update toggle label
  const btn = document.querySelector('[data-lang-toggle]');
  if (btn) {
    btn.setAttribute("data-lang", lang);
    btn.querySelector(".langToggle__txt").textContent = (lang === "en") ? "EN" : "AR";
    btn.setAttribute("aria-label", (lang === "en") ? "Switch language to Arabic" : "Switch language to English");
  }
}

function toggleLang() {
  const next = (getLang() === "ar") ? "en" : "ar";
  setLang(next);
}

function currentPage() {
  const p = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  return p === "" ? "index.html" : p;
}

function activeAttr(href) {
  const p = currentPage();
  const h = String(href || "").toLowerCase();
  return (p === h) ? ' aria-current="page" class="tNav__link is-active"' : ' class="tNav__link"';
}

function injectHeader() {
  const mount = document.getElementById("siteHeader");
  if (!mount) return;

  // Desktop: Brand + nav + lang
  // Mobile: Logo right, lang left, and only 2-3 CTA buttons (no full nav)
  mount.innerHTML = `
  <header class="tBar" role="banner">
    <div class="tBar__in">
      <a class="tBrand" href="index.html" aria-label="Home">
        <span class="tBrand__logo" aria-hidden="true">
          <img src="logo.png" alt="">
        </span>
        <span class="tBrand__txt">
          <span class="tBrand__title">بيت التحفيات</span>
          <span class="tBrand__sub">House of Antiques</span>
        </span>
      </a>

      <nav class="tNav" aria-label="Primary">
        <a href="index.html"${activeAttr("index.html")}>الرئيسية</a>
        <a href="about.html"${activeAttr("about.html")}>نبذة</a>
        <a href="tour.html"${activeAttr("tour.html")}>جولة افتراضية</a>
        <a href="auction.html"${activeAttr("auction.html")}>المزاد</a>
        <a href="store.html"${activeAttr("store.html")}>المتجر</a>
        <a href="press.html"${activeAttr("press.html")}>الصحافة</a>
        <a href="inspection.html"${activeAttr("inspection.html")}>فحص وشراء</a>
      </nav>

      <div class="tActions">
        <button class="langToggle" type="button" data-lang-toggle>
          <span class="langToggle__ic" aria-hidden="true">🌐</span>
          <span class="langToggle__txt">AR</span>
        </button>

        <!-- Desktop CTAs -->
        <a class="tCta tCta--ghost" href="tour.html" data-i18n="footer.cta.tour">الجولة الافتراضية</a>
        <a class="tCta tCta--solid" href="https://houseofantiques.github.io/Booking-/" data-i18n="footer.cta.book">احجز الآن</a>
      </div>
    </div>

    <!-- Mobile compact row -->
    <div class="tBar__m">
      <a class="mBrand" href="index.html" aria-label="Home">
        <span class="mBrand__logo" aria-hidden="true"><img src="logo.png" alt=""></span>
      </a>

      <button class="langToggle langToggle--m" type="button" data-lang-toggle>
        <span class="langToggle__ic" aria-hidden="true">🌐</span>
        <span class="langToggle__txt">AR</span>
      </button>

      <div class="mCtas">
        <a class="mBtn" href="tour.html" data-i18n="footer.cta.tour">الجولة الافتراضية</a>
        <a class="mBtn mBtn--solid" href="https://houseofantiques.github.io/Booking-/" data-i18n="footer.cta.book">احجز الآن</a>
        <a class="mBtn" href="index.html#footer" data-i18n="footer.contact">تواصل</a>
      </div>
    </div>
  </header>
  `;

  // bind toggle (all buttons that have data-lang-toggle)
  mount.querySelectorAll("[data-lang-toggle]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLang();
    });
  });
}

function injectFooter() {
  const mount = document.getElementById("siteFooter");
  if (!mount) return;

  mount.innerHTML = `
  <!-- FOOTER COVER IMAGE -->
  <section class="footerCover" aria-hidden="true">
    <img src="footercover.jpg" alt="">
  </section>

  <footer class="siteFooter" id="footer" role="contentinfo">
    <div class="fWrap">

      <!-- CTA -->
      <div class="fTop">
        <div class="fCta">
          <div class="fCta__text">
            <div class="fCta__title" data-i18n="footer.cta.title">جاهز تستكشف بيت التحفيات؟</div>
            <div class="fCta__sub" data-i18n="footer.cta.sub">احجز زيارتك أو شاهد الجولة الافتراضية</div>
          </div>

          <div class="fCta__actions">
            <a class="btn btn--solid" href="https://houseofantiques.github.io/Booking-/" data-i18n="footer.cta.book">احجز الآن</a>
            <a class="btn btn--ghost" href="tour.html" data-i18n="footer.cta.tour">الجولة الافتراضية</a>
          </div>
        </div>
      </div>

      <!-- GRID -->
      <div class="fGrid">

        <div class="fCol fCol--about">
          <p class="fNote" data-i18n="footer.note">
            منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.
          </p>

          <!-- Address icon like social icons (same style) -->
          <div class="fAddrLine">
            <a class="addrPill" href="https://maps.app.goo.gl/PCJQtERUQCZnT6tv6" target="_blank" rel="noopener">
              <span class="addrIco" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 2c3.9 0 7 3.1 7 7 0 5.3-7 13-7 13S5 14.3 5 9c0-3.9 3.1-7 7-7zm0 9.2A2.2 2.2 0 1 0 12 6.8a2.2 2.2 0 0 0 0 4.4z"/></svg>
              </span>
              <span class="addrTxt" data-i18n="footer.addr">بغداد — شارع أبو نؤاس</span>
            </a>
          </div>
        </div>

        <div class="fCol">
          <div class="fTitle" data-i18n="footer.quick">روابط سريعة</div>
          <ul class="fLinks fLinks--2col">
            <li><a href="about.html" data-i18n="footer.about">نبذة</a></li>
            <li><a href="press.html" data-i18n="footer.press">الصحافة</a></li>
            <li><a href="store.html" data-i18n="footer.store">المتجر</a></li>
            <li><a href="auction.html" data-i18n="footer.auction">المزاد</a></li>
            <li><a href="tour.html" data-i18n="footer.cta.tour">الجولة الافتراضية</a></li>
            <li><a href="inspection.html">فحص وشراء</a></li>
          </ul>
        </div>

        <div class="fCol">
          <div class="fTitle" data-i18n="footer.legal">القانون والسياسات</div>
          <ul class="fLinks">
            <li><a href="terms.html" data-i18n="footer.terms">الأحكام</a></li>
            <li><a href="privacy.html" data-i18n="footer.privacy">الخصوصية</a></li>
          </ul>
        </div>

        <div class="fCol">
          <div class="fTitle" data-i18n="footer.contact">تواصل</div>

          <!-- 3 icons per row on mobile -->
          <div class="fIcons" aria-label="روابط التواصل">
            <a class="ico" href="mailto:houseofantiques@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>

            <a class="ico" href="https://wa.me/9647777045599" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M20.5 11.9A8.5 8.5 0 1 1 11.9 3a8.5 8.5 0 0 1 8.6 8.9zm-4.1 2.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.1-.5 0-.3-.1-1-.4-1.9-1.3-.7-.6-1.1-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.1-.4 0-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.1.9 2.3c.1.2 1.6 2.4 3.9 3.4.5.2.9.3 1.2.4.5.2 1 .2 1.4.1.4-.1 1.2-.5 1.3-.9.2-.4.2-.8.1-.9-.1-.1-.2-.2-.4-.3z"/></svg>
            </a>

            <a class="ico" href="tel:+9647777045599" aria-label="Call">
              <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.2 2.2z"/></svg>
            </a>

            <a class="ico" href="https://web.facebook.com/profile.php?id=61576091652992" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z"/></svg>
            </a>

            <a class="ico" href="https://www.instagram.com/house_ofantiques/?__pwa=1" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 12 7.5zm0 2a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5zm4.8-2.8a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1z"/></svg>
            </a>

            <a class="ico" href="https://www.youtube.com/@house.of.antiques" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h0s-4.9 0-8.2.3c-.4.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8.3.3 8.3.3s4.9 0 8.2-.3c.4-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.5 14.8V7.8l6.2 3.5-6.2 3.5z"/></svg>
            </a>

            <!-- Location icon (same as social icons) -->
            <a class="ico" href="https://maps.app.goo.gl/PCJQtERUQCZnT6tv6" target="_blank" rel="noopener" aria-label="Location">
              <svg viewBox="0 0 24 24"><path d="M12 2c3.9 0 7 3.1 7 7 0 5.3-7 13-7 13S5 14.3 5 9c0-3.9 3.1-7 7-7zm0 9.2A2.2 2.2 0 1 0 12 6.8a2.2 2.2 0 0 0 0 4.4z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <div class="fBottom">
        <div class="fCopy" data-i18n="footer.copy">© 2026 بيت التحفيات — جميع الحقوق محفوظة</div>
      </div>

    </div>
  </footer>
  `;
}

function boot() {
  injectHeader();
  injectFooter();

  // Apply language at start (so i18n keys render)
  setLang(getLang());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}