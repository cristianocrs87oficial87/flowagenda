interface StatsCardProps {
  titulo: string;
  valor: number | string;
}

export default function StatsCard({
  titulo,
  valor,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">
        {titulo}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-zinc-900">
        {valor}
      </h2>
    </div>
  );
}