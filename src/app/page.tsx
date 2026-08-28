"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroPhoneHandVisual } from "@/components/hero/HeroPhoneHandVisual";
import { EventCard } from "@/components/ui/EventCard";
import { EventItem } from "@/data/mockEvents";
import { getStoredEvents } from "@/utils/eventStore";
import {
  Ticket,
  QrCode,
  Printer,
  CircleDot,
  BarChart3,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  // Filter only events created on site by organizers
  const featuredOrganizerEvents = events.filter((evt) => evt.createdOnSite);

  return (
    <div className="min-h-screen flex flex-col bg-[#190262] text-white antialiased relative">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20 relative">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Fixe en arrière-plan pendant le scroll) */}
        {/* ========================================================= */}
        <section
          className="sticky top-16 sm:top-20 z-0 overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 min-h-auto lg:min-h-[640px] flex flex-col justify-center"
          style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
        >
          {/* Contenu textuel avant-plan (z-20) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="max-w-xl lg:max-w-lg xl:max-w-xl space-y-4 sm:space-y-5 text-center lg:text-left z-20 mx-auto lg:mx-0">
              {/* Logo Ubbi complet uniquement */}
              <div className="flex items-center justify-center lg:justify-start py-1">
                <img
                  src="/ubbi-logo-complet.png"
                  alt="ubbi"
                  className="w-auto h-16 sm:h-24 md:h-28 lg:h-36 xl:h-40 max-w-full lg:max-w-md object-contain"
                />
              </div>

              {/* Texte descriptif */}
              <p className="text-sm sm:text-lg text-slate-200 leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                La plateforme tout-en-un pour créer, vendre et contrôler l'accès à vos événements en toute simplicité.
              </p>

              {/* CTA unique */}
              <div className="flex items-center justify-center lg:justify-start pt-1">
                <Link
                  href="/organizers/create"
                  className="w-full sm:w-auto bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-2 text-sm group"
                >
                  <span>Créer un événement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Visuel Hero Smartphone (Desktop en fond, Mobile sous le CTA) */}
          <HeroPhoneHandVisual />
        </section>

        {/* ========================================================= */}
        {/* 2. RIDEAU 1 : "ÉVÉNEMENTS À LA UNE" (Superposé sticky)    */}
        {/* ========================================================= */}
        <section className="sticky top-16 sm:top-20 z-10 bg-[#F7F7FA] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.5)] border-t border-white/20 pt-12 pb-24 md:py-16 text-[#111326]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
              <div>
                <span className="bg-[#E5F6FF] text-[#009FEF] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block mb-2">
                  Créés par les organisateurs sur Ubbi
                </span>
                <h2 className="text-2.5xl sm:text-4xl font-extrabold text-[#111326]">
                  Événements à la <span className="text-[#009FEF]">une</span>
                </h2>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2A1464] hover:text-[#009FEF] transition-colors"
              >
                <span>Découvrir tous les événements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid display organizer created events */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredOrganizerEvents.slice(0, 4).map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. RIDEAU 2 : "NOS SERVICES" (Superposé par-dessus Événements) */}
        {/* ========================================================= */}
        <div className="relative z-20 bg-[#190262] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(0,0,0,0.7)] border-t border-white/20">
          {/* SECTION "NOS SERVICES" */}
          <section
            id="services"
            className="py-12 md:py-20 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Nos <span className="text-[#009FEF]">services</span>
                </h2>
                <div className="w-12 h-1 bg-[#009FEF] rounded-full mx-auto mt-2" />
              </div>

              {/* 6 Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Service 1: Billetterie en ligne */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <Ticket className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Billetterie en ligne</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Créez et vendez vos billets en quelques minutes.
                  </p>
                </div>

                {/* Service 2: Contrôle d'accès */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Contrôle d'accès</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Scannez et validez les billets en temps réel.
                  </p>
                </div>

                {/* Service 3: Impression de tickets physiques */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <Printer className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Impression de tickets physiques</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Imprimez des tickets avec des codes sécurisés et prêts à l'emploi.
                  </p>
                </div>

                {/* Service 4: Impression de bracelets */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <CircleDot className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Impression de bracelets</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bracelets personnalisés pour identifier et contrôler les accès.
                  </p>
                </div>

                {/* Service 5: Suivi en temps réel */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Suivi en temps réel</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Gardez le contrôle avec des statistiques précises.
                  </p>
                </div>

                {/* Service 6: Sécurité garantie */}
                <div className="bg-[#24027D]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#009FEF]/60 shadow-xl text-center space-y-4 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#009FEF]/20 text-[#009FEF] border border-[#009FEF]/40 flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Sécurité garantie</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Des billets infalsifiables et des données protégées.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION CALLOUT BANNER */}
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F7F7FA]">
            <div
              className="rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
            >
              <div className="flex items-center gap-4 text-center md:text-left relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#009FEF] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Prêt à offrir une nouvelle{" "}
                  <span className="text-white underline decoration-[#009FEF] decoration-4">expérience</span> à vos participants ?
                </h3>
              </div>

              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold px-8 py-4 rounded-full shadow-xl text-sm whitespace-nowrap text-center flex items-center justify-center gap-2 group relative z-10 transition-transform hover:scale-105"
              >
                <span>Créer mon compte gratuitement</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
