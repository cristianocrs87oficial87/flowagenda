"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  CalendarDays,
  Users,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Planos() {
  const router = useRouter();

  const [pix, setPix] = useState<any>(null);

  const [status, setStatus] = useState("");
  const [mostrarPix, setMostrarPix] = useState(false);

  const [premium, setPremium] = useState(false);
  const [premiumAtivado, setPremiumAtivado] = useState(false);
  const [premiumAte, setPremiumAte] = useState<string | null>(null);

  async function gerarPixMensal() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não encontrado.");
        return;
      }

      const response = await fetch(
        `/api/pay2m/pix?user_id=${user.id}&plano=mensal`
      );

      const data = await response.json();

      setPix({
        copiaecola: data.content,
        reference_code: data.reference_code,
      });

      setMostrarPix(true);
      setStatus("⏳ Aguardando pagamento...");
      setPremiumAtivado(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar PIX.");
    }
  }

  async function gerarPixAnual() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Usuário não encontrado.");
        return;
      }

      const response = await fetch(
        `/api/pay2m/pix?user_id=${user.id}&plano=anual`
      );

      const data = await response.json();

      setPix({
        copiaecola: data.content,
        reference_code: data.reference_code,
      });

      setMostrarPix(true);
      setStatus("⏳ Aguardando pagamento...");
      setPremiumAtivado(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar PIX.");
    }
  }

  async function copiarPix() {
    if (!pix?.copiaecola) return;

    await navigator.clipboard.writeText(pix.copiaecola);

    setStatus("✅ Código PIX copiado.");
  }

  useEffect(() => {
    async function carregarPremium() {
      await fetch("/api/verificar-premium");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: empresa } = await supabase
        .from("empresas")
        .select("premium, premium_ate")
        .eq("usuario_id", user.id)
        .single();

      if (!empresa) return;

      const premiumAtivo =
        empresa.premium &&
        empresa.premium_ate &&
        new Date(empresa.premium_ate) > new Date();

      setPremium(!!premiumAtivo);
      setPremiumAte(empresa.premium_ate);
    }

    carregarPremium();
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

          setPremium(true);
          setPremiumAtivado(true);

          clearInterval(interval);

          setTimeout(() => {
            setMostrarPix(false);

            setTimeout(() => {
              router.push("/admin");
            }, 1500);
          }, 2500);
        }
      } catch (error) {
        console.error(error);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [pix, router]);

  const dataPremium = premiumAte
    ? new Date(premiumAte).toLocaleDateString("pt-BR")
    : null;

  const diasRestantes = premiumAte
    ? Math.max(
        0,
        Math.ceil(
          (new Date(premiumAte).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  return (
  <>
    {mostrarPix && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

    <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl border border-gray-200">

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">

            🔒

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Pagamento Seguro
            </h2>

            <p className="text-indigo-100 text-sm">
              FlowAgenda Premium • PIX
            </p>

          </div>

        </div>

      </div>

      <div className="p-8">

        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-slate-50 p-6 flex justify-center">

          <QRCodeSVG
            value={pix?.copiaecola}
            size={220}
          />

        </div>

        <p className="mt-5 text-center text-gray-500 text-sm">

          Escaneie o QR Code ou copie o código PIX.

        </p>

        <button
          onClick={copiarPix}
          className="mt-6 w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Copiar código PIX
        </button>

        <div className="mt-6 rounded-2xl bg-slate-50 border border-gray-200 p-4">

          <div className="flex items-center justify-center gap-3">

            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            <p className="font-medium text-gray-700">

              {status}

            </p>

          </div>

        </div>

        <div className="mt-6 rounded-2xl bg-indigo-50 border border-indigo-100 p-4">

          <p className="text-center text-sm text-indigo-700">

            O pagamento será identificado automaticamente e você será redirecionado após a confirmação.

          </p>

        </div>

        <button
          onClick={() => setMostrarPix(false)}
          className="mt-6 w-full h-14 rounded-2xl border border-gray-300 hover:bg-gray-50 font-semibold transition"
        >
          Fechar
        </button>

      </div>

    </div>

  </div>
)}

<main className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 shadow-sm p-12 mb-10">

  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />

  <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-100 blur-3xl opacity-40" />

  <div className="relative max-w-3xl">

    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">

      <Sparkles className="w-4 h-4" />

      Experimente gratuitamente por 1 mês

    </div>

    <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">

      A maneira mais inteligente
      <br />
      de gerenciar sua agenda.

    </h1>

    <p className="mt-6 text-xl text-gray-600 leading-9 max-w-2xl">

      Automatize agendamentos, organize seus clientes,
      envie confirmações pelo WhatsApp e aumente sua produtividade
      com o FlowAgenda Premium.

    </p>

    <div className="mt-10 flex flex-wrap gap-4">

      <button
        onClick={gerarPixMensal}
        className="px-8 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all text-white font-semibold text-lg shadow-lg"
      >
        Começar agora
      </button>

      <div className="flex items-center text-gray-500 text-sm">

        ✓ Sem cartão de crédito
        <span className="mx-3">•</span>
        ✓ Cancele quando quiser

      </div>

    </div>

  </div>

</section>

        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-8 mb-10">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    <div>

      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Seu Plano Atual
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900">
        {premium ? "FlowAgenda Premium" : "Período de Teste"}
      </h2>

      <p className="mt-3 text-gray-500 max-w-xl">
        Acompanhe abaixo o status da sua assinatura e aproveite todos os recursos
        disponíveis para organizar sua agenda.
      </p>

    </div>

    <div
      className={`px-5 py-3 rounded-2xl font-semibold text-sm ${
        premium
          ? "bg-green-100 text-green-700"
          : "bg-indigo-100 text-indigo-700"
      }`}
    >
      {premium ? "✅ Premium Ativo" : "🎁 Teste Gratuito"}
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-5 mt-10">

    <div className="rounded-2xl border border-gray-200 p-6 bg-slate-50">

      <p className="text-sm text-gray-500">
        Plano
      </p>

      <h3 className="mt-2 text-2xl font-bold text-gray-900">
        {premium ? "Premium" : "Grátis"}
      </h3>

    </div>

    <div className="rounded-2xl border border-gray-200 p-6 bg-slate-50">

      <p className="text-sm text-gray-500">
        Validade
      </p>

      <h3 className="mt-2 text-2xl font-bold text-gray-900">
        {dataPremium || "--"}
      </h3>

    </div>

    <div className="rounded-2xl border border-gray-200 p-6 bg-slate-50">

      <p className="text-sm text-gray-500">
        Dias restantes
      </p>

      <h3 className="mt-2 text-2xl font-bold text-gray-900">
        {premium ? diasRestantes : diasRestantes}
      </h3>

    </div>

  </div>

  {!premium && (

    <div className="mt-8 rounded-2xl bg-indigo-50 border border-indigo-100 p-5">

      <div className="flex items-start gap-3">

        <Sparkles className="w-6 h-6 text-indigo-600 mt-0.5" />

        <div>

          <h4 className="font-semibold text-indigo-700">
            Aproveite seu mês gratuito
          </h4>

          <p className="text-gray-600 mt-1">
            Teste todas as funcionalidades do FlowAgenda sem limitações.
            Quando terminar o período gratuito, você poderá continuar por apenas
            <strong> R$ 39,90/mês</strong>.
          </p>

        </div>

      </div>

    </div>

  )}

</section>

        <section className="grid lg:grid-cols-2 gap-8">

          <div className="relative overflow-hidden rounded-[32px] border-2 border-indigo-500 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-10 text-white shadow-2xl hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(79,70,229,.35)] transition-all duration-300">

  <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

  <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

  <div className="relative">

    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">

      ⭐ Escolha da maioria

    </div>

    <h2 className="mt-8 text-4xl font-bold">

      FlowAgenda Premium

    </h2>

    <p className="mt-3 text-indigo-100 text-lg">

      Tudo o que você precisa para administrar seu negócio.

    </p>

    <div className="mt-10 flex items-end gap-2">

      <span className="text-6xl font-extrabold">

        R$39,90

      </span>

      <span className="pb-2 text-xl text-indigo-200">

        /mês

      </span>

    </div>

    <div className="my-10 h-px bg-white/20" />

    <div className="grid gap-5">

      {[
        "Agenda ilimitada",
        "Clientes ilimitados",
        "Profissionais ilimitados",
        "WhatsApp integrado",
        "Relatórios completos",
        "Página de agendamento",
        "Confirmações automáticas",
        "Suporte prioritário",
      ].map((item) => (

        <div
          key={item}
          className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-700">

            <CheckCircle2 className="h-5 w-5" />

          </div>

          <span className="font-medium">

            {item}

          </span>

        </div>

      ))}

    </div>

    <div className="mt-10 rounded-2xl bg-white/10 p-5 backdrop-blur">

      <p className="font-semibold">

        🎁 Primeiro mês totalmente grátis

      </p>

      <p className="mt-2 text-indigo-100">

        Aproveite todos os recursos Premium sem pagar nada no primeiro mês.

      </p>

    </div>

    {premium ? (

      <div className="mt-8 rounded-2xl bg-green-500 px-6 py-5 text-center font-semibold shadow-lg">

        ✅ Premium ativo até {dataPremium}

      </div>

    ) : (

      <button
        onClick={gerarPixMensal}
        className="mt-8 h-16 w-full rounded-2xl bg-white text-indigo-700 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 active:scale-95"
      >

        Começar meu mês grátis

      </button>

    )}

    <p className="mt-5 text-center text-sm text-indigo-100">

      Sem cartão de crédito • Cancele quando quiser

    </p>

  </div>

</div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
    🔥 Melhor economia
  </div>

  <h2 className="mt-8 text-4xl font-bold text-gray-900">
    Plano Anual
  </h2>

  <p className="mt-3 text-lg text-gray-500">
    Ideal para quem já utiliza o FlowAgenda diariamente.
  </p>

  <div className="mt-10 flex items-end gap-2">

    <span className="text-6xl font-extrabold text-gray-900">
      R$397
    </span>

    <span className="pb-2 text-xl text-gray-500">
      /ano
    </span>

  </div>

  <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-5">

    <p className="font-semibold text-green-700">
      Economize R$81 por ano
    </p>

    <p className="mt-2 text-gray-600">
      Equivale a menos de R$34 por mês.
    </p>

  </div>

  <div className="mt-10 space-y-4">

    {[
      "Todos os recursos Premium",
      "Atualizações incluídas",
      "Suporte prioritário",
      "Melhor custo-benefício",
    ].map((item) => (

      <div
        key={item}
        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-4"
      >

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">

          <CheckCircle2 className="h-5 w-5 text-green-700" />

        </div>

        <span className="font-medium text-gray-700">

          {item}

        </span>

      </div>

    ))}

  </div>

  {premium ? (

    <div className="mt-10 rounded-2xl bg-green-100 py-5 text-center font-semibold text-green-700">

      ✅ Premium ativo

    </div>

  ) : (

    <button
      onClick={gerarPixAnual}
      className="mt-10 h-16 w-full rounded-2xl border-2 border-green-600 text-green-700 font-bold text-lg transition-all duration-300 hover:bg-green-600 hover:text-white"
    >

      Assinar Plano Anual

    </button>

  )}

</div>

        </section>

      </div>

    </main>

  </>
);
}