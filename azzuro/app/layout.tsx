import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azzuro Hotel | Experiência Premium",
  description: "Um refúgio de luxo em meio à natureza no Maciço de Baturité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning é necessário porque o tema muda a classe no lado do cliente
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Script inline para evitar o "flash" branco ao carregar a página */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (_) {}
          `,
        }} />
      </head>

      {/* O body agora gerencia as cores de fundo dinamicamente via Tailwind */}
      <body className="min-h-full flex flex-col bg-[#F0F5F2] dark:bg-[#0A140E] text-emerald-950 dark:text-emerald-50 selection:bg-emerald-300 dark:selection:bg-emerald-800 transition-colors duration-500 overflow-x-hidden">

        {/* Camada de Glow (Luzes de Fundo) Liquid Glass */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Luz superior esquerda - Verde Água/Esmeralda */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-200/40 dark:bg-emerald-900/20 blur-[120px] md:blur-[150px]" />

          {/* Luz inferior direita - Verde Floresta Profundo */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-300/20 dark:bg-green-950/30 blur-[100px] md:blur-[120px]" />
        </div>

        {/* Navbar persistente em todas as páginas */}
        <Navbar />

        {/* Conteúdo principal com transição suave */}
        <div className="flex-grow flex flex-col items-center">
          {children}
        </div>

      </body>
    </html>
  );
}