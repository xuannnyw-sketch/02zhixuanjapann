if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function scrollToTopOnLoad() {
  window.scrollTo(0, 0);
}

function initFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

function initSmoothScroll() {
  const nav = document.querySelector('nav');
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

function initBackToTopBtn() {
  const btn = document.getElementById('backToTop');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          btn.style.display = 'block';
        } else {
          btn.style.display = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  // 用 Intersection Observer 来观察section进入视口的情况
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // 
    threshold: 0
  };

  function observerCallback(entries) {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

function init() {
  scrollToTopOnLoad();
  initFadeIn();
  initSmoothScroll();
  initBackToTopBtn();
  initNavHighlight();
}

window.addEventListener('DOMContentLoaded', init);

