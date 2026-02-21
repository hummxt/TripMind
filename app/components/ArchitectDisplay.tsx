"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Sparkles, Wallet, CheckCircle2, AlertTriangle, Shield, ChevronDown, ChevronUp, ImageIcon, FileCheck, AlertOctagon } from "lucide-react";

interface LanguageAnalysis {
    country_languages: string[];
    user_match: boolean;
    matched_language: string | null;
    warning: string;
    tips: string[];
}

interface ArchitectData {
    recommended_country: string;
    country_code?: string;
    attractions_activities: string[];
    language_analysis?: LanguageAnalysis;
    english_level_recommendation?: string;
    budget_advice: string;
    reasoning: string;
    visa_info?: string;
    safety_concerns?: string[];
    image_url?: string | null;
    gallery_images?: (string | null)[];
    gallery_captions?: string[];
}

const FAQ_ITEMS = [
    {
        q_en: "How was this country recommended for me?",
        q_az: "Bu ölkə mənə necə tövsiyə olundu?",
        q_ru: "Как эта страна была рекомендована для меня?",
        a_en: "Our AI analyzes your budget, selected continent(s), and language skills to find the best matching destination.",
        a_az: "AI büdcənizi, seçdiyiniz qitə(lər) və dil bacarıqlarınızı təhlil edərək ən uyğun məkanı tapır.",
        a_ru: "Наш ИИ анализирует ваш бюджет, выбранные континенты и знание языков, чтобы найти лучшее направление.",
    },
    {
        q_en: "Is the budget estimate accurate?",
        q_az: "Büdcə təxmini dəqiqdir?",
        q_ru: "Точна ли оценка бюджета?",
        a_en: "The budget advice is an AI-generated estimate. Actual costs vary by season, exchange rates, and personal choices.",
        a_az: "Büdcə məsləhəti AI tərəfindən yaradılmış təxminidir. Real xərclər mövsümdən, valyuta məzənnəsindən və şəxsi seçimlərdən asılıdır.",
        a_ru: "Совет по бюджету — это оценка, сгенерированная ИИ. Фактические расходы зависят от сезона, курса валют и личных предпочтений.",
    },
    {
        q_en: "What if I don't speak the local language?",
        q_az: "Yerli dilə bilsəm nə olar?",
        q_ru: "Что делать, если я не говорю на местном языке?",
        a_en: "The language analysis shows if there's a match. If not, we provide practical tips for getting by.",
        a_az: "Dil analizi uyğunluq göstərir. Əgər uyğunluq yoxdursa, əsas məsləhətlər veririk.",
        a_ru: "Анализ языка показывает, есть ли совпадение. Если нет, мы даём практические советы.",
    },
    {
        q_en: "Can I get recommendations for multiple continents?",
        q_az: "Bir neçə qitə üçün tövsiyə ala bilərəmmi?",
        q_ru: "Могу ли я получить рекомендации для нескольких континентов?",
        a_en: "Yes! Select multiple continents or 'Whole World' in Step 2 for global recommendations.",
        a_az: "Bəli! Addım 2-də bir neçə qitə və ya 'Bütün dünya' seçə bilərsiniz.",
        a_ru: "Да! Выберите несколько континентов или «Весь мир» на шаге 2.",
    },
];

function FAQItem({ item, language }: { item: typeof FAQ_ITEMS[0]; language: string }) {
    const [open, setOpen] = useState(false);
    const qKey = `q_${language}` as "q_en" | "q_az" | "q_ru";
    const aKey = `a_${language}` as "a_en" | "a_az" | "a_ru";
    const question = (item as Record<string, string>)[qKey] || item.q_en;
    const answer = (item as Record<string, string>)[aKey] || item.a_en;
    return (
        <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
                <span className="font-bold text-sm md:text-base pr-4">{question}</span>
                {open ? <ChevronUp size={20} className="shrink-0 text-white/40" /> : <ChevronDown size={20} className="shrink-0 text-white/40" />}
            </button>
            {open && (
                <div className="px-5 pb-5 text-white/50 text-sm font-medium leading-relaxed border-t border-white/[0.06] pt-3 text-start">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function ArchitectDisplay({ data }: { data: ArchitectData }) {
    const { language } = useLanguage();

    const langAnalysis = data.language_analysis;
    const hasLangWarning = langAnalysis && !langAnalysis.user_match;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 animate-slide-up">

            {/* 1. Hero — Recommended Country */}
            <div className="card-surface p-10 md:p-16 text-start space-y-6 relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--primary)" }} />

                <div className="space-y-4">
                    <div className="tag text-primary/80 border-primary/20 bg-primary/5 w-fit">
                        <Sparkles size={12} />
                        {language === 'az' ? 'Tövsiyə olunan ölkə' : language === 'ru' ? 'Рекомендуемая страна' : 'Recommended Country'}
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-[-0.03em] gradient-text flex items-center gap-6 flex-wrap">
                        {data.recommended_country}
                        {data.country_code && (
                            <img
                                src={`https://flagcdn.com/w80/${data.country_code.toLowerCase()}.png`}
                                alt=""
                                className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-card border border-white/10 shadow-lg"
                            />
                        )}
                    </h2>
                    <p className="text-lg md:text-xl text-white/40 font-medium max-w-2xl leading-relaxed">
                        {data.reasoning}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 2. Attractions & Activities */}
                <div className="card-surface p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                            <MapPin size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">
                            {language === 'az' ? 'Atraksiyalar' : language === 'ru' ? 'Достопримечательности' : 'Attractions & Activities'}
                        </h3>
                    </div>

                    <ul className="space-y-3">
                        {data.attractions_activities.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start group">
                                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-primary/40 group-hover:text-primary transition-colors" />
                                <span className="text-sm font-medium text-white/60 leading-relaxed">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Language Analysis */}
                <div className={`card-surface p-8 md:p-10 space-y-6 ${hasLangWarning ? 'border-amber-500/20' : 'border-emerald-500/20'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${hasLangWarning
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}>
                            {hasLangWarning ? <AlertTriangle size={20} /> : <Shield size={20} />}
                        </div>
                        <h3 className="text-xl font-black tracking-tight">
                            {language === 'az' ? 'Dil Analizi' : language === 'ru' ? 'Языковой анализ' : 'Language Analysis'}
                        </h3>
                    </div>

                    {langAnalysis ? (
                        <div className="space-y-4">
                            {/* Country languages */}
                            <div className="flex flex-wrap gap-2">
                                {langAnalysis.country_languages.map((lang, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/[0.06] bg-white/[0.02]">
                                        {lang}
                                    </span>
                                ))}
                            </div>

                            {/* Warning or positive note */}
                            <div className={`p-5 rounded-2xl border ${hasLangWarning
                                    ? 'border-amber-500/20 bg-amber-500/5'
                                    : 'border-emerald-500/20 bg-emerald-500/5'
                                }`}>
                                <p className={`text-sm font-bold leading-relaxed ${hasLangWarning ? 'text-amber-400' : 'text-emerald-400'
                                    }`}>
                                    {langAnalysis.warning}
                                </p>
                            </div>

                            {/* Tips */}
                            {langAnalysis.tips && langAnalysis.tips.length > 0 && (
                                <ul className="space-y-2">
                                    {langAnalysis.tips.map((tip, i) => (
                                        <li key={i} className="flex gap-2 items-start text-xs text-white/40 font-medium">
                                            <span className="text-primary mt-0.5">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : data.english_level_recommendation ? (
                        <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                            <p className="text-sm font-medium text-white/50 leading-relaxed">
                                {data.english_level_recommendation}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* 4. Visa & Safety */}
            {(data.visa_info || (data.safety_concerns?.length ?? 0) > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.visa_info && (
                        <div className="card-surface p-8 md:p-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <FileCheck size={20} />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">
                                    {language === "en" ? "Visa Support" : language === "az" ? "Viza Məlumatı" : "Визовая информация"}
                                </h3>
                            </div>
                            <p className="text-base text-white/50 font-medium leading-relaxed">
                                {data.visa_info}
                            </p>
                        </div>
                    )}
                    {data.safety_concerns && data.safety_concerns.length > 0 && (
                        <div className="card-surface p-8 md:p-10 space-y-6 border-amber-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                    <AlertOctagon size={20} />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">
                                    {language === "en" ? "Safety Awareness" : language === "az" ? "Təhlükəsizlik Xəbərdarlığı" : "Безопасность"}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {data.safety_concerns.map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <AlertTriangle size={14} className="mt-1 flex-shrink-0 text-amber-400" />
                                        <span className="text-sm font-medium text-white/60 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* 5. Budget Advice — Full width */}
            <div className="card-surface p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Wallet size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black tracking-tight">
                            {language === 'az' ? 'Büdcə Analizi' : language === 'ru' ? 'Анализ бюджета' : 'Budget Analysis'}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
                            {language === "en" ? "Financial Insights" : language === "az" ? "Maliyyə Məsləhətləri" : "Финансовые рекомендации"}
                        </p>
                    </div>
                </div>

                <div className="text-base text-white/50 font-medium leading-relaxed">
                    {data.budget_advice}
                </div>
            </div>

            {/* 6. Gallery Section */}
            {(data.gallery_images?.length || data.image_url) && (
                <div className="card-surface p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                            <ImageIcon size={20} />
                        </div>
                        <h3 className="text-xl font-black tracking-tight">
                            {language === "en" ? "Gallery" : language === "az" ? "Qalereya" : "Галерея"}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-start">
                        {(data.gallery_images?.filter(Boolean) || (data.image_url ? [data.image_url] : [])).map((url, i) => (
                            <div key={i} className="space-y-2">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.06]">
                                    <img src={url!} alt={data.gallery_captions?.[i] || `${data.recommended_country} ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                                {data.gallery_captions?.[i] && (
                                    <p className="text-xs font-semibold text-white/50 line-clamp-2">{data.gallery_captions[i]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 7. FAQ Section */}
            <div className="card-surface p-8 md:p-10 space-y-6">
                <h3 className="text-xl font-black tracking-tight">
                    {language === "en" ? "Frequently Asked Questions" : language === "az" ? "Tez-tez verilən suallar" : "Часто задаваемые вопросы"}
                </h3>
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem key={i} item={item} language={language} />
                    ))}
                </div>
            </div>

        </div>
    );
}
