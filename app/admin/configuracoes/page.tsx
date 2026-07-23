"use client";

import { useEffect, useState } from "react";

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
      setDiasSemana(diasSemana.filter((d) => d !== dia));
    } else {
      setDiasSemana([...diasSemana, dia]);
    }
  }

  return (
  <div className="max-w-xl mx-auto text-zinc-900">

        <h1 className="text-3xl font-bold">
          Configurações da Agenda
        </h1>

        <p className="text-zinc-500 mt-2 mb-8">
          Configure os horários de funcionamento.
        </p>

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
              className="w-full border rounded-lg p-3"
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

            <div className="grid grid-cols-2 gap-2 mt-3">

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