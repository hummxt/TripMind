"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import PlaceSearchInput from "./PlaceSearchInput";
import Input from "./ui/Input";
import { Beef, Leaf, Fish, Cake, Flame, Apple, UtensilsCrossed, Gem, Home, Moon, Wheat, Milk, AlertTriangle, Wallet, Globe } from "lucide-react";

export default function FoodFinderForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { t, language } = useLanguage();
    const { profile } = useProfile();
    const [isTasteOpen, setIsTasteOpen] = useState(false);
    const [isSpecialOpen, setIsSpecialOpen] = useState(false);

    const [formData, setFormData] = useState({
        country: "",
        budget: "",
        tastes: [] as string[],
        special: [] as string[],
        allergyDetails: ""
    });

    useEffect(() => {
        if (profile.defaultBudget) setFormData((f) => ({ ...f, budget: profile.defaultBudget }));
        if (profile.tastes?.length) setFormData((f) => ({ ...f, tastes: profile.tastes }));
        if (profile.special?.length) setFormData((f) => ({ ...f, special: profile.special }));
        if (profile.allergyDetails) setFormData((f) => ({ ...f, allergyDetails: profile.allergyDetails }));
    }, [profile.defaultBudget, profile.tastes, profile.special, profile.allergyDetails]);

    const tasteOptions = [
        { id: "meat", label: t("tasteMeat"), Icon: Beef },
        { id: "vegetarian", label: t("tasteVegetarian"), Icon: Leaf },
        { id: "vegan", label: t("tasteVegan"), Icon: Leaf },
        { id: "seafood", label: t("tasteSeafood"), Icon: Fish },
        { id: "sweet", label: t("tasteSweet"), Icon: Cake },
        { id: "spicy", label: t("tasteSpicy"), Icon: Flame },
        { id: "healthy", label: t("tasteHealthy"), Icon: Apple },
        { id: "street", label: t("tasteStreet"), Icon: UtensilsCrossed },
        { id: "luxury", label: t("tasteLuxury"), Icon: Gem },
        { id: "traditional", label: t("tasteTraditional"), Icon: Home }
    ];

    const specialOptions = [
        { id: "halal", label: t("reqHalal"), Icon: Moon },
        { id: "gluten", label: t("reqGlutenFree"), Icon: Wheat },
        { id: "lactose", label: t("reqLactoseFree"), Icon: Milk },
        { id: "allergy", label: t("reqAllergy"), Icon: AlertTriangle }
    ];

    const toggleTaste = (id: string) => {
        setFormData(prev => {
            const isSelected = prev.tastes.includes(id);
            if (isSelected) {
                return { ...prev, tastes: prev.tastes.filter(t => t !== id) };
            } else {
                return { ...prev, tastes: [...prev.tastes, id] };
            }
        });
    };

    const toggleSpecial = (id: string) => {
        setFormData(prev => {
            const isSelected = prev.special.includes(id);
            if (isSelected) {
                return { ...prev, special: prev.special.filter(s => s !== id) };
            } else {
                return { ...prev, special: [...prev.special, id] };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedTasteLabels = tasteOptions
            .filter(t => formData.tastes.includes(t.id))
            .map(t => t.label)
            .join(", ");

        const selectedSpecialLabels = specialOptions
            .filter(s => formData.special.includes(s.id))
            .map(s => {
                if (s.id === "allergy" && formData.allergyDetails) {
                    return `${s.label} (${formData.allergyDetails})`;
                }
                return s.label;
            })
            .join(", ");

        onGenerate({
            country: formData.country,
            budget: formData.budget,
            tastes: selectedTasteLabels,
            special: selectedSpecialLabels
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl glass p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 md:space-y-12 animate-in zoom-in-95 duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-white/10 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* 1. Country Input */}
                <div className="space-y-3 md:space-y-4 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                        {t("foodCountryLabel")}
                    </label>
                    <PlaceSearchInput
                        value={formData.country}
                        onChange={(v) => setFormData({ ...formData, country: v })}
                        placeholder={t("foodCountryPlaceholder")}
                        type="places"
                        required
                        icon={<Globe size={20} />}
                    />
                    <p className="text-[10px] text-neutral-400 ml-2 font-bold tracking-tight">{t("foodCountrySubLabel")}</p>
                </div>

                {/* 3. Budget Input */}
                <div className="space-y-3 md:space-y-4 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                        {t("foodBudgetLabel")}
                    </label>
                    <Input
                        type="text"
                        placeholder={t("foodBudgetPlaceholder")}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                        icon={<Wallet size={20} />}
                    />
                </div>
            </div>

            {/* 2. Food Taste (Multi-select) */}
            <div className="space-y-4 md:space-y-6 text-left relative">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                    {t("foodTasteLabel")}
                </label>

                <button
                    type="button"
                    onClick={() => { setIsTasteOpen(!isTasteOpen); setIsSpecialOpen(false); }}
                    className="w-full glass bg-white/5 dark:bg-black/40 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between group transition-all hover:bg-white/10 border-white/10 min-h-[80px] md:min-h-[120px]"
                >
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap max-w-[85%]">
                        {formData.tastes.length === 0 ? (
                            <span className="text-neutral-500 font-bold">{language === "az" ? "Dad seçin..." : language === "ru" ? "Выберите вкус..." : "Select tastes..."}</span>
                        ) : (
                            tasteOptions.filter(t => formData.tastes.includes(t.id)).map(item => (
                                <div
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTaste(item.id);
                                    }}
                                    className="flex items-center gap-1.5 md:gap-2 bg-primary/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-primary/20 animate-in zoom-in-90 hover:bg-primary/30 transition-all cursor-pointer group/tag"
                                >
                                    <item.Icon size={18} className="text-primary" />
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary font-bold">{item.label}</span>
                                    <span className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] md:text-[10px] group-hover/tag:bg-primary group-hover/tag:text-white transition-colors">✕</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform duration-500 flex-shrink-0 ${isTasteOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isTasteOpen && (
                    <div className="absolute z-[100] top-full left-0 w-full mt-2 md:mt-4 glass bg-white/95 dark:bg-neutral-900/95 rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[60vh] overflow-y-auto">
                        {tasteOptions.map((item) => {
                            const isSelected = formData.tastes.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => toggleTaste(item.id)}
                                    className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-3xl transition-all relative ${isSelected
                                        ? 'bg-primary text-white shadow-xl scale-[1.02]'
                                        : 'hover:bg-primary/10 text-neutral-600 dark:text-neutral-300 bg-white/5'
                                        }`}
                                >
                                    <item.Icon size={24} className={isSelected ? "text-white" : "text-primary"} />
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-left">{item.label}</span>
                                    {isSelected && (
                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
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
                                onClick={() => setIsTasteOpen(false)}
                                className="w-full py-3 md:py-4 bg-primary/20 text-primary rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                {language === "az" ? "SEÇİMİ TAMAMLA" : language === "ru" ? "ЗАВЕРШИТЬ ВЫБОР" : "COMPLETE SELECTION"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Special Requirements (Multi-select) */}
            <div className="space-y-4 md:space-y-6 text-left relative">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-2">
                    {t("foodSpecialLabel")}
                </label>

                <button
                    type="button"
                    onClick={() => { setIsSpecialOpen(!isSpecialOpen); setIsTasteOpen(false); }}
                    className="w-full glass bg-white/5 dark:bg-black/40 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between group transition-all hover:bg-white/10 border-white/10 min-h-[80px] md:min-h-[120px]"
                >
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap max-w-[85%]">
                        {formData.special.length === 0 ? (
                            <span className="text-neutral-500 font-bold">{language === "az" ? "Tələb seçin..." : language === "ru" ? "Выберите требования..." : "Select requirements..."}</span>
                        ) : (
                            specialOptions.filter(s => formData.special.includes(s.id)).map(item => (
                                <div
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSpecial(item.id);
                                    }}
                                    className="flex items-center gap-1.5 md:gap-2 bg-primary/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-primary/20 animate-in zoom-in-90 hover:bg-primary/30 transition-all cursor-pointer group/tag"
                                >
                                    <item.Icon size={18} className="text-primary" />
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary font-bold">{item.label}</span>
                                    <span className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] md:text-[10px] group-hover/tag:bg-primary group-hover/tag:text-white transition-colors">✕</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-transform duration-500 flex-shrink-0 ${isSpecialOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isSpecialOpen && (
                    <div className="absolute z-[100] top-full left-0 w-full mt-2 md:mt-4 glass bg-white/95 dark:bg-neutral-900/95 rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        {specialOptions.map((item) => {
                            const isSelected = formData.special.includes(item.id);
                            return (
                                <div key={item.id} className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleSpecial(item.id)}
                                        className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-3xl transition-all relative ${isSelected
                                            ? 'bg-primary text-white shadow-xl scale-[1.02]'
                                            : 'hover:bg-primary/10 text-neutral-600 dark:text-neutral-300 bg-white/5'
                                            }`}
                                    >
                                        <item.Icon size={24} className={isSelected ? "text-white" : "text-primary"} />
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-left">{item.label}</span>
                                        {isSelected && (
                                            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                    {item.id === "allergy" && isSelected && (
                                        <Input
                                            type="text"
                                            placeholder={language === "az" ? "Allergiyanızı qeyd edin..." : language === "ru" ? "Укажите вашу аллергию..." : "Note your allergy..."}
                                            className="px-4 py-3 text-sm rounded-lg"
                                            value={formData.allergyDetails}
                                            onChange={(e) => setFormData({ ...formData, allergyDetails: e.target.value })}
                                            autoFocus
                                        />
                                    )}
                                </div>
                            );
                        })}
                        <div className="col-span-full pt-4 mt-2 border-t border-white/10 sticky bottom-0 bg-inherit pb-2">
                            <button
                                type="button"
                                onClick={() => setIsSpecialOpen(false)}
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
                {t("foodGenerateBtn")}
            </button>
        </form>
    );
}
