"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Products", href: "/products" },
  { name: "AI Assistant", href: "/ai" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08184A]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span className="text-[#D39B35]">RITZ MEDIA</span>{" "}
            <span className="font-medium text-[#B68A2A]">WORLD</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4 lg:gap-8">
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-semibold text-white transition hover:text-[#D39B35]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            className="hidden rounded-md bg-[#D39B35] px-7 py-3 text-lg font-semibold text-white transition hover:bg-[#bc872b] lg:block"
          >
            Free Consulting
          </Link>

          <button
            type="button"
            className="text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={36} /> : <Menu size={40} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#08184A] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/10"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-[#D39B35] px-3 py-3 text-center font-semibold text-white"
            >
              Free Consulting
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
