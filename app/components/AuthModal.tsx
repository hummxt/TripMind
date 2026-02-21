"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const success = await login(email, password);
                if (success) onClose();
                else alert("Login failed. Please check your credentials.");
            } else {
                if (password !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }
                const success = await register({ email, name, surname, nickname, password });
                if (success) onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative w-full max-w-xl glass p-10 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black tracking-tighter gradient-text mb-3">
                        {isLogin ? t("login") : t("register")}
                    </h2>
                    <p className="text-neutral-500 text-sm font-bold">
                        {isLogin ? "Welcome back to TripMind" : "Join the modern travel community"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("firstName")}</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("lastName")}</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("nickname")}</label>
                            <input
                                type="text"
                                placeholder="traveler_x"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("email")}</label>
                        <input
                            type="email"
                            placeholder="name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("password")}</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                required
                            />
                        </div>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">{t("confirmPassword")}</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-premium w-full py-5 text-sm uppercase font-black tracking-widest mt-4 shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? "Gözləyin..." : isLogin ? t("login") : t("register")}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-bold text-neutral-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        {isLogin ? t("noAccount") : t("haveAccount")}
                        <span className="font-black text-primary underline decoration-2 underline-offset-4">
                            {isLogin ? t("register") : t("login")}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
