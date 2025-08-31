import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

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

    emailjs.send(
      "service_3usswqh",
      "template_k4wsy2l",
      {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        createdAt: new Date().toLocaleString("pt-BR"),
      },
      "doLE-xzIiNAJQ4Xn7"
    )
      .then(() => {
        setDone(true);
      })
      .catch((err) => {
        console.error("Erro ao enviar lead:", err);
        alert("Ops! Não conseguimos enviar. Tente novamente.");
      });
  };

  if (done) {
    return (
      <main className="min-h-screen bg-amber-50 text-gray-800">
        <div className="mx-auto max-w-xl px-4 py-16">
          <div className="rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-semibold">Pronto! 🎉</h1>
            <p className="mt-2 text-sm text-gray-700">
              Recebemos seus dados. Em breve você receberá um e-mail com as próximas etapas.
            </p>
            <button
              onClick={() => navigate("/exemplos/landing")}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Voltar para a landing
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 text-gray-800">
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Quero ser avisado / garantir meu acesso</h1>
        <p className="mt-2 text-sm text-gray-700">
          Preencha seus dados e avisaremos por e-mail/WhatsApp assim que estiver disponível.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-900">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
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
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
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
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
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
              className="h-4 w-4 rounded border-amber-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              Aceito receber comunicações e entendo que posso cancelar a qualquer momento.
            </label>
          </div>
          {errors.consent && <p className="-mt-2 text-xs text-red-600">{errors.consent}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enviar
          </button>
          <p className="text-xs text-gray-500">
            Seus dados são usados exclusivamente para informar sobre este produto/serviço. Nada de spam.
          </p>
        </form>
      </div>
    </main>
  );
}
