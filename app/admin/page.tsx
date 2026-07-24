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
  const [agendaHoje, setAgendaHoje] = useState<any[]>([]);
  const [totalHoje, setTotalHoje] = useState(0);
  const [receitaHoje, setReceitaHoje] = useState(0);

  async function carregarAgendaHoje() {
    const empresa = await empresaAtual();

    if (!empresa) return;

    const hoje = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("agendamentos")
      .select(`
        id,
        cliente_nome,
        horario,
        status,
        servicos(
          nome,
          preco
        ),
        profissionais(nome)
      `)
      .eq("empresa_id", empresa.id)
      .eq("data", hoje)
      .order("horario");

    if (error) {
      console.error(error);
      return;
    }

    const lista = data ?? [];

    setAgendaHoje(lista);
    setTotalHoje(lista.length);

    const receita = lista.reduce((total: number, item: any) => {
      if (item.status !== "Finalizado") return total;

      const servico = Array.isArray(item.servicos)
        ? item.servicos[0]
        : item.servicos;

      return total + Number(servico?.preco ?? 0);
    }, 0);

    setReceitaHoje(receita);
  }

  useEffect(() => {
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

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
    
        </h1>

        <p className="mt-2 text-zinc-500">
          Confira rapidamente como está sua agenda de hoje.
        </p>

      </div>

      {/* CARDS RESUMO */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>

          <p className="text-sm text-zinc-500">
             Agendamentos Hoje
          </p>

          <h2 className="mt-2 text-3xl font-bold text-violet-600">
            {totalHoje}
          </h2>

        </Card>

        <Card>

          <p className="text-sm text-zinc-500">
            💰 Receita Hoje
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            R$ {Number(receitaHoje).toFixed(2)}
          </h2>

        </Card>

      </div>

      <Card>

        <h2 className="text-xl font-semibold">
          👤 Próximo Atendimento
        </h2>

        <div className="mt-5">

          {agendaHoje.length > 0 ? (

            <>

              <p className="text-3xl font-bold text-violet-600">
                {agendaHoje[0].horario?.slice(0, 5)}
              </p>

              <p className="mt-3 text-lg font-semibold">
                {agendaHoje[0].cliente_nome}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {agendaHoje[0].servicos?.nome ?? "-"}
              </p>

              <p className="text-sm text-zinc-500">
                {agendaHoje[0].profissionais?.nome ?? "-"}
              </p>

            </>

          ) : (

            <p className="text-zinc-500">
              Nenhum atendimento para hoje.
            </p>

          )}

        </div>

      </Card>

      <Card>

        <h2 className="text-2xl font-bold">
           Agenda de Hoje
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
                  className="rounded-2xl border bg-white p-4"
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-lg font-bold text-zinc-900">
                        {item.horario?.slice(0, 5)}
                      </p>

                      <p className="mt-1 font-semibold text-zinc-900">
                        {item.cliente_nome}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        {item.servicos?.nome ?? "-"} • {item.profissionais?.nome ?? "-"}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Agendado"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Confirmado"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Finalizado"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

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