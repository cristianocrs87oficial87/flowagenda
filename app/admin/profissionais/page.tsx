"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { empresaAtual } from "@/lib/auth";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Profissional {
  id: string;
  nome: string;
}

export default function ProfissionaisAdminPage() {
  const [nome, setNome] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
    const empresa = await empresaAtual();

    if (!empresa) return;

    const { data, error } = await supabase
      .from("profissionais")
      .select("*")
      .eq("empresa_id", empresa.id)
      .order("nome");

    if (error) {
      console.error(error);
      return;
    }

    setProfissionais(data ?? []);
  }

  async function salvarProfissional() {
    const empresa = await empresaAtual();

    if (!empresa) {
      alert("Empresa não encontrada.");
      return;
    }

    const { error } = await supabase
      .from("profissionais")
      .insert({
        empresa_id: empresa.id,
        nome,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setNome("");

    await carregarProfissionais();

    alert("Profissional cadastrado com sucesso!");
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold">
          Profissionais
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Cadastre os profissionais do estabelecimento.
        </p>

        <Card className="space-y-4">

          <Input
            placeholder="Nome do profissional"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Button
            fullWidth
            onClick={salvarProfissional}
          >
            Salvar Profissional
          </Button>

        </Card>

        <div className="mt-8 space-y-4">
          {profissionais.length === 0 ? (
            <p className="text-center text-zinc-500">
              Nenhum profissional cadastrado.
            </p>
          ) : (
            profissionais.map((profissional) => (
              <Card key={profissional.id}>
                <h2 className="font-semibold text-lg">
                  {profissional.nome}
                </h2>
              </Card>
            ))
          )}
        </div>

      </div>
    </main>
  );
}