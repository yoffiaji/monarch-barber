"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, rightNavItems, socialLinks } from "@/lib/data";
import { NavItem } from "@/types";

function DropdownMenu({ items }: { items: NavItem[] }) {
  return (
    <ul className="absolute top-full left-0 min-w-[200px] bg-white border border-gray-100 shadow-lg z-50 py-1">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="block px-4 py-2 text-xs tracking-widest text-gray-800 hover:bg-gray-50 transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="flex items-center gap-1 text-xs tracking-widest text-gray-800 hover:text-black py-2 font-medium">
          {item.label}
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 6" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
              fill="currentColor"
            />
          </svg>
        </button>
        {open && <DropdownMenu items={item.children} />}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className="text-xs tracking-widest text-gray-800 hover:text-black py-2 font-medium"
      >
        {item.label}
      </Link>
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopsOpen, setMobileShopsOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#EBEBEB]">
      {/* UBAH BARIS INI: Menambah padding lg:px-24 dan xl:px-32 agar sama persis dengan web asli */}
      <div className="max-w-[93.5rem] mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-[72px] md:h-[88px]">

          {/* Left nav - desktop */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            <nav>
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <NavItemComponent key={item.label} item={item} />
                ))}
              </ul>
            </nav>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 17" className="w-5 h-5">
                <path
                  d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" className="w-5 h-5">
                <path
                  d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {/* Logo - center (desktop & mobile) */}
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/">
              <Image
                src="/images/shared/logo.webp"
                alt="Nomad Barber"
                width={155}
                height={29}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right nav - desktop */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            <nav>
              <ul className="flex items-center gap-8">
                {rightNavItems.map((item) => (
                  <NavItemComponent key={item.label} item={item} />
                ))}
              </ul>
            </nav>
          </div>

          {/* Spacer for mobile (balances hamburger on the left) */}
          <div className="lg:hidden w-9" />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4">
            <ul className="space-y-0">
              <li>
                <Link
                  href="/"
                  className="block py-3 text-sm tracking-widest font-medium border-b border-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li className="border-b border-gray-50">
                <button
                  className="flex items-center justify-between w-full py-3 text-sm tracking-widest font-medium"
                  onClick={() => setMobileShopsOpen(!mobileShopsOpen)}
                >
                  BARBERSHOPS
                  <svg className={`w-3 h-3 transition-transform ${mobileShopsOpen ? "rotate-90" : ""}`} viewBox="0 0 14 10" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                {mobileShopsOpen && (
                  <ul className="pl-4 pb-2 space-y-1">
                    {navItems[1].children?.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          className="block py-2 text-sm tracking-wider text-gray-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-50">
                <button
                  className="flex items-center justify-between w-full py-3 text-sm tracking-widest font-medium"
                  onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                >
                  BLOG
                  <svg className={`w-3 h-3 transition-transform ${mobileBlogOpen ? "rotate-90" : ""}`} viewBox="0 0 14 10" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                {mobileBlogOpen && (
                  <ul className="pl-4 pb-2">
                    <li>
                      <Link
                        href="/blogs/barbering"
                        className="block py-2 text-sm tracking-wider text-gray-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        Historical & Cultural Barbering Stories
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-3 text-sm tracking-widest font-medium border-b border-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  GET IN TOUCH
                </Link>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <ul className="flex flex-wrap gap-4">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-xs tracking-widest text-gray-500 hover:text-black transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}