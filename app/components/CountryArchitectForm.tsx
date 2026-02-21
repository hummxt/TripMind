"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import { Wallet, Globe, Languages, ChevronRight, ChevronLeft, Send, Plus, X } from "lucide-react";
import Input from "./ui/Input";

const AVAILABLE_LANGUAGES = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Turkish",
    "Hindi", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish",
    "Polish", "Czech", "Greek", "Thai", "Vietnamese", "Indonesian",
    "Malay", "Swahili", "Azerbaijani", "Georgian", "Romanian", "Hungarian",
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

interface LanguageEntry {
    language: string;
    level: string;
}

// ─── STEP CONTAINER COMPONENT ───
interface StepWrapperProps {
    stepNumber: number;
    title: string;
    description?: string;
    icon: React.ReactNode;
    colorClasses: string;
    children: React.ReactNode;
}

function StepWrapper({ stepNumber, title, description, icon, colorClasses, children }: StepWrapperProps) {
    return (
        <div className="animate-slide-up space-y-8">
            <div className="flex flex-row items-center gap-4">
                <div className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all ${colorClasses}`}>
                    {icon}
                </div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Step {stepNumber}: {title}
                    </h2>
                    {description && <p className="text-white/40 dark:text-white/40 text-sm font-medium mt-1">{description}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

export default function CountryArchitectForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { t, language } = useLanguage();
    const { profile } = useProfile();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<{ budget: string; continent: string | string[] }>({
        budget: "",
        continent: [],
    });
    const [knownLanguages, setKnownLanguages] = useState<LanguageEntry[]>([
        { language: "English", level: "B1" },
    ]);

    useEffect(() => {
        if (profile.defaultBudget) setFormData((f) => ({ ...f, budget: profile.defaultBudget }));
        if (profile.languages?.length) setKnownLanguages(profile.languages);
    }, [profile.defaultBudget, profile.languages]);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [langSearch, setLangSearch] = useState("");

    const continents = [
        {
            id: "Europe", label: t("continentEurope"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15 15 0 010 20M2 12h20M4.5 6.5h15M4.5 17.5h15" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            id: "Asia", label: t("continentAsia"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
        },
        {
            id: "Africa", label: t("continentAfrica"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="5" />
                </svg>
            ),
        },
        {
            id: "North America", label: t("continentNAmerica"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            id: "South America", label: t("continentSAmerica"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M6 18.5a3.5 3.5 0 117 0c0 2-3.5 3.5-3.5 3.5S6 20.5 6 18.5z" />
                    <path d="M17 5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M15 14l-3-3-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: "Australia/Oceania", label: t("continentOceania"),
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M2 15c6-2 8 4 14-1" strokeLinecap="round" />
                    <path d="M2 19c6-2 8 4 14-1" strokeLinecap="round" />
                    <circle cx="8" cy="8" r="2" />
                    <circle cx="16" cy="6" r="1.5" />
                </svg>
            ),
        },
        {
            id: "Whole World", label: language === "en" ? "Whole World" : language === "az" ? "Bütün dünya" : "Весь мир",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                </svg>
            ),
        },
    ];

    const toggleContinent = (id: string) => {
        if (id === "Whole World") {
            setFormData({ ...formData, continent: "Whole World" });
            return;
        }
        const current = Array.isArray(formData.continent) ? formData.continent : [];
        if (current.includes(id)) {
            const next = current.filter((c) => c !== id);
            setFormData({ ...formData, continent: next });
        } else {
            setFormData({ ...formData, continent: [...current, id] });
        }
    };


    const addLanguage = (lang: string) => {
        if (!knownLanguages.find((l) => l.language === lang)) {
            setKnownLanguages([...knownLanguages, { language: lang, level: "A2" }]);
        }
        setShowLangDropdown(false);
        setLangSearch("");
    };

    const removeLanguage = (index: number) => {
        setKnownLanguages(knownLanguages.filter((_, i) => i !== index));
    };

    const updateLevel = (index: number, level: string) => {
        const updated = [...knownLanguages];
        updated[index].level = level;
        setKnownLanguages(updated);
    };

    const filteredLangs = AVAILABLE_LANGUAGES.filter(
        (l) =>
            l.toLowerCase().includes(langSearch.toLowerCase()) &&
            !knownLanguages.find((kl) => kl.language === l)
    );

    const nextStep = () => {
        if (step === 1 && !formData.budget) return;
        if (step === 2) {
            const hasContinent = formData.continent === "Whole World" || (Array.isArray(formData.continent) && formData.continent.length > 0);
            if (!hasContinent) return;
        }
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ─── FIX: Only submit if we are on the final step ───
        if (step < 3) {
            nextStep();
            return;
        }
        onGenerate({
            ...formData,
            knownLanguages,
            type: "architect",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl card-surface p-8 md:p-14 rounded-3xl mx-auto relative overflow-hidden">

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{ width: `${(step / 3) * 100}%`, background: "var(--primary)" }}
                />
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-10">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/40" : "w-4 bg-white/10"
                            }`}
                    />
                ))}
            </div>

            {step === 1 && (
                <StepWrapper
                    stepNumber={1}
                    title={t("budget")}
                    description={t("budgetUSD")}
                    icon={<Wallet size={28} />}
                    colorClasses="bg-primary/10 border-primary/20 text-primary"
                >
                    <Input
                        type="number"
                        placeholder="e.g. 2500"
                        className="pl-8 pr-20 py-6 md:py-8 font-black text-2xl md:text-3xl no-spinner"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                        autoFocus
                    />

                    <button
                        type="button"
                        onClick={nextStep}
                        className="btn-premium w-full py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
                    >
                        Next Step <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </StepWrapper>
            )}

            {step === 2 && (
                <StepWrapper
                    stepNumber={2}
                    title={t("chooseContinent")}
                    icon={<Globe size={28} />}
                    colorClasses="bg-secondary/10 border-secondary/20 text-secondary"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {continents.map((c) => {
                            const isSelected = formData.continent === "Whole World"
                                ? c.id === "Whole World"
                                : Array.isArray(formData.continent) && formData.continent.includes(c.id);
                            const isWholeWorld = c.id === "Whole World";
                            return (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => toggleContinent(c.id)}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${isSelected
                                        ? "bg-primary/10 border-primary/40 text-primary shadow-lg"
                                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                                        }`}
                                >
                                    <div className={`${isSelected ? "text-primary" : "text-white/30"} transition-colors`}>
                                        {c.icon}
                                    </div>
                                    <span className="text-sm font-bold tracking-wide flex-1">{c.label}</span>
                                    {isSelected && !isWholeWorld && (
                                        <span className="text-xs font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full">✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-all"
                        >
                            <ChevronLeft size={16} /> Back
                        </button>
                        <button
                            type="button"
                            onClick={nextStep}
                            className="btn-premium flex-[2] py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
                        >
                            Next Step <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </StepWrapper>
            )}

            {step === 3 && (
                <StepWrapper
                    stepNumber={3}
                    title={language === "en" ? "Languages You Know" : language === "az" ? "Bildiyin dillər" : "Языки, которые вы знаете"}
                    description={language === "en" ? "Add languages you speak and your level. This helps AI warn you about potential language barriers." : language === "az" ? "Bildiyin dilləri və səviyyəni əlavə et. Bu, AI-yə dil bariyerləri haqqında xəbərdarlıq etməyə kömək edir." : "Добавьте языки, которыми владеете, и уровень. Это поможет ИИ предупредить о языковых барьерах."}
                    icon={<Languages size={28} />}
                    colorClasses="bg-accent/10 border-accent/20 text-accent"
                >
                    {/* Current languages */}
                    <div className="space-y-3">
                        {knownLanguages.map((entry, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <div className="flex-1 font-bold text-sm">{entry.language}</div>
                                <div className="flex items-center gap-1">
                                    {LEVELS.map((lvl) => (
                                        <button
                                            key={lvl}
                                            type="button"
                                            onClick={() => updateLevel(index, lvl)}
                                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${entry.level === lvl
                                                ? "bg-primary/15 text-primary"
                                                : "text-white/30 hover:text-white/60"
                                                }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeLanguage(index)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add language */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowLangDropdown(!showLangDropdown)}
                            className="w-full py-4 rounded-2xl border border-dashed border-white/10 hover:border-primary/30 text-white/30 hover:text-primary text-sm font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <Plus size={16} /> {language === "en" ? "Add a language" : language === "az" ? "Dil əlavə et" : "Добавить язык"}
                        </button>

                        {showLangDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 card-surface rounded-2xl p-3 max-h-60 overflow-y-auto z-50 shadow-2xl">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="mb-2 px-4 py-3 text-sm rounded-lg"
                                    value={langSearch}
                                    onChange={(e) => setLangSearch(e.target.value)}
                                    autoFocus
                                />
                                {filteredLangs.map((lang) => (
                                    <button
                                        key={lang}
                                        type="button"
                                        onClick={() => addLanguage(lang)}
                                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-white/60 hover:text-white transition-all"
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info note */}
                    <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
                        <p className="text-xs text-white/30 font-medium">
                            {language === "en" ? "AI will warn you if the recommended country has a language you don't speak." : language === "az" ? "AI, tövsiyə olunan ölkədə bilmədiyiniz dil olduqda sizi xəbərdar edəcək." : "ИИ предупредит, если в рекомендуемой стране говорят на языке, которого вы не знаете."}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 py-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-all"
                        >
                            <ChevronLeft size={16} /> Back
                        </button>
                        <button
                            type="submit"
                            className="btn-premium flex-[2] py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
                        >
                            Analyze & Generate <Send size={16} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                </StepWrapper>
            )}
        </form>
    );
}
