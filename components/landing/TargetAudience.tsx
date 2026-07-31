import {
  Scissors,
  Sparkles,
  Brush,
  HeartHandshake,
  Footprints,
  Stethoscope,
  BadgeCheck,
  Smile,
} from "lucide-react";

const items = [
  {
    icon: Scissors,
    title: "Barbearias",
  },
  {
    icon: Brush,
    title: "Salões",
  },
  {
    icon: Sparkles,
    title: "Esmalterias",
  },
  {
    icon: HeartHandshake,
    title: "Lash Designer",
  },
  {
    icon: Smile,
    title: "Sobrancelhas",
  },
  {
    icon: Footprints,
    title: "Podologia",
  },
  {
    icon: Stethoscope,
    title: "Clínicas",
  },
  {
    icon: BadgeCheck,
    title: "Muito mais",
  },
];

export default function TargetAudience() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Feito para você
          </span>

          <h2 className="mt-5 text-4xl font-bold">
            O FlowAgenda atende qualquer negócio baseado em agendamento.
          </h2>

          <p className="mt-5 text-lg text-zinc-600">
            Seja você um profissional autônomo ou tenha uma equipe completa,
            o FlowAgenda ajuda a organizar sua rotina.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon className="mx-auto h-10 w-10 text-violet-600" />

                <h3 className="mt-5 text-lg font-bold">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}