"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/data/mockEvents";
import { Calendar, MapPin, Heart, ArrowRight, CheckCircle2, Ticket } from "lucide-react";

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Format currency FCFA
  const formattedPrice = new Intl.NumberFormat("fr-FR").format(event.minPrice);

  return (
    <div className="ubbi-card group relative flex flex-col overflow-hidden bg-white rounded-2xl border border-[#E2E4ED] transition-all duration-300 hover:shadow-xl hover:border-[#009FEF]/40">
      {/* Event Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-[#2A1464]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-xs">
          {event.category}
        </div>

        {/* Favorite Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorite
              ? "bg-rose-500 text-white shadow-md scale-110"
              : "bg-white/80 text-[#111326] hover:bg-white hover:text-rose-500"
          }`}
          aria-label="Ajouter aux favoris"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Price Tag at bottom right of image */}
        <div className="absolute bottom-3 right-3 bg-[#009FEF] text-white px-3 py-1 rounded-xl shadow-md text-xs font-bold flex items-center gap-1">
          <Ticket className="w-3.5 h-3.5" />
          <span>{formattedPrice} FCFA</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organizer Info */}
          <div className="flex items-center gap-1.5 text-xs text-[#666A80] mb-2 font-medium">
            <span className="truncate">{event.organizer.name}</span>
            {event.organizer.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#009FEF] flex-shrink-0" />
            )}
          </div>

          {/* Event Title */}
          <h3 className="text-lg font-bold text-[#111326] group-hover:text-[#2A1464] transition-colors line-clamp-1 mb-3">
            {event.title}
          </h3>

          {/* Date & Location Details */}
          <div className="space-y-1.5 text-xs text-[#666A80] mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#009FEF] flex-shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-[#2A1464] flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Button */}
        <div className="pt-3 border-t border-[#E2E4ED]/60 flex items-center justify-end">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2A1464] hover:bg-[#009FEF] px-4 py-2 rounded-xl transition-all duration-200 group-hover:shadow-md"
          >
            <span>Acheter</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
