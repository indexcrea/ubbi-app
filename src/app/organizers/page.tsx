"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UbbiDoorMetaphor } from "@/components/brand/UbbiDoorMetaphor";
import {
  Zap,
  BarChart3,
  QrCode,
  CheckCircle2,
  PlusCircle,
  Calculator,
  Smartphone,
  WifiOff,
  Printer,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Building2,
  Download,
} from "lucide-react";

export default function OrganizersPage() {
  // Simulator State
  const [ticketCount, setTicketCount] = useState<number>(1000);
  const [ticketPrice, setTicketPrice] = useState<number>(10000);

  // Calculations (3.5% platform fee example)
  const grossRevenue = ticketCount * ticketPrice;
  const platformFeePercentage = 0.035;
  const platformFee = Math.round(grossRevenue * platformFeePercentage);
  const netRevenue = grossRevenue - platformFee;

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat("fr-FR").format(val) + " FCFA";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      {/* Navbar avec fond solide #0a0331 */}
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* ========================================================= */}
        {/* 1. ORGANIZER HERO BANNER (Dégradé #190262 0% -> #24027D 100%) */}
        {/* ========================================================= */}
        <section
          className="text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10"
          style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <span className="bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Espace Organisateurs Ubbi
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
              Propulsez vos événements avec la billetterie nouvelle génération.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Créez vos événements en 2 minutes, vendez vos billets via Wave &amp; OM, et contrôlez vos accès en toute simplicité.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/organizers/create"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold px-8 py-4 rounded-full shadow-lg text-base transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Créer mon événement maintenant</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. SIMULATEUR DE REVENUS EN DIRECT                        */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#190262] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Header section */}
            <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Simulateur de <span className="text-[#009FEF]">revenus en direct</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Estimez immédiatement vos recettes nettes et découvrez la rentabilité de votre billetterie.
              </p>
            </div>

            {/* Interactive Sliders & Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Sliders Input Column */}
              <div className="lg:col-span-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 space-y-8">
                {/* Slider 1: Ticket Quantity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-bold text-slate-200">Nombre de billets estimés</label>
                    <span className="font-extrabold text-[#009FEF] text-lg bg-[#009FEF]/20 px-3 py-1 rounded-lg border border-[#009FEF]/40">
                      {new Intl.NumberFormat("fr-FR").format(ticketCount)} billets
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={10000}
                    step={50}
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full accent-[#009FEF] h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>50</span>
                    <span>5 000</span>
                    <span>10 000</span>
                  </div>
                </div>

                {/* Slider 2: Ticket Price */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <label className="font-bold text-slate-200">Prix moyen du billet (FCFA)</label>
                    <span className="font-extrabold text-[#009FEF] text-lg bg-[#009FEF]/20 px-3 py-1 rounded-lg border border-[#009FEF]/40">
                      {formatFCFA(ticketPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className="w-full accent-[#009FEF] h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1 000 FCFA</span>
                    <span>25 000 FCFA</span>
                    <span>50 000 FCFA</span>
                  </div>
                </div>
              </div>

              {/* Output Results Column */}
              <div className="lg:col-span-6 space-y-4">
                {/* Gross Revenue Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400">Chiffre d'affaires brut estimé</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{formatFCFA(grossRevenue)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-slate-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                {/* Net Payout Highlight Card */}
                <div className="bg-[#009FEF] rounded-2xl p-6 shadow-xl text-white space-y-2 border border-white/20">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-white/90">
                      Revenu Net Organisateur
                    </p>
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {formatFCFA(netRevenue)}
                  </p>
                  <p className="text-xs text-white/90 pt-1">
                    * Après déduction des frais de service transparents (3,5%) incluant la gestion Wave &amp; Orange Money.
                  </p>
                </div>

                {/* Payout guarantee item */}
                <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#009FEF] flex-shrink-0" />
                  <span>Disponibilité des fonds par virement et mobile money.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        {/* 3. MODULE WEB DE CONTRÔLE D'ACCÈS                         */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E4ED] shadow-sm max-w-4xl mx-auto space-y-6">
            <span className="bg-[#E5F6FF] text-[#009FEF] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
              Module Web de Contrôle d'Accès Ubbi
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111326] leading-tight">
              Contrôlez les accès depuis votre smartphone, sans aucune application à installer.
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Le jour J, démarrez le scannage en 1 clic depuis votre espace organisateur. Pour vos 1 à 3 agents de porte, partagez simplement un lien de scan sécurisé. Suivez les entrées scannées en direct et verrouillez les scans dès la fermeture des portes.
            </p>

            {/* Key Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E5F6FF] text-[#009FEF] flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111326]">Zéro Application Requise</h3>
                  <p className="text-xs text-[#666A80]">Fonctionne directement sur Safari &amp; Chrome.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F2EEFB] text-[#190262] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111326]">Lien Partagé aux Agents (1 à 3)</h3>
                  <p className="text-xs text-[#666A80]">Vos agents scannent sans accéder à votre compte.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E5F6FF] text-[#009FEF] flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111326]">Compteur d'Entrées en Direct</h3>
                  <p className="text-xs text-slate-500">Mis à jour instantanément après chaque scan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F2EEFB] text-[#190262] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111326]">Verrouillage à la Fermeture</h3>
                  <p className="text-xs text-slate-500">Bloquez les accès à la fermeture des portes.</p>
                </div>
              </div>
            </div>

            {/* Action Link CTAs */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/access-control"
                className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Tester le Scanner de Porte Web</span>
              </Link>

              <Link
                href="/organizers/create"
                className="bg-[#111326] text-white hover:bg-black font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <span>Créer mon événement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
