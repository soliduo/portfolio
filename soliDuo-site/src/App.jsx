import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MessagesSquare,
  Phone,
  Sparkles,
  Sun,
  Moon,
  Facebook,
  Instagram,
  PhoneCallIcon,
  AlignCenter,
  Menu,
  X,
} from "lucide-react";
import "./index.css";
import logoDark from '/logo_soliduo_preto.png';
import logoLight from '/logo_soliduo_branco.png';
import { FaWhatsapp } from "react-icons/fa";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import ExemploLanding1 from "./exemplos/landing/perfume.jsx";
import LeadExemplo1 from "./exemplos/landing/lead/leadPerfume.jsx";
import CursoCtrlC from "./exemplos/landing/cursoCtrlC.tsx";
import SaibaMaisCtrlC from "./exemplos/landing/saibaMaisCtrlC.jsx";
import LeadCtrlC from "./exemplos/landing/lead/leadCtrlC";

const BRAND = {
  name: "SoliDuo",
  tagline: "Experiências digitais, com sofisticação e sem complicação.",
  email: "soliduo.contact@gmail.com",
  whatsapp: "https://wa.me/5516997372610",
  linkedin: "linkedin.com/in/soliduo",
  facebook: "SoliDuo",
  instagram: "Soliduo.official",
};

const ABOUT = [
  {
    title: "Missão",
    desc: "Transformar ideias em experiências digitais únicas, criando páginas e automações personalizadas que conectam pessoas e negócios de forma criativa, acessível e inovadora.",
  },
  {
    title: "Visão",
    desc: "Ser referência internacional em soluções digitais criativas, democratizando o acesso a tecnologia de qualidade para todos — de pequenos empreendedores a grandes sonhadores.",
  },
  {
    title: "Valores",
    desc: "Personalização – Cada projeto é único, feito sob medida para refletir a identidade e o sonho de quem confia na gente.\n" + "Acessibilidade – Tornar tecnologia e inovação algo possível para todos, sem barreiras de tamanho ou orçamento.\n" + "Criatividade – Pensar fora da caixa e transformar até ideias inusitadas em realidade digital.\n" + "Parceria – Caminhar lado a lado com cada cliente, entendendo suas necessidades e tornando-se parte da sua história.\n" + "Inovação Humana – Usar tecnologia para aproximar pessoas, simplificar processos e criar impacto positivo.",
  },
];

const SERVICES = [
  {
    title: "Landing Pages", badge: "Conversão & SEO",
    desc: "Páginas rápidas, acessíveis e com copy pensada para gerar leads.",
    bullets: ["Core Web Vitals", "SEO técnico", "Formulários integrados"],
  },
  {
    title: "Páginas de Eventos", badge: "Casamentos, Batizados e Festas",
    desc: "Convites digitais com RSVP, lista de presentes e mapas.",
    bullets: ["Tema personalizado", "Confirmação de presença", "Galeria de fotos"],
  },
  {
    title: "Portfólios", badge: "Artistas & Profissionais",
    desc: "Mostre seu trabalho com elegância e performance.",
    bullets: ["Grid responsivo", "CMS/Notion opcional", "Blog/Postagens"],
  },
  {
    title: "Automação WhatsApp", badge: "n8n / Agendamentos",
    desc: "Fluxos automatizados para atendimento e agendar serviços.",
    bullets: ["Disparo contextual", "Coleta de dados", "Webhook + CRM"],
  },
];

const WORKS = [
  {
    title: "Landing de Produtos", desc: "Estrutura enxuta focada em conversão e captura de leads.",
    stack: ["React", "Tailwind", "Leads"],
    img: "https://img.freepik.com/fotos-premium/ultra-realista-fundo-laranja-4k-foto-hd-para-o-produto_1193781-21506.jpg?w=1480",
    link: "#/exemplos/perfume",
  },
  {
    title: "Landing de Infoprodutos", desc: "Estrutura enxuta focada em conversão com testes A/B.",
    stack: ["React", "Tailwind", "Google Sheets"],
    img: "https://flammadesign.com.br/wp-content/uploads/2024/04/egy-connting-digital-devices-concept-scaled.webp",
    link: "#/exemplos/ctrlc",
  },
  {
    title: "Convite de Casamento Digital", desc: "Página com RSVP, mapa e lista de presentes integrada.",
    stack: ["Vite", "Tailwind"],
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Portfólio Fotógrafa", desc: "Grid leve e otimização de imagens em tempo real.",
    stack: ["React", "SSR opcional"],
    img: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1600&auto=format&fit=crop"
  },
];

const FLOW = [
  {
    icon: <Sparkles className="h-5 w-5" />, title: "Briefing em 30 min",
    text: "Entendemos objetivo, público e referências. Pode ser por WhatsApp mesmo."
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />, title: "Protótipo rápido",
    text: "Você valida visual e conteúdo; ajustamos antes de codar."
  },
  {
    icon: <CalendarClock className="h-5 w-5" />, title: "Entrega express",
    text: "Landing simples em dias, evento com RSVP em até 1–2 semanas."
  },
];

function Container({ children }) {
  return <div className="mx-auto w-full max-w-6xl px-5">{children}</div>;
}
const normalizeUrl = (u) => {
  if (!u) return "#";
  if (/^https?:\/\//i.test(u)) return u;
  if (/^www\./i.test(u)) return `https://${u}`;
  return `https://${u}`;
};
const facebookUrl = (val) => /^https?:\/\//i.test(val) ? val : `https://facebook.com/${encodeURIComponent(val)}`;
const instagramUrl = (val) => /^https?:\/\//i.test(val) ? val : `https://instagram.com/${encodeURIComponent(val)}`;

const THEME_MODES = /** @type const */ (["system", "light", "dark"]);
const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function getInitialMode() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { }
  return "system";
}
function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "system") { root.removeAttribute("data-theme"); try { localStorage.removeItem("theme"); } catch { }; }
  else { root.setAttribute("data-theme", mode); try { localStorage.setItem("theme", mode); } catch { }; }
}

function Nav() {
  const [mode, setMode] = useState(getInitialMode);
  const [systemDark, setSystemDark] = useState(prefersDark());
  const [open, setOpen] = useState(false);

  useEffect(() => { applyTheme(mode); }, [mode]);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystemDark(e.matches);
    if (mode === "system") {
      setSystemDark(mq.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }
  }, [mode]);

  const effectiveTheme = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  const nextTheme = effectiveTheme === "dark" ? "light" : "dark";
  const themeIcon = nextTheme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
  const label = `Tema: ${nextTheme}`;
  const MODES = /** @type const */ (["system", "light", "dark"]);
  const cycleMode = () => { const i = MODES.indexOf(mode); setMode(MODES[(i + 1) % MODES.length]); };
  const navAndClose = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft bg-[rgb(var(--bg)/0.7)] backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* logo/link */}
          <div href="#top" className="flex items-center gap-3 text-lg font-extrabold heading" onClick={navAndClose}>
            <img
              src={effectiveTheme === "dark" ? logoDark : logoLight}
              alt="Logo SoliDuo"
              className="h-6 w-6"
            />
            <span>Soli<span className="text-[rgb(var(--brand))]">Duo</span></span>
          </div>

          {/* desktop */}
          <div className="heading hidden md:flex items-center gap-6">
            <a href="#top" className="hover:opacity-80">Home</a>
            <a href="#sobre" className="hover:opacity-80">Sobre Nós</a>
            <a href="#servicos" className="hover:opacity-80">Serviços</a>
            <a href="#portfolio" className="hover:opacity-80">Portfólio</a>
            <a href="#contato" className="hover:opacity-80">Contato</a>
            <button onClick={cycleMode} className="rounded p-2 hover:bg-white/5" aria-label={label} title={label}>
              {themeIcon}
            </button>
          </div>

          {/* mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={cycleMode} className="rounded p-2 hover:bg-white/5" aria-label={label} title={label}>
              {themeIcon}
            </button>
            <button
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded p-2 hover:bg-white/5"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* drawer mobile */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-soft bg-[rgb(var(--bg))]">
          <Container>
            <div className="heading flex flex-col py-3">
              <a href="#top" onClick={navAndClose} className="py-2">Home</a>
              <a href="#sobre" onClick={navAndClose} className="py-2">Sobre Nós</a>
              <a href="#servicos" onClick={navAndClose} className="py-2">Serviços</a>
              <a href="#portfolio" onClick={navAndClose} className="py-2">Portfólio</a>
              <a href="#contato" onClick={navAndClose} className="py-2">Contato</a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <Container>
      <section className="grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="heading text-4xl font-extrabold leading-tight md:text-6xl">
            {BRAND.tagline}
          </motion.h1>
          <p className="mt-4 text-lg text-muted">
            Fazemos <span className="text-[rgb(var(--brand))] font-semibold">landing pages</span>,
            páginas para <span className="text-[rgb(var(--brand))] font-semibold">casamentos, batizados e festas</span>,
            <span className="text-[rgb(var(--brand))] font-semibold"> portfólios profissionais</span> e
            <span className="text-[rgb(var(--brand))] font-semibold"> automações de WhatsApp</span> (agendamentos e atendimento).
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#portfolio" className="btn-primary inline-flex items-center gap-2 hover:opacity-90">
              Ver trabalhos <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contato" className="btn-ghost inline-flex items-center gap-2">
              Orçar agora
            </a>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-[1.5rem] border border-soft shadow-[0_8px_30px_rgba(0,0,0,.25)] bg-[rgb(var(--card))]">
            <img
              src="https://www.free-mockup.com/wp-content/uploads/edd/2024/09/Responsive-Scene-Device-Free-Mockups-01.jpg.webp"
              alt="Mockup de site e automações"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* imagem em fundo preto https://www.free-mockup.com/wp-content/uploads/edd/2024/12/Realistic-Device-Mockup-Free-Set-02.jpg.webp 
            imagem em fundo brancohttps://www.free-mockup.com/wp-content/uploads/edd/2024/12/Realistic-Device-Mockup-Free-Set-01.jpg.webp
            outra opção https://www.free-mockup.com/wp-content/uploads/edd/2020/05/Free-Apple-Multi-Device-Mockup-Top-View-1000x750.jpg.webp
            outra imagem https://www.free-mockup.com/wp-content/uploads/edd/2020/05/Digital-Device-Mockup-Freebie-1000x750.jpg*/}
          </div>
        </motion.div>
      </section>
    </Container>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="heading mt-2 text-2xl font-bold md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-muted">{subtitle}</p> : null}
    </div>
  );
}

function About() {
  return (
    <Container>
      <section id="sobre" className="py-16 md:py-20">
        <SectionTitle
          title="Sobre Nós"
          subtitle="Duas pessoas que querem usar seu amor pela tecnologia para ajudar outras pessoas."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {ABOUT.map((s, i) => (
            <article
              key={s.title}
              className={`
          overflow-hidden rounded-[1.25rem] border border-soft 
          bg-[rgb(var(--card))] p-5 shadow-[0_8px_30px_rgba(0,0,0,.25)]
          ${i === 2 ? "sm:col-span-2 lg:col-span-2" : ""}
        `}
            >
              <h3 className="heading mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted whitespace-pre-line">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

    </Container>
  );

}

function Services() {
  return (
    <Container>
      <section id="servicos" className="py-16 md:py-20">
        <SectionTitle title="Serviços"
          subtitle="Do convite digital à landing de alta conversão — com automação de ponta a ponta." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-5 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
              <div className="text-[rgb(var(--accent))] text-sm font-semibold">{s.badge}</div>
              <h3 className="heading mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {s.bullets.map((b) => <li key={b}>• {b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

// function Events() {
//   return (
//     <Container>
//       <section id="eventos" className="py-16 md:py-20">
//         <SectionTitle title="Casamentos, batizados e festas"
//           subtitle="Convites digitais completos com RSVP, listas, mapas e álbum." />
//         <div className="grid gap-6 md:grid-cols-2">
//           <div className="rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-6 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//             <h3 className="heading text-lg font-semibold">Convites digitais personalizados</h3>
//             <p className="mt-2 text-sm text-muted">Tema do seu jeito, domínio próprio e atualização fácil. Integração com lista de presentes e Google Maps.</p>
//             <ul className="mt-3 space-y-1 text-sm text-muted">
//               <li>• RSVP com confirmação via WhatsApp</li>
//               <li>• Agenda e cronograma do evento</li>
//               <li>• Álbum pós-evento</li>
//             </ul>
//           </div>
//           <div className="overflow-hidden rounded-[1.25rem] border border-soft shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//             <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1640&auto=format&fit=crop"
//               alt="Página de evento" className="h-full w-full object-cover" loading="lazy" />
//           </div>
//         </div>
//       </section>
//     </Container>
//   );
// }

// function Portfolio() {
//   return (
//     <Container>
//       <section id="portfolio" className="py-16 md:py-20">
//         <SectionTitle title="Portfólio"
//           subtitle="Cada projeto nasce de um problema real — e termina em uma solução simples e sofisticada." />
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {/* {WORKS.map((p) => (
//             <article key={p.title} className="group overflow-hidden rounded-[1.25rem] border border-soft shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//               <div className="relative aspect-video overflow-hidden">
//                 <img src={p.img} alt={p.title}
//                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
//               </div>
//               <div className="p-5 bg-[rgb(var(--card))]">
//                 <h3 className="heading text-lg font-semibold">{p.title}</h3>
//                 <p className="mt-2 text-sm text-muted">{p.desc}</p>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
//                 </div>
//               </div>
//             </article>
//           ))} */}
//           {WORKS.map((p) => (
//             <article
//               key={p.title}
//               className="group overflow-hidden rounded-[1.25rem] border border-soft shadow-[0_8px_30px_rgba(0,0,0,.25)]"
//             >
//               <div className="relative aspect-video overflow-hidden">
//                 {p.link ? (
//                   <a href={p.link} target="_blank" rel="noopener noreferrer">
//                     <img
//                       src={p.img}
//                       alt={p.title}
//                       className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
//                       loading="lazy"
//                     />
//                   </a>
//                 ) : (
//                   <img
//                     src={p.img}
//                     alt={p.title}
//                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
//                     loading="lazy"
//                   />
//                 )}
//               </div>
//               <div className="p-5 bg-[rgb(var(--card))]">
//                 <h3 className="heading text-lg font-semibold">
//                   {p.link ? <a href={p.link}>{p.title}</a> : p.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-muted">{p.desc}</p>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {p.stack.map((s) => (
//                     <span key={s} className="chip">{s}</span>
//                   ))}
//                 </div>
//               </div>
//             </article>
//           ))}

//         </div>
//       </section>
//     </Container>
//   );
// }
function PortfolioCard({ p }) {
  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-soft shadow-[0_8px_30px_rgba(0,0,0,.25)] bg-[rgb(var(--card))]">
      <div className="relative aspect-[3/2] overflow-hidden">
        {p.link ? (
          <a href={p.link}>
            <img
              src={p.img}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </a>
        ) : (
          <img
            src={p.img}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="heading text-lg font-semibold">
          {p.link ? <a href={p.link}>{p.title}</a> : p.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{p.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Carousel({ items }) {
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);

  // Autoplay
  useEffect(() => {
    if (!ref.current) return;
    const GAP = 24; // gap-6
    const tick = () => {
      if (isHover) return;
      const first = el.querySelector(":scope > * > div"); // pega o div com width %
      if (!first) return;
      const w = first.getBoundingClientRect().width + GAP;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + w, behavior: atEnd ? "auto" : "smooth" });
    };

    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [isHover]);

  const getStep = () => {
    const el = ref.current;
    if (!el) return 0;
    const first = el.querySelector(":scope > *");
    const second = first?.nextElementSibling;
    // distância entre o início do 1º e o início do 2º (inclui margens/gaps)
    if (first && second) return second.offsetLeft - first.offsetLeft;
    // fallback: largura do primeiro item
    return first?.getBoundingClientRect().width || el.clientWidth;
  };

  const go = (dir = 1) => {
    const el = ref.current;
    if (!el) return;
    const step = getStep();
    const max = el.scrollWidth - el.clientWidth;
    const next = el.scrollLeft + dir * step;

    if (next < 0) {
      // voltar do início → vai pro fim
      el.scrollTo({ left: max, behavior: "auto" });
    } else if (next > max - 2) {
      // avançar do fim → volta pro início
      el.scrollTo({ left: 0, behavior: "auto" });
    } else {
      el.scrollTo({ left: next, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* track */}
      <div
        ref={ref}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {items.map((p, i) => (
          <div key={p.title + i} className="snap-start flex-none px-2">
            {/* 1 card ocupa 100% no mobile, 50% no md, 33% no lg */}
            <div className="w-[90vw] sm:w-[45vw] lg:w-[30vw]">
              <PortfolioCard p={p} />
            </div>
          </div>
        ))}
      </div>

      {/* setas (escondo em <md) */}
      <button
        onClick={() => go(-1)}
        className="hidden md:flex absolute left-[-12px] top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-soft bg-[rgb(var(--card))] p-2 shadow hover:opacity-90"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-soft bg-[rgb(var(--card))] p-2 shadow hover:opacity-90"
        aria-label="Próximo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function Portfolio() {
  // opcional: duplica a lista pra loop mais “cheio”
  const items = [...WORKS, ...WORKS];

  return (
    <Container>
      <section id="portfolio" className="py-16 md:py-20">
        <SectionTitle
          title="Portfólio"
          subtitle="Cada projeto nasce de um problema real — e termina em uma solução simples e sofisticada."
        />
        <Carousel items={items} />
      </section>
    </Container>
  );
}

// function Automation() {
//   return (
//     <Container>
//       <section id="automacao" className="py-16 md:py-20">
//         <SectionTitle title="WhatsApp + n8n = atendimento 24/7"
//           subtitle="Captação de leads, agendamentos e follow-ups automáticos." />
//         <div className="grid gap-6 md:grid-cols-3">
//           {FLOW.map((step) => (
//             <div key={step.title} className="rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-5 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//               <div className="flex items-center gap-2 text-[rgb(var(--accent))]">{step.icon}<span className="text-sm font-semibold">Etapa</span></div>
//               <h3 className="heading mt-1 text-base font-semibold">{step.title}</h3>
//               <p className="mt-1 text-sm text-muted">{step.text}</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-5 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
//           <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//             <div>
//               <h3 className="heading text-lg font-semibold">Agendamentos automatizados</h3>
//               <p className="text-sm text-muted">Cliente escolhe horário pelo WhatsApp, n8n valida disponibilidade e confirma. Integração com Google Calendar/Sheets/CRM.</p>
//             </div>
//             <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
//               className="btn-primary inline-flex items-center gap-2">
//               <MessagesSquare className="h-4 w-4" /> Falar no WhatsApp
//             </a>
//           </div>
//         </div>
//       </section>
//     </Container>
//   );
// }

function Contact() {
  const linkedinHref = normalizeUrl(BRAND.linkedin);
  const facebookHref = facebookUrl(BRAND.facebook);
  const instagramHref = instagramUrl(BRAND.instagram);

  return (
    <Container>
      <section id="contato" className="py-16 md:py-20">
        <SectionTitle title="Contato" subtitle="Atendemos Brasil todo, remoto. Resposta rápida!" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-6 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
            <h3 className="heading font-semibold">Fale com a SoliDuo</h3>
            <p className="mt-2 text-sm text-muted">Preferimos primeiro contato por e-mail ou WhatsApp. Passamos valores após entender escopo.</p>
            <div className="mt-4 grid gap-2">
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 rounded-xl border border-soft px-3 py-2 hover:bg-white/5"><Mail className="h-4 w-4" /> {BRAND.email}</a>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-soft px-3 py-2 hover:bg-white/5"><FaWhatsapp className="h-4 w-4" /> WhatsApp</a>
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-soft px-3 py-2 hover:bg-white/5"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-soft px-3 py-2 hover:bg-white/5"><Facebook className="h-4 w-4" /> Facebook</a>
              <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-soft px-3 py-2 hover:bg-white/5"><Instagram className="h-4 w-4" /> Instagram</a>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-soft bg-[rgb(var(--card))] p-6 shadow-[0_8px_30px_rgba(0,0,0,.25)]">
            <h3 className="heading font-semibold">Dicas para orçamento assertivo</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted">
              <li>• Tipo de projeto (landing, evento, portfólio, automação).</li>
              <li>• Prazos, referências e conteúdo disponível.</li>
              <li>• Se já tem domínio/hospedagem e integrações desejadas.</li>
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}

function HomeApp() {
  return (
    <div id="top" className="min-h-screen text-[rgb(var(--text))]" style={{ backgroundColor: "rgb(var(--bg))" }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        {/* <Events /> */}
        <Portfolio />
        {/* <Automation /> */}
        <Contact />
      </main>

      <footer className="fixed bottom-0 left-0 w-full border-t border-soft py-4 bg-app z-50">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted md:flex-row">
            <p>© {new Date().getFullYear()}. Feito com 🩵 por {BRAND.name}. </p>
            <div className="flex items-center gap-3">
              <a href={normalizeUrl(BRAND.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><FaWhatsapp className="h-4 w-4" /></a>
              <a href={instagramUrl(BRAND.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><Instagram className="h-4 w-4" /></a>
              <a href={facebookUrl(BRAND.facebook)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><Facebook className="h-4 w-4" /></a>
              <a href={normalizeUrl(BRAND.linkedin)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-80"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/exemplos/perfume" element={<ExemploLanding1 />} />
        <Route path="/exemplos/ctrlc" element={<CursoCtrlC />} />
        <Route path="/exemplos/landing/lead" element={<LeadExemplo1 />} />
        <Route path="/exemplos/ctrlc/mais" element={<SaibaMaisCtrlC />} />
        <Route path="/exemplos/ctrlcv/lead" element={<LeadCtrlC />} />
      </Routes>
    </HashRouter>
  );
}