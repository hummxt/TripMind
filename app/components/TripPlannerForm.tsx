"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import { MapPin, Wallet, Calendar, Compass, Search } from "lucide-react";
import Input from "./ui/Input";
import PlaceSearchInput from "./PlaceSearchInput";

export default function TripPlannerForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { t } = useLanguage();
    const { profile } = useProfile();
    const [formData, setFormData] = useState({
        to: "",
        budget: "",
        interest: "history",
        duration: "7",
        travelDate: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (profile.defaultBudget) setFormData((f) => ({ ...f, budget: profile.defaultBudget }));
        if (profile.interests?.length && profile.interests.includes("history")) setFormData((f) => ({ ...f, interest: "history" }));
        else if (profile.interests?.length && profile.interests.includes("adventure")) setFormData((f) => ({ ...f, interest: "adventure" }));
        else if (profile.interests?.length && profile.interests.includes("luxury")) setFormData((f) => ({ ...f, interest: "luxury" }));
    }, [profile.defaultBudget, profile.interests]);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(formData);
    };

    const interests = [
        { id: "history", label: t("history"), icon: "🏛️" },
        { id: "adventure", label: t("adventure"), icon: "🌋" },
        { id: "luxury", label: t("luxury"), icon: "💎" },
    ];

    const inputCls = "w-full bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary transition-all font-medium";

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl glass p-8 sm:p-10 rounded-[2.5rem] space-y-8 animate-in zoom-in-95 duration-500 shadow-2xl">
            <div className="space-y-6">

                {/* Destination */}
                <div className="text-left space-y-2 relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-1.5">
                        <MapPin size={12} /> {t("location")}
                    </label>
                    <PlaceSearchInput
                        value={formData.to}
                        onChange={(v) => setFormData({ ...formData, to: v })}
                        placeholder={t("foodCountryPlaceholder")}
                        type="places"
                        required
                        inputClassName={inputCls}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Date */}
                    <div className="text-left space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-1.5">
                            <Calendar size={12} /> {t("travelDate")}
                        </label>
                        <Input
                            type="date"
                            min={today}
                            className={inputCls}
                            value={formData.travelDate}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            required
                        />
                    </div>

                    {/* Budget */}
                    <div className="text-left space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-1.5">
                            <Wallet size={12} /> {t("budget")}
                        </label>
                        <Input
                            type="text"
                            placeholder="e.g. $2000"
                            className={inputCls}
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            required
                        />
                    </div>

                    {/* Duration */}
                    <div className="text-left space-y-2 relative">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-1.5">
                            <Calendar size={12} /> {t("duration")} ({t("days")})
                        </label>
                        <Input
                            type="number"
                            min={1}
                            className={inputCls}
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>
                </div>

                {/* Interests */}
                <div className="text-left space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1 flex items-center gap-1.5">
                        <Compass size={12} /> {t("interests")}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {interests.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, interest: item.id })}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${formData.interest === item.id
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-white/50 dark:bg-black/20 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-primary/50"
                                    }`}
                            >
                                <span className="text-xl sm:text-2xl">{item.icon}</span>
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-tighter">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button type="submit" className="group relative w-full overflow-hidden btn-premium py-5 text-lg uppercase tracking-widest font-black rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                <Search size={20} className="group-hover:scale-110 transition-transform" />
                {t("searchBtn")}
            </button>
        </form>
    );
}
