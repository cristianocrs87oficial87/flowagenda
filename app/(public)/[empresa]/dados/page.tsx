"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useBooking } from "@/contexts";
import { supabase } from "@/lib/supabase";

export default function DadosPage() {
  const router = useRouter();

  const { booking } = useBooking();

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function confirmarAgendamento() {
    if (salvando) return;

    setSalvando(true);

    const nomeLimpo = nome.trim();

    if (nomeLimpo.length < 3) {
      alert("Informe um nome válido.");
      setSalvando(false);
      return;
    }

    const telefone = whatsapp.replace(/\D/g, "");

    if (telefone.length < 10 || telefone.length > 11) {
      alert("Informe um WhatsApp válido.");
      setSalvando(false);
      return;
    }

    if (
      !booking.empresa ||
      !booking.servico ||
      !booking.profissional ||
      !booking.data ||
      !booking.horario
    ) {
      alert("Dados do agendamento incompletos.");
      setSalvando(false);
      return;
    }

    // Busca empresa
    const { data: empresa } = await supabase
      .from("empresas")
      .select("id")
      .eq("slug", booking.empresa)
      .single();

    if (!empresa) {
      alert("Empresa não encontrada.");
      setSalvando(false);
      return;
    }

    // Verifica se o horário ainda está livre
    const { data: existente } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("empresa_id", empresa.id)
      .eq("profissional_id", booking.profissional.id)
      .eq("data", booking.data)
      .eq("horario", booking.horario)
      .neq("status", "Cancelado")
      .maybeSingle();

    if (existente) {
      alert("Esse horário acabou de ser reservado. Escolha outro horário.");

      setSalvando(false);

      router.push(`/${booking.empresa}/horarios`);
      return;
    }

    // Salva agendamento
    const { error } = await supabase
      .from("agendamentos")
      .insert({
        empresa_id: empresa.id,
        servico_id: booking.servico.id,
        profissional_id: booking.profissional.id,
        cliente_nome: nomeLimpo,
        cliente_whatsapp: telefone,
        data: booking.data,
        horario: booking.horario,
        status: "Agendado",
      });

    if (error) {
      alert(error.message);
      setSalvando(false);
      return;
    }

    router.push(`/${booking.empresa}/sucesso`);
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">

        <Link
          href={`/${booking.empresa}/horarios`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-2xl font-bold mt-6">
          Seus dados
        </h1>

        <p className="text-zinc-500 mb-6">
          Informe apenas os dados abaixo.
        </p>

        <div className="space-y-4">

          <Input
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <Button
            fullWidth
            disabled={salvando}
            onClick={confirmarAgendamento}
          >
            {salvando ? "Confirmando..." : "Confirmar Agendamento"}
          </Button>

        </div>

      </Card>
    </main>
  );
}