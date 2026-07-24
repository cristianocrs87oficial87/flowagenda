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
  foto: string | null;
}

export default function ProfissionaisAdminPage() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
const [preview, setPreview] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
    const empresa = await empresaAtual();

    if (!empresa) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profissionais")
      .select("*")
      .eq("empresa_id", empresa.id)
      .order("nome");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setProfissionais(data ?? []);
    setLoading(false);
  }

  function editarProfissional(profissional: Profissional) {
  setEditandoId(profissional.id);

  setNome(profissional.nome);

  setPreview(profissional.foto ?? "");
  setFoto(null);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
async function uploadFoto() {
  if (!foto) return preview;

  const extensao = foto.name.split(".").pop();

  const nomeArquivo = `${Date.now()}.${extensao}`;

  const { error } = await supabase.storage
    .from("profissionais")
    .upload(nomeArquivo, foto);

  if (error) {
    alert(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("profissionais")
    .getPublicUrl(nomeArquivo);

  return data.publicUrl;
}
  async function salvarProfissional() {
    if (!nome) {
      alert("Informe o nome do profissional.");
      return;
    }

    const empresa = await empresaAtual();
    const fotoUrl = await uploadFoto();

if (foto && !fotoUrl) return;

    if (!empresa) {
      alert("Empresa não encontrada.");
      return;
    }

    let error;

    if (editandoId) {
      const resposta = await supabase
        .from("profissionais")
        .update({
  nome,
  foto: fotoUrl,
})
        .eq("id", editandoId);

      error = resposta.error;
    } else {
      const resposta = await supabase
        .from("profissionais")
        .insert({
  empresa_id: empresa.id,
  nome,
  foto: fotoUrl,
})

      error = resposta.error;
    }

    if (error) {
      alert(error.message);
      return;
    }

    setNome("");
setFoto(null);
setPreview("");
setEditandoId(null);

    await carregarProfissionais();

    alert(
      editandoId
        ? "Profissional atualizado com sucesso!"
        : "Profissional cadastrado com sucesso!"
    );
  }

  async function excluirProfissional(id: string) {
    const confirmar = confirm(
      "Deseja realmente excluir este profissional?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("profissionais")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await carregarProfissionais();
  }
    return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold">
          Profissionais
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Cadastre e gerencie os profissionais do estabelecimento.
        </p>

        <Card className="p-6 mb-8 space-y-4">
<Input
  placeholder="Nome do profissional"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
/>
{preview && (
  <div className="flex justify-center">
    <img
      src={preview}
      alt="Foto do profissional"
    className="h-28 w-28 rounded-full object-cover border-4 border-violet-200 shadow-md"
    />
  </div>
)}
          <input
  id="foto-profissional"
type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    setFoto(arquivo);
    setPreview(URL.createObjectURL(arquivo));
  }}
/>
<label
  htmlFor="foto-profissional"
  className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 py-4 font-medium text-violet-700 hover:bg-violet-100 transition"
>
  📷 Selecionar foto do profissional
</label>
          <Button
            onClick={salvarProfissional}
            className="w-full"
          >
            {editandoId
              ? "Atualizar Profissional"
              : "Salvar Profissional"}
          </Button>

        </Card>

        {loading ? (

          <Card className="p-6 text-center">
            Carregando...
          </Card>

        ) : profissionais.length === 0 ? (

          <Card className="p-6 text-center text-zinc-500">
            Nenhum profissional cadastrado.
          </Card>

        ) : (

          <div className="space-y-4">

            {profissionais.map((profissional) => (

              <Card
                key={profissional.id}
                className="p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-4">
                        <img
  src={profissional.foto || "/avatar.png"}
  alt={profissional.nome}
  className="h-14 w-14 rounded-full object-cover bg-zinc-200"
/>
  <h2 className="font-semibold text-lg">
    {profissional.nome}
  </h2>
</div>

                  </div>

                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => editarProfissional(profissional)}
                      className="text-xl hover:scale-110 transition"
                      title="Editar"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => excluirProfissional(profissional.id)}
                      className="text-xl hover:scale-110 transition"
                      title="Excluir"
                    >
                      🗑️
                    </button>

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