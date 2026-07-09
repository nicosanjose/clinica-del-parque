# -*- coding: utf-8 -*-
"""Generador de la web pública de Clínica del Parque (mockup personal).
Escribe todas las páginas en ../web/ compartiendo cabecera, nav y footer."""
import os, html

OUT = os.path.join(os.path.dirname(__file__), "..", "web")
os.makedirs(OUT, exist_ok=True)

CLINIC = dict(
    name="Clínica del Parque",
    tagline="Tu clínica de salud y bienestar junto a Arturo Soria",
    address="C/ Gregorio Benítez 16, 1ºA · 28043 Madrid",
    address_short="Gregorio Benítez 16 · Arturo Soria, Madrid",
    phone="918 05 27 31",
    phone_link="918052731",
    email="info@clinicadelparque.es",
    hours="Lunes a viernes · 09:00 – 21:00",
)

# ---------------------------------------------------------------- iconos (línea fina)
def _svg(inner, w=24):
    return (f'<svg viewBox="0 0 {w} {w}" fill="none" stroke="currentColor" '
            f'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{inner}</svg>')
IC = {
 "arrow": '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
 "check": '<path d="m5 12.5 4.2 4.2L19 7"/>',
 "phone": '<path d="M6.8 3h2.6l1.4 3.6-1.9 1.4a11.5 11.5 0 0 0 5.1 5.1l1.4-1.9L19 12.6v2.6a2 2 0 0 1-2.2 2A16 16 0 0 1 4.8 5.2 2 2 0 0 1 6.8 3Z"/>',
 "pin": '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
 "clock": '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.5V12l3 1.8"/>',
 "mail": '<rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2.4"/><path d="m4 7 8 5.6L20 7"/>',
 "cal": '<rect x="3.6" y="5" width="16.8" height="15" rx="2.4"/><path d="M8 3v4M16 3v4M3.6 10h16.8"/>',
 "activity": '<path d="M3 12h4l2.4-7 5 14L17 12h4"/>',
 "foot": '<path d="M8.5 4.2c2.2 0 3.2 2.4 3.2 5.6 0 3-1.1 5.4-3.2 5.4S5.4 13 5.4 10.4 6.3 4.2 8.5 4.2Z"/><path d="M15.5 14.5c1.5 0 2.3 1 2.3 2.2s-.9 2.3-2.4 2.3-3-1-3-2.2 1.6-2.3 3.1-2.3Z"/>',
 "leaf": '<path d="M5 19c-.5-8 5-14 14-14 .5 8-5 14-14 14Z"/><path d="M5 19C9.5 14 13 11 17.5 9"/>',
 "brain": '<path d="M9.5 5.4A2.6 2.6 0 0 0 6.9 8a2.7 2.7 0 0 0-1 5 2.6 2.6 0 0 0 3.6 2.8 2.7 2.7 0 0 0 5 0A2.6 2.6 0 0 0 18 13a2.7 2.7 0 0 0-1-5 2.6 2.6 0 0 0-2.6-2.6 2.5 2.5 0 0 0-4.9 0Z"/><path d="M12 5.6v11"/>',
 "droplet": '<path d="M12 3.2s5.8 6.3 5.8 10.6a5.8 5.8 0 0 1-11.6 0C6.2 9.5 12 3.2 12 3.2Z"/>',
 "sparkle": '<path d="m12 3.4 1.7 5.5 5.5 1.7-5.5 1.7L12 17.8l-1.7-5.5L4.8 10.6l5.5-1.7L12 3.4Z"/>',
 "shield": '<path d="M12 3.4 5.6 6v5.2c0 4.2 2.8 7.5 6.4 9.2 3.6-1.7 6.4-5 6.4-9.2V6L12 3.4Z"/><path d="m9.2 12 2 2 3.6-3.8"/>',
 "star": '<path d="m12 4 2.2 4.9 5.3.5-4 3.6 1.2 5.2L12 15.9 7.3 18.2l1.2-5.2-4-3.6 5.3-.5L12 4Z"/>',
 "users": '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.6 19a5.4 5.4 0 0 1 10.8 0"/><path d="M15.5 5.6a3.2 3.2 0 0 1 0 6.2M20.4 19a5.4 5.4 0 0 0-3.6-5.1"/>',
 "spark2": '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
}
def icon(k): return _svg(IC[k])

def av_arrow(cls="ic"):  # button-in-button trailing arrow
    return f'<span class="{cls}">{icon("arrow")}</span>'

# ---------------------------------------------------------------- servicios
SERVICES = [
 dict(slug="fisioterapia", nav="Fisioterapia", name="Fisioterapia y Osteopatía",
   color="#00A9C0", icon="activity", pro="Verónica Barrios", pro_i="VB", pro_role="Fisioterapeuta · Osteópata",
   short="Recupera el movimiento sin dolor con terapia manual, osteopatía y tecnología de última generación.",
   lead="Valoramos el origen de tu lesión y diseñamos un tratamiento manual e individual para que vuelvas a moverte sin dolor.",
   intro=["La fisioterapia es mucho más que aliviar un síntoma: buscamos la causa. "
          "Combinamos terapia manual, osteopatía y ejercicio terapéutico con un seguimiento cercano de tu evolución.",
          "Tratamos lesiones deportivas, dolor de espalda, cervicalgias, tendinopatías y procesos de rehabilitación, "
          "apoyándonos cuando conviene en tecnología como INDIBA y la neuromodulación no invasiva NESA."],
   benefits=["Valoración biomecánica completa","Terapia manual y osteopatía","Punción seca de puntos gatillo",
             "Radiofrecuencia INDIBA","Neuromodulación NESA no invasiva","Readaptación y ejercicio terapéutico"],
   tags=["Terapia manual","Osteopatía","Punción seca","INDIBA","NESA","Ejercicio terapéutico"]),
 dict(slug="podologia", nav="Podología", name="Podología y Biomecánica",
   color="#12b3a6", icon="foot", pro="Andrea Cardenal Gómez", pro_i="AC", pro_role="Podóloga · Biomecánica del pie",
   short="Estudio de la pisada, plantillas personalizadas y podología clínica para caminar y correr mejor.",
   lead="Analizamos cómo apoyas y caminas para prevenir lesiones, corregir la pisada y cuidar la salud de tus pies.",
   intro=["Realizamos el estudio biomecánico de la pisada en plataforma de presiones y análisis del gesto de la marcha "
          "y la carrera, base para diseñar plantillas personalizadas.",
          "Somos centro colaborador para ortesis plantares y ofrecemos quiropodia, tratamiento de durezas y uñas, "
          "podología deportiva y cuidado especializado del pie diabético."],
   benefits=["Estudio biomecánico de la pisada","Plantillas personalizadas (Podoactiva)","Quiropodia y cuidado de la piel",
             "Ortesis de silicona a medida","Podología deportiva","Cuidado del pie diabético"],
   tags=["Estudio de la pisada","Plantillas","Quiropodia","Pie diabético","Ortesis"]),
 dict(slug="nutricion", nav="Nutrición", name="Nutrición y Dietética",
   color="#43a047", icon="leaf", pro="Esther Segorbe", pro_i="ES", pro_role="Nutricionista-Dietista",
   short="Come mejor y siéntete mejor con planes personalizados y seguimiento real de tu evolución.",
   lead="Nada de dietas imposibles: construimos hábitos que puedas mantener, con un plan adaptado a ti y a tu día a día.",
   intro=["Partimos de una valoración con bioimpedancia para conocer tu composición corporal y fijar objetivos realistas. "
          "A partir de ahí diseñamos un plan personalizado y lo ajustamos en cada revisión.",
          "Acompañamos procesos de pérdida y recomposición corporal, nutrición deportiva, nutrición clínica y, sobre todo, "
          "educación alimentaria para que aprendas a comer bien de por vida."],
   benefits=["Valoración con bioimpedancia","Plan dietético personalizado","Pérdida y recomposición corporal",
             "Nutrición deportiva","Nutrición clínica","Educación alimentaria"],
   tags=["Bioimpedancia","Plan personalizado","Deporte","Educación nutricional"]),
 dict(slug="psicologia", nav="Psicología", name="Psicología",
   color="#7E57C2", icon="brain", pro="Lola Gómez Gutiérrez", pro_i="LG", pro_role="Psicóloga Sanitaria",
   short="Un espacio seguro y confidencial para tu bienestar emocional, para adultos, adolescentes y niños.",
   lead="Te acompañamos con una terapia adaptada a tu momento vital, en un entorno cercano y absolutamente confidencial.",
   intro=["Ofrecemos terapia psicológica para adultos, adolescentes y población infantil, trabajando la ansiedad, "
          "el estado de ánimo, la autoestima, el duelo y los procesos de cambio.",
          "Cada proceso es único: definimos objetivos contigo y avanzamos a tu ritmo, con herramientas basadas en la "
          "evidencia y un vínculo terapéutico de confianza."],
   benefits=["Terapia individual para adultos","Psicología infantil y adolescente","Ansiedad y estado de ánimo",
             "Duelo y procesos de cambio","Terapia de pareja","Acompañamiento confidencial"],
   tags=["Adultos","Infantil","Adolescentes","Ansiedad","Duelo"]),
 dict(slug="homeopatia", nav="Homeopatía", name="Homeopatía y Medicina",
   color="#FB8C00", icon="droplet", pro="Dr. Luis De la Serna", pro_i="LS", pro_role="Médico · Homeopatía",
   short="Un enfoque médico integrativo que mira a la persona completa, no solo al síntoma.",
   lead="Consulta médica con una mirada integrativa: entendemos tu salud en su conjunto y te acompañamos a largo plazo.",
   intro=["La consulta une el criterio médico con un enfoque integrativo y la homeopatía individualizada, "
          "atendiendo tus antecedentes, tu estilo de vida y tus objetivos de salud.",
          "Acompañamos procesos de deshabituación tabáquica, el manejo de molestias crónicas y la prevención, "
          "siempre con un trato humano y personalizado."],
   benefits=["Consulta médica integrativa","Homeopatía individualizada","Deshabituación tabáquica",
             "Acompañamiento en procesos crónicos","Prevención y hábitos de salud"],
   tags=["Consulta médica","Homeopatía","Dejar de fumar","Prevención"]),
 dict(slug="estetica", nav="Estética", name="Medicina y Clínica Estética",
   color="#EC407A", icon="sparkle", pro="Dr. Fernando Silván", pro_i="FS", pro_role="Medicina estética · con Yurbin del Valle",
   short="Realza tu belleza natural con tratamientos faciales y medicina estética, siempre con criterio médico.",
   lead="Cuidamos tu piel con un enfoque médico y natural: resultados armónicos, sin excesos, adaptados a ti.",
   intro=["Comenzamos con una valoración médico-estética para entender tu piel y tus objetivos. "
          "A partir de ahí planificamos el tratamiento más adecuado y documentamos tu evolución.",
          "Ofrecemos tratamientos faciales, radiofrecuencia, peelings médicos y protocolos de cuidado de la piel, "
          "combinando la mano de la esteticista con el criterio del médico estético."],
   benefits=["Valoración médico-estética","Tratamientos faciales","Radiofrecuencia facial",
             "Peelings médicos","Cuidado y rutina de la piel","Seguimiento con fotografía clínica"],
   tags=["Facial","Radiofrecuencia","Peeling","Medicina estética"]),
]
SVC = {s["slug"]: s for s in SERVICES}

TEAM = [
 dict(n="Diego Sánchez Uguina", i="DS", r="Dirección · Gerencia", c="#2B354B",
      d="Coordina el equipo y la experiencia de cada paciente en la clínica."),
 dict(n="Verónica Barrios", i="VB", r="Fisioterapeuta · Osteópata", c="#00A9C0",
      d="Terapia manual, osteopatía y readaptación al movimiento."),
 dict(n="Andrea Cardenal Gómez", i="AC", r="Podóloga", c="#12b3a6",
      d="Estudio de la pisada, biomecánica y podología clínica."),
 dict(n="Esther Segorbe", i="ES", r="Nutricionista-Dietista", c="#43a047",
      d="Planes de nutrición personalizados y educación alimentaria."),
 dict(n="Lola Gómez Gutiérrez", i="LG", r="Psicóloga Sanitaria", c="#7E57C2",
      d="Terapia para adultos, adolescentes y población infantil."),
 dict(n="Dr. Luis De la Serna", i="LS", r="Médico · Homeopatía", c="#FB8C00",
      d="Consulta médica integrativa y homeopatía individualizada."),
 dict(n="Dr. Fernando Silván", i="FS", r="Medicina estética", c="#EC407A",
      d="Valoración y tratamientos de medicina estética facial."),
 dict(n="Yurbin del Valle", i="YV", r="Esteticista", c="#e0669a",
      d="Tratamientos faciales y protocolos de cuidado de la piel."),
]

# ---------------------------------------------------------------- shell
NAV = [("index.html","Inicio","inicio"),("servicios.html","Servicios","servicios"),
       ("equipo.html","Equipo","equipo"),("contacto.html","Contacto","contacto")]

def nav_html(active):
    links = "".join(f'<a href="{h}" class="{"active" if k==active else ""}">{t}</a>' for h,t,k in NAV)
    over  = "".join(f'<a href="{h}">{t}</a>' for h,t,k in NAV)
    return f'''
<div class="nav-wrap">
  <nav class="nav">
    <a class="nav-logo" href="index.html"><img src="assets/logo.jpg" alt="Clínica del Parque"><b>Clínica del Parque</b></a>
    <div class="nav-links">{links}</div>
    <div class="nav-cta"><a class="btn btn-primary" href="contacto.html">Pedir cita {av_arrow()}</a></div>
    <button class="hamb" aria-label="Menú"><span></span><span></span></button>
  </nav>
</div>
<div class="menu-overlay">{over}<a href="contacto.html">Pedir cita</a>
  <div class="mo-foot">{CLINIC["phone"]} · {CLINIC["address_short"]}</div>
</div>'''

def footer_html():
    svc = "".join(f'<li><a href="{s["slug"]}.html">{s["nav"]}</a></li>' for s in SERVICES)
    return f'''
<footer class="site">
  <div class="container">
    <div class="f-grid">
      <div>
        <div class="fl-logo"><img src="assets/logo.jpg" alt="" style="height:34px;background:#fff;border-radius:8px;padding:4px"><b>Clínica del Parque</b></div>
        <p>{CLINIC["tagline"]}. Un equipo multidisciplinar para cuidar tu salud y tu bienestar en el corazón de Arturo Soria.</p>
        <div style="margin-top:18px"><span class="demo-badge">Rediseño de demostración · web no oficial</span></div>
      </div>
      <div><h4>Servicios</h4><ul>{svc}</ul></div>
      <div><h4>Clínica</h4><ul>
        <li><a href="equipo.html">Equipo</a></li>
        <li><a href="servicios.html">Todos los servicios</a></li>
        <li><a href="contacto.html">Contacto y cita</a></li>
      </ul></div>
      <div><h4>Contacto</h4><ul>
        <li><a href="tel:+34{CLINIC["phone_link"]}">{CLINIC["phone"]}</a></li>
        <li>{CLINIC["address"]}</li>
        <li>{CLINIC["hours"]}</li>
      </ul></div>
    </div>
    <div class="f-bottom">
      <span>© <span data-year>2026</span> {CLINIC["name"]} · Mockup de rediseño (proyecto personal).</span>
      <span>Diseño y desarrollo del prototipo · datos ilustrativos</span>
    </div>
  </div>
</footer>'''

def page(title, desc, active, body):
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{html.escape(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
{nav_html(active)}
<main>
{body}
</main>
{footer_html()}
<script src="main.js"></script>
</body>
</html>'''

# ---------------------------------------------------------------- componentes
def svc_card(s, reveal_delay=""):
    return f'''<a class="bezel reveal {reveal_delay}" href="{s["slug"]}.html">
  <div class="core svc">
    <div class="glow" style="background:{s["color"]}"></div>
    <div class="svc-ic" style="background:{s["color"]}14;color:{s["color"]}">{icon(s["icon"])}</div>
    <h3>{s["name"]}</h3>
    <p>{s["short"]}</p>
    <span class="svc-link">Ver servicio <span class="ar">{icon("arrow")}</span></span>
  </div>
</a>'''

def member_card(m, d=""):
    return f'''<div class="bezel reveal {d}"><div class="core member">
    <div class="ph" style="background:linear-gradient(135deg,{m["c"]},{m["c"]}bb)">{m["i"]}</div>
    <h3>{m["n"]}</h3><div class="role">{m["r"]}</div><p>{m["d"]}</p>
  </div></div>'''

def contact_band():
    return f'''
<section class="section"><div class="container">
  <div class="bezel reveal"><div class="core band-dark" style="padding:clamp(40px,6vw,72px)">
    <div style="max-width:640px;position:relative">
      <span class="eyebrow light"><span class="dot"></span>Pide tu cita</span>
      <h2 class="title" style="margin:20px 0 16px">¿Damos el primer paso hacia tu bienestar?</h2>
      <p style="font-size:1.1rem">Reserva una valoración con el especialista que necesites. Estamos en Arturo Soria, de lunes a viernes de 9 a 21h.</p>
      <div class="mt-cta">
        <a class="btn btn-primary" href="contacto.html">Reservar cita {av_arrow()}</a>
        <a class="btn btn-dark" href="tel:+34{CLINIC["phone_link"]}" style="background:rgba(255,255,255,.1)">Llamar · {CLINIC["phone"]} {av_arrow()}</a>
      </div>
    </div>
  </div></div>
</div></section>'''

def related_strip(exclude):
    cards = ""
    for s in SERVICES:
        if s["slug"] == exclude: continue
        cards += f'''<a class="bezel reveal" href="{s["slug"]}.html"><div class="core rel">
          <div class="ri" style="background:{s["color"]}14;color:{s["color"]}">{icon(s["icon"])}</div>
          <div><b>{s["nav"]}</b><span>{s["pro_role"].split("·")[0].strip()}</span></div></div></a>'''
    return f'''<section class="section" style="padding-top:0"><div class="container">
      <div class="sec-head"><span class="eyebrow"><span class="dot"></span>Más especialidades</span>
        <h2 class="title" style="margin-top:16px">Otras áreas de la clínica</h2></div>
      <div class="related">{cards}</div></div></section>'''

# ---------------------------------------------------------------- HOME
def home():
    cards = "".join(svc_card(s, f"d{(i%3)+1}") for i,s in enumerate(SERVICES))
    feats = [("Equipo propio","Especialistas fijos que conocen tu historia, no consultas rotativas."),
             ("Enfoque integral","Fisio, podología, nutrición, psicología y más, coordinados bajo un mismo techo."),
             ("Tecnología","INDIBA, NESA y estudio de la pisada para diagnósticos y tratamientos precisos."),
             ("Trato cercano","Tiempo real por paciente y un seguimiento que de verdad acompaña.")]
    feat_html = "".join(f'<div class="fi"><span class="fn">0{i+1}</span><div><b>{t}</b><span>{d}</span></div></div>'
                        for i,(t,d) in enumerate(feats))
    members = "".join(member_card(m, f"d{(i%3)+1}") for i,m in enumerate(TEAM[:6]))
    body = f'''
<section class="hero">
  <canvas id="hero-canvas"></canvas>
  <div class="hero-veil"></div>
  <div class="container"><div class="hero-inner">
    <h1 class="display reveal in">Tu salud y tu bienestar, <span class="serif-italic kicker">en un mismo lugar.</span></h1>
    <p class="lead reveal in d1">Seis especialidades y un equipo propio para cuidarte de forma integral: fisioterapia, podología, nutrición, psicología, homeopatía y medicina estética.</p>
    <div class="hero-cta reveal in d2">
      <a class="btn btn-primary" href="contacto.html">Pedir cita {av_arrow()}</a>
      <a class="btn btn-ghost" href="servicios.html">Ver servicios {av_arrow()}</a>
    </div>
    <div class="hero-meta reveal in d3">
      <div class="hm"><b>6</b><span>especialidades</span></div>
      <div class="hm"><b>9–21h</b><span>de lunes a viernes</span></div>
      <div class="hm"><b>Arturo&nbsp;Soria</b><span>Madrid · Ciudad Lineal</span></div>
    </div>
  </div></div>
  <div class="scroll-hint"><span>Desliza</span><span class="ln"></span></div>
</section>

<section class="section"><div class="container">
  <div class="sec-head"><span class="eyebrow reveal"><span class="dot"></span>Nuestras especialidades</span>
    <h2 class="title reveal" style="margin-top:16px">Todo lo que tu cuerpo y tu mente necesitan</h2>
    <p class="reveal d1">Un cuadro de profesionales que trabajan de forma coordinada para ofrecerte una atención completa y personalizada.</p></div>
  <div class="svc-grid">{cards}</div>
</div></section>

<section class="section" style="padding-top:0"><div class="container">
  <div class="bezel reveal"><div class="core band-dark" style="padding:clamp(44px,6vw,80px)">
    <div class="split" style="align-items:center;gap:48px;position:relative">
      <div>
        <span class="eyebrow light"><span class="dot"></span>Por qué Clínica del Parque</span>
        <h2 class="title" style="margin:20px 0 18px">Una forma distinta de cuidar de ti</h2>
        <p style="font-size:1.1rem">No sumamos consultas sueltas: coordinamos a todo el equipo alrededor de una sola persona, tú. Así conseguimos tratamientos más precisos y una recuperación más rápida.</p>
        <div class="mt-cta"><a class="btn btn-primary" href="equipo.html">Conoce al equipo {av_arrow()}</a></div>
      </div>
      <div class="feat">{feat_html}</div>
    </div>
  </div></div>
</div></section>

<section class="section"><div class="container">
  <div class="stats">
    <div class="st reveal"><b>6</b><span>especialidades bajo un techo</span></div>
    <div class="st reveal d1"><b>8</b><span>profesionales en el equipo</span></div>
    <div class="st reveal d2"><b>1</b><span>historia clínica coordinada</span></div>
    <div class="st reveal d3"><b>100%</b><span>trato personalizado</span></div>
  </div>
</div></section>

<section class="section" style="padding-top:0"><div class="container">
  <div class="sec-head center"><span class="eyebrow reveal"><span class="dot"></span>El equipo</span>
    <h2 class="title reveal" style="margin-top:16px">Manos expertas, trato cercano</h2>
    <p class="reveal d1">Profesionales colegiados que ponen su experiencia al servicio de tu salud.</p></div>
  <div class="team-grid">{members}</div>
  <div class="mt-cta center" style="margin-top:36px"><a class="btn btn-ghost" href="equipo.html">Ver equipo completo {av_arrow()}</a></div>
</div></section>

{contact_band()}
'''
    return page(f'{CLINIC["name"]} · Fisioterapia, podología, nutrición y más en Arturo Soria',
                f'{CLINIC["tagline"]}. Fisioterapia, podología, nutrición, psicología, homeopatía y medicina estética en Arturo Soria, Madrid.',
                "inicio", body)

# ---------------------------------------------------------------- SERVICIOS (índice)
def servicios():
    cards = "".join(svc_card(s, f"d{(i%3)+1}") for i,s in enumerate(SERVICES))
    body = f'''
<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Inicio</a> · Servicios</div>
  <span class="eyebrow reveal in"><span class="dot"></span>Nuestras especialidades</span>
  <h1 class="reveal in">Seis áreas, un mismo equipo cuidando de ti</h1>
  <p class="lead reveal in d1">Elige la especialidad que necesitas. Todas comparten historia, criterio y un objetivo común: tu bienestar.</p>
</div></section>
<section class="section" style="padding-top:20px"><div class="container">
  <div class="svc-grid">{cards}</div>
</div></section>
{contact_band()}
'''
    return page(f'Servicios · {CLINIC["name"]}',
                "Fisioterapia y osteopatía, podología, nutrición, psicología, homeopatía y medicina estética en Arturo Soria, Madrid.",
                "servicios", body)

# ---------------------------------------------------------------- SERVICIO (detalle)
def service_page(s):
    checks = "".join(f'<li><span class="ck">{icon("check")}</span>{b}</li>' for b in s["benefits"])
    intro = "".join(f'<p>{p}</p>' for p in s["intro"])
    tags = "".join(f'<span class="t">{t}</span>' for t in s["tags"])
    body = f'''
<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Inicio</a> · <a href="servicios.html">Servicios</a> · {s["nav"]}</div>
  <span class="eyebrow reveal in" style="color:{s["color"]};background:{s["color"]}12;border-color:{s["color"]}30">
    <span class="dot" style="background:{s["color"]};box-shadow:0 0 0 3px {s["color"]}30"></span>{s["nav"]}</span>
  <h1 class="reveal in">{s["name"]}</h1>
  <p class="lead reveal in d1">{s["lead"]}</p>
  <div class="mt-cta reveal in d2"><a class="btn btn-primary" href="contacto.html">Pedir cita {av_arrow()}</a>
    <a class="btn btn-ghost" href="tel:+34{CLINIC["phone_link"]}">Llamar {av_arrow()}</a></div>
</div></section>

<section class="section" style="padding-top:30px"><div class="container">
  <div class="split">
    <div class="prose reveal">
      {intro}
      <h3>Qué incluye</h3>
      <ul class="check-list">{checks}</ul>
    </div>
    <div class="bezel reveal d1"><div class="core aside-card">
      <div class="pro"><div class="ph" style="background:linear-gradient(135deg,{s["color"]},{s["color"]}bb)">{s["pro_i"]}</div>
        <div><b>{s["pro"]}</b><span>{s["pro_role"]}</span></div></div>
      <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);margin-bottom:12px">Técnicas y enfoque</div>
      <div class="tags">{tags}</div>
      <div style="margin-top:24px"><a class="btn btn-primary" href="contacto.html" style="width:100%;justify-content:center">Reservar valoración {av_arrow()}</a></div>
      <div class="pill-note" style="margin-top:16px"><span style="color:{s["color"]}">{icon("clock")}</span>{CLINIC["hours"]}</div>
    </div></div>
  </div>
</div></section>

{related_strip(s["slug"])}
{contact_band()}
'''
    return page(f'{s["name"]} en Arturo Soria · {CLINIC["name"]}', s["short"], "servicios", body)

# ---------------------------------------------------------------- EQUIPO
def equipo():
    members = "".join(member_card(m, f"d{(i%3)+1}") for i,m in enumerate(TEAM))
    vals = [("shield","Profesionales colegiados","Cada área está en manos de un especialista titulado y con experiencia."),
            ("users","Trabajo coordinado","Compartimos la información clínica para tratarte de forma integral."),
            ("star","Cercanía real","Dedicamos tiempo a cada persona: te escuchamos antes de tratar.")]
    vals_html = "".join(f'''<div class="bezel reveal d{i+1}"><div class="core svc" style="min-height:auto">
      <div class="svc-ic" style="background:var(--brand-050);color:var(--brand-700)">{icon(ic)}</div>
      <h3 style="font-size:1.3rem">{t}</h3><p>{d}</p></div></div>''' for i,(ic,t,d) in enumerate(vals))
    body = f'''
<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Inicio</a> · Equipo</div>
  <span class="eyebrow reveal in"><span class="dot"></span>Nuestro equipo</span>
  <h1 class="reveal in">Las personas que cuidan de tu salud</h1>
  <p class="lead reveal in d1">Un equipo multidisciplinar que trabaja de forma coordinada para ofrecerte la mejor atención en cada especialidad.</p>
</div></section>
<section class="section" style="padding-top:20px"><div class="container">
  <div class="team-grid">{members}</div>
</div></section>
<section class="section" style="padding-top:0"><div class="container">
  <div class="sec-head center"><span class="eyebrow reveal"><span class="dot"></span>Cómo trabajamos</span>
    <h2 class="title reveal" style="margin-top:16px">Nuestros valores</h2></div>
  <div class="svc-grid">{vals_html}</div>
</div></section>
{contact_band()}
'''
    return page(f'Equipo · {CLINIC["name"]}',
                "Conoce al equipo multidisciplinar de Clínica del Parque: fisioterapia, podología, nutrición, psicología, homeopatía y estética.",
                "equipo", body)

# ---------------------------------------------------------------- CONTACTO
def contacto():
    opts = "".join(f'<option>{s["name"]}</option>' for s in SERVICES)
    body = f'''
<section class="page-hero"><div class="container">
  <div class="breadcrumb"><a href="index.html">Inicio</a> · Contacto</div>
  <span class="eyebrow reveal in"><span class="dot"></span>Pide tu cita</span>
  <h1 class="reveal in">Estamos a un paso de ti</h1>
  <p class="lead reveal in d1">En pleno Arturo Soria, junto al Centro Comercial Arturo Soria Plaza. Reserva tu cita o escríbenos y te ayudamos.</p>
</div></section>
<section class="section" style="padding-top:20px"><div class="container">
  <div class="bezel reveal"><div class="core contact-card">
    <div class="contact-info">
      <div class="ci"><div class="cic">{icon("pin")}</div><div><b>Dirección</b><span>{CLINIC["address"]}</span></div></div>
      <div class="ci"><div class="cic">{icon("phone")}</div><div><b>Teléfono</b><span><a href="tel:+34{CLINIC["phone_link"]}">{CLINIC["phone"]}</a></span></div></div>
      <div class="ci"><div class="cic">{icon("clock")}</div><div><b>Horario</b><span>{CLINIC["hours"]}</span></div></div>
      <div class="ci"><div class="cic">{icon("mail")}</div><div><b>Email</b><span>{CLINIC["email"]}</span></div></div>
      <div class="ci"><div class="cic">{icon("cal")}</div><div><b>Reserva online</b><span>Pide tu cita con el especialista que necesites.</span></div></div>
    </div>
    <div class="contact-form">
      <h3 style="font-size:1.5rem;margin-bottom:6px">Solicita tu cita</h3>
      <p style="color:var(--ink-2);font-size:14px;margin-bottom:22px">Te contactamos para confirmar día y hora.</p>
      <form data-demo>
        <div class="field"><label>Nombre y apellidos</label><input required placeholder="Tu nombre"></div>
        <div class="field"><label>Teléfono</label><input required placeholder="600 000 000"></div>
        <div class="field"><label>Especialidad</label><select>{opts}</select></div>
        <div class="field"><label>Mensaje (opcional)</label><textarea placeholder="Cuéntanos brevemente qué necesitas"></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center"><span class="lbl">Enviar solicitud</span> {av_arrow()}</button>
        <p style="color:var(--ink-3);font-size:12px;margin-top:12px;text-align:center">Formulario de demostración · no envía datos reales.</p>
      </form>
    </div>
  </div></div>
  <div style="margin-top:24px" class="reveal">
    <iframe class="map-embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=Calle%20Gregorio%20Ben%C3%ADtez%2016%2C%20Madrid&output=embed"></iframe>
  </div>
</div></section>
'''
    return page(f'Contacto y cita · {CLINIC["name"]}',
                f'Pide tu cita en Clínica del Parque. {CLINIC["address"]}. Teléfono {CLINIC["phone"]}.',
                "contacto", body)

# ---------------------------------------------------------------- write
def write(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(content)
    print("  ->", name)

if __name__ == "__main__":
    print("Generando web en", os.path.abspath(OUT))
    write("index.html", home())
    write("servicios.html", servicios())
    for s in SERVICES:
        write(f'{s["slug"]}.html', service_page(s))
    write("equipo.html", equipo())
    write("contacto.html", contacto())
    print("LISTO ·", 3 + len(SERVICES), "páginas")
