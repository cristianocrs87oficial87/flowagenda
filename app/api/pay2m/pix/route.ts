import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user_id");
    const plano = searchParams.get("plano");

    if (!userId) {
      return NextResponse.json(
        { erro: "Usuário não informado" },
        { status: 400 }
      );
    }

    console.log("==================================");
    console.log("INICIANDO GERAÇÃO PIX");
    console.log("Usuário:", userId);
    console.log("Plano:", plano);
    console.log("==================================");

    // Buscar token
    const tokenResponse = await fetch(
      new URL("/api/pay2m/token", request.url)
    );

    const tokenData = await tokenResponse.json();

    console.log("TOKEN:");
    console.log(tokenData);

    if (!tokenData.access_token) {
      return NextResponse.json(
        {
          erro: "Token Pay2M não encontrado",
          detalhe: tokenData,
        },
        {
          status: 500,
        }
      );
    }

    const valor = plano === "anual" ? 397 : 39.9;

    console.log("VALOR:", valor);

    const response = await fetch(
      "https://portal.pay2m.com.br/api/v1/pix/qrcode",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: valor,
          generator_name: "FlowAgenda",
          generator_document: "58120345835",
          external_reference: `FLOW-${Date.now()}`,
          expiration_time: 1800,
          payer_message: "Assinatura FlowAgenda",
        }),
      }
    );

    const data = await response.json();

    console.log("==================================");
    console.log("STATUS PAY2M:", response.status);
    console.log("RESPOSTA PAY2M:");
    console.log(JSON.stringify(data, null, 2));
    console.log("==================================");

    if (!response.ok) {
      return NextResponse.json(
        {
          erro: "Erro retornado pela Pay2M",
          detalhe: data,
        },
        {
          status: response.status,
        }
      );
    }

    const pagamento = {
      usuario_id: userId,
      reference_code: data.reference_code ?? null,
      transaction_id: data.transaction_id ?? null,
      status: "awaiting_payment",
      valor,
      qr_code: data.qrcode ?? null,
      copia_cola: data.content ?? null,
    };

    console.log("OBJETO PAGAMENTO:");
    console.log(JSON.stringify(pagamento, null, 2));

    const { error } = await supabaseAdmin
      .from("premium_pagamentos")
      .insert(pagamento);

    if (error) {
      console.log("ERRO AO SALVAR:");
      console.log(error);

      return NextResponse.json(
        {
          erro: "Erro ao salvar no banco",
          detalhe: error,
        },
        {
          status: 500,
        }
      );
    }

    console.log("PIX GERADO COM SUCESSO");

    return NextResponse.json({
      qr_code: data.qrcode,
      content: data.content,
      reference_code: data.reference_code,
    });
  } catch (error: any) {
    console.log("==================================");
    console.log("ERRO GERAL");
    console.log(error);
    console.log(error?.message);
    console.log(error?.stack);
    console.log("==================================");

    return NextResponse.json(
      {
        erro: error?.message ?? "Erro interno",
        stack: error?.stack,
      },
      {
        status: 500,
      }
    );
  }
}