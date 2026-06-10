/* ─── NAV SCROLL EFFECT ──────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── HERO IMAGE PARALLAX / LOAD ─────────────────────────── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  if (heroImg.complete) heroImg.classList.add('loaded');
}

window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrollY = window.scrollY;
  const heroH = document.querySelector('.hero').offsetHeight;
  if (scrollY < heroH) {
    heroImg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
  }
}, { passive: true });

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

/* ─── MOBILE NAV ─────────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(248,248,246,0.96)';
    navLinks.style.backdropFilter = 'blur(18px)';
    navLinks.style.padding = '1.5rem 2.5rem';
    navLinks.style.borderBottom = '1px solid rgba(200,191,176,0.3)';
    if (!isOpen) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = '#0D0D0D';
        a.style.padding = '0.6rem 0';
        a.style.borderBottom = '1px solid rgba(200,191,176,0.2)';
      });
    }
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.style.display = 'none';
    });
  });
}

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
