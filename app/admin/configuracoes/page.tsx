"use client";

import { useEffect, useRef, useState } from "react";

import { supabase } from "@/lib/supabase";
import { empresaAtual } from "@/lib/auth";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ConfiguracoesPage() {
  const [horaAbertura, setHoraAbertura] = useState("08:00");
  const [horaFechamento, setHoraFechamento] = useState("18:00");
  const [intervalo, setIntervalo] = useState(30);

  const [diasSemana, setDiasSemana] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

  const [linkAgendamento, setLinkAgendamento] = useState("");

  // ==========================
  // LOGO DA EMPRESA (Preview)
  // ==========================

  const [logoPreview, setLogoPreview] = useState("");
  const [enviandoLogo, setEnviandoLogo] = useState(false);

  const inputLogoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    carregarConfiguracoes();
  }, []);

  async function carregarConfiguracoes() {
    const empresa = await empresaAtual();

    if (!empresa) return;

    setHoraAbertura(empresa.hora_abertura ?? "08:00");
    setHoraFechamento(empresa.hora_fechamento ?? "18:00");
    setIntervalo(empresa.intervalo ?? 30);
    setDiasSemana(empresa.dias_semana ?? [1, 2, 3, 4, 5]);

    setLinkAgendamento(
      `${window.location.origin}/${empresa.slug}`
    );

    // Nesta etapa apenas mostramos a imagem,
    // sem salvar no banco ainda.
    if ((empresa as any).logo_url) {
      setLogoPreview((empresa as any).logo_url);
    }
  }

  function escolherLogo() {
    inputLogoRef.current?.click();
  }

  async function alterarLogo(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const arquivo = e.target.files?.[0];

  if (!arquivo) return;

  const empresa = await empresaAtual();

  if (!empresa) return;

  setEnviandoLogo(true);

  try {
    const extensao = arquivo.name.split(".").pop();

    const nomeArquivo =
      `${empresa.id}-${Date.now()}.${extensao}`;

    const { error: uploadError } =
      await supabase.storage
        .from("logos")
        .upload(nomeArquivo, arquivo, {
          upsert: true,
        });

    if (uploadError) {
  console.log("UPLOAD ERROR");
  console.error(uploadError);
  alert(uploadError.message);
  return;
}
    const { data } = supabase.storage
      .from("logos")
      .getPublicUrl(nomeArquivo);

    const url = data.publicUrl;

    const { error } = await supabase
      .from("empresas")
      .update({
        logo_url: url,
      })
      .eq("id", empresa.id);

    if (error) {
  console.log("UPDATE ERROR");
  console.error(error);
  alert(error.message);
  return;
}
/*
const { error } = await supabase
  .from("empresas")
  .update({
    logo_url: url,
  })
  .eq("id", empresa.id);

if (error) {
  console.log("UPDATE ERROR");
  console.error(error);
  alert(error.message);
  return;
}
*/

    setLogoPreview(url);

alert("Upload realizado!");
  
  } finally {
    setEnviandoLogo(false);
  }
}

  async function salvar() {
    const empresa = await empresaAtual();

    if (!empresa) {
      alert("Empresa não encontrada.");
      return;
    }

    const { error } = await supabase
      .from("empresas")
      .update({
        hora_abertura: horaAbertura,
        hora_fechamento: horaFechamento,
        intervalo,
        dias_semana: diasSemana,
      })
      .eq("id", empresa.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Configurações salvas com sucesso!");
  }

  async function copiarLink() {
    await navigator.clipboard.writeText(linkAgendamento);

    alert("✅ Link copiado com sucesso!");
  }

  function compartilharWhatsapp() {
    const mensagem = encodeURIComponent(
      `Olá! 😊

Faça seu agendamento online pelo link abaixo:

${linkAgendamento}`
    );

    window.open(
      `https://wa.me/?text=${mensagem}`,
      "_blank"
    );
  }

  function alterarDia(dia: number) {
    if (diasSemana.includes(dia)) {
      setDiasSemana(
        diasSemana.filter((d) => d !== dia)
      );
    } else {
      setDiasSemana([
        ...diasSemana,
        dia,
      ]);
    }
  }

  return (
  <div className="max-w-xl mx-auto text-zinc-900">
          <h1 className="text-3xl font-bold">
        Configurações da Agenda
      </h1>

      <p className="text-zinc-500 mt-2 mb-8">
        Configure sua empresa e sua agenda.
      </p>

      {/* IDENTIDADE */}

      <Card className="mb-8">

        <h2 className="text-xl font-bold">
          🖼 Identidade da Empresa
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Seu logo será exibido na página pública de agendamento.
        </p>

        <div className="mt-6 flex flex-col items-center">

          <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-dashed border-zinc-300 bg-zinc-100 flex items-center justify-center">

            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl">
                🏢
              </span>
            )}

          </div>

          <input
            ref={inputLogoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={alterarLogo}
          />

          <Button
  className="mt-6"
  onClick={escolherLogo}
  disabled={enviandoLogo}
>
            {enviandoLogo
  ? "Enviando..."
  : logoPreview
  ? "Trocar Logo"
  : "Escolher Logo"}
          </Button>

          <p className="mt-3 text-xs text-zinc-500">
            PNG, JPG ou WEBP
          </p>

        </div>

      </Card>

      {/* CONFIGURAÇÕES */}

      <Card className="space-y-6">

        <div>
          <label className="font-medium">
            Hora de abertura
          </label>

          <Input
            type="time"
            value={horaAbertura}
            onChange={(e) => setHoraAbertura(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">
            Hora de fechamento
          </label>

          <Input
            type="time"
            value={horaFechamento}
            onChange={(e) => setHoraFechamento(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">
            Intervalo
          </label>

          <select
            className="w-full rounded-lg border p-3"
            value={intervalo}
            onChange={(e) => setIntervalo(Number(e.target.value))}
          >
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={60}>60 minutos</option>
          </select>
        </div>

        <div>
          <label className="font-medium">
            Dias de atendimento
          </label>

          <div className="mt-3 grid grid-cols-2 gap-2">

            {[
              ["Segunda", 1],
              ["Terça", 2],
              ["Quarta", 3],
              ["Quinta", 4],
              ["Sexta", 5],
              ["Sábado", 6],
              ["Domingo", 0],
            ].map(([nome, valor]) => (

              <label
                key={String(valor)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={diasSemana.includes(Number(valor))}
                  onChange={() => alterarDia(Number(valor))}
                />

                {nome}

              </label>

            ))}

          </div>

        </div>

        <Button
          fullWidth
          onClick={salvar}
        >
          Salvar Configurações
        </Button>

      </Card>

      {/* LINK DE AGENDAMENTO */}

      <Card className="mt-8 space-y-5">

        <h2 className="text-xl font-bold">
          🔗 Link de Agendamento
        </h2>

        <p className="text-sm text-zinc-500">
          Compartilhe este link com seus clientes.
        </p>

        <Input
          value={linkAgendamento}
          readOnly
        />

        <Button
          fullWidth
          onClick={copiarLink}
        >
          📋 Copiar Link
        </Button>

        <Button
          fullWidth
          onClick={compartilharWhatsapp}
        >
          📱 Compartilhar no WhatsApp
        </Button>

        <a
          href={linkAgendamento}
          target="_blank"
          rel="noreferrer"
        >
          <Button fullWidth>
            🌐 Abrir Página de Agendamento
          </Button>
        </a>

      </Card>

    </div>
  );
}