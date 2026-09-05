"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CulturalObject } from "@/types";

interface RoutePoint {
  order: number;
  object: CulturalObject;
  distanceFromPrev: string;
  travelTime: string;
  visitDuration: string;
}

interface RouteMapProps {
  points: RoutePoint[];
  center: [number, number];
  isLoading: boolean;
}

const createNumberIcon = (num: number, isFirst: boolean, isLast: boolean) => {
  const bg = isFirst ? "#2D6A4F" : isLast ? "#C4714F" : "#1A5F7A";
  return L.divIcon({
    className: "route-marker-icon",
    html: `<div style="
      background: ${bg};
      width: 32px; height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid #fff;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
      display: flex; align-items: center; justify-content: center;
    ">
      <span style="transform: rotate(45deg); color: #fff; font-size: 11px; font-weight: 800; display: block; text-align: center; line-height: 26px;">
        ${num}
      </span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

function FitBounds({ points }: { points: RoutePoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) {
      return;
    }
    if (points.length === 1) {
      map.flyTo(points[0].object.coordinates, 12, { duration: 1 });
      return;
    }
    const coords = points.map(p => p.object.coordinates);
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [40, 40], duration: 1.2 });
  }, [points, map]);
  return null;
}

export default function RouteMap({ points, center, isLoading }: RouteMapProps) {
  const routeCoords = points.map(p => p.object.coordinates);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(196,113,79,0.2)" }}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(245,239,230,0.85)" }}>
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-2" style={{ border: "3px solid #C4714F", borderTopColor: "transparent" }} />
            <p className="text-xs font-medium" style={{ color: "#C4714F" }}>Маршрут есептелуде...</p>
          </div>
        </div>
      )}

      {points.length === 0 && !isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 py-3 rounded-xl" style={{ background: "rgba(255,248,240,0.85)" }}>
            <p className="text-sm font-medium" style={{ color: "#8B6914" }}>Маршрут картасы</p>
            <p className="text-xs mt-1" style={{ color: "#A08060" }}>Маршрут құрған соң осында көрсетіледі</p>
          </div>
        </div>
      )}

      <MapContainer center={center} zoom={5} className="w-full h-full" zoomControl={false} style={{ zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <FitBounds points={points} />

        {/* Route line */}
        {routeCoords.length > 1 && (
          <Polyline
            positions={routeCoords}
            color="#C4714F"
            weight={3}
            opacity={0.8}
            dashArray="8, 5"
          />
        )}

        {/* Markers */}
        {points.map((point, i) => (
          <Marker
            key={point.object.id}
            position={point.object.coordinates}
            icon={createNumberIcon(i + 1, i === 0, i === points.length - 1)}
          />
        ))}
      </MapContainer>
    </div>
  );
}
