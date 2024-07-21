import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba Inlaze",
  description: "Prueba Desarrollador Full-Stack",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body className={inter.className}>
        <Providers>
          <Navbar></Navbar>
          <div className="p-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
