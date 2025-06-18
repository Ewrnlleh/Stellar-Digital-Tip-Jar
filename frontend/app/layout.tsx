import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Bu import satırı kritik öneme sahiptir.
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellar Soroban Dijital Bahşiş Kutusu",
  description: "İçerik üreticilerini Stellar ağı üzerinden anında ve düşük maliyetle destekleyin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* body'ye doğrudan class eklemek yerine CSS dosyasında yönetmek daha sağlıklıdır */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
