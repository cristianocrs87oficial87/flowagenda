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
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {etapas.map((_, index) => (
          <div key={index} className="flex items-center flex-1">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${
                index <= step
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              {index + 1}
            </div>

            {index < etapas.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < step
                    ? "bg-violet-600"
                    : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}