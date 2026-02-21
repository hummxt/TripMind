"use client";

import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import PlaceSearchInput from "./PlaceSearchInput";
import {
    Plane, Car, Bus, TrainFrontTunnel,
    Users, CalendarDays, SunSnow, Tickets,
    Gem, Wallet, HandCoins,
    MapPin, UtensilsCrossed, ClipboardList, ArrowRight, Coffee
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-foreground placeholder:text-white/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all";
const selectCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer";

/* ── Reusable field wrapper ── */
const Field = ({
    label, icon: Icon, children
}: { label: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
            <Icon size={13} />
            {label}
        </label>
        {children}
    </div>
);

/* ── Toggle Button Group ── */
const ToggleGroup = ({
    items, value, onChange,
}: {
    items: { id: string; label: string; Icon: React.ElementType }[];
    value: string;
    onChange: (id: string) => void;
}) => (
    <div className={`grid gap-2.5 ${items.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {items.map(({ id, label, Icon }) => {
            const active = value === id;
            return (
                <button
                    key={id}
                    type="button"
                    onClick={() => onChange(id)}
                    className={`flex flex-col items-center gap-1.5 py-3.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200
                        ${active
                            ? "bg-primary border-primary text-[var(--color-white)] shadow-md"
                            : "bg-white/5 border-white/10 text-white/50 hover:border-primary/30 hover:text-primary"
                        }`}
                >
                    <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                    <span className="text-[10px] uppercase tracking-wide">{label}</span>
                </button>
            );
        })}
    </div>
);

export default function GastroGuideForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { t } = useLanguage();
    const { profile } = useProfile();
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        travelMode: "plane",
        accommodationType: "standard",
        travelers: "1",
        duration: "7",
        travelClass: "economy",
        budgetPreference: "medium",
        season: "any",
        interests: [] as string[],
        foodPreference: "mix",
        mealsPerDay: "3",
        specialRequests: "",
        travelDate: new Date().toISOString().split('T')[0],
    });

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (profile.homeLocation) setFormData((f) => ({ ...f, from: profile.homeLocation }));
    }, [profile.homeLocation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(formData);
    };

    const toggleInterest = (id: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id]
        }));
    };

    const travelModes = [
        { id: "plane", label: t("plane"), Icon: Plane },
        { id: "car", label: t("car"), Icon: Car },
        { id: "bus", label: t("bus"), Icon: Bus },
        { id: "train", label: t("train"), Icon: TrainFrontTunnel },
    ];

    const accTypes = [
        { id: "luxury", label: t("luxury"), Icon: Gem },
        { id: "standard", label: t("standard"), Icon: Wallet },
        { id: "eco", label: t("eco"), Icon: HandCoins },
    ];

    const budgetPrefs = [
        { id: "low", label: t("low"), Icon: HandCoins },
        { id: "medium", label: t("medium"), Icon: Wallet },
        { id: "high", label: t("high"), Icon: Gem },
    ];

    const interestTags = [
        { id: "adventure", label: t("interestAdventure") },
        { id: "historian", label: t("interestHistorian") },
        { id: "nature", label: t("interestNature") },
        { id: "tech", label: t("interestTech") },
        { id: "sport", label: t("interestSport") },
        { id: "music", label: t("interestMusic") },
        { id: "cinema", label: t("interestCinema") },
        { id: "creative", label: t("interestCreative") },
        { id: "traveler", label: t("interestTraveler") },
        { id: "gastronome", label: t("interestGastronome") },
    ];

    const foodTypes = [
        { id: "meat", label: t("foodMeat") },
        { id: "mix", label: t("foodMix") },
        { id: "vegetarian", label: t("foodVegetarian") },
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl card-surface rounded-3xl p-10 space-y-8"
        >
            {/* ── Route ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t("from")} icon={MapPin}>
                    <PlaceSearchInput
                        value={formData.from}
                        onChange={(v) => setFormData({ ...formData, from: v })}
                        placeholder={t("foodCountryPlaceholder")}
                        type="places"
                        required
                        inputClassName={inputCls}
                    />
                </Field>
                <Field label={t("to")} icon={MapPin}>
                    <PlaceSearchInput
                        value={formData.to}
                        onChange={(v) => setFormData({ ...formData, to: v })}
                        placeholder={t("foodCountryPlaceholder")}
                        type="places"
                        required
                        inputClassName={inputCls}
                    />
                </Field>
            </div>

            {/* ── Stats row ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                <Field label={t("travelDate")} icon={CalendarDays}>
                    <input
                        type="date"
                        min={today}
                        className={inputCls}
                        value={formData.travelDate}
                        onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                        required
                    />
                </Field>
                <Field label={t("travelersLabel")} icon={Users}>
                    <input
                        type="number" min="1"
                        className={inputCls}
                        value={formData.travelers}
                        onChange={e => setFormData({ ...formData, travelers: e.target.value })}
                        required
                    />
                </Field>
                <Field label={`${t("dates")} (${t("days")})`} icon={CalendarDays}>
                    <input
                        type="number" min="1"
                        className={inputCls}
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        required
                    />
                </Field>
                <Field label={t("season")} icon={SunSnow}>
                    <select
                        className={selectCls}
                        value={formData.season}
                        onChange={e => setFormData({ ...formData, season: e.target.value })}
                    >
                        <option value="any">{t("any")}</option>
                        <option value="spring">{t("spring")}</option>
                        <option value="summer">{t("summer")}</option>
                        <option value="autumn">{t("autumn")}</option>
                        <option value="winter">{t("winter")}</option>
                    </select>
                </Field>
                <Field label={t("travelClass")} icon={Tickets}>
                    <select
                        className={selectCls}
                        value={formData.travelClass}
                        onChange={e => setFormData({ ...formData, travelClass: e.target.value })}
                    >
                        <option value="economy">{t("economy")}</option>
                        <option value="business">{t("business")}</option>
                        <option value="firstClass">{t("firstClass")}</option>
                    </select>
                </Field>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-white/10" />

            {/* ── Travel Mode ── */}
            <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{t("travelMode")}</p>
                <ToggleGroup
                    items={travelModes}
                    value={formData.travelMode}
                    onChange={v => setFormData({ ...formData, travelMode: v })}
                />
            </div>

            {/* ── Accommodation & Budget side by side ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{t("accommodationType")}</p>
                    <ToggleGroup
                        items={accTypes}
                        value={formData.accommodationType}
                        onChange={v => setFormData({ ...formData, accommodationType: v })}
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{t("budgetPreference")}</p>
                    <ToggleGroup
                        items={budgetPrefs}
                        value={formData.budgetPreference}
                        onChange={v => setFormData({ ...formData, budgetPreference: v })}
                    />
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-white/10" />

            {/* ── Interests (multi-select tags) ── */}
            <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{t("interests")}</p>
                <div className="flex flex-wrap gap-2.5">
                    {interestTags.map(({ id, label }) => {
                        const active = formData.interests.includes(id);
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => toggleInterest(id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200
                                    ${active
                                        ? "bg-primary border-primary text-[var(--color-white)] shadow-sm"
                                        : "bg-white/5 border-white/10 text-white/50 hover:border-primary/30 hover:text-primary"
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Food Preference & Meals Per Day ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{t("food")}</p>
                    <div className="flex gap-2.5">
                        {foodTypes.map(({ id, label }) => {
                            const active = formData.foodPreference === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, foodPreference: id })}
                                    className={`flex-1 py-3 rounded-xl border text-xs font-semibold transition-all duration-200
                                        ${active
                                            ? "bg-primary border-primary text-[var(--color-white)] shadow-sm"
                                            : "bg-white/5 border-white/10 text-white/50 hover:border-primary/30 hover:text-primary"
                                        }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <Field label={t("mealsPerDay")} icon={Coffee}>
                    <select
                        className={selectCls}
                        value={formData.mealsPerDay}
                        onChange={e => setFormData({ ...formData, mealsPerDay: e.target.value })}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </Field>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-white/10" />

            {/* ── Special Requests ── */}
            <Field label={t("specialRequests")} icon={ClipboardList}>
                <textarea
                    placeholder={t("specialRequestsPlaceholder")}
                    className={`${inputCls} resize-none min-h-[90px]`}
                    value={formData.specialRequests}
                    onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                />
            </Field>

            {/* ── Submit ── */}
            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 btn-premium text-sm uppercase tracking-widest py-4 rounded-2xl"
            >
                {t("generateBtn")}
                <ArrowRight size={16} strokeWidth={2.5} />
            </button>
        </form>
    );
}