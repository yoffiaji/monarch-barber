"use client";

import { useState } from "react";
import { serviceConfigs, formatRupiah } from "@/lib/superadminDummyData";

export default function LayananPage() {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredServices = serviceConfigs.filter((service) => {
    if (filterCategory !== "all" && service.category !== filterCategory) return false;
    return true;
  });

  const categories = [
    { id: "all", label: "Semua Kategori", count: serviceConfigs.length },
    {
      id: "haircut",
      label: "Haircut",
      count: serviceConfigs.filter((s) => s.category === "haircut").length,
    },
    {
      id: "beard",
      label: "Beard",
      count: serviceConfigs.filter((s) => s.category === "beard").length,
    },
    {
      id: "treatment",
      label: "Treatment",
      count: serviceConfigs.filter((s) => s.category === "treatment").length,
    },
    {
      id: "package",
      label: "Package",
      count: serviceConfigs.filter((s) => s.category === "package").length,
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Kelola Layanan</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Konfigurasi harga & jenis layanan semua cabang
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-black text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors"
        >
          + TAMBAH LAYANAN
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === cat.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{service.name}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {service.description}
                </p>
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-semibold ml-2 flex-shrink-0 ${
                  service.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {service.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                  Kategori
                </p>
                <p className="text-xs font-semibold text-gray-900 capitalize">
                  {service.category}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                  Durasi
                </p>
                <p className="text-xs font-bold text-gray-900">{service.duration} mnt</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                  Harga
                </p>
                <p className="text-xs font-bold text-gray-900">
                  {formatRupiah(service.basePrice)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Harga
              </button>
              <button className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Detail
              </button>
              <button
                className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                  service.isActive
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                }`}
              >
                {service.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Ringkasan Harga</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Layanan
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Kategori
                </th>
                <th className="text-center text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Durasi
                </th>
                <th className="text-right text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3">
                  Harga
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {serviceConfigs
                .filter((s) => s.isActive)
                .sort((a, b) => a.category.localeCompare(b.category))
                .map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <p className="text-xs font-medium text-gray-900">
                        {service.name}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-gray-600 capitalize">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-gray-600">
                        {service.duration} mnt
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-xs font-bold text-gray-900">
                        {formatRupiah(service.basePrice)}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Tambah Layanan Baru
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g. Premium Haircut"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  rows={3}
                  placeholder="Deskripsikan layanan..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                    <option value="haircut">Haircut</option>
                    <option value="beard">Beard</option>
                    <option value="treatment">Treatment</option>
                    <option value="package">Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Durasi (menit)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="45"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="100000"
                />
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
                Simpan Layanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}