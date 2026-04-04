"use client";

import {
  dummyTransactions,
  dummyServices,
  getTodayStats,
  formatRupiah,
  Transaction,
} from "@/lib/adminDummyData";

function MetricCard({
  label, value, sub, icon, accent,
}: {
  label: string; value: string; sub?: string; icon: React.ReactNode; accent: string;
}) {
  return (
    <div className={`rounded-xl p-5 flex items-start justify-between ${accent}`}>
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase opacity-60 mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {sub && <p className="text-xs opacity-60 mt-1">{sub}</p>}
      </div>
      <div className="opacity-40">{icon}</div>
    </div>
  );
}

export default function KeuanganPage() {
  const stats = getTodayStats();

  // Rekap per layanan
  const serviceMap: Record<string, { count: number; total: number }> = {};
  dummyTransactions.forEach(tx => {
    if (!serviceMap[tx.serviceName]) serviceMap[tx.serviceName] = { count: 0, total: 0 };
    serviceMap[tx.serviceName].count++;
    serviceMap[tx.serviceName].total += tx.amount;
  });
  const serviceRecap = Object.entries(serviceMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total);

  const qrisPercent = stats.pendapatan > 0
    ? Math.round((stats.pendapatanQris / stats.pendapatan) * 100)
    : 0;
  const cashPercent = 100 - qrisPercent;

  return (
    <div className="p-4 lg:p-6 space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Rekap Keuangan</h2>
        <p className="text-xs text-gray-400 mt-0.5">Sabtu, 4 April 2026 · Monarch Surakarta</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Total Pendapatan"
          value={formatRupiah(stats.pendapatan)}
          sub={`${stats.selesai} transaksi selesai`}
          accent="bg-[#111] text-white"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label="Via QRIS"
          value={formatRupiah(stats.pendapatanQris)}
          sub={`${qrisPercent}% dari total`}
          accent="bg-violet-50 text-violet-900"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 4h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          }
        />
        <MetricCard
          label="Via Cash"
          value={formatRupiah(stats.pendapatanCash)}
          sub={`${cashPercent}% dari total`}
          accent="bg-emerald-50 text-emerald-900"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Transaksi hari ini */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Riwayat Transaksi Hari Ini</h3>
          </div>
          {dummyTransactions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">Belum ada transaksi</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">Jam</th>
                    <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">Pelanggan</th>
                    <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3 hidden md:table-cell">Layanan</th>
                    <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3 hidden lg:table-cell">Barber</th>
                    <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">Metode</th>
                    <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dummyTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs text-gray-500">{tx.paidAt}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-medium text-gray-900">{tx.memberName}</p>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <p className="text-xs text-gray-600">{tx.serviceName}</p>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <p className="text-xs text-gray-600">{tx.barberName}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex text-[10px] px-2 py-1 rounded-full font-semibold ${
                          tx.paymentMethod === "qris"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {tx.paymentMethod.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <p className="text-xs font-bold text-gray-900">{formatRupiah(tx.amount)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-gray-200">
                  <tr>
                    <td colSpan={4} className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</td>
                    <td />
                    <td className="px-5 py-3.5 text-right text-sm font-bold text-gray-900">{formatRupiah(stats.pendapatan)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Rekap per layanan */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Rekap per Layanan</h3>
          </div>
          {serviceRecap.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">Belum ada data</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {serviceRecap.map((item, i) => {
                const pct = stats.pendapatan > 0 ? (item.total / stats.pendapatan) * 100 : 0;
                return (
                  <div key={item.name} className="px-5 py-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs font-bold text-gray-900">{formatRupiah(item.total)}</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#111] h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{item.count}x · {Math.round(pct)}%</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Catatan ekspor */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-700">Ekspor Laporan</p>
          <p className="text-xs text-gray-400 mt-0.5">Fitur ekspor PDF & Excel tersedia untuk Super Admin</p>
        </div>
        <button disabled className="text-xs px-4 py-2 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">
          Ekspor (Super Admin)
        </button>
      </div>
    </div>
  );
}