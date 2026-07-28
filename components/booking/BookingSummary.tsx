"use client";

import { useBooking } from "@/contexts/BookingContext";
import {
  User,
  Scissors,
  CalendarDays,
  Clock,
} from "lucide-react";

export default function BookingSummary() {
  const { booking } = useBooking();

  if (
    !booking.profissional &&
    !booking.servico &&
    !booking.data &&
    !booking.horario
  ) {
    return null;
  }

  const dataFormatada = booking.data
    ? new Date(`${booking.data}T12:00:00`).toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })
    : null;

  return (
    <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50 p-5">

      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-violet-700">
        Resumo do agendamento
      </h3>

      <div className="space-y-4">

        {booking.profissional && (
          <div className="flex items-center gap-3">
            <User size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-zinc-500">
                Profissional
              </p>
              <p className="font-semibold text-zinc-800">
                {booking.profissional.nome}
              </p>
            </div>
          </div>
        )}

        {booking.servico && (
          <div className="flex items-center gap-3">
            <Scissors size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-zinc-500">
                Serviço
              </p>
              <p className="font-semibold text-zinc-800">
                {booking.servico.nome}
              </p>
            </div>
          </div>
        )}

        {booking.data && (
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-zinc-500">
                Data
              </p>
              <p className="font-semibold text-zinc-800">
                {dataFormatada}
              </p>
            </div>
          </div>
        )}

        {booking.horario && (
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-zinc-500">
                Horário
              </p>
              <p className="font-semibold text-zinc-800">
                {booking.horario}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}