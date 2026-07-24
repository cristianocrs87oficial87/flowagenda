"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  CalendarDays,
  Users,
  BriefcaseBusiness,
  UserRound,
  Settings,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { empresaAtual } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [temServicos, setTemServicos] = useState(false);
  const [temProfissionais, setTemProfissionais] = useState(false);
  const [agendaHoje, setAgendaHoje] = useState<any[]>([]);
  async function carregarAgendaHoje() {
  const empresa = await empresaAtual();

  if (!empresa) return;

  const hoje = new Date().toISOString().split("T")[0];
  console.log("HOJE:", hoje);

  const { data, error } = await supabase
    .from("agendamentos")
    .select(`
      id,
      cliente_nome,
      horario,
      status,
      servicos(nome),
      profissionais(nome)
    `)
    .eq("empresa_id", empresa.id)
    .eq("data", hoje)
    .order("horario");

  if (error) {
    console.error(error);
    return;
  }
console.log("AGENDA HOJE:", data);
  setAgendaHoje(data ?? []);
}

  useEffect(() => {
    async function carregarChecklist() {
      const empresa = await empresaAtual();

      if (!empresa) return;

      const { count: totalServicos } = await supabase
        .from("servicos")
        .select("*", { count: "exact", head: true })
        .eq("empresa_id", empresa.id);

      setTemServicos((totalServicos ?? 0) > 0);

      const { count: totalProfissionais } = await supabase
        .from("profissionais")
        .select("*", { count: "exact", head: true })
        .eq("empresa_id", empresa.id);

      setTemProfissionais((totalProfissionais ?? 0) > 0);
    }

    carregarChecklist();
    carregarAgendaHoje();
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
      titulo: "Profissionais",
      descricao: "Cadastre sua equipe.",
      href: "/admin/profissionais",
      icon: UserRound,
      cor: "bg-purple-100 text-purple-600",
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

          <p>
            {temProfissionais
              ? "✅ Profissionais cadastrados."
              : "⬜ Cadastre seus profissionais."}
          </p>

          <p>
            ⬜ Configure os horários da agenda.
          </p>

          <p>
            ⬜ Compartilhe seu link de agendamento.
          </p>

          <p>
            ⬜ Comece a receber clientes online.
          </p>

        </div>

      </Card>
      <Card>

  <h2 className="text-2xl font-bold">
    📅 Agenda de Hoje
  </h2>

  <div className="mt-6">

    {agendaHoje.length === 0 ? (

      <p className="text-zinc-500">
        Nenhum agendamento para hoje.
      </p>

    ) : (

      <div className="space-y-4">

        {agendaHoje.map((item: any) => (

          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <div>

              <p className="font-semibold">
                {item.horario}
              </p>

              <p className="text-lg">
                {item.cliente_nome}
              </p>

              <p className="text-sm text-zinc-500">
                {item.servicos?.nome ?? "-"} • {item.profissionais?.nome ?? "-"}
              </p>

            </div>

            <span
              className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700"
            >
              {item.status}
            </span>

          </div>

        ))}

      </div>

    )}

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