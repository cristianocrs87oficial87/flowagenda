"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
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

  telefone: string | null;
  instagram: string | null;

  mostrar_whatsapp: boolean;
  mostrar_instagram: boolean;
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

      if (!error && data) {
        setEmpresa(data as Empresa);
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
    <>
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
<div className="mt-5 flex items-center justify-center gap-3 flex-wrap">

  {empresa.mostrar_whatsapp && empresa.telefone && (
    <a
      href={`https://wa.me/55${empresa.telefone.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white shadow-md hover:scale-105 transition-all duration-300"
    >
      <FaWhatsapp size={18} />
      <span className="text-sm font-medium">
        WhatsApp
      </span>
    </a>
  )}

  {empresa.mostrar_instagram && empresa.instagram && (
    <a
      href={`https://instagram.com/${empresa.instagram.replace("@", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-md hover:scale-105 transition-all duration-300"
      style={{
        background:
          "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
      }}
    >
      <FaInstagram size={18} />
      <span className="text-sm font-medium">
        Instagram
      </span>
    </a>
  )}

</div>
        </Card>
      </main>
    </>
  );
}