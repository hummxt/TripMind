"use client";

import { useLanguage } from "../context/LanguageContext";
import { Sun, CloudSun, Moon, UtensilsCrossed, Train, BarChart3 } from "lucide-react";

interface Destination {
    name: string;
    description: string;
    best_time_to_visit: string;
    highlights: string[];
    why_recommended: string;
}

interface BudgetItem {
    price_range: string;
    explanation: string;
    tips: string;
}

interface TotalCost {
    price_range: string;
    per_person: string;
    explanation: string;
    daily_average: string;
}

interface Accommodation {
    name: string;
    type: string;
    price_per_night: string;
    total_cost: string;
    location: string;
    highlights: string[];
    booking_tip: string;
}

interface Attraction {
    name: string;
    description: string;
    entry_fee: string;
    duration: string;
    category: string;
    cost_saving_tip: string;
    image_url?: string | null;
}

interface DailyItinerary {
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    meals: string;
    transport: string;
    estimated_daily_cost: string;
    daily_cost_breakdown: string;
}

interface FoodRecommendation {
    restaurant: string;
    cuisine: string;
    must_try: string[];
    price_range: string;
    location: string;
    why_recommended: string;
    image_url?: string | null;
}

interface TravelTip {
    category: string;
    tip: string;
}

interface PlanData {
    country_overview?: string;
    hero_image_url?: string | null;
    recommended_destinations: (Destination & { image_url?: string | null })[] | string[];
    estimated_budget_breakdown: {
        flight: BudgetItem | string;
        hotel: BudgetItem | string;
        food: BudgetItem | string;
        activities: BudgetItem | string;
        local_transport?: BudgetItem | string;
        shopping_misc?: BudgetItem | string;
        travel_insurance?: BudgetItem | string;
        total_estimated_cost: TotalCost | string;
        budget_level?: string;
    };
    accommodations?: Accommodation[];
    attractions: Attraction[] | string[];
    daily_itinerary?: DailyItinerary[];
    food_recommendations: FoodRecommendation[] | string[];
    travel_tips: TravelTip[] | string[];
    packing_list?: string[];
    money_saving_tips?: string[];
    package_upgrade_suggestion: string;
}

function getBudgetValue(item: BudgetItem | string): string {
    if (typeof item === "string") return item;
    return item.price_range;
}

function getBudgetExplanation(item: BudgetItem | string): string | null {
    if (typeof item === "string") return null;
    return item.explanation;
}

function getBudgetTip(item: BudgetItem | string): string | null {
    if (typeof item === "string") return null;
    return item.tips;
}

function getTotalCost(item: TotalCost | string): string {
    if (typeof item === "string") return item;
    return item.price_range;
}

export default function PlanDisplay({ plan }: { plan: PlanData }) {
    const { t, language } = useLanguage();

    const destinations = (plan.recommended_destinations || []) as any[];
    const attractions = (plan.attractions || []) as any[];
    const foodRecs = (plan.food_recommendations || []) as any[];
    const tips = (plan.travel_tips || []) as any[];

    const labels: Record<string, Record<string, string>> = {
        az: {
            dailyItinerary: "Gündəlik Plan",
            accommodations: "Otellər",
            packingList: "Baqaj Siyahısı",
            moneySaving: "Qənaət Məsləhətləri",
            morning: "Səhər",
            afternoon: "Günorta",
            evening: "Axşam",
            meals: "Yemək",
            transport: "Nəqliyyat",
            perNight: "gecəlik",
            total: "Ümumi",
            mustTry: "Mütləq sına",
            entryFee: "Giriş",
            duration: "Müddət",
            localTransport: "Yerli Nəqliyyat",
            shopping: "Alış-veriş və Digər",
            insurance: "Sığorta",
            perPerson: "Nəfər başına",
            dailyAvg: "Gündəlik ortalama",
        },
        ru: {
            dailyItinerary: "Ежедневный план",
            accommodations: "Отели",
            packingList: "Список вещей",
            moneySaving: "Советы по экономии",
            morning: "Утро",
            afternoon: "День",
            evening: "Вечер",
            meals: "Питание",
            transport: "Транспорт",
            perNight: "за ночь",
            total: "Итого",
            mustTry: "Обязательно попробуй",
            entryFee: "Вход",
            duration: "Длительность",
            localTransport: "Местный транспорт",
            shopping: "Шопинг и прочее",
            insurance: "Страховка",
            perPerson: "На человека",
            dailyAvg: "Среднее в день",
        },
        en: {
            dailyItinerary: "Daily Itinerary",
            accommodations: "Accommodations",
            packingList: "Packing List",
            moneySaving: "Money Saving Tips",
            morning: "Morning",
            afternoon: "Afternoon",
            evening: "Evening",
            meals: "Meals",
            transport: "Transport",
            perNight: "per night",
            total: "Total",
            mustTry: "Must try",
            entryFee: "Entry",
            duration: "Duration",
            localTransport: "Local Transport",
            shopping: "Shopping & Misc",
            insurance: "Insurance",
            perPerson: "Per person",
            dailyAvg: "Daily average",
        },
    };

    const l = labels[language] || labels["en"];

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* ── Country Overview ── */}
            {(plan.country_overview || (plan as any).hero_image_url) && (
                <div className="glass p-10 rounded-[2.5rem] border-t-8 border-primary relative overflow-hidden">
                    {(plan as any).hero_image_url && (
                        <div className="absolute inset-0 opacity-25">
                            <img src={(plan as any).hero_image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5M15 21a9 9 0 10-9-15.347m10.5 13.918A9 9 0 0120.36 10H18a2 2 0 00-2 2v0a2 2 0 002 2h2.36a9 9 0 01-5.36 5.36z" />
                        </svg>
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="p-2 bg-primary/10 rounded-lg text-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <h2 className="text-2xl font-black tracking-tight gradient-text">
                                {language === "en" ? "Destination Insights" : language === "az" ? "Məkan Haqqında" : "О месте назначения"}
                            </h2>
                        </div>
                        {plan.country_overview && (
                            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-bold leading-relaxed indent-8">
                                {plan.country_overview}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* ── Destinations ── */}
            {destinations.length > 0 && (
                <div className="glass p-8 rounded-3xl border-l-4 border-primary">
                    <h2 className="text-2xl font-bold mb-6 gradient-text">{t("recommended")}</h2>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {destinations.map((dest, i) => (
                            <div key={i} className="flex items-center gap-3 px-5 py-3 bg-primary/10 text-primary rounded-2xl font-bold text-sm shadow-sm">
                                {typeof dest !== "string" && dest.image_url && (
                                    <img src={dest.image_url} alt={dest.name} className="w-10 h-10 rounded-xl object-cover" />
                                )}
                                <span>{typeof dest === "string" ? dest : dest.name}</span>
                                {typeof dest !== "string" && dest.best_time_to_visit && (
                                    <span className="ml-2 text-xs font-medium opacity-70">· {dest.best_time_to_visit}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {typeof destinations[0] !== "string" && destinations[0]?.description && (
                        <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4">
                            {destinations[0].description}
                        </p>
                    )}
                    {typeof destinations[0] !== "string" && destinations[0]?.why_recommended && (
                        <p className="text-xs text-blue-400 font-semibold mb-3">💡 {destinations[0].why_recommended}</p>
                    )}
                    {typeof destinations[0] !== "string" && destinations[0]?.highlights?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {destinations[0].highlights.map((h: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold text-neutral-500">
                                    ✦ {h}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── Budget Breakdown ── */}
            {plan.estimated_budget_breakdown && (
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t("breakdown")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: t("flight"), key: "flight" },
                            { label: t("hotel"), key: "hotel" },
                            { label: t("foodItem"), key: "food" },
                            { label: t("activities"), key: "activities" },
                            { label: l.localTransport, key: "local_transport" },
                            { label: l.shopping, key: "shopping_misc" },
                            { label: l.insurance, key: "travel_insurance" },
                        ].map(({ label, key }) => {
                            const item = (plan.estimated_budget_breakdown as any)[key];
                            if (!item) return null;
                            const explanation = getBudgetExplanation(item);
                            const tip = getBudgetTip(item);
                            return (
                                <div key={key} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">{label}</span>
                                        <span className="font-extrabold text-primary text-sm">{getBudgetValue(item)}</span>
                                    </div>
                                    {explanation && <p className="text-xs text-neutral-400 leading-relaxed mb-1">{explanation}</p>}
                                    {tip && <p className="text-xs text-blue-400 font-semibold">💡 {tip}</p>}
                                </div>
                            );
                        })}
                    </div>

                    {plan.estimated_budget_breakdown.total_estimated_cost && (
                        <div className="mt-6 p-5 rounded-2xl bg-primary/10 border-2 border-primary/20">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-extrabold text-lg">{l.total}</span>
                                <span className="font-extrabold text-primary text-xl">
                                    {getTotalCost(plan.estimated_budget_breakdown.total_estimated_cost)}
                                </span>
                            </div>
                            {typeof plan.estimated_budget_breakdown.total_estimated_cost !== "string" && (
                                <div className="space-y-1">
                                    <p className="text-xs text-neutral-500">
                                        {plan.estimated_budget_breakdown.total_estimated_cost.explanation}
                                    </p>
                                    <div className="flex gap-4 mt-1">
                                        <p className="text-xs font-bold text-neutral-400">
                                            👤 {l.perPerson}: {plan.estimated_budget_breakdown.total_estimated_cost.per_person}
                                        </p>
                                        <p className="text-xs font-bold text-neutral-400">
                                            📅 {l.dailyAvg}: {plan.estimated_budget_breakdown.total_estimated_cost.daily_average}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ── Accommodations ── */}
            {plan.accommodations && plan.accommodations.length > 0 && (
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        🏨 {l.accommodations}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plan.accommodations.map((acc, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-extrabold text-base">{acc.name}</p>
                                        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mt-0.5">
                                            {acc.type} · {acc.location}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-extrabold text-primary">{acc.price_per_night}/{l.perNight}</p>
                                        <p className="text-xs text-neutral-400">{acc.total_cost}</p>
                                    </div>
                                </div>
                                {acc.highlights?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {acc.highlights.map((h, j) => (
                                            <span key={j} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">{h}</span>
                                        ))}
                                    </div>
                                )}
                                {acc.booking_tip && (
                                    <p className="text-xs text-blue-400 font-semibold">💡 {acc.booking_tip}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Daily Itinerary ── */}
            {plan.daily_itinerary && plan.daily_itinerary.length > 0 && (
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        📅 {l.dailyItinerary}
                    </h3>
                    <div className="space-y-4">
                        {plan.daily_itinerary.map((day, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-extrabold text-base">{i + 1}. {day.title}</h4>
                                    <span className="font-extrabold text-primary text-sm">{day.estimated_daily_cost}</span>
                                </div>
                                <div className="space-y-2 text-sm text-neutral-500">
                                    {day.morning && <p><span className="font-bold text-yellow-500 inline-flex items-center gap-1"><Sun size={14} /> {l.morning}:</span> {day.morning}</p>}
                                    {day.afternoon && <p><span className="font-bold text-orange-500 inline-flex items-center gap-1"><CloudSun size={14} /> {l.afternoon}:</span> {day.afternoon}</p>}
                                    {day.evening && <p><span className="font-bold text-indigo-500 inline-flex items-center gap-1"><Moon size={14} /> {l.evening}:</span> {day.evening}</p>}
                                    {day.meals && <p><span className="font-bold text-green-500 inline-flex items-center gap-1"><UtensilsCrossed size={14} /> {l.meals}:</span> {day.meals}</p>}
                                    {day.transport && <p><span className="font-bold text-blue-500 inline-flex items-center gap-1"><Train size={14} /> {l.transport}:</span> {day.transport}</p>}
                                    {day.daily_cost_breakdown && (
                                        <p className="text-xs text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-1">
                                            <BarChart3 size={14} /> {day.daily_cost_breakdown}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Attractions + Food ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {attractions.length > 0 && (
                    <div className="glass p-8 rounded-3xl min-h-[400px] flex flex-col shadow-xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">📍</span>
                            {t("attractions")}
                        </h3>
                        <ul className="space-y-4">
                            {attractions.map((item, i) => {
                                const isObj = typeof item !== "string";
                                return (
                                    <li key={i} className="flex gap-3 items-start group">
                                        {isObj && (item as any).image_url ? (
                                            <img src={(item as any).image_url} alt={item.name} className="flex-shrink-0 w-14 h-14 rounded-xl object-cover" />
                                        ) : (
                                            <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 group-hover:bg-accent group-hover:text-white flex items-center justify-center text-[10px] font-black transition-all">
                                                {i + 1}
                                            </span>
                                        )}
                                        <div>
                                            <p className="font-bold text-sm">{isObj ? item.name : item}</p>
                                            {isObj && item.description && (
                                                <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>
                                            )}
                                            {isObj && (
                                                <div className="flex gap-3 mt-1 text-xs text-neutral-400">
                                                    {item.entry_fee && <span>🎟 {l.entryFee}: {item.entry_fee}</span>}
                                                    {item.duration && <span>⏱ {l.duration}: {item.duration}</span>}
                                                </div>
                                            )}
                                            {isObj && item.cost_saving_tip && (
                                                <p className="text-xs text-blue-400 mt-1">💡 {item.cost_saving_tip}</p>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {foodRecs.length > 0 && (
                    <div className="glass p-8 rounded-3xl min-h-[400px] flex flex-col shadow-xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">🍽</span>
                            {t("foodRecs")}
                        </h3>
                        <ul className="space-y-4">
                            {foodRecs.map((item, i) => {
                                const isObj = typeof item !== "string";
                                return (
                                    <li key={i} className="flex gap-3 items-start">
                                        {(item as any).image_url ? (
                                            <img src={(item as any).image_url} alt={isObj ? item.restaurant : String(item)} className="flex-shrink-0 w-14 h-14 rounded-xl object-cover" />
                                        ) : (
                                            <span className="text-xl flex-shrink-0">🍱</span>
                                        )}
                                        <div>
                                            <p className="font-bold text-sm">{isObj ? item.restaurant : item}</p>
                                            {isObj && item.cuisine && (
                                                <p className="text-xs text-neutral-400">{item.cuisine} · {item.location}</p>
                                            )}
                                            {isObj && item.must_try?.length > 0 && (
                                                <p className="text-xs text-neutral-400 mt-0.5">
                                                    {l.mustTry}: {item.must_try.join(", ")}
                                                </p>
                                            )}
                                            {isObj && item.price_range && (
                                                <p className="text-xs font-bold text-primary mt-0.5">{item.price_range}</p>
                                            )}
                                            {isObj && item.why_recommended && (
                                                <p className="text-xs text-blue-400 mt-0.5">💡 {item.why_recommended}</p>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            {/* ── Travel Tips ── */}
            {tips.length > 0 && (
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t("tips")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tips.map((tip, i) => {
                            const isObj = typeof tip !== "string";
                            return (
                                <div key={i} className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-sm shadow-sm">
                                    {isObj && tip.category && (
                                        <span className="block text-xs uppercase tracking-widest text-primary mb-2 font-black">
                                            {tip.category}
                                        </span>
                                    )}
                                    <p className="text-neutral-500 leading-relaxed font-medium">
                                        {isObj ? tip.tip : tip}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Money Saving Tips ── */}
            {plan.money_saving_tips && plan.money_saving_tips.length > 0 && (
                <div className="glass p-8 rounded-3xl border-l-4 border-green-400">
                    <h3 className="text-xl font-bold mb-6 text-green-500">💰 {l.moneySaving}</h3>
                    <ul className="space-y-3">
                        {plan.money_saving_tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 text-sm text-neutral-500 font-medium">
                                <span className="text-green-400 font-black flex-shrink-0">✓</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}