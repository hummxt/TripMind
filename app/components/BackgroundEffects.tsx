"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const blobs = containerRef.current.querySelectorAll('.aurora-blob');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, i) => {
                const speed = (i + 1) * 8;
                const el = blob as HTMLElement;
                el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="aurora-bg">
            {/* Aurora blobs */}
            <div
                className="aurora-blob animate-float"
                style={{
                    width: "50vw",
                    height: "50vw",
                    top: "-15%",
                    left: "-10%",
                    background: "radial-gradient(circle, rgba(122,170,206,0.2) 0%, transparent 70%)",
                    animationDuration: "12s",
                }}
            />
            <div
                className="aurora-blob animate-float"
                style={{
                    width: "45vw",
                    height: "45vw",
                    top: "20%",
                    right: "-15%",
                    background: "radial-gradient(circle, rgba(156,213,255,0.15) 0%, transparent 70%)",
                    animationDuration: "16s",
                    animationDelay: "-4s",
                }}
            />
            <div
                className="aurora-blob animate-float"
                style={{
                    width: "40vw",
                    height: "40vw",
                    bottom: "-10%",
                    left: "30%",
                    background: "radial-gradient(circle, rgba(156,213,255,0.12) 0%, transparent 70%)",
                    animationDuration: "20s",
                    animationDelay: "-8s",
                }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 grid-pattern opacity-50" />
        </div>
    );
}
