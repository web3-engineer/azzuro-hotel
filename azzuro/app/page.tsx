"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const destinationPhotos = [
  { id: 0, title: "Ambientes de Lazer" },
  { id: 1, title: "Pôr do Sol na Serra" },
  { id: 2, title: "Culinária Regional" },
  { id: 3, title: "Trilhas Exclusivas" },
];

const experiencesData = [
  { icon: "🌿", label: "Cachoeiras", imageText: "[Imagem da Cachoeira Cristalina]" },
  { icon: "⛰️", label: "Pico Alto", imageText: "[Imagem da Vista do Pico Alto]" },
  { icon: "🧸", label: "Playground", imageText: "[Imagem do Espaço Kids Seguro]" },
  { icon: "🫧", label: "Jacuzzis", imageText: "[Imagem das Jacuzzis Relaxantes]" }
];

export default function Home() {
  const [activeDest, setActiveDest] = useState(0);
  const [activeExp, setActiveExp] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPreloader) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showPreloader]);

  const nextDest = () => setActiveDest((prev) => (prev + 1) % destinationPhotos.length);
  const prevDest = () => setActiveDest((prev) => (prev - 1 + destinationPhotos.length) % destinationPhotos.length);

  return (
    <>
      {showPreloader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F0F5F2] dark:bg-[#0A140E] transition-opacity duration-1000">
          <div className="flex flex-col items-center animate-blur-reveal">
            <img src="/azzuro-logo.png" alt="Logo" className="w-32 md:w-48 h-auto object-contain" />
            <p className="text-black/40 dark:text-emerald-100/30 text-[10px] mt-6 tracking-[0.4em] uppercase font-light">
              Serra de Baturité
            </p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blurReveal {
          0% { filter: blur(15px); opacity: 0; transform: scale(0.95); }
          30% { filter: blur(0px); opacity: 1; transform: scale(1); }
          70% { filter: blur(0px); opacity: 1; transform: scale(1); }
          100% { filter: blur(15px); opacity: 0; transform: scale(1.05); }
        }
        .animate-blur-reveal { animation: blurReveal 3s ease-in-out forwards; }

        @media (prefers-color-scheme: light) {
          @keyframes nature-breathe {
            0%, 100% { color: #000000; }
            50% { color: #059669; }
          }
        }
        @media (prefers-color-scheme: dark) {
          @keyframes nature-breathe {
            0%, 100% { color: #6ee7b7; text-shadow: 0 0 15px rgba(110, 231, 183, 0.2); }
            50% { color: #10b981; text-shadow: 0 0 25px rgba(16, 185, 129, 0.6); }
          }
        }

        .animate-nature { animation: nature-breathe 4s ease-in-out infinite; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <main className={`flex flex-col items-center overflow-hidden transition-opacity duration-1000 \${showPreloader ? 'opacity-0' : 'opacity-100'}`}>

        {/* 1. HERO SECTION */}
        <section id="home" className="relative w-full max-w-7xl px-4 md:px-6 pt-32 md:pt-40 pb-16 mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center z-10 reveal-on-scroll mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm">
              <div className="flex text-yellow-500 text-[9px] md:text-xs">★★★★★</div>
              <span className="text-[9px] md:text-xs font-medium tracking-wide text-black/80 dark:text-emerald-100/90">
                +100 avaliações 5 estrelas.
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight mb-6 text-black dark:text-emerald-50 leading-[1.1]">
              Um refúgio em <br className="hidden md:block" />
              <span className="italic animate-nature"> meio à natureza.</span>
            </h1>
            <button className="bg-black dark:bg-emerald-700 text-white px-8 py-3.5 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all shadow-lg">
              Conheça o Azzuro
            </button>
          </div>
          <div className="w-full relative z-10 reveal-on-scroll delay-100">
            <div className="relative w-full h-[60vh] md:h-[75vh] rounded-[2rem] bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl p-2 md:p-3">
              <div className="relative w-full h-full rounded-[1.5rem] bg-black/10 dark:bg-black/40" />
            </div>
          </div>
        </section>

        {/* 2. O DESTINO IDEAL */}
        <section className="w-full max-w-7xl px-4 md:px-6 py-16 mx-auto text-center reveal-on-scroll">
          <div className="max-w-4xl mx-auto mb-10 md:mb-16">
            <span className="text-emerald-700 dark:text-emerald-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">Maciço de Baturité</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-black dark:text-emerald-50 mb-6">O seu destino ideal.</h2>
            <p className="text-black/70 dark:text-emerald-100/60 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Localizado em uma das regiões mais privilegiadas do Ceará, o Azzuro é o ponto de partida perfeito para quem busca o clima ameno da serra.
            </p>
          </div>

          <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
            {destinationPhotos.map((photo, index) => {
              let positionClass = "opacity-0 scale-50 z-0 pointer-events-none";
              if (index === activeDest) positionClass = "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl";
              else if (index === (activeDest - 1 + destinationPhotos.length) % destinationPhotos.length) positionClass = "opacity-60 scale-75 -translate-x-[70%]";
              else if (index === (activeDest + 1) % destinationPhotos.length) positionClass = "opacity-60 scale-75 translate-x-[70%]";

              return (
                <div key={photo.id} onClick={() => setActiveDest(index)} className={`absolute transition-all duration-700 w-[240px] h-[320px] md:w-[360px] md:h-[460px] rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-2 \${positionClass}`}>
                  <div className="w-full h-full rounded-[1.5rem] bg-emerald-900/10 dark:bg-black/40 flex items-center justify-center text-black/30 dark:text-emerald-100/30 text-xs">
                    {photo.title}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. ACOMODAÇÕES */}
        <section id="acomodacoes" className="w-full max-w-7xl px-4 md:px-6 py-16 scroll-mt-20">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-center text-black dark:text-emerald-50 mb-12">Acomodações</h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4">
            {[
              { path: "bangalo-jacuzzi", name: "Bangalô c/ Jacuzzi" },
              { path: "bangalo", name: "Bangalô Tradicional" },
              { path: "chale-family", name: "Chalé Family" },
              { path: "suite-premium", name: "Suíte Premium" }
            ].map((room, idx) => (
              <Link key={idx} href={`/acomodacoes/\${room.path}`} className="group shrink-0 w-[260px] md:w-[320px] p-4 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg snap-center">
                <div className="w-full aspect-[4/5] rounded-[1.5rem] bg-black/5 dark:bg-black/30 mb-4" />
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-medium text-black dark:text-emerald-50">{room.name}</h3>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. EXPERIÊNCIAS */}
        <section id="experiencias" className="w-full max-w-6xl px-4 md:px-6 py-16 scroll-mt-20">
          <div className="p-6 md:p-16 rounded-[3rem] bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-light text-black dark:text-emerald-50 mb-8">Aventuras e <br /> Experiências.</h2>
                <div className="grid grid-cols-2 gap-4">
                  {experiencesData.map((item, i) => (
                    <button key={i} onClick={() => setActiveExp(i)} className={`p-5 rounded-3xl text-left transition-all border \${activeExp === i ? "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/50" : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10"}`}>
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <span className={`text-xs font-bold \${activeExp === i ? "text-emerald-900 dark:text-emerald-50" : "text-black/60 dark:text-emerald-100/70"}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[300px] md:h-[400px] rounded-[2rem] bg-black/5 dark:bg-black/40 flex items-center justify-center text-black/30 dark:text-emerald-100/20 text-xs italic p-6 text-center">
                {experiencesData[activeExp].imageText}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full border-t border-black/5 dark:border-white/10 py-16 px-6 flex flex-col items-center">
        <span className="font-bold tracking-[0.2em] text-xl text-emerald-800 dark:text-emerald-600 mb-6">AZZURO</span>
        <div className="flex gap-8 mb-8 text-xs font-bold text-black/60 dark:text-emerald-100/40">
          <a href="#" className="hover:text-emerald-600 transition-colors">Instagram</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">WhatsApp</a>
        </div>
        <p className="text-[10px] text-black/40 dark:text-emerald-100/20 text-center italic">
          © {new Date().getFullYear()} Azzuro Hotel. Excelência em hospitalidade na serra.
        </p>
      </footer>
    </>
  );
}