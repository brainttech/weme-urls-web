import UseClient from "@/features/home/Components/UseClient";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

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
        <div>
          {/* <Image
            src="https://uploads-ssl.webflow.com/646d74b61aaeadb21e1859f1/646e2c1161befb49825b2945_hero-line.png"
            width={500}
            height={300}
            className=" absolute bottom-1/3 w-full md:hidden"
            alt="weme logo"
            style={{
              zIndex: -1,
            }}
          /> */}
          {children}
        </div>
        <UseClient />
      </body>
    </html>
  );
}
