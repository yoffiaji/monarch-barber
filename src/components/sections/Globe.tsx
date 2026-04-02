"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

interface MarkerLocation {
  lat: number;
  lng: number;
  city: string;
}

// ── Komponen globe (client only) ─────────────────────────────────────────────
function GlobeComponent() {
  const globeEl = useRef<any>(null);
  const [countries, setCountries] = useState<{ features: any[] }>({ features: [] });
  const [GlobeGL, setGlobeGL] = useState<any>(null);

  const locations: MarkerLocation[] = [
    { lat: -7.5705, lng: 110.8285, city: "Surakarta (Solo)" },
  ];

  useEffect(() => {
    // Import react-globe.gl secara dinamis agar tidak error SSR
    import("react-globe.gl").then((mod) => setGlobeGL(() => mod.default));

    const style = document.createElement("style");
    style.textContent = `
      .ring-wrapper {
        position: relative;
        width: 12px; height: 12px;
        transform: translate(-50%, -50%);
      }
      .ring-dot {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 8px; height: 8px;
        border-radius: 50%;
        background: rgba(56, 189, 248, 1);
        z-index: 10;
      }
      .ring-pulse {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(1);
        width: 12px; height: 12px;
        border-radius: 50%;
        border: 2px solid rgba(56, 189, 248, 0.9);
        animation: ripple 2s ease-out infinite;
      }
      .ring-pulse:nth-child(2) { animation-delay: 0.66s; }
      .ring-pulse:nth-child(3) { animation-delay: 1.33s; }
      @keyframes ripple {
        0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(6); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/topojson-client@3/dist/topojson-client.min.js";
    script.onload = () => {
      fetch("https://unpkg.com/world-atlas@2.0.2/countries-50m.json")
        .then((res) => res.json())
        .then((topoData) => {
          const topo = (window as any).topojson;
          setCountries({
            features: topo.feature(topoData, topoData.objects.countries).features,
          });
        });
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!globeEl.current || !GlobeGL) return;
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
    globeEl.current.controls().enableZoom = false;
    globeEl.current.pointOfView({ lat: -7.6, lng: 110.6, altitude: 3.2 }, 1000);
    const scene = globeEl.current.scene();
    if (scene) scene.background = null;
  }, [GlobeGL, countries]);

  if (!GlobeGL) return null;

  return (
    <div className="w-full h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      <GlobeGL
        ref={globeEl}
        width={800}
        height={800}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={false}
        showAtmosphere={false}
        globeImageUrl={null}

        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonColor={() => "#111111"}

        htmlElementsData={locations}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.01}
        htmlElement={(d: any) => {
          const wrapper = document.createElement("div");
          wrapper.className = "ring-wrapper";
          wrapper.title = d.city;
          wrapper.innerHTML = `
            <div class="ring-pulse"></div>
            <div class="ring-pulse"></div>
            <div class="ring-pulse"></div>
            <div class="ring-dot"></div>
          `;
          return wrapper;
        }}

        animateIn={true}
        waitForGlobeReady={true}
        enablePointerInteraction={true}
      />
    </div>
  );
}

// ── Export: wrapper + globe dalam 1 file, SSR dimatikan ──────────────────────
const GlobeNoSSR = dynamic(() => Promise.resolve(GlobeComponent), { ssr: false });

export default function GlobeWrapper() {
  return (
    <div className="w-full h-full">
      <GlobeNoSSR />
    </div>
  );
}