/* =========================================================================
   Clínica del Parque · Portal de administración interna (mockup)
   SPA vanilla: login por rol → shell → vistas. Todo clicable.
   ========================================================================= */

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
const initials = n => n.replace(/^(Dr\.|Dra\.)\s*/, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const money = n => n.toLocaleString('es-ES') + ' €';
const HH = m => { const t = 540 + m; return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(Math.max(0, t % 60)).padStart(2, '0'); };
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const fmtDate = iso => { const d = new Date(iso + 'T00:00'); return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }); };

const av = (name, color, size = '34') =>
  `<span class="av av-${size}" style="background:${color}">${initials(name)}</span>`;

const ICON = {
  dash:   '<path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/>',
  agenda: '<path d="M7 2v3m10-3v3M3 9h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  users:  '<path d="M16 11a4 4 0 1 0-8 0m10 8a6 6 0 0 0-12 0M8 7a4 4 0 1 0 8 0" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="7" r="4"/>',
  patient:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  file:   '<path d="M14 3v5h5M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-5-5Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  cog:    '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3m0 14v3M4 12H1m22 0h-3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" stroke="currentColor" stroke-width="1.8"/>',
  cash:   '<rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  crm:    '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  box:    '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 8l9 5 9-5M12 13v8" stroke="currentColor" stroke-width="1.8"/>',
  clock:  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.8"/>',
  bell:   '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m21 21-4.3-4.3" stroke="currentColor" stroke-width="1.8"/>',
  out:    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  plus:   '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>',
  menu:   '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"/>',
  chev:   '<path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/>',
  eye:    '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  foot:   '<path d="M7 4c2 0 3 2 3 5s-1 6-3 6-3-2-3-4 1-7 3-7Zm7 13c1.5 0 2 1 2 2s-.5 2-2 2-3-1-3-2 1.5-2 3-2Z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  heart:  '<path d="M12 21s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
};
const svg = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none">${ICON[k]}</svg>`;

/* ---------- estado ---------- */
const S = {
  userId: null, realUserId: null,
  route: 'dashboard', param: null,
  agendaDay: WEEK.todayIdx <= 4 ? WEEK.todayIdx : 0,
  patientQuery: '',
  repArea: 'all', repState: 'all', repActive: REPORTS[0].id,
  patTab: 'resumen',
};
const me = () => userById(S.userId);
const myArea = () => { const u = me(); return u && u.role === 'area' ? u.area : null; };
const canSeeConfidential = () => { const u = me(); return u.role === 'gerencia' || u.area === 'psico'; };

/* ---------- toast ---------- */
function toast(msg) {
  const t = el(`<div class="toast">${svg('shield', '')}<span>${msg}</span></div>`);
  t.querySelector('svg').classList.add('tk'); t.querySelector('svg').style.width = '16px';
  $('#toast-root').appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, 2200);
}

/* =========================================================================
   LOGIN
   ========================================================================= */
function renderLogin() {
  document.body.classList.remove('in-app');
  const roleCard = u => `
    <button class="role-btn" data-login="${u.id}">
      <span class="ra" style="background:${u.color}">${initials(u.name)}</span>
      <span><span class="rt">${u.name}</span><br><span class="rr">${u.title}</span></span>
    </button>`;
  $('#root').innerHTML = `
  <div class="login">
    <div class="login-card">
      <div class="login-aside">
        <div>
          <div class="badges"><span>Administración interna</span><span>Historia clínica</span><span>Multidisciplinar</span></div>
        </div>
        <div>
          <h2>Un solo panel para toda la clínica.</h2>
          <p>Agenda, pacientes e informes de las 6 áreas, con una vista de dirección que lo controla todo y un panel propio para cada especialista.</p>
        </div>
        <div class="badges">
          <span>👣 Podología</span><span>💪 Fisio</span><span>🥗 Nutrición</span><span>🧠 Psicología</span><span>💧 Homeopatía</span><span>✨ Estética</span>
        </div>
      </div>
      <div class="login-body">
        <img class="login-logo" src="assets/logo.jpg" alt="Clínica del Parque" />
        <h1>Acceso al portal</h1>
        <div class="sub">Selecciona con qué perfil quieres entrar (demo).</div>
        <div class="field"><label>Usuario</label><input value="equipo@clinicadelparque.es" /></div>
        <div class="field"><label>Contraseña</label><input type="password" value="••••••••" /></div>
        <div class="role-grid">
          ${USERS.filter(u => ['gerencia', 'recepcion'].includes(u.role)).map(roleCard).join('')}
        </div>
        <div class="nav-label" style="color:var(--ink-3);margin:14px 2px 8px">Entrar como profesional de un área</div>
        <div class="role-grid">
          ${USERS.filter(u => u.role === 'area').map(roleCard).join('')}
        </div>
        <div class="login-hint">Mockup de demostración · datos de pacientes inventados. Ningún dato real.</div>
      </div>
    </div>
  </div>`;
  $$('[data-login]').forEach(b => b.onclick = () => login(b.dataset.login));
}
function login(id) { S.userId = id; S.realUserId = id; buildShell(); go('dashboard'); }
function logout() { S.userId = null; S.realUserId = null; location.hash = ''; renderLogin(); }

/* =========================================================================
   SHELL (sidebar + topbar)
   ========================================================================= */
function navFor(u) {
  const areaLinks = () => AREAS.map(a =>
    `<button class="nav-item" data-go="area/${a.id}"><span style="width:18px;height:18px;border-radius:5px;background:${a.color};display:inline-block;flex:none"></span><span>${a.short}</span></button>`).join('');
  const soon = (ic, t) => `<button class="nav-item soon" title="En el roadmap">${svg(ic)}<span>${t}</span><span class="soon-tag">Pronto</span></button>`;
  const item = (r, ic, t, badge) => `<button class="nav-item" data-go="${r}">${svg(ic)}<span>${t}</span>${badge ? `<span class="badge-n">${badge}</span>` : ''}</button>`;

  if (u.role === 'gerencia') {
    const pend = REPORTS.filter(r => r.state === 'borrador').length;
    return `
      <div class="nav-label">General</div>
      ${item('dashboard', 'dash', 'Dashboard')}
      ${item('agenda', 'agenda', 'Agenda global', APPTS.filter(a => a.wd === S.agendaDay).length)}
      ${item('pacientes', 'patient', 'Pacientes', PATIENTS.length)}
      ${item('informes', 'file', 'Informes', pend ? pend + ' bor.' : '')}
      <div class="nav-label">Áreas</div>
      ${areaLinks()}
      <div class="nav-label">Dirección</div>
      ${item('usuarios', 'users', 'Usuarios y permisos')}
      ${item('auditoria', 'shield', 'Auditoría RGPD')}
      <div class="nav-label">Próximamente</div>
      ${soon('cash', 'Caja y facturación')}
      ${soon('crm', 'CRM y captación')}
      ${soon('box', 'Inventario')}
      ${soon('users', 'RRHH y turnos')}`;
  }
  if (u.role === 'recepcion') {
    return `
      <div class="nav-label">General</div>
      ${item('dashboard', 'dash', 'Dashboard')}
      ${item('agenda', 'agenda', 'Agenda global')}
      ${item('pacientes', 'patient', 'Pacientes', PATIENTS.length)}
      <div class="nav-label">Próximamente</div>
      ${soon('cash', 'Caja y cobros')}
      ${soon('crm', 'CRM y captación')}`;
  }
  // profesional de área
  const a = areaById(u.area);
  const myRep = REPORTS.filter(r => r.areaId === u.area).length;
  return `
    <div class="nav-label">Mi área · ${a.short}</div>
    ${item('dashboard', 'dash', 'Dashboard')}
    ${item('area/' + u.area, u.area === 'podo' ? 'foot' : 'heart', 'Panel de ' + a.short)}
    ${item('agenda', 'agenda', 'Mi agenda')}
    ${item('pacientes', 'patient', 'Mis pacientes')}
    ${item('informes', 'file', 'Mis informes', myRep)}`;
}

function buildShell() {
  document.body.classList.add('in-app');
  const u = me();
  const scopeArea = myArea() ? areaById(myArea()) : null;
  const scope = u.role === 'gerencia'
    ? { c: '#00BCD4', t: 'Vista Dirección', s: 'Acceso total · god-view' }
    : u.role === 'recepcion'
      ? { c: '#607D8B', t: 'Recepción', s: 'Agenda y pacientes' }
      : { c: scopeArea.color, t: 'Área: ' + scopeArea.short, s: 'Panel del especialista' };

  const impersonating = S.realUserId !== S.userId;
  $('#root').innerHTML = `
  <div class="app active">
    <aside class="sidebar" id="sidebar">
      <div class="side-brand">
        <div class="logo-chip"><img src="assets/logo.jpg" alt="" /></div>
        <div><div class="bt">Clínica del Parque</div><div class="bs">Portal interno</div></div>
      </div>
      <div class="side-scope"><span class="sc-dot" style="background:${scope.c}"></span><div><div class="sc-t">${scope.t}</div><div class="sc-s">${scope.s}</div></div></div>
      <nav class="nav" id="nav">${navFor(u)}</nav>
      <div class="side-user">
        ${av(u.name, u.color, '34')}
        <div><div class="su-t">${u.name.split(' ').slice(0, 2).join(' ')}</div><div class="su-s">${u.title}</div></div>
        <button class="su-out" id="logout" title="Salir">${svg('out')}</button>
      </div>
    </aside>
    <div class="backdrop" id="backdrop"></div>
    <div class="main">
      <header class="topbar">
        <button class="hamb" id="hamb">${svg('menu')}</button>
        <div><div class="page-t" id="page-t">Dashboard</div><div class="page-s" id="page-s"></div></div>
        <div class="search">${svg('search')}<input id="search" placeholder="Buscar paciente…" /></div>
        ${impersonating ? `<button class="btn btn-sm btn-navy" id="unimperson">${svg('eye')} Volver a Dirección</button>` : ''}
        <button class="top-ic" id="notif">${svg('bell')}<span class="dot"></span></button>
      </header>
      <div class="content" id="content"></div>
    </div>
  </div>`;

  $('#logout').onclick = logout;
  $('#hamb').onclick = () => { $('#sidebar').classList.toggle('open'); $('#backdrop').classList.toggle('open'); };
  $('#backdrop').onclick = () => { $('#sidebar').classList.remove('open'); $('#backdrop').classList.remove('open'); };
  $('#notif').onclick = () => toast('No tienes notificaciones nuevas');
  const un = $('#unimperson'); if (un) un.onclick = () => { S.userId = S.realUserId; buildShell(); go('dashboard'); };
  const sb = $('#search'); if (sb) { sb.value = S.patientQuery; sb.oninput = e => { S.patientQuery = e.target.value; if (S.route !== 'pacientes') go('pacientes'); else renderView(); }; }
  bindNav();
}
function bindNav() {
  $$('[data-go]').forEach(b => b.onclick = () => { go(b.dataset.go); if (window.innerWidth < 900) { $('#sidebar').classList.remove('open'); $('#backdrop').classList.remove('open'); } });
}
function setActiveNav() {
  const key = S.param ? S.route + '/' + S.param : S.route;
  $$('#nav .nav-item').forEach(b => b.classList.toggle('active', b.dataset.go === key || (S.route === 'area' && b.dataset.go === 'area/' + S.param)));
}

/* =========================================================================
   ROUTER
   ========================================================================= */
function go(r) { const [route, param] = r.split('/'); S.route = route; S.param = param || null; location.hash = r; renderView(); }
function renderView() {
  if (!S.userId) return renderLogin();
  const c = $('#content'); if (!c) { buildShell(); }
  const titles = {
    dashboard: ['Dashboard', ''], agenda: ['Agenda', 'Citas de la semana'],
    pacientes: ['Pacientes', 'Historia clínica'], paciente: ['Ficha de paciente', ''],
    informes: ['Informes', 'Repositorio clínico'], usuarios: ['Usuarios y permisos', 'Dirección'],
    auditoria: ['Auditoría RGPD', 'Registro de accesos'], area: ['Panel de área', ''],
  };
  const [t, s] = titles[S.route] || ['', ''];
  $('#page-t').textContent = t; $('#page-s').textContent = s;
  const V = {
    dashboard: viewDashboard, agenda: viewAgenda, pacientes: viewPacientes,
    paciente: viewPaciente, informes: viewInformes, area: viewArea,
    usuarios: viewUsuarios, auditoria: viewAuditoria,
  }[S.route] || viewDashboard;
  $('#content').innerHTML = `<div class="view">${V()}</div>`;
  setActiveNav();
  if (afterRender[S.route]) afterRender[S.route]();
}
const afterRender = {};
window.addEventListener('hashchange', () => { if (S.userId && location.hash) { const [r, p] = location.hash.slice(1).split('/'); if (r !== S.route || p !== S.param) { S.route = r; S.param = p || null; renderView(); } } });

/* =========================================================================
   HELPERS de vista
   ========================================================================= */
function kpi(label, val, delta, color, icon) {
  return `<div class="card kpi">
    <div class="kl"><span class="ki" style="background:${color}22;color:${color}">${svg(icon)}</span>${label}</div>
    <div class="kv">${val}</div>
    <div class="kd ${delta.dir}">${delta.txt}</div>
  </div>`;
}
function pillState(st) { const s = STATES[st]; return `<span class="pill ${s.pill}"><span class="pd" style="background:${s.dot}"></span>${s.label}</span>`; }
function areaBadge(id) { const a = areaById(id); return `<span class="tag" style="background:${a.color}1c;color:${a.color}">${a.short}</span>`; }

/* mini line chart */
function lineChart(vals, color, { w = 260, h = 70, min, max } = {}) {
  if (!vals || !vals.length) return '';
  const mn = min ?? Math.min(...vals), mx = max ?? Math.max(...vals);
  const rng = (mx - mn) || 1, pad = 6;
  const pts = vals.map((v, i) => [pad + i * (w - pad * 2) / (vals.length - 1), h - pad - (v - mn) / rng * (h - pad * 2)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = `M${pts[0][0]} ${h} ` + pts.map(p => 'L' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + `L${pts[pts.length - 1][0]} ${h} Z`;
  const id = 'g' + Math.abs(vals[0] * 97 + vals.length);
  return `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#${id})"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="#fff" stroke="${color}" stroke-width="1.6"/>`).join('')}
  </svg>`;
}

/* =========================================================================
   VISTA: DASHBOARD
   ========================================================================= */
function viewDashboard() {
  const u = me();
  if (u.role === 'area') return dashArea(u.area);
  const todays = APPTS.filter(a => a.wd === WEEK.todayIdx && a.state !== 'cancelada');
  const noshow = APPTS.filter(a => a.state === 'no_show').length;
  const pend = REPORTS.filter(r => r.state === 'borrador').length;
  const inSala = todays.filter(a => a.state === 'en_sala').length;

  const kpis = `<div class="grid g-4">
    ${kpi('Citas hoy', todays.length, { dir: 'mut', txt: `${inSala} en sala ahora` }, '#00BCD4', 'agenda')}
    ${kpi('Pacientes activos', PATIENTS.length, { dir: 'up', txt: '▲ 3 este mes' }, '#43a047', 'patient')}
    ${kpi('Informes pendientes', pend, { dir: pend ? 'down' : 'mut', txt: pend ? 'por firmar/cerrar' : 'al día' }, '#FB8C00', 'file')}
    ${kpi('No-shows (semana)', noshow, { dir: 'down', txt: 'seguimiento recepción' }, '#d94a4a', 'clock')}
  </div>`;

  // ocupación por área hoy
  const occ = AREAS.map(a => {
    const n = todays.filter(x => x.areaId === a.id).length;
    const cap = 8; const pct = Math.min(100, Math.round(n / cap * 100));
    return `<div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px">
        <span style="font-weight:600">${a.short}</span><span class="num" style="color:var(--ink-3)">${n} citas</span></div>
      <div class="bar"><span style="width:${pct}%;background:${a.color}"></span></div></div>`;
  }).join('');

  const next = todays.slice().sort((x, y) => x.start - y.start).slice(0, 7);
  const nextRows = next.length ? next.map(a => {
    const p = patientById(a.patientId), ar = areaById(a.areaId);
    return `<tr data-pac="${p.id}"><td style="width:64px" class="num cell-main">${HH(a.start)}</td>
      <td><div class="people">${av(p.name, ar.color, '28')}<div><div class="cell-main">${p.name}</div><div class="cell-sub">${a.service}</div></div></div></td>
      <td>${areaBadge(a.areaId)}</td><td>${pillState(a.state)}</td></tr>`;
  }).join('') : `<tr><td colspan="4"><div class="empty">Sin más citas hoy</div></td></tr>`;

  const pendRows = REPORTS.filter(r => r.state !== 'entregado').slice(0, 5).map(r => {
    const p = patientById(r.patientId), ar = areaById(r.areaId);
    return `<tr data-rep="${r.id}"><td><div class="cell-main">${r.title}</div><div class="cell-sub">${p.name} · ${fmtDate(r.date)}</div></td>
      <td>${areaBadge(r.areaId)}</td><td>${r.state === 'borrador' ? '<span class="pill pill-amber">Borrador</span>' : '<span class="pill pill-blue">Firmado</span>'}</td></tr>`;
  }).join('');

  afterRender.dashboard = () => {
    $$('[data-pac]').forEach(t => t.onclick = () => go('paciente/' + t.dataset.pac));
    $$('[data-rep]').forEach(t => t.onclick = () => { S.repActive = t.dataset.rep; go('informes'); });
  };

  return `
    <div class="section-h"><div><h2>Hola, ${u.name.split(' ')[0]} 👋</h2><div class="sh-s">${DAYS[WEEK.todayIdx] || 'Fin de semana'} · resumen de la clínica</div></div>
      <div class="spacer"></div><button class="btn btn-primary" id="quickAppt">${svg('plus')} Nueva cita</button></div>
    ${kpis}
    <div class="grid" style="grid-template-columns:1.1fr 1fr;margin-top:16px">
      <div class="card"><div class="card-h"><h3>Agenda de hoy</h3><a class="card-a" data-go="agenda">Ver agenda</a></div>
        <table class="table">${nextRows}</table></div>
      <div class="card card-pad"><h3 style="margin-bottom:14px">Ocupación por área · hoy</h3>${occ}</div>
    </div>
    <div class="grid" style="grid-template-columns:1.1fr 1fr;margin-top:16px">
      <div class="card"><div class="card-h"><h3>Informes por revisar</h3><a class="card-a" data-go="informes">Ver todos</a></div>
        <table class="table">${pendRows}</table></div>
      <div class="card card-pad">
        <h3 style="margin-bottom:6px">Vista de Dirección</h3>
        <p style="color:var(--ink-2);font-size:13px;margin:0 0 14px">Tienes acceso a todas las áreas, pacientes e informes. Entra como cualquier especialista para ver su panel exacto.</p>
        <div class="grid g-3">${AREAS.map(a => `<button class="btn btn-sm" data-go="area/${a.id}" style="justify-content:flex-start"><span style="width:10px;height:10px;border-radius:3px;background:${a.color}"></span>${a.short}</button>`).join('')}</div>
      </div>
    </div>`;
}

function dashArea(areaId) {
  const a = areaById(areaId), u = me();
  const todays = APPTS.filter(x => x.areaId === areaId && x.wd === WEEK.todayIdx && x.state !== 'cancelada');
  const pats = PATIENTS.filter(p => p.areas.includes(areaId));
  const reps = REPORTS.filter(r => r.areaId === areaId);
  const pend = reps.filter(r => r.state !== 'entregado').length;
  const next = todays.sort((x, y) => x.start - y.start);
  const rows = next.length ? next.map(x => { const p = patientById(x.patientId); return `<tr data-pac="${p.id}"><td class="num cell-main" style="width:60px">${HH(x.start)}</td><td><div class="people">${av(p.name, a.color, '28')}<div class="cell-main">${p.name}</div></div></td><td class="cell-sub">${x.service}</td><td>${pillState(x.state)}</td></tr>`; }).join('') : `<tr><td colspan="4"><div class="empty">No hay citas para hoy</div></td></tr>`;

  afterRender.dashboard = () => { $$('[data-pac]').forEach(t => t.onclick = () => go('paciente/' + t.dataset.pac)); };
  return `
    <div class="area-banner" style="background:linear-gradient(135deg, ${a.color}, ${a.color}cc)">
      <h2>${a.name}</h2><p>${DAYS[WEEK.todayIdx] || 'Fin de semana'} · tu resumen del día</p>
      <div class="ab-pro">${av(u.name, 'rgba(255,255,255,.25)', '34')}<div><div style="font-weight:700">${u.name}</div><div style="opacity:.85;font-size:12.5px">${a.proRole}</div></div></div>
    </div>
    <div class="grid g-4">
      ${kpi('Citas hoy', todays.length, { dir: 'mut', txt: 'en tu agenda' }, a.color, 'agenda')}
      ${kpi('Tus pacientes', pats.length, { dir: 'up', txt: 'activos' }, a.color, 'patient')}
      ${kpi('Informes por firmar', pend, { dir: pend ? 'down' : 'mut', txt: pend ? 'pendientes' : 'al día' }, a.color, 'file')}
      ${kpi('Área', a.short, { dir: 'mut', txt: a.proRole }, a.color, u.area === 'podo' ? 'foot' : 'heart')}
    </div>
    <div class="grid" style="grid-template-columns:1.2fr 1fr;margin-top:16px">
      <div class="card"><div class="card-h"><h3>Tu agenda de hoy</h3><a class="card-a" data-go="agenda">Ver completa</a></div><table class="table">${rows}</table></div>
      <div>${areaWidget(areaId)}</div>
    </div>
    <div style="margin-top:16px"><button class="btn btn-primary" data-go="area/${areaId}">${svg('chev')} Abrir panel completo de ${a.short}</button></div>`;
}

/* =========================================================================
   VISTA: AGENDA (día, columnas = profesionales)
   ========================================================================= */
function viewAgenda() {
  const scope = myArea();
  const cols = scope ? AREAS.filter(a => a.id === scope) : AREAS;
  const dayAppts = APPTS.filter(a => a.wd === S.agendaDay);
  const HOURS = []; for (let h = 9; h <= 21; h++) HOURS.push(h);
  const pxMin = 58 / 60;
  const nowMin = (new Date().getHours() - 9) * 60 + new Date().getMinutes();
  const showNow = S.agendaDay === WEEK.todayIdx && nowMin >= 0 && nowMin <= 720;

  const dayChips = DAYS.map((d, i) => `<button class="chip ${i === S.agendaDay ? 'active' : ''}" data-day="${i}">${d.slice(0, 3)}${i === WEEK.todayIdx ? ' ·hoy' : ''}</button>`).join('');

  const colHead = cols.map(a => `<div class="ag-col-h"><div class="ach-n">${a.short}</div><div class="ach-r">${a.pro.split(' ').slice(0, 2).join(' ')}</div></div>`).join('');

  const hourRows = HOURS.map(h => `<div class="ag-hour"><span class="ah-l">${String(h).padStart(2, '0')}:00</span></div>`).join('');
  const colsHtml = cols.map(a => {
    const items = dayAppts.filter(x => x.areaId === a.id).map(x => {
      const p = patientById(x.patientId);
      const top = Math.max(0, x.start) * pxMin, hgt = Math.max(24, x.dur * pxMin - 3);
      const cls = x.state === 'cancelada' ? 'cancel' : (['reservada', 'confirmada'].includes(x.state) ? 'tentative' : '');
      const bg = x.state === 'no_show' ? '#d94a4a' : a.color;
      return `<div class="appt ${cls}" data-appt="${x.id}" style="top:${top}px;height:${hgt}px;background:${bg}">
        <div class="apt-t">${HH(x.start)} · ${p.name.split(' ')[0]} ${p.name.split(' ')[1] || ''}</div>
        <div class="apt-s">${x.service}</div></div>`;
    }).join('');
    return `<div class="ag-col">${items}</div>`;
  }).join('');

  afterRender.agenda = () => {
    $$('[data-day]').forEach(b => b.onclick = () => { S.agendaDay = +b.dataset.day; renderView(); });
    $$('[data-appt]').forEach(b => b.onclick = () => openAppt(b.dataset.appt));
  };

  const legend = Object.entries(STATES).filter(([k]) => k !== 'cancelada').map(([k, v]) => `<span class="pill ${v.pill}" style="font-size:11px"><span class="pd" style="background:${v.dot}"></span>${v.label}</span>`).join('');

  return `
    <div class="section-h"><div><h2>${scope ? 'Mi agenda' : 'Agenda global'}</h2><div class="sh-s">${DAYS[S.agendaDay]} · ${cols.length} ${cols.length > 1 ? 'profesionales' : 'profesional'} · ${dayAppts.filter(x => x.state !== 'cancelada').length} citas</div></div>
      <div class="spacer"></div><button class="btn btn-primary" id="newAppt">${svg('plus')} Nueva cita</button></div>
    <div class="chips" style="margin-bottom:14px">${dayChips}</div>
    <div class="card" style="overflow:hidden">
      <div style="overflow-x:auto">
        <div style="min-width:${Math.max(640, cols.length * 150 + 56)}px">
          <div class="ag-head" style="grid-template-columns:56px repeat(${cols.length},1fr)"><div></div>${colHead}</div>
          <div class="ag-grid" style="height:${HOURS.length * 58}px">
            ${hourRows}
            <div class="ag-cols" style="grid-template-columns:repeat(${cols.length},1fr)">${colsHtml}</div>
            ${showNow ? `<div style="position:absolute;left:56px;right:0;top:${nowMin * pxMin}px;height:2px;background:#d94a4a;z-index:6"><span style="position:absolute;left:-5px;top:-4px;width:10px;height:10px;border-radius:50%;background:#d94a4a"></span></div>` : ''}
          </div>
        </div>
      </div>
    </div>
    <div class="chips" style="margin-top:14px">${legend}</div>`;
}

function openAppt(id) {
  const x = APPTS.find(a => a.id === id); const p = patientById(x.patientId); const a = areaById(x.areaId);
  const acts = {
    reservada: [['confirmada', 'Confirmar cita'], ['cancelada', 'Cancelar']],
    confirmada: [['en_sala', 'Pasar a sala'], ['no_show', 'Marcar no-show']],
    en_sala: [['atendida', 'Marcar atendida']],
    atendida: [['', 'Crear informe']], no_show: [['', 'Reprogramar']], cancelada: [['', 'Reactivar']],
  }[x.state] || [];
  openDrawer(`Cita · ${HH(x.start)}`, `
    <div class="people" style="margin-bottom:16px">${av(p.name, a.color, '44')}<div><div class="cell-main" style="font-size:15px">${p.name}</div><div class="cell-sub">${age(p.birth)} años · ${p.insurer}</div></div></div>
    <dl class="data-list" style="margin-bottom:16px">
      <dt>Servicio</dt><dd>${x.service}</dd>
      <dt>Área</dt><dd>${a.name}</dd>
      <dt>Profesional</dt><dd>${a.pro}</dd>
      <dt>Sala</dt><dd>${x.room}</dd>
      <dt>Horario</dt><dd>${HH(x.start)} – ${HH(x.start + x.dur)} (${x.dur}′)</dd>
      <dt>Estado</dt><dd>${pillState(x.state)}</dd>
    </dl>
    ${p.alerts.length ? `<div class="pill pill-red" style="margin-bottom:14px">⚠ ${p.alerts.join(' · ')}</div>` : ''}
    <div class="grid" style="gap:8px">${acts.map(([st, lbl]) => `<button class="btn ${st === 'cancelada' || st === 'no_show' ? '' : 'btn-primary'} btn-block" data-act="${st}">${lbl}</button>`).join('')}</div>
    <button class="btn btn-ghost btn-block" style="margin-top:8px" data-openpac="${p.id}">Abrir ficha del paciente</button>
  `, () => {
    $$('[data-act]').forEach(b => b.onclick = () => {
      if (b.dataset.act) { x.state = b.dataset.act; toast('Cita actualizada: ' + STATES[b.dataset.act].label); }
      else toast('Acción registrada');
      closeDrawer(); renderView();
    });
    $('[data-openpac]').onclick = () => { closeDrawer(); go('paciente/' + p.id); };
  });
}

/* =========================================================================
   VISTA: PACIENTES (lista)
   ========================================================================= */
function viewPacientes() {
  const scope = myArea();
  const q = S.patientQuery.trim().toLowerCase();
  let list = PATIENTS.filter(p => !scope || p.areas.includes(scope));
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.insurer.toLowerCase().includes(q));

  const rows = list.map(p => {
    const lastAppt = APPTS.filter(a => a.patientId === p.id).sort((x, y) => (y.date > x.date ? 1 : -1))[0];
    const areasHtml = p.areas.map(areaBadge).join(' ');
    return `<tr data-pac="${p.id}">
      <td><div class="people">${av(p.name, areaById(p.areas[0]).color, '34')}<div><div class="cell-main">${p.name}</div><div class="cell-sub">${p.email}</div></div></div></td>
      <td>${age(p.birth)} · ${p.sex}</td>
      <td>${areasHtml}</td>
      <td>${p.insurer}</td>
      <td>${p.alerts.length ? `<span class="pill pill-red">⚠ ${p.alerts[0]}</span>` : '<span class="cell-sub">—</span>'}</td>
      <td class="cell-sub">${lastAppt ? fmtDate(lastAppt.date) : '—'}</td>
    </tr>`;
  }).join('');

  afterRender.pacientes = () => { $$('[data-pac]').forEach(t => t.onclick = () => go('paciente/' + t.dataset.pac)); };
  return `
    <div class="section-h"><div><h2>${scope ? 'Mis pacientes' : 'Pacientes'}</h2><div class="sh-s">${list.length} de ${PATIENTS.length}${q ? ` · filtro “${S.patientQuery}”` : ''}</div></div>
      <div class="spacer"></div><button class="btn btn-primary" id="newPac">${svg('plus')} Nuevo paciente</button></div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Paciente</th><th>Edad</th><th>Áreas</th><th>Aseguradora</th><th>Alertas</th><th>Últ. visita</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6"><div class="empty">Sin resultados</div></td></tr>`}</tbody>
      </table>
    </div>`;
}

/* =========================================================================
   VISTA: PACIENTE 360
   ========================================================================= */
function viewPaciente() {
  const p = patientById(S.param); if (!p) return `<div class="empty">Paciente no encontrado</div>`;
  const reps = REPORTS.filter(r => r.patientId === p.id);
  const appts = APPTS.filter(a => a.patientId === p.id);

  // timeline unificado multi-área
  const events = [
    ...reps.map(r => ({ date: r.date, type: 'informe', areaId: r.areaId, title: r.title, sub: 'Informe · ' + (STATES_R[r.state] || r.state), ref: r.id })),
    ...appts.filter(a => a.state === 'atendida').slice(0, 6).map(a => ({ date: a.date, type: 'cita', areaId: a.areaId, title: a.service, sub: 'Visita atendida', ref: null })),
  ].sort((x, y) => (y.date > x.date ? 1 : -1));

  const tl = events.length ? events.map(e => {
    const a = areaById(e.areaId);
    return `<div class="tl-item" style="--c:${a.color}">
      <div class="tl-d">${fmtDate(e.date)} · ${a.short}</div>
      <div class="tl-c" ${e.ref ? `data-rep="${e.ref}" style="cursor:pointer"` : ''}>
        <div class="tl-t"><span style="width:8px;height:8px;border-radius:50%;background:${a.color}"></span>${e.title}</div>
        <div class="cell-sub" style="margin-top:2px">${e.sub}${e.ref ? ' · abrir ↗' : ''}</div>
      </div></div>`;
  }).join('') : `<div class="empty">Sin actividad registrada</div>`;

  const repRows = reps.map(r => `<tr data-rep="${r.id}"><td><div class="cell-main">${r.title}</div><div class="cell-sub">${fmtDate(r.date)}</div></td><td>${areaBadge(r.areaId)}</td><td>${repStatePill(r.state)}</td></tr>`).join('') || `<tr><td colspan="3"><div class="empty">Sin informes</div></td></tr>`;

  // widget clínico según áreas del paciente
  let clinical = '';
  if (SERIES.weight[p.id]) clinical += evoCard('Evolución de peso (nutrición)', SERIES.weight[p.id], '#43a047', 'kg');
  if (SERIES.eva[p.id]) clinical += evoCard('Dolor EVA (fisioterapia)', SERIES.eva[p.id], '#00A9C0', '/10', { min: 0, max: 10, invert: true });
  const bonos = BONOS.filter(b => b.patientId === p.id);
  if (bonos.length) clinical += `<div class="card card-pad" style="margin-top:16px"><h3 style="margin-bottom:12px">Bonos activos</h3>${bonos.map(bonoBar).join('')}</div>`;

  const tabs = ['resumen', 'informes', 'datos'];
  afterRender.paciente = () => {
    $$('[data-tab]').forEach(b => b.onclick = () => { S.patTab = b.dataset.tab; renderView(); });
    $$('[data-rep]').forEach(t => t.onclick = () => { S.repActive = t.dataset.rep; go('informes'); });
    const nc = $('#newInforme'); if (nc) nc.onclick = () => toast('Se abriría el editor de informe (demo)');
  };

  const body =
    S.patTab === 'informes'
      ? `<div class="card"><div class="card-h"><h3>Informes del paciente</h3><a class="card-a" id="newInforme">+ Nuevo</a></div><table class="table">${repRows}</table></div>`
      : S.patTab === 'datos'
        ? `<div class="card card-pad"><dl class="data-list">
            <dt>Nombre</dt><dd>${p.name}</dd><dt>Nº historia</dt><dd class="num">HC-${p.id.replace('p', '').padStart(4, '0')}</dd>
            <dt>Fecha nac.</dt><dd>${fmtDate(p.birth)} (${age(p.birth)} años)</dd><dt>Sexo</dt><dd>${p.sex === 'F' ? 'Mujer' : 'Hombre'}</dd>
            <dt>Teléfono</dt><dd>${p.phone}</dd><dt>Email</dt><dd>${p.email}</dd>
            <dt>Aseguradora</dt><dd>${p.insurer}</dd><dt>Alta</dt><dd>${p.since}</dd>
            <dt>Áreas</dt><dd>${p.areas.map(areaBadge).join(' ')}</dd>
            <dt>Alertas</dt><dd>${p.alerts.length ? p.alerts.map(x => `<span class="pill pill-red">⚠ ${x}</span>`).join(' ') : '—'}</dd>
          </dl>
          <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border-2)"><span class="pill pill-green">✓ Consentimiento RGPD firmado</span> <span class="pill pill-gray">Historia clínica · custodia digital</span></div></div>`
        : `<div class="grid" style="grid-template-columns:1.3fr 1fr">
            <div class="card card-pad"><h3 style="margin-bottom:16px">Historia unificada · todas las áreas</h3><div class="timeline">${tl}</div></div>
            <div>${clinical || '<div class="card card-pad"><div class="empty">Sin series clínicas para graficar</div></div>'}</div>
          </div>`;

  return `
    <div style="margin-bottom:16px"><button class="btn btn-sm btn-ghost" data-go="pacientes">${svg('chev', '')}&nbsp;Volver a pacientes</button></div>
    <div class="card card-pad" style="margin-bottom:18px">
      <div class="p-head">
        ${av(p.name, areaById(p.areas[0]).color, '56')}
        <div class="p-meta">
          <h2>${p.name} ${p.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</h2>
          <div class="cell-sub" style="margin:4px 0 12px">HC-${p.id.replace('p', '').padStart(4, '0')} · ${age(p.birth)} años · ${p.sex === 'F' ? 'Mujer' : 'Hombre'} · ${p.insurer}</div>
          <div class="row" style="flex-wrap:wrap;gap:8px">
            <span class="pill pill-gray">📞 ${p.phone}</span><span class="pill pill-gray">✉ ${p.email}</span>
            ${p.areas.map(areaBadge).join(' ')}
            ${p.alerts.map(x => `<span class="pill pill-red">⚠ ${x}</span>`).join(' ')}
          </div>
        </div>
        <div class="row"><button class="btn" id="msgPac">Enviar informe</button><button class="btn btn-primary" data-go="agenda">Nueva cita</button></div>
      </div>
    </div>
    <div class="tabs">${tabs.map(t => `<button class="tab ${S.patTab === t ? 'active' : ''}" data-tab="${t}">${{ resumen: 'Resumen 360', informes: 'Informes', datos: 'Datos y RGPD' }[t]}</button>`).join('')}</div>
    ${body}`;
}
const STATES_R = { borrador: 'Borrador', firmado: 'Firmado', entregado: 'Entregado al paciente' };
function repStatePill(st) { return st === 'borrador' ? '<span class="pill pill-amber">Borrador</span>' : st === 'firmado' ? '<span class="pill pill-blue">Firmado</span>' : '<span class="pill pill-green">Entregado</span>'; }

function evoCard(title, vals, color, unit, opts = {}) {
  const first = vals[0], last = vals[vals.length - 1], diff = (last - first).toFixed(1);
  const good = opts.invert ? diff < 0 : diff < 0; // menos peso / menos dolor = bien
  return `<div class="card card-pad" style="margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
      <h3 style="font-size:13.5px">${title}</h3>
      <span class="num" style="font-size:13px;color:${good ? 'var(--green)' : 'var(--ink-2)'};font-weight:700">${last}${unit} <small style="color:var(--ink-3)">(${diff > 0 ? '+' : ''}${diff})</small></span>
    </div>
    ${lineChart(vals, color, opts.min !== undefined ? { min: opts.min, max: opts.max } : {})}
    <div class="cell-sub" style="margin-top:6px">De ${first}${unit} a ${last}${unit} en ${vals.length} registros</div>
  </div>`;
}
function bonoBar(b) {
  const pct = Math.round(b.usadas / b.total * 100), left = b.total - b.usadas;
  const a = areaById(b.area);
  return `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px"><span style="font-weight:600">${b.tipo}</span><span class="num" style="color:${left ? 'var(--ink-2)' : 'var(--red)'}">${b.usadas}/${b.total}</span></div><div class="bar"><span style="width:${pct}%;background:${left ? a.color : '#d94a4a'}"></span></div><div class="cell-sub" style="margin-top:3px">${left ? left + ' sesiones restantes' : 'Bono agotado · renovar'}</div></div>`;
}

/* =========================================================================
   VISTA: INFORMES (repositorio + visor "hoja de papel")
   ========================================================================= */
function viewInformes() {
  const scope = myArea();
  let list = REPORTS.filter(r => !scope || r.areaId === scope);
  if (S.repArea !== 'all') list = list.filter(r => r.areaId === S.repArea);
  if (S.repState !== 'all') list = list.filter(r => r.state === S.repState);
  list = list.sort((x, y) => (y.date > x.date ? 1 : -1));
  if (!list.find(r => r.id === S.repActive)) S.repActive = list[0] ? list[0].id : null;

  const areaChips = scope ? '' : `<div class="chips" style="margin-bottom:10px">
    <button class="chip ${S.repArea === 'all' ? 'active' : ''}" data-area="all">Todas</button>
    ${AREAS.map(a => `<button class="chip ${S.repArea === a.id ? 'active' : ''}" data-area="${a.id}"><span class="cc" style="background:${a.color}"></span>${a.short}</button>`).join('')}</div>`;
  const stateChips = `<div class="chips" style="margin-bottom:12px">
    ${['all', 'borrador', 'firmado', 'entregado'].map(s => `<button class="chip ${S.repState === s ? 'active' : ''}" data-state="${s}">${s === 'all' ? 'Todos' : STATES_R[s]}</button>`).join('')}</div>`;

  const items = list.map(r => {
    const p = patientById(r.patientId), a = areaById(r.areaId);
    return `<div class="rep-item ${r.id === S.repActive ? 'active' : ''}" data-rep="${r.id}" style="border-left-color:${r.id === S.repActive ? a.color : 'transparent'}">
      <div class="ri-t">${r.title}</div>
      <div class="ri-s"><span>${p.name}</span><span>${fmtDate(r.date)}</span></div>
      <div style="margin-top:6px;display:flex;gap:6px">${areaBadge(r.areaId)}${repStatePill(r.state)}</div>
    </div>`;
  }).join('') || `<div class="empty">Sin informes</div>`;

  afterRender.informes = () => {
    $$('[data-area]').forEach(b => b.onclick = () => { S.repArea = b.dataset.area; renderView(); });
    $$('[data-state]').forEach(b => b.onclick = () => { S.repState = b.dataset.state; renderView(); });
    $$('[data-rep]').forEach(b => b.onclick = () => { S.repActive = b.dataset.rep; renderView(); });
    const sg = $('#signRep'); if (sg) sg.onclick = () => { const r = reportById(S.repActive); r.state = r.state === 'borrador' ? 'firmado' : 'entregado'; toast('Informe ' + (r.state === 'firmado' ? 'firmado' : 'entregado al paciente')); renderView(); };
    const dl = $('#dlRep'); if (dl) dl.onclick = () => toast('Se generaría el PDF del informe (demo)');
  };

  return `
    <div class="section-h"><div><h2>${scope ? 'Mis informes' : 'Repositorio de informes'}</h2><div class="sh-s">${list.length} informes${scope ? '' : ' · todas las áreas'}</div></div>
      <div class="spacer"></div><button class="btn btn-primary" id="newRep2">${svg('plus')} Nuevo informe</button></div>
    ${areaChips}${stateChips}
    <div class="report-layout">
      <div class="card report-list">${items}</div>
      <div>${S.repActive ? renderPaper(reportById(S.repActive)) : '<div class="empty">Selecciona un informe</div>'}</div>
    </div>`;
}

function renderPaper(r) {
  const p = patientById(r.patientId), a = areaById(r.areaId);
  if (r.confidential && !canSeeConfidential()) {
    return `<div class="paper"><div class="doc-head"><div><h1 class="doc-t">Informe confidencial</h1><div class="doc-sub">${a.name}</div></div><img src="assets/logo.jpg" /></div>
      <div class="locked">${svg('shield')}<div style="margin-top:8px;font-weight:600;color:var(--ink-2)">Contenido restringido</div><div style="max-width:34ch">Solo la profesional del área de psicología y la Dirección pueden ver el contenido de este informe (RGPD · datos de salud especialmente protegidos).</div></div></div>`;
  }
  const canSign = r.state !== 'entregado';
  return `<div class="paper">
    <div class="doc-head">
      <div><h1 class="doc-t">${r.title}</h1><div class="doc-sub">${CLINIC.name} · ${a.name}</div></div>
      <img src="assets/logo.jpg" alt="" />
    </div>
    <div class="doc-grid">
      <div><span>Paciente</span><br><b>${p.name}</b></div>
      <div><span>Nº historia</span><br><b class="num">HC-${p.id.replace('p', '').padStart(4, '0')}</b></div>
      <div><span>Fecha</span><br><b>${fmtDate(r.date)}</b></div>
      <div><span>Profesional</span><br><b>${a.pro}</b></div>
    </div>
    <h4 class="doc-sec">Motivo de consulta</h4><p class="doc-p">${r.reason}</p>
    <h4 class="doc-sec">Exploración / valoración</h4><p class="doc-p">${r.exploration}</p>
    <h4 class="doc-sec">Diagnóstico / impresión</h4><p class="doc-p">${r.diagnosis}</p>
    <h4 class="doc-sec">Plan / recomendaciones</h4><p class="doc-p">${r.plan}</p>
    <div class="doc-sign">
      <div>${repStatePill(r.state)}</div>
      <div class="sign-line" style="text-align:right">${a.pro}<br><span style="color:var(--ink-3);font-size:11px">${a.proRole}</span></div>
    </div>
    <div style="display:flex;gap:10px;margin-top:24px;padding-top:18px;border-top:1px solid var(--border-2)">
      ${canSign ? `<button class="btn btn-primary" id="signRep">${r.state === 'borrador' ? 'Firmar informe' : 'Entregar al paciente'}</button>` : '<span class="pill pill-green">✓ Entregado al paciente</span>'}
      <button class="btn" id="dlRep">Descargar PDF</button>
    </div>
  </div>`;
}

/* =========================================================================
   VISTA: PANEL DE ÁREA
   ========================================================================= */
function viewArea() {
  const a = areaById(S.param); if (!a) return `<div class="empty">Área no encontrada</div>`;
  const todays = APPTS.filter(x => x.areaId === a.id && x.wd === S.agendaDay);
  const pats = PATIENTS.filter(p => p.areas.includes(a.id));
  const reps = REPORTS.filter(r => r.areaId === a.id);
  const pend = reps.filter(r => r.state !== 'entregado').length;

  const apptRows = todays.sort((x, y) => x.start - y.start).map(x => { const p = patientById(x.patientId); return `<tr data-pac="${p.id}"><td class="num cell-main" style="width:56px">${HH(x.start)}</td><td><div class="people">${av(p.name, a.color, '28')}<span class="cell-main">${p.name}</span></div></td><td class="cell-sub">${x.service}</td><td>${pillState(x.state)}</td></tr>`; }).join('') || `<tr><td colspan="4"><div class="empty">Sin citas este día</div></td></tr>`;
  const patRows = pats.map(p => `<tr data-pac="${p.id}"><td><div class="people">${av(p.name, a.color, '28')}<div><div class="cell-main">${p.name}</div><div class="cell-sub">${age(p.birth)} años · ${p.insurer}</div></div></div></td><td>${p.alerts.length ? `<span class="pill pill-red">⚠</span>` : ''}</td></tr>`).join('');
  const repRows = reps.map(r => { const p = patientById(r.patientId); return `<tr data-rep="${r.id}"><td><div class="cell-main">${r.title}</div><div class="cell-sub">${p.name} · ${fmtDate(r.date)}</div></td><td>${repStatePill(r.state)}</td></tr>`; }).join('') || `<tr><td colspan="2"><div class="empty">Sin informes</div></td></tr>`;

  afterRender.area = () => {
    $$('[data-pac]').forEach(t => t.onclick = () => go('paciente/' + t.dataset.pac));
    $$('[data-rep]').forEach(t => t.onclick = () => { S.repActive = t.dataset.rep; go('informes'); });
    $$('[data-day]').forEach(b => b.onclick = () => { S.agendaDay = +b.dataset.day; renderView(); });
    const vc = $('#verComo'); if (vc) vc.onclick = () => { const u = USERS.find(x => x.area === a.id); if (u) { S.userId = u.id; buildShell(); go('dashboard'); toast('Viendo como ' + u.name); } };
    bindNav();
  };

  const dayChips = DAYS.map((d, i) => `<button class="chip ${i === S.agendaDay ? 'active' : ''}" data-day="${i}">${d.slice(0, 3)}</button>`).join('');
  const isGer = me().role === 'gerencia';

  return `
    <div class="area-banner" style="background:linear-gradient(135deg, ${a.color}, ${a.color}bb)">
      <h2>${a.name}</h2><p>${a.proRole}</p>
      <div class="ab-pro">${av(a.pro, 'rgba(255,255,255,.22)', '34')}<div><div style="font-weight:700">${a.pro}</div><div style="opacity:.85;font-size:12.5px">Profesional de referencia</div></div>
        ${isGer ? `<button class="btn btn-sm" id="verComo" style="margin-left:auto;background:rgba(255,255,255,.9)">${svg('eye')} Ver como ${a.pro.split(' ')[0]}</button>` : ''}</div>
    </div>
    <div class="grid g-4">
      ${kpi('Citas ' + DAYS[S.agendaDay].toLowerCase(), todays.filter(x => x.state !== 'cancelada').length, { dir: 'mut', txt: 'en agenda' }, a.color, 'agenda')}
      ${kpi('Pacientes del área', pats.length, { dir: 'up', txt: 'activos' }, a.color, 'patient')}
      ${kpi('Informes', reps.length, { dir: 'mut', txt: pend + ' por cerrar' }, a.color, 'file')}
      ${kpi('Especialista', a.pro.split(' ')[0], { dir: 'mut', txt: a.short }, a.color, 'shield')}
    </div>
    <div class="chips" style="margin:16px 0 4px">${dayChips}</div>
    <div class="grid" style="grid-template-columns:1.25fr 1fr;margin-top:12px">
      <div class="card"><div class="card-h"><h3>Agenda · ${DAYS[S.agendaDay]}</h3><a class="card-a" data-go="agenda">Ver semana</a></div><table class="table">${apptRows}</table></div>
      <div>${areaWidget(a.id)}</div>
    </div>
    <div class="grid g-2" style="margin-top:16px">
      <div class="card"><div class="card-h"><h3>Pacientes del área</h3><a class="card-a" data-go="pacientes">Ver todos</a></div><table class="table"><tbody>${patRows}</tbody></table></div>
      <div class="card"><div class="card-h"><h3>Informes del área</h3><a class="card-a" data-go="informes">Abrir repositorio</a></div><table class="table"><tbody>${repRows}</tbody></table></div>
    </div>`;
}

/* widget diferenciador por área */
function areaWidget(id) {
  const a = areaById(id);
  if (id === 'fisio') {
    const b = BONOS.filter(x => x.area === 'fisio');
    return `<div class="card card-pad"><h3 style="margin-bottom:6px">Evolución del dolor (EVA)</h3><div class="cell-sub" style="margin-bottom:8px">Media de pacientes en tratamiento activo</div>
      ${lineChart(SERIES.eva.p02, a.color, { min: 0, max: 10 })}
      <div class="eva-scale" style="margin-top:12px"><span style="background:#2fa96b"></span><span style="background:#8bc34a"></span><span style="background:#ffd54f"></span><span style="background:#ff9800"></span><span style="background:#d94a4a"></span></div>
      <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink-3);margin-top:4px"><span>0 · sin dolor</span><span>10 · máximo</span></div>
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border-2)"><h3 style="font-size:13px;margin-bottom:10px">Bonos de sesiones</h3>${b.map(bonoBar).join('')}</div></div>`;
  }
  if (id === 'podo') {
    return `<div class="card card-pad"><h3 style="margin-bottom:12px">Estudio de la pisada</h3>
      <div style="display:flex;gap:14px;justify-content:center;align-items:flex-end;padding:8px 0 4px">
        ${['Izq.', 'Der.'].map((s, k) => `<div style="text-align:center">
          <svg width="70" height="130" viewBox="0 0 70 130">
            <path d="M35 6c14 0 20 16 20 34 0 14-4 22-4 34 0 16 6 20 6 34 0 10-8 16-22 16S13 122 13 112c0-14 6-18 6-34 0-12-4-20-4-34C15 22 21 6 35 6Z" fill="${a.color}18" stroke="${a.color}" stroke-width="1.5"/>
            <circle cx="${28 + k * 6}" cy="34" r="${9 - k * 2}" fill="#d94a4a" opacity=".7"/>
            <circle cx="30" cy="96" r="7" fill="#ff9800" opacity=".6"/>
          </svg><div class="cell-sub" style="margin-top:4px">${s}</div></div>`).join('')}
      </div>
      <div class="cell-sub" style="text-align:center">Mapa de presiones · zonas de sobrecarga en antepié</div>
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-2)">
        <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:8px"><span style="font-weight:600">Plantillas encargadas (Podoactiva)</span></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill pill-amber">2 en fabricación</span><span class="pill pill-green">3 entregadas</span><span class="pill pill-blue">1 revisión</span></div></div></div>`;
  }
  if (id === 'nutri') {
    return `<div class="card card-pad"><h3 style="margin-bottom:6px">Evolución de peso · pacientes</h3><div class="cell-sub" style="margin-bottom:8px">Carmen A. · seguimiento</div>
      ${lineChart(SERIES.weight.p01, a.color)}
      <div class="grid g-3" style="margin-top:14px">
        <div><div class="cell-sub">Peso</div><div class="num" style="font-weight:700;font-size:16px">76,1 kg</div></div>
        <div><div class="cell-sub">IMC</div><div class="num" style="font-weight:700;font-size:16px">25,4</div></div>
        <div><div class="cell-sub">% graso</div><div class="num" style="font-weight:700;font-size:16px">30,1</div></div>
      </div>
      <div style="margin-top:12px"><span class="pill pill-green">▼ 5,9 kg desde el inicio</span> <span class="pill pill-gray">Bioimpedancia</span></div></div>`;
  }
  if (id === 'psico') {
    return `<div class="card card-pad"><h3 style="margin-bottom:12px">Notas de sesión</h3>
      ${canSeeConfidential()
        ? `<div style="border:1px solid var(--border);border-radius:10px;padding:14px"><div class="cell-sub" style="margin-bottom:6px">Última sesión · confidencial</div><p style="font-size:13px;margin:0;color:var(--ink-2)">Buena evolución del proceso. Se trabajan estrategias de regulación emocional. Continuidad quincenal.</p></div>
           <div style="margin-top:10px"><span class="pill pill-violet">🔒 Acceso: psicología + dirección</span></div>`
        : `<div class="locked">${svg('shield')}<div style="margin-top:8px;font-weight:600">Notas confidenciales</div><div style="max-width:30ch">Datos de salud especialmente protegidos. Acceso restringido.</div></div>`}
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-2)"><div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="font-weight:600">Sesiones registradas</span><span class="num">18</span></div></div></div>`;
  }
  if (id === 'homeo') {
    return `<div class="card card-pad"><h3 style="margin-bottom:12px">Prescripciones activas</h3>
      ${[['Roberto Molina', 'Deshabituación tabáquica', 'blue'], ['Fernando Salas', 'Tratamiento individualizado', 'green'], ['Enrique Vidal', 'Revisión trimestral', 'amber']].map(([n, t, c]) => `<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border-2)"><div><div class="cell-main">${n}</div><div class="cell-sub">${t}</div></div><span class="pill pill-${c}">Activa</span></div>`).join('')}
      <div style="margin-top:12px"><span class="pill pill-gray">Historia clínica médica</span></div></div>`;
  }
  if (id === 'estetica') {
    const b = BONOS.filter(x => x.area === 'estetica');
    return `<div class="card card-pad"><h3 style="margin-bottom:10px">Galería antes / después</h3>
      <div class="beforeafter">
        <div class="ba-img" style="background:linear-gradient(135deg,#f8bbd0,#f48fb1)"><span class="ba-l">Antes</span></div>
        <div class="ba-img" style="background:linear-gradient(135deg,#f48fb1,#ec407a)"><span class="ba-l">Después · 8 sesiones</span></div>
      </div>
      <div style="margin-top:10px"><span class="pill pill-green">✓ Consentimiento de imagen firmado</span></div>
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border-2)"><h3 style="font-size:13px;margin-bottom:10px">Bonos de tratamiento</h3>${b.map(bonoBar).join('')}</div></div>`;
  }
  return '';
}

/* =========================================================================
   VISTA: USUARIOS Y PERMISOS (god-view)
   ========================================================================= */
function viewUsuarios() {
  const rows = USERS.map(u => `<tr>
    <td><div class="people">${av(u.name, u.color, '34')}<div><div class="cell-main">${u.name}</div><div class="cell-sub">${u.title}</div></div></div></td>
    <td>${u.role === 'gerencia' ? '<span class="pill pill-brand">Dirección</span>' : u.role === 'recepcion' ? '<span class="pill pill-gray">Recepción</span>' : areaBadge(u.area)}</td>
    <td><span class="pill pill-green"><span class="pd" style="background:#2fa96b"></span>Activo</span></td>
    <td>${u.role === 'area' ? `<button class="btn btn-sm" data-vercomo="${u.id}">${svg('eye')} Ver como</button>` : '<span class="cell-sub">—</span>'}</td>
  </tr>`).join('');

  const mtx = `<table class="table matrix">
    <thead><tr><th>Rol</th>${PERMS.cols.map(c => `<th style="font-size:10px">${c}</th>`).join('')}</tr></thead>
    <tbody>${PERMS.rows.map(r => `<tr><td class="cell-main">${r.role}</td>${r.v.map(v => `<td>${v === 1 ? '<span class="yes">●</span>' : v === 'own' ? '<span class="pill pill-gray" style="font-size:10px">propias</span>' : '<span class="no">○</span>'}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>`;

  afterRender.usuarios = () => { $$('[data-vercomo]').forEach(b => b.onclick = () => { const u = userById(b.dataset.vercomo); S.userId = u.id; buildShell(); go('dashboard'); toast('Viendo como ' + u.name); }); };
  return `
    <div class="section-h"><div><h2>Usuarios y permisos</h2><div class="sh-s">${USERS.length} usuarios · control de acceso por rol</div></div>
      <div class="spacer"></div><button class="btn btn-primary" onclick="toast('Se abriría el alta de usuario (demo)')">${svg('plus')} Añadir usuario</button></div>
    <div class="card" style="margin-bottom:18px"><table class="table"><thead><tr><th>Usuario</th><th>Rol / área</th><th>Estado</th><th>Impersonar</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="card"><div class="card-h">${svg('shield')}<h3>Matriz de permisos</h3><span class="cell-sub" style="margin-left:auto">● acceso · ○ sin acceso</span></div><div style="padding:6px 10px 14px;overflow-x:auto">${mtx}</div></div>`;
}

/* =========================================================================
   VISTA: AUDITORÍA RGPD (god-view)
   ========================================================================= */
function viewAuditoria() {
  const rows = AUDIT.map(e => `<tr>
    <td class="cell-sub" style="white-space:nowrap">${e.ts}</td>
    <td class="cell-main">${e.user}</td>
    <td>${e.action}</td>
    <td class="cell-sub">${e.target}</td>
    <td>${e.area ? areaBadge(e.area) : '<span class="tag">Global</span>'}</td>
  </tr>`).join('');
  return `
    <div class="section-h"><div><h2>Auditoría RGPD</h2><div class="sh-s">Registro de accesos a la historia clínica · trazabilidad</div></div>
      <div class="spacer"></div><button class="btn" onclick="toast('Se exportaría el registro (demo)')">Exportar registro</button></div>
    <div class="grid g-3" style="margin-bottom:18px">
      ${kpi('Accesos hoy', '47', { dir: 'mut', txt: 'a historias clínicas' }, '#3F51B5', 'eye')}
      ${kpi('Consentimientos', '100%', { dir: 'up', txt: 'firmados' }, '#2fa96b', 'shield')}
      ${kpi('Incidencias', '0', { dir: 'mut', txt: 'sin accesos indebidos' }, '#00BCD4', 'clock')}
    </div>
    <div class="card"><div class="card-h">${svg('shield')}<h3>Últimos eventos</h3></div>
      <table class="table"><thead><tr><th>Cuándo</th><th>Usuario</th><th>Acción</th><th>Sobre</th><th>Área</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="card card-pad" style="margin-top:16px;display:flex;gap:14px;align-items:center">
      <span style="width:40px;height:40px;border-radius:10px;background:#2fa96b22;color:#2fa96b;display:grid;place-items:center">${svg('shield')}</span>
      <div><div class="cell-main">Custodia de historia clínica conforme a RGPD y LOPD sanitaria</div><div class="cell-sub">Cada acceso queda registrado con usuario, fecha y hora. La Dirección puede auditar quién ha visto cada historia.</div></div>
    </div>`;
}

/* =========================================================================
   DRAWER
   ========================================================================= */
function openDrawer(title, body, after) {
  const root = $('#drawer-root');
  root.innerHTML = `<div class="overlay" id="ov"></div>
    <div class="drawer" id="dw"><div class="drawer-h"><span class="dh-t">${title}</span><button class="dh-x" id="dwx">✕</button></div><div class="drawer-b">${body}</div></div>`;
  requestAnimationFrame(() => { $('#ov').classList.add('open'); $('#dw').classList.add('open'); });
  $('#ov').onclick = closeDrawer; $('#dwx').onclick = closeDrawer;
  if (after) after();
}
function closeDrawer() { const ov = $('#ov'), dw = $('#dw'); if (!dw) return; ov.classList.remove('open'); dw.classList.remove('open'); setTimeout(() => $('#drawer-root').innerHTML = '', 260); }

/* boot */
renderLogin();
