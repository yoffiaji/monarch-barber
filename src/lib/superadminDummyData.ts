// ─────────────────────────────────────────────────────────────
// lib/superadminDummyData.ts
// Data dummy untuk dashboard Super Admin — multi-cabang
// ─────────────────────────────────────────────────────────────

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  openingHours: string;
  phone: string;
  isActive: boolean;
  adminCount: number;
  barberCount: number;
  openedSince: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  branchId: string;
  branchName: string;
  role: "admin" | "kasir";
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface BranchBarber {
  id: string;
  name: string;
  branchId: string;
  branchName: string;
  avatar: string;
  specialization: string[];
  joinDate: string;
  isActive: boolean;
  rating: number;
  totalServices: number;
}

export interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  duration: number; // menit
  basePrice: number;
  category: "haircut" | "beard" | "treatment" | "package";
  isActive: boolean;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  date: string; // "2026-04-04"
  totalBookings: number;
  completedBookings: number;
  revenue: number;
  qrisRevenue: number;
  cashRevenue: number;
  topService: string;
  avgRating: number;
}

export interface StockAlert {
  id: string;
  branchId: string;
  branchName: string;
  productName: string;
  currentStock: number;
  minStock: number;
  status: "menipis" | "habis";
  lastUpdated: string;
}

export interface MonthlyRevenue {
  month: string; // "Jan 2026"
  surakarta: number;
  yogyakarta: number;
  total: number;
}

// ── Branches ──────────────────────────────────────────────────
export const branches: Branch[] = [
  {
    id: "surakarta",
    name: "Monarch Surakarta",
    city: "Surakarta",
    address: "Kawasan Laweyan, Surakarta",
    openingHours: "09:00 - 21:00",
    phone: "+62 271 123 4567",
    isActive: true,
    adminCount: 2,
    barberCount: 4,
    openedSince: "2014-03-15",
  },
  {
    id: "yogyakarta",
    name: "Monarch Yogyakarta",
    city: "Yogyakarta",
    address: "Kawasan Malioboro, Yogyakarta",
    openingHours: "09:00 - 21:00",
    phone: "+62 274 987 6543",
    isActive: true,
    adminCount: 2,
    barberCount: 5,
    openedSince: "2019-06-20",
  },
];

// ── Admin Accounts ────────────────────────────────────────────
export const adminAccounts: AdminAccount[] = [
  {
    id: "adm1",
    name: "Rafi Ardian",
    email: "rafi@monarch.com",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    role: "admin",
    isActive: true,
    lastLogin: "2026-04-04 08:30",
    createdAt: "2023-01-10",
  },
  {
    id: "adm2",
    name: "Siti Nurhaliza",
    email: "siti@monarch.com",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    role: "kasir",
    isActive: true,
    lastLogin: "2026-04-03 14:20",
    createdAt: "2023-06-15",
  },
  {
    id: "adm3",
    name: "Budi Santoso",
    email: "budi@monarch.com",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    role: "admin",
    isActive: true,
    lastLogin: "2026-04-04 07:45",
    createdAt: "2022-11-20",
  },
  {
    id: "adm4",
    name: "Dewi Lestari",
    email: "dewi@monarch.com",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    role: "kasir",
    isActive: true,
    lastLogin: "2026-04-04 09:00",
    createdAt: "2024-02-08",
  },
  {
    id: "adm5",
    name: "Ahmad Fauzi",
    email: "ahmad@monarch.com",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    role: "kasir",
    isActive: false,
    lastLogin: "2026-02-15 11:30",
    createdAt: "2021-08-12",
  },
];

// ── All Barbers (across branches) ─────────────────────────────
export const allBarbers: BranchBarber[] = [
  // Surakarta
  {
    id: "b1",
    name: "Evelyn",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    avatar: "EV",
    specialization: ["Haircut", "Hair Coloring"],
    joinDate: "2015-04-10",
    isActive: true,
    rating: 4.8,
    totalServices: 1247,
  },
  {
    id: "b2",
    name: "Joel",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    avatar: "JL",
    specialization: ["Beard Trim", "Hot Towel Shave"],
    joinDate: "2016-02-18",
    isActive: true,
    rating: 4.9,
    totalServices: 1523,
  },
  {
    id: "b3",
    name: "Lloyd",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    avatar: "LL",
    specialization: ["Haircut", "Scalp Treatment"],
    joinDate: "2018-07-22",
    isActive: true,
    rating: 4.7,
    totalServices: 892,
  },
  {
    id: "b4",
    name: "Sammy",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    avatar: "SM",
    specialization: ["Hair Coloring", "The Monarch"],
    joinDate: "2020-11-05",
    isActive: true,
    rating: 4.6,
    totalServices: 543,
  },
  // Yogyakarta
  {
    id: "b5",
    name: "Rafael",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    avatar: "RF",
    specialization: ["Haircut", "The Executive"],
    joinDate: "2019-08-10",
    isActive: true,
    rating: 4.9,
    totalServices: 1089,
  },
  {
    id: "b6",
    name: "David",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    avatar: "DV",
    specialization: ["Beard Trim", "Hot Towel Shave"],
    joinDate: "2020-01-15",
    isActive: true,
    rating: 4.8,
    totalServices: 967,
  },
  {
    id: "b7",
    name: "Marcus",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    avatar: "MC",
    specialization: ["Hair Coloring", "Scalp Treatment"],
    joinDate: "2021-03-20",
    isActive: true,
    rating: 4.7,
    totalServices: 734,
  },
  {
    id: "b8",
    name: "Felix",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    avatar: "FX",
    specialization: ["The Gentleman", "The Monarch"],
    joinDate: "2022-05-12",
    isActive: true,
    rating: 4.6,
    totalServices: 445,
  },
  {
    id: "b9",
    name: "Adrian",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    avatar: "AD",
    specialization: ["Haircut"],
    joinDate: "2023-09-08",
    isActive: false,
    rating: 4.5,
    totalServices: 156,
  },
];

// ── Service Configurations (Master Data) ──────────────────────
export const serviceConfigs: ServiceConfig[] = [
  {
    id: "s1",
    name: "Haircut",
    description: "Classic men's haircut with precision styling",
    duration: 45,
    basePrice: 100000,
    category: "haircut",
    isActive: true,
  },
  {
    id: "s2",
    name: "Beard Trim",
    description: "Professional beard shaping and grooming",
    duration: 30,
    basePrice: 60000,
    category: "beard",
    isActive: true,
  },
  {
    id: "s3",
    name: "Hot Towel Shave",
    description: "Traditional wet shave with hot towel treatment",
    duration: 30,
    basePrice: 85000,
    category: "beard",
    isActive: true,
  },
  {
    id: "s4",
    name: "Hair Coloring",
    description: "Professional hair coloring service",
    duration: 90,
    basePrice: 250000,
    category: "haircut",
    isActive: true,
  },
  {
    id: "s5",
    name: "The Gentleman",
    description: "Haircut + Beard Trim + Hot Towel",
    duration: 60,
    basePrice: 150000,
    category: "package",
    isActive: true,
  },
  {
    id: "s6",
    name: "The Executive",
    description: "Haircut + Hair Wash + Scalp Treatment + Styling",
    duration: 90,
    basePrice: 220000,
    category: "package",
    isActive: true,
  },
  {
    id: "s7",
    name: "The Monarch",
    description: "Full grooming package with premium treatment",
    duration: 120,
    basePrice: 320000,
    category: "package",
    isActive: true,
  },
  {
    id: "s8",
    name: "Scalp Treatment",
    description: "Deep scalp cleansing and nourishment",
    duration: 45,
    basePrice: 120000,
    category: "treatment",
    isActive: true,
  },
];

// ── Branch Performance (Last 7 days) ──────────────────────────
export const branchPerformance: BranchPerformance[] = [
  // Surakarta - Today
  {
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    date: "2026-04-04",
    totalBookings: 18,
    completedBookings: 12,
    revenue: 2450000,
    qrisRevenue: 1470000,
    cashRevenue: 980000,
    topService: "Haircut",
    avgRating: 4.8,
  },
  // Yogyakarta - Today
  {
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    date: "2026-04-04",
    totalBookings: 22,
    completedBookings: 15,
    revenue: 3180000,
    qrisRevenue: 2226000,
    cashRevenue: 954000,
    topService: "The Gentleman",
    avgRating: 4.9,
  },
  // Previous days...
  {
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    date: "2026-04-03",
    totalBookings: 16,
    completedBookings: 16,
    revenue: 2280000,
    qrisRevenue: 1368000,
    cashRevenue: 912000,
    topService: "The Executive",
    avgRating: 4.7,
  },
  {
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    date: "2026-04-03",
    totalBookings: 19,
    completedBookings: 19,
    revenue: 2890000,
    qrisRevenue: 1734000,
    cashRevenue: 1156000,
    topService: "Haircut",
    avgRating: 4.8,
  },
];

// ── Stock Alerts (Cross-branch) ───────────────────────────────
export const stockAlerts: StockAlert[] = [
  {
    id: "sa1",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    productName: "Pomade Glossy",
    currentStock: 3,
    minStock: 5,
    status: "menipis",
    lastUpdated: "2026-04-04 08:30",
  },
  {
    id: "sa2",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    productName: "Shampoo & Conditioner",
    currentStock: 0,
    minStock: 3,
    status: "habis",
    lastUpdated: "2026-04-03 15:20",
  },
  {
    id: "sa3",
    branchId: "surakarta",
    branchName: "Monarch Surakarta",
    productName: "Hair Spray",
    currentStock: 2,
    minStock: 3,
    status: "menipis",
    lastUpdated: "2026-04-04 10:15",
  },
  {
    id: "sa4",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    productName: "Beard Oil",
    currentStock: 1,
    minStock: 4,
    status: "menipis",
    lastUpdated: "2026-04-04 09:00",
  },
  {
    id: "sa5",
    branchId: "yogyakarta",
    branchName: "Monarch Yogyakarta",
    productName: "Hair Tonic",
    currentStock: 0,
    minStock: 5,
    status: "habis",
    lastUpdated: "2026-04-03 18:45",
  },
];

// ── Monthly Revenue Trend (Last 6 months) ─────────────────────
export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Nov 2025", surakarta: 42500000, yogyakarta: 51200000, total: 93700000 },
  { month: "Des 2025", surakarta: 48300000, yogyakarta: 56800000, total: 105100000 },
  { month: "Jan 2026", surakarta: 51200000, yogyakarta: 62400000, total: 113600000 },
  { month: "Feb 2026", surakarta: 47800000, yogyakarta: 58900000, total: 106700000 },
  { month: "Mar 2026", surakarta: 53600000, yogyakarta: 64300000, total: 117900000 },
  { month: "Apr 2026", surakarta: 9800000, yogyakarta: 12720000, total: 22520000 }, // partial month
];

// ── Helper Functions ───────────────────────────────────────────
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getTodayAggregateStats() {
  const today = branchPerformance.filter((p) => p.date === "2026-04-04");
  const total = {
    bookings: today.reduce((sum, p) => sum + p.totalBookings, 0),
    completed: today.reduce((sum, p) => sum + p.completedBookings, 0),
    revenue: today.reduce((sum, p) => sum + p.revenue, 0),
    qrisRevenue: today.reduce((sum, p) => sum + p.qrisRevenue, 0),
    cashRevenue: today.reduce((sum, p) => sum + p.cashRevenue, 0),
  };
  return { today, total };
}

export function getLast7DaysRevenue(branchId?: string) {
  const data = branchId
    ? branchPerformance.filter((p) => p.branchId === branchId)
    : branchPerformance;
  return data.sort((a, b) => a.date.localeCompare(b.date));
}

export function getActiveBarbersByBranch(branchId: string) {
  return allBarbers.filter((b) => b.branchId === branchId && b.isActive);
}

export function getCriticalStockAlerts() {
  return stockAlerts.filter((s) => s.status === "habis");
}

export function getAdminsByBranch(branchId: string) {
  return adminAccounts.filter((a) => a.branchId === branchId && a.isActive);
}