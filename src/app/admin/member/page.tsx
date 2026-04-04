"use client";

import { useState } from "react";
import { dummyMembers, Member, formatRupiah } from "@/lib/adminDummyData";

// ── Generate password sementara ───────────────────────────────
function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ── Modal Tambah Member ───────────────────────────────────────
function AddMemberModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (member: Member, password: string) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState<"form" | "result">("form");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [newMember, setNewMember] = useState<Member | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit() {
    if (!form.name || !form.email || !form.phone) return;
    const pwd = generatePassword();
    const member: Member = {
      id: "m" + Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      joinDate: "2026-04-04",
      totalBookings: 0,
      lastVisit: "-",
    };
    setGeneratedPassword(pwd);
    setNewMember(member);
    setStep("result");
    onAdd(member, pwd);
  }

  function handleCopy() {
    const text = `Nama: ${newMember?.name}\nEmail: ${newMember?.email}\nPassword: ${generatedPassword}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            {step === "form" ? "Daftarkan Member Baru" : "Kredensial Member"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === "form" && (
          <div className="p-6 space-y-4">
            {[
              { key: "name", label: "Nama Lengkap", placeholder: "Budi Santoso", type: "text" },
              { key: "email", label: "Email", placeholder: "budi@gmail.com", type: "email" },
              { key: "phone", label: "Nomor HP", placeholder: "081234567890", type: "tel" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs text-gray-500 block mb-1.5 tracking-wide">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button onClick={onClose} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.phone}
                className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-40 font-semibold"
              >
                Daftarkan
              </button>
            </div>
          </div>
        )}

        {step === "result" && newMember && (
          <div className="p-6 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-emerald-800 font-medium">Member berhasil didaftarkan!</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 space-y-3 border border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Kredensial Login</p>
              {[
                { label: "Nama", value: newMember.name },
                { label: "Email", value: newMember.email },
                { label: "Password Sementara", value: generatedPassword },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className={`text-sm font-semibold text-gray-900 ${item.label.includes("Password") ? "font-mono tracking-wider" : ""}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center">
              Kirimkan kredensial ini ke pelanggan via WhatsApp atau secara langsung.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                {copied ? "✓ Tersalin!" : "Salin Kredensial"}
              </button>
              <button onClick={onClose} className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 font-semibold">
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reset Password Modal ──────────────────────────────────────
function ResetPasswordModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const [pwd] = useState(generatePassword());
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`Email: ${member.email}\nPassword baru: ${pwd}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Reset Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">Password baru untuk <strong>{member.name}</strong>:</p>
          <div className="bg-gray-100 rounded-xl px-5 py-4 text-center">
            <p className="text-xl font-mono font-bold tracking-widest text-gray-900">{pwd}</p>
          </div>
          <p className="text-xs text-gray-400 text-center">Kirimkan password ini ke pelanggan, dan minta mereka untuk menggantinya setelah login.</p>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
              {copied ? "✓ Tersalin!" : "Salin"}
            </button>
            <button onClick={onClose} className="flex-1 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 font-semibold">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>(dummyMembers);
  const [showAdd, setShowAdd] = useState(false);
  const [resetTarget, setResetTarget] = useState<Member | null>(null);
  const [search, setSearch] = useState("");

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.phone.includes(search)
  );

  function handleAdd(member: Member) {
    setMembers(prev => [member, ...prev]);
    setShowAdd(false);
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Kelola Member</h2>
          <p className="text-xs text-gray-400 mt-0.5">{members.length} member terdaftar</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Daftarkan Member
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama, email, atau nomor HP..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-black bg-white transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5">Member</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden md:table-cell">Kontak</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden lg:table-cell">Daftar</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden sm:table-cell">Total Booking</th>
                <th className="text-left text-xs font-semibold text-gray-400 tracking-wider uppercase px-5 py-3.5 hidden lg:table-cell">Kunjungan Terakhir</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-sm text-gray-400 py-12">Tidak ada member</td>
                </tr>
              )}
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#9EB3BC]/30 flex items-center justify-center text-xs font-bold text-[#4a6e7a] flex-shrink-0">
                        {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <p className="font-medium text-gray-900 text-xs">{member.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-xs text-gray-700">{member.email}</p>
                    <p className="text-xs text-gray-400">{member.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <p className="text-xs text-gray-700">
                      {new Date(member.joinDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-xs font-semibold text-gray-900">{member.totalBookings}x</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <p className="text-xs text-gray-500">
                      {member.lastVisit === "-" ? "-" : new Date(member.lastVisit).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setResetTarget(member)}
                      className="text-[11px] px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors"
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddMemberModal
          onClose={() => setShowAdd(false)}
          onAdd={(member) => handleAdd(member)}
        />
      )}
      {resetTarget && (
        <ResetPasswordModal member={resetTarget} onClose={() => setResetTarget(null)} />
      )}
    </div>
  );
}