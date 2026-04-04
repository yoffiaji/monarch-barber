"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import BarberCard from "@/components/ui/BarberCard";
import PriceList from "@/components/ui/PriceList";
import { LocationPageData } from "@/types";

// ── SectionHeading ────────────────────────────────────────────────────────────
// Masih bisa dipisah ke components/sections/ jika nanti dipakai di halaman lain

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

function SectionHeading({ title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-gray-500 tracking-wide">{subtitle}</p>
      )}
    </div>
  );
}

// ── CancellationPolicy ────────────────────────────────────────────────────────

function CancellationPolicy({ image }: { image: string }) {
  return (
    <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
        <div className="relative h-[400px] md:h-[500px] m-4 md:m-8">
          <Image
            src={image}
            alt="Cancellation Policy"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="bg-[#EBEBEB] px-8 md:px-12 py-10 md:py-0 flex flex-col justify-center">
          <h2 className="text-2xl md:text-[28px] font-light tracking-widest uppercase mb-8 leading-snug text-black">
            PLEASE READ - 24 HOUR CANCELLATION POLICY.
          </h2>
          <div className="text-sm text-gray-800 leading-loose space-y-4 font-medium">
            <p>
              Kebijakan Pembatalan 24 Jam — Membatalkan janji dalam waktu kurang
              dari 24 jam sebanyak lebih dari dua kali akan mengharuskan
              pembayaran di muka sebelum membuat janji berikutnya.
            </p>
            <p>
              Jika saya tidak hadir (no-show) atau membatalkan dalam waktu
              kurang dari 12 jam sebelum jadwal, saya setuju untuk membayar 50%
              dari biaya layanan sebelum membuat janji berikutnya.
            </p>
            <p>
              Saya akan datang minimal 10 menit lebih awal dari jadwal, dan
              memahami bahwa jika saya terlambat lebih dari 10 menit, pihak
              MONARCH berhak membatalkan janji tersebut serta mengenakan biaya
              sebesar 50%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BookingPlaceholder ────────────────────────────────────────────────────────

function BookingPlaceholder({ location }: { location: string }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[450px] h-[450px] border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-widest text-gray-700 uppercase">
            Booking System
          </p>
          <p className="text-xs text-gray-500 mt-1">{location}</p>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed max-w-[280px]">
          Booking integration will be connected here. Contact us directly to
          schedule your appointment.
        </p>
        <a
          href="mailto:hello@monarchbarber.com"
          className="inline-block px-6 py-3 text-xs tracking-widest font-semibold bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-200"
        >
          CONTACT US
        </a>
      </div>
    </div>
  );
}

// ── LocationPage (main export) ────────────────────────────────────────────────

interface LocationPageProps {
  data: LocationPageData;
}

export default function LocationPage({ data }: LocationPageProps) {
  return (
    <main className="bg-[#EBEBEB] min-h-screen">

      {/* Hero */}
      <section className="relative w-full min-h-[400px] flex items-center justify-center">
        <Image
          src={data.heroImage}
          alt={`${data.cityName} Barbershop`}
          fill
          className="object-cover brightness-50"
          priority
        />
        <h1 className="relative text-white text-5xl md:text-6xl tracking-[0.15em] font-normal uppercase">
          {data.cityName}
        </h1>
      </section>

      {/* About + Cancellation */}
      <section className="pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-[79.2rem] mx-auto px-4 md:px-8 text-center mb-16 md:mb-20">
          <SectionHeading title={data.aboutTitle} />
          <div className="space-y-6 text-sm md:text-base text-gray-800 leading-relaxed font-medium">
            {data.aboutParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <CancellationPolicy image={data.cancellationImage} />
      </section>

      {/* Team */}
      <section className="py-20 md:py-28" style={{ backgroundColor: data.teamBgColor }}>
        <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase text-black mb-4">
              OUR {data.cityName} TEAM
            </h2>
            <p className="text-sm text-black font-medium tracking-wide">
              Pilih barber secara langsung atau gunakan formulir booking di bawah ini.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {data.barbers.map((barber) => (
              <BarberCard key={barber.name} barber={barber} />
            ))}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-20 md:py-24">
        <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
          <SectionHeading
            title="CHECK OUT OUR PRICE LIST!"
            subtitle="All haircuts come with a free drink and hot towel neck shave."
          />
          <PriceList tabs={data.priceTabs} sideImage={data.priceImage} />
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-20 md:py-24">
        <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
          <SectionHeading title="BOOK YOUR SLOT" />
          <BookingPlaceholder location={data.bookingLocation} />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-24">
        <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={src}
                  alt={`${data.cityName} gallery ${i + 1}`}
                  fill
                  className="object-cover pointer-events-none select-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}