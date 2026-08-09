// ===== Theme toggle =====
(function themeInit() {
  const root = document.documentElement;
  const saved = localStorage.getItem('icons-placement-theme');
  if (saved) root.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('icons-placement-theme', next);
    });
  }
})();

// ===== Mobile nav toggle =====
(function navInit() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
})();

// ===== Active nav link highlight =====
(function activeNavInit() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });
})();

// ===== Scroll reveal =====
(function revealInit() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();

// ===== Accordion (aptitude topics) =====
(function accordionInit() {
  document.querySelectorAll('.acc-head').forEach(head => {
    head.addEventListener('click', () => {
      const item = head.closest('.acc-item');
      item.classList.toggle('open');
    });
  });
})();

// ===== Reveal answer (Q&A cards) =====
(function qaRevealInit() {
  document.querySelectorAll('.qa-reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.closest('.qa-card').querySelector('.qa-answer');
      const open = answer.classList.toggle('open');
      btn.textContent = open ? 'Hide Answer' : 'Show Answer';
    });
  });
})();

// ===== Bar chart height animation =====
(function barChartInit() {
  const bars = document.querySelectorAll('.bar-fill[data-pct]');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.height = e.target.dataset.pct + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.height = '0%'; io.observe(b); });
})();

// ===== Resource filters =====
(function filterInit() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.resource-card');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
      });
    });
  });
})();
