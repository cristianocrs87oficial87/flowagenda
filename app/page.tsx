import { User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">

      <Card className="w-full max-w-md">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold tracking-tight text-violet-600">
            FlowAgenda
          </h1>

          <p className="mt-3 text-zinc-500">
            Agendamento inteligente para profissionais da beleza.
          </p>

        </div>

        <Input
          label="Nome"
          placeholder="Digite seu nome"
          leftIcon={<User size={18} />}
        />

        <div className="mt-6">
          <Button fullWidth>
            Continuar
          </Button>
        </div>

      </Card>

    </main>
  );
}