"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

const navLinks = [
    { name: "Services", href: "#" },
    { name: "Our Work", href: "#" },
    { name: "Company", href: "#" },
    { name: "Contact", href: "#" },
];

export default function Navbar() {
    return (
        <header className="w-full bg-[#08184A]">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span className="text-[#D39B35]">RITZ MEDIA</span>{" "}
                        <span className="text-[#B68A2A] font-medium">WORLD</span>
                    </h1>
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-8">

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

                    <button className="hidden rounded-md bg-[#D39B35] px-7 py-3 text-lg font-semibold text-white transition hover:bg-[#bc872b] lg:block">
                        Free Consulting
                    </button>

                    <button className="text-white">
                        <Menu size={40} strokeWidth={2.2} />
                    </button>
                </div>
            </div>
        </header>
    );
}