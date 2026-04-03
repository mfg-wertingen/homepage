const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.dataset.open = "false";
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.dataset.open = String(!isExpanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });
}

const logoImage = document.querySelector(".brand-logo");
const logoFallback = document.querySelector(".logo-fallback");

if (logoImage && logoFallback) {
  const showFallback = () => {
    logoImage.classList.add("is-missing");
    logoFallback.classList.add("is-visible");
  };

  logoImage.addEventListener("error", showFallback);

  if (logoImage.complete && logoImage.naturalWidth === 0) {
    showFallback();
  }
}

const revealElements = Array.from(document.querySelectorAll(".reveal"));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else if ("IntersectionObserver" in window) {
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -30px 0px"
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

const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}
