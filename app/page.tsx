import { User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">

      <Card className="w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-6">
          FlowAgenda
        </h1>

        <Input
          label="Nome"
          placeholder="Digite seu nome"
          leftIcon={<User size={18} />}
        />

        <div className="mt-5">
          <Button fullWidth>
            Continuar
          </Button>
        </div>

      </Card>

    </main>
  );
}