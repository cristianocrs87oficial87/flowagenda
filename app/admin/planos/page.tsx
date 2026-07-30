"use client";

import { useEffect } from "react";
import { empresaAtual } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function PlanosPage() {
  useEffect(() => {
    carregarPlano();
  }, []);

  async function carregarPlano() {
    console.clear();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const empresa = await empresaAtual();

    console.log("====================================");
    console.log("USER:", user);
    console.log("EMPRESA:", empresa);

    if (!empresa) {
      console.log("EMPRESA NÃO ENCONTRADA");
      return;
    }

    const { data, error } = await supabase
      .from("assinaturas")
      .select("*");

    console.log("TODAS ASSINATURAS:", data);
    console.log("ERRO:", error);

    console.log("====================================");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Diagnóstico do Plano
      </h1>

      <p className="mt-4 text-gray-600">
        Abra o Console (F12). Esta página está apenas fazendo o teste.
      </p>
    </div>
  );
}