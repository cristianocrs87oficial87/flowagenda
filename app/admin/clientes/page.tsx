"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Users, Search, Download } from "lucide-react";

export default function ClientesPage() {
  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-zinc-900">
          Clientes
        </h1>

        <p className="mt-2 text-zinc-500">
          Todos os clientes que realizarem agendamentos aparecerão aqui automaticamente.
        </p>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou WhatsApp..."
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white hover:bg-violet-700 transition">
            <Download className="h-5 w-5" />
            Exportar
          </button>

        </div>
      </Card>

      <Card className="p-16">

        <div className="flex flex-col items-center justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
            <Users className="h-12 w-12 text-violet-600" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            Nenhum cliente ainda
          </h2>

          <p className="mt-3 max-w-md text-center text-zinc-500">
            Quando um cliente realizar seu primeiro agendamento,
            ele será salvo automaticamente nesta lista.
          </p>

        </div>

      </Card>
    </main>
  );
}