"use client";

import { useState } from "react";
import { adminAccounts, branches } from "@/lib/superadminDummyData";

export default function AdminPage() {
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAdmins = adminAccounts.filter((admin) => {
    if (filterBranch !== "all" && admin.branchId !== filterBranch) return false;
    if (filterStatus === "active" && !admin.isActive) return false;
    if (filterStatus === "inactive" && admin.isActive) return false;
    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Kelola Admin</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manajemen akun admin & kasir semua cabang
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors"
        >
          + TAMBAH ADMIN
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
          {filteredAdmins.length} admin ditemukan
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAdmins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-sm font-bold text-blue-700">
                  {admin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{admin.name}</p>
                  <p className="text-xs text-gray-400">{admin.email}</p>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                  admin.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {admin.isActive ? "AKTIF" : "NONAKTIF"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                  Role
                </p>
                <p className="text-xs font-bold text-gray-900 uppercase">
                  {admin.role}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                  Cabang
                </p>
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {admin.branchName}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last Login: {admin.lastLogin}</span>
                <span>Joined: {admin.createdAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Info
              </button>
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Reset Password
              </button>
              <button
                className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                  admin.isActive
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                {admin.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-10 text-center">
          <p className="text-sm text-gray-400">Tidak ada admin ditemukan</p>
        </div>
      )}

      {/* Add Admin Modal (Simple Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Tambah Admin Baru
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="john@monarch.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cabang
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                Simpan & Kirim Kredensial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}