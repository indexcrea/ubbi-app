"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="bg-[#2A1464] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#009FEF] uppercase tracking-widest block">
              Tarification Transparente
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Des tarifs simples sans frais cachés.</h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Créez et publiez vos événements gratuitement. Payez uniquement une commission sur les billets vendus.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2E4ED] shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#666A80] uppercase tracking-wider block mb-1">
                  Gratuit / Événements Gratuits
                </span>
                <h3 className="text-2xl font-extrabold text-[#111326]">0 FCFA</h3>
                <p className="text-xs text-[#666A80] mt-1">
                  Pour tous vos événements à accès gratuit ou sur invitation.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#111326]">
                  {["Création illimitée d'événements", "Billets QR digitaux", "Scanner mobile d'accès", "Support par email"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#009FEF]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/organizers/create"
                className="w-full bg-slate-100 text-[#111326] font-bold py-3 rounded-xl text-center text-xs block hover:bg-slate-200"
              >
                Créer un événement gratuit
              </Link>
            </div>

            {/* Plan 2: Pro (Highlighted) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#009FEF] shadow-xl space-y-6 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#009FEF] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Le Plus Populaire
              </div>

              <div>
                <span className="text-xs font-bold text-[#009FEF] uppercase tracking-wider block mb-1">
                  Standard Organisateurs
                </span>
                <h3 className="text-2xl font-extrabold text-[#2A1464]">5% par billet</h3>
                <p className="text-xs text-[#666A80] mt-1">
                  Pas d'abonnement mensuel. Frais uniquement prélevés à la vente.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#111326]">
                  {[
                    "Vente Wave & Orange Money",
                    "Catégories de billets illimitées",
                    "Reversement automatique des fonds",
                    "Statistiques de vente en direct",
                    "Scanner d'entrée multi-contrôleurs",
                    "Support dédié 7j/7 WhatsApp",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#009FEF]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/organizers/create"
                className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold py-3.5 rounded-xl text-center text-xs block shadow-md"
              >
                Commencer la vente
              </Link>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2E4ED] shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#2A1464] uppercase tracking-wider block mb-1">
                  Grands Festivals &amp; Arenas
                </span>
                <h3 className="text-2xl font-extrabold text-[#111326]">Sur Mesure</h3>
                <p className="text-xs text-[#666A80] mt-1">
                  Pour les jauges de plus de 5 000 personnes et festivals majeurs.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#111326]">
                  {[
                    "Taux personnalisé dégressif",
                    "Équipe de sécurité d'accès sur site",
                    "Terminaux physiques de scan Ubbi",
                    "Accompagnement marketing dédié",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#2A1464]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full bg-[#2A1464] text-white font-bold py-3 rounded-xl text-center text-xs block hover:bg-[#1F0D4F]"
              >
                Contacter l'équipe Pro
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
