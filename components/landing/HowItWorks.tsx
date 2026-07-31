import {
  Building2,
  Scissors,
  Share2,
  CalendarCheck2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Cadastre sua empresa",
    description:
      "Crie sua conta gratuitamente e configure as informações do seu estabelecimento em poucos minutos.",
  },
  {
    icon: Scissors,
    title: "Adicione serviços e profissionais",
    description:
      "Cadastre os serviços, preços, duração e os profissionais que realizam cada atendimento.",
  },
  {
    icon: Share2,
    title: "Compartilhe seu link",
    description:
      "Envie seu link pelo WhatsApp, Instagram ou coloque na bio para que os clientes agendem sozinhos.",
  },
  {
    icon: CalendarCheck2,
    title: "Receba agendamentos",
    description:
      "Os horários entram automaticamente na agenda e você ganha mais tempo para atender seus clientes.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="bg-zinc-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Como funciona
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            Comece a usar o FlowAgenda em poucos minutos.
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Não precisa de conhecimento técnico.
            Em poucos passos sua agenda estará pronta para receber clientes online.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative"
              >
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">

                    <Icon className="h-8 w-8 text-violet-600" />

                  </div>

                  <div className="mb-4 flex items-center gap-3">

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>

                    <h3 className="text-xl font-bold text-zinc-900">
                      {step.title}
                    </h3>

                  </div>

                  <p className="leading-7 text-zinc-600">
                    {step.description}
                  </p>

                </div>

                {index < steps.length - 1 && (
                  <div className="absolute right-[-28px] top-1/2 hidden -translate-y-1/2 xl:block">
                    <ArrowRight className="h-8 w-8 text-violet-300" />
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}