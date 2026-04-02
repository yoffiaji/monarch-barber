import { NavItem, BarbershopLocation } from "@/types";

export const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "BARBERSHOPS",
    href: "#",
    children: [
      { label: "SURAKARTA", href: "/surakarta" },
      { label: "YOGYAKARTA", href: "/yogyakarta" },
    ],
  },
];

export const rightNavItems: NavItem[] = [
  {
    label: "BLOG",
    href: "#",
    children: [
      {
        label: "Historical & Cultural Barbering Stories",
        href: "/blogs/barbering",
      },
    ],
  },
  { label: "GET IN TOUCH", href: "/contact" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/nomadbarber" },
  { label: "Mail", href: "mailto:hello@nomadbarber.com" },
  { label: "Instagram", href: "https://www.instagram.com/nomadbarber" },
  { label: "YouTube", href: "https://www.youtube.com/nomadbarber" },
];

export const footerLocations = [
    { label: "SURAKARTA", href: "/surakarta" },
    { label: "YOGYAKARTA", href: "/yogyakarta" },
];

export const barbershopLocations: BarbershopLocation[] = [
  {
    city: "SURAKARTA",
    href: "/surakarta",
    description:
      "Monarch Surakarta adalah barbershop premium yang telah berdiri sejak 2014, berlokasi di kawasan Laweyan, Surakarta. Kami menghadirkan layanan grooming terbaik dengan standar tinggi untuk pelanggan setia kami.",
    bookingUrl: "/london#book",
    order: "1st",
  },
  {
    city: "YOGYAKARTA",
    href: "/yogyakarta",
    description:
      "Monarch Yogyakarta merupakan cabang kedua dari brand Monarch, yang dibuka di kawasan ikonik Malioboro untuk menghadirkan layanan barber premium dengan pengalaman modern di jantung kota.",
    bookingUrl: "/berlin#book",
    order: "2nd",
  },
];