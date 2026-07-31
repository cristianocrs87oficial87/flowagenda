"use client";

import { useEffect, useMemo, useState } from "react";

type Empresa = {
  id: string;
  nome: string;
  responsavel: string | null;
  telefone: string | null;
  premium: boolean;
  premium_ate: string | null;
  created_at: string;
};

type Dashboard = {
  empresas: number;
  premium: number;
  teste: number;
  receita: number;
};

export default function MasterPage() {
  const [dashboard, setDashboard] = useState<Dashboard>({
    empresas: 0,
    premium: 0,
    teste: 0,
    receita: 0,
  });

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);

    try {
      const [dashboardRes, empresasRes] = await Promise.all([
        fetch("/api/master/dashboard"),
        fetch("/api/master/empresas"),
      ]);

      const dashboardJson = await dashboardRes.json();
      const empresasJson = await empresasRes.json();

      setDashboard(dashboardJson);
      setEmpresas(empresasJson);
    } finally {
      setLoading(false);
    }
  }

  const empresasFiltradas = useMemo(() => {
    return empresas.filter((empresa) => {
      const texto = (
        empresa.nome +
        " " +
        (empresa.responsavel ?? "") +
        " " +
        (empresa.telefone ?? "")
      ).toLowerCase();

      return texto.includes(busca.toLowerCase());
    });
  }, [busca, empresas]);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard Master
        </h1>

        <p className="text-zinc-500">
          Administração do FlowAgenda
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card
          titulo="Empresas"
          valor={dashboard.empresas.toString()}
        />

        <Card
          titulo="Premium"
          valor={dashboard.premium.toString()}
        />

        <Card
          titulo="Em Teste"
          valor={dashboard.teste.toString()}
        />

        <Card
          titulo="Receita"
          valor={`R$ ${dashboard.receita.toFixed(2)}`}
        />

      </div>

      <div className="rounded-2xl bg-white shadow">

        <div className="border-b p-5">

          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar empresa..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-violet-600"
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-50">

              <tr className="text-left">

                <th className="p-4">Empresa</th>

                <th className="p-4">Responsável</th>

                <th className="p-4">Telefone</th>

                <th className="p-4">Plano</th>

                <th className="p-4">Cadastro</th>

                <th className="p-4 text-center">
                  Ações
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center"
                  >
                    Carregando...
                  </td>
                </tr>
              )}

              {!loading &&
                empresasFiltradas.map((empresa) => (
                  <tr
                    key={empresa.id}
                    className="border-t hover:bg-zinc-50"
                  >
                    <td className="p-4 font-semibold">
                      {empresa.nome}
                    </td>

                    <td className="p-4">
                      {empresa.responsavel || "-"}
                    </td>

                    <td className="p-4">
                      {empresa.telefone || "-"}
                    </td>

                    <td className="p-4">
                      {empresa.premium ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          Premium
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                          Teste
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {new Date(
                        empresa.created_at
                      ).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button
                          className="rounded-lg bg-violet-600 px-3 py-2 text-white hover:bg-violet-700"
                        >
                          Ver
                        </button>

                       <button
  onClick={async () => {
    const confirmar = confirm(
      `Deseja excluir "${empresa.nome}"?`
    );

    if (!confirmar) return;

    const res = await fetch(
      `/api/master/excluir-empresa/${empresa.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      alert("Empresa excluída com sucesso.");
      carregar();
    } else {
      alert("Erro ao excluir.");
    }
  }}
  className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
>
  Excluir
</button>

                      </div>

                    </td>

                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function Card({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <p className="text-zinc-500">
        {titulo}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {valor}
      </h2>

    </div>
  );
}