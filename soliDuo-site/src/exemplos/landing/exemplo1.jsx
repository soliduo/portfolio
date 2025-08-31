import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-[70vh] bg-white text-neutral-900">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
          Novo
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
          Título direto e curto sobre seu produto/serviço/evento
        </h1>

        <p className="mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
          Subtítulo de 1–2 linhas explicando o benefício principal.
          Foco no resultado que a pessoa quer, sem jargões.
        </p>

        <ul className="mt-6 space-y-2 text-sm md:text-base">
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-black" /> Benefício 1 objetivo</li>
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-black" /> Benefício 2 mensurável</li>
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-black" /> Benefício 3 com prova social</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/exemplos/landing/lead"
            className="rounded-2xl border px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow"
          >
            Quero garantir meu acesso
          </Link>
          <a href="#faq" className="text-sm underline underline-offset-4">
            Ver mais detalhes
          </a>
        </div>

        <p className="mt-3 text-xs text-neutral-500">Sem spam. Você pode sair quando quiser.</p>
      </section>

      <section id="faq" className="border-t bg-neutral-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">Perguntas frequentes</h2>
          <div className="mt-6 space-y-3">
            <details className="rounded-2xl border p-4 shadow-sm">
              <summary className="cursor-pointer list-none font-medium">Quanto tempo leva?</summary>
              <p className="mt-2 text-sm text-neutral-600">Normalmente 3–7 dias para uma landing como esta.</p>
            </details>
            <details className="rounded-2xl border p-4 shadow-sm">
              <summary className="cursor-pointer list-none font-medium">Integram com e-mail/CRM?</summary>
              <p className="mt-2 text-sm text-neutral-600">Sim: Mailchimp, EmailJS, Google Sheets, API própria…</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
