import "./globals.css";

import type { Metadata } from "next";
import { BookingProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "FlowAgenda",
  description: "Sistema de Agendamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-white text-zinc-900">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}