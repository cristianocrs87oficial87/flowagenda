"use client";

import { useState } from "react";
import Link from "next/link";

import { recuperarSenha } from "@/lib/auth";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    if (!email) {
      alert("Informe seu e-mail.");
      return;
    }

    setCarregando(true);

    const { error } = await recuperarSenha(email);

    setCarregando(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Enviamos um link para redefinir sua senha.");
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">

      <Card className="w-full max-w-md space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Esqueci minha senha
          </h1>

          <p className="text-zinc-500 mt-2">
            Digite seu e-mail para receber o link de recuperação.
          </p>

        </div>

        <Input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          onClick={enviar}
          disabled={carregando}
        >
          {carregando
            ? "Enviando..."
            : "Enviar link"}
        </Button>

        <div className="text-center">

          <Link
            href="/login"
            className="text-violet-600 hover:underline"
          >
            Voltar para o login
          </Link>

        </div>

      </Card>

    </main>
  );
}