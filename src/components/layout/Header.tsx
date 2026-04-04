"use client";

import { useState, useRef, useEffect } from "react";
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
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (item.children) {
    return (
      <li className="relative" ref={ref}>
        <button
          className="flex items-center gap-1 text-xs tracking-widest text-gray-800 hover:text-black py-2 font-medium"
          onClick={() => setOpen((prev) => !prev)}
        >
          {item.label}
          <svg
            className={`w-2.5 h-2.5 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 10 6"
            fill="none"
          >
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
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // ✅ Fixed: lookup by label, not by hardcoded index
  const allMobileItems = [...navItems, ...rightNavItems];

  function toggleDropdown(label: string) {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <header className="sticky top-0 z-50 bg-[#EBEBEB]">
      <div className="max-w-[93.5rem] mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-[72px] md:h-[88px]">

          {/* Left nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            <nav>
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <NavItemComponent key={item.label} item={item} />
                ))}
              </ul>
            </nav>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 -ml-2"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✕" : "≡"}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/">
              <Image
                src="/images/shared/logo.webp"
                alt="Monarch Barber"
                width={155}
                height={29}
                className="h-7 w-auto"
              />
            </Link>
          </div>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            <ul className="flex items-center gap-8">
              {rightNavItems.map((item) => (
                <NavItemComponent key={item.label} item={item} />
              ))}
            </ul>
          </div>

          <div className="lg:hidden w-9" />
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4">
            <ul className="space-y-1">
              {allMobileItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      {/* ✅ Fixed: driven by data, not hardcoded index */}
                      <button
                        className="w-full text-left py-2 text-xs tracking-widest font-medium text-gray-800 hover:text-black flex items-center justify-between"
                        onClick={() => toggleDropdown(item.label)}
                      >
                        {item.label}
                        <svg
                          className={`w-2.5 h-2.5 transition-transform ${openDropdowns[item.label] ? "rotate-180" : ""}`}
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      {openDropdowns[item.label] && (
                        <ul className="pl-4 mt-1 space-y-1 border-l border-gray-200">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className="block py-1.5 text-xs tracking-widest text-gray-600 hover:text-black"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-xs tracking-widest font-medium text-gray-800 hover:text-black"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <ul className="flex gap-4 flex-wrap">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-xs tracking-widest text-gray-500 hover:text-black"
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