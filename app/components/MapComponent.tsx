"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

/**
 * ── PROFESSIONAL ANALİZ: Leaflet İkon Fix ──
 * Next.js mühitində bütün marker ikonlarının düzgün görünməsi üçün 
 * rəsmi CDN linkləri tətbiq olunur.
 */
const setupLeafletIcons = () => {
    if (typeof window !== 'undefined') {
        // Standart markerlər üçün
        const DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
        });
        L.Marker.prototype.options.icon = DefaultIcon;
    }
};

// İstifadəçinin yerləşdiyi yer üçün xüsusi ikon
const userPositionIcon = typeof window !== 'undefined' ? new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Mavi pin ikonu
    iconSize: [35, 35],
    iconAnchor: [17, 35],
}) : null;

// TİPLƏR
interface MarkerLocation {
    id: string;
    position: [number, number];
    label: string;
    description?: string;
    type: 'capital' | 'tourist' | 'visited' | 'wishlist';
}

/**
 * ── KOMPONENT: MapComponent ──
 */
export default function MapComponent({ favorites = [] }: { favorites?: any[] }) {
    const [userPos, setUserPos] = useState<[number, number] | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Marker nümunələri (Ölkələr, Şəhərlər, Turist yerləri)
    const locations: MarkerLocation[] = [
        { id: '1', position: [40.4093, 49.8671], label: 'Bakı, Azərbaycan', description: 'Xəzər dənizinin incisi.', type: 'capital' },
        { id: '2', position: [48.8566, 2.3522], label: 'Paris, Fransa', description: 'Eyfel qülləsi və sevgi şəhəri.', type: 'tourist' },
        { id: '3', position: [35.6895, 139.6917], label: 'Tokio, Yaponiya', description: 'Texnologiya və mədəniyyətin vəhdəti.', type: 'capital' },
        { id: '4', position: [41.9028, 12.4964], label: 'Roma, İtaliya', description: 'Tarixin qəlbi (Kolizey).', type: 'tourist' },
        { id: '5', position: [25.2048, 55.2708], label: 'Dubay, BƏƏ', description: 'Burj Khalifa və lüks həyat.', type: 'tourist' },
    ];

    // Force a fresh map instance by using a unique key on each mount
    const [mapKey, setMapKey] = useState("");

    useEffect(() => {
        setMapKey(Date.now().toString());
        setIsMounted(true);
        setupLeafletIcons();

        // ... rest of geolocation logic
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
                (err) => console.warn("Məkan tapılmadı:", err.message),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-[600px] bg-neutral-100 dark:bg-neutral-800 animate-pulse flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-neutral-400">MAP ENGINE INITIALIZING...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative group">
            <MapContainer
                key={mapKey || "loading-map"}
                center={[20, 0]}
                zoom={2}
                style={{ height: '600px', width: '100%', borderRadius: '2rem' }}
                scrollWheelZoom={true}
                className="z-10 shadow-2xl border-4 border-white dark:border-neutral-800"
            >
                {/* Profesional Tile Layer (OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Səyahət Nöqtələri */}
                {locations.map((loc) => (
                    <Marker key={loc.id} position={loc.position}>
                        <Popup className="custom-popup">
                            <div className="p-2">
                                <h3 className="font-black text-lg leading-tight uppercase">{loc.label}</h3>
                                <p className="text-xs font-bold text-neutral-500 mt-1">{loc.description}</p>
                                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${loc.type === 'capital' ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'
                                    }`}>
                                    {loc.type}
                                </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* İstifadəçinin Cari Mövqeyi */}
                {userPos && userPositionIcon && (
                    <Marker position={userPos} icon={userPositionIcon}>
                        <Popup>
                            <div className="p-1 text-center font-black">
                                <span className="text-primary tracking-tighter">SİZ BURADASINIZ</span>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Dinamik olaraq Favoritləri də əlavə etmək olar */}
                {favorites && favorites.filter(f => f.lat && f.lng).map((f: any) => (
                    <Marker key={f.id} position={[f.lat, f.lng]}>
                        <Popup><span className="font-black">Sevimli: {f.name}</span></Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Floating Xəritə Legendasını */}
            <div className="absolute top-6 right-6 z-[1000] glass px-6 py-4 rounded-2xl border border-white/20 shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Global Locations</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Your Position</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
