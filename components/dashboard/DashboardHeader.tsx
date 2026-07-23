interface DashboardHeaderProps {
  empresa: string;
}

export default function DashboardHeader({
  empresa,
}: DashboardHeaderProps) {
  const hora = new Date().getHours();

  let saudacao = "Olá";

  if (hora < 12) {
    saudacao = "Bom dia";
  } else if (hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  const data = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200">
      <h1 className="text-3xl font-bold text-zinc-900">
        {saudacao} 👋
      </h1>

      <p className="mt-2 text-lg text-zinc-600">
        {empresa}
      </p>

      <p className="mt-1 text-sm text-zinc-400 capitalize">
        {data}
      </p>
    </div>
  );
}