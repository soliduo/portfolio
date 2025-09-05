import { Link } from "react-router-dom";

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

function Kicker() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600">
      <Container className="py-2 text-center text-sm font-semibold text-white">
        ⚠️ ATENÇÃO: inscrições relâmpago para o curso mais copiado do Brasil.
        <span className="ml-2 inline-block rounded-full bg-white/15 px-2 py-0.5">Vagas limitadas</span>
      </Container>
    </div>
  );
}

function CTA({ to, children, color = "red" }) {
  const colors = {
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-400/60",
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400/60",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-400/60",
  };

  return (
    <Link
      to={to}
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 
        text-base font-extrabold uppercase tracking-wide text-white 
        shadow-[0_8px_30px_rgba(0,0,0,.25)] transition hover:scale-[1.02] 
        focus:outline-none focus:ring-4 focus:ring-offset-2 animate-pulse
        ${colors[color]}
      `}
    >
      {children}
      <span className="inline-block rounded bg-white/20 px-2 py-0.5 text-xs">
        🔥 Imperdível
      </span>
    </Link>
  );
}


function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
      {kicker && <div className="text-xs font-semibold uppercase tracking-wider text-rose-600">{kicker}</div>}
      <h2 className="heading mt-1 text-2xl font-extrabold md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">{subtitle}</p>}
    </div>
  );
}

export default function LandingCtrlCV() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 text-gray-900">
      <Kicker />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-fuchsia-700 via-rose-600 to-amber-500 text-white">
        <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <Pill>Certificação oficial</Pill>
              <Pill>Sem pré-requisitos</Pill>
              <Pill>100% online</Pill>
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Curso Avançado em Usar <span className="underline decoration-yellow-300 decoration-4">Ctrl+C</span> / <span className="underline decoration-yellow-300 decoration-4">Ctrl+V</span> no Trabalho
            </h1>
            <p className="mt-3 text-lg font-medium md:text-xl">
              Certificação oficial em copiar, colar e parecer <span className="italic">ninja</span> da produtividade. ⌨️⚡
            </p>
            <ul className="mt-6 space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-white flex-none"/><span>Ganhe até <strong>3 horas por dia</strong> só no copiar-e-colar</span> </li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-white flex-none" /><span> Relatórios em <strong>2 segundos</strong> (promessa ousada, mas sensacionalista 😅)</span></li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-white flex-none" /><span><strong>Reconhecimento instantâneo</strong> da equipe por fazer “milagres”</span></li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTA to="/exemplos/ctrlcv/lead " color="green">Quero meu certificado AGORA</CTA>
              <Link to="/exemplos/ctrlcv/mais" className="text-sm font-semibold underline underline-offset-4">
                Quero saber mais
              </Link>
            </div>
            <p className="mt-3 text-xs text-white/80">+10.000 alunos que nunca mais usaram a tecla Delete.*</p>
          </div>

          {/* Arte chamativa */}
          <div className="relative">
            <div className="h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,.25)] backdrop-blur">
              <div className="flex h-full min-h-[320px] items-center justify-center p-8">
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                  {["Ctrl", "C", "Ctrl", "V", "Ctrl", "C", "Ctrl", "V", "Ctrl", "C", "Ctrl", "V"].map((t, i) => (
                    <div key={i} className="flex items-center justify-center rounded-xl border border-white/25 bg-white/10 p-6 text-2xl font-black tracking-wide">{t}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-yellow-300/30 blur-2xl" />
          </div>
        </Container>
      </section>

      {/* PROVA SOCIAL / BARRA DE CONFIANÇA */}
      <section className="border-b border-white/60 bg-white/60 backdrop-blur">
        <Container className="flex flex-wrap items-center justify-center gap-6 py-5 text-xs md:text-sm">
          <span className="font-semibold">Satisfação garantida</span>
          <span className="text-gray-600">7 dias de garantia</span>
          <span className="text-gray-600">Aulas curtas, direto ao ponto</span>
          <span className="text-gray-600">Certificado instantâneo</span>
        </Container>
      </section>

      {/* BENEFÍCIOS EXAGERADOS */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionTitle
            kicker="Resultados"
            title="O que vai acontecer com você (provavelmente)"
            subtitle="Disclaimer: nada aqui é uma promessa real, mas é divertido imaginar."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { t: "Copia 10x mais rápido", d: "Técnicas secretas de seleção e clonagem de texto." },
              { t: "Cola que cola mesmo", d: "Colagens imutáveis que desafiam o tempo e o Excel." },
              { t: "Macros do respeito", d: "Crie atalhos que te fazem parecer um mago da TI." },
              { t: "Scripts de desculpa", d: "Frases prontas para 'dar aquele migué' com elegância." },
              { t: "Relatórios instantâneos", d: "Aprenda a parecer ocupado enquanto saboreia um café." },
              { t: "Networking sem esforço", d: "Cole respostas prontas e vire referência no grupo." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-rose-700">{f.t} 🔥</h3>
                <p className="mt-1 text-sm text-gray-700">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PASSO A PASSO */}
      <section className="border-y border-amber-200 bg-amber-100/60">
        <Container className="py-16 md:py-20">
          <SectionTitle kicker="Passo a passo" title="Como você vira ninja em 3 etapas" subtitle="" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: "1", t: "Copiar", d: "Aprenda a capturar o melhor do mundo com um simples Ctrl+C." },
              { n: "2", t: "Colar", d: "Domine o timing perfeito do Ctrl+V para parecer genial." },
              { n: "3", t: "Vencer", d: "Leve os créditos com um sorriso discreto e um atalho pronto." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-extrabold text-white">{s.n}</div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-gray-700">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <CTA to="/exemplos/ctrlcv/lead " color="red">Quero meu certificado AGORA</CTA>
          </div>
        </Container>
      </section>

      {/* FAQ nonsense */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionTitle kicker="FAQ" title="Perguntas que já colamos antes" subtitle="" />
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { q: "Posso colar sem copiar?", a: "Tecnicamente não, mas você vai aprender a parecer que pode." },
              { q: "Funciona em Mac, Windows e vida amorosa?", a: "Nos dois primeiros sim; no terceiro, resultados variam." },
              { q: "Tem certificado mesmo?", a: "Sim, com fonte em negrito pra dar credibilidade imediata." },
              { q: "É legal?", a: "Desde que você tenha copiado com consentimento do CTRL, sim." },
            ].map((f, i) => (
              <details key={i} className="rounded-2xl border border-rose-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-gray-500">* Estimativa baseada em uma planilha altamente questionável.</p>
        </Container>
      </section>
    </main>
  );
}
