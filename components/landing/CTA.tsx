import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-violet-600 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="text-5xl font-bold text-white">
          Pronto para organizar sua agenda?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-violet-100">
          Comece gratuitamente hoje mesmo e descubra como é fácil
          automatizar seus agendamentos com o FlowAgenda.
        </p>

        <Link
          href="/cadastro"
          className="mt-10 inline-block rounded-2xl bg-white px-10 py-5 text-lg font-bold text-violet-700 transition hover:scale-105"
        >
          Criar Conta Grátis
        </Link>

        <p className="mt-6 text-violet-200">
          ✔ 30 dias grátis • ✔ Sem cartão de crédito
        </p>

      </div>
    </section>
  );
}