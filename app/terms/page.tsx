"use client";

import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
    const { t, language } = useLanguage();

    const sections = [
        {
            title: t("termsSection1"),
            icon: "🧬",
            content: t("termsS1Content")
        },
        {
            title: t("termsSection2"),
            icon: "🛰️",
            content: t("termsS2Content")
        },
        {
            title: t("termsSection3"),
            icon: "🧠",
            content: t("termsS3Content")
        },
        {
            title: t("termsSection4"),
            icon: "📐",
            content: t("termsS4Content")
        }
    ];

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-500">
            <Navbar />

            <main className="flex-grow container mx-auto pt-40 pb-20 px-6">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-primary/5 blur-[180px] pointer-events-none -z-10" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-warning/5 blur-[150px] pointer-events-none -z-10" />

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.3em]">
                            LEGAL & SCIENTIFIC INTELLIGENCE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                            {t("termsTitle")}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-500 font-bold max-w-2xl mx-auto leading-relaxed">
                            {t("termsIntro")}
                        </p>
                    </div>

                    {/* Scientific Banner */}
                    <div className="glass p-8 md:p-12 rounded-[3.5rem] border-l-8 border-primary relative overflow-hidden animate-in zoom-in-95 duration-1000">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <svg className="w-40 h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2v20M2 12h20" />
                                <path d="M12 12l7-7M12 12l-7 7M12 12l7 7M12 12l-7-7" />
                            </svg>
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl font-black tracking-tight gradient-text">Data Ethics & Cognitive Engineering</h2>
                            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                                "{t("scientificQuote")}"
                            </p>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sections.map((section, idx) => (
                            <div
                                key={idx}
                                className="group glass p-10 rounded-[3rem] space-y-6 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    {section.icon}
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-neutral-800 dark:text-neutral-100">
                                    {section.title}
                                </h3>
                                <p className="text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        {/* Cookie Policy Section */}
                        <div className="md:col-span-2 glass p-10 rounded-[3rem] border-t-4 border-warning/30 flex flex-col md:flex-row items-center gap-10">
                            <div className="text-6xl animate-bounce">🍪</div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black">{t("cookiesTitle")}</h3>
                                <p className="text-lg text-neutral-500 font-bold leading-relaxed">
                                    {t("cookiesContent")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scientific Footer Disclaimer */}
                    <div className="text-center py-10 opacity-50 space-y-4">
                        <div className="h-[2px] w-40 bg-[var(--primary)] opacity-30 mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-500">
                            Neural Processing Unit ID: TM-99-ALPHA | Last Mathematical Calibration: 2026.02
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
