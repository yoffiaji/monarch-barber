// ─────────────────────────────────────────────────────────────
// lib/adminDummyData.ts
// Data dummy untuk dashboard admin kasir — ganti dengan API call nanti
// ─────────────────────────────────────────────────────────────

export type BookingStatus = "upcoming" | "berlangsung" | "selesai" | "dibatalkan";
export type PaymentMethod = "qris" | "cash" | "pending";
export type StockStatus = "aman" | "menipis" | "habis";

export interface Barber {
  id: string;
  name: string;
  avatar: string; // initials fallback
  status: "tersedia" | "melayani" | "libur";
  currentClient?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalBookings: number;
  lastVisit: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // menit
  price: number;
}

export interface Booking {
  id: string;
  memberId?: string;      // undefined = walk-in
  memberName: string;
  isWalkIn: boolean;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string;           // "2026-04-04"
  time: string;           // "09:00"
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  paidAt?: string;
}

export interface Product {
  id: string;
  name: string;
  category: "pomade" | "tonic" | "shampoo" | "oil" | "lainnya";
  stock: number;
  minStock: number;       // batas minimum — set oleh superadmin
  unit: string;           // "pcs", "botol", dll
  price: number;
}

export interface Transaction {
  id: string;
  bookingId: string;
  memberName: string;
  serviceName: string;
  barberName: string;
  paymentMethod: PaymentMethod;
  amount: number;
  paidAt: string;         // "09:45"
}

// ── Cabang aktif (simulasi kasir login) ──────────────────────
export const activeBranch = {
  id: "surakarta",
  name: "Monarch Surakarta",
  address: "Kawasan Laweyan, Surakarta",
  kasir: "Rafi Ardian",
};

// ── Barbers ──────────────────────────────────────────────────
export const dummyBarbers: Barber[] = [
  { id: "b1", name: "Evelyn",  avatar: "EV", status: "melayani", currentClient: "Budi Santoso" },
  { id: "b2", name: "Joel",    avatar: "JL", status: "tersedia" },
  { id: "b3", name: "Lloyd",   avatar: "LL", status: "tersedia" },
  { id: "b4", name: "Sammy",   avatar: "SM", status: "libur" },
];

// ── Services ─────────────────────────────────────────────────
export const dummyServices: Service[] = [
  { id: "s1", name: "Haircut",         duration: 45, price: 100000 },
  { id: "s2", name: "Beard Trim",      duration: 30, price: 60000  },
  { id: "s3", name: "Hot Towel Shave", duration: 30, price: 85000  },
  { id: "s4", name: "Hair Coloring",   duration: 90, price: 250000 },
  { id: "s5", name: "The Gentleman",   duration: 60, price: 150000 },
  { id: "s6", name: "The Executive",   duration: 90, price: 220000 },
  { id: "s7", name: "The Monarch",     duration: 120, price: 320000 },
  { id: "s8", name: "Scalp Treatment", duration: 45, price: 120000 },
];

// ── Members ───────────────────────────────────────────────────
export const dummyMembers: Member[] = [
  { id: "m1", name: "Budi Santoso",    email: "budi@gmail.com",    phone: "081234567890", joinDate: "2025-01-10", totalBookings: 12, lastVisit: "2026-04-01" },
  { id: "m2", name: "Andi Wijaya",     email: "andi@gmail.com",    phone: "081298765432", joinDate: "2025-03-22", totalBookings: 7,  lastVisit: "2026-03-28" },
  { id: "m3", name: "Riko Pratama",    email: "riko@gmail.com",    phone: "085612345678", joinDate: "2025-06-05", totalBookings: 4,  lastVisit: "2026-03-15" },
  { id: "m4", name: "Denny Kurniawan", email: "denny@gmail.com",   phone: "087812345678", joinDate: "2025-08-17", totalBookings: 9,  lastVisit: "2026-04-02" },
  { id: "m5", name: "Fajar Nugroho",   email: "fajar@gmail.com",   phone: "089912345678", joinDate: "2025-11-30", totalBookings: 2,  lastVisit: "2026-02-20" },
  { id: "m6", name: "Hendra Saputra",  email: "hendra@gmail.com",  phone: "081312345678", joinDate: "2026-01-08", totalBookings: 3,  lastVisit: "2026-04-03" },
];

// ── Bookings (hari ini: 2026-04-04) ───────────────────────────
export const dummyBookings: Booking[] = [
  { id: "bk1",  memberId: "m1", memberName: "Budi Santoso",    isWalkIn: false, serviceId: "s1", serviceName: "Haircut",         barberId: "b1", barberName: "Evelyn", date: "2026-04-04", time: "09:00", status: "berlangsung", paymentMethod: "pending",  totalPrice: 100000 },
  { id: "bk2",  memberId: "m2", memberName: "Andi Wijaya",     isWalkIn: false, serviceId: "s5", serviceName: "The Gentleman",   barberId: "b2", barberName: "Joel",   date: "2026-04-04", time: "09:30", status: "upcoming",     paymentMethod: "pending",  totalPrice: 150000 },
  { id: "bk3",  memberId: "m4", memberName: "Denny Kurniawan", isWalkIn: false, serviceId: "s6", serviceName: "The Executive",   barberId: "b3", barberName: "Lloyd",  date: "2026-04-04", time: "10:00", status: "upcoming",     paymentMethod: "pending",  totalPrice: 220000 },
  { id: "bk4",  memberId: "m6", memberName: "Hendra Saputra",  isWalkIn: false, serviceId: "s2", serviceName: "Beard Trim",      barberId: "b2", barberName: "Joel",   date: "2026-04-04", time: "10:30", status: "upcoming",     paymentMethod: "pending",  totalPrice: 60000  },
  { id: "bk5",  memberId: "m3", memberName: "Riko Pratama",    isWalkIn: false, serviceId: "s8", serviceName: "Scalp Treatment", barberId: "b1", barberName: "Evelyn", date: "2026-04-04", time: "11:00", status: "upcoming",     paymentMethod: "pending",  totalPrice: 120000 },
  { id: "bk6",  memberId: undefined, memberName: "Walk-in #1", isWalkIn: true,  serviceId: "s1", serviceName: "Haircut",         barberId: "b3", barberName: "Lloyd",  date: "2026-04-04", time: "11:30", status: "upcoming",     paymentMethod: "pending",  totalPrice: 100000 },
  { id: "bk7",  memberId: "m5", memberName: "Fajar Nugroho",   isWalkIn: false, serviceId: "s7", serviceName: "The Monarch",     barberId: "b2", barberName: "Joel",   date: "2026-04-04", time: "13:00", status: "upcoming",     paymentMethod: "pending",  totalPrice: 320000 },
  // Sudah selesai hari ini
  { id: "bk8",  memberId: "m2", memberName: "Andi Wijaya",     isWalkIn: false, serviceId: "s1", serviceName: "Haircut",         barberId: "b1", barberName: "Evelyn", date: "2026-04-04", time: "08:00", status: "selesai",      paymentMethod: "qris",     totalPrice: 100000, paidAt: "08:52" },
  { id: "bk9",  memberId: undefined, memberName: "Walk-in #2", isWalkIn: true,  serviceId: "s2", serviceName: "Beard Trim",      barberId: "b3", barberName: "Lloyd",  date: "2026-04-04", time: "08:30", status: "selesai",      paymentMethod: "cash",     totalPrice: 60000,  paidAt: "09:10" },
  { id: "bk10", memberId: "m1", memberName: "Budi Santoso",    isWalkIn: false, serviceId: "s3", serviceName: "Hot Towel Shave", barberId: "b2", barberName: "Joel",   date: "2026-04-04", time: "07:30", status: "selesai",      paymentMethod: "cash",     totalPrice: 85000,  paidAt: "08:05" },
];

// ── Products / Stok ───────────────────────────────────────────
export const dummyProducts: Product[] = [
  { id: "p1", name: "Pomade Matte",         category: "pomade",  stock: 15, minStock: 5,  unit: "pcs",   price: 85000 },
  { id: "p2", name: "Pomade Glossy",        category: "pomade",  stock: 3,  minStock: 5,  unit: "pcs",   price: 85000 },
  { id: "p3", name: "Hair Tonic",           category: "tonic",   stock: 8,  minStock: 5,  unit: "botol", price: 60000 },
  { id: "p4", name: "Shampoo & Conditioner",category: "shampoo", stock: 0,  minStock: 3,  unit: "botol", price: 70000 },
  { id: "p5", name: "Beard Oil",            category: "oil",     stock: 6,  minStock: 4,  unit: "botol", price: 75000 },
  { id: "p6", name: "Styling Clay",         category: "pomade",  stock: 4,  minStock: 5,  unit: "pcs",   price: 90000 },
  { id: "p7", name: "Hair Spray",           category: "lainnya", stock: 2,  minStock: 3,  unit: "botol", price: 55000 },
  { id: "p8", name: "Conditioner Extra",    category: "shampoo", stock: 10, minStock: 3,  unit: "botol", price: 65000 },
];

// ── Transactions (hari ini) ───────────────────────────────────
export const dummyTransactions: Transaction[] = [
  { id: "tx1", bookingId: "bk10", memberName: "Budi Santoso",  serviceName: "Hot Towel Shave", barberName: "Joel",   paymentMethod: "cash", amount: 85000,  paidAt: "08:05" },
  { id: "tx2", bookingId: "bk9",  memberName: "Walk-in #2",    serviceName: "Beard Trim",      barberName: "Lloyd",  paymentMethod: "cash", amount: 60000,  paidAt: "09:10" },
  { id: "tx3", bookingId: "bk8",  memberName: "Andi Wijaya",   serviceName: "Haircut",         barberName: "Evelyn", paymentMethod: "qris", amount: 100000, paidAt: "08:52" },
];

// ── Helper functions ──────────────────────────────────────────

export function getStockStatus(product: Product): StockStatus {
  if (product.stock === 0) return "habis";
  if (product.stock <= product.minStock) return "menipis";
  return "aman";
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getTodayStats() {
  const today = dummyBookings.filter(b => b.date === "2026-04-04");
  return {
    total:        today.length,
    selesai:      today.filter(b => b.status === "selesai").length,
    berlangsung:  today.filter(b => b.status === "berlangsung").length,
    upcoming:     today.filter(b => b.status === "upcoming").length,
    pendapatan:   dummyTransactions.reduce((sum, t) => sum + t.amount, 0),
    pendapatanQris: dummyTransactions.filter(t => t.paymentMethod === "qris").reduce((sum, t) => sum + t.amount, 0),
    pendapatanCash: dummyTransactions.filter(t => t.paymentMethod === "cash").reduce((sum, t) => sum + t.amount, 0),
  };
}

export function getLowStockProducts(): Product[] {
  return dummyProducts.filter(p => getStockStatus(p) !== "aman");
}