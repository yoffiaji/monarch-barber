"use client";

import { useState } from "react";
import { stockAlerts, branches } from "@/lib/superadminDummyData";

export default function PengaturanPage() {
  const [selectedTab, setSelectedTab] = useState("stock");

  const tabs = [
    { id: "stock", label: "Batas Stok", icon: "📦" },
    { id: "hours", label: "Jam Operasional", icon: "🕐" },
    { id: "notifications", label: "Notifikasi", icon: "🔔" },
    { id: "system", label: "System", icon: "⚙️" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">Pengaturan System</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Konfigurasi global untuk semua cabang
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              selectedTab === tab.id
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Stock Settings */}
      {selectedTab === "stock" && (
        <div className="space-y-6">
          {/* Current Alerts */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                Peringatan Stok Aktif
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {stockAlerts.length} produk perlu perhatian
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {stockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">
                      {alert.productName}
                    </p>
                    <p className="text-xs text-gray-400">{alert.branchName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500">
                      {alert.currentStock} / {alert.minStock}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                        alert.status === "habis"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Set Minimum Stock */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Atur Batas Minimum Stok
            </h3>
            <div className="space-y-3">
              {["Pomade", "Hair Tonic", "Shampoo", "Beard Oil", "Hair Spray"].map(
                (product) => (
                  <div
                    key={product}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {product}
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500">
                        Minimum stock:
                      </label>
                      <input
                        type="number"
                        defaultValue={5}
                        className="w-16 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <span className="text-xs text-gray-400">pcs</span>
                    </div>
                  </div>
                )
              )}
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* Operating Hours */}
      {selectedTab === "hours" && (
        <div className="space-y-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {branch.name}
                  </h3>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Jam Buka
                  </label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Jam Tutup
                  </label>
                  <input
                    type="time"
                    defaultValue="21:00"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Buka di hari libur nasional
                </label>
              </div>
            </div>
          ))}
          <button className="w-full px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Simpan Semua Perubahan
          </button>
        </div>
      )}

      {/* Notifications */}
      {selectedTab === "notifications" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Pengaturan Notifikasi
          </h3>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" defaultChecked className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Stok Menipis
                </p>
                <p className="text-xs text-gray-400">
                  Notifikasi ketika stok produk di bawah batas minimum
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" defaultChecked className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Target Pendapatan
                </p>
                <p className="text-xs text-gray-400">
                  Notifikasi ketika target harian/bulanan tercapai
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" defaultChecked className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Admin Baru Login
                </p>
                <p className="text-xs text-gray-400">
                  Notifikasi ketika ada admin login pertama kali
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Laporan Harian
                </p>
                <p className="text-xs text-gray-400">
                  Email rekap pendapatan harian setiap pukul 22:00
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" className="mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Booking Anomali
                </p>
                <p className="text-xs text-gray-400">
                  Notifikasi saat ada lonjakan/penurunan booking drastis
                </p>
              </div>
            </label>
          </div>

          <button className="w-full px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Simpan Preferensi
          </button>
        </div>
      )}

      {/* System Settings */}
      {selectedTab === "system" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Informasi System
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Version</span>
                <span className="font-mono font-semibold">v2.1.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Database</span>
                <span className="font-semibold text-emerald-600">Connected</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Last Backup</span>
                <span className="font-semibold">2026-04-04 02:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Users</span>
                <span className="font-semibold">247 active members</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Maintenance Mode
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Enable maintenance mode untuk mencegah booking sementara waktu
            </p>
            <button className="w-full px-4 py-2 border border-red-200 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors">
              Enable Maintenance Mode
            </button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-800 mb-2">
              Danger Zone
            </h3>
            <p className="text-xs text-red-600 mb-3">
              Tindakan irreversible — gunakan dengan hati-hati
            </p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 border border-red-300 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                Clear All Logs
              </button>
              <button className="w-full px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Reset Database (Development Only)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}