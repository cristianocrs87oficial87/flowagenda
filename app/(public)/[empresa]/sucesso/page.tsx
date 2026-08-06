"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle, CalendarDays, Clock, Scissors, User, MessageCircle } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SucessoPage() {
  const params = useParams();
  const empresa = params.empresa as string;

  const { booking } = useBooking();
  const [whatsapp, setWhatsapp] = useState("");

  const dataFormatada = booking.data
    ? new Date(`${booking.data}T12:00:00`).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      })
    : "";
useEffect(() => {
  carregarWhatsapp();
}, []);

async function carregarWhatsapp() {
  console.log("ENTROU NA FUNÇÃO");

  const resposta = await supabase
    .from("empresas")
    .select("*")
    .eq("slug", empresa);

  console.log("RESPOSTA:", resposta);
}
  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">

        <CheckCircle
          size={90}
          className="mx-auto text-green-500"
        />

        <h1 className="text-3xl font-bold mt-5">
          Agendamento Confirmado
        </h1>

        <p className="text-zinc-500 mt-2">
          Seu horário foi reservado com sucesso.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-left space-y-5">

          {booking.profissional && (
            <div className="flex items-center gap-3">
              <User className="text-violet-600" size={22} />
              <div>
                <p className="text-xs text-zinc-500">Profissional</p>
                <p className="font-semibold">{booking.profissional.nome}</p>
              </div>
            </div>
          )}

          {booking.servico && (
            <div className="flex items-center gap-3">
              <Scissors className="text-violet-600" size={22} />
              <div>
                <p className="text-xs text-zinc-500">Serviço</p>
                <p className="font-semibold">{booking.servico.nome}</p>
              </div>
            </div>
          )}

          {booking.data && (
            <div className="flex items-center gap-3">
              <CalendarDays className="text-violet-600" size={22} />
              <div>
                <p className="text-xs text-zinc-500">Data</p>
                <p className="font-semibold capitalize">
                  {dataFormatada}
                </p>
              </div>
            </div>
          )}

          {booking.horario && (
            <div className="flex items-center gap-3">
              <Clock className="text-violet-600" size={22} />
              <div>
                <p className="text-xs text-zinc-500">Horário</p>
                <p className="font-semibold">{booking.horario}</p>
              </div>
            </div>
          )}

        </div>

        <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-green-700 font-medium">
            ✅ Enviamos a confirmação para seu WhatsApp.
          </p>
        </div>

        <div className="mt-8 space-y-3">

          <Button
  fullWidth
  onClick={() => {
    if (!whatsapp) {
      alert("WhatsApp não configurado pela empresa.");
      return;
    }

    window.open(
      `https://wa.me/55${whatsapp}?text=${encodeURIComponent(
        "Olá! Acabei de realizar um agendamento pelo FlowAgenda e gostaria de falar com vocês."
      )}`,
      "_blank"
    );
  }}
  className="h-14 rounded-2xl bg-[#25D366] text-white font-semibold shadow-lg hover:bg-[#1EBE5D] transition-all"
>
  <MessageCircle size={22} className="mr-2" />
  Falar no WhatsApp
</Button>

          <Link href={`/${empresa}`}>
            <Button fullWidth>
              Voltar ao início
            </Button>
          </Link>

        </div>

      </Card>
    </main>
  );
}