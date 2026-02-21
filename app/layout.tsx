import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProfileProvider } from "./context/ProfileContext";
import BackgroundEffects from "./components/BackgroundEffects";
import LoadingScreen from "./components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TripMind | Dünyanı öz zövqünə görə kəşf et",
  description: "Personalized travel planning powered by deep profile analysis and AI intelligence.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <ProfileProvider>
          <LanguageProvider>
            <LoadingScreen />
            <BackgroundEffects />
            {children}
          </LanguageProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
