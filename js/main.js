/* ============================================================
   BIOWELLNESS · main.js
   Comportamientos base del sitio. Cada init() tiene guardas:
   si la página no usa ese componente, no hace nada.
   Cargar con: <script src="js/main.js" defer></script>
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: fondo al hacer scroll ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú móvil ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal al hacer scroll ---------- */
  function initReveal() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Barras de biomarcadores ----------
     Marcado esperado:
     <div class="biomarker" data-conv="0;100" data-opt="55;88"> ... </div> */
  function paintBiomarker(bm) {
    var conv = (bm.getAttribute("data-conv") || "0;100").split(";").map(Number);
    var opt = (bm.getAttribute("data-opt") || "0;100").split(";").map(Number);
    var convEl = bm.querySelector(".conv");
    var optEl = bm.querySelector(".opt");
    if (!convEl || !optEl) return;
    convEl.style.left = conv[0] + "%";
    convEl.style.width = (conv[1] - conv[0]) + "%";
    optEl.style.left = opt[0] + "%";
    requestAnimationFrame(function () {
      optEl.style.width = (opt[1] - opt[0]) + "%"; // el ancho se anima por CSS
    });
  }

  function initBiomarkers() {
    var bms = document.querySelectorAll(".biomarker");
    if (!bms.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      bms.forEach(paintBiomarker);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          paintBiomarker(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    bms.forEach(function (el) { io.observe(el); });
  }

  /* ---------- CTAs placeholder ----------
     Reemplazar los href="#" con data-cta por los enlaces reales
     (sistema de reservas / wa.me). Mientras tanto, avisan. ---------- */
  function initCtaPlaceholders() {
    document.querySelectorAll("[data-cta]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (el.getAttribute("href") !== "#") return; // ya tiene enlace real
        e.preventDefault();
        var t = el.getAttribute("data-cta");
        var msg = t === "whatsapp"
          ? "Reemplazá este enlace por: https://wa.me/549XXXXXXXXXX"
          : "Reemplazá este enlace por tu sistema de reservas o formulario de contacto.";
        alert(msg);
      });
    });
  }

  /* ---------- Año automático: <span data-year></span> ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Init ---------- */
  function initAll() {
    initNav();
    initMobileMenu();
    initReveal();
    initBiomarkers();
    initCtaPlaceholders();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
