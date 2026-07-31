import {
  Monitor,
  Smartphone,
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
} from "lucide-react";

const screens = [
  {
    title: "Dashboard",
    description: "Acompanhe seus agendamentos e indicadores.",
    icon: LayoutDashboard,
  },
  {
    title: "Agenda",
    description: "Visualização simples dos horários do dia.",
    icon: CalendarDays,
  },
  {
    title: "Clientes",
    description: "Histórico completo de cada cliente.",
    icon: Users,
  },
  {
    title: "Configurações",
    description: "Personalize sua empresa facilmente.",
    icon: Settings,
  },
];

export default function Screenshots() {
  return (
    <section className="bg-white py-28" id="demo">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Conheça o sistema
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            Um sistema moderno, rápido e intuitivo.
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Desenvolvido para que você gaste menos tempo organizando sua
            agenda e mais tempo atendendo seus clientes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {screens.map((screen) => {
            const Icon = screen.icon;

            return (
              <div
                key={screen.title}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-violet-600" />

                    <div>
                      <h3 className="font-bold text-zinc-900">
                        {screen.title}
                      </h3>

                      <p className="text-sm text-zinc-500">
                        {screen.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Área para screenshot */}
                <div className="flex h-80 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
                  <div className="text-center">
                    <Monitor className="mx-auto mb-4 h-14 w-14 text-violet-500" />

                    <p className="font-semibold text-zinc-700">
                      Screenshot do {screen.title}
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Depois substituiremos por um print real.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="mt-20 rounded-[40px] border border-zinc-200 bg-gradient-to-b from-violet-50 to-white p-10 shadow-xl">
          <div className="mb-8 flex items-center justify-center gap-3">
            <Smartphone className="h-8 w-8 text-violet-600" />

            <h3 className="text-2xl font-bold text-zinc-900">
              Agendamento pelo celular
            </h3>
          </div>

          <div className="flex h-96 items-center justify-center rounded-3xl bg-white">
            <div className="text-center">
              <Smartphone className="mx-auto mb-4 h-16 w-16 text-violet-600" />

              <p className="font-semibold text-zinc-700">
                Tela pública de agendamento
              </p>

              <p className="mt-2 text-zinc-500">
                Substituiremos por um print real do FlowAgenda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}