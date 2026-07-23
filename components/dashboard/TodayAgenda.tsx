import { DashboardAgendamento } from "@/lib/dashboard";

interface TodayAgendaProps {
  agenda: DashboardAgendamento[];
}

export default function TodayAgenda({
  agenda,
}: TodayAgendaProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Agenda de Hoje
        </h2>

        <p className="text-sm text-zinc-500">
          {agenda.length} agendamento{agenda.length !== 1 && "s"}
        </p>
      </div>

      {agenda.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-zinc-500">
            Nenhum agendamento para hoje.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {agenda.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition"
            >
              <div>
                <p className="font-semibold text-zinc-900">
                  {item.cliente_nome}
                </p>

                <p className="text-sm text-zinc-500">
                  {item.cliente_whatsapp}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-violet-600">
                  {item.horario}
                </p>

                <span
                  className={`inline-flex mt-1 rounded-full px-2 py-1 text-xs font-medium ${
                    item.status === "confirmado"
                      ? "bg-green-100 text-green-700"
                      : item.status === "cancelado"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
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
  );
}