"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_EVENTS, EventItem, TicketCategory } from "@/data/mockEvents";
import { getStoredEvents } from "@/utils/eventStore";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  Share2,
  Heart,
  ArrowRight,
  Plus,
  Minus,
  AlertCircle,
  User,
  ExternalLink,
  Navigation,
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [allEvents, setAllEvents] = useState<EventItem[]>(MOCK_EVENTS);

  useEffect(() => {
    setAllEvents(getStoredEvents());
  }, []);

  // Find matching event or fallback to first
  const event = allEvents.find((e) => e.slug === slug) || allEvents[0];

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    event.tickets[0]?.id || "t1-std"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const selectedTicket =
    event.tickets.find((t) => t.id === selectedTicketId) || event.tickets[0];

  const subtotal = selectedTicket.price * quantity;
  const serviceFee = Math.round(subtotal * 0.035); // 3.5% fee
  const total = subtotal + serviceFee;

  const handleCheckout = () => {
    router.push(
      `/checkout?event=${event.slug}&ticket=${selectedTicket.id}&qty=${quantity}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111326] text-[#111326] antialiased relative">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20 relative">
        {/* ========================================================= */}
        {/* 1. EVENT BANNER HERO (Fixe en arrière-plan pendant le scroll) */}
        {/* ========================================================= */}
        <section className="sticky top-16 sm:top-20 z-0 w-full bg-[#111326] text-white overflow-hidden pt-4 pb-16 sm:pb-24">
          <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111326] via-[#111326]/50 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-28 sm:-mt-32 z-10 pb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-[#2A1464] text-white text-xs font-bold px-3.5 py-1 rounded-full border border-white/20">
                {event.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#009FEF]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#009FEF]" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#009FEF]" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. EFFET RIDEAU : LE CONTENU GLISSE PAR-DESSUS LA BANNIÈRE */}
        {/* ========================================================= */}
        <div className="relative z-10 bg-[#F7F7FA] rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(0,0,0,0.5)] border-t border-white/20 pt-10 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Description, Venue Map, Organizer */}
              <div className="lg:col-span-7 space-y-8">
                {/* Event Description */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E4ED] shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                    À propos de l'événement
                  </h3>
                  <p className="text-[#666A80] leading-relaxed text-sm sm:text-base">
                    {event.description}
                  </p>

                  <div className="pt-4 border-t border-[#E2E4ED]/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.organizer.avatar}
                        alt={event.organizer.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E2E4ED]"
                      />
                      <div>
                        <span className="text-xs text-[#666A80] block">Organisé par</span>
                        <span className="font-bold text-sm text-[#111326] flex items-center gap-1">
                          {event.organizer.name}
                          {event.organizer.verified && (
                            <CheckCircle2 className="w-4 h-4 text-[#009FEF] fill-[#009FEF]/10 inline-block" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isLiked
                            ? "bg-rose-50 border-rose-200 text-rose-600"
                            : "bg-[#F7F7FA] border-[#E2E4ED] text-[#666A80] hover:text-[#111326]"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-600" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Venue & Access Info */}
                <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                    Accès &amp; Localisation
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-[#E5F6FF] rounded-xl text-[#009FEF] flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111326]">{event.venue}</h4>
                        <p className="text-xs text-[#666A80] mt-0.5">{event.location}, Sénégal</p>
                        <p className="text-xs text-[#009FEF] font-semibold mt-1">
                          Porte d'accès Ubbi — Présentation du QR Code aux contrôleurs
                        </p>
                      </div>
                    </div>

                    <a
                      href={
                        event.googleMapsUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          event.venue + " " + event.location + " Senegal"
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#F7F7FA] hover:bg-[#E5F6FF] text-[#2A1464] hover:text-[#009FEF] font-bold text-xs px-4 py-3 rounded-xl border border-[#E2E4ED] hover:border-[#009FEF]/40 transition-all shadow-xs whitespace-nowrap"
                    >
                      <Navigation className="w-4 h-4 text-[#009FEF]" />
                      <span>Ouvrir sur Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#666A80]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Ticket Tier Selector & Booking Calculator */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 border-2 border-[#2A1464]/20 shadow-xl sticky top-28 space-y-6">
                  <div className="border-b border-[#E2E4ED] pb-4 flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-[#2A1464]">
                      Sélection des billets
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Billeterie Ouverte
                    </span>
                  </div>

                  {/* Ticket Tier Cards List */}
                  <div className="space-y-3">
                    {event.tickets.map((ticket) => {
                      const isSelected = selectedTicketId === ticket.id;
                      return (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicketId(ticket.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-[#009FEF] bg-[#E5F6FF]/30 shadow-sm"
                              : "border-[#E2E4ED] hover:border-[#009FEF]/50 bg-white"
                          }`}
                        >
                          <span className="font-bold text-[#111326] text-base flex items-center gap-2.5">
                            <span
                              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-[#009FEF] bg-[#009FEF]"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            {ticket.name}
                          </span>
                          <span className="font-extrabold text-[#2A1464] text-base">
                            {new Intl.NumberFormat("fr-FR").format(ticket.price)} FCFA
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Ticket Quantity Selector */}
                  <div className="pt-2 border-t border-[#E2E4ED] flex items-center justify-between">
                    <span className="font-bold text-[#111326] text-sm">Quantité</span>
                    <div className="flex items-center gap-3 bg-[#F7F7FA] p-1.5 rounded-xl border border-[#E2E4ED]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#111326] hover:bg-slate-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-[#111326] text-base px-2">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-8 h-8 rounded-lg bg-[#2A1464] text-white flex items-center justify-center hover:bg-[#1F0D4F]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Order Total Breakdown */}
                  <div className="bg-[#F7F7FA] rounded-xl p-4 border border-[#E2E4ED] space-y-2 text-xs">
                    <div className="flex justify-between text-[#666A80]">
                      <span>Sous-total ({quantity}x {selectedTicket.name})</span>
                      <span>{new Intl.NumberFormat("fr-FR").format(subtotal)} FCFA</span>
                    </div>
                    <div className="flex justify-between text-[#666A80]">
                      <span>Frais d'émission Ubbi (3,5%)</span>
                      <span>{new Intl.NumberFormat("fr-FR").format(serviceFee)} FCFA</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-sm text-[#2A1464] pt-2 border-t border-[#E2E4ED]">
                      <span>Total à payer</span>
                      <span className="text-base text-[#009FEF]">
                        {new Intl.NumberFormat("fr-FR").format(total)} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Buy Button CTA */}
                  {(event as any).isSuspended ? (
                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 font-extrabold text-sm rounded-xl text-center flex items-center justify-center gap-2 shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Ventes temporairement suspendues par l'organisateur</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base"
                    >
                      <span>Acheter mon billet</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-2 text-xs text-[#666A80]">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Paiement sécurisé via Wave, OM ou Carte bancaire
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
