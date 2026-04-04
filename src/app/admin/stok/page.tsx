"use client";

import { useState } from "react";
import { dummyProducts, Product, getStockStatus, formatRupiah } from "@/lib/adminDummyData";

const categoryLabel: Record<string, string> = {
  pomade:  "Pomade / Clay",
  tonic:   "Hair Tonic",
  shampoo: "Shampoo",
  oil:     "Beard Oil",
  lainnya: "Lainnya",
};

function StockBadge({ product }: { product: Product }) {
  const status = getStockStatus(product);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold ${
      status === "aman"    ? "bg-emerald-100 text-emerald-700" :
      status === "menipis" ? "bg-amber-100 text-amber-700" :
      "bg-red-100 text-red-700"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "aman" ? "bg-emerald-500" : status === "menipis" ? "bg-amber-500" : "bg-red-500"
      }`} />
      {status === "aman" ? "Aman" : status === "menipis" ? "Menipis" : "Habis"}
    </span>
  );
}

// ── Adjust stock modal ────────────────────────────────────────
function AdjustModal({
  product,
  mode,
  onClose,
  onConfirm,
}: {
  product: Product;
  mode: "tambah" | "kurangi";
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 capitalize">{mode} Stok</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400">Produk</p>
            <p className="font-semibold text-gray-900 mt-0.5">{product.name}</p>
            <p className="text-xs text-gray-500 mt-1">Stok saat ini: <strong>{product.stock} {product.unit}</strong></p>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Jumlah {mode}</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAmount(Math.max(1, amount - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-lg"
              >−</button>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={e => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-center text-lg font-bold focus:outline-none focus:border-black"
              />
              <button
                onClick={() => setAmount(amount + 1)}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-lg"
              >+</button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-xs text-gray-500">Stok setelah {mode}</span>
            <span className="font-bold text-gray-900">
              {mode === "tambah" ? product.stock + amount : Math.max(0, product.stock - amount)} {product.unit}
            </span>
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
            <button
              onClick={() => { onConfirm(amount); onClose(); }}
              className={`flex-1 py-2.5 text-sm text-white rounded-lg font-semibold transition-colors ${
                mode === "tambah" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function StokPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [adjustTarget, setAdjustTarget] = useState<{ product: Product; mode: "tambah" | "kurangi" } | null>(null);
  const [filterStatus, setFilterStatus] = useState<"semua" | "menipis" | "habis">("semua");

  const lowCount = products.filter(p => getStockStatus(p) !== "aman").length;

  const filtered = filterStatus === "semua"
    ? products
    : products.filter(p => getStockStatus(p) === filterStatus);

  function handleAdjust(productId: string, mode: "tambah" | "kurangi", amount: number) {
    setProducts(prev => prev.map(p =>
      p.id === productId
        ? { ...p, stock: mode === "tambah" ? p.stock + amount : Math.max(0, p.stock - amount) }
        : p
    ));
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Stok Produk</h2>
          <p className="text-xs text-gray-400 mt-0.5">{products.length} produk terdaftar</p>
        </div>
      </div>

      {/* Alert */}
      {lowCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-semibold text-red-800">
            {lowCount} produk membutuhkan perhatian — segera lakukan restok
          </p>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: "semua",   label: "Semua" },
          { key: "menipis", label: "Menipis" },
          { key: "habis",   label: "Habis" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key as any)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filterStatus === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
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
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Produk</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden md:table-cell">Kategori</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Stok</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden sm:table-cell">Min. Stok</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden lg:table-cell">Harga Jual</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${getStockStatus(product) === "habis" ? "bg-red-50/30" : ""}`}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-gray-900 text-xs">{product.name}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-xs text-gray-500">{categoryLabel[product.category]}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-bold text-gray-900">{product.stock} <span className="text-xs font-normal text-gray-400">{product.unit}</span></p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <p className="text-xs text-gray-500">{product.minStock} {product.unit}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <StockBadge product={product} />
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <p className="text-xs text-gray-700">{formatRupiah(product.price)}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => setAdjustTarget({ product, mode: "tambah" })}
                        className="text-[11px] px-2.5 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-semibold transition-colors"
                      >+ Tambah</button>
                      <button
                        onClick={() => setAdjustTarget({ product, mode: "kurangi" })}
                        disabled={product.stock === 0}
                        className="text-[11px] px-2.5 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >− Kurangi</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {adjustTarget && (
        <AdjustModal
          product={adjustTarget.product}
          mode={adjustTarget.mode}
          onClose={() => setAdjustTarget(null)}
          onConfirm={(amount) => handleAdjust(adjustTarget.product.id, adjustTarget.mode, amount)}
        />
      )}
    </div>
  );
}