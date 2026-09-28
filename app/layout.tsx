import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Life Architect",
  description: "고유 수비학과 타로 대응으로 삶의 패턴을 정리하는 인생 설계 도구",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} ${serif.variable} font-[family-name:var(--font-sans)] antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
