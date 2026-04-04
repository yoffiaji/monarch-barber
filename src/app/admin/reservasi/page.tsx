"use client";

import { useState } from "react";
import {
  dummyBookings,
  dummyBarbers,
  dummyServices,
  dummyMembers,
  Booking,
  BookingStatus,
  formatRupiah,
} from "@/lib/adminDummyData";

type FilterTab = "semua" | "upcoming" | "berlangsung" | "selesai";

// ── Payment Modal ─────────────────────────────────────────────
function PaymentModal({
  booking,
  onClose,
  onConfirm,
}: {
  booking: Booking;
  onClose: () => void;
  onConfirm: (method: "qris" | "cash") => void;
}) {
  const [step, setStep] = useState<"pilih" | "qris" | "cash">("pilih");
  const [cashInput, setCashInput] = useState("");

  const cashAmount = parseInt(cashInput.replace(/\D/g, "")) || 0;
  const kembalian = cashAmount - booking.totalPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-[#111] text-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50 tracking-widest uppercase">Pembayaran</p>
              <h2 className="text-base font-bold mt-0.5">{booking.memberName}</h2>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-sm text-white/60">{booking.serviceName} · {booking.barberName}</p>
            <p className="text-2xl font-bold">{formatRupiah(booking.totalPrice)}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === "pilih" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 mb-4">Pilih metode pembayaran:</p>
              <button
                onClick={() => setStep("qris")}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 4h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">QRIS</p>
                  <p className="text-xs text-gray-400">Generate QR Code via Xendit</p>
                </div>
              </button>
              <button
                onClick={() => setStep("cash")}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Cash</p>
                  <p className="text-xs text-gray-400">Hitung kembalian otomatis</p>
                </div>
              </button>
            </div>
          )}

          {step === "qris" && (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500">Tunjukkan QR kepada pelanggan</p>
              {/* QR Dummy */}
              <div className="mx-auto w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 4h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <p className="text-xs text-gray-400 mt-2">QR Dummy</p>
                  <p className="text-xs font-bold text-gray-600">{formatRupiah(booking.totalPrice)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep("pilih")} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Kembali
                </button>
                <button
                  onClick={() => onConfirm("qris")}
                  className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Konfirmasi Bayar
                </button>
              </div>
            </div>
          )}

          {step === "cash" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total tagihan</p>
                <p className="text-2xl font-bold text-gray-900">{formatRupiah(booking.totalPrice)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Uang diterima</label>
                <input
                  type="text"
                  value={cashInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setCashInput(raw ? parseInt(raw).toLocaleString("id-ID") : "");
                  }}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-lg font-bold focus:outline-none focus:border-black transition-colors"
                />
              </div>
              {cashAmount > 0 && (
                <div className={`rounded-lg px-4 py-3 ${kembalian >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
                  <p className="text-xs text-gray-500">Kembalian</p>
                  <p className={`text-xl font-bold ${kembalian >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                    {kembalian >= 0 ? formatRupiah(kembalian) : "Kurang " + formatRupiah(Math.abs(kembalian))}
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => setStep("pilih")} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Kembali
                </button>
                <button
                  onClick={() => onConfirm("cash")}
                  disabled={kembalian < 0}
                  className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Selesaikan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Walk-in Modal ─────────────────────────────────────────────
function WalkinModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Tambah Walk-in</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 tracking-wide">Nama Pelanggan</label>
            <input className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black" placeholder="Walk-in #..." />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 tracking-wide">Layanan</label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white">
              {dummyServices.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {formatRupiah(s.price)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 tracking-wide">Barberman</label>
            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white">
              <option value="">Siapa saja</option>
              {dummyBarbers.filter(b => b.status !== "libur").map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5 tracking-wide">Jam</label>
            <input type="time" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black" defaultValue="10:00" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
            <button onClick={onClose} className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 font-semibold">Tambahkan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ReservasiPage() {
  const [filter, setFilter] = useState<FilterTab>("semua");
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [payingBooking, setPayingBooking] = useState<Booking | null>(null);
  const [showWalkin, setShowWalkin] = useState(false);

  const todayBookings = bookings.filter(b => b.date === "2026-04-04");

  const filtered = filter === "semua"
    ? todayBookings
    : todayBookings.filter(b => b.status === filter);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "semua",       label: `Semua (${todayBookings.length})` },
    { key: "upcoming",    label: `Upcoming (${todayBookings.filter(b => b.status === "upcoming").length})` },
    { key: "berlangsung", label: `Berlangsung (${todayBookings.filter(b => b.status === "berlangsung").length})` },
    { key: "selesai",     label: `Selesai (${todayBookings.filter(b => b.status === "selesai").length})` },
  ];

  function handleMulai(id: string) {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "berlangsung" as BookingStatus } : b));
  }

  function handlePaymentConfirm(method: "qris" | "cash") {
    if (!payingBooking) return;
    setBookings(prev => prev.map(b =>
      b.id === payingBooking.id
        ? { ...b, status: "selesai" as BookingStatus, paymentMethod: method, paidAt: "now" }
        : b
    ));
    setPayingBooking(null);
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Reservasi Hari Ini</h2>
          <p className="text-xs text-gray-400 mt-0.5">Sabtu, 4 April 2026</p>
        </div>
        <button
          onClick={() => setShowWalkin(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Walk-in
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filter === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Pelanggan</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden md:table-cell">Layanan</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden lg:table-cell">Barber</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Jam</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden sm:table-cell">Harga</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-sm text-gray-400 py-12">
                    Tidak ada data
                  </td>
                </tr>
              )}
              {filtered.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 flex-shrink-0">
                        {booking.memberName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-xs">{booking.memberName}</p>
                        {booking.isWalkIn && (
                          <span className="text-[10px] text-orange-500 font-semibold">Walk-in</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-xs text-gray-700">{booking.serviceName}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <p className="text-xs text-gray-700">{booking.barberName}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-gray-700">{booking.time}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex text-[10px] px-2 py-1 rounded-full font-semibold ${
                      booking.status === "selesai"      ? "bg-gray-100 text-gray-500" :
                      booking.status === "berlangsung"  ? "bg-emerald-100 text-emerald-700" :
                      booking.status === "dibatalkan"   ? "bg-red-100 text-red-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-xs text-gray-700">{formatRupiah(booking.totalPrice)}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {booking.status === "upcoming" && (
                      <button
                        onClick={() => handleMulai(booking.id)}
                        className="text-[11px] px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-black font-semibold transition-colors"
                      >
                        Mulai
                      </button>
                    )}
                    {booking.status === "berlangsung" && (
                      <button
                        onClick={() => setPayingBooking(booking)}
                        className="text-[11px] px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors"
                      >
                        Bayar
                      </button>
                    )}
                    {booking.status === "selesai" && (
                      <span className="text-[11px] text-gray-400">
                        {booking.paymentMethod === "qris" ? "QRIS" : "Cash"} · {booking.paidAt}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {payingBooking && (
        <PaymentModal
          booking={payingBooking}
          onClose={() => setPayingBooking(null)}
          onConfirm={handlePaymentConfirm}
        />
      )}

      {showWalkin && <WalkinModal onClose={() => setShowWalkin(false)} />}
    </div>
  );
}