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
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [preco, setPreco] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const empresa = await empresaAtual();

    if (!empresa) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("empresa_id", empresa.id)
      .order("nome");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setServicos(data ?? []);
    setLoading(false);
  }

  function editarServico(servico: Servico) {
    setEditandoId(servico.id);

    setNome(servico.nome);
    setDuracao(String(servico.duracao));
    setPreco(String(servico.preco));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function salvarServico() {
    if (!nome || !duracao || !preco) {
      alert("Preencha todos os campos.");
      return;
    }

    const empresa = await empresaAtual();

    if (!empresa) return;

    let error;

    if (editandoId) {
      const resposta = await supabase
        .from("servicos")
        .update({
          nome,
          duracao: Number(duracao),
          preco: Number(preco),
        })
        .eq("id", editandoId);

      error = resposta.error;
    } else {
      const resposta = await supabase
        .from("servicos")
        .insert({
          empresa_id: empresa.id,
          nome,
          duracao: Number(duracao),
          preco: Number(preco),
        });

      error = resposta.error;
    }

    if (error) {
      alert(error.message);
      return;
    }

    setNome("");
    setDuracao("");
    setPreco("");
    setEditandoId(null);

    await carregarServicos();

    alert(
      editandoId
        ? "Serviço atualizado com sucesso!"
        : "Serviço cadastrado com sucesso!"
    );
  }

  async function excluirServico(id: string) {
    const confirmar = confirm(
      "Deseja realmente excluir este serviço?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("servicos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await carregarServicos();
  }
    return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold">
          Serviços
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Cadastre e gerencie os serviços do seu estabelecimento.
        </p>

        <Card className="p-6 mb-8 space-y-4">

          <Input
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Duração (minutos)"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />

          <Input
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <Button
            onClick={salvarServico}
            className="w-full"
          >
            {editandoId ? "Atualizar Serviço" : "Salvar Serviço"}
          </Button>

        </Card>

        {loading ? (

          <Card className="p-6 text-center">
            Carregando...
          </Card>

        ) : servicos.length === 0 ? (

          <Card className="p-6 text-center text-zinc-500">
            Nenhum serviço cadastrado.
          </Card>

        ) : (

          <div className="space-y-4">

            {servicos.map((servico) => (

              <Card
                key={servico.id}
                className="p-5"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="font-semibold text-lg">
                      {servico.nome}
                    </h2>

                    <p className="text-sm text-zinc-500 mt-1">
                      {servico.duracao} min
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-pink-600 text-lg">
                      R$ {Number(servico.preco).toFixed(2)}
                    </p>

                    <div className="flex justify-end gap-4 mt-3">

                      <button
                        onClick={() => editarServico(servico)}
                        className="text-xl hover:scale-110 transition"
                        title="Editar"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => excluirServico(servico.id)}
                        className="text-xl hover:scale-110 transition"
                        title="Excluir"
                      >
                        🗑️
                      </button>

                    </div>

                  </div>

                </div>

              </Card>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}