"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UbbiLogo } from "@/components/brand/UbbiLogo";
import { UbbiDoorMetaphor } from "@/components/brand/UbbiDoorMetaphor";
import { Sparkles, ShieldCheck, Heart, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="bg-[#2A1464] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <UbbiLogo variant="light" height={42} />
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
              L'expérience événementielle africaine repensée.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Ubbi est née de la volonté d'offrir au public et aux organisateurs africains une billetterie moderne, rapide et ultra-sécurisée.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
          <div className="bg-white rounded-3xl p-8 border border-[#E2E4ED] shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#111326]">Notre Mission</h2>
            <p className="text-[#666A80] leading-relaxed text-sm sm:text-base">
              Accéder à un concert, un festival ou une conférence ne devrait jamais être synonyme de files d'attente interminables ou d'incertitude quant à l'authenticité des billets.
              Ubbi transforme l'accès aux événements grâce au symbole de la porte s'ouvrant sur l'expérience ("Door Access").
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] space-y-2">
              <span className="text-xs font-bold text-[#009FEF] uppercase tracking-wider block">Technologie</span>
              <h3 className="text-lg font-bold text-[#111326]">QR Code SecuPass™</h3>
              <p className="text-xs text-[#666A80]">
                Chaque billet Ubbi est généré avec une signature cryptographique unique scannable hors-ligne par nos terminaux.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] space-y-2">
              <span className="text-xs font-bold text-[#2A1464] uppercase tracking-wider block">Ancrage Local</span>
              <h3 className="text-lg font-bold text-[#111326]">Conçu pour le Sénégal</h3>
              <p className="text-xs text-[#666A80]">
                Intégration directe des moyens de paiement mobiles Wave et Orange Money sans friction.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
