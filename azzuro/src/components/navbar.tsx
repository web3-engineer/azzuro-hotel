"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Hook para detectar o tema inicial (preferência do sistema ou salvo no navegador)
  useEffect(() => {
    const root = window.document.documentElement;
    // Verifica se já existe uma preferência salva ou pega a do sistema
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Função para alternar o tema manualmente no clique do botão
  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Hook para detectar o scroll e atualizar a seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "acomodacoes", "experiencias"];
      const scrollPosition = window.scrollY + 200; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para fazer o scroll suave ao clicar no link
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Adaptação das cores do Liquid Glass para Modo Claro e Escuro */}
      <div className="flex items-center gap-4 md:gap-8 px-6 py-3 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-emerald-900/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all">
        
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, "home")}
          className="font-bold tracking-widest text-xl text-emerald-700 dark:text-emerald-400 mr-2 cursor-pointer transition-colors"
        >
          AZZURO
        </a>
        
        <div className="hidden md:flex gap-8 text-[13px] font-medium">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, "home")}
            className={`transition-all duration-300 ${
              activeSection === "home" 
                ? "text-emerald-950 dark:text-emerald-50 drop-shadow-[0_0_8px_rgba(5,150,105,0.3)] dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                : "text-emerald-800/60 hover:text-emerald-950 dark:text-emerald-100/50 dark:hover:text-emerald-50"
            }`}
          >
            O Hotel
          </a>
          <a 
            href="#acomodacoes" 
            onClick={(e) => scrollToSection(e, "acomodacoes")}
            className={`transition-all duration-300 ${
              activeSection === "acomodacoes" 
                ? "text-emerald-950 dark:text-emerald-50 drop-shadow-[0_0_8px_rgba(5,150,105,0.3)] dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                : "text-emerald-800/60 hover:text-emerald-950 dark:text-emerald-100/50 dark:hover:text-emerald-50"
            }`}
          >
            Acomodações
          </a>
          <a 
            href="#experiencias" 
            onClick={(e) => scrollToSection(e, "experiencias")}
            className={`transition-all duration-300 ${
              activeSection === "experiencias" 
                ? "text-emerald-950 dark:text-emerald-50 drop-shadow-[0_0_8px_rgba(5,150,105,0.3)] dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                : "text-emerald-800/60 hover:text-emerald-950 dark:text-emerald-100/50 dark:hover:text-emerald-50"
            }`}
          >
            Experiências
          </a>
        </div>

        <div className="flex items-center gap-2 ml-2">
          {/* Botão de Alternância de Tema (Sol/Lua) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-emerald-800 hover:bg-emerald-100/50 dark:text-emerald-100/70 dark:hover:bg-white/10 dark:hover:text-emerald-50 transition-all"
            aria-label="Alternar tema"
          >
            {isDarkMode ? (
              // Ícone de Sol Elegante (Modo Escuro ativo, clique para ir para Claro)
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              // Ícone de Lua Elegante (Modo Claro ativo, clique para ir para Escuro)
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </button>

          <a 
            href="https://wa.me/5585997105228" 
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-700 text-emerald-50 text-[13px] font-medium px-5 py-2.5 rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all shadow-lg hidden sm:block"
          >
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}