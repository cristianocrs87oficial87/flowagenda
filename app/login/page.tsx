"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar() {
    if (!email || !senha) {
      alert("Preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);

    const { error } = await login(email, senha);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/agendamentos");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-violet-700">
            FlowAgenda
          </h1>

          <p className="text-zinc-500 mt-2">
            Painel Administrativo
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-violet-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 focus:border-violet-600 outline-none"
            />
          </div>

          <button
            onClick={entrar}
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <Link
            href="/esqueci-senha"
            className="block text-center text-sm text-violet-700 hover:underline"
          >
            Esqueci minha senha
          </Link>

          <div className="border-t pt-5 text-center">

            <p className="text-sm text-zinc-500 mb-4">
              Ainda não possui uma conta?
            </p>

            <Link
              href="/cadastro"
              className="block w-full rounded-lg border border-violet-600 py-3 font-semibold text-violet-700 hover:bg-violet-50 transition"
            >
              Criar Conta
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}