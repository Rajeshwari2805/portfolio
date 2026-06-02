// ── THEME SWITCHER ──
// Clicking a color dot sets the data-theme attribute on <html>,
// which swaps all CSS custom properties instantly.
const dots = document.querySelectorAll('.theme-dot');
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', dot.dataset.t);
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// ── SCROLL REVEAL ──
// IntersectionObserver watches every .reveal element.
// When it enters the viewport, .visible is added → CSS fades it in.
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target); // fire once only
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK ON SCROLL ──
// As the user scrolls, highlights the sidebar link
// matching whichever section is currently in view.
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── MOBILE SIDEBAR TOGGLE ──
// Called by the hamburger button's onclick attribute.
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar when a nav link is tapped on mobile.
navLinks.forEach(a => a.addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
}));