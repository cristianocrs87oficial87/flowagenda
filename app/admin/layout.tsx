"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CalendarDays,
  Scissors,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { logout, empresaAtual } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [saindo, setSaindo] = useState(false);

  const [empresa, setEmpresa] = useState<{
    nome: string;
    responsavel: string;
  } | null>(null);

  useEffect(() => {
    carregarEmpresa();
  }, []);

  async function carregarEmpresa() {
    const dados = await empresaAtual();

    if (!dados) return;

    setEmpresa({
      nome: dados.nome,
      responsavel: dados.responsavel,
    });
  }

  async function sair() {
    if (saindo) return;

    setSaindo(true);

    await logout();

    router.replace("/login");
  }

  const menu = [
    {
      nome: "Agendamentos",
      href: "/admin/agendamentos",
      icon: CalendarDays,
    },
    {
      nome: "Serviços",
      href: "/admin/servicos",
      icon: Scissors,
    },
    {
      nome: "Profissionais",
      href: "/admin/profissionais",
      icon: Users,
    },
    {
      nome: "Configurações",
      href: "/admin/configuracoes",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* Header */}

      <header className="h-16 bg-white border-b flex items-center justify-between px-6">

        <div>
          <h1 className="text-xl font-bold text-violet-700">
            FlowAgenda
          </h1>

          <p className="text-xs text-zinc-500">
            Painel Administrativo
          </p>
        </div>

        <div className="flex items-center gap-5">

          <div className="h-11 w-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg">
            {empresa?.nome?.charAt(0).toUpperCase() ?? "F"}
          </div>

          <div className="text-right">

            <p className="font-semibold">
              {empresa?.nome ?? "Carregando..."}
            </p>

            <p className="text-xs text-zinc-500">
              {empresa?.responsavel ?? ""}
            </p>

          </div>

          <button
            onClick={sair}
            disabled={saindo}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <LogOut size={18} />

            {saindo ? "Saindo..." : "Sair"}
          </button>

        </div>

      </header>

      <div className="flex">

        {/* Sidebar */}

        <aside className="hidden md:block w-64 bg-white border-r min-h-[calc(100vh-64px)]">

          <nav className="p-4 space-y-2">

            {menu.map((item) => {
              const Icon = item.icon;

              const ativo = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    ativo
                      ? "bg-violet-600 text-white"
                      : "hover:bg-zinc-100"
                  }`}
                >
                  <Icon size={20} />

                  {item.nome}
                </Link>
              );
            })}

          </nav>

        </aside>

        {/* Conteúdo */}

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}