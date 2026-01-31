'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default markers in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function MapComponent() {
    const position: [number, number] = [28.6139, 77.2090]; // New Delhi coordinates as default

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-0 relative">
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        <div className="text-slate-900 font-semibold">
                            Rahul's Pixel 7 <br />
                            <span className="text-slate-500 font-normal text-xs">Last updated: Just now</span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
