import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/** ========= Config =========
 * Ajuste a data/hora do lançamento (fuso de São Paulo).
 * Ex.: 15/set/2025 às 20:00 BRT
 */
const LAUNCH_ISO = "2025-09-15T20:00:00-03:00";

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

/** Contagem regressiva */
function useCountdown(targetISO) {
    const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const diff = Math.max(0, target - now);
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return { diff, days, hours, minutes, seconds };
}
function Countdown({ targetISO }) {
    const { diff, days, hours, minutes, seconds } = useCountdown(targetISO);
    const ended = diff === 0;
    return (
        <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-2 text-sm shadow-sm">
            {ended ? (
                <span>Lançamento liberado! 🎉</span>
            ) : (
                <>
                    <span className="font-medium text-gray-800">Falta:</span>
                    <time className="tabular-nums text-gray-700">
                        {String(days).padStart(2, "0")}d :
                        {String(hours).padStart(2, "0")}h :
                        {String(minutes).padStart(2, "0")}m :
                        {String(seconds).padStart(2, "0")}s
                    </time>
                </>
            )}
        </div>
    );
}

export default function Landing() {
    const launchDate = new Date(LAUNCH_ISO).toLocaleString("pt-BR", {
        dateStyle: "long",
        timeStyle: "short",
    });

    return (
        <main className="min-h-screen bg-amber-50 text-gray-800">
            {/* HERO */}
            <section className="border-b border-amber-100">
                <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-20">
                    <div className="flex flex-col justify-center">
                        <Badge>Lançamento</Badge>
                        <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                            Perfume <span className="text-indigo-700">Tiro e Queda</span>
                        </h1>
                        <p className="mt-3 text-lg font-medium text-gray-900">
                            Não custa mais que uma moeda. 💰
                        </p>
                        <p className="mt-3 max-w-2xl text-base text-gray-700 md:text-lg">
                            Fragrância autoral, fixação surpreendente e fórmula hipoalergênica.
                            Um clássico instantâneo para o dia a dia — simples, elegante e inesquecível.
                        </p>

                        <ul className="mt-6 space-y-2 text-sm md:text-base">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full flex-none bg-gray-800" /><span>
                                    <strong>Fixação até 12h</strong> em condições de uso comum
                                </span></li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full flex-none bg-gray-800" /><span>
                                    <strong>Notas cítricas e amadeiradas</strong> — versátil do trabalho ao happy hour</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full flex-none bg-gray-800" /><span>
                                    <strong>Preço acessível</strong> (pré-venda limitada)</span>
                            </li>
                        </ul>

                        <Countdown targetISO={LAUNCH_ISO} />

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Button to="/exemplos/landing/lead">Quero garantir</Button>
                            <a href="#detalhes" className="text-sm font-medium text-gray-700 underline underline-offset-4">
                                Detalhes e perguntas
                            </a>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Lançamento em {launchDate}. Produtos limitados na pré-venda.
                        </p>
                    </div>

                    {/* mock visual neutro */}
                    <div className="relative">
                        <div className="h-full w-full overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">
                            <img
                                src="https://www.stockvault.net/data/2017/12/26/241091/preview16.jpg"
                                alt="Perfume Tiro e Queda"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <p className="mt-2 text-center text-xs text-gray-500">
                            Imagem ilustrativa do produto
                        </p>

                    </div>
                </Container>
            </section>

            {/* DETALHES */}
            <section id="detalhes" className="py-14 md:py-20">
                <Container>
                    <h2 className="text-2xl font-semibold md:text-3xl">Por que “Tiro e Queda”?</h2>
                    <p className="mt-2 max-w-2xl text-sm text-gray-700 md:text-base">
                        Criado para ser seu perfume curinga: funciona em qualquer ocasião, não pesa no bolso e rende elogios.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            { t: "Fórmula hipoalergênica", d: "Pensada para peles sensíveis (uso diário)." },
                            { t: "Volume inteligente", d: "Frasco compacto — cabe na bolsa/mochila." },
                            { t: "Sem frescura", d: "Cheiro limpo, elegante e confortável." },
                            { t: "Sem teste em animais", d: "Compromisso com bem-estar." },
                            { t: "Pré-venda limitada", d: "Preço especial de lançamento." },
                            { t: "Entrega nacional", d: "Envio para todo o Brasil." },
                        ].map((f) => (
                            <div key={f.t} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
                                <h3 className="font-medium text-gray-900">{f.t}</h3>
                                <p className="mt-1 text-sm text-gray-600">{f.d}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-700">
                            “Usei no trabalho e fui direto pro jantar — a fixação segurou e ouvi <em>vários</em> elogios.”
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-600">— Cliente piloto</p>
                    </div>
                </Container>
            </section>

            {/* FAQ */}
            <section id="faq" className="border-t border-amber-100 bg-amber-100/40">
                <Container className="py-14 md:py-20">
                    <h2 className="text-2xl font-semibold md:text-3xl">Perguntas frequentes</h2>
                    <div className="mt-6 space-y-3">
                        {[
                            { q: "Quando começa a pré-venda?", a: "Na data do lançamento acima. Cadastre-se para garantir o preço especial." },
                            { q: "Qual o tamanho do frasco?", a: "Compacto para levar na bolsa — perfeito para o dia a dia." },
                            { q: "É unissex?", a: "Sim — notas equilibradas para qualquer pessoa." },
                        ].map((item, idx) => (
                            <details key={idx} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
                                <summary className="cursor-pointer list-none font-medium text-gray-900">{item.q}</summary>
                                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                            </details>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Button to="/exemplos/landing/lead">Quero garantir</Button>
                    </div>
                </Container>
            </section>
        </main>
    );
}
