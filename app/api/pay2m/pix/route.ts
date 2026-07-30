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

    // Busca o token
    const tokenResponse = await fetch(
      new URL("/api/pay2m/token", request.url)
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.log("ERRO TOKEN:", tokenData);

      return NextResponse.json(
        {
          erro: "Não foi possível gerar o token da Pay2M",
        },
        {
          status: 500,
        }
      );
    }

    const accessToken = tokenData.access_token;

    console.log("================================");
    console.log("GERANDO PIX PARA:", userId);
    console.log("PLANO:", plano);
    console.log("================================");

    const valor =
      plano === "anual"
        ? 497.0
        : 49.9;

    const response = await fetch(
      "https://portal.pay2m.com.br/api/v1/pix/qrcode",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

    console.log("STATUS PAY2M:", response.status);
    console.log("RETORNO PAY2M:");
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const pagamento = {
      usuario_id: userId,
      reference_code: data.reference_code,
      transaction_id: data.transaction_id ?? null,
      status: "awaiting_payment",
      valor: valor,
      qr_code: data.qrcode ?? null,
      copia_cola: data.content,
    };

    console.log("SALVANDO:");
    console.log(pagamento);

    const { error } = await supabaseAdmin
      .from("premium_pagamentos")
      .insert(pagamento);

    console.log("INSERT ERROR:", error);

    if (error) {
      return NextResponse.json(
        {
          erro: "Erro ao salvar pagamento",
          detalhe: error,
        },
        {
          status: 500,
        }
      );
    }

    const { data: pagamentos, error: erroSelect } =
      await supabaseAdmin
        .from("premium_pagamentos")
        .select("*")
        .order("created_at", { ascending: false });

    console.log("ERRO SELECT:", erroSelect);
    console.log("TOTAL REGISTROS:", pagamentos?.length);
    console.log("TABELA PREMIUM:");
    console.log(pagamentos);

    return NextResponse.json({
      content: data.content,
      reference_code: data.reference_code,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        erro: "Falha ao gerar PIX",
      },
      {
        status: 500,
      }
    );
  }
}