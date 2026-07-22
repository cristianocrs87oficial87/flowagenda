"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { criarConta } from "@/lib/auth";

export default function CadastroPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("Salao");

  async function cadastrar() {
    if (
      !nome ||
      !responsavel ||
      !telefone ||
      !email ||
      !senha
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve possuir no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    const resultado = await criarConta({
      nome,
      responsavel,
      telefone,
      email,
      senha,
      categoria,
    });

    setLoading(false);

    if (!resultado.success) {
      alert(resultado.message);
      return;
    }

    alert("Conta criada com sucesso!");

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-violet-700">
            FlowAgenda
          </h1>

          <p className="text-zinc-500 mt-2">
            Criar nova conta
          </p>

        </div>

        <div className="space-y-5">

          <div>

            <label className="text-sm font-medium">
              Nome do estabelecimento
            </label>

            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="Studio Bella Hair"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Responsável
            </label>

            <input
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="Maria Silva"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              WhatsApp
            </label>

            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="(11)99999-9999"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Categoria
            </label>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
            >
              <option value="Salao">Salão de Beleza</option>
              <option value="Barbearia">Barbearia</option>
              <option value="Manicure">Manicure</option>
              <option value="Clinica">Clínica de Estética</option>
              <option value="Podologia">Podologia</option>
              <option value="Lash">Lash Designer</option>
            </select>

          </div>

          <div>

            <label className="text-sm font-medium">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="contato@empresa.com"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600"
              placeholder="********"
            />

          </div>

          <button
            onClick={cadastrar}
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 text-white font-semibold hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          <div className="text-center pt-4 border-t">

            <p className="text-sm text-zinc-500">
              Já possui uma conta?
            </p>

            <Link
              href="/login"
              className="text-violet-700 font-semibold hover:underline"
            >
              Fazer Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}