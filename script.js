/*
 * Gay AI brand page interactions.
 * When the main app is deployed, set MAIN_APP_URL below to its public URL.
 * Example: const MAIN_APP_URL = "https://your-app-domain.example";
 * The URL is intentionally empty for now, as requested.
 */
const MAIN_APP_URL = "https://gay-ai-sand.vercel.app";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const appButtons = [...document.querySelectorAll("[data-main-app]")];
const toast = document.querySelector("#app-toast");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
let toastTimeout;
let previousFocus = null;

// Keep the footer year up to date without a dependency.
const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3500);
}

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const opening = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    primaryNav.classList.toggle("is-open", opening);
    document.body.classList.toggle("menu-open", opening);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// App CTA buttons are intentionally unlinked until the production URL exists.
appButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const appUrl = MAIN_APP_URL.trim();
    if (appUrl) {
      window.open(appUrl, "_blank", "noopener,noreferrer");
      return;
    }
    showToast("The main Gay AI app link will be connected here after deployment.");
  });
});

// Reveal sections gently as they enter the viewport; avoid work for reduced-motion users.
const revealItems = [...document.querySelectorAll(".reveal")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Update the active section link while scrolling.
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
if ("IntersectionObserver" in window && sectionTargets.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-24% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] });
  sectionTargets.forEach((section) => sectionObserver.observe(section));
}

function openLightbox(button) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  previousFocus = document.activeElement;
  lightboxImage.src = button.dataset.lightbox;
  lightboxImage.alt = button.querySelector("img")?.alt || button.dataset.title || "Gallery image";
  lightboxCaption.textContent = button.dataset.title || "Gay AI visual study";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
});
