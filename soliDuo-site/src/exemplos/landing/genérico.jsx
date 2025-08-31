import { Link } from "react-router-dom";

/** Utilitários genéricos */
function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-amber-700">
      {children}
    </span>
  );
}

function Button({ to, children }) {
  const cls =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold " +
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <button className={cls}>{children}</button>
  );
}

export default function Landing() {
  return (
    <main className="min-h-screen bg-amber-50 text-gray-800">
      {/* HERO */}
      <section className="border-b border-amber-100">
        <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <Badge>Novo</Badge>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Título direto e curto sobre seu produto/serviço/evento
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-700 md:text-lg">
              Subtítulo de 1–2 linhas explicando o benefício principal. Foco no resultado que a pessoa quer,
              sem jargões.
            </p>

            <ul className="mt-6 space-y-2 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                Benefício 1 objetivo
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                Benefício 2 mensurável
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                Benefício 3 com prova social
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/exemplos/landing/lead">Quero garantir meu acesso</Button>
              <a href="#detalhes" className="text-sm font-medium text-gray-700 underline underline-offset-4">
                Ver mais detalhes
              </a>
            </div>

            <p className="mt-3 text-xs text-gray-500">Sem spam. Você pode sair quando quiser.</p>
          </div>

          {/* mock visual neutro */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">
              <div className="flex h-full w-full items-center justify-center">
                <div className="mx-auto max-w-sm p-6">
                  <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
                    <div className="h-6 w-24 rounded bg-amber-100" />
                    <div className="mt-3 h-3 w-40 rounded bg-amber-100" />
                    <div className="mt-1 h-3 w-32 rounded bg-amber-100" />
                    <div className="mt-6 flex gap-2">
                      <div className="h-8 w-24 rounded border border-amber-200 bg-white" />
                      <div className="h-8 w-24 rounded border border-amber-200 bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-gray-500">Mockup genérico (sem direitos autorais)</p>
          </div>
        </Container>
      </section>

      {/* DETALHES */}
      <section id="detalhes" className="py-14 md:py-20">
        <Container>
          <h2 className="text-2xl font-semibold md:text-3xl">Tudo o que você precisa, sem distrações</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-700 md:text-base">
            Landing objetiva com CTA único. Estrutura pensada para conversão: promessa clara, benefícios, prova
            social e um botão de ação.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { t: "Copy que converte", d: "Foco no problema do cliente e no benefício final." },
              { t: "CTA único", d: "Nada de 10 caminhos. Só o próximo passo certo." },
              { t: "Formulário enxuto", d: "Nome e e-mail (e telefone, se fizer sentido)." },
              { t: "Responsiva", d: "Bonita no celular, tablet e desktop." },
              { t: "Rápida", d: "Sem bloat. Carrega leve e passa confiança." },
              { t: "Privacidade", d: "Uso claro dos dados e opt-out." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
                <h3 className="font-medium text-gray-900">{f.t}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-700">
              “Coloque aqui um depoimento curto. Ex.: <em>Economizei 2 semanas de trabalho e vendi 30% a mais em 10 dias.</em>”
            </p>
            <p className="mt-2 text-xs font-medium text-gray-600">— Cliente Satisfeito</p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-amber-100 bg-amber-100/40">
        <Container className="py-14 md:py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Perguntas frequentes</h2>
          <div className="mt-6 space-y-3">
            {[
              { q: "Quanto tempo leva?", a: "Normalmente 3–7 dias para uma landing como esta." },
              { q: "Integram com e-mail/CRM?", a: "Sim: EmailJS, Formspree, Google Sheets, API própria…" },
              { q: "Posso personalizar o design?", a: "Sim — cores, tipografia e seções são 100% ajustáveis." },
            ].map((item, idx) => (
              <details key={idx} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-medium text-gray-900">{item.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
