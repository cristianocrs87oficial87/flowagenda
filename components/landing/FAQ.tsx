const faqs = [
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. O FlowAgenda funciona totalmente no navegador, tanto no computador quanto no celular.",
  },
  {
    question: "Posso testar antes de pagar?",
    answer:
      "Sim. Você tem 30 dias gratuitos para conhecer todas as funcionalidades sem precisar informar cartão de crédito.",
  },
  {
    question: "Serve para qualquer negócio?",
    answer:
      "Foi desenvolvido para barbearias, salões de beleza, clínicas de estética, esmalterias, lash designers e profissionais que trabalham com agendamento.",
  },
  {
    question: "O cliente consegue agendar sozinho?",
    answer:
      "Sim. Você recebe um link exclusivo para compartilhar no WhatsApp, Instagram ou qualquer outro canal.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Não existe fidelidade. Você pode cancelar sua assinatura quando desejar.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold text-zinc-900">
            Perguntas Frequentes
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            Tire suas dúvidas antes de começar gratuitamente.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200 p-6"
            >
              <h3 className="text-lg font-bold text-zinc-900">
                {faq.question}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}