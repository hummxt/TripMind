"use client";

import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";

export default function Footer() {
    const { t, language } = useLanguage();
    const { theme } = useTheme();

    const currentYear = new Date().getFullYear();

    const exploreLinks = [
        { name: t("tripArchitectTitle"), href: "/trip-architect" },
        { name: t("tripPlannerTitle"), href: "/trip-planner" },
        { name: t("gastroGuideTitle"), href: "/gastro-guide" },
        { name: t("spotFinderTitle"), href: "/spot-finder" },
        { name: t("foodFinderTitle"), href: "/food-finder" },
    ];

    const companyLinks = [
        { name: t("about"), href: "/about" },
        { name: t("privacyPolicy"), href: "/privacy" },
        { name: t("terms"), href: "/terms" },
    ];

    return (
        <footer className={`relative border-t ${theme === 'dark' ? 'border-white/[0.04]' : 'border-black/[0.04]'}`}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Main grid */}
                <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
                    {/* Brand */}
                    <div className="md:col-span-5 space-y-6 flex flex-col items-center md:items-start">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className={`w-10 h-10 rounded-xl overflow-hidden border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.03]'
                                }`}>
                                <img src="/logo_png.png" alt="TripMind" className="w-7 h-7 object-contain" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight">
                                Trip<span className="text-primary">Mind</span>
                            </span>
                        </Link>
                        <p className={`text-sm font-medium leading-relaxed max-w-sm ${theme === 'dark' ? 'text-white/30' : 'text-neutral-500'}`}>
                            {t("aboutSystemDesc")}
                        </p>
                    </div>

                    {/* Explore */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/25' : 'text-neutral-400'}`}>
                            {t("explore")}
                        </h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-neutral-500 hover:text-primary'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-2 space-y-6">
                        <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-white/25' : 'text-neutral-400'}`}>
                            {t("company")}
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-neutral-500 hover:text-primary'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Glow divider */}
                <div className="glow-line" />

                {/* Bottom bar */}
                <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className={`text-[11px] font-medium ${theme === 'dark' ? 'text-white/20' : 'text-neutral-400'}`}>
                        © {currentYear} TripMind. {language === "az" ? "Bütün hüquqlar qorunur." : language === "ru" ? "Все права защищены." : "All rights reserved."}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className={`text-[11px] font-medium transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white/50' : 'text-neutral-400 hover:text-primary'}`}>
                            {t("terms")}
                        </Link>
                        <Link href="/privacy" className={`text-[11px] font-medium transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white/50' : 'text-neutral-400 hover:text-primary'}`}>
                            {t("privacyPolicy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
