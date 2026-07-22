"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { empresaAtual } from "@/lib/auth";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Servico {
  id: string;
  nome: string;
  duracao: number;
  preco: number;
}

export default function ServicosAdminPage() {
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [preco, setPreco] = useState("");

  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
  const empresa = await empresaAtual();

  if (!empresa) return;

  const { data, error } = await supabase
  .from("servicos")
  .select("*")
  .eq("empresa_id", empresa.id)
  .order("nome");

if (error) {
  console.error(error);
  return;
}

setServicos(data ?? []);
}

  async function salvarServico() {
  const empresa = await empresaAtual();

  if (!empresa) {
    alert("Empresa não encontrada.");
    return;
  }

  const { error } = await supabase
    .from("servicos")
    .insert({
      empresa_id: empresa.id,
      nome,
      duracao: Number(duracao),
      preco: Number(preco),
    });

  if (error) {
    alert(error.message);
    return;
  }

  setNome("");
  setDuracao("");
  setPreco("");

  await carregarServicos();

  alert("Serviço cadastrado com sucesso!");
}
  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold">
          Serviços
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Cadastre os serviços do estabelecimento.
        </p>

        <Card className="space-y-4">
          <Input
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            placeholder="Duração (minutos)"
            type="number"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />

          <Input
            placeholder="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <Button
            fullWidth
            onClick={salvarServico}
          >
            Salvar Serviço
          </Button>
        </Card>

        <div className="mt-8 space-y-4">
          {servicos.length === 0 ? (
            <p className="text-center text-zinc-500">
              Nenhum serviço cadastrado.
            </p>
          ) : (
            servicos.map((servico) => (
              <Card key={servico.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {servico.nome}
                    </h2>

                    <p className="text-sm text-zinc-500">
                      {servico.duracao} min
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-violet-700">
                      R$ {servico.preco.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}