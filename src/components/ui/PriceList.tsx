"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PriceTab } from "@/types";

interface PriceListProps {
  tabs: PriceTab[];
  sideImage?: string;
}

const localeMap: Record<string, string> = {
  Rp: "id-ID",
  "€": "de-DE",
  $: "en-US",
  "£": "en-GB",
};

// Tab IDs that use "FROM" prefix
const FROM_TABS = ["services", "packages"];

function formatPrice(price: number, currency: string, withFrom: boolean): string {
  if (currency === "Rp") {
    const formatted = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    const label = `RP ${formatted}`;
    return withFrom ? `FROM ${label}` : label;
  }

  const currencyCodeMap: Record<string, string> = {
    "€": "EUR",
    $: "USD",
    "£": "GBP",
  };
  const locale = localeMap[currency] ?? "en-US";
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCodeMap[currency] ?? "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return withFrom ? `FROM ${formatted}` : formatted;
}

export default function PriceList({ tabs, sideImage }: PriceListProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const active = tabs.find((t) => t.id === activeTab);

  // Track the widest price box per tab so all boxes in that tab are the same width
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const measureRef = useRef<HTMLDivElement>(null);

  // After render, measure hidden price spans to find the widest per tab
  useEffect(() => {
    if (!measureRef.current) return;

    const spans = measureRef.current.querySelectorAll<HTMLSpanElement>("[data-tab-id]");
    const widths: Record<string, number> = {};

    spans.forEach((el) => {
      const tabId = el.getAttribute("data-tab-id")!;
      const w = el.getBoundingClientRect().width;
      if (!widths[tabId] || w > widths[tabId]) {
        widths[tabId] = w;
      }
    });

    setTabWidths(widths);
  }, [tabs]);

  // +32px to account for px-4 (16px each side) padding inside the box
  const boxWidth = tabWidths[activeTab] ? tabWidths[activeTab] + 32 : undefined;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 items-start">
      {sideImage && (
        <div className="hidden lg:block lg:w-[50%] sticky top-8">
          <div className="relative h-[620px]">
            <Image
              src={sideImage}
              alt="Price list"
              fill
              className="object-cover object-center"
              sizes="40vw"
            />
          </div>
        </div>
      )}

      {/* Hidden measurement container — renders all tab prices invisibly to measure widths */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none top-0 left-0"
        style={{ visibility: "hidden" }}
      >
        {tabs.map((tab) =>
          tab.services.map((service) => {
            const withFrom = FROM_TABS.includes(tab.id);
            return (
              <span
                key={`${tab.id}-${service.name}`}
                data-tab-id={tab.id}
                className="text-lg font-bold whitespace-nowrap inline-block"
              >
                {formatPrice(service.price, service.currency, withFrom)}
              </span>
            );
          })
        )}
      </div>

      <div className="w-full lg:w-[60%]">
        <div className="flex border-b border-gray-300 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 text-sm tracking-widest font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-[#9EB3BC] text-black"
                  : "bg-transparent text-gray-800 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-gray-300/50">
          {active?.services.map((service) => {
            const withFrom = FROM_TABS.includes(activeTab);
            return (
              <li key={service.name} className="py-5">
                <div className="flex items-center justify-between gap-15">
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold tracking-widest uppercase text-gray-900">
                      {service.name}
                    </h4>
                    {service.description && (
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed font-medium">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className="bg-[#9EB3BC] px-4 py-2 flex items-center justify-center h-fit"
                      style={{
                        width: boxWidth ? `${boxWidth}px` : undefined,
                        minWidth: "120px",
                      }}
                    >
                      <span className="text-lg font-bold text-black whitespace-nowrap">
                        {formatPrice(service.price, service.currency, withFrom)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}