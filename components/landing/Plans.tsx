import Link from "next/link";
import { Check } from "lucide-react";

const benefits = [
  "Agendamento online ilimitado",
  "Cadastro ilimitado de clientes",
  "Cadastro de serviços",
  "Cadastro de profissionais",
  "Painel administrativo completo",
  "Link exclusivo para agendamento",
  "Suporte via WhatsApp",
  "Atualizações gratuitas",
];

export default function Plans() {
  return (
    <section id="planos" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Plano
          </span>

          <h2 className="mt-6 text-4xl font-bold text-zinc-900">
            Tudo o que você precisa por um preço justo.
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            30 dias grátis para testar todas as funcionalidades.
            <br />
            Sem cartão de crédito. Cancele quando quiser.
          </p>
        </div>

        <div className="mx-auto max-w-xl rounded-3xl border border-violet-200 bg-white p-10 shadow-xl">
          <div className="text-center">
            <span className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
              MELHOR CUSTO-BENEFÍCIO
            </span>

            <h3 className="mt-8 text-3xl font-bold text-zinc-900">
              FlowAgenda Premium
            </h3>
          <p className="mt-3 text-zinc-600">
  Ideal para quem deseja organizar a agenda, atender melhor os clientes e vender mais.
</p>
            <div className="mt-8 flex items-end justify-center">
              <span className="text-6xl font-extrabold text-zinc-900">
                R$39
              </span>

              <span className="mb-2 text-3xl font-bold text-zinc-900">
                ,90
              </span>
            </div>

            <p className="mt-2 text-zinc-500">
              por mês
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                ✓ 30 dias grátis
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                ✓ Sem fidelidade
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                ✓ Sem cartão
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-5">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-green-500" />

                <span className="text-zinc-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/cadastro"
            className="mt-10 block rounded-2xl bg-violet-600 py-4 text-center text-lg font-semibold text-white transition hover:bg-violet-700"
          >
            Começar 30 Dias Grátis
          </Link>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Sem cartão de crédito • Cancelamento quando quiser
          </p>
        </div>
      </div>
    </section>
  );
}