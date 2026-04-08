"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDarkMode(isDark);
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
    }, []);

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

    useEffect(() => {
        if (pathname !== "/") return;
        const handleScroll = () => {
            const sections = ["home", "acomodacoes", "experiencias"];
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname === "/") {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
            }
        }
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="flex items-center gap-4 md:gap-8 px-6 py-3 rounded-full bg-white/90 dark:bg-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-lg transition-all">
                
                <Link href="/" onClick={(e) => handleLinkClick(e, "home")} className="mr-2 transition-transform hover:scale-105">
                    <img src="/azzuro-logo-navbar-.png" alt="Logo" className="h-6 w-auto block dark:brightness-110" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold">
                    <Link href="/#home" onClick={(e) => handleLinkClick(e, "home")}
                        className={`transition-all duration-300 ${pathname === "/" && activeSection === "home"
                            ? "text-black dark:text-emerald-400" 
                            : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"
                        }`}>
                        Hotel
                    </Link>

                    <div className="relative group py-2">
                        <Link href="/#acomodacoes" onClick={(e) => handleLinkClick(e, "acomodacoes")}
                            className={`transition-all duration-300 ${pathname === "/" && activeSection === "acomodacoes"
                                ? "text-black dark:text-emerald-400" 
                                : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"
                            }`}>
                            Acomodações
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="flex flex-col w-48 p-2 rounded-2xl bg-white dark:bg-[#0A140E] border border-black/5 dark:border-white/10 shadow-xl">
                                <Link href="/acomodacoes/bangalo-jacuzzi" className="px-4 py-2.5 text-xs font-medium rounded-xl text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">Bangalô c/ Jacuzzi</Link>
                                <Link href="/acomodacoes/bangalo" className="px-4 py-2.5 text-xs font-medium rounded-xl text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">Bangalô Tradicional</Link>
                                <Link href="/acomodacoes/chale-family" className="px-4 py-2.5 text-xs font-medium rounded-xl text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">Chalé Family</Link>
                                <Link href="/acomodacoes/suite-premium" className="px-4 py-2.5 text-xs font-medium rounded-xl text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">Suíte Premium</Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/restaurante" className={`transition-all ${pathname === "/restaurante" ? "text-orange-600" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                        Restaurante
                    </Link>

                    <Link href="/vip" className={`transition-all ${pathname === "/vip" ? "text-black dark:text-emerald-400" : "text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white"}`}>
                        VIP
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={toggleTheme} className="p-2 text-black dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all">
                        {isDarkMode ? "☀️" : "🌙"}
                    </button>
                    <a href="https://wa.me/5585997105228" target="_blank" className="bg-black dark:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-[12px] font-bold hover:scale-105 transition-all shadow-md">
                        Reservar
                    </a>
                </div>
            </div>
        </nav>
    );
}