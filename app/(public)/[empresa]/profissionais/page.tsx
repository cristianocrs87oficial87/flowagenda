"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Card } from "@/components/ui/Card";
import { useBooking } from "@/contexts";

interface Profissional {
  id: string;
  nome: string;
}

export default function ProfissionaisPage() {
  const router = useRouter();

  const params = useParams();
  const empresa = params.empresa as string;

  const { setBooking } = useBooking();

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
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
      .from("profissionais")
      .select("*")
      .eq("empresa_id", empresaData.id)
      .order("nome");

    setProfissionais(data ?? []);
    setLoading(false);
  }

  function selecionarProfissional(profissional: Profissional) {
    setBooking((prev) => ({
      ...prev,
      empresa,
      profissional,
    }));

    router.push(`/${empresa}/data`);
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">

        <Link
          href={`/${empresa}/servicos`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-2xl font-bold mt-6">
          Escolha o profissional
        </h1>

        <p className="text-zinc-500 mb-6">
          Quem vai realizar o atendimento?
        </p>

        {loading ? (
          <p className="text-center text-zinc-500">
            Carregando...
          </p>
        ) : profissionais.length === 0 ? (
          <p className="text-center text-zinc-500">
            Nenhum profissional cadastrado.
          </p>
        ) : (
          <div className="space-y-4">
            {profissionais.map((profissional) => (
              <button
                key={profissional.id}
                type="button"
                onClick={() => selecionarProfissional(profissional)}
                className="w-full text-left"
              >
                <Card className="cursor-pointer hover:border-violet-600 transition-all">
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-600">
                      {profissional.nome.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        {profissional.nome}
                      </h2>

                      <p className="text-sm text-zinc-500">
                        Profissional
                      </p>
                    </div>

                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}

      </Card>
    </main>
  );
}