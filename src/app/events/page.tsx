"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/ui/EventCard";
import { EventItem, CATEGORIES } from "@/data/mockEvents";
import { getStoredEvents } from "@/utils/eventStore";
import { Search, Filter, Calendar, MapPin, SlidersHorizontal, Grid, List } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedLocation, setSelectedLocation] = useState("Tous");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  // Filter logic
  let filtered = events.filter((evt) => {
    const matchesCategory = selectedCategory === "Tous" || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.minPrice - b.minPrice);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.minPrice - a.minPrice);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      {/* Première bande (Navbar avec fond #0a0331) */}
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Deuxième bande: Hero Header (Dégradé #190262 0% -> #24027D 100%) */}
        <section
          className="text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10"
          style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-bold text-[#009FEF] uppercase tracking-widest block mb-1">
              Catalogue Ubbi
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Découvrez tous les événements au Sénégal
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Achetez vos billets de concerts, festivals, spectacles et conférences en toute sécurité.
            </p>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-sm space-y-4">
            {/* Search Input & Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un artiste, un lieu ou un événement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#111326] placeholder-[#666A80] focus:outline-none focus:border-[#009FEF]"
                />
              </div>

              {/* Location Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-3 py-2.5 text-sm text-[#111326] focus:outline-none focus:border-[#009FEF]"
                >
                  <option value="Tous">Toutes les villes</option>
                  <option value="Dakar">Dakar</option>
                  <option value="Saly">Saly</option>
                  <option value="Saint-Louis">Saint-Louis</option>
                </select>
              </div>

              {/* Sort Select */}
              <div className="md:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-3 py-2.5 text-sm text-[#111326] focus:outline-none focus:border-[#009FEF]"
                >
                  <option value="date">Trier par : Date</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                </select>
              </div>
            </div>

            {/* Category Pills & View Mode */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E2E4ED]">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-[#190262] text-white shadow-xs"
                          : "bg-[#F7F7FA] text-[#666A80] hover:bg-[#E2E4ED]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Grid / List Switcher */}
              <div className="flex items-center gap-1 bg-[#F7F7FA] p-1 rounded-xl border border-[#E2E4ED] flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-[#190262] shadow-xs"
                      : "text-[#666A80] hover:text-[#111326]"
                  }`}
                  aria-label="Mode grille"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-[#190262] shadow-xs"
                      : "text-[#666A80] hover:text-[#111326]"
                  }`}
                  aria-label="Mode liste"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Event List Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111326]">
              Événements disponibles ({filtered.length})
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E4ED]">
              <Calendar className="w-12 h-12 text-[#666A80] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#111326]">Aucun événement trouvé</h3>
              <p className="text-xs text-[#666A80] mt-1">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col space-y-4"
              }
            >
              {filtered.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
