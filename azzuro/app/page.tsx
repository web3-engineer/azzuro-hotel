"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Dados para a Galeria Dinâmica do Destino Ideal
const destinationPhotos = [
  { id: 0, title: "Ambientes de Lazer" },
  { id: 1, title: "Pôr do Sol na Serra" },
  { id: 2, title: "Culinária Regional" },
  { id: 3, title: "Trilhas Exclusivas" },
];

// Dados para a seção de Experiências
const experiencesData = [
  { icon: "🌿", label: "Cachoeiras", imageText: "[Imagem da Cachoeira Cristalina]" },
  { icon: "⛰️", label: "Pico Alto", imageText: "[Imagem da Vista do Pico Alto]" },
  { icon: "🧸", label: "Playground", imageText: "[Imagem do Espaço Kids Seguro]" },
  { icon: "🫧", label: "Jacuzzis", imageText: "[Imagem das Jacuzzis Relaxantes]" }
];

export default function Home() {
  // Estados interativos
  const [activeDest, setActiveDest] = useState(0);
  const [activeExp, setActiveExp] = useState(0);

  // Observer para animações de entrada no scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Navegação da Galeria Destino Ideal
  const nextDest = () => setActiveDest((prev) => (prev + 1) % destinationPhotos.length);
  const prevDest = () => setActiveDest((prev) => (prev - 1 + destinationPhotos.length) % destinationPhotos.length);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (prefers-color-scheme: light) {
          @keyframes nature-breathe {
            0%, 100% { color: #059669; text-shadow: 0 0 15px rgba(5, 150, 105, 0.2); }
            50% { color: #047857; text-shadow: 0 0 25px rgba(4, 120, 87, 0.4); }
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
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
      `}} />

      <main className="flex flex-col items-center overflow-hidden">

        {/* 1. HERO SECTION */}
        <section id="home" className="relative w-full max-w-7xl px-4 md:px-6 pt-28 md:pt-40 pb-16 md:pb-24 mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 md:mb-8 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm">
                <div className="flex text-yellow-500 text-[10px] md:text-sm">
                  ★★★★★
                </div>
                <span className="text-[10px] md:text-xs font-medium tracking-wide text-emerald-900 dark:text-emerald-100/90">
                  +100 avaliações 5 estrelas no Google.
                </span>
              </div>

              {/* Fontes ajustadas para Mobile e Desktop */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight mb-4 md:mb-6 text-emerald-950 dark:text-emerald-50 leading-[1.1]">
                Um refúgio em <br />
                <span className="italic animate-nature">meio à natureza.</span>
              </h1>

              <p className="max-w-xl text-base md:text-xl text-emerald-800/80 dark:text-emerald-100/60 mb-8 md:mb-10 font-light leading-relaxed">
                O Azzuro Hotel oferece uma experiência única e inesquecível no Maciço de Baturité. Conforto, exclusividade e descanso absoluto.
              </p>

              <button className="bg-emerald-700 text-emerald-50 text-xs md:text-sm font-medium px-8 py-3.5 rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all shadow-lg">
                Ver Disponibilidade
              </button>
            </div>

            {/* FOTO PRINCIPAL: Vertical no Mobile (3/4), Horizontal no Desktop (21/9 ou 16/9) */}
            <div className="w-full relative z-10 flex justify-center lg:justify-end reveal-on-scroll delay-100">
              <div className="relative w-full max-w-sm md:max-w-none aspect-[3/4] md:aspect-video lg:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-2xl p-2">
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black/10 dark:bg-black/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A140E]/60 to-transparent z-10 opacity-60 dark:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center text-emerald-900/40 dark:text-emerald-100/20 text-xs md:text-sm font-medium z-20">
                    [Imagem Hero: Vertical(Mob) / Horizontal(Desk)]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO: O DESTINO IDEAL (Com Galeria 3D Embutida) */}
        <section className="w-full max-w-7xl px-4 md:px-6 py-16 md:py-24 mx-auto text-center reveal-on-scroll">

          <div className="max-w-4xl mx-auto mb-10 md:mb-16">
            <span className="text-emerald-600 dark:text-emerald-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4 block">Maciço de Baturité</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-emerald-950 dark:text-emerald-50 mb-6 md:mb-8">O seu destino ideal.</h2>
            <p className="text-emerald-800/80 dark:text-emerald-100/60 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Localizado em uma das regiões mais privilegiadas do Ceará, o Azzuro é o ponto de partida perfeito para quem busca o clima ameno da serra, cachoeiras cristalinas e a gastronomia singular da nossa região.
            </p>
          </div>

          {/* Galeria 3D - Swipe Effect */}
          <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center overflow-hidden reveal-on-scroll delay-100 px-4">

            {destinationPhotos.map((photo, index) => {
              // Lógica para definir a posição do card (Centro, Esquerda, Direita, ou Escondido)
              let positionClass = "opacity-0 scale-50 z-0 pointer-events-none"; // Padrão escondido

              if (index === activeDest) {
                // Card Central (Em foco)
                positionClass = "opacity-100 scale-100 z-30 translate-x-0 blur-none shadow-2xl cursor-default";
              } else if (index === (activeDest - 1 + destinationPhotos.length) % destinationPhotos.length) {
                // Card da Esquerda (Desfocado e atrás)
                positionClass = "opacity-60 scale-[0.80] md:scale-[0.85] z-10 -translate-x-[60%] md:-translate-x-[70%] blur-[2px] cursor-pointer hover:opacity-80";
              } else if (index === (activeDest + 1) % destinationPhotos.length) {
                // Card da Direita (Desfocado e atrás)
                positionClass = "opacity-60 scale-[0.80] md:scale-[0.85] z-10 translate-x-[60%] md:translate-x-[70%] blur-[2px] cursor-pointer hover:opacity-80";
              }

              return (
                <div
                  key={photo.id}
                  onClick={() => setActiveDest(index)}
                  className={`absolute transition-all duration-700 ease-in-out w-[240px] h-[320px] md:w-[360px] md:h-[460px] rounded-[2rem] bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 p-2 md:p-3 ${positionClass}`}
                >
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-emerald-900/10 dark:bg-black/40 relative">
                    {/* Imagem Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-medium text-emerald-900/50 dark:text-emerald-100/30">
                      {photo.title}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Setas de Controle Sobrepostas */}
            <button onClick={prevDest} className="absolute left-2 md:left-[10%] z-40 p-3 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md text-emerald-900 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 transition-all shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextDest} className="absolute right-2 md:right-[10%] z-40 p-3 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md text-emerald-900 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 transition-all shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* 3. ACOMODAÇÕES SECTION (Foco Total nas Imagens, Textos Menores) */}
        <section id="acomodacoes" className="w-full max-w-7xl px-4 md:px-6 py-16 md:py-24 scroll-mt-20">
          <div className="text-center mb-10 md:mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-emerald-950 dark:text-emerald-50 mb-4">Acomodações</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="group flex flex-col p-3 md:p-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 reveal-on-scroll">
              {/* Foto ocupando quase todo o espaço */}
              <div className="w-full aspect-[4/5] md:aspect-[4/3] rounded-[1.5rem] bg-black/5 dark:bg-black/30 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-emerald-900/30 dark:text-emerald-100/20 text-xs">Foto Bangalô</div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-end">
                <h3 className="text-lg font-serif font-medium text-emerald-950 dark:text-emerald-50">Bangalô c/ Jacuzzi</h3>
                <button className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saber mais <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col p-3 md:p-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 reveal-on-scroll delay-100">
              <div className="w-full aspect-[4/5] md:aspect-[4/3] rounded-[1.5rem] bg-black/5 dark:bg-black/30 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-emerald-900/30 dark:text-emerald-100/20 text-xs">Foto Chalé Family</div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-end">
                <h3 className="text-lg font-serif font-medium text-emerald-950 dark:text-emerald-50">Chalé Family</h3>
                <button className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saber mais <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col p-3 md:p-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 reveal-on-scroll delay-200 md:col-span-2 lg:col-span-1">
              <div className="w-full aspect-[4/5] md:aspect-[4/3] rounded-[1.5rem] bg-black/5 dark:bg-black/30 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-emerald-900/30 dark:text-emerald-100/20 text-xs">Foto Suíte Premium</div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-end">
                <h3 className="text-lg font-serif font-medium text-emerald-950 dark:text-emerald-50">Suíte Premium</h3>
                <button className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Saber mais <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EXPERIÊNCIAS (Interativo: Clicou -> Mudou a Foto) */}
        <section id="experiencias" className="w-full max-w-6xl px-4 md:px-6 py-16 md:py-24 scroll-mt-20 reveal-on-scroll">
          <div className="p-6 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/40 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[90px] pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* Lado Esquerdo: Textos e Botões Interativos */}
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-emerald-950 dark:text-emerald-50 mb-6 md:mb-8">
                  Aventuras e <br /> Experiências.
                </h2>
                <p className="text-emerald-800/80 dark:text-emerald-100/60 font-light text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                  Respire o ar puro da montanha e escolha o seu roteiro.
                </p>

                {/* Grid de Botões (Mudam a imagem ao clicar) */}
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  {experiencesData.map((item, i) => {
                    const isActive = activeExp === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveExp(i)}
                        className={`p-4 md:p-5 rounded-3xl text-left transition-all duration-300 border ${isActive
                            ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/50 shadow-inner"
                            : "bg-white/60 dark:bg-white/5 border-white/50 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10"
                          }`}
                      >
                        <span className="text-2xl md:text-3xl mb-2 block">{item.icon}</span>
                        <span className={`text-xs md:text-sm font-medium ${isActive ? "text-emerald-900 dark:text-emerald-50" : "text-emerald-800 dark:text-emerald-100/70"}`}>
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Lado Direito: Imagem Dinâmica */}
              <div className="h-full min-h-[300px] md:min-h-[400px] rounded-[2rem] md:rounded-[2.5rem] bg-black/5 dark:bg-black/40 border border-white/60 dark:border-white/10 overflow-hidden relative shadow-inner">
                {/* A imagem renderizada muda conforme o estado 'activeExp' */}
                <div
                  key={activeExp} // O "key" força a re-renderização suave da animação
                  className="absolute inset-0 flex items-center justify-center text-emerald-900/40 dark:text-emerald-100/20 text-xs md:text-sm font-medium p-6 text-center italic animate-[fadeIn_0.5s_ease-in-out]"
                >
                  {experiencesData[activeExp].imageText}
                </div>

                <style dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                  }
                `}} />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 5. FOOTER */}
      <footer className="w-full border-t border-emerald-900/10 dark:border-white/10 mt-6 md:mt-12 py-12 md:py-16 px-6 flex flex-col items-center reveal-on-scroll">
        <span className="font-bold tracking-[0.2em] text-xl md:text-2xl text-emerald-700 dark:text-emerald-600 mb-6">AZZURO</span>
        <div className="flex gap-6 md:gap-8 mb-8 text-xs md:text-sm text-emerald-800/60 dark:text-emerald-100/40">
          <a href="#" className="hover:text-emerald-600 transition-colors">Instagram</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">WhatsApp</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Localização</a>
        </div>
        <p className="text-[10px] md:text-xs font-light text-emerald-800/40 dark:text-emerald-100/20 text-center">
          © {new Date().getFullYear()} Azzuro Hotel. Excelência em hospitalidade na serra.
        </p>
      </footer>
    </>
  );
}