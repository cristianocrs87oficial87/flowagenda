"use client";
import { useEffect, useState } from "react";

import { empresaAtual } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

import {
  Crown,
  CheckCircle2,
  Sparkles,
  CalendarDays,
} from "lucide-react";

export default function PlanosPage() {
  const [loading, setLoading] = useState(true);

const [status, setStatus] = useState("");

const [diasRestantes, setDiasRestantes] = useState(0);

const [empresaId, setEmpresaId] = useState<number | null>(null);
useEffect(() => {
  carregarPlano();
}, []);
async function carregarPlano() {
  setLoading(true);

  const empresa = await empresaAtual();

  if (!empresa) {
    setLoading(false);
    return;
  }

  setEmpresaId(empresa.id);

  const { data } = await supabase
    .from("assinaturas")
    .select("*")
    .eq("empresa_id", empresa.id)
    .single();

  if (!data) {
    setLoading(false);
    return;
  }

  const agora = new Date();

  if (data.status === "premium") {
    setStatus("Premium");

    if (data.premium_ate) {
      const dias = Math.ceil(
        (new Date(data.premium_ate).getTime() -
          agora.getTime()) /
          86400000
      );

      setDiasRestantes(Math.max(dias, 0));
    }

    setLoading(false);
    return;
  }

  const dias = Math.ceil(
    (new Date(data.fim_teste).getTime() -
      agora.getTime()) /
      86400000
  );

  if (dias <= 0) {
    setStatus("Expirado");
    setDiasRestantes(0);
  } else {
    setStatus("Teste Gratuito");
    setDiasRestantes(dias);
  }

  setLoading(false);
}
  return (
    <div className="space-y-8">

      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Planos
        </h1>

        <p className="mt-2 text-gray-600">
          Gerencie sua assinatura do FlowAgenda.
        </p>
      </div>

      {/* Card Premium */}
      <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-sm">

        {/* Topo */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white">

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3">
              <Crown className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                FlowAgenda Premium
              </h2>

              <p className="text-violet-100">
                Todas as funcionalidades liberadas.
              </p>
            </div>
          </div>

        </div>

        <div className="p-8">

          {/* Preço */}

          <div className="mb-8">

            <span className="text-5xl font-bold text-gray-900">
              R$ 39,90
            </span>

            <span className="ml-2 text-lg text-gray-500">
              /mês
            </span>

          </div>

          {/* Benefícios */}

          <div className="grid gap-4 md:grid-cols-2">

            <Item texto="Agendamentos ilimitados" />

            <Item texto="Clientes ilimitados" />

            <Item texto="Profissionais ilimitados" />

            <Item texto="WhatsApp integrado" />

            <Item texto="Suporte prioritário" />

            <Item texto="Atualizações automáticas" />

          </div>

          {/* Status */}

          <div className="mt-10 rounded-2xl border bg-violet-50 p-6">

            <div className="flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-violet-600" />

              <span className="font-semibold text-gray-900">
                Status da Assinatura
              </span>

            </div>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <span
  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
    status === "Premium"
      ? "bg-violet-100 text-violet-700"
      : status === "Expirado"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {loading ? "Carregando..." : status}
</span>

                <p className="mt-4 flex items-center gap-2 text-gray-700">

                  <CalendarDays className="h-5 w-5 text-violet-600" />

                  {status === "Expirado" ? (
  <>
    Assinatura <strong>expirada</strong>
  </>
) : (
  <>
    Restam <strong>{diasRestantes} dias</strong>
  </>
)}

                </p>

              </div>

              <button
                className="rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-700"
              >
                Assinar Premium
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function Item({ texto }: { texto: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">

      <CheckCircle2 className="h-5 w-5 text-green-600" />

      <span className="font-medium text-gray-700">
        {texto}
      </span>

    </div>
  );
}