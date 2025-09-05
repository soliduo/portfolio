import { Link } from "react-router-dom";

function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}

function Badge({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            {children}
        </span>
    );
}


function CTA({ to, children, color = "red" }) {
    const colors = {
        red: "bg-red-600 hover:bg-red-700 focus:ring-red-400/60",
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

        </Link>
    );
}

export default function SaibaMaisCtrlC() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 text-gray-900">
            {/* Header simples */}
            <header className="border-b border-white/60 bg-white/70 backdrop-blur">
                <Container className="flex h-14 items-center justify-between">
                    <Link to="/#/exemplos/ctrlcv" className="text-sm font-semibold underline underline-offset-4">
                        ← Voltar à página principal
                    </Link>
                    <Badge>Mais detalhes</Badge>
                </Container>
            </header>

            {/* Hero / promessa clara */}
            <section className="bg-white/70 backdrop-blur">
                <Container className="py-10 md:py-14">
                    <h1 className="text-3xl font-black leading-tight md:text-5xl">
                        Domine o <span className="text-rose-700">Ctrl+C</span> / <span className="text-rose-700">Ctrl+V</span> para parecer
                        10x mais produtivo — com zero sofrimento
                    </h1>
                    <p className="mt-3 max-w-3xl text-lg text-gray-700">
                        Curso prático, direto ao ponto, com atalhos, scripts e táticas sociais.
                        Você vai aprender a <strong>copiar melhor</strong>, <strong>colar mais rápido</strong> e
                        <strong> sair com crédito</strong> (quase sempre 😂).
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <CTA to="/exemplos/ctrlcv/lead ">QUERO ME INSCREVER</CTA>
                        <Link to="/#/exemplos/ctrlcv" className="text-sm font-semibold underline underline-offset-4">
                            Ver a página de vendas
                        </Link>
                    </div>
                </Container>
            </section>

            {/* O que você vai aprender (currículo) */}
            <section className="py-12 md:py-16">
                <Container>
                    <h2 className="text-2xl font-extrabold md:text-3xl">Programa do curso</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {[
                            { t: "Módulo 1 — Fundamentos do Copiar & Colar", d: "Seleção ninja, múltiplas áreas de transferência e pegadinhas do formato." },
                            { t: "Módulo 2 — Colagens que brilham", d: "Colar sem bagunça (planilhas, docs, chats). Colar com estilo e sem formatação tóxica." },
                            { t: "Módulo 3 — Automação para preguiçosos", d: "Atalhos do sistema, Text Expanders e snippets que poupam horas." },
                            { t: "Módulo 4 — Scripts do respeito", d: "Templates prontos pra e-mails, relatórios e ‘respostas diplomáticas’." },
                            { t: "Módulo 5 — A arte social do crédito", d: "Como parecer pró mesmo colando (ética, etiqueta e sobrevivência em equipe)." },
                            { t: "Bônus — Toolbox", d: "Pacote de atalhos, snippets e modelos prontos para baixar." },
                        ].map((m, i) => (
                            <article key={i} className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm">
                                <h3 className="font-semibold text-rose-700">{m.t}</h3>
                                <p className="mt-1 text-sm text-gray-700">{m.d}</p>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Instrutor + prova social */}
            <section className="py-12 md:py-16">
                <Container>
                    <h2 className="text-2xl font-extrabold md:text-3xl">Quanto custa?</h2>
                    <p className="mt-2 text-gray-700">
                        Na pré-venda, menos que uma assinatura de café. Sem taxas escondidas.
                        Acesso vitalício e updates sempre que colarmos algo novo.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                            { t: "Acesso vitalício", d: "Veja e reveja quando quiser." },
                            { t: "7 dias de garantia", d: "Se não gostar, é só colar um e-mail pedindo reembolso." },
                            { t: "Bônus incluso", d: "Snippets e modelos prontos pra colar já." },
                        ].map((b, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm"
                            >
                                <h3 className="font-semibold">{b.t}</h3>
                                <p className="mt-1 text-sm text-gray-700">{b.d}</p>
                            </div>
                        ))}    </div>
                    <div className="mt-8 grid place-items-center gap-3">
                        <CTA to="/exemplos/ctrlcv/lead ">QUERO GARANTIR</CTA>
                        <Link
                            to="/#/exemplos/ctrlcv"
                            className="text-sm font-semibold underline underline-offset-4"
                        >
                            Ver a página de vendas
                        </Link>
                    </div>
                </Container>
            </section>

            {/* FAQ leve */}
            <section className="py-12 md:py-16">
                <Container>
                    <h2 className="text-2xl font-extrabold md:text-3xl">Perguntas frequentes</h2>
                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {[
                            { q: "Preciso saber algo antes?", a: "Só precisa saber apertar Ctrl e V. O resto a gente copia junto." },
                            { q: "Tem suporte?", a: "Sim, por e-mail. Respostas prontas, obviamente." },
                            { q: "Quando começam as aulas?", a: "Conteúdo gravado + encontros ao vivo na pré-venda." },
                            { q: "Certificado vale?", a: "Vale para autoestima e LinkedIn. Em alguns lugares, também." },
                        ].map((f, i) => (
                            <details key={i} className="rounded-2xl border border-rose-200 bg-white p-4 shadow-sm">
                                <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                                <p className="mt-2 text-sm text-gray-700">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Rodapé mini */}
            <footer className="border-t border-white/60 bg-white/70">
                <Container className="flex h-14 items-center justify-between text-xs text-gray-600">
                    <span>© {new Date().getFullYear()} — Curso Ctrl+C / Ctrl+V</span>
                    <Link to="/exemplos/ctrlcv/lead " className="font-semibold underline underline-offset-4">
                        Quero me inscrever
                    </Link>
                </Container>
            </footer>
        </main>
    );
}
