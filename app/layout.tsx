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
    <html lang="pt-BR">
      <body>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}