import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbyM34GNLEOPN9GNIR27qyxAiKrf29TmPXrzkfnd_fd3Nh2VQGIi1yTFZ_AzwxK5Ba0LMA/exec";

/** Extrai UTM/refs da URL pra enviar junto (opcional, mas útil) */
function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => {
    const p = new URLSearchParams(search);
    const pick = (k) => p.get(k) || "";
    return {
      utm_source: pick("utm_source"),
      utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"),
      utm_term: pick("utm_term"),
      ref: pick("ref"),
    };
  }, [search]);
}

export default function LeadCtrlCV() {
  const navigate = useNavigate();
  const utm = useQueryParams();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", consent: true, hp: "" });
  type Errors = {
    nome?: string;
    email?: string;
    telefone?: string;
    consent?: string;
    hp?: string;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // foco no primeiro campo
  useEffect(() => { document.getElementById("nome")?.focus(); }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const errs: Errors = {};
    if (!form.nome.trim()) errs.nome = "Informe seu nome";
    const email = form.email.trim().toLowerCase();
    if (form.telefone && form.telefone.replace(/\\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!form.consent) errs.consent = "É necessário aceitar para continuar";
    if (form.hp) errs.hp = "Bot detectado"; // honeypot
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!SHEETS_ENDPOINT || SHEETS_ENDPOINT.startsWith("COLE_AQUI")) {
      alert("Configure a URL do Google Apps Script em SHEETS_ENDPOINT.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        source: "/exemplos/ctrlc",
        ...utm,
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        consent: form.consent ? "yes" : "no",
        createdAt: new Date().toISOString(),
      };

      const r = await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(payload).toString(),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const data = await r.json().catch(() => ({}));
      if (data?.status !== "ok") {
        console.warn("Resposta do Apps Script:", data);
      }
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("Ops! Não conseguimos enviar. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 text-gray-900">
        <div className="mx-auto max-w-xl px-4 py-16">
          <div className="rounded-3xl border border-rose-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-semibold">Pronto! 🎉</h1>
            <p className="mt-2 text-sm text-gray-700">
              Você entrou para a lista do <strong>Curso Ctrl+C / Ctrl+V</strong>.
              Em breve enviaremos as próximas etapas por e-mail.
            </p>
            <button
              onClick={() => navigate("/exemplos/ctrlc")}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/60"
            >
              Voltar à página de vendas
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-gray-900">
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-black">Entre para a lista da pré-venda</h1>
        <p className="mt-2 text-sm text-gray-700">
          Cadastre-se para ser avisado e garantir o preço especial do <strong>Curso Ctrl+C / Ctrl+V</strong>.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-3xl border border-rose-200 bg-white p-6 shadow-sm">
          {/* honeypot invisível */}
          <input
            name="hp"
            value={form.hp}
            onChange={onChange}
            autoComplete="off"
            tabIndex={-1}
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-900">Nome</label>
            <input
              id="nome"
              name="nome"
              value={form.nome}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400/60"
              placeholder="Seu nome completo"
            />
            {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">E-mail</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400/60"
              placeholder="voce@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Telefone (opcional)</label>
            <input
              name="telefone"
              value={form.telefone}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400/60"
              placeholder="(11) 90000-0000"
            />
            {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={onChange}
              className="h-4 w-4 rounded border-rose-300 text-red-600 focus:ring-red-400/60"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              Aceito receber comunicações sobre este curso e entendo que posso cancelar a qualquer momento.
            </label>
          </div>
          {errors.consent && <p className="-mt-2 text-xs text-red-600">{errors.consent}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_8px_30px_rgba(0,0,0,.25)] focus:outline-none focus:ring-2 focus:ring-red-400/60
              ${loading ? "bg-red-400 cursor-wait" : "bg-red-600 hover:bg-red-700"}`}
          >
            {loading ? "Enviando..." : "Quero garantir minha vaga"}
          </button>
          <p className="text-xs text-gray-500">
            Enviamos com segurança. Nada de spam. {utm.utm_source ? `Fonte: ${utm.utm_source}` : ""}
          </p>
        </form>
      </div>
    </main>
  );
}
