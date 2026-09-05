import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "GeoCulture AI — Мектеп №290",
  description: "Казакстанньн мадени-тарихи мурасын зерттейтин интерактивти GIS-платформасы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${inter.className} antialiased`} style={{ background: "#F5EFE6", color: "#2C1F14", minHeight: "100vh" }}>
        <LanguageProvider>
          <AppProvider>
            <Navbar />
            <div className="pt-16 h-[calc(100vh-64px)] overflow-y-auto">
              {children}
            </div>
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}