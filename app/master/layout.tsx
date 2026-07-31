import MasterGuard from "@/components/MasterGuard";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MasterGuard>
      <div className="min-h-screen bg-zinc-100">
        <header className="bg-violet-700 text-white shadow">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">
              FlowAgenda • Master Admin
            </h1>

            <span className="text-sm opacity-80">
              Painel Administrativo
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-6">
          {children}
        </main>
      </div>
    </MasterGuard>
  );
}