"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { useBooking } from "@/contexts";
import { supabase } from "@/lib/supabase";

interface DiaDisponivel {
  id: string;
  data: string;
  dia: string;
  semana: string;
  mes: string;
}

const nomesSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const nomesMes = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function DataPage() {
  const router = useRouter();
  const params = useParams();

  const empresa = params.empresa as string;

  const { setBooking } = useBooking();

  const [dias, setDias] = useState<DiaDisponivel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDias();
  }, []);

  async function carregarDias() {
    setLoading(true);

    const { data: empresaData } = await supabase
      .from("empresas")
      .select("dias_semana")
      .eq("slug", empresa)
      .single();

    const diasPermitidos =
      empresaData?.dias_semana ?? [1, 2, 3, 4, 5];

    const lista: DiaDisponivel[] = [];

    const hoje = new Date();

    for (let i = 0; lista.length < 14; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);

      const diaSemana = data.getDay();

      if (!diasPermitidos.includes(diaSemana)) {
        continue;
      }

      lista.push({
        id: data.toISOString(),
        data: data.toISOString().split("T")[0],
        dia: String(data.getDate()).padStart(2, "0"),
        semana: nomesSemana[diaSemana],
        mes: nomesMes[data.getMonth()],
      });
    }

    setDias(lista);
    setLoading(false);
  }

  function selecionarData(dia: DiaDisponivel) {
    setBooking((prev) => ({
      ...prev,
      data: dia.data,
    }));

    router.push(`/${empresa}/horarios`);
  }

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <Link
          href={`/${empresa}/profissionais`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>

        <h1 className="text-2xl font-bold mt-6">
          Escolha uma data
        </h1>

        <p className="text-zinc-500 mb-6">
          Selecione o dia desejado.
        </p>

        {loading ? (
          <p className="text-center text-zinc-500">
            Carregando datas...
          </p>
        ) : (
          <div className="space-y-4">
            {dias.map((dia) => (
              <button
                key={dia.id}
                type="button"
                onClick={() => selecionarData(dia)}
                className="w-full text-left"
              >
                <Card className="cursor-pointer hover:border-violet-600 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-lg">
                        {dia.semana}
                      </h2>

                      <p className="text-zinc-500">
                        {dia.mes}
                      </p>
                    </div>

                    <div className="text-3xl font-bold text-violet-700">
                      {dia.dia}
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}