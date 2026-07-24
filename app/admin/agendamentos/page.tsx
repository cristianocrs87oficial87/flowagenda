"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { empresaAtual } from "@/lib/auth";

interface Agendamento {
  id: number;
  cliente_nome: string;
  cliente_whatsapp: string;
  data: string;
  horario: string;
  status: string;

  servicos: {
    nome: string;
    preco: number;
  }[];

  profissionais: {
    nome: string;
  }[];
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarAgendamentos() {
  setLoading(true);

  const empresa = await empresaAtual();

  if (!empresa) {
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
    .from("agendamentos")
    .select(`
      id,
      cliente_nome,
      cliente_whatsapp,
      data,
      horario,
      status,
      servicos (
        nome,
        preco
      ),
      profissionais (
        nome
      )
    `)
    .eq("empresa_id", empresa.id)
    .order("data", { ascending: false })
    .order("horario", { ascending: false });
    console.log("DATA:", data);
console.log("ERROR:", error);

  if (error) {
    console.error(error);
  }

  if (data) {
    setAgendamentos(data as Agendamento[]);
  }

  setLoading(false);
}


  async function alterarStatus(id: number, status: string) {
    await supabase
      .from("agendamentos")
      .update({ status })
      .eq("id", id);

    carregarAgendamentos();
  }

  async function excluirAgendamento(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este agendamento?"
    );

    if (!confirmar) return;

    await supabase
      .from("agendamentos")
      .delete()
      .eq("id", id);

    carregarAgendamentos();
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Agendamentos
            </h1>

            <p className="text-zinc-500 mt-2">
              Gerencie todos os agendamentos da empresa.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition"
          >
            Voltar
          </Link>

        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {loading ? (

            <div className="p-8 text-center">
              Carregando...
            </div>

          ) : agendamentos.length === 0 ? (

            <div className="p-8 text-center text-zinc-500">
              Nenhum agendamento encontrado.
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr className="text-left text-sm">

                  <th className="p-4">Cliente</th>

                  <th className="p-4">
                    WhatsApp
                  </th>

                  <th className="p-4">
                    Serviço
                  </th>

                  <th className="p-4">
                    Profissional
                  </th>

                  <th className="p-4">
                    Data
                  </th>

                  <th className="p-4">
                    Horário
                  </th>

                  <th className="p-4">
                    Valor
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Ações
                  </th>

                </tr>

              </thead>

                              <tbody>
                                {agendamentos.map((agendamento) => {
  console.log("AGENDAMENTO:", agendamento);

  return (
                  <tr
                    key={agendamento.id}
                    className="border-t hover:bg-zinc-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {agendamento.cliente_nome}
                    </td>

                    <td className="p-4">
                      {agendamento.cliente_whatsapp}
                    </td>

                    <td className="p-4">
                      {agendamento.servicos?.[0]?.nome ?? "-"}
                    </td>

                    <td className="p-4">
                      {agendamento.profissionais?.[0]?.nome ?? "-"}
                    </td>

                    <td className="p-4">
                      {new Date(
                        `${agendamento.data}T00:00:00`
                      ).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="p-4">
                      {agendamento.horario}
                    </td>

                    <td className="p-4">
                      {agendamento.servicos?.[0]?.preco != null
  ? `R$ ${Number(agendamento.servicos[0].preco).toFixed(2)}`
  : "-"
}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            agendamento.status === "Agendado"
                              ? "bg-blue-100 text-blue-700"
                              : ""
                          }
                          ${
                            agendamento.status === "Confirmado"
                              ? "bg-yellow-100 text-yellow-700"
                              : ""
                          }
                          ${
                            agendamento.status === "Finalizado"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                          ${
                            agendamento.status === "Cancelado"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                        `}
                      >
                        {agendamento.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap justify-center gap-2">

                        <button
                          onClick={() =>
                            alterarStatus(
                              agendamento.id,
                              "Confirmado"
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
                        >
                          Confirmar
                        </button>

                        <button
                          onClick={() =>
                            alterarStatus(
                              agendamento.id,
                              "Finalizado"
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                        >
                          Finalizar
                        </button>

                        <button
                          onClick={() =>
                            alterarStatus(
                              agendamento.id,
                              "Cancelado"
                            )
                          }
                          className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                        >
                          Cancelar
                        </button>

                        <button
                          onClick={() =>
                            excluirAgendamento(agendamento.id)
                          }
                          className="px-3 py-1 rounded-lg bg-zinc-800 text-white text-sm hover:bg-black transition"
                        >
                          Excluir
                        </button>

                      </div>
                    </td>
                  </tr>
  );
})}
              </tbody>
            </table>

          )}

        </div>

      </div>
    </main>
  );
}