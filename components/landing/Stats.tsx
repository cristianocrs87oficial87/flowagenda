import {
  Clock3,
  Smartphone,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const items = [
  {
    icon: Clock3,
    title: "Setup em 5 minutos",
    description:
      "Cadastre sua empresa e comece a receber agendamentos rapidamente.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description:
      "Gerencie sua agenda pelo celular, tablet ou computador.",
  },
  {
    icon: MessageCircle,
    title: "Agendamento 24 horas",
    description:
      "Seus clientes podem marcar horários mesmo quando você estiver fechado.",
  },
  {
    icon: ShieldCheck,
    title: "30 Dias Grátis",
    description:
      "Teste todas as funcionalidades antes de decidir assinar.",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Por que escolher o FlowAgenda?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            Tudo o que você precisa para organizar sua agenda.
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            Desenvolvido para profissionais da beleza que desejam
            economizar tempo, reduzir faltas e oferecer uma experiência
            profissional aos clientes.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 transition group-hover:bg-violet-600">
                  <Icon className="h-7 w-7 text-violet-600 group-hover:text-white" />
                </div>

                <h3 className="text-xl font-bold text-zinc-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}