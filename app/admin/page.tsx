"use client";

import Link from "next/link";
import {
  CalendarDays,
  Users,
  BriefcaseBusiness,
  Settings,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { empresaAtual } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
    const [temServicos, setTemServicos] = useState(false);
    useEffect(() => {
  async function verificarServicos() {
    const empresa = await empresaAtual();

    if (!empresa) return;

    const { count } = await supabase
      .from("servicos")
      .select("*", { count: "exact", head: true })
      .eq("empresa_id", empresa.id);

    setTemServicos((count ?? 0) > 0);
  }

  verificarServicos();
}, []);
  const cards = [
    {
      titulo: "Agendamentos",
      descricao: "Gerencie todos os horários.",
      href: "/admin/agendamentos",
      icon: CalendarDays,
      cor: "bg-violet-100 text-violet-600",
    },
    {
      titulo: "Serviços",
      descricao: "Cadastre seus serviços.",
      href: "/admin/servicos",
      icon: BriefcaseBusiness,
      cor: "bg-blue-100 text-blue-600",
    },
    {
      titulo: "Clientes",
      descricao: "Veja sua lista de clientes.",
      href: "/admin/clientes",
      icon: Users,
      cor: "bg-green-100 text-green-600",
    },
    {
      titulo: "Configurações",
      descricao: "Horários e agenda.",
      href: "/admin/configuracoes",
      icon: Settings,
      cor: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <main className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Dashboard
        </h1>

        <p className="mt-3 text-zinc-500">
          Bem-vindo ao FlowAgenda.
          Escolha uma opção para começar.
        </p>

      </div>

      <Card>

        <h2 className="text-2xl font-bold">
          🚀 Próximos passos
        </h2>

        <div className="mt-6 space-y-4 text-zinc-600">

          <p>
  {temServicos
    ? "✅ Serviços cadastrados."
    : "⬜ Cadastre seus serviços."}
</p>

          <p>✅ Configure os horários da agenda.</p>

          <p>✅ Compartilhe seu link de agendamento.</p>

          <p>✅ Comece a receber clientes online.</p>

        </div>

      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
            >
              <Card className="group h-full cursor-pointer">

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.cor}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />

                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  {card.titulo}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  {card.descricao}
                </p>

              </Card>
            </Link>
          );
        })}

      </div>


    </main>
  );
}