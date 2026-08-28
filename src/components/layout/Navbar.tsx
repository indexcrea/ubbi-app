"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Événements", href: "/events" },
    { label: "Solutions", href: "/organizers" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0331] border-b border-white/10 ${
        isScrolled ? "py-3 shadow-lg" : "py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Monogramme U (NAVBAR UNIQUEMENT - Asset UBBI_MONOGRAMME_U sans lueur) */}
          <Link href="/" className="inline-block flex-shrink-0 group focus:outline-none">
            <img
              src="/ubbi-monogramme-u.png"
              alt="Ubbi Monogramme U"
              className="w-[42px] sm:w-[46px] h-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold relative transition-colors ${
                    isActive ? "text-[#009FEF]" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#009FEF] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Essayer Ubbi */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/register"
              className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Essayer Ubbi
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-200 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0331] border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold py-1 transition-colors ${
                    isActive ? "text-[#009FEF]" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold text-sm py-3 rounded-full shadow-md text-center block"
            >
              Essayer Ubbi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
