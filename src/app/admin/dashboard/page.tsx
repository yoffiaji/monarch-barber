"use client";

import Link from "next/link";
import {
  dummyBookings,
  dummyBarbers,
  dummyTransactions,
  getTodayStats,
  getLowStockProducts,
  formatRupiah,
} from "@/lib/adminDummyData";

function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-start justify-between shadow-sm">
      <div>
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = getTodayStats();
  const lowStock = getLowStockProducts();

  const upcoming = dummyBookings
    .filter((b) => b.status === "upcoming" || b.status === "berlangsung")
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 5);

  return (
    <div className="p-4 lg:p-6 space-y-6">

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">Peringatan Stok</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {lowStock.length} produk perlu perhatian:{" "}
              {lowStock.map((p) => p.name).join(", ")}
            </p>
          </div>
          <Link href="/stok" className="text-xs font-semibold text-amber-700 hover:underline whitespace-nowrap">
            Lihat Stok →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Booking"
          value={stats.total}
          sub="Hari ini"
          color="bg-gray-100"
          icon={
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Selesai"
          value={stats.selesai}
          sub={`${stats.berlangsung} berlangsung`}
          color="bg-emerald-100"
          icon={
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Menunggu"
          value={stats.upcoming}
          sub="Belum dilayani"
          color="bg-blue-100"
          icon={
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pendapatan"
          value={formatRupiah(stats.pendapatan)}
          sub={`QRIS ${formatRupiah(stats.pendapatanQris)} · Cash ${formatRupiah(stats.pendapatanCash)}`}
          color="bg-violet-100"
          icon={
            <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Reservasi Berikutnya</h2>
            <Link href="/reservasi" className="text-xs text-gray-400 hover:text-black transition-colors">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcoming.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-10">Tidak ada reservasi</p>
            )}
            {upcoming.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                    {booking.memberName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.memberName}</p>
                    <p className="text-xs text-gray-400">{booking.serviceName} · {booking.barberName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">{booking.time}</span>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-semibold tracking-wide ${
                    booking.status === "berlangsung"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-50 text-blue-600"
                  }`}>
                    {booking.status === "berlangsung" ? "Berlangsung" : "Upcoming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Barber status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Status Barberman</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {dummyBarbers.map((barber) => (
              <div key={barber.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-[#9EB3BC]/30 flex items-center justify-center text-xs font-bold text-[#4a6e7a] flex-shrink-0">
                  {barber.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{barber.name}</p>
                  {barber.currentClient && (
                    <p className="text-[11px] text-gray-400 truncate">{barber.currentClient}</p>
                  )}
                </div>
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${
                  barber.status === "tersedia"  ? "bg-emerald-400" :
                  barber.status === "melayani"  ? "bg-amber-400" :
                  "bg-gray-300"
                }`} />
                <span className={`text-[10px] font-medium flex-shrink-0 ${
                  barber.status === "tersedia" ? "text-emerald-600" :
                  barber.status === "melayani" ? "text-amber-600" :
                  "text-gray-400"
                }`}>
                  {barber.status === "tersedia" ? "Tersedia" :
                   barber.status === "melayani" ? "Melayani" : "Libur"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}