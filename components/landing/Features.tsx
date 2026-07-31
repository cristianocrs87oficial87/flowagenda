import {
  CalendarDays,
  Users,
  Scissors,
  UserRound,
  Link2,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Agenda Inteligente",
    description:
      "Organize todos os seus horários em um único lugar e evite conflitos de agendamento.",
  },
  {
    icon: Users,
    title: "Cadastro de Clientes",
    description:
      "Tenha o histórico completo de cada cliente para oferecer um atendimento mais personalizado.",
  },
  {
    icon: Scissors,
    title: "Gerenciamento de Serviços",
    description:
      "Cadastre serviços, preços e duração para agilizar o atendimento e manter tudo organizado.",
  },
  {
    icon: UserRound,
    title: "Controle de Profissionais",
    description:
      "Gerencie a agenda e a disponibilidade de cada profissional da sua equipe.",
  },
  {
    icon: Link2,
    title: "Agendamento Online",
    description:
      "Compartilhe um link exclusivo e permita que seus clientes agendem 24 horas por dia.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Completo",
    description:
      "Visualize rapidamente seus agendamentos, acompanhe o desempenho do negócio e tome decisões com mais segurança.",
  },
];

export default function Features() {
  return (
    <section id="recursos" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Por que escolher o FlowAgenda?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            Tudo o que você precisa para organizar sua agenda.
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-600">
            O FlowAgenda reúne todas as ferramentas essenciais para você
            atender melhor seus clientes, economizar tempo e aumentar sua
            produtividade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 transition-colors group-hover:bg-violet-600">
                  <Icon className="h-7 w-7 text-violet-600 transition-colors group-hover:text-white" />
                </div>

                <h3 className="text-xl font-bold text-zinc-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 font-medium text-violet-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Conhecer recurso
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}