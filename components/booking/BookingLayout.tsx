import { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

interface BookingLayoutProps {
  children: ReactNode;
  className?: string;
}

export function BookingLayout({
  children,
  className = "",
}: BookingLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      <Card className={`w-full max-w-md ${className}`}>
        {children}
      </Card>
    </main>
  );
}