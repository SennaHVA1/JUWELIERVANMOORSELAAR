/* Juwelier P.J. van Moorselaar - gedeelde interacties */

(function () {
  "use strict";

  /* Scroll-reveal: IntersectionObserver, geen scroll-listeners */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* Nav: vaste achtergrond zodra de sentinel bovenaan uit beeld is */
  var nav = document.querySelector(".site-nav");
  var sentinel = document.querySelector("[data-nav-sentinel]");

  if (nav && sentinel && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        nav.classList.toggle("is-solid", !entries[0].isIntersecting);
      },
      { rootMargin: "80px 0px 0px 0px" }
    );
    navObserver.observe(sentinel);
  } else if (nav) {
    nav.classList.add("is-solid");
  }

  /* Mobiel menu */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".menu-close");

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      setMenu(false);
    });
  }
  if (menu) {
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }
})();
