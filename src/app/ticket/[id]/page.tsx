"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DigitalTicketCard } from "@/components/ui/DigitalTicketCard";
import { ArrowLeft, Download, CheckCircle2, Loader2 } from "lucide-react";
import { generateTicketPDF } from "@/utils/generateTicketPDF";
import { getStoredEvents } from "@/utils/eventStore";
import { EventItem } from "@/data/mockEvents";

export default function TicketPage() {
  const params = useParams();
  const ticketId = (params?.id as string) || "UBBI-2026-9842";
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const ticketCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const events = getStoredEvents();
    if (events && events.length > 0) {
      // Find matching event or use first organizer event
      const found = events.find((e) => ticketId.toLowerCase().includes(e.slug.toLowerCase()));
      setActiveEvent(found || events[0]);
    }
  }, [ticketId]);

  const eventName = activeEvent ? activeEvent.title : "Youssou N'Dour Live at Dakar Arena";
  const eventImage = activeEvent ? activeEvent.image : "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80";
  const date = activeEvent ? activeEvent.date : "14 Novembre 2026";
  const time = activeEvent ? activeEvent.time : "20:30";
  const venue = activeEvent ? activeEvent.venue : "Dakar Arena, Diamniadio";
  const category = activeEvent && activeEvent.tickets?.[0] ? activeEvent.tickets[0].name : "VIP";

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await generateTicketPDF(
      {
        ticketNumber: ticketId,
        eventName,
        category,
        date,
        time,
        venue,
        attendeeName: "Amadou Diallo",
        status: "NON SCANNÉ",
        eventImage,
      },
      ticketCardRef.current
    );
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#666A80] hover:text-[#009FEF]"
            >
              <ArrowLeft className="w-4 h-4" />
              Mes Billets Ubbi
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-50 transition-colors"
              >
                {isDownloading ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#009FEF] animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-[#009FEF]" />
                )}
                <span>Télécharger PDF</span>
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Billet Officiel Validé
            </div>
          </div>

          {/* Ticket Visualizer with Event Poster Design */}
          <DigitalTicketCard
            ticketNumber={ticketId}
            eventName={eventName}
            eventImage={eventImage}
            category={category}
            date={date}
            time={time}
            venue={venue}
            attendeeName="Amadou Diallo"
            status="NON SCANNÉ"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
