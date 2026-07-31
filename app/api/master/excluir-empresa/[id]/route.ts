import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Busca a empresa
    const { data: empresa, error } = await supabaseAdmin
      .from("empresas")
      .select("id, usuario_id")
      .eq("id", id)
      .single();

    if (error || !empresa) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    // Remove agendamentos
    await supabaseAdmin
      .from("agendamentos")
      .delete()
      .eq("empresa_id", id);

    // Remove profissionais
    await supabaseAdmin
      .from("profissionais")
      .delete()
      .eq("empresa_id", id);

    // Remove serviços
    await supabaseAdmin
      .from("servicos")
      .delete()
      .eq("empresa_id", id);

    // Remove assinatura
    await supabaseAdmin
      .from("assinaturas")
      .delete()
      .eq("empresa_id", id);

    // Remove pagamentos
    if (empresa.usuario_id) {
      await supabaseAdmin
        .from("premium_pagamentos")
        .delete()
        .eq("usuario_id", empresa.usuario_id);
    }

    // Remove empresa
    await supabaseAdmin
      .from("empresas")
      .delete()
      .eq("id", id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao excluir empresa" },
      { status: 500 }
    );
  }
}