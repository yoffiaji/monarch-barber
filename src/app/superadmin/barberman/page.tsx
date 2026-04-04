"use client";

import { useState } from "react";
import { allBarbers, branches } from "@/lib/superadminDummyData";

export default function BarbermanPage() {
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBarbers = allBarbers.filter((barber) => {
    if (filterBranch !== "all" && barber.branchId !== filterBranch) return false;
    if (filterStatus === "active" && !barber.isActive) return false;
    if (filterStatus === "inactive" && barber.isActive) return false;
    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Kelola Barberman</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manajemen barberman semua cabang
          </p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors">
          + TAMBAH BARBERMAN
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>

        <div className="ml-auto text-xs text-gray-400">
          {filteredBarbers.length} barberman ditemukan
        </div>
      </div>

      {/* Barber Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBarbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9EB3BC] to-[#7a9aa6] flex items-center justify-center text-white text-sm font-bold">
                  {barber.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{barber.name}</p>
                  <p className="text-xs text-gray-400">{barber.branchName}</p>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                  barber.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {barber.isActive ? "AKTIF" : "NONAKTIF"}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">
                Spesialisasi
              </p>
              <div className="flex flex-wrap gap-1">
                {barber.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Rating
                </p>
                <p className="text-sm font-bold text-gray-900">
                  ⭐ {barber.rating}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Services
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {barber.totalServices}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Joined
                </p>
                <p className="text-[10px] font-semibold text-gray-700">
                  {new Date(barber.joinDate).getFullYear()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Pindah Cabang
              </button>
              <button
                className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                  barber.isActive
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                {barber.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBarbers.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-10 text-center">
          <p className="text-sm text-gray-400">Tidak ada barberman ditemukan</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Statistik Barberman
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total Barberman
            </p>
            <p className="text-2xl font-bold text-gray-900">{allBarbers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Aktif</p>
            <p className="text-2xl font-bold text-gray-900">
              {allBarbers.filter((b) => b.isActive).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Avg Rating
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {(
                allBarbers.reduce((sum, b) => sum + b.rating, 0) / allBarbers.length
              ).toFixed(1)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total Services
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {allBarbers.reduce((sum, b) => sum + b.totalServices, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}