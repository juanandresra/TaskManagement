import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";

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
        <div className="antialiased bg-gray-100 absolute inset-0 flex flex-col">
          <Providers>
            <Navbar></Navbar>
            <div className="flex flex-col overflow-auto p-4">
              <div className="container mx-auto">
                {children}
              </div>
            </div>            
            <Notification></Notification>
          </Providers>
        </div>
      </body>
    </html>
  );
}
