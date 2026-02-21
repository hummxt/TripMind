"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/profile", label: t("profile") },
    ];

    const toggleLanguage = () => {
        if (language === "en") setLanguage("az");
        else if (language === "az") setLanguage("ru");
        else setLanguage("en");
    };

    return (
        <>
            {/* ─── NAVBAR ─── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled
                    ? `py-3 backdrop-blur-2xl border-b ${theme === 'dark' ? 'bg-[#1f1f1f]/90 border-[#F7F8F0]/10' : 'bg-[#F7F8F0]/90 border-[#355872]/10'}`
                    : "py-5 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`relative w-9 h-9 rounded-xl overflow-hidden border flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'border-white/10 bg-white/[0.03] group-hover:border-primary/30' : 'border-black/10 bg-black/[0.03] group-hover:border-primary/30'
                            }`}>
                            <img src="/logo_png.png" alt="TripMind" className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight">
                            Trip<span className="text-primary">Mind</span>
                        </span>
                    </Link>

                    {/* Desktop center nav */}
                    <div className="hidden lg:flex items-center">
                        <div className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full border transition-all ${theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.02]'
                            }`}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 hover:text-primary ${theme === 'dark' ? 'text-white/40' : 'text-neutral-500'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-amber-400' : 'border-black/[0.06] bg-black/[0.02] text-neutral-500 hover:text-amber-500'
                                }`}
                        >
                            {theme === "dark" ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className={`px-3 h-10 rounded-xl border flex items-center justify-center text-[10px] font-black tracking-widest uppercase transition-all ${theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white' : 'border-black/[0.06] bg-black/[0.02] text-neutral-500 hover:text-black'
                                }`}
                        >
                            {language}
                        </button>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white' : 'border-black/[0.06] bg-black/[0.02] text-neutral-500 hover:text-black'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── MOBILE SIDEBAR ─── */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[100]">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div
                        className={`absolute top-0 right-0 w-[80%] max-w-sm h-full z-[110] flex flex-col border-l transition-colors duration-500 ${theme === 'dark' ? 'bg-[#2a2a2a] border-[#F7F8F0]/10' : 'bg-[#F7F8F0] border-[#355872]/10'
                            }`}
                        style={{
                            animation: "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6">
                            <span className={`text-sm font-bold tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/40' : 'text-neutral-400'}`}>Menu</span>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-white/[0.06] text-white/40 hover:text-white' : 'border-black/[0.06] text-neutral-500 hover:text-black'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Nav links */}
                        <div className="flex flex-col gap-1 px-4 mt-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`px-6 py-4 rounded-2xl text-lg font-black tracking-tight transition-all ${theme === 'dark' ? 'text-white hover:bg-white/[0.04]' : 'text-neutral-800 hover:bg-black/[0.02]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto p-8 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">TripMind AI</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
