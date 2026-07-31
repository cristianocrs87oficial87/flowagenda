"use client";

import Link from "next/link";
import { CheckCircle2, CalendarDays, CreditCard } from "lucide-react";

export default function BemVindoPage() {
  const hoje = new Date();

  const fim = new Date();
  fim.setDate(fim.getDate() + 30);

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">

      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl">

        <div className="flex justify-center">

          <CheckCircle2
            className="h-20 w-20 text-green-500"
          />

        </div>

        <h1 className="mt-6 text-center text-4xl font-bold text-zinc-900">
          Bem-vindo ao FlowAgenda!
        </h1>

        <p className="mt-4 text-center text-zinc-500">
          Sua conta foi criada com sucesso.
        </p>

        <div className="mt-8 rounded-2xl bg-violet-50 p-6">

          <div className="flex items-center gap-3">

            <CalendarDays className="h-7 w-7 text-violet-600" />

            <div>

              <p className="font-bold text-violet-700">
                Teste Gratuito
              </p>

              <p className="text-sm text-zinc-600">
                Você possui 30 dias completos para utilizar todas as funcionalidades.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-6 space-y-3 text-zinc-700">

          <p>

            <strong>Início:</strong>{" "}
            {hoje.toLocaleDateString("pt-BR")}

          </p>

          <p>

            <strong>Fim do teste:</strong>{" "}
            {fim.toLocaleDateString("pt-BR")}

          </p>

          <p>

            <strong>Depois:</strong>{" "}
            R$ 39,90/mês

          </p>

        </div>

        <div className="mt-8 rounded-2xl border p-5">

          <div className="flex gap-3">

            <CreditCard className="mt-1 h-6 w-6 text-violet-600" />

            <div>

              <p className="font-semibold">
                Sem cartão de crédito
              </p>

              <p className="text-sm text-zinc-500">
                Você só paga se decidir continuar utilizando o FlowAgenda após o período gratuito.
              </p>

            </div>

          </div>

        </div>

        <Link
          href="/admin"
          className="mt-10 flex h-14 items-center justify-center rounded-xl bg-violet-600 text-lg font-semibold text-white transition hover:bg-violet-700"
        >
          Entrar no Painel
        </Link>

      </div>

    </main>
  );
}