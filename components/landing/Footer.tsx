import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row">

        <div>

          <h3 className="text-2xl font-bold">
            FlowAgenda
          </h3>

          <p className="mt-2 text-zinc-400">
            Agendamento Inteligente para profissionais da beleza.
          </p>

        </div>

        <div className="flex gap-8 text-zinc-400">

          <Link href="#recursos">
            Recursos
          </Link>

          <Link href="#planos">
            Planos
          </Link>

          <Link href="#faq">
            FAQ
          </Link>

        </div>

      </div>

      <div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} FlowAgenda. Todos os direitos reservados.
      </div>
    </footer>
  );
}