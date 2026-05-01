import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Sans_JP, DM_Sans } from "next/font/google";
import "../globals.css";

const notoSansKr = Noto_Sans_KR({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-noto-kr',
});

const notoSansJp = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-noto-jp',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-dm-sans',
});

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'ja' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isJp = lang === 'ja';
  return {
    title: isJp ? "P&Lソリューション | P&L Solution" : "피엔엘솔루션(주) | P&L Solution",
    description: isJp ? "ITインフラの設計から運用まで、企業の安定したビジネスを支援します。" : "IT 인프라의 설계부터 운영까지, 기업의 안정적인 비즈니스를 지원합니다.",
    alternates: {
      languages: {
        'ko': '/ko',
        'ja': '/ja',
        'x-default': '/ko'
      }
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${notoSansKr.variable} ${notoSansJp.variable} ${dmSans.variable}`}>
      <body className={lang === 'ja' ? 'lang-jp' : ''}>{children}</body>
    </html>
  );
}
