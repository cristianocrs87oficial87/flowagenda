interface ProgressProps {
  step: number;
}

const etapas = [
  "Profissional",
  "Serviço",
  "Data",
  "Horário",
  "Dados",
];

export default function Progress({ step }: ProgressProps) {
  return (
    <div className="mb-7">

      <div className="flex items-center">
        {etapas.map((_, index) => (
          <div key={index} className="flex items-center flex-1">

            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-sm font-semibold transition-all duration-300
                ${
                  index < step
                    ? "bg-violet-600 text-white shadow-md"
                    : index === step
                    ? "bg-violet-600 text-white ring-4 ring-violet-100 shadow-lg scale-105"
                    : "bg-zinc-200 text-zinc-500"
                }
              `}
            >
              {index + 1}
            </div>

            {index < etapas.length - 1 && (
              <div
                className={`
                  flex-1 h-[3px] mx-2 rounded-full transition-all duration-300
                  ${
                    index < step
                      ? "bg-violet-600"
                      : "bg-zinc-200"
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-violet-700 uppercase tracking-wide">
          Etapa {step + 1} de {etapas.length}
        </p>

        <h3 className="text-lg font-bold text-zinc-900 mt-1">
          {etapas[step]}
        </h3>
      </div>

    </div>
  );
}