"use client";
import { empresaAtual } from "@/lib/auth";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Agendamento {
  id: string;
  cliente_nome: string;
  cliente_whatsapp: string;
  data: string;
  horario: string;
  status: string;

  servico_id: string;
  profissional_id: string;

  servico_nome?: string;
  profissional_nome?: string;
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-BR");
}
export default function AgendamentosAdminPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState<Record<string, string>>({});
const [profissionais, setProfissionais] = useState<Record<string, string>>({});
const [hoje, setHoje] = useState(0);
const [confirmados, setConfirmados] = useState(0);
const [finalizados, setFinalizados] = useState(0);
const [cancelados, setCancelados] = useState(0);
const [filtro, setFiltro] = useState("todos");
const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarAgendamentos();
  }, []);

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
  servico_id,
  profissional_id
`)
  .eq("empresa_id", empresa.id)
  .order("data", { ascending: false })
.order("horario", { ascending: true });
  if (error) {
  console.error(error);
  setLoading(false);
  return;
}

const { data: listaServicos } = await supabase
  .from("servicos")
  .select("id, nome")
  .eq("empresa_id", empresa.id);

const mapaServicos: Record<string, string> = {};

listaServicos?.forEach((servico) => {
  mapaServicos[servico.id] = servico.nome;
});

setServicos(mapaServicos);

const { data: listaProfissionais } = await supabase
  .from("profissionais")
  .select("id, nome")
  .eq("empresa_id", empresa.id);
  
const mapaProfissionais: Record<string, string> = {};

listaProfissionais?.forEach((profissional) => {
  mapaProfissionais[profissional.id] = profissional.nome;
});

setProfissionais(mapaProfissionais);
console.log("Agendamentos", data);
console.log("Mapa Serviços", mapaServicos);
console.log("Mapa Profissionais", mapaProfissionais);
    setAgendamentos((data as Agendamento[]) ?? []);
    const lista = (data as Agendamento[]) ?? [];

const hojeData = new Date().toISOString().split("T")[0];

setHoje(
  lista.filter((a) => a.data === hojeData).length
);

setConfirmados(
  lista.filter((a) => a.status === "confirmado").length
);

setFinalizados(
  lista.filter((a) => a.status === "finalizado").length
);

setCancelados(
  lista.filter((a) => a.status === "cancelado").length
);
    setLoading(false);
  }

  async function alterarStatus(
    id: string,
    status: string
  ) {
    const { error } = await supabase
      .from("agendamentos")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    carregarAgendamentos();
  }

  function corStatus(status: string) {
    switch (status) {
      case "confirmado":
        return "bg-blue-100 text-blue-700";

      case "finalizado":
        return "bg-green-100 text-green-700";

      case "cancelado":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }
const hojeData = new Date().toISOString().split("T")[0];

const agendamentosFiltrados = agendamentos.filter((agendamento) => {
  const passouFiltro = (() => {
    switch (filtro) {
      case "hoje":
        return agendamento.data === hojeData;

      case "agendado":
        return agendamento.status === "agendado";

      case "confirmado":
        return agendamento.status === "confirmado";

      case "finalizado":
        return agendamento.status === "finalizado";

      case "cancelado":
        return agendamento.status === "cancelado";

      default:
        return true;
    }
  })();

  const textoBusca = busca.toLowerCase();

  const passouBusca =
    agendamento.cliente_nome.toLowerCase().includes(textoBusca) ||
    agendamento.cliente_whatsapp.includes(textoBusca) ||
    (servicos[agendamento.servico_id] ?? "")
      .toLowerCase()
      .includes(textoBusca) ||
    (profissionais[agendamento.profissional_id] ?? "")
      .toLowerCase()
      .includes(textoBusca);

  return passouFiltro && passouBusca;
});
 (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold">
          Agendamentos
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Gerencie todos os agendamentos.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <Card className="text-center">
    <p className="text-sm text-zinc-500">
      Hoje
    </p>

    <h2 className="text-3xl font-bold text-violet-700">
      {hoje}
    </h2>
  </Card>

  <Card className="text-center">
    <p className="text-sm text-zinc-500">
      Confirmados
    </p>

    <h2 className="text-3xl font-bold text-blue-600">
      {confirmados}
    </h2>
  </Card>

  <Card className="text-center">
    <p className="text-sm text-zinc-500">
      Finalizados
    </p>

    <h2 className="text-3xl font-bold text-green-600">
      {finalizados}
    </h2>
  </Card>

  <Card className="text-center">
    <p className="text-sm text-zinc-500">
      Cancelados
    </p>

    <h2 className="text-3xl font-bold text-red-600">
      {cancelados}
    </h2>
  </Card>

</div>

        {loading && (
          <p>Carregando...</p>
        )}

        {!loading && agendamentos.length === 0 && (
          <p className="text-center text-zinc-500">
            Nenhum agendamento encontrado.
          </p>
        )}

        <div className="space-y-4">
            <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Buscar cliente, telefone, serviço ou profissional..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-500"
  />
</div>
            <div className="flex flex-wrap gap-2 mb-6">

  <Button
  className={filtro === "todos" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("todos")}
>
  Todos
</Button>

<Button
  className={filtro === "hoje" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("hoje")}
>
  Hoje
</Button>

<Button
  className={filtro === "agendado" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("agendado")}
>
  Agendados
</Button>

<Button
  className={filtro === "confirmado" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("confirmado")}
>
  Confirmados
</Button>

<Button
  className={filtro === "finalizado" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("finalizado")}
>
  Finalizados
</Button>

<Button
  className={filtro === "cancelado" ? "bg-violet-600 text-white" : ""}
  onClick={() => setFiltro("cancelado")}
>
  Cancelados
</Button>

</div>

          {agendamentosFiltrados.map((agendamento) => (

            <Card key={agendamento.id}>

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    {agendamento.cliente_nome}
                  </h2>

                  <p className="text-sm text-zinc-500">
                    {agendamento.cliente_whatsapp}
                  </p>
                  <a
  href={`https://wa.me/55${agendamento.cliente_whatsapp.replace(/\D/g, "")}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center mt-2 text-sm font-medium text-green-600 hover:text-green-700"
>
  💬 Conversar no WhatsApp
</a>

                  <p className="mt-2">
  <strong>Serviço:</strong>{" "}
  {servicos[agendamento.servico_id] ?? "-"}
</p>

<p>
  <strong>Profissional:</strong>{" "}
  {profissionais[agendamento.profissional_id] ?? "-"}
</p>

                  <p>
  <strong>Data:</strong>{" "}
  {formatarData(agendamento.data)}
</p>

                  <p>
  <strong>Horário:</strong>{" "}
  {agendamento.horario.slice(0, 5)}
</p>

                </div>

                <div className="text-right">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${corStatus(
                      agendamento.status
                    )}`}
                  >
                    {agendamento.status}
                  </span>

                  <div className="mt-4 space-y-2">

                    {agendamento.status === "agendado" && (
                      <>
                        <Button
                          fullWidth
                          onClick={() =>
                            alterarStatus(
                              agendamento.id,
                              "confirmado"
                            )
                          }
                        >
                          Confirmar
                        </Button>

                        <Button
                          fullWidth
                          onClick={() =>
                            alterarStatus(
                              agendamento.id,
                              "cancelado"
                            )
                          }
                        >
                          Cancelar
                        </Button>
                      </>
                    )}

                    {agendamento.status === "confirmado" && (
                      <Button
                        fullWidth
                        onClick={() =>
                          alterarStatus(
                            agendamento.id,
                            "finalizado"
                          )
                        }
                      >
                        Finalizar
                      </Button>
                    )}

                  </div>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>
    </main>
  );
}