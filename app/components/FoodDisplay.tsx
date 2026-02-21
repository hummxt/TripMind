"use client";

import { useLanguage } from "../context/LanguageContext";
import { ChefHat, UtensilsCrossed, Wallet, CircleDot, Flame, MapPin, Sparkles, Soup, Wine } from "lucide-react";

interface Recommendation {
    name: string;
    location: string;
    description: string;
    why_matches: string;
    price_range: string;
    image_url?: string | null;
}

interface FoodData {
    country: string;
    budget_analysis: string;
    taste_analysis: string;
    famous_culinary_spots: { name: string; city: string; image_url?: string | null }[];
    recommendations: Recommendation[];
}

export default function FoodDisplay({ data }: { data: FoodData }) {
    const { language, t } = useLanguage();

    const labels = {
        az: {
            culinaryInsight: "Kulinariya İnsaytı",
            recommendations: "Tövsiyə olunan dadlar",
            matches: "Zövqünüzə uyğunluq",
            price: "Təxmini büdcə",
            location: "Məkan/Region",
            budgetTitle: "Büdcə Analizi",
            tasteTitle: "Damaq Dadı Analizi",
            famousSpots: "Məşhur Kulinariya Məkanları"
        },
        ru: {
            culinaryInsight: "Кулинарный инсайт",
            recommendations: "Рекомендуемые вкусы",
            matches: "Соответствие вкусу",
            price: "Примерный бюджет",
            location: "Место/Регион",
            budgetTitle: "Анализ бюджета",
            tasteTitle: "Анализ вкуса",
            famousSpots: "Знаменитые гастро-места"
        },
        en: {
            culinaryInsight: "Culinary Insight",
            recommendations: "Recommended Tastes",
            matches: "Why it matches",
            price: "Estimated Price",
            location: "Location/Region",
            budgetTitle: "Budget Analysis",
            tasteTitle: "Taste Analysis",
            famousSpots: "Famous Culinary Spots"
        }
    };

    const l = (labels as any)[language] || labels.en;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* ── Hero Analysis Section ── */}
            <div className="relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-warning/10 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />

                <div className="glass p-10 md:p-16 rounded-[3.5rem] border-t-8 border-warning relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 scale-150 pointer-events-none text-primary">
                        <ChefHat size={120} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/10">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-warning flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                                    {l.culinaryInsight}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                                    {data.country}
                                </h2>
                            </div>
                            <div className="flex -space-x-4">
                                {[UtensilsCrossed, Soup, UtensilsCrossed, Wine].map((Icon, i) => (
                                    <div key={i} className="w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-xl border border-white/20 transform hover:-translate-y-2 transition-transform duration-500 cursor-default text-primary" style={{ transitionDelay: `${i * 100}ms` }}>
                                        <Icon size={28} strokeWidth={2} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4 p-8 rounded-[2.5rem] bg-white/5 dark:bg-black/20 border border-white/10 hover:border-warning/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-warning/20 text-warning flex items-center justify-center shadow-lg"><Wallet size={20} strokeWidth={2} /></span>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">{l.budgetTitle}</h4>
                                </div>
                                <p className="text-lg font-bold text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {data.budget_analysis}
                                </p>
                            </div>
                            <div className="space-y-4 p-8 rounded-[2.5rem] bg-white/5 dark:bg-black/20 border border-white/10 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-lg"><CircleDot size={20} strokeWidth={2} /></span>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">{l.tasteTitle}</h4>
                                </div>
                                <p className="text-lg font-bold text-neutral-600 dark:text-neutral-300 leading-relaxed border-l-4 border-primary/30 pl-4">
                                    {data.taste_analysis}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Famous Culinary Spots ── */}
            {data.famous_culinary_spots && data.famous_culinary_spots.length > 0 && (
                <div className="space-y-8">
                    <div className="flex items-center gap-4 px-4">
                        <span className="text-warning"><Flame size={28} strokeWidth={2} /></span>
                        <h3 className="text-2xl font-black tracking-tight">{l.famousSpots}</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {data.famous_culinary_spots.map((spot, i) => (
                            <div key={i} className="glass p-6 rounded-3xl group hover:border-warning/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                {spot.image_url && (
                                    <div className="h-24 -mx-6 -mt-6 mb-3 overflow-hidden rounded-t-3xl">
                                        <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                )}
                                <div className="text-[10px] font-black uppercase tracking-widest text-warning mb-2 opacity-60 group-hover:opacity-100">{spot.city}</div>
                                <div className="font-bold text-sm leading-tight text-neutral-600 dark:text-neutral-300">{spot.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Recommendations Section ── */}
            <div className="space-y-10">
                <div className="flex items-center gap-6 px-4">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter">{l.recommendations}</h3>
                    <div className="flex-grow h-[2px] bg-[var(--primary)] opacity-40" />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {data.recommendations?.map((item, i) => (
                        <div key={i} className="group glass p-8 md:p-14 rounded-[4rem] flex flex-col md:flex-row gap-10 hover:border-warning/40 transition-all duration-700 shadow-xl hover:shadow-[0_50px_100px_-20px_rgba(245,158,11,0.15)] relative overflow-hidden">
                            {/* Decorative Background Number */}
                            <div className="absolute -top-10 -right-10 text-[15rem] font-black text-black/[0.03] dark:text-white/[0.03] pointer-events-none select-none group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                                {i + 1}
                            </div>

                            <div className="flex-shrink-0 relative">
                                {item.image_url ? (
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700 flex-shrink-0 aspect-square">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover object-center min-w-full min-h-full" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-[2rem] bg-[var(--primary)] text-[var(--color-white)] flex items-center justify-center shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                                        <UtensilsCrossed size={36} strokeWidth={2} />
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-xs font-black shadow-lg">
                                    #{i + 1}
                                </div>
                            </div>

                            <div className="flex-grow space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-neutral-800 dark:text-neutral-100">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 py-2 px-4 rounded-2xl bg-warning/10 border border-warning/20">
                                            <MapPin size={16} className="text-warning" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-warning">{item.location}</span>
                                        </div>
                                    </div>
                                    <div className="h-[2px] w-20 bg-warning group-hover:w-full transition-all duration-1000" />
                                </div>

                                <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed md:pr-12">
                                    {item.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                                    <div className="space-y-3 p-6 rounded-3xl bg-primary/5 hover:bg-primary/10 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={20} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{l.matches}</span>
                                        </div>
                                        <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                                            {item.why_matches}
                                        </p>
                                    </div>
                                    <div className="space-y-3 p-6 rounded-3xl bg-warning/5 hover:bg-warning/10 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Wallet size={20} className="text-warning" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-warning">{l.price}</span>
                                        </div>
                                        <p className="text-sm font-black text-warning">
                                            {item.price_range}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
