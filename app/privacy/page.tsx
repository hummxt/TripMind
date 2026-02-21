"use client";

import { AlertTriangle, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
    const { t, language } = useLanguage();

    const points = [
        {
            title: t("privacyPoint1Title"),
            desc: t("privacyPoint1Desc")
        },
        {
            title: t("privacyPoint2Title"),
            desc: t("privacyPoint2Desc")
        }
    ];

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-500">
            <Navbar />

            <main className="flex-grow container mx-auto pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                            {t("privacyTitle")}
                        </h1>
                        <p className="text-xl text-neutral-500 font-bold">
                            {t("privacyIntro")}
                        </p>
                    </div>

                    {/* AI Disclaimer Box - Very Prominent */}
                    <div className="p-8 md:p-12 rounded-[3.5rem] bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 space-y-6 animate-in zoom-in-95 duration-700">
                        <div className="flex items-center gap-4">
                            <AlertTriangle size={40} className="text-red-500" />
                            <h2 className="text-2xl font-black text-red-600 dark:text-red-400 uppercase tracking-tight">AI Analysis Disclaimer</h2>
                        </div>
                        <p className="text-lg md:text-xl text-red-800/80 dark:text-red-300/80 font-black leading-relaxed">
                            {t("aiDisclaimer")}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {points.map((point, i) => (
                            <div key={i} className="glass p-10 rounded-[3rem] space-y-4">
                                <h3 className="text-2xl font-black text-primary">{point.title}</h3>
                                <p className="text-neutral-500 font-bold leading-relaxed">{point.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Zero Storage Note */}
                    <div className="glass p-10 rounded-[4rem] text-center space-y-4 border-dashed border-2 border-neutral-200 dark:border-neutral-800">
                        <Shield size={48} className="text-primary" />
                        <h3 className="text-2xl font-black">{t("zeroStorageTitle")}</h3>
                        <p className="text-neutral-500 font-medium max-w-xl mx-auto">
                            {t("zeroStorageDesc")}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
