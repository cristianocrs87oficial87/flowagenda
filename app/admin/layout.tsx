"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  UserRound,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: any;
};

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Agendamentos",
    href: "/admin/agendamentos",
    icon: CalendarDays,
  },
  {
    name: "Profissionais",
    href: "/admin/profissionais",
    icon: UserRound,
  },
  {
    name: "Serviços",
    href: "/admin/servicos",
    icon: BriefcaseBusiness,
  },
  {
    name: "Clientes",
    href: "/admin/clientes",
    icon: Users,
  },
  {
    name: "Configurações",
    href: "/admin/configuracoes",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("===== LAYOUT NOVO =====");
  const pathname = usePathname();
  const router = useRouter();


  const [loading, setLoading] = useState(true);

  const [empresa, setEmpresa] = useState<any>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
  .from("empresas")
  .select("*")
  .eq("usuario_id", session.user.id)
  .single();

      setEmpresa(data);
      setLoading(false);
    }

    load();
  }, [router, supabase]);

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* MOBILE MENU */}

      {menuOpen && (
        <div
  className="fixed inset-0 z-50 bg-black/40 lg:hidden"
  onClick={() => setMenuOpen(false)}
>

          <div
  className="h-full w-72 bg-white shadow-xl"
  onClick={(e) => e.stopPropagation()}
>

            <div className="flex items-center justify-between border-b p-5">

              <div>
                <h2 className="text-xl font-bold text-violet-600">
                  FlowAgenda
                </h2>

                <p className="text-xs text-zinc-500">
                  Painel Administrativo
                </p>
              </div>

              <button onClick={() => setMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-2 p-4">

              {menu.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                    ${
                      active
                        ? "bg-violet-600 text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />

                    {item.name}
                  </Link>
                );
              })}

              <button
                onClick={sair}
                className="mt-6 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-600 hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />

                Sair
              </button>

            </div>
          </div>
        </div>
      )}

      <div className="flex">

        {/* SIDEBAR DESKTOP */}

        <aside className="hidden min-h-screen w-72 border-r bg-white lg:flex lg:flex-col">

          <div className="border-b p-6">

            <h1 className="text-2xl font-bold text-violet-600">
              FlowAgenda
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Agendamento Inteligente
            </p>

          </div>

          <div className="flex-1 p-4">

            <nav className="space-y-2">

              {menu.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                    ${
                      active
                        ? "bg-violet-600 text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />

                    {item.name}
                  </Link>
                );
              })}
            </nav>

          </div>

          <div className="border-t p-5">

            <button
              onClick={sair}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-medium text-red-600 hover:bg-red-100"
            >
              <LogOut className="h-5 w-5" />

              Sair
            </button>

          </div>

        </aside>

        {/* CONTEÚDO */}
                <main className="flex min-h-screen flex-1 flex-col">

          {/* HEADER */}

          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">

            <div className="flex items-center gap-3">

              <button
                onClick={() => setMenuOpen(true)}
                className="rounded-lg p-2 hover:bg-zinc-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div>
                <h2 className="text-lg font-semibold text-zinc-900">
                  {empresa?.nome || "Minha Empresa"}
                </h2>

                <p className="hidden text-sm text-zinc-500 sm:block">
                  Painel Administrativo
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <button className="relative rounded-xl p-2 hover:bg-zinc-100">
                <Bell className="h-5 w-5 text-zinc-600" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden items-center gap-3 rounded-xl border px-3 py-2 md:flex">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
                  {empresa?.nome?.charAt(0)?.toUpperCase() || "F"}
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium text-zinc-900">
                    {empresa?.nome || "Empresa"}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Administrador
                  </p>
                </div>

                <ChevronDown className="h-4 w-4 text-zinc-500" />

              </div>

            </div>

          </header>

          {/* PAGE */}

          <section className="flex-1 px-5 pt-8 pb-8 lg:p-8">
            {children}
          </section>

        </main>

      </div>

    </div>
  );
}