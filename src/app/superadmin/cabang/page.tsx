"use client";

import { useState } from "react";
import {
  branches,
  branchPerformance,
  monthlyRevenue,
  formatRupiah,
} from "@/lib/superadminDummyData";

export default function CabangPage() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  // Calculate aggregate monthly totals
  const totalMonthlyRevenue = monthlyRevenue.reduce(
    (sum, m) => sum + m.total,
    0
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Kelola Cabang</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Monitoring & konfigurasi semua cabang Monarch
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors">
          + TAMBAH CABANG
        </button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((branch) => {
          const todayPerf = branchPerformance.find(
            (p) => p.branchId === branch.id && p.date === "2026-04-04"
          );
          return (
            <div
              key={branch.id}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{branch.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{branch.address}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                    branch.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {branch.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                    Admin
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {branch.adminCount}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                    Barberman
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {branch.barberCount}
                  </p>
                </div>
              </div>

              {todayPerf && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">
                    Performa Hari Ini
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">
                        {todayPerf.totalBookings} booking ·{" "}
                        {todayPerf.completedBookings} selesai
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {formatRupiah(todayPerf.revenue)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit Cabang
                </button>
                <button className="flex-1 text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Revenue Trend */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            Tren Pendapatan 6 Bulan Terakhir
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Total: {formatRupiah(totalMonthlyRevenue)}
          </p>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {monthlyRevenue.map((m) => {
              const maxRevenue = Math.max(...monthlyRevenue.map((r) => r.total));
              const barWidthPercent = (m.total / maxRevenue) * 100;

              return (
                <div key={m.month}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-medium text-gray-700">{m.month}</p>
                    <p className="text-xs font-bold text-gray-900">
                      {formatRupiah(m.total)}
                    </p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-gray-400">
                      Surakarta: {formatRupiah(m.surakarta)}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Yogyakarta: {formatRupiah(m.yogyakarta)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Branch Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Pengaturan Cabang</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-900">Jam Operasional</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Set jam buka & tutup per cabang
              </p>
            </div>
            <button className="text-xs font-semibold text-gray-600 hover:text-black transition-colors">
              Atur →
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-900">Batas Minimum Stok</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Trigger notifikasi saat stok menipis
              </p>
            </div>
            <button className="text-xs font-semibold text-gray-600 hover:text-black transition-colors">
              Atur →
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Nonaktifkan Cabang
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Tutup sementara atau permanen
              </p>
            </div>
            <button className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
              Nonaktifkan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}