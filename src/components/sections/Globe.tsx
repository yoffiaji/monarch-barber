"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

interface MarkerLocation {
  lat: number;
  lng: number;
  city: string;
}

// ── Cek WebGL tersedia atau tidak ─────────────────────────────────────────────
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ── Fallback jika WebGL tidak tersedia ───────────────────────────────────────
function GlobeFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </div>
      <div>
        <p className="text-xs tracking-widest text-gray-500 uppercase font-medium">Surakarta, Indonesia</p>
        <p className="text-[10px] text-gray-400 mt-1">7°34′S 110°49′E</p>
      </div>
    </div>
  );
}

// ── Komponen globe (client only) ─────────────────────────────────────────────
function GlobeComponent() {
  const globeEl = useRef<any>(null);
  const [countries, setCountries] = useState<{ features: any[] }>({ features: [] });
  const [GlobeGL, setGlobeGL] = useState<any>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  const locations: MarkerLocation[] = [
    { lat: -7.5705, lng: 110.8285, city: "Surakarta (Solo)" },
  ];

  useEffect(() => {
    // Cek WebGL dulu sebelum load library
    const supported = isWebGLAvailable();
    setWebGLSupported(supported);
    if (!supported) return;

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
        })
        .catch(() => setWebGLSupported(false));
    };
    script.onerror = () => setWebGLSupported(false);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!globeEl.current || !GlobeGL) return;
    try {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView({ lat: -7.6, lng: 110.6, altitude: 3.2 }, 1000);
      const scene = globeEl.current.scene();
      if (scene) scene.background = null;
    } catch {
      setWebGLSupported(false);
    }
  }, [GlobeGL, countries]);

  // Masih loading
  if (webGLSupported === null) return null;

  // WebGL tidak tersedia → tampilkan fallback
  if (!webGLSupported) return <GlobeFallback />;

  // Globe belum siap
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
        onGlobeReady={() => {
          // Safety check setelah globe ready
          try {
            if (globeEl.current) {
              globeEl.current.controls().autoRotate = true;
            }
          } catch {
            setWebGLSupported(false);
          }
        }}
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