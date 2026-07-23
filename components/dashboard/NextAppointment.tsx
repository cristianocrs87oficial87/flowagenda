import { DashboardAgendamento } from "@/lib/dashboard";

interface Props {
  agendamento: DashboardAgendamento | null;
}

export default function NextAppointment({
  agendamento,
}: Props) {
  if (!agendamento) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-lg">
          Próximo Cliente
        </h2>

        <p className="mt-4 text-zinc-500">
          Nenhum agendamento restante hoje.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Próximo Cliente
      </h2>

      <div className="mt-5">
        <p className="text-4xl font-bold text-violet-600">
          {agendamento.horario}
        </p>

        <p className="mt-2 text-xl font-semibold">
          {agendamento.cliente_nome}
        </p>

        <p className="text-zinc-500">
          {agendamento.cliente_whatsapp}
        </p>

        <span className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {agendamento.status}
        </span>
      </div>
    </div>
  );
}