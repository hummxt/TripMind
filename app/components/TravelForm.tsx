"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import PlaceSearchInput from "./PlaceSearchInput";

export default function TravelForm({ onGenerate }: { onGenerate: (data: any) => void }) {
    const { language: currentLang, t } = useLanguage();
    const { profile } = useProfile();
    const [formData, setFormData] = useState({
        language: currentLang,
        package: "bronze",
        budget: "",
        dates: "",
        nationality: "",
        location: "",
        interests: "",
        profession: "",
        food: "",
        special: "",
    });

    useEffect(() => {
        if (profile.homeLocation) setFormData((f) => ({ ...f, location: profile.homeLocation }));
        if (profile.defaultBudget) setFormData((f) => ({ ...f, budget: profile.defaultBudget }));
    }, [profile.homeLocation, profile.defaultBudget]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({ ...formData, language: currentLang });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl glass p-8 rounded-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language & Package Selection */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                        {t("planSettings")}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-bold text-primary flex items-center justify-center">
                            {currentLang.toUpperCase()}
                        </div>
                        <select
                            name="package"
                            value={formData.package}
                            onChange={handleChange}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                        >
                            <option value="bronze">Bronze Plan</option>
                            <option value="gold">Gold Plan</option>
                            <option value="diamond">Diamond Plan</option>
                        </select>
                    </div>
                </div>

                {/* Budget & Dates */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                        {t("travelBasics")}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="budget"
                            placeholder={t("budget")}
                            value={formData.budget}
                            onChange={handleChange}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                            required
                        />
                        <input
                            type="text"
                            name="dates"
                            placeholder={t("dates")}
                            value={formData.dates}
                            onChange={handleChange}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Nationality & Location */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                        {t("personalDetails")}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <PlaceSearchInput
                            value={formData.nationality}
                            onChange={(v) => setFormData((f) => ({ ...f, nationality: v }))}
                            placeholder={t("nationality")}
                            type="countries"
                            required
                            inputClassName="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                        />
                        <PlaceSearchInput
                            value={formData.location}
                            onChange={(v) => setFormData((f) => ({ ...f, location: v }))}
                            placeholder={t("location")}
                            type="places"
                            required
                            inputClassName="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Profession & Food */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                        {t("preferences")}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="profession"
                            placeholder={t("profession")}
                            value={formData.profession}
                            onChange={handleChange}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                        />
                        <input
                            type="text"
                            name="food"
                            placeholder={t("food")}
                            value={formData.food}
                            onChange={handleChange}
                            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    {t("goals")}
                </label>
                <input
                    type="text"
                    name="interests"
                    placeholder={t("interests")}
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                    required
                />
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                    {t("special")}
                </label>
                <textarea
                    name="special"
                    rows={3}
                    placeholder="..."
                    value={formData.special}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm"
                />
            </div>

            <div className="flex justify-center pt-4">
                <button type="submit" className="btn-premium w-full md:w-auto px-12 py-4 text-lg">
                    {t("generateBtn")}
                </button>
            </div>
        </form>
    );
}
