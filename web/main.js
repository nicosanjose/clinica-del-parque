/* =========================================================================
   Clínica del Parque · web pública — interacción
   Aura de cursor global · hero de partículas · nav flotante · menú · reveal
   ========================================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- cursor aura (toda la web) ---------- */
  if (fine) {
    const aura = document.createElement('div');
    aura.className = 'aura';
    document.body.appendChild(aura);
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, shown = false;
    addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; aura.classList.add('on'); }
    });
    addEventListener('mouseout', e => { if (!e.relatedTarget) aura.classList.remove('on'); });
    (function loop() {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      aura.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- nav flotante (scroll) + menú móvil ---------- */
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    const onScroll = () => navWrap.classList.toggle('scrolled', scrollY > 24);
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
  }
  const hamb = document.querySelector('.hamb');
  if (hamb) {
    hamb.addEventListener('click', () => document.body.classList.toggle('menu-open'));
    document.querySelectorAll('.menu-overlay a').forEach(a =>
      a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  }

  /* ---------- reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* ---------- año en footer ---------- */
  document.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());

  /* ---------- formulario demo ---------- */
  document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const btn = f.querySelector('button[type=submit]');
    if (btn) { const t = btn.querySelector('.lbl') || btn; const old = t.textContent; t.textContent = 'Solicitud enviada ✓'; btn.disabled = true; setTimeout(() => { t.textContent = old; btn.disabled = false; f.reset(); }, 2600); }
  }));

  /* ---------- HERO: partículas interactivas ---------- */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr, parts = [];
  const COLORS = [[0, 188, 212], [63, 81, 181], [127, 182, 166], [43, 53, 75]];
  const mouse = { x: -999, y: -999, active: false };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round(Math.min(94, (W * H) / 13000));
    parts = [];
    for (let i = 0; i < target; i++) parts.push(spawn());
  }
  function spawn(atBottom) {
    const c = COLORS[(Math.random() * COLORS.length) | 0];
    return {
      x: Math.random() * W,
      y: atBottom ? H + Math.random() * 40 : Math.random() * H,
      r: 1.2 + Math.random() * 3.4,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -0.12 - Math.random() * 0.34,
      a: 0.18 + Math.random() * 0.4,
      c, drift: Math.random() * Math.PI * 2, ds: 0.005 + Math.random() * 0.012,
    };
  }
  const rectOf = () => canvas.getBoundingClientRect();
  if (fine) {
    addEventListener('mousemove', e => { const r = rectOf(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = e.clientY - r.top < H; });
    canvas.addEventListener('mouseleave', () => mouse.active = false);
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    // links between near particles (subtle)
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      for (let j = i + 1; j < parts.length; j++) {
        const q = parts[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
        if (d2 < 8500) {
          const o = (1 - d2 / 8500) * 0.14;
          ctx.strokeStyle = `rgba(0,188,212,${o})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    for (const p of parts) {
      p.drift += p.ds;
      p.x += p.vx + Math.sin(p.drift) * 0.16;
      p.y += p.vy;
      // repel from cursor
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 20000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 141) * 2.4; p.x += (dx / d) * f; p.y += (dy / d) * f; }
      }
      if (p.y < -20 || p.x < -30 || p.x > W + 30) Object.assign(p, spawn(true));
      const [r, g, b] = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`; ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', resize);
  resize();
  if (reduce) { ctx.clearRect(0, 0, W, H); parts.forEach(p => { const [r, g, b] = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`; ctx.fill(); }); }
  else frame();
})();
