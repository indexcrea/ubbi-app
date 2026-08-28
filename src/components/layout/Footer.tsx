import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0331] text-white pt-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Left Column: Brand info with exact Monogram U matching Navbar */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block flex-shrink-0 group focus:outline-none">
              <img
                src="/ubbi-monogramme-u.png"
                alt="Ubbi Monogramme U"
                className="w-[42px] sm:w-[46px] h-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Simplifiez l'organisation de vos événements, nous sécurisons chaque accès.
            </p>
          </div>

          {/* Column 1: Liens utiles */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Liens utiles</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/events" className="hover:text-[#009FEF] transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/organizers" className="hover:text-[#009FEF] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#009FEF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Légal */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#009FEF] transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#009FEF] transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#009FEF] transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Suivez-nous */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Suivez-nous</h4>
            <div className="flex items-center space-x-3 text-white">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#009FEF] hover:bg-[#009FEF] transition-colors text-xs font-bold shadow-xs"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#009FEF] hover:bg-[#009FEF] transition-colors text-xs font-bold shadow-xs"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#009FEF] hover:bg-[#009FEF] transition-colors text-xs font-bold shadow-xs"
                title="X"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Electric Blue Bottom Band */}
      <div className="bg-[#009FEF] py-4 text-center text-xs text-white font-medium">
        © 2026 Ubbi. Tous droits réservés.
      </div>
    </footer>
  );
};
