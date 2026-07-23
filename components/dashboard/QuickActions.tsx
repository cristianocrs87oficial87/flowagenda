import Link from "next/link";
import { Plus, Share2 } from "lucide-react";

interface Props {
  linkPublico: string;
}

export default function QuickActions({
  linkPublico,
}: Props) {
  const compartilhar = () => {
    navigator.clipboard.writeText(linkPublico);

    alert("Link copiado!");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        href="/admin/agendamentos/novo"
        className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-4 text-white font-semibold hover:bg-violet-700 transition"
      >
        <Plus size={20} />

        Novo
      </Link>

      <button
        onClick={compartilhar}
        className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-4 font-semibold hover:bg-zinc-100 transition"
      >
        <Share2 size={20} />

        Compartilhar
      </button>
    </div>
  );
}