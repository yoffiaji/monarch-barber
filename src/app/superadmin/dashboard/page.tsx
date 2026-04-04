"use client";

import Link from "next/link";
import {
  branches,
  branchPerformance,
  stockAlerts,
  getTodayAggregateStats,
  getCriticalStockAlerts,
  formatRupiah,
} from "@/lib/superadminDummyData";

function StatCard({
  label,
  value,
  sub,
  color,
  icon,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <svg
              className={`w-3 h-3 ${trend.isPositive ? "text-emerald-500" : "text-red-500"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={trend.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
              />
            </svg>
            <span
              className={`text-xs font-semibold ${
                trend.isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {trend.value}
            </span>
          </div>
        )}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  const { today, total } = getTodayAggregateStats();
  const criticalStock = getCriticalStockAlerts();

  // Calculate completion rate
  const completionRate =
    total.bookings > 0 ? Math.round((total.completed / total.bookings) * 100) : 0;

  // Mock trend data (replace with real comparison later)
  const trends = {
    revenue: { value: "+12%", isPositive: true },
    bookings: { value: "+8%", isPositive: true },
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Critical Alerts */}
      {criticalStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">Peringatan Stok Kritis</p>
            <p className="text-xs text-red-700 mt-0.5">
              {criticalStock.length} produk habis di beberapa cabang:{" "}
              {criticalStock.map((s) => `${s.productName} (${s.branchName})`).join(", ")}
            </p>
          </div>
          <Link
            href="/superadmin/pengaturan"
            className="text-xs font-semibold text-red-700 hover:underline whitespace-nowrap"
          >
            Kelola Stok →
          </Link>
        </div>
      )}

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Pendapatan"
          value={formatRupiah(total.revenue)}
          sub="Hari ini · Semua cabang"
          color="bg-gradient-to-br from-violet-100 to-purple-100"
          trend={trends.revenue}
          icon={
            <svg
              className="w-5 h-5 text-violet-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Total Booking"
          value={total.bookings}
          sub={`${total.completed} selesai · ${total.bookings - total.completed} ongoing`}
          color="bg-gradient-to-br from-blue-100 to-cyan-100"
          trend={trends.bookings}
          icon={
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          sub="Efisiensi layanan hari ini"
          color="bg-gradient-to-br from-emerald-100 to-green-100"
          icon={
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Active Branches"
          value={branches.filter((b) => b.isActive).length}
          sub={`${branches.length} total cabang terdaftar`}
          color="bg-gradient-to-br from-amber-100 to-orange-100"
          icon={
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
        />
      </div>

      {/* Branch Comparison */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Performa Cabang Hari Ini</h2>
          <Link
            href="/superadmin/cabang"
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            Lihat detail →
          </Link>
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
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3 hidden md:table-cell">
                  Selesai
                </th>
                <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Pendapatan
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3 hidden lg:table-cell">
                  QRIS/Cash
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3 hidden lg:table-cell">
                  Top Service
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {today
                .sort((a, b) => b.revenue - a.revenue)
                .map((branch) => {
                  const qrisPercent =
                    branch.revenue > 0
                      ? Math.round((branch.qrisRevenue / branch.revenue) * 100)
                      : 0;
                  return (
                    <tr
                      key={branch.branchId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#9EB3BC]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-[#4a6e7a]">
                              {branch.branchName.split(" ")[1][0]}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-gray-900">
                            {branch.branchName}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="text-xs font-semibold text-gray-900">
                          {branch.totalBookings}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center hidden md:table-cell">
                        <span className="text-xs text-gray-600">
                          {branch.completedBookings}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <p className="text-xs font-bold text-gray-900">
                          {formatRupiah(branch.revenue)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                        <span className="text-xs text-gray-600">
                          {qrisPercent}% / {100 - qrisPercent}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center hidden lg:table-cell">
                        <span className="text-xs text-gray-600">{branch.topService}</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot className="border-t-2 border-gray-200 bg-gray-50">
              <tr>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Total
                </td>
                <td className="px-5 py-3.5 text-center text-sm font-bold text-gray-900">
                  {total.bookings}
                </td>
                <td className="px-5 py-3.5 text-center text-sm font-bold text-gray-900 hidden md:table-cell">
                  {total.completed}
                </td>
                <td className="px-5 py-3.5 text-right text-sm font-bold text-gray-900">
                  {formatRupiah(total.revenue)}
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell" />
                <td className="px-5 py-3.5 hidden lg:table-cell" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Stock Alerts Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">
              Peringatan Stok (Semua Cabang)
            </h3>
          </div>
          {stockAlerts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Semua stok dalam kondisi aman
            </p>
          ) : (
            <div className="divide-y divide-gray-50">
              {stockAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">
                      {alert.productName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{alert.branchName}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-gray-500">
                      {alert.currentStock}/{alert.minStock}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                        alert.status === "habis"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {alert.status === "habis" ? "HABIS" : "MENIPIS"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-5 space-y-3">
            <Link
              href="/superadmin/admin"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Tambah Admin Baru</p>
                  <p className="text-xs text-gray-400">Daftarkan akun admin cabang</p>
                </div>
              </div>
            </Link>

            <Link
              href="/superadmin/barberman"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Tambah Barberman
                  </p>
                  <p className="text-xs text-gray-400">Assign barberman ke cabang</p>
                </div>
              </div>
            </Link>

            <Link
              href="/superadmin/laporan"
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <svg
                    className="w-5 h-5 text-violet-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Export Laporan</p>
                  <p className="text-xs text-gray-400">Download laporan PDF/Excel</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}