"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Card } from "@/components/ui/Card";
import { useBooking } from "@/contexts";

interface Servico {
  id: string;
  nome: string;
  duracao: number;
  preco: number;
}

export default function ServicosPage() {
  const params = useParams();
  const empresa = params.empresa as string;

  const router = useRouter();
  const { setBooking } = useBooking();

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const { data: empresaData } = await supabase
      .from("empresas")
      .select("id")
      .eq("slug", empresa)
      .single();

    if (!empresaData) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("servicos")
      .select("*")
      .eq("empresa_id", empresaData.id)
      .order("nome");

    setServicos(data ?? []);
    setLoading(false);
  }

  function selecionarServico(servico: Servico) {
    setBooking((prev) => ({
      ...prev,
      empresa,
      servico,
    }));

    router.push(`/${empresa}/profissionais`);
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">

        <Link
          href={`/${empresa}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-2xl font-bold mt-6">
          Escolha um serviço
        </h1>

        <p className="text-zinc-500 mb-6">
          Selecione o serviço desejado.
        </p>

        {loading ? (
          <p className="text-center text-zinc-500">
            Carregando...
          </p>
        ) : servicos.length === 0 ? (
          <p className="text-center text-zinc-500">
            Nenhum serviço cadastrado.
          </p>
        ) : (
          <div className="space-y-4">
            {servicos.map((servico) => (
              <Card
                key={servico.id}
                onClick={() => selecionarServico(servico)}
                className="cursor-pointer hover:border-violet-600 transition-all"
              >
                <h2 className="font-semibold text-lg">
                  {servico.nome}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {servico.duracao} min
                </p>

                <p className="font-bold text-violet-700 mt-2">
                  R$ {servico.preco.toFixed(2)}
                </p>
              </Card>
            ))}
          </div>
        )}

      </Card>
    </main>
  );
}