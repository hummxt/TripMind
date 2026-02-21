"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";
import { Wallet, MapPin, Briefcase, UtensilsCrossed, BarChart3, Calendar, Target, Rocket, Brain, Gem } from "lucide-react";

export default function AboutPage() {
    const { t } = useLanguage();

    const howItWorksPoints = [
        { title: t("howPoint1"), Icon: Wallet },
        { title: t("howPoint2"), Icon: MapPin },
        { title: t("howPoint3"), Icon: Briefcase },
        { title: t("howPoint4"), Icon: UtensilsCrossed },
        { title: t("howPoint5"), Icon: BarChart3 },
        { title: t("howPoint6"), Icon: Calendar },
    ];

    return (
        <div className="min-h-screen transition-colors duration-500 flex flex-col">
            <Navbar />

            <main className="container mx-auto pt-40 pb-20 px-8 flex-grow">
                <div className="max-w-5xl mx-auto space-y-32 text-indigo-950 dark:text-white">

                    {/* Hero Section */}
                    <section className="text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] pb-4">
                            {t("aboutTitle").split('?')[0]}<span className="text-[var(--primary)]" style={{ display: 'inline-block', paddingRight: '0.35em' }}>?</span>
                        </h1>
                        <div className="space-y-8 text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-black tracking-tight leading-relaxed max-w-4xl mx-auto px-4 text-center">
                            <p>{t("aboutDesc")}</p>
                            <div className="flex justify-center pt-4">
                                <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-bold border-l-4 border-primary/40 pl-6 py-4 text-left max-w-2xl bg-primary/5 rounded-r-section" style={{ borderTopRightRadius: "var(--radius-section)", borderBottomRightRadius: "var(--radius-section)" }}>
                                    {t("aboutSystemDesc")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <section className="glass p-12 md:p-16 rounded-section space-y-8 border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02]">
                            <div className="w-16 h-16 bg-primary/10 rounded-card flex items-center justify-center shadow-lg border border-primary/20 text-primary">
                                <Target size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{t("missionTitle")}</h2>
                            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed">
                                {t("missionDesc")}
                            </p>
                        </section>

                        <section className="glass p-12 md:p-16 rounded-section space-y-8 border-secondary/10 hover:border-secondary/30 transition-all duration-500 hover:scale-[1.02]">
                            <div className="w-16 h-16 bg-secondary/10 rounded-card flex items-center justify-center shadow-lg border border-secondary/20 text-secondary">
                                <Rocket size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">{t("visionTitle")}</h2>
                            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed">
                                {t("visionDesc")}
                            </p>
                        </section>
                    </div>

                    {/* How It Works */}
                    <section className="relative space-y-16">
                        <div className="text-center space-y-4 max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-accent/10 rounded-card flex items-center justify-center shadow-xl border border-accent/20 mx-auto mb-6 text-accent">
                                <Brain size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{t("howItWorksTitle")}</h2>
                            <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-bold tracking-tight">
                                Sadəcə istəklərini qeyd et — <span className="text-accent">qalanını AI həll edir</span>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {howItWorksPoints.map((point, i) => {
                                const Icon = point.Icon;
                                return (
                                    <div key={i} className="glass p-8 rounded-section flex flex-col gap-6 hover:border-accent/40 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden bg-white/40 dark:bg-black/20 border-white/60 dark:border-white/5">
                                        <div className="absolute -top-4 -right-4 text-8xl font-black text-black/[0.03] dark:text-white/[0.03] pointer-events-none select-none group-hover:scale-110 transition-transform duration-700">
                                            {i + 1}
                                        </div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-card bg-accent text-white flex items-center justify-center text-sm font-black shadow-lg shadow-accent/20">
                                                {i + 1}
                                            </div>
                                            <div className="text-accent opacity-60 group-hover:opacity-100 transition-all duration-500">
                                                <Icon size={28} strokeWidth={2} />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black tracking-tight text-neutral-800 dark:text-neutral-100 leading-tight relative z-10">
                                            {point.title}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Why Us */}
                    <section className="text-center space-y-12 pb-20">
                        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] border border-neutral-200 dark:border-neutral-700">
                            <Gem size={14} strokeWidth={2} /> {t("whyUsTitle")}
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1] pb-4 px-4">
                            {t("whyUsDesc")}
                        </h2>
                        <div className="pt-10">
                            <Link href="/" className="btn-premium px-16 py-6 text-sm uppercase font-black tracking-[0.2em] shadow-xl hover:shadow-2xl">
                                {t("startExploring")}
                            </Link>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
