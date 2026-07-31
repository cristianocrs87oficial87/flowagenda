import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const [{ count: empresas }, { count: premium }, { count: teste }, { data: pagamentos }] =
      await Promise.all([
        supabaseAdmin
          .from("empresas")
          .select("*", { count: "exact", head: true }),

        supabaseAdmin
          .from("empresas")
          .select("*", { count: "exact", head: true })
          .eq("premium", true),

        supabaseAdmin
          .from("assinaturas")
          .select("*", { count: "exact", head: true })
          .eq("status", "teste"),

        supabaseAdmin
          .from("premium_pagamentos")
          .select("valor")
          .eq("status", "paid"),
      ]);

    const receita =
      pagamentos?.reduce(
        (total, item) => total + Number(item.valor),
        0
      ) ?? 0;

    return NextResponse.json({
      empresas: empresas ?? 0,
      premium: premium ?? 0,
      teste: teste ?? 0,
      receita,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao carregar dashboard" },
      { status: 500 }
    );
  }
}