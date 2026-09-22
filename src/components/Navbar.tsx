"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Work", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Calculate scroll progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border"
                    : "bg-transparent"
                }`}
        >
            {/* Scroll progress bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent">
                <div
                    className="h-full rounded-r-full transition-[width] duration-150 ease-out"
                    style={{
                        width: `${scrollProgress}%`,
                        background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1, #3b82f6, #06b6d4, #10b981)",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#"
                        className="text-xl font-bold text-text-primary hover:text-accent transition-colors"
                    >
                        DS<span className="text-accent">.</span>
                    </a>

                    {/* Desktop nav — centered */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent 
                           transition-colors duration-200 rounded-lg hover:bg-accent/5"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-xl bg-card border border-border hover:border-accent 
                         transition-all duration-300 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <X className="w-5 h-5 text-text-primary" />
                            ) : (
                                <Menu className="w-5 h-5 text-text-primary" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 pt-2 bg-background/95 backdrop-blur-xl border-b border-border">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-accent 
                         hover:bg-accent/5 rounded-lg transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
