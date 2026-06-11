/* ─── NAV SCROLL EFFECT ──────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── HERO IMAGE LOAD ────────────────────────────────────── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  if (heroImg.complete) heroImg.classList.add('loaded');
}

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
const reveals = document.querySelectorAll(
  '.about-grid, .services-header, .service-card, .work-header, .work-card, .offer-glass, .contact-grid, .section-title, .body-text'
);
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ─── MOBILE NAV DRAWER ──────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navClose  = document.getElementById('navClose');

function openDrawer() {
  navDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  navDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

if (navToggle) navToggle.addEventListener('click', openDrawer);
if (navClose)  navClose.addEventListener('click', closeDrawer);

// Close on backdrop click (outside drawer content)
navDrawer && navDrawer.addEventListener('click', (e) => {
  if (e.target === navDrawer) closeDrawer();
});

/* ─── CONTACT FORM ───────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2a6e3f';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}
