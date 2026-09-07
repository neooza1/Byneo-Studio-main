/* =========================================================
   BYNEO STUDIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

    mobileNav.setAttribute(
      "aria-hidden",
      !isOpen
    );

    document.body.classList.toggle("menu-open", isOpen);

  });


  const mobileLinks = mobileNav.querySelectorAll("a");

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      mobileNav.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove("menu-open");

    });

  });

}


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   SCROLL ORB — ROTATION + MOVEMENT
========================================================= */

const scrollOrb = document.querySelector(".scroll-orb");

if (scrollOrb) {

  let ticking = false;

  const updateOrb = () => {

    const scrollPosition = window.scrollY;

    const rotation =
      Math.min(scrollPosition * 0.12, 160);

    const movement =
      Math.min(scrollPosition * 0.025, 18);

    scrollOrb.style.transform =
      `translateY(${movement}px) rotate(${rotation}deg)`;

    ticking = false;

  };


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateOrb
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  scrollOrb.addEventListener(
    "mouseenter",
    () => {

      scrollOrb.style.transform =
        "scale(1.08) rotate(8deg)";

    }
  );


  scrollOrb.addEventListener(
    "mouseleave",
    () => {

      updateOrb();

    }
  );

}


/* =========================================================
   PROJECT BROWSER MICRO PARALLAX
========================================================= */

const browsers =
  document.querySelectorAll(".project-browser");

if (browsers.length) {

  let browserTicking = false;

  const updateBrowsers = () => {

    browsers.forEach((browser) => {

      const rect =
        browser.getBoundingClientRect();

      const viewportCenter =
        window.innerHeight / 2;

      const distance =
        rect.top +
        rect.height / 2 -
        viewportCenter;

      const movement =
        Math.max(
          -8,
          Math.min(
            8,
            distance * -0.015
          )
        );

      browser.style.setProperty(
        "--browser-shift",
        `${movement}px`
      );

    });

    browserTicking = false;

  };


  window.addEventListener(
    "scroll",
    () => {

      if (!browserTicking) {

        window.requestAnimationFrame(
          updateBrowsers
        );

        browserTicking = true;

      }

    },
    { passive: true }
  );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
  document.querySelector("#year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);