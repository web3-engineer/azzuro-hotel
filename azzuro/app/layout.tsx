import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// IMPORTANTE: Verifique se o caminho da importação bate com a pasta onde você salvou a Navbar
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
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* Fundo dinâmico: Verde Claro (Light Mode) e Verde Escuro (Dark Mode) */}
      <body className="min-h-full flex flex-col bg-[#F0F5F2] dark:bg-[#0A140E] text-emerald-950 dark:text-emerald-50 selection:bg-emerald-300 selection:text-emerald-950 dark:selection:bg-emerald-900 dark:selection:text-white overflow-x-hidden transition-colors duration-500">
        
        {/* Luzes de Fundo (Glow) dinâmicas para o Efeito Glassmorphism em ambos os modos */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200/50 dark:bg-emerald-900/30 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-300/30 dark:bg-green-950/40 blur-[120px]" />
        </div>
        
        {/* Navbar Global Renderizada Acima de Tudo */}
        <Navbar />

        {/* Conteúdo das Páginas */}
        {children}
        
      </body>
    </html>
  );
}