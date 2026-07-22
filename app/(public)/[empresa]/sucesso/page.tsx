"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SucessoPage() {
  const params = useParams();
  const empresa = params.empresa as string;

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CheckCircle
          size={80}
          className="mx-auto text-green-500"
        />

        <h1 className="text-3xl font-bold mt-6">
          Agendamento realizado!
        </h1>

        <p className="text-zinc-500 mt-3">
          Seu horário foi reservado com sucesso.
        </p>

        <div className="mt-8">
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