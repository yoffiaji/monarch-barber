"use client";

import { useState } from "react";
import {
  branches,
  branchPerformance,
  monthlyRevenue,
  formatRupiah,
} from "@/lib/superadminDummyData";

export default function LaporanPage() {
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [dateRange, setDateRange] = useState("today");

  // Calculate totals
  const todayPerf = branchPerformance.filter((p) => p.date === "2026-04-04");
  const totalToday = {
    revenue: todayPerf.reduce((sum, p) => sum + p.revenue, 0),
    bookings: todayPerf.reduce((sum, p) => sum + p.totalBookings, 0),
    completed: todayPerf.reduce((sum, p) => sum + p.completedBookings, 0),
    qris: todayPerf.reduce((sum, p) => sum + p.qrisRevenue, 0),
    cash: todayPerf.reduce((sum, p) => sum + p.cashRevenue, 0),
  };

  const monthlyTotal = monthlyRevenue.reduce((sum, m) => sum + m.total, 0);
  const avgMonthly = monthlyTotal / monthlyRevenue.length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Laporan Keuangan</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Analisis pendapatan & export laporan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            📊 Export Excel
          </button>
          <button className="px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors">
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="all">Semua Cabang</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="today">Hari Ini</option>
          <option value="week">7 Hari Terakhir</option>
          <option value="month">30 Hari Terakhir</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
          <p className="text-xs opacity-80 uppercase tracking-wide mb-1">
            Total Pendapatan
          </p>
          <p className="text-2xl font-bold">{formatRupiah(totalToday.revenue)}</p>
          <p className="text-xs opacity-70 mt-1">Hari ini · Semua cabang</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-5 shadow-lg">
          <p className="text-xs opacity-80 uppercase tracking-wide mb-1">
            Total Transaksi
          </p>
          <p className="text-2xl font-bold">{totalToday.completed}</p>
          <p className="text-xs opacity-70 mt-1">
            dari {totalToday.bookings} booking
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl p-5 shadow-lg">
          <p className="text-xs opacity-80 uppercase tracking-wide mb-1">QRIS</p>
          <p className="text-2xl font-bold">{formatRupiah(totalToday.qris)}</p>
          <p className="text-xs opacity-70 mt-1">
            {totalToday.revenue > 0
              ? Math.round((totalToday.qris / totalToday.revenue) * 100)
              : 0}
            % dari total
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
          <p className="text-xs opacity-80 uppercase tracking-wide mb-1">Cash</p>
          <p className="text-2xl font-bold">{formatRupiah(totalToday.cash)}</p>
          <p className="text-xs opacity-70 mt-1">
            {totalToday.revenue > 0
              ? Math.round((totalToday.cash / totalToday.revenue) * 100)
              : 0}
            % dari total
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            Tren Pendapatan 6 Bulan
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Total: {formatRupiah(monthlyTotal)} · Rata-rata: {formatRupiah(avgMonthly)}
            /bulan
          </p>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {monthlyRevenue.map((m) => {
              const maxRevenue = Math.max(...monthlyRevenue.map((r) => r.total));
              const totalPercent = (m.total / maxRevenue) * 100;
              const suraPercent = (m.surakarta / m.total) * 100;
              const yogyaPercent = (m.yogyakarta / m.total) * 100;

              return (
                <div key={m.month}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-medium text-gray-700">{m.month}</p>
                    <p className="text-xs font-bold text-gray-900">
                      {formatRupiah(m.total)}
                    </p>
                  </div>
                  {/* Stacked bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden flex">
                    <div
                      className="h-2.5 bg-[#9EB3BC]"
                      style={{ width: `${suraPercent}%` }}
                      title={`Surakarta: ${formatRupiah(m.surakarta)}`}
                    />
                    <div
                      className="h-2.5 bg-[#4a6e7a]"
                      style={{ width: `${yogyaPercent}%` }}
                      title={`Yogyakarta: ${formatRupiah(m.yogyakarta)}`}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#9EB3BC]" />
                      <span className="text-[10px] text-gray-400">
                        Surakarta: {formatRupiah(m.surakarta)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#4a6e7a]" />
                      <span className="text-[10px] text-gray-400">
                        Yogyakarta: {formatRupiah(m.yogyakarta)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Branch Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            Perbandingan Cabang Hari Ini
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Cabang
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Booking
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Selesai
                </th>
                <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Pendapatan
                </th>
                <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  QRIS
                </th>
                <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Cash
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Top Service
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {todayPerf
                .sort((a, b) => b.revenue - a.revenue)
                .map((perf) => (
                  <tr key={perf.branchId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-xs font-medium text-gray-900">
                        {perf.branchName}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs font-semibold text-gray-900">
                        {perf.totalBookings}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-gray-600">
                        {perf.completedBookings}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-xs font-bold text-gray-900">
                        {formatRupiah(perf.revenue)}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-xs text-gray-600">
                        {formatRupiah(perf.qrisRevenue)}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-xs text-gray-600">
                        {formatRupiah(perf.cashRevenue)}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-gray-600">{perf.topService}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot className="border-t-2 border-gray-200 bg-gray-50">
              <tr>
                <td className="px-5 py-3 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total
                </td>
                <td className="px-5 py-3 text-center text-sm font-bold text-gray-900">
                  {totalToday.bookings}
                </td>
                <td className="px-5 py-3 text-center text-sm font-bold text-gray-900">
                  {totalToday.completed}
                </td>
                <td className="px-5 py-3 text-right text-sm font-bold text-gray-900">
                  {formatRupiah(totalToday.revenue)}
                </td>
                <td className="px-5 py-3 text-right text-sm font-bold text-gray-900">
                  {formatRupiah(totalToday.qris)}
                </td>
                <td className="px-5 py-3 text-right text-sm font-bold text-gray-900">
                  {formatRupiah(totalToday.cash)}
                </td>
                <td className="px-5 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}