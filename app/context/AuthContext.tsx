"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    email: string;
    name: string;
    surname: string;
    nickname: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: { email: string; name: string; surname: string; nickname: string; password: string }) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Persist login state
    useEffect(() => {
        const savedUser = localStorage.getItem("tripmind_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Mock backend delay
        await new Promise(r => setTimeout(r, 1000));

        // Simulating a backend check
        const stored = localStorage.getItem(`user_${email}`);
        if (stored) {
            const userData = JSON.parse(stored);
            if (userData.password === password) {
                const { password: _, ...userWithoutPass } = userData;
                setUser(userWithoutPass);
                localStorage.setItem("tripmind_user", JSON.stringify(userWithoutPass));
                return true;
            }
        }

        // Fallback mock user if not registered but trying to login
        if (email && password) {
            const mockUser = { email, name: "Traveler", surname: "One", nickname: email.split('@')[0] };
            setUser(mockUser);
            localStorage.setItem("tripmind_user", JSON.stringify(mockUser));
            return true;
        }

        return false;
    };

    const register = async (data: { email: string; name: string; surname: string; nickname: string; password: string }) => {
        // Mock backend delay
        await new Promise(r => setTimeout(r, 1000));

        const { password, ...userProfile } = data;
        localStorage.setItem(`user_${data.email}`, JSON.stringify(data));
        setUser(userProfile);
        localStorage.setItem("tripmind_user", JSON.stringify(userProfile));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("tripmind_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
