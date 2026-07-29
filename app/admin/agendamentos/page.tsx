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
};

profissionais: {
  nome: string;
};
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [abaSelecionada, setAbaSelecionada] = useState<
  "hoje" | "proximos" | "finalizados" | "cancelados"
>("hoje");
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [totalHoje, setTotalHoje] = useState(0);

const [totalProximos, setTotalProximos] = useState(0);

const [totalFinalizados, setTotalFinalizados] = useState(0);

const [totalCancelados, setTotalCancelados] = useState(0);
const [busca, setBusca] = useState("");

  async function carregarAgendamentos() {
  setLoading(true);

  const empresa = await empresaAtual();

  if (!empresa) {
    setLoading(false);
    return;
  }
let query = supabase
  .from("agendamentos")
  .select(`
    id,
    cliente_nome,
    cliente_whatsapp,
    data,
    horario,
    status,

    servicos!agendamentos_servico_id_fkey (
      nome,
      preco
    ),

    profissionais!agendamentos_profissional_id_fkey (
      nome
    )
  `)
  .eq("empresa_id", empresa.id);
  const hoje = new Date().toISOString().split("T")[0];

switch (abaSelecionada) {
  case "hoje":
    query = query
      .eq("data", hoje)
      .in("status", ["Agendado", "Confirmado", "Em atendimento"]);
    break;

  case "proximos":
    query = query
      .gt("data", hoje)
      .in("status", ["Agendado", "Confirmado"]);
    break;

  case "finalizados":
    query = query.eq("status", "Finalizado");
    break;

  case "cancelados":
    query = query.eq("status", "Cancelado");
    break;
}
console.log("ABA:", abaSelecionada);
const { data, error } = await query
  .order("data", { ascending: true })
  .order("horario", { ascending: true });
    console.log(JSON.stringify(data, null, 2));

  if (error) {
    console.error(error);
  }

  if (data) {
    setAgendamentos(data as unknown as Agendamento[]);
    console.log("TOTAL:", data?.length);
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
async function carregarContadores() {
  const empresa = await empresaAtual();

  if (!empresa) return;

  const hoje = new Date().toISOString().split("T")[0];

  const [
    { count: hojeCount },
    { count: proximosCount },
    { count: finalizadosCount },
    { count: canceladosCount },
  ] = await Promise.all([
    supabase
      .from("agendamentos")
      .select("*", { count: "exact", head: true })
      .eq("empresa_id", empresa.id)
      .eq("data", hoje)
      .in("status", ["Agendado", "Confirmado", "Em atendimento"]),

    supabase
      .from("agendamentos")
      .select("*", { count: "exact", head: true })
      .eq("empresa_id", empresa.id)
      .gt("data", hoje)
      .in("status", ["Agendado", "Confirmado"]),

    supabase
      .from("agendamentos")
      .select("*", { count: "exact", head: true })
      .eq("empresa_id", empresa.id)
      .eq("status", "Finalizado"),

    supabase
      .from("agendamentos")
      .select("*", { count: "exact", head: true })
      .eq("empresa_id", empresa.id)
      .eq("status", "Cancelado"),
  ]);

  setTotalHoje(hojeCount ?? 0);
  setTotalProximos(proximosCount ?? 0);
  setTotalFinalizados(finalizadosCount ?? 0);
  setTotalCancelados(canceladosCount ?? 0);
}
  useEffect(() => {
  carregarAgendamentos();
  carregarContadores();
}, [abaSelecionada]);
useEffect(() => {
  const verificarTela = () => {
    setMobile(window.innerWidth < 768);
  };

  verificarTela();

  window.addEventListener("resize", verificarTela);

  return () => {
    window.removeEventListener("resize", verificarTela);
  };
}, []);
const agendamentosFiltrados = agendamentos.filter((agendamento) =>
  agendamento.cliente_nome
    .toLowerCase()
    .includes(busca.toLowerCase())
);
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
            <div className="mt-4 mb-4">
  <input
    type="text"
    placeholder="🔍 Buscar cliente..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
  />
</div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
  <button
    onClick={() => setAbaSelecionada("hoje")}
    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
      abaSelecionada === "hoje"
        ? "bg-black text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    Hoje ({totalHoje})
  </button>

  <button
    onClick={() => setAbaSelecionada("proximos")}
    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
      abaSelecionada === "proximos"
        ? "bg-black text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    Próximos ({totalProximos})
  </button>

  <button
    onClick={() => setAbaSelecionada("finalizados")}
    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
      abaSelecionada === "finalizados"
        ? "bg-black text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    Finalizados ({totalFinalizados})
  </button>

  <button
    onClick={() => setAbaSelecionada("cancelados")}
    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
      abaSelecionada === "cancelados"
        ? "bg-black text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    Cancelados ({totalCancelados})
  </button>
</div>
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

          ) : mobile ? (
<div className="space-y-4 p-4">

  {agendamentos
  .filter((agendamento) =>
    agendamento.cliente_nome
      .toLowerCase()
      .includes(busca.toLowerCase())
  )
  .map((agendamento) => (

    <div
      key={agendamento.id}
      className="rounded-2xl border bg-white p-4 shadow-sm"
    >

      <div className="flex justify-between items-start">

        <div>

          <p className="font-bold text-lg">
            {agendamento.cliente_nome}
          </p>

          <p className="text-sm text-zinc-500">
            {agendamento.servicos?.nome}
          </p>

          <p className="text-sm text-zinc-500">
            {agendamento.profissionais?.nome}
          </p>

          <p className="text-sm">
             {new Date(`${agendamento.data}T00:00:00`).toLocaleDateString("pt-BR")}
          </p>

          <p className="text-sm">
            {agendamento.horario.slice(0, 5)}
          </p>

          <p className="font-bold text-green-600 mt-2">
            R$ {Number(agendamento.servicos?.preco ?? 0).toFixed(2)}
          </p>

        </div>

        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-700">
          {agendamento.status}
        </span>

      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">

        <a
          href={`https://wa.me/55${agendamento.cliente_whatsapp}`}
          target="_blank"
          className="rounded-lg bg-green-600 py-2 text-center text-white"
        >
          WhatsApp
        </a>

        {agendamento.status === "Agendado" && (
  <button
    onClick={() => alterarStatus(agendamento.id, "Em atendimento")}
    className="rounded-lg bg-violet-600 py-2 text-white"
  >
    Em atendimento
  </button>
)}
        {agendamento.status === "Em atendimento" && (
  <button
    onClick={() => alterarStatus(agendamento.id, "Finalizado")}
    className="rounded-lg bg-green-600 py-2 text-white"
  >
    Finalizar
  </button>
)}

        <button
          onClick={() => excluirAgendamento(agendamento.id)}
          className="rounded-lg bg-red-500 py-2 text-white col-span-2"
        >
          Excluir
        </button>

      </div>

    </div>

  ))}

</div>

) : (

<div className="overflow-x-auto">

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
                                {agendamentos
  .filter((agendamento) =>
    agendamento.cliente_nome
      .toLowerCase()
      .includes(busca.toLowerCase())
  )
  .map((agendamento) => {
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
                      {agendamento.servicos?.nome ?? "-"}
                    </td>

                    <td className="p-4">
                      {agendamento.profissionais?.nome ?? "-"}
                    </td>

                    <td className="p-4">
                      {new Date(
                        `${agendamento.data}T00:00:00`
                      ).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="p-4">
                      {agendamento.horario.slice(0, 5)}
                    </td>

                    <td className="p-4">
                      {agendamento.servicos?.preco != null
  ? `R$ ${Number(agendamento.servicos.preco).toFixed(2)}`
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
                         {
  agendamento.status === "Em atendimento"
    ? "bg-violet-100 text-violet-700"
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

    {agendamento.status === "Agendado" && (
  <>
    <button
      onClick={() =>
        alterarStatus(agendamento.id, "Em atendimento")
      }
      className="px-3 py-1 rounded-lg bg-violet-600 text-white text-sm"
    >
      Em atendimento
    </button>

    <button
      onClick={() =>
        alterarStatus(agendamento.id, "Cancelado")
      }
      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
    >
      Cancelar
    </button>
  </>
)}

    {agendamento.status === "Em atendimento" && (
  <>
    <button
      onClick={() =>
        alterarStatus(agendamento.id, "Finalizado")
      }
      className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm"
    >
      Finalizar
    </button>

    <button
      onClick={() =>
        alterarStatus(agendamento.id, "Cancelado")
      }
      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
    >
      Cancelar
    </button>
  </>
)}

    {agendamento.status === "Finalizado" && (
      <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
        ✅ Finalizado
      </span>
    )}

    {agendamento.status === "Cancelado" && (
      <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 text-sm font-semibold">
        ❌ Cancelado
      </span>
    )}

    <button
      onClick={() =>
        excluirAgendamento(agendamento.id)
      }
      className="px-3 py-1 rounded-lg bg-zinc-800 text-white text-sm"
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
            </div>

          )}

        </div>

      </div>
    </main>
  );
}