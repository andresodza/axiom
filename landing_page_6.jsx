import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #141412;
    --ink: #F0EDE4;
    --ink2: #A8A49C;
    --ink3: #5C5A56;
    --accent: #E8C832;
    --border: #272521;
    --surface: #1C1B18;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 4rem;
    background: rgba(20,20,18,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }
  nav.scrolled { border-color: var(--border); }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--ink);
    text-decoration: none;
  }
  .nav-logo span { color: var(--accent); }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink2);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }

  .nav-cta {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #141412;
    background: var(--accent);
    border: none;
    padding: 0.65rem 1.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--ink); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 4rem 5rem;
    position: relative;
    overflow: hidden;
  }

  .hero-bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(120px, 22vw, 280px);
    font-weight: 300;
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    z-index: 0;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }
  .hero-badge::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: var(--accent);
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(54px, 9vw, 110px);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.01em;
    max-width: 900px;
    position: relative;
    z-index: 1;
    color: var(--ink);
  }
  .hero-title em {
    font-style: italic;
    color: var(--accent);
  }

  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3rem;
    position: relative;
    z-index: 1;
  }

  .hero-desc {
    max-width: 360px;
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.8;
  }

  .hero-scroll {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink3);
  }
  .scroll-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.5; }
  }

  /* MARQUEE */
  .marquee-wrap {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 1.1rem 0;
    overflow: hidden;
    background: var(--surface);
  }
  .marquee-track {
    display: flex;
    gap: 3rem;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
  }
  .marquee-item {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-style: italic;
    color: var(--ink3);
    display: flex;
    align-items: center;
    gap: 3rem;
    flex-shrink: 0;
  }
  .marquee-item::after {
    content: '·';
    color: var(--accent);
    font-style: normal;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* SECTION BASE */
  section { padding: 8rem 4rem; }
  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink3);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .section-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--border);
  }

  /* SERVICES */
  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-top: 4rem;
    border-top: 1px solid var(--border);
  }
  .service-item {
    padding: 3rem 2.5rem 3rem 0;
    border-bottom: 1px solid var(--border);
    border-right: 1px solid var(--border);
    transition: background 0.25s;
    cursor: default;
  }
  .service-item:nth-child(even) {
    padding-left: 2.5rem;
    padding-right: 0;
    border-right: none;
  }
  .service-item:hover { background: var(--surface); }

  .service-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    color: var(--accent);
    font-style: italic;
    margin-bottom: 1rem;
  }
  .service-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 1rem;
    line-height: 1.1;
  }
  .service-desc {
    font-size: 13px;
    color: var(--ink2);
    line-height: 1.9;
    max-width: 320px;
  }

  /* ABOUT */
  .about-inner {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 6rem;
    align-items: center;
  }
  .about-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4.5vw, 60px);
    font-weight: 300;
    line-height: 1.15;
    color: var(--ink);
  }
  .about-headline em {
    font-style: italic;
    color: var(--accent);
  }
  .about-text {
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.9;
    margin-bottom: 1.5rem;
  }
  .stat-row {
    display: flex;
    gap: 3rem;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--ink);
    line-height: 1;
  }
  .stat-num span { color: var(--accent); }
  .stat-label {
    font-size: 12px;
    color: var(--ink3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  /* WORK */
  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
  }
  .work-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4.5vw, 58px);
    font-weight: 300;
    line-height: 1;
    color: var(--ink);
  }
  .work-link {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink2);
    text-decoration: none;
    border-bottom: 1px solid var(--ink3);
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .work-link:hover { color: var(--accent); border-color: var(--accent); }

  .work-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 1.5px;
    background: var(--border);
  }
  .work-card {
    background: var(--bg);
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .work-card-bg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease;
  }
  .work-card:hover .work-card-bg { transform: scale(1.04); }
  .work-card-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 1.5rem 1.8rem;
    background: linear-gradient(to top, rgba(14,14,12,0.85) 0%, transparent 100%);
    transform: translateY(6px);
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
  }
  .work-card:hover .work-card-overlay { opacity: 1; transform: none; }
  .work-card-title { font-size: 1rem; font-weight: 500; color: #F0EDE4; }
  .work-card-tag { font-size: 11px; color: rgba(240,237,228,0.5); margin-top: 2px; letter-spacing: 0.08em; text-transform: uppercase; }

  .work-side { display: grid; grid-template-rows: 1fr 1fr; gap: 1.5px; }

  /* CTA */
  .cta-section {
    background: var(--accent);
    padding: 8rem 4rem;
    text-align: center;
  }
  .cta-section .section-label { justify-content: center; color: rgba(20,20,18,0.5); }
  .cta-section .section-label::after { background: rgba(20,20,18,0.2); }
  .cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(44px, 7vw, 88px);
    font-weight: 300;
    color: #141412;
    line-height: 1;
    margin: 1.5rem 0 2.5rem;
  }
  .cta-title em { font-style: italic; color: rgba(20,20,18,0.55); }
  .cta-btn {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    background: #141412;
    border: none;
    padding: 1.1rem 3rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .cta-btn:hover { background: #0A0A09; }
  .cta-sub {
    font-size: 13px;
    color: rgba(20,20,18,0.45);
    margin-top: 1.2rem;
  }

  /* FOOTER */
  footer {
    background: #0A0A09;
    border-top: 1px solid var(--border);
    padding: 3rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 0.08em;
  }
  .footer-logo span { color: var(--accent); }
  .footer-copy { font-size: 12px; color: var(--ink3); }
  .footer-links { display: flex; gap: 2rem; list-style: none; }
  .footer-links a {
    font-size: 12px;
    color: var(--ink3);
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--accent); }

  @media (max-width: 768px) {
    nav { padding: 1.2rem 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 0 1.5rem 4rem; }
    section { padding: 5rem 1.5rem; }
    .services-grid { grid-template-columns: 1fr; }
    .service-item { border-right: none; padding-right: 0; }
    .service-item:nth-child(even) { padding-left: 0; }
    .about-inner { grid-template-columns: 1fr; gap: 3rem; }
    .work-grid { grid-template-columns: 1fr; }
    .work-side { grid-template-rows: auto; }
    footer { flex-direction: column; gap: 1.5rem; text-align: center; padding: 2rem 1.5rem; }
    .footer-links { justify-content: center; }
    .cta-section { padding: 5rem 1.5rem; }
  }
`;

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const MARQUEE_ITEMS = [
  "Diseño Web", "Branding", "Desarrollo Digital", "UX / UI", "Identidad Visual",
  "Estrategia Creativa", "Motion Design", "Consultoría",
  "Diseño Web", "Branding", "Desarrollo Digital", "UX / UI", "Identidad Visual",
  "Estrategia Creativa", "Motion Design", "Consultoría",
];

const SERVICES = [
  { num: "01", name: "Diseño de Marca", desc: "Creamos identidades visuales que comunican con precisión quién eres y qué representas. Desde el logo hasta el sistema completo." },
  { num: "02", name: "Desarrollo Web", desc: "Sitios y aplicaciones web de alto rendimiento, construidos con tecnología moderna y atención obsesiva al detalle." },
  { num: "03", name: "UX & Estrategia", desc: "Diseñamos experiencias que convierten visitantes en clientes. Investigación, arquitectura de información y prototipado." },
  { num: "04", name: "Motion & Visual", desc: "Animaciones, videos y piezas visuales que dan vida a tu marca y capturan la atención en cualquier formato." },
];

const WORK_CARDS = [
  { bg: "#1E1C16", stroke: "#E8C832", shape: "circle", title: "Identidad — Arco Studio", tag: "Branding · 2024" },
  { bg: "#181A1E", stroke: "#8FB8E8", shape: "rect",   title: "App — Finora Pay",       tag: "UX/UI · 2024" },
  { bg: "#181E19", stroke: "#7EC89A", shape: "tri",    title: "Web — Nórdica Café",     tag: "Diseño Web · 2023" },
];

const ShapeIcon = ({ shape, stroke }) => {
  if (shape === "circle") return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="50" stroke={stroke} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="28" fill={stroke} fillOpacity="0.1" />
      <line x1="10" y1="60" x2="110" y2="60" stroke={stroke} strokeWidth="0.8" />
      <line x1="60" y1="10" x2="60" y2="110" stroke={stroke} strokeWidth="0.8" />
    </svg>
  );
  if (shape === "rect") return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <rect x="15" y="15" width="60" height="60" stroke={stroke} strokeWidth="1.2" />
      <rect x="28" y="28" width="34" height="34" fill={stroke} fillOpacity="0.1" />
    </svg>
  );
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <polygon points="45,8 80,72 10,72" stroke={stroke} strokeWidth="1.2" fill="none" />
      <circle cx="45" cy="52" r="14" fill={stroke} fillOpacity="0.1" />
    </svg>
  );
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">AXIOM<span>.</span></a>
        <ul className="nav-links">
          {["Servicios", "Trabajo", "Nosotros", "Contacto"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta">Hablemos</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg-text">AXIOM</div>
        <div className="hero-badge">Estudio Creativo · Est. 2020</div>
        <h1 className="hero-title reveal visible">
          Diseño que<br />
          <em>transforma</em><br />
          marcas.
        </h1>
        <div className="hero-bottom reveal visible" style={{ transitionDelay: "200ms" }}>
          <p className="hero-desc">
            Somos un estudio de diseño y desarrollo digital. Ayudamos a empresas a construir presencias digitales memorables que generan resultados reales.
          </p>
          <div className="hero-scroll">
            <span className="scroll-dot" />
            Desplaza para explorar
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="servicios">
        <Reveal>
          <p className="section-label">Lo que hacemos</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)" }}>
            Servicios diseñados<br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>para crecer.</em>
          </h2>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="service-item">
                <p className="service-num">{s.num}</p>
                <h3 className="service-name">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="trabajo" style={{ background: "var(--surface)", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div className="work-header">
          <Reveal>
            <p className="section-label">Proyectos</p>
            <h2 className="work-title">
              Trabajo<br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>selecto.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a href="#" className="work-link">Ver todo el trabajo →</a>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-card-bg" style={{ background: WORK_CARDS[0].bg }}>
                <ShapeIcon shape={WORK_CARDS[0].shape} stroke={WORK_CARDS[0].stroke} />
              </div>
              <div className="work-card-overlay">
                <p className="work-card-title">{WORK_CARDS[0].title}</p>
                <p className="work-card-tag">{WORK_CARDS[0].tag}</p>
              </div>
            </div>

            <div className="work-side">
              {[1, 2].map(n => (
                <div key={n} className="work-card">
                  <div className="work-card-bg" style={{ background: WORK_CARDS[n].bg }}>
                    <ShapeIcon shape={WORK_CARDS[n].shape} stroke={WORK_CARDS[n].stroke} />
                  </div>
                  <div className="work-card-overlay">
                    <p className="work-card-title">{WORK_CARDS[n].title}</p>
                    <p className="work-card-tag">{WORK_CARDS[n].tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="nosotros">
        <div className="about-inner">
          <Reveal>
            <h2 className="about-headline">
              Creemos en el poder del <em>diseño intencional.</em>
            </h2>
            <div className="stat-row">
              {[{ n: "120", s: "+", l: "Proyectos" }, { n: "4", s: " años", l: "De experiencia" }, { n: "98", s: "%", l: "Satisfacción" }].map(st => (
                <div key={st.l}>
                  <p className="stat-num">{st.n}<span>{st.s}</span></p>
                  <p className="stat-label">{st.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="about-text">
              Somos un equipo pequeño y dedicado con sede en Ciudad de México. Combinamos pensamiento estratégico con ejecución impecable para crear productos digitales que destacan en mercados saturados.
            </p>
            <p className="about-text">
              No trabajamos con cualquier cliente — elegimos proyectos donde podemos generar impacto real. Cada trabajo que entregamos refleja nuestra obsesión por los detalles y nuestro compromiso con la excelencia.
            </p>
            <button className="nav-cta" style={{ marginTop: "1rem" }}>Conoce al equipo</button>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contacto">
        <Reveal>
          <p className="section-label">¿Listo?</p>
          <h2 className="cta-title">
            Construyamos algo<br />
            <em>extraordinario.</em>
          </h2>
          <button className="cta-btn">Iniciar un proyecto</button>
          <p className="cta-sub">Sin compromisos · Respuesta en 24h</p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-logo">AXIOM<span>.</span></p>
        <ul className="footer-links">
          {["Servicios", "Trabajo", "Nosotros", "Contacto"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <p className="footer-copy">© 2025 Axiom Studio. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
