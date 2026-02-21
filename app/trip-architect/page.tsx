"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountryArchitectForm from "../components/CountryArchitectForm";
import ArchitectDisplay from "../components/ArchitectDisplay";

export default function TripArchitectPage() {
    const { t, language } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultData, setResultData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const generateArchitecture = async (formData: any) => {
        setIsGenerating(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

        try {
            const res = await fetch("/api/trip-architect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData, language }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to architect your trip");
            }

            setResultData(data.data);
        } catch (err: any) {
            console.error("Architect error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full pt-32 pb-20 px-6 flex flex-col items-center relative z-10">
                <div className="w-full max-w-6xl relative text-center">
                    {!resultData && !isGenerating && (
                        <div className="space-y-12 animate-slide-up">
                            <div className="space-y-4">
                                <div className="tag text-primary/80 border-primary/20 bg-primary/5 mx-auto w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    AI-Powered
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em]">
                                    Trip <span className="gradient-text">Architect</span>
                                </h1>
                                <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium">
                                    {language === "en" ? "Find your perfect destination based on budget, location, and the languages you speak." : language === "az" ? "Büdcənizə, məkanınıza və bildiyiniz dillərə əsasən ideal məkanını tap." : "Найдите идеальное место на основе бюджета, местоположения и языков, которыми вы владеете."}
                                </p>
                            </div>

                            {error && (
                                <div className="card-surface border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-sm font-semibold max-w-xl mx-auto">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-center">
                                <CountryArchitectForm onGenerate={generateArchitecture} />
                            </div>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="flex flex-col items-center gap-8 py-32 animate-scale-in">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-[3px] border-white/5 border-t-primary animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0h1.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-2xl font-black tracking-tight text-primary">{t("analyzing")}</h3>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">{t("calculating")}</p>
                            </div>
                        </div>
                    )}

                    {resultData && (
                        <div className="animate-slide-up w-full flex flex-col items-center">
                            <div className="mb-12 space-y-3 text-center">
                                <div className="tag text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5 mx-auto w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Complete
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
                                    {language === "en" ? "Your Trip Architecture" : language === "az" ? "Səyahət Arxitekturanız" : "Ваша архитектура путешествия"}
                                </h2>
                            </div>
                            <ArchitectDisplay data={resultData} />
                            <div className="mt-12 flex justify-center w-full">
                                <button
                                    onClick={() => setResultData(null)}
                                    className="btn-premium px-10 py-4 text-sm font-bold uppercase tracking-widest"
                                >
                                    {t("startNew")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
