import Image from "next/image";
import SectionHeading from "@/components/sections/SectionHeading";
import CancellationPolicy from "@/components/sections/CancellationPolicy";
import BookingPlaceholder from "@/components/sections/BookingPlaceholder";
import BarberCard from "@/components/ui/BarberCard";
import PriceList from "@/components/ui/PriceList";
import { LocationPageData } from "@/types";

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
  <CancellationPolicy />
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
              <div key={i} className="relative aspect-[4/5] overflow-hidden group">
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