/* =========================================================================
   Clínica del Parque · datos semilla del mockup
   - Equipo/áreas: datos REALES del scrape de clinicadelparque.es
   - Pacientes, citas e informes: INVENTADOS (demo). Ningún dato real de paciente.
   ========================================================================= */

const CLINIC = {
  name: 'Clínica del Parque',
  tagline: 'Salud y bienestar · junto a Arturo Soria Plaza',
  address: 'C/ Gregorio Benítez 16, 1ºA · 28043 Madrid',
  phone: '918 05 27 31',
  email: 'clinicadelparque.es@gmail.com',
  hours: 'L a V · 09:00–21:00',
};

/* Áreas reales + profesional de referencia (del scrape) */
const AREAS = [
  { id:'fisio',    name:'Fisioterapia y Osteopatía', short:'Fisioterapia', color:'#00A9C0', pro:'Verónica Barrios',              proRole:'Fisioterapeuta · Osteópata' },
  { id:'podo',     name:'Podología y Biomecánica',   short:'Podología',    color:'#12b3a6', pro:'Andrea Cardenal Gómez',         proRole:'Podóloga · Biomecánica del pie' },
  { id:'nutri',    name:'Nutrición y Dietética',     short:'Nutrición',    color:'#43a047', pro:'Esther Segorbe',                proRole:'Nutricionista-Dietista' },
  { id:'psico',    name:'Psicología',                short:'Psicología',   color:'#7E57C2', pro:'Lola Gómez Gutiérrez',          proRole:'Psicóloga Sanitaria' },
  { id:'homeo',    name:'Homeopatía y Medicina',     short:'Homeopatía',   color:'#FB8C00', pro:'Dr. Luis De la Serna',          proRole:'Médico · Homeopatía' },
  { id:'estetica', name:'Medicina y Clínica Estética',short:'Estética',    color:'#EC407A', pro:'Dr. Fernando Silván',           proRole:'Med. estética · Esteticista (Yurbin del Valle)' },
];
const areaById = id => AREAS.find(a => a.id === id);

const ROOMS = ['Box 1', 'Box 2', 'Box 3', 'Sala pisada', 'Gabinete estética', 'Consulta 1'];

/* Usuarios / roles del portal (login) */
const USERS = [
  { id:'gerencia',  role:'gerencia',  name:'Diego Sánchez Uguina', title:'Dirección · Gerencia', color:'#2B354B', area:null,       godview:true },
  { id:'recepcion', role:'recepcion', name:'Marta Ledesma',         title:'Recepción · Atención al paciente', color:'#607D8B', area:null },
  { id:'fisio',     role:'area', name:'Verónica Barrios',      title:'Fisioterapeuta · Osteópata', color:'#00A9C0', area:'fisio' },
  { id:'podo',      role:'area', name:'Andrea Cardenal Gómez', title:'Podóloga',                   color:'#12b3a6', area:'podo' },
  { id:'nutri',     role:'area', name:'Esther Segorbe',        title:'Nutricionista',              color:'#43a047', area:'nutri' },
  { id:'psico',     role:'area', name:'Lola Gómez Gutiérrez',  title:'Psicóloga',                  color:'#7E57C2', area:'psico' },
  { id:'homeo',     role:'area', name:'Dr. Luis De la Serna',  title:'Médico · Homeopatía',        color:'#FB8C00', area:'homeo' },
  { id:'estetica',  role:'area', name:'Dr. Fernando Silván',   title:'Medicina estética',          color:'#EC407A', area:'estetica' },
];
const userById = id => USERS.find(u => u.id === id);

/* Pacientes (INVENTADOS) — algunos multi-área para la vista 360 */
const PATIENTS = [
  { id:'p01', name:'Carmen Aguirre Ndong', sex:'F', birth:'1978-04-12', phone:'699 214 553', email:'carmen.aguirre@email.com', insurer:'Adeslas',  areas:['fisio','podo','nutri'], since:'2022-03', alerts:['Alergia AINE'], tags:['Recurrente'] },
  { id:'p02', name:'Javier Ortega Ruiz',    sex:'M', birth:'1990-11-02', phone:'645 902 118', email:'j.ortega@email.com',        insurer:'Privado',  areas:['fisio'],                since:'2024-01', alerts:[], tags:['Deportista'] },
  { id:'p03', name:'Lucía Fernández Sanz',  sex:'F', birth:'1985-06-25', phone:'678 331 204', email:'lucia.fsanz@email.com',     insurer:'Sanitas',  areas:['nutri','estetica'],     since:'2023-09', alerts:[], tags:[] },
  { id:'p04', name:'Miguel Ángel Prieto',   sex:'M', birth:'1966-02-18', phone:'610 887 442', email:'ma.prieto@email.com',       insurer:'DKV',      areas:['podo','fisio'],         since:'2021-11', alerts:['Diabético tipo 2'], tags:['Riesgo pie'] },
  { id:'p05', name:'Ana Belén Cortés',      sex:'F', birth:'1994-09-30', phone:'688 015 776', email:'ab.cortes@email.com',       insurer:'Privado',  areas:['psico'],                since:'2025-02', alerts:[], tags:['Confidencial'] },
  { id:'p06', name:'Roberto Molina Vega',   sex:'M', birth:'1972-12-08', phone:'655 447 900', email:'r.molina@email.com',        insurer:'Asisa',    areas:['homeo','nutri'],        since:'2023-04', alerts:[], tags:[] },
  { id:'p07', name:'Sofía Ramírez Luján',   sex:'F', birth:'2001-07-14', phone:'699 778 231', email:'sofia.rl@email.com',        insurer:'Privado',  areas:['fisio','psico'],        since:'2024-10', alerts:[], tags:['Deportista'] },
  { id:'p08', name:'Enrique Vidal Poch',    sex:'M', birth:'1958-03-21', phone:'620 114 583', email:'e.vidal@email.com',         insurer:'Adeslas',  areas:['podo','homeo'],         since:'2020-06', alerts:['Anticoagulado'], tags:['Mayor'] },
  { id:'p08b',name:'Marta Ruiz de la Peña', sex:'F', birth:'1988-01-19', phone:'677 203 918', email:'marta.rp@email.com',        insurer:'Privado',  areas:['estetica'],             since:'2025-05', alerts:[], tags:['Nuevo'] },
  { id:'p09', name:'Pablo Herrera Gil',     sex:'M', birth:'1983-08-05', phone:'633 550 227', email:'p.herrera@email.com',       insurer:'Sanitas',  areas:['fisio'],                since:'2024-03', alerts:[], tags:[] },
  { id:'p10', name:'Isabel Nogueira Faro',  sex:'F', birth:'1975-05-11', phone:'699 630 145', email:'i.nogueira@email.com',      insurer:'Privado',  areas:['nutri','fisio','estetica'], since:'2022-07', alerts:[], tags:['VIP'] },
  { id:'p11', name:'David Cuenca Rivas',    sex:'M', birth:'1997-10-27', phone:'688 902 310', email:'d.cuenca@email.com',        insurer:'Privado',  areas:['podo'],                 since:'2025-01', alerts:[], tags:['Deportista'] },
  { id:'p12', name:'Nerea Iglesias Roldán', sex:'F', birth:'1992-02-03', phone:'610 448 771', email:'nerea.ir@email.com',        insurer:'DKV',      areas:['psico','nutri'],        since:'2024-06', alerts:[], tags:['Confidencial'] },
  { id:'p13', name:'Fernando Salas Ibáñez', sex:'M', birth:'1969-11-16', phone:'655 128 490', email:'f.salas@email.com',         insurer:'Asisa',    areas:['homeo'],                since:'2023-12', alerts:[], tags:[] },
  { id:'p14', name:'Claudia Bravo Antón',   sex:'F', birth:'2004-04-09', phone:'699 007 332', email:'c.bravo@email.com',         insurer:'Privado',  areas:['fisio','podo'],         since:'2025-03', alerts:[], tags:['Deportista'] },
  { id:'p15', name:'Gonzalo Peña Marbán',   sex:'M', birth:'1980-06-30', phone:'620 774 118', email:'g.pena@email.com',          insurer:'Adeslas',  areas:['fisio','homeo'],        since:'2021-09', alerts:[], tags:[] },
];
const patientById = id => PATIENTS.find(p => p.id === id);
const age = birth => { const d=new Date(birth); const t=new Date(); let a=t.getFullYear()-d.getFullYear(); if(t.getMonth()<d.getMonth()||(t.getMonth()===d.getMonth()&&t.getDate()<d.getDate()))a--; return a; };

/* Series clínicas por paciente (para gráficas de evolución) */
const SERIES = {
  // nutrición: peso (kg)
  weight: { p01:[82,80.5,79,77.8,76.9,76.1], p03:[68,66.5,65.2,64.4,63.8,63.1], p10:[71,70.1,69.4,68.9,68.2,67.8], p06:[95,93,91.5,90.2,89.1] },
  // fisio: EVA dolor (0-10) por sesión
  eva:    { p01:[7,6,5,4,3,2], p02:[8,6,5,3,2,1], p04:[6,5,5,4,3], p07:[5,4,3,2], p09:[7,6,4,3,3] },
};

/* Bonos de sesiones activos (fisio/estética) */
const BONOS = [
  { patientId:'p02', area:'fisio', total:10, usadas:7, tipo:'Bono 10 sesiones fisioterapia' },
  { patientId:'p01', area:'fisio', total:5,  usadas:5, tipo:'Bono 5 sesiones INDIBA' },
  { patientId:'p07', area:'fisio', total:10, usadas:3, tipo:'Bono 10 sesiones + NESA' },
  { patientId:'p03', area:'estetica', total:5, usadas:2, tipo:'Bono 5 radiofrecuencia facial' },
  { patientId:'p10', area:'estetica', total:8, usadas:6, tipo:'Bono 8 tratamiento facial' },
];

/* ---------- Citas: se generan para la semana actual ---------- */
const SERVICES = {
  fisio:   ['Sesión fisioterapia','Punción seca','INDIBA','NESA neuromodulación','Osteopatía','Rehab. hombro'],
  podo:    ['Quiropodia','Estudio de la pisada','Revisión plantillas','Ortesis de silicona'],
  nutri:   ['Consulta nutrición','Revisión + bioimpedancia','Primera visita'],
  psico:   ['Terapia individual','Primera consulta','Terapia (menor)'],
  homeo:   ['Consulta homeopatía','Revisión','Deshabituación tabáquica'],
  estetica:['Tratamiento facial','Valoración estética','Radiofrecuencia','Peeling médico'],
};
const STATES = {
  reservada:  { label:'Reservada',  pill:'pill-gray',   dot:'#8b95a9' },
  confirmada: { label:'Confirmada', pill:'pill-blue',   dot:'#2f7fd9' },
  en_sala:    { label:'En sala',    pill:'pill-brand',  dot:'#00A9C0' },
  atendida:   { label:'Atendida',   pill:'pill-green',  dot:'#2fa96b' },
  no_show:    { label:'No-show',    pill:'pill-red',    dot:'#d94a4a' },
  cancelada:  { label:'Cancelada',  pill:'pill-gray',   dot:'#c2cad8' },
};

// pool de citas por área: [patientId, startMin(desde 09:00), dur, servicioIdx, estado]
// weekday: 0=Lun ... 4=Vie. Se replica con variaciones por día.
function buildWeek() {
  const monday = (() => { const d=new Date(); const day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); d.setHours(0,0,0,0); return d; })();
  const todayIdx = (new Date().getDay()+6)%7; // 0..6
  const iso = d => d.toISOString().slice(0,10);
  const appts = [];
  let uid = 0;
  // plantilla base de día por área (minutos desde 09:00)
  const plan = {
    fisio:   [['p02',0,45,0],['p09',60,45,4],['p07',150,45,3],['p01',210,45,2],['p14',300,45,0],['p04',420,45,5],['p15',540,45,1]],
    podo:    [['p04',30,30,0],['p11',120,60,1],['p14',240,30,2],['p08',360,45,0],['p01',480,30,3]],
    nutri:   [['p03',60,45,1],['p10',180,45,0],['p06',330,60,2],['p12',450,45,0]],
    psico:   [['p05',90,60,0],['p07',240,60,0],['p12',390,60,2]],
    homeo:   [['p06',30,45,0],['p13',150,45,1],['p08',300,45,0],['p15',450,45,2]],
    estetica:[['p08b',60,60,1],['p03',180,45,2],['p10',300,60,0],['p03',420,45,3]],
  };
  const rooms = { fisio:'Box 1', podo:'Sala pisada', nutri:'Consulta 1', psico:'Box 3', homeo:'Consulta 1', estetica:'Gabinete estética' };
  for (let wd=0; wd<5; wd++) {
    const date = new Date(monday); date.setDate(monday.getDate()+wd);
    const dateStr = iso(date);
    Object.entries(plan).forEach(([areaId, list]) => {
      list.forEach((row, i) => {
        // variación por día para que no sean idénticos
        if ((wd+i) % 7 === 3 && wd>0) return; // hueco
        const [pid, start, dur, sidx] = row;
        const shift = ((wd*13 + i*7) % 3 - 1) * 15; // ±15 min
        let state;
        if (wd < todayIdx) state = (uid%9===0)?'no_show':'atendida';
        else if (wd === todayIdx) {
          const now = (new Date().getHours()-9)*60 + new Date().getMinutes();
          state = (start+shift+dur < now) ? (uid%11===0?'no_show':'atendida')
                : (start+shift <= now ? 'en_sala' : (i%3===0?'confirmada':'reservada'));
        } else state = (i%4===0)?'confirmada':'reservada';
        if ((wd*3+i)%17===0) state='cancelada';
        appts.push({
          id:'a'+(uid++), date:dateStr, wd, areaId, room:rooms[areaId],
          patientId:pid, start:start+shift, dur,
          service:SERVICES[areaId][sidx % SERVICES[areaId].length], state,
        });
      });
    });
  }
  return { appts, monday, todayIdx };
}
const WEEK = buildWeek();
const APPTS = WEEK.appts;

/* ---------- Informes (INVENTADOS, con plantilla por especialidad) ---------- */
const REPORTS = [
  { id:'r01', patientId:'p02', areaId:'fisio', date:'2026-07-07', state:'firmado', title:'Informe de fisioterapia — tendinopatía rotuliana',
    reason:'Dolor anterior de rodilla derecha tras aumento de carga de entrenamiento.',
    exploration:'Dolor a la palpación del tendón rotuliano. Test de Royal London positivo. EVA 6/10. Balance articular completo, déficit de fuerza de cuádriceps del 20% respecto al contralateral.',
    diagnosis:'Tendinopatía rotuliana derecha en fase reactiva.',
    plan:'Programa de carga progresiva (isométricos → excéntricos), INDIBA 3 sesiones/semana durante 3 semanas, reeducación del gesto deportivo. Reevaluación en 4 semanas.' },
  { id:'r02', patientId:'p04', areaId:'podo', date:'2026-07-08', state:'firmado', title:'Estudio biomecánico de la pisada',
    reason:'Metatarsalgia bilateral y desgaste asimétrico del calzado. Paciente diabético.',
    exploration:'Exploración en carga y descarga. Pie pronador grado II bilateral. Presiones aumentadas en 2º-3º metatarsiano derecho. Fórmula digital: index minus. Estudio de la pisada en plataforma de presiones.',
    diagnosis:'Síndrome de sobrecarga del antepié por pie pronado. Riesgo de lesión por condición diabética.',
    plan:'Prescripción de ortesis plantares personalizadas (Podoactiva) con descarga selectiva de cabezas metatarsales. Revisión de la pisada y del pie diabético a los 3 meses.' },
  { id:'r03', patientId:'p03', areaId:'nutri', date:'2026-07-06', state:'entregado', title:'Informe nutricional y plan dietético',
    reason:'Objetivo de recomposición corporal y mejora de hábitos.',
    exploration:'Antropometría + bioimpedancia: peso 65,2 kg, IMC 24,1, % graso 29,4%. Pérdida de 2,8 kg respecto a la primera visita manteniendo masa muscular.',
    diagnosis:'Sobrepeso grado I en resolución. Buena adherencia.',
    plan:'Dieta de 1.600 kcal con reparto 40/30/30, pauta de hidratación y educación nutricional. Revisión con bioimpedancia en 4 semanas.' },
  { id:'r04', patientId:'p07', areaId:'fisio', date:'2026-07-05', state:'firmado', title:'Informe de fisioterapia — esguince de tobillo',
    reason:'Esguince lateral de tobillo izquierdo grado II en baloncesto.',
    exploration:'Edema maleolar externo en resolución. Test del cajón anterior negativo. EVA 3/10 en carga. Déficit propioceptivo.',
    diagnosis:'Esguince LLE grado II en fase de remodelación.',
    plan:'Trabajo propioceptivo progresivo, fortalecimiento de peroneos, vendaje funcional para retorno deportivo. Alta prevista en 2 semanas.' },
  { id:'r05', patientId:'p05', areaId:'psico', date:'2026-07-04', state:'firmado', title:'Informe psicológico — evolución',
    confidential:true,
    reason:'Seguimiento de proceso de terapia individual.',
    exploration:'[Contenido clínico confidencial — acceso restringido a la profesional y a dirección.]',
    diagnosis:'[Confidencial]',
    plan:'Continuidad del proceso terapéutico. Frecuencia quincenal.' },
  { id:'r06', patientId:'p01', areaId:'fisio', date:'2026-07-03', state:'entregado', title:'Informe de fisioterapia — cervicalgia',
    reason:'Cervicalgia mecánica con cefalea tensional asociada.',
    exploration:'Contractura de trapecio superior bilateral y suboccipitales. Limitación de la rotación cervical derecha. EVA inicial 7/10, actual 2/10.',
    diagnosis:'Cervicalgia mecánica en resolución.',
    plan:'Terapia manual, punción seca de puntos gatillo, pauta de ejercicios de control motor cervical y ergonomía. Alta con recomendaciones.' },
  { id:'r07', patientId:'p10', areaId:'estetica', date:'2026-07-02', state:'borrador', title:'Ficha de tratamiento — protocolo facial',
    reason:'Flacidez facial leve y falta de luminosidad.',
    exploration:'Piel grado II de fotoenvejecimiento. Se documenta con fotografía clínica (consentimiento de imagen firmado).',
    diagnosis:'Fotoenvejecimiento leve-moderado.',
    plan:'Protocolo de 8 sesiones de radiofrecuencia + peeling médico superficial. Fotografía de control cada 4 sesiones.' },
  { id:'r08', patientId:'p06', areaId:'homeo', date:'2026-06-30', state:'firmado', title:'Informe médico — deshabituación tabáquica',
    reason:'Deseo de abandono del hábito tabáquico (20 cig/día).',
    exploration:'Test de Fagerström: dependencia moderada. Sin contraindicaciones. Tensión arterial y auscultación normales.',
    diagnosis:'Tabaquismo con dependencia moderada.',
    plan:'Abordaje individualizado con apoyo homeopático y seguimiento conductual. Revisión a las 2 y 6 semanas.' },
  { id:'r09', patientId:'p11', areaId:'podo', date:'2026-06-29', state:'entregado', title:'Estudio de la pisada — corredor',
    reason:'Molestias en fascia plantar tras aumento de kilometraje.',
    exploration:'Pie cavo grado I. Apoyo de retropié en supinación. Tensión de la fascia plantar. Análisis dinámico de la carrera en cinta.',
    diagnosis:'Fascitis plantar incipiente en pie cavo.',
    plan:'Ortesis de descarga, pauta de estiramientos y readaptación progresiva de la carga de carrera.' },
  { id:'r10', patientId:'p12', areaId:'nutri', date:'2026-06-28', state:'firmado', title:'Informe nutricional — primera visita',
    reason:'Digestiones pesadas y fatiga. Derivada de psicología.',
    exploration:'Historia dietética y registro de 3 días. Antropometría basal. Sin alteraciones analíticas aportadas.',
    diagnosis:'Hábitos dietéticos mejorables, patrón irregular de comidas.',
    plan:'Reeducación de horarios y estructura de comidas, plan personalizado. Coordinación con el área de psicología.' },
  { id:'r11', patientId:'p14', areaId:'podo', date:'2026-06-26', state:'firmado', title:'Informe podológico — quiropodia',
    reason:'Revisión y quiropodia de mantenimiento en deportista.',
    exploration:'Hiperqueratosis en 1ª cabeza metatarsal. Uñas sin alteraciones. Piel bien hidratada.',
    diagnosis:'Hiperqueratosis por presión.',
    plan:'Quiropodia y consejo de calzado deportivo. Revisión trimestral.' },
  { id:'r12', patientId:'p04', areaId:'fisio', date:'2026-06-24', state:'entregado', title:'Informe de fisioterapia — lumbalgia',
    reason:'Lumbalgia mecánica de esfuerzo.',
    exploration:'Contractura paravertebral lumbar. Movilidad limitada en flexión. EVA 5/10.',
    diagnosis:'Lumbalgia mecánica sin signos de alarma.',
    plan:'Terapia manual, INDIBA y programa de control motor lumbopélvico. Educación en higiene postural.' },
];
const reportById = id => REPORTS.find(r => r.id === id);

/* Registro de auditoría (god-view / RGPD) */
const AUDIT = [
  { ts:'Hoy · 12:41', user:'Verónica Barrios', action:'Firmó informe', target:'Informe fisioterapia · Javier Ortega', area:'fisio' },
  { ts:'Hoy · 12:10', user:'Recepción (Marta)', action:'Registró cobro', target:'Bono 10 sesiones · Sofía Ramírez', area:null },
  { ts:'Hoy · 11:52', user:'Andrea Cardenal', action:'Abrió historia clínica', target:'Miguel Á. Prieto', area:'podo' },
  { ts:'Hoy · 10:33', user:'Diego (Gerencia)', action:'Cambió permisos', target:'Rol Recepción · acceso informes', area:null },
  { ts:'Ayer · 19:05', user:'Lola Gómez', action:'Creó nota confidencial', target:'Ana Belén Cortés', area:'psico' },
  { ts:'Ayer · 17:20', user:'Esther Segorbe', action:'Actualizó bioimpedancia', target:'Lucía Fernández', area:'nutri' },
  { ts:'Ayer · 16:02', user:'Dr. Silván', action:'Subió fotografía clínica', target:'Isabel Nogueira (consent. firmado)', area:'estetica' },
  { ts:'Ayer · 09:14', user:'Diego (Gerencia)', action:'Exportó cuadre de caja', target:'Caja diaria', area:null },
];

/* Matriz de permisos por rol (god-view) */
const PERMS = {
  cols: ['Agenda global','Su agenda','Ficha paciente','Informes clínicos','Notas confidenciales','Cobros/Caja','Usuarios y permisos','Auditoría RGPD'],
  rows: [
    { role:'Gerencia',    v:[1,1,1,1,0,1,1,1] },
    { role:'Recepción',   v:[1,0,1,0,0,1,0,0] },
    { role:'Profesional', v:[0,1,1,1,'own',0,0,0] },
    { role:'Psicología',  v:[0,1,1,1,1,0,0,0] },
  ],
};
