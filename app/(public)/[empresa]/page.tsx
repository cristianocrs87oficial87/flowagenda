"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Empresa = {
  id: string;
  nome: string;
  slug: string;
  logo_url: string | null;
};

export default function EmpresaPage() {
  const params = useParams();
  const slug = params.empresa as string;

  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEmpresa() {
      const { data, error } = await supabase
        .from("empresas")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) {
        setEmpresa(data);
      }

      setLoading(false);
    }

    carregarEmpresa();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Carregando...
      </main>
    );
  }

  if (!empresa) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Empresa não encontrada.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        {empresa.logo_url ? (
  <img
    src={empresa.logo_url}
    alt={empresa.nome}
    className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border border-zinc-200"
  />
) : (
  <div className="w-24 h-24 rounded-full bg-zinc-200 mx-auto mb-6" />
)}

        <h1 className="text-3xl font-bold">
          {empresa.nome}
        </h1>

        <p className="text-zinc-500 mt-2">
          Agende seu horário de forma rápida e prática.
        </p>

        <div className="mt-8">
          <Link href={`/${empresa.slug}/servicos`}>
            <Button fullWidth>
              Agendar Horário
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}