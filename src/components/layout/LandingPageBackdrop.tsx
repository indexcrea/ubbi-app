"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export function LandingPageBackdrop() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  const featuredOrganizerEvents = events.filter((evt) => evt.createdOnSite);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none filter blur-[8px] brightness-[0.85] saturate-[1.2] scale-[1.02] transition-all duration-500"
      aria-hidden="true"
    >
      <div className="min-h-screen flex flex-col bg-[#190262] text-white antialiased relative">
        <Navbar />

        <main className="flex-1 pt-16 sm:pt-20 relative">
          {/* HERO SECTION */}
          <section
            className="sticky top-16 sm:top-20 z-0 overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-28 min-h-[580px] lg:min-h-[640px] flex items-center"
            style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
          >
            <HeroPhoneHandVisual />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
              <div className="max-w-xl lg:max-w-lg xl:max-w-xl space-y-5 text-center lg:text-left z-20">
                <div className="flex items-center justify-center lg:justify-start py-1">
                  <img
                    src="/ubbi-logo-complet.png"
                    alt="ubbi"
                    className="w-auto h-20 sm:h-28 md:h-32 lg:h-36 xl:h-40 max-w-full lg:max-w-md object-contain"
                  />
                </div>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                  La plateforme tout-en-un pour créer, vendre et contrôler l'accès à vos événements en toute simplicité.
                </p>
              </div>
            </div>
          </section>

          {/* CURTAIN CONTENT OVERLAY */}
          <div className="relative z-10 bg-[#F7F7FA] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.5)] border-t border-white/20">
            <section className="py-16 text-[#111326] relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="bg-[#E5F6FF] text-[#009FEF] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block mb-2">
                      Créés par les organisateurs sur Ubbi
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111326]">
                      Événements à la <span className="text-[#009FEF]">une</span>
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredOrganizerEvents.slice(0, 4).map((evt) => (
                    <EventCard key={evt.id} event={evt} />
                  ))}
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
