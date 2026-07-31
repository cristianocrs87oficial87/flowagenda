"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PixData = {
  copiaecola: string;
  reference_code: string;
};

export default function Planos() {
  const router = useRouter();

  const [pix, setPix] = useState<PixData | null>(null);
  const [status, setStatus] = useState("");
  const [mostrarPix, setMostrarPix] = useState(false);

  const [premium, setPremium] = useState(false);
  const [premiumAte, setPremiumAte] = useState<string | null>(null);

  const [diasRestantes, setDiasRestantes] = useState(0);
  async function gerarPix(plano: "mensal" | "anual") {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    const response = await fetch(
      `/api/pay2m/pix?user_id=${user.id}&plano=${plano}`
    );

    const data = await response.json();

    setPix({
      copiaecola: data.content,
      reference_code: data.reference_code,
    });

    setMostrarPix(true);

    setStatus("⏳ Aguardando pagamento...");
  } catch (error) {
    console.error(error);

    alert("Erro ao gerar PIX.");
  }
}

async function copiarPix() {
  if (!pix) return;

  await navigator.clipboard.writeText(pix.copiaecola);

  setStatus("✅ Código PIX copiado.");
}
useEffect(() => {
  async function carregarPlano() {
  

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: empresa, error } = await supabase
  .from("empresas")
  .select("premium, premium_ate")
  .eq("usuario_id", user.id)
  .single();

if (error) {
  console.error("Erro ao carregar empresa:", error);
  return;
}

console.log("Empresa completa:", empresa);
console.log("premium:", empresa?.premium);
console.log("premium_ate:", empresa?.premium_ate);

if (!empresa) return;

setPremium(Boolean(empresa.premium));
setPremiumAte(empresa.premium_ate);

if (empresa.premium_ate) {
  const fim = new Date(empresa.premium_ate);

  const dias = Math.max(
    0,
    Math.ceil(
      (fim.getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    )
  );

  setDiasRestantes(dias);
} else {
  setDiasRestantes(0);
}
  }

  carregarPlano();
}, []);

useEffect(() => {
  if (!pix?.reference_code) return;

  const interval = setInterval(async () => {
    try {
      await fetch("/api/pay2m/check-payments");

      const response = await fetch(
        `/api/pay2m/status/${pix.reference_code}`
      );

      const data = await response.json();

      if (data.status === "awaiting_payment") {
        setStatus("⏳ Aguardando pagamento...");
      }

      if (data.status === "paid") {
        setStatus("✅ Pagamento aprovado");

        clearInterval(interval);

        setPremium(true);

        setMostrarPix(false);

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }, 10000);

  return () => clearInterval(interval);
}, [pix]);
const dataPremium = premiumAte
  ? new Date(premiumAte).toLocaleDateString("pt-BR")
  : "--";

return (
  <>
    {mostrarPix && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-7 text-white">

            <h2 className="text-2xl font-bold">
              FlowAgenda Premium
            </h2>

            <p className="text-indigo-100">
              Pagamento via PIX
            </p>

          </div>

          <div className="space-y-6 p-8">

            <div className="flex justify-center">

              <QRCodeSVG
                value={pix?.copiaecola ?? ""}
                size={190}
              />

            </div>

            <button
              onClick={copiarPix}
              className="mt-6 w-full rounded-2xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700 transition"
            >
              Copiar código PIX
            </button>

            <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-center">

              {status}

            </div>

            <button
              onClick={() => setMostrarPix(false)}
              className="mt-5 w-full rounded-2xl border py-4 font-semibold"
            >
              Fechar
            </button>

          </div>

        </div>

      </div>
    )}

    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-5xl px-5 py-6">

        <h1 className="text-3xl font-bold tracking-tight">
          FlowAgenda Premium
        </h1>

        <p className="mt-2 text-gray-500">
          Gerencie sua assinatura.
        </p>

        <section className="mt-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-md">

  <div className="flex items-start justify-between">

    <div>

      <h2 className="text-3xl font-bold">
        Seu Plano Atual
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Gerencie sua assinatura Premium.
      </p>

    </div>

    <span
      className={`rounded-full px-5 py-2 text-sm font-semibold ${
        premium
          ? "bg-green-100 text-green-700"
          : "bg-indigo-100 text-indigo-700"
      }`}
    >
      {premium ? "Premium Ativo" : "Teste Gratuito"}
    </span>

  </div>

  {!premium && (
  <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4">

    <div className="flex items-center gap-3">

      <Sparkles className="h-5 w-5 text-indigo-600" />

      <p className="text-sm text-indigo-700 font-medium">
        Você está no período de teste Premium.
      </p>

    </div>

  </div>
)}

  <div className="mt-5 grid gap-4 md:grid-cols-2">

   <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">

      <p className="text-gray-500 text-sm">
        Validade
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {dataPremium}
      </h3>

    </div>

    <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">

      <p className="text-gray-500 text-sm">
        Dias restantes
      </p>

      <h3 className="mt-2 text-2xl font-bold text-indigo-600">
        {diasRestantes} dias
      </h3>

    </div>

  </div>

</section>
        <section className="mt-5 grid gap-5 lg:grid-cols-2">

  {/* PLANO MENSAL */}

  <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg hover:shadow-xl transition">


    <h2 className="mt-6 text-5xl font-bold">
      R$39,90
    </h2>

    <p className="text-gray-500">
      por mês
    </p>

    <div className="mt-8 space-y-4">

      {[
        "Agenda ilimitada",
        "Clientes ilimitados",
        "Profissionais ilimitados",
        "Página de agendamento",
        "WhatsApp",
        "Relatórios",
      ].map((item) => (

        <div
          key={item}
          className="flex items-center gap-3"
        >

          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <span>{item}</span>

        </div>

      ))}

    </div>

    <button
      onClick={() => gerarPix("mensal")}
      className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
    >
      Assinar Premium
    </button>

  </div>

  {/* ANUAL */}

  <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg hover:shadow-xl transition">

    <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
      Melhor Oferta
    </span>

    <h2 className="mt-6 text-5xl font-bold">
      R$397
    </h2>

    <p className="text-gray-500">
      por ano
    </p>

    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">

  <p className="text-lg font-bold text-green-700">
    💰 Economize R$81 por ano
  </p>

  <p className="mt-1 text-sm text-gray-600">
    Equivale a menos de <strong>R$34 por mês</strong>.
  </p>

</div>

    <div className="mt-8 space-y-4">

      {[
        "Todos os recursos Premium",
        "Suporte prioritário",
        "Atualizações incluídas",
      ].map((item) => (

        <div
          key={item}
          className="flex items-center gap-3"
        >

          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <span>{item}</span>

        </div>

      ))}

    </div>

    <button
  onClick={() => gerarPix("anual")}
  className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
>
  Assinar Anual
</button>
<p className="mt-2 text-green-600 font-semibold">
Economize R$81 por ano
</p>

<p className="text-sm text-gray-500">
Menos de R$34 por mês
</p>

  </div>

</section>

</div>

</main>

</>

);
}