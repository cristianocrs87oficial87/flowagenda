import { supabase } from "@/lib/supabase";

export interface DashboardAgendamento {
  id: string;
  cliente_nome: string;
  cliente_whatsapp: string;
  data: string;
  horario: string;
  status: string;
}

export interface DashboardData {
  totalHoje: number;
  confirmados: number;
  pendentes: number;
  proximoCliente: DashboardAgendamento | null;
  agendaHoje: DashboardAgendamento[];
}

export async function getDashboardHoje(
  empresaId: string
): Promise<DashboardData> {
  const hoje = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("agendamentos")
    .select(
      `
        id,
        cliente_nome,
        cliente_whatsapp,
        data,
        horario,
        status
      `
    )
    .eq("empresa_id", empresaId)
    .eq("data", hoje)
    .order("horario", { ascending: true });

  if (error) {
    console.error(error);

    return {
      totalHoje: 0,
      confirmados: 0,
      pendentes: 0,
      proximoCliente: null,
      agendaHoje: [],
    };
  }

  const agendaHoje = data ?? [];

  const totalHoje = agendaHoje.length;

  const confirmados = agendaHoje.filter(
    (item) => item.status === "confirmado"
  ).length;

  const pendentes = agendaHoje.filter(
    (item) =>
      item.status === "agendado" ||
      item.status === "pendente"
  ).length;

  const agora = new Date();

  const horaAtual =
    agora.getHours().toString().padStart(2, "0") +
    ":" +
    agora.getMinutes().toString().padStart(2, "0");

  const proximoCliente =
    agendaHoje.find(
      (item) =>
        item.horario >= horaAtual &&
        item.status !== "cancelado"
    ) ?? null;

  return {
    totalHoje,
    confirmados,
    pendentes,
    proximoCliente,
    agendaHoje,
  };
}