"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlaceSearchInput from "../components/PlaceSearchInput";
import Input from "../components/ui/Input";
import {
  MapPin,
  Wallet,
  UtensilsCrossed,
  Globe,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  Languages,
  X,
  Beef,
  Leaf,
  Fish,
  Cake,
  Flame,
  Home,
  Moon,
  Wheat,
  Milk,
  AlertTriangle,
  Mountain,
  Landmark,
  TreePine,
  Palette,
  Music,
  Gem,
} from "lucide-react";

const AVAILABLE_LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Turkish",
  "Hindi", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish",
  "Polish", "Czech", "Greek", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Swahili", "Azerbaijani", "Georgian", "Romanian", "Hungarian",
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

const TASTE_OPTIONS = [
  { id: "meat", label: "Meat", Icon: Beef },
  { id: "vegetarian", label: "Vegetarian", Icon: Leaf },
  { id: "vegan", label: "Vegan", Icon: Leaf },
  { id: "seafood", label: "Seafood", Icon: Fish },
  { id: "sweet", label: "Sweet", Icon: Cake },
  { id: "spicy", label: "Spicy", Icon: Flame },
  { id: "street", label: "Street food", Icon: UtensilsCrossed },
  { id: "traditional", label: "Traditional", Icon: Home },
];

const SPECIAL_OPTIONS = [
  { id: "halal", label: "Halal", Icon: Moon },
  { id: "gluten", label: "Gluten-free", Icon: Wheat },
  { id: "lactose", label: "Lactose-free", Icon: Milk },
  { id: "allergy", label: "Allergy", Icon: AlertTriangle },
];

const INTEREST_OPTIONS = [
  { id: "adventure", label: "Adventure", Icon: Mountain },
  { id: "history", label: "History", Icon: Landmark },
  { id: "nature", label: "Nature", Icon: TreePine },
  { id: "gastronomy", label: "Gastronomy", Icon: UtensilsCrossed },
  { id: "art", label: "Art", Icon: Palette },
  { id: "music", label: "Music", Icon: Music },
  { id: "luxury", label: "Luxury", Icon: Gem },
];

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const { profile, updateProfile } = useProfile();
  const [newPlace, setNewPlace] = useState("");
  const [placeType, setPlaceType] = useState<"visited" | "wishlist">("wishlist");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [langSearch, setLangSearch] = useState("");

  const toggleTaste = (id: string) => {
    const next = profile.tastes.includes(id)
      ? profile.tastes.filter((x) => x !== id)
      : [...profile.tastes, id];
    updateProfile({ tastes: next });
  };

  const toggleSpecial = (id: string) => {
    const next = profile.special.includes(id)
      ? profile.special.filter((x) => x !== id)
      : [...profile.special, id];
    updateProfile({ special: next });
  };

  const toggleInterest = (id: string) => {
    const next = profile.interests.includes(id)
      ? profile.interests.filter((x) => x !== id)
      : [...profile.interests, id];
    updateProfile({ interests: next });
  };

  const addPlace = () => {
    if (!newPlace.trim()) return;
    if (placeType === "visited") {
      updateProfile({ visited: [...profile.visited, newPlace.trim()] });
    } else {
      updateProfile({ wishlist: [...profile.wishlist, newPlace.trim()] });
    }
    setNewPlace("");
  };

  const removePlace = (type: "visited" | "wishlist", name: string) => {
    if (type === "visited") {
      updateProfile({ visited: profile.visited.filter((p) => p !== name) });
    } else {
      updateProfile({ wishlist: profile.wishlist.filter((p) => p !== name) });
    }
  };

  const addLanguage = (lang: string) => {
    if (!profile.languages.find((l) => l.language === lang)) {
      updateProfile({ languages: [...profile.languages, { language: lang, level: "A2" }] });
    }
    setShowLangDropdown(false);
    setLangSearch("");
  };

  const removeLanguage = (index: number) => {
    const next = profile.languages.filter((_, i) => i !== index);
    updateProfile({ languages: next.length ? next : [{ language: "English", level: "B1" }] });
  };

  const updateLevel = (index: number, level: string) => {
    const next = profile.languages.map((l, i) =>
      i === index ? { ...l, level } : l
    );
    updateProfile({ languages: next });
  };

  const filteredLangs = AVAILABLE_LANGUAGES.filter(
    (l) =>
      l.toLowerCase().includes(langSearch.toLowerCase()) &&
      !profile.languages.find((kl) => kl.language === l)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              {language === "en"
                ? "Profile"
                : language === "az"
                ? "Profil"
                : "Профиль"}
            </h1>
            <p className="text-xl text-neutral-500 font-bold max-w-2xl mx-auto">
              {language === "en"
                ? "Save your preferences so you don't have to enter them every time."
                : language === "az"
                ? "Seçimlərinizi saxlayın ki, hər dəfə daxil etməyəsiniz."
                : "Сохраните предпочтения, чтобы не вводить их каждый раз."}
            </p>
          </div>

          <div className="space-y-8">
            {/* Home Location */}
            <section className="glass rounded-section p-8 md:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "Home Location"
                      : language === "az"
                      ? "Ev ünvanı"
                      : "Домашний адрес"}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {language === "en"
                      ? "Used to pre-fill forms (e.g. From, departure city)"
                      : language === "az"
                      ? "Formaları avtomatik doldurmaq üçün"
                      : "Для автозаполнения форм"}
                  </p>
                </div>
              </div>
              <PlaceSearchInput
                value={profile.homeLocation}
                onChange={(v) => updateProfile({ homeLocation: v })}
                placeholder={t("foodCountryPlaceholder")}
                type="places"
                inputClassName="w-full bg-white/5 border border-white/10 rounded-card px-6 py-5 pr-6 outline-none focus:ring-2 focus:ring-primary/50 font-bold text-lg"
              />
            </section>

            {/* Default Budget */}
            <section className="glass rounded-section p-8 md:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Wallet size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "Default Budget (USD)"
                      : language === "az"
                      ? "Standart büdcə (USD)"
                      : "Бюджет по умолчанию (USD)"}
                  </h2>
                </div>
              </div>
              <Input
                type="text"
                placeholder="e.g. 2000"
                value={profile.defaultBudget}
                onChange={(e) =>
                  updateProfile({ defaultBudget: e.target.value })}
              />
            </section>

            {/* Languages */}
            <section className="glass rounded-section p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Languages size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "Languages You Know"
                      : language === "az"
                      ? "Bildiyin dillər"
                      : "Языки, которые вы знаете"}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {language === "en"
                      ? "Used in Trip Architect for language barrier warnings"
                      : language === "az"
                      ? "Trip Architect-də dil bariyerləri üçün istifadə olunur"
                      : "Используется в Trip Architect для предупреждений о языке"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {profile.languages.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-card border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className="flex-1 font-bold text-sm">{entry.language}</div>
                    <div className="flex items-center gap-1">
                      {LEVELS.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => updateLevel(index, lvl)}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            entry.level === lvl
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="w-full py-4 rounded-card border border-dashed border-white/10 hover:border-primary/30 text-white/30 hover:text-primary text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Plus size={16} />
                  {language === "en" ? "Add a language" : language === "az" ? "Dil əlavə et" : "Добавить язык"}
                </button>
                {showLangDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 glass rounded-card p-3 max-h-60 overflow-y-auto shadow-2xl border border-white/10">
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
                        className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.04] text-white/60 hover:text-white transition-all"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Food Preferences */}
            <section className="glass rounded-section p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "Food Preferences"
                      : language === "az"
                      ? "Yemək seçimləri"
                      : "Предпочтения по еде"}
                  </h2>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-500 mb-2">
                  {t("foodTasteLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TASTE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleTaste(opt.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        profile.tastes.includes(opt.id)
                          ? "bg-primary text-white"
                          : "bg-white/5 border border-white/10 hover:border-primary/30"
                      }`}
                    >
                      <opt.Icon size={18} className="opacity-90" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-500 mb-2">
                  {t("foodSpecialLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SPECIAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleSpecial(opt.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        profile.special.includes(opt.id)
                          ? "bg-primary text-white"
                          : "bg-white/5 border border-white/10 hover:border-primary/30"
                      }`}
                    >
                      <opt.Icon size={18} className="opacity-90" />
                      {opt.label}
                    </button>
                  ))}
                </div>
                {profile.special.includes("allergy") && (
                  <input
                    type="text"
                    placeholder={
                      language === "en"
                        ? "Allergy details..."
                        : "Allergiya təfərrüatları..."
                    }
                    value={profile.allergyDetails}
                    onChange={(e) =>
                      updateProfile({ allergyDetails: e.target.value })}
                    className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-primary/50"
                  />
                )}
              </div>
            </section>

            {/* Travel Interests */}
            <section className="glass rounded-section p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Globe size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "Travel Interests"
                      : language === "az"
                      ? "Səyahət maraqları"
                      : "Интересы в путешествиях"}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      profile.interests.includes(opt.id)
                        ? "bg-secondary text-white"
                        : "bg-white/5 border border-white/10 hover:border-secondary/30"
                    }`}
                  >
                    <opt.Icon size={18} className="opacity-90" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Visited & Wishlist */}
            <section className="glass rounded-section p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">
                    {language === "en"
                      ? "My Places"
                      : language === "az"
                      ? "Məkanlarım"
                      : "Мои места"}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {t("visitedCount")} / {t("wishlistCount")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPlaceType("visited")}
                  className={`px-4 py-2 rounded-lg text-xs font-black ${
                    placeType === "visited"
                      ? "bg-green-500 text-white"
                      : "bg-white/5 text-neutral-400"
                  }`}
                >
                  {t("visitedCount")}
                </button>
                <button
                  type="button"
                  onClick={() => setPlaceType("wishlist")}
                  className={`px-4 py-2 rounded-lg text-xs font-black ${
                    placeType === "wishlist"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-neutral-400"
                  }`}
                >
                  {t("wishlistCount")}
                </button>
              </div>

              <div className="flex gap-3 w-full">
                <div className="flex-1 min-w-0">
                  <PlaceSearchInput
                    value={newPlace}
                    onChange={(v) => setNewPlace(v)}
                    placeholder={
                      placeType === "visited"
                        ? "Add visited place..."
                        : "Add to wishlist..."
                    }
                    type="places"
                    inputClassName="w-full bg-white/5 border border-white/10 rounded-card px-6 py-5 pr-6 outline-none focus:ring-2 focus:ring-primary/50 font-bold text-lg"
                  />
                </div>
                <button
                  type="button"
                  onClick={addPlace}
                  className="shrink-0 self-stretch px-6 py-4 rounded-card bg-primary text-white font-black uppercase text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(placeType === "visited" ? profile.visited : profile.wishlist).map(
                  (name, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-card bg-white/5 border border-white/[0.06]"
                    >
                      <span className="font-bold">{name}</span>
                      <button
                        type="button"
                        onClick={() => removePlace(placeType, name)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                )}
                {(placeType === "visited"
                  ? profile.visited
                  : profile.wishlist
                ).length === 0 && (
                  <p className="text-neutral-500 text-sm py-4 text-center">
                    No places yet. Search and add above.
                  </p>
                )}
              </div>
            </section>

            <p className="flex items-center gap-2 text-green-500/80 text-sm font-bold">
              <CheckCircle2 size={18} />
              {language === "en"
                ? "Preferences are saved automatically"
                : language === "az"
                ? "Seçimlər avtomatik saxlanılır"
                : "Предпочтения сохраняются автоматически"}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
