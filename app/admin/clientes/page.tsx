"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Users, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setLoading(false);
      return;
    }

    const { data: empresa } = await supabase
      .from("empresas")
      .select("id")
      .eq("usuario_id", session.user.id)
      .single();

    if (!empresa) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("clientes")
      .select("*")
      .eq("empresa_id", empresa.id)
      .order("created_at", { ascending: false });

    setClientes(data || []);
    setLoading(false);
  }

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((cliente) => {
      const texto = busca.toLowerCase();

      return (
        cliente.nome?.toLowerCase().includes(texto) ||
        cliente.whatsapp?.toLowerCase().includes(texto)
      );
    });
  }, [clientes, busca]);

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
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white hover:bg-violet-700 transition">
            <Download className="h-5 w-5" />
            Exportar
          </button>
        </div>
      </Card>

      <Card className="p-6">
        {loading ? (
          <p className="text-center text-zinc-500">
            Carregando clientes...
          </p>
        ) : clientesFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Nome</th>
                  <th className="pb-3">WhatsApp</th>
                </tr>
              </thead>

              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      {cliente.nome}
                    </td>

                    <td className="py-4">
                      {cliente.whatsapp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}