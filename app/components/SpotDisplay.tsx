"use client";

import { useLanguage } from "../context/LanguageContext";

interface Spot {
    name: string;
    location: string;
    description: string;
    why_matches: string;
    activities: string;
    image_url?: string | null;
}

interface SpotDiscoveryData {
    country: string;
    interest_type: string;
    country_overview: string;
    spots: Spot[];
}

export default function SpotDisplay({ data }: { data: SpotDiscoveryData }) {
    const { language } = useLanguage();

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* Country Header */}
            <div className="glass p-10 rounded-[3rem] border-l-8 border-accent relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                    <span className="text-9xl">🌍</span>
                </div>
                <div className="relative z-10 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                        {data.country}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="px-4 py-1.5 bg-accent/10 text-accent text-xs font-black uppercase tracking-widest rounded-full">
                            {data.interest_type}
                        </span>
                    </div>
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed max-w-3xl">
                        {data.country_overview}
                    </p>
                </div>
            </div>

            {/* Spots List */}
            <div className="grid grid-cols-1 gap-8">
                {data.spots.map((spot, i) => (
                    <div
                        key={i}
                        className="glass group hover:bg-white/40 dark:hover:bg-black/40 transition-all duration-500 p-8 md:p-12 rounded-[3.5rem] border-white/10 relative overflow-hidden"
                    >
                        {spot.image_url && (
                            <div className="absolute top-0 left-0 right-0 h-40 md:h-52 opacity-30 group-hover:opacity-50 transition-opacity">
                                <img src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="absolute top-0 right-0 p-8 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
                            {i + 1}
                        </div>

                        <div className={`relative z-10 space-y-6 ${spot.image_url ? "pt-36 md:pt-44" : ""}`}>
                            <div className="space-y-2">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-accent transition-colors">
                                    {spot.name}
                                </h3>
                                <div className="flex items-center gap-2 text-neutral-400 font-bold">
                                    <span className="text-accent text-xl">📍</span>
                                    <span>{spot.location}</span>
                                </div>
                            </div>

                            <p className="text-neutral-600 dark:text-neutral-300 text-lg md:text-xl font-medium leading-relaxed">
                                {spot.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10 space-y-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">
                                        {language === "az" ? "Niyə sizə uyğundur?" : language === "ru" ? "Почему вам подходит?" : "Why matches you?"}
                                    </h4>
                                    <p className="text-sm font-bold opacity-80">💡 {spot.why_matches}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">
                                        {language === "az" ? "Nə etmək olar?" : language === "ru" ? "Что можно сделать?" : "What to do?"}
                                    </h4>
                                    <p className="text-sm font-bold opacity-80">✨ {spot.activities}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
