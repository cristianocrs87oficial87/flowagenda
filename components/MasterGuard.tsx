"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usuarioAtual } from "@/lib/auth";
import { ADMIN_EMAILS } from "@/lib/admin";

export default function MasterGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [liberado, setLiberado] = useState(false);

  useEffect(() => {
    async function verificar() {
      const user = await usuarioAtual();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!ADMIN_EMAILS.includes(user.email ?? "")) {
        router.replace("/login");
        return;
      }

      setLiberado(true);
    }

    verificar();
  }, [router]);

  if (!liberado) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Verificando acesso...</p>
      </div>
    );
  }

  return <>{children}</>;
}