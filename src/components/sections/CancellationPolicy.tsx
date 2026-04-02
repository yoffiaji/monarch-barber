import Image from "next/image";

export default function CancellationPolicy() {
  return (
    <div className="max-w-[79.2rem] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
        {/* Image */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src="/images/berlin/hero-slide.png"
            alt="Cancellation Policy"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text */}
        <div className="bg-[#EBEBEB] px-8 md:px-12 py-0 flex flex-col justify-center max-w-prose">
          <h2 className="text-2xl md:text-[28px] font-light tracking-widest uppercase mb-8 leading-snug text-black">
            PLEASE READ - 24 HOUR CANCELLATION POLICY.
          </h2>
          <div className="text-sm text-gray-800 leading-loose space-y-4 font-medium">
            <p>
              Kebijakan Pembatalan 24 Jam — Membatalkan janji dalam waktu kurang dari 24 jam sebanyak lebih
              dari dua kali akan mengharuskan pembayaran di muka sebelum membuat janji berikutnya.
            </p>
            <p>
              Jika saya tidak hadir (no-show) atau membatalkan dalam waktu kurang dari 12 jam sebelum jadwal,
              saya setuju untuk membayar 50% dari biaya layanan sebelum membuat janji berikutnya.
            </p>
            <p>
              Saya akan datang minimal 10 menit lebih awal dari jadwal, dan memahami bahwa jika saya terlambat
              lebih dari 10 menit, pihak MONARCH berhak membatalkan janji tersebut serta mengenakan biaya sebesar 50%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}