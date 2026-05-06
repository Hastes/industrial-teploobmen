import type { Metadata } from "next";
import { Manrope, Ubuntu } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { PageReadyProvider } from "@/context/PageReadyContext";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "БалтБизнесПром — инженерия движения и тепла",
  description:
    "Подбор теплообменников и насосных станций под проект за 1 день. Расчёт, поставка, инженерная поддержка.",
  icons: {
    icon: [{ url: "/assets/images/logo_white.png", type: "image/png" }],
    shortcut: ["/assets/images/logo_white.png"],
    apple: [{ url: "/assets/images/logo_white.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${ubuntu.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-ink-950 text-white antialiased"
        suppressHydrationWarning
      >
        <PageReadyProvider>
          <Preloader />
          {children}
        </PageReadyProvider>
      </body>
    </html>
  );
}
