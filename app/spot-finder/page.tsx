"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpotFinderForm from "../components/SpotFinderForm";
import SpotDisplay from "../components/SpotDisplay";

export default function SpotFinderPage() {
    const { t, language } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [discoveryData, setDiscoveryData] = useState<any>(null);

    const [error, setError] = useState<string | null>(null);

    const generateDiscovery = async (formData: any) => {
        setIsGenerating(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

        try {
            const res = await fetch("/api/spot-discovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData, language }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to discover spots");
            }

            setDiscoveryData(data.data);
        } catch (err: any) {
            console.error("Spot Finder error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full pt-32 pb-20 px-6 flex flex-col items-center relative z-10">
                <div className={`absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[200px] pointer-events-none`} />

                <div className="w-full max-w-6xl relative text-center">
                    {!discoveryData && !isGenerating && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                                    {t("spotFinderTitle")}
                                </h1>
                                <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto font-bold tracking-tight">
                                    {t("spotFinderDesc")}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl text-sm font-semibold max-w-xl mx-auto">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-center">
                                <SpotFinderForm onGenerate={generateDiscovery} />
                            </div>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="flex flex-col items-center gap-10 py-32 animate-in zoom-in-95 duration-500">
                            <div className="relative">
                                <div className="w-32 h-32 border-[6px] border-accent/10 border-t-accent rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl">🏛️</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-5xl font-black tracking-tighter text-[var(--accent)]">{t("analyzing")}</h3>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">{t("calculating")}</p>
                            </div>
                        </div>
                    )}

                    {discoveryData && (
                        <div className="animate-in zoom-in-95 duration-700 w-full flex flex-col items-center">
                            <div className="mb-12 space-y-3 text-center">
                                <div className="tag text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5 mx-auto w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    Complete
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
                                    {language === "en" ? "Spot Discovery Ready" : language === "az" ? "Məkan Kəşfi Hazırdır" : "Поиск мест готов"}
                                </h2>
                                <p className="text-white/50 dark:text-neutral-500 font-bold tracking-widest uppercase text-xs">Curated by TripMind Discovery Analyst AI</p>
                            </div>
                            <SpotDisplay data={discoveryData} />
                            <div className="mt-12 flex justify-center w-full">
                                <button
                                    onClick={() => setDiscoveryData(null)}
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
