"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function RedefinirSenhaPage() {
  const router = useRouter();

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function salvarNovaSenha() {
    if (!senha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não conferem.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: senha,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Senha alterada com sucesso!");

    router.replace("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-700">
            Nova senha
          </h1>

          <p className="text-zinc-500 mt-2">
            Digite sua nova senha.
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Nova senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a nova senha"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-violet-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirmar senha
            </label>

            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme a nova senha"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-violet-600 outline-none"
            />
          </div>

          <button
            onClick={salvarNovaSenha}
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>

          <Link
            href="/login"
            className="block text-center text-sm text-violet-700 hover:underline"
          >
            Voltar para o login
          </Link>

        </div>

      </div>
    </main>
  );
}