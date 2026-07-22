"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/Card";

import { useBooking } from "@/contexts";

import { supabase } from "@/lib/supabase";

import {
  gerarHorarios,
  filtrarHorariosDisponiveis,
} from "@/lib/horarios";
function formatarDataLocal(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}
export default function HorariosPage() {
  const router = useRouter();
  const params = useParams();

  const empresa = params.empresa as string;

  const { booking, setBooking } = useBooking();

  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
  carregarHorarios();
}, [booking.data, booking.profissional?.id]);

  async function carregarHorarios() {
    setLoading(true);

    // Busca empresa
    const { data: empresaData } = await supabase
      .from("empresas")
      .select("id,hora_abertura,hora_fechamento,intervalo")
      .eq("slug", empresa)
      .single();

    if (!empresaData) {
      setLoading(false);
      return;
    }

    // Gera todos os horários
    const horariosGerados = gerarHorarios(
      empresaData.hora_abertura ?? "08:00",
      empresaData.hora_fechamento ?? "18:00",
      empresaData.intervalo ?? 30
    );

    // Se ainda não escolheu data ou profissional
    if (!booking.data || !booking.profissional?.id) {
      setHorarios(horariosGerados);
      setLoading(false);
      return;
    }

    // Busca horários já ocupados
    const { data: agendamentos } = await supabase
      .from("agendamentos")
      .select("horario")
      .eq("empresa_id", empresaData.id)
      .eq("profissional_id", booking.profissional.id)
      .eq("data", booking.data)
      .neq("status", "Cancelado");

    const ocupados =
  agendamentos?.map((item) => item.horario.slice(0, 5)) ?? [];

console.log(ocupados);

    const livres = filtrarHorariosDisponiveis(
  horariosGerados,
  ocupados
);

// Função para formatar a data local (evita problemas de fuso horário)


const hoje = new Date();
const dataHoje = formatarDataLocal(hoje);

let horariosLivres = livres;

if (booking.data === dataHoje) {
  const horaAtual =
    hoje.getHours().toString().padStart(2, "0") +
    ":" +
    hoje.getMinutes().toString().padStart(2, "0");

  horariosLivres = livres.filter((h) => h > horaAtual);
}

setHorarios(horariosLivres);

setLoading(false);
  }

  function selecionarHorario(horario: string) {
  if (salvando) return;

  setSalvando(true);

  setBooking((prev) => ({
    ...prev,
    horario,
  }));

  router.push(`/${empresa}/dados`);
}
  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <Link
          href={`/${empresa}/data`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-2xl font-bold mt-6">
          Escolha um horário
        </h1>

        <p className="text-zinc-500 mb-6">
          Horários disponíveis.
        </p>

        <div className="grid grid-cols-2 gap-3">
  {loading ? (
    <p className="col-span-2 text-center text-zinc-500">
      Carregando horários...
    </p>
  ) : horarios.length === 0 ? (
    <p className="col-span-2 text-center text-red-500">
      Nenhum horário disponível.
    </p>
  ) : (
    horarios.map((horario) => (
      <button
  key={horario}
  type="button"
  disabled={salvando}
  onClick={() => selecionarHorario(horario)}
>
    <Card
  className={`text-center transition-all ${
    salvando
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer hover:border-violet-600"
  }`}
>
          <span className="text-lg font-semibold">
            {horario}
          </span>
        </Card>
      </button>
    ))
  )}
</div>
</Card>

</main>
);
}