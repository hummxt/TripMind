"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 100);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1400);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 transition-colors duration-500"
            style={{
                background: theme === 'dark' ? "#1f1f1f" : "#F7F8F0",
                animation: "fade-in 0.3s ease reverse forwards",
                animationDelay: "1.1s",
            }}
        >
            {/* Logo mark */}
            <div className="relative">
                <div
                    
                >
                    <img
                        src="/logo_png.png"
                        alt="TripMind"
                        className="w-10 h-10 object-contain"
                    />
                </div>
                {/* Rotating ring */}
                <div
                    className={`absolute -inset-4 rounded-3xl border animate-spin-slow transition-colors ${theme === 'dark' ? 'border-white/5' : 'border-black/5'
                        }`}
                    style={{
                        borderTopColor: "rgba(232,168,56,0.4)",
                    }}
                />
            </div>

            {/* Progress bar */}
            <div className={`w-48 h-[2px] rounded-full overflow-hidden transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                }`}>
                <div
                    className="h-full rounded-full transition-all duration-200 ease-out"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        background: "var(--primary)",
                    }}
                />
            </div>

            <p className={`text-[10px] font-bold tracking-[0.4em] uppercase animate-fade-in transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-neutral-400'
                }`}>
                TripMind
            </p>
        </div>
    );
}
