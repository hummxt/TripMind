"use client";

import { useLanguage } from "./context/LanguageContext";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Page() {
  const { language, t } = useLanguage();

  const services = [
    {
      id: "trip-architect",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0h1.5" />
        </svg>
      ),
      title: t("tripArchitectTitle"),
      desc: t("tripArchitectDesc"),
      gradient: "from-[#7AAACE]/30 to-[#9CD5FF]/10",
      iconColor: "text-[var(--primary)]",
      borderHover: "hover:border-amber-500/20",
      glowColor: "rgba(122,170,206,0.1)",
    },
    {
      id: "gastro-guide",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: t("gastroGuideTitle"),
      desc: t("gastroGuideDesc"),
      gradient: "from-[#7AAACE]/30 to-[#9CD5FF]/10",
      iconColor: "text-[var(--secondary)]",
      borderHover: "hover:border-violet-500/20",
      glowColor: "rgba(156,213,255,0.1)",
    },
    {
      id: "spot-finder",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("spotFinderTitle"),
      desc: t("spotFinderDesc"),
      gradient: "from-[#7AAACE]/30 to-[#9CD5FF]/10",
      iconColor: "text-[var(--accent)]",
      borderHover: "hover:border-teal-500/20",
      glowColor: "rgba(156,213,255,0.1)",
    },
    {
      id: "food-finder",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t("foodFinderTitle"),
      desc: t("foodFinderDesc"),
      gradient: "from-[#7AAACE]/30 to-[#9CD5FF]/10",
      iconColor: "text-[var(--secondary)]",
      borderHover: "hover:border-rose-500/20",
      glowColor: "rgba(156,213,255,0.1)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-grow relative z-10">
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
          {/* Decorative elements */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(122,170,206,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative max-w-5xl mx-auto stagger-children">
            {/* Tag */}
            <div className="tag text-primary/80 border-primary/20 bg-primary/5 mb-8 mx-auto w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {language === "en" ? "AI-Powered Travel Intelligence" : language === "az" ? "Süni intellekt ilə səyahət" : "ИИ-интеллект путешествий"}
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-[-0.04em] leading-[0.9] mb-8">
              {language === "en" ? (
                <>
                  Travel smarter <br />
                  <span className="aurora-text">not harder</span>
                </>
              ) : language === "az" ? (
                <>
                  Ağıllı səyahət <br />
                  <span className="aurora-text">sənin üçün</span>
                </>
              ) : (
                <>
                  Путешествуй <br />
                  <span className="aurora-text">умнее</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed mb-12 text-balance">
              {language === "en" ? "AI plans your perfect trip in seconds. Just tell us your budget and interests." : language === "az" ? "Süni intellekt bir neçə saniyədə mükəmməl səyahətini planlaşdırır." : "ИИ планирует ваше идеальное путешествие за секунды."}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/trip-architect" className="btn-premium text-base px-8 py-4 text-white">
                {t("startExploring")}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/about" className="btn-ghost text-base">
                {t("about")}
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: "1.5s" }}>
            <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="relative py-6 border-y border-white/[0.04] overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 mr-12 whitespace-nowrap">
                {["Trip Architect", "Gastro Guide", "Spot Voyager", "Food Finder", "Budget Analysis", "AI Intelligence", "Multi-Language"].map((text, j) => (
                  <span key={j} className="flex items-center gap-3 text-sm font-bold text-white/15 uppercase tracking-[0.2em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES BENTO GRID ── */}
        <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center mb-16 stagger-children">
            <div className="tag text-white/50 mb-6 mx-auto w-fit">
              {language === "en" ? "What we offer" : language === "az" ? "Nə təklif edirik" : "Что мы предлагаем"}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-[1.05]">
              {language === "en" ? (
                <>Pick a tool,<br /><span className="gradient-text">start exploring</span></>
              ) : language === "az" ? (
                <>Alət seç,<br /><span className="gradient-text">kəşf etməyə başla</span></>
              ) : (
                <>Выберите инструмент,<br /><span className="gradient-text">начните исследовать</span></>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/${service.id}`}
                className={`group card-surface p-8 sm:p-10 flex flex-col gap-8 ${service.borderHover}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover glow */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`,
                    filter: "blur(40px)",
                  }}
                />

                <div className="flex items-start justify-between relative z-10">
                  <div className={`w-14 h-14 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center ${service.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {service.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center text-white/20 group-hover:text-white/60 group-hover:border-white/20 transition-all duration-500">
                    <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 space-y-3 mt-auto">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/35 font-medium leading-relaxed text-sm sm:text-base line-clamp-2">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom glow line on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </Link>
            ))}
          </div>
        </section>



        {/* ── BOTTOM CTA ── */}
        <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="relative card-surface p-12 sm:p-20 text-center overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at center, rgba(122,170,206,0.15) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 space-y-8 stagger-children">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em]">
                {language === "en" ? "Your next trip starts here" : language === "az" ? "Növbəti səyahətin buradan başlayır" : "Ваше следующее путешествие начинается здесь"}
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">
                {language === "en" ? "No research needed. Just you and AI." : language === "az" ? "Araşdırma lazım deyil. Sadəcə sən və AI." : "Без исследований. Только вы и ИИ."}
              </p>
              <div>
                <Link href="/trip-architect" className="btn-premium text-base px-10 py-5">
                  {t("startExploring")}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
