import { useState } from "react";
import { useNavigate } from "react-router-dom";

const saveLead = (lead) => {
  const key = "demo_leads";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  current.push({ ...lead, createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(current));
};

export default function Lead() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", consent: true });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = "Informe seu nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (form.telefone && form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!form.consent) errs.consent = "É necessário aceitar para continuar";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    saveLead({ ...form, source: "/exemplos/landing" });
    setDone(true);
  };

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <div className="rounded-3xl border p-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Pronto! 🎉</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Recebemos seus dados. Em breve você receberá um e-mail com as próximas etapas.
          </p>
          <button
            onClick={() => navigate("/exemplos/landing")}
            className="mt-6 rounded-2xl border px-4 py-2 text-sm font-medium shadow-sm hover:shadow"
          >
            Voltar para a landing
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Quero ser avisado / garantir meu acesso</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Preencha seus dados e avisaremos por e-mail/WhatsApp assim que estiver disponível.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
            placeholder="Seu nome completo"
          />
          {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
            placeholder="voce@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Telefone (opcional)</label>
          <input
            name="telefone"
            value={form.telefone}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
            placeholder="(11) 90000-0000"
          />
          {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input id="consent" name="consent" type="checkbox" checked={form.consent} onChange={onChange} className="h-4 w-4" />
          <label htmlFor="consent" className="text-sm text-neutral-700">
            Aceito receber comunicações e entendo que posso cancelar a qualquer momento.
          </label>
        </div>
        {errors.consent && <p className="-mt-2 text-xs text-red-600">{errors.consent}</p>}

        <button type="submit" className="w-full rounded-2xl border px-4 py-2 text-sm font-semibold shadow-sm hover:shadow">
          Enviar
        </button>
        <p className="text-xs text-neutral-500">
          Seus dados são usados exclusivamente para informar sobre este produto/serviço. Nada de spam.
        </p>
      </form>
    </main>
  );
}
