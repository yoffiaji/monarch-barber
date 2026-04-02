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
  { label: "Surakarta", href: "/surakarta" },
  { label: "Yogyakarta", href: "/yogyakarta" },
];

export const barbershopLocations: BarbershopLocation[] = [
  {
    city: "SURAKARTA",
    href: "/surakarta",
    description:
      "Nomad Hackney is an award-winning barbershop located in the heart of London's famous east end. Offering the finest grooming services since 2014 to its loyal client base.",
    bookingUrl: "https://nomadhackney.resurva.com",
    order: "1st",
  },
  {
    city: "YOGYAKARTA",
    href: "/yogyakarta",
    description:
      "Nomad Kreuzberg is the second location from the nomad barber brand, we opened in the creative and upcoming area of Kreuzberg to offer the finest barbering services and coffee in Berlin.",
    bookingUrl: "https://nomadkreuzberg.resurva.com",
    order: "2nd",
  },
];