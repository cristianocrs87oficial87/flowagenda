"use client";

import Link from "next/link";
import { Calendar, CheckCircle, Users, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-white pt-36 pb-24">
      {/* Fundo */}
      <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 lg:flex-row lg:px-8">
        {/* Texto */}
        <div className="flex-1">

          <div className="mb-6 inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            🚀 30 dias grátis • Sem cartão de crédito
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-zinc-900 lg:text-6xl">
            O jeito mais simples de organizar sua agenda e conquistar mais clientes.
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-600">
            O FlowAgenda ajuda barbearias, salões de beleza,
            clínicas de estética, esmalterias e profissionais da beleza
            a organizarem seus agendamentos de forma simples,
            profissional e totalmente online.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/cadastro"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-center font-semibold text-white transition hover:bg-violet-700"
            >
              Começar 30 Dias Grátis
            </Link>

            <a
              href="#demo"
              className="rounded-2xl border border-zinc-300 px-8 py-4 text-center font-semibold text-zinc-700 transition hover:border-violet-400 hover:text-violet-600"
            >
              Ver Demonstração
            </a>

          </div>

          <div className="mt-10 grid gap-4 text-sm text-zinc-600">

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Agendamento online 24 horas
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Controle de clientes e serviços
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Funciona no celular e computador
            </div>

          </div>

        </div>

        {/* Dashboard */}
        <div className="flex flex-1 justify-center">

          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-sm text-zinc-500">
                  Dashboard
                </p>

                <h3 className="text-xl font-bold">
                  Agenda de Hoje
                </h3>
              </div>

              <Calendar className="h-8 w-8 text-violet-600" />

            </div>

            <div className="space-y-3">

              {[
                "09:00 • Maria Silva",
                "10:00 • João Pedro",
                "11:30 • Fernanda",
                "14:00 • Juliana",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-zinc-200 px-4 py-3"
                >
                  {item}
                </div>
              ))}

            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">

              <div className="rounded-2xl bg-violet-50 p-4 text-center">

                <Wallet className="mx-auto mb-2 h-6 w-6 text-violet-600" />

                <p className="text-xs text-zinc-500">
                  Receita
                </p>

                <strong>R$480</strong>

              </div>

              <div className="rounded-2xl bg-violet-50 p-4 text-center">

                <Users className="mx-auto mb-2 h-6 w-6 text-violet-600" />

                <p className="text-xs text-zinc-500">
                  Clientes
                </p>

                <strong>18</strong>

              </div>

              <div className="rounded-2xl bg-violet-50 p-4 text-center">

                <Calendar className="mx-auto mb-2 h-6 w-6 text-violet-600" />

                <p className="text-xs text-zinc-500">
                  Serviços
                </p>

                <strong>24</strong>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}