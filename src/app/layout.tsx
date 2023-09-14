import UseClient from "@/features/home/Components/UseClient";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ClientCookiesProvider } from "@/components/ui/cookies";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weme.ly",
  description: "Encurtador de links da weme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <UseClient>{children}</UseClient>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
