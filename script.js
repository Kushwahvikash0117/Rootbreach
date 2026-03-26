
const target = new Date('2026-03-28T09:00:00+05:30');
function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .rule-item, .stage-item, .prize-card, .faq-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.02) + 's';
  observer.observe(el);
});

// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── CURSOR TRAIL ───
const trail = [];
for (let i = 0; i < 8; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed; width:4px; height:4px; border-radius:50%;
    background: #39FF14; pointer-events:none; z-index:99999;
    opacity:${0.8 - i * 0.1}; transition: none;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}
let mx = 0, my = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animTrail() {
  let px = mx, py = my;
  trail.forEach((t, i) => {
    const prev = trail[i - 1] || { x: mx, y: my };
    t.x += (prev.x - t.x) * 0.5;
    t.y += (prev.y - t.y) * 0.5;
    t.el.style.left = t.x + 'px';
    t.el.style.top = t.y + 'px';
    t.el.style.transform = `translate(-50%,-50%) scale(${1 - i * 0.09})`;
    t.el.style.opacity = (0.7 - i * 0.08);
  });
  requestAnimationFrame(animTrail);
}
animTrail();
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// hide navbar in mobile view 
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) return; // only mobile

  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // scrolling down → hide navbar
    nav.classList.add('hide-nav');
  } else {
    // scrolling up → show navbar
    nav.classList.remove('hide-nav');
  }

  lastScroll = currentScroll;
});