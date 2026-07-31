"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white">
            F
          </div>

          <div>
            <h1 className="text-lg font-bold text-zinc-900">
              FlowAgenda
            </h1>

            <p className="text-xs text-zinc-500">
              Agendamento Inteligente
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden gap-8 md:flex">
          <a href="#recursos" className="text-sm text-zinc-600 hover:text-violet-600">
            Recursos
          </a>

          <a href="#planos" className="text-sm text-zinc-600 hover:text-violet-600">
            Planos
          </a>

          <a href="#faq" className="text-sm text-zinc-600 hover:text-violet-600">
            FAQ
          </a>
        </nav>

        {/* Ações */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 hover:text-violet-600"
          >
            Entrar
          </Link>

          <Link
            href="/cadastro"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </header>
  );
}