import {
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  CalendarClock,
  Users,
  Clock3,
} from "lucide-react";

const before = [
  "Agenda perdida no WhatsApp",
  "Clientes esquecem o horário",
  "Muito tempo respondendo mensagens",
  "Horários duplicados",
];

const after = [
  "Agenda organizada em um só lugar",
  "Agendamento online 24 horas",
  "Mais tempo para atender clientes",
  "Controle total dos horários",
];

export default function Problems() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            Você passa por isso?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            Pare de perder tempo organizando sua agenda manualmente.
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            O FlowAgenda elimina a bagunça dos agendamentos e ajuda você
            a atender mais clientes com muito mais organização.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Antes */}
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />

              <div>
                <h3 className="text-2xl font-bold text-zinc-900">
                  Antes
                </h3>

                <p className="text-zinc-500">
                  Como muitos profissionais trabalham hoje.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {before.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-4"
                >
                  <MessageSquare className="h-6 w-6 text-red-500" />

                  <span className="font-medium text-zinc-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Depois */}
          <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />

              <div>
                <h3 className="text-2xl font-bold text-zinc-900">
                  Com o FlowAgenda
                </h3>

                <p className="text-zinc-500">
                  Tudo organizado de forma simples.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {after.map((item, index) => {
                const icons = [
                  CalendarClock,
                  Clock3,
                  Users,
                  CheckCircle2,
                ];

                const Icon = icons[index];

                return (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-4"
                  >
                    <Icon className="h-6 w-6 text-green-600" />

                    <span className="font-medium text-zinc-700">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}