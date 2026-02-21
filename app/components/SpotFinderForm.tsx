"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import PlaceSearchInput from "./PlaceSearchInput";
import Input from "./ui/Input";
import { Mountain, Landmark, TreePine, Monitor, UtensilsCrossed, Palette, Music, MapPin, Wallet } from "lucide-react";

export default function SpotFinderForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { t, language } = useLanguage();
    const { profile } = useProfile();
    const [isInterestsOpen, setIsInterestsOpen] = useState(false);
    const [formData, setFormData] = useState({
        country: "",
        budget: "",
        interests: ["adventure"] as string[]
    });

    useEffect(() => {
        if (profile.defaultBudget) setFormData((f) => ({ ...f, budget: profile.defaultBudget }));
        if (profile.interests?.length) setFormData((f) => ({ ...f, interests: profile.interests }));
    }, [profile.defaultBudget, profile.interests]);

    const interestOptions = [
        { id: "adventure", label: t("interestAdventure"), Icon: Mountain },
        { id: "history", label: t("interestHistorian"), Icon: Landmark },
        { id: "nature", label: t("interestNature"), Icon: TreePine },
        { id: "tech", label: t("interestTech"), Icon: Monitor },
        { id: "gastronomy", label: t("interestGastronome"), Icon: UtensilsCrossed },
        { id: "art", label: t("interestCreative"), Icon: Palette },
        { id: "music", label: t("interestMusic") || (language === "az" ? "Musiqi sevən" : language === "ru" ? "Любитель музыки" : "Music Lover"), Icon: Music }
    ];

    const selectedInterests = interestOptions.filter(i => formData.interests.includes(i.id));

    const toggleInterest = (id: string) => {
        setFormData(prev => {
            const isSelected = prev.interests.includes(id);
            if (isSelected) {
                if (prev.interests.length === 1) return prev; // Keep at least one
                return { ...prev, interests: prev.interests.filter(i => i !== id) };
            } else {
                return { ...prev, interests: [...prev.interests, id] };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({
            ...formData,
            interest: selectedInterests.map(i => i.label).join(", ")
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl glass p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-white/10 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* Destination Input */}
                <div className="space-y-3 md:space-y-4 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                        {language === "az" ? "Ölkə və Şəhər" : language === "ru" ? "Страна и город" : "Country & City"}
                    </label>
                    <PlaceSearchInput
                        value={formData.country}
                        onChange={(v) => setFormData({ ...formData, country: v })}
                        placeholder={t("enterCountry")}
                        type="places"
                        required
                        icon={<MapPin size={20} />}
                    />
                </div>

                {/* Manual Budget Input */}
                <div className="space-y-3 md:space-y-4 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                        {language === "az" ? "Büdcə Aralığı" : language === "ru" ? "Диапазон бюджета" : "Budget Range"}
                    </label>
                    <Input
                        type="text"
                        placeholder={language === "az" ? "Məsələn: 500-1000$" : "E.g: 500-1000$"}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                        icon={<Wallet size={20} />}
                    />
                </div>
            </div>

            {/* Multi-Interest Selection */}
            <div className="space-y-4 md:space-y-6 text-left relative">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                    {language === "az" ? "Sizin Maraqlarınız" : language === "ru" ? "Ваши интересы" : "Your Interests"}
                </label>

                <button
                    type="button"
                    onClick={() => setIsInterestsOpen(!isInterestsOpen)}
                    className="w-full glass bg-white/5 dark:bg-black/40 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between group transition-all hover:bg-white/10 border-white/10 min-h-[80px] md:min-h-[120px]"
                >
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap max-w-[85%]">
                        {selectedInterests.map(item => (
                            <div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleInterest(item.id);
                                }}
                                className="flex items-center gap-1.5 md:gap-2 bg-primary/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-primary/20 animate-in zoom-in-90 hover:bg-primary/30 transition-all cursor-pointer group/tag"
                            >
                                <item.Icon size={18} className="text-primary" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary font-bold">{item.label}</span>
                                <span className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] md:text-[10px] group-hover/tag:bg-primary group-hover/tag:text-white transition-colors">✕</span>
                            </div>
                        ))}
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform duration-500 flex-shrink-0 ${isInterestsOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isInterestsOpen && (
                    <div className="absolute z-50 top-full left-0 w-full mt-2 md:mt-4 glass bg-white/95 dark:bg-neutral-900/95 rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-white/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[60vh] overflow-y-auto">
                        {interestOptions.map((item) => {
                            const isSelected = formData.interests.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => toggleInterest(item.id)}
                                    className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-3xl transition-all relative ${isSelected
                                            ? 'bg-primary text-white shadow-xl scale-[1.02] md:scale-105'
                                            : 'hover:bg-primary/10 text-neutral-600 dark:text-neutral-300 bg-white/5'
                                        }`}
                                >
                                    <item.Icon size={24} className={isSelected ? "text-white" : "text-primary"} />
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-left">{item.label}</span>
                                    {isSelected && (
                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 md:top-2 md:right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                        <div className="col-span-full pt-4 mt-2 border-t border-white/10 sticky bottom-0 bg-inherit pb-2">
                            <button
                                type="button"
                                onClick={() => setIsInterestsOpen(false)}
                                className="w-full py-3 md:py-4 bg-primary/20 text-primary rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                {language === "az" ? "SEÇİMİ TAMAMLA" : language === "ru" ? "ЗАВЕРШИТЬ ВЫБОР" : "COMPLETE SELECTION"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn-premium w-full py-5 md:py-7 text-lg md:text-xl uppercase tracking-[0.3em] font-black shadow-[0_20px_40px_-10px_rgba(14,165,233,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.6)]"
                style={{ background: 'var(--primary)' }}
            >
                {t("searchBtn")}
            </button>
        </form>
    );
}
