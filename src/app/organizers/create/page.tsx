"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { saveNewEvent } from "@/utils/eventStore";
import { isUserLoggedIn } from "@/utils/authStore";

export default function CreateEventPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Concert");
  const [coverImage, setCoverImage] = useState("");
  const [organizerName, setOrganizerName] = useState("Mon Organisation");
  const [organizerAvatar, setOrganizerAvatar] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [createdSlug, setCreatedSlug] = useState("");
  const [ticketFormat, setTicketFormat] = useState<"single" | "multiple">("multiple");
  const [tickets, setTickets] = useState([
    { name: "STANDARD", price: 5000, qty: 500 },
    { name: "VIP", price: 15000, qty: 100 },
  ]);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isUserLoggedIn());
  }, []);

  const handleFormatChange = (format: "single" | "multiple") => {
    setTicketFormat(format);
    if (format === "single") {
      setTickets([{ name: "ENTRÉE UNIQUE", price: 5000, qty: 500 }]);
    } else {
      setTickets([
        { name: "STANDARD", price: 5000, qty: 500 },
        { name: "VIP", price: 15000, qty: 100 },
      ]);
    }
  };

  const handleUpdateTicket = (index: number, field: "name" | "price" | "qty", value: any) => {
    const updated = [...tickets];
    updated[index] = { ...updated[index], [field]: value };
    setTickets(updated);
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { name: "VVIP", price: 30000, qty: 30 }]);
  };

  const handleRemoveTicket = (index: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, i) => i !== index));
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const createdEvent = saveNewEvent({
      title,
      category,
      venue,
      date,
      time,
      googleMapsUrl,
      image: coverImage || undefined,
      organizerName,
      organizerAvatar: organizerAvatar || undefined,
      tickets,
    });
    setCreatedSlug(createdEvent.slug);
    setPublished(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Auth Protection Gate Modal for Unauthenticated Organizers */}
        {isAuthenticated === false && (
          <div className="fixed inset-0 z-50 bg-[#0a0331]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 max-w-md w-full text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#E5F6FF] text-[#009FEF] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold text-[#2A1464] bg-[#F7F7FA] px-3 py-1 rounded-full border border-[#E2E4ED] inline-block mb-2">
                  Compte Organisateur Requis
                </span>
                <h2 className="text-2xl font-extrabold text-[#111326]">
                  Créer un Événement sur Ubbi
                </h2>
                <p className="text-xs text-[#666A80] mt-1.5 leading-relaxed">
                  Exclusivité Organisateur : Vous devez posséder un compte organisateur pour intégrer et publier vos événements sur Ubbi.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/register?redirect=/organizers/create"
                  className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Créer un compte Organisateur</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login?redirect=/organizers/create"
                  className="w-full bg-[#F7F7FA] hover:bg-[#E2E4ED] text-[#111326] font-bold text-xs py-3 px-4 rounded-xl border border-[#E2E4ED] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>J'ai déjà un compte : Se connecter</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-[#E2E4ED]">
                <Link href="/" className="text-xs text-[#666A80] hover:text-[#009FEF] font-semibold">
                  ← Annuler et retourner à l'accueil
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <span className="text-xs font-bold text-[#009FEF] uppercase tracking-widest block mb-1">
            Création d'Événement
          </span>
          <h1 className="text-3xl font-extrabold text-[#111326]">
            Configurez votre nouvel événement Ubbi
          </h1>
          <p className="text-sm text-[#666A80] mt-1">
            Mettez en vente vos billets en quelques clics et commencez à encaisser immédiatement.
          </p>

          {/* Step Progress Bar */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div
              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold ${
                step >= 1 ? "bg-[#2A1464] text-white border-[#2A1464]" : "bg-white text-[#666A80]"
              }`}
            >
              1. Informations Générales
            </div>
            <div
              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold ${
                step >= 2 ? "bg-[#2A1464] text-white border-[#2A1464]" : "bg-white text-[#666A80]"
              }`}
            >
              2. Date &amp; Lieu
            </div>
            <div
              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold ${
                step >= 3 ? "bg-[#2A1464] text-white border-[#2A1464]" : "bg-white text-[#666A80]"
              }`}
            >
              3. Billetterie &amp; Prix
            </div>
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E4ED] shadow-sm">
          {!published ? (
            <form onSubmit={handlePublish} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                    Détails de l'événement
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Nom de l'événement *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Concert Live Dakar Festival 2026"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    >
                      <option value="Concert">Concert</option>
                      <option value="Festival">Festival</option>
                      <option value="Sport">Sport</option>
                      <option value="Conférence">Conférence</option>
                      <option value="Spectacle">Spectacle</option>
                      <option value="Culture">Culture</option>
                      <option value="Formation">Formation</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  {/* Photo de Couverture de l'événement */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <label className="block text-xs font-semibold text-[#666A80]">
                        Photo de couverture de l'événement (Optionnel)
                      </label>
                      <span className="text-[11px] font-bold text-[#009FEF] bg-[#E5F6FF] px-2.5 py-0.5 rounded-full inline-block">
                        Dimensions conseillées : 1200 x 630 px (16:9 HD)
                      </span>
                    </div>

                    {/* Zone de Glisser-Déposer / Upload / URL */}
                    <div className="border-2 border-dashed border-[#E2E4ED] hover:border-[#009FEF] bg-[#F7F7FA] hover:bg-[#E5F6FF]/20 rounded-2xl p-6 text-center transition-all relative">
                      {coverImage ? (
                        <div className="relative rounded-xl overflow-hidden shadow-md max-h-52 group">
                          <img
                            src={coverImage}
                            alt="Aperçu couverture"
                            className="w-full h-52 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => setCoverImage("")}
                              className="bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:bg-rose-700 transition-colors"
                            >
                              Changer la photo
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-white rounded-2xl text-[#009FEF] border border-[#E2E4ED] flex items-center justify-center mx-auto shadow-sm">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#111326]">
                              Glissez et déposez votre photo de couverture ici
                            </p>
                            <p className="text-[11px] text-[#666A80] mt-0.5">
                              Format HD optimal : 1200 × 630 px (PNG, JPG, WEBP — Max 5 Mo)
                            </p>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                            <label className="bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm transition-colors">
                              <span>Parcourir mes fichiers</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setCoverImage(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* Champ URL d'image alternatif */}
                          <div className="max-w-md mx-auto pt-2">
                            <input
                              type="url"
                              placeholder="ou collez l'URL d'une image (ex: https://...)"
                              value={coverImage}
                              onChange={(e) => setCoverImage(e.target.value)}
                              className="w-full bg-white border border-[#E2E4ED] rounded-xl px-3 py-2 text-xs text-[#111326] outline-none focus:border-[#009FEF]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Suggestions d'images rapides */}
                    {!coverImage && (
                      <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1">
                        <span className="text-[11px] text-[#666A80] font-semibold whitespace-nowrap">
                          Photos d'exemple HD :
                        </span>
                        {[
                          {
                            label: "Concert Live",
                            url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
                          },
                          {
                            label: "Festival",
                            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
                          },
                          {
                            label: "Stade / Match",
                            url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
                          },
                          {
                            label: "Conférence",
                            url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
                          },
                        ].map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCoverImage(img.url)}
                            className="text-[11px] font-bold text-[#009FEF] bg-[#E5F6FF] hover:bg-[#D0EEFF] px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors"
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Photo de Profil / Logo Organisateur */}
                  <div className="pt-2 border-t border-[#E2E4ED]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <label className="block text-xs font-bold text-[#111326]">
                        Profil Organisateur (Nom &amp; Logo / Photo)
                      </label>
                      <span className="text-[11px] font-bold text-[#2A1464] bg-[#F7F7FA] px-2.5 py-0.5 rounded-full border border-[#E2E4ED] inline-block">
                        Dimensions conseillées : 200 x 200 px (Carré 1:1)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F7F7FA] border border-[#E2E4ED] flex flex-col sm:flex-row items-center gap-4">
                      {/* Avatar Preview */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            organizerAvatar ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                          }
                          alt="Avatar Organisateur"
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#009FEF] shadow-sm"
                        />
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#666A80] mb-1">
                            Nom de l'organisateur / Structure *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Super Étoile Production, Colors West Africa..."
                            value={organizerName}
                            onChange={(e) => setOrganizerName(e.target.value)}
                            className="w-full bg-white border border-[#E2E4ED] rounded-xl px-3 py-2 text-xs font-bold text-[#111326]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#666A80] mb-1">
                            Photo de profil / Logo (Importer ou coller URL)
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs transition-colors whitespace-nowrap">
                              <span>Changer le logo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setOrganizerAvatar(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <input
                              type="url"
                              placeholder="https://.../mon-logo.png"
                              value={organizerAvatar}
                              onChange={(e) => setOrganizerAvatar(e.target.value)}
                              className="w-full bg-white border border-[#E2E4ED] rounded-lg px-2.5 py-1 text-xs text-[#111326]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-[#009FEF] text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm"
                    >
                      <span>Suivant : Date &amp; Lieu</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                    Date &amp; Lieu au Sénégal
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Lieu / Salle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dakar Arena, King Fahd Palace, Place du Souvenir..."
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1 flex items-center justify-between">
                      <span>Lien Google Maps (Optionnel)</span>
                      <span className="text-[10px] text-[#009FEF] font-bold">Localisation GPS</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#009FEF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="Ex: https://maps.google.com/?q=Dakar+Arena"
                        value={googleMapsUrl}
                        onChange={(e) => setGoogleMapsUrl(e.target.value)}
                        className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-[#666A80] mt-1">
                      Collez le lien Google Maps pour permettre aux participants d'ouvrir l'itinéraire GPS en 1 clic.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#666A80] mb-1">
                        Date de l'événement *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#666A80] mb-1">
                        Heure d'ouverture des portes *
                      </label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-slate-100 text-[#111326] font-bold px-6 py-3 rounded-xl text-sm"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#009FEF] text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm"
                    >
                      <span>Suivant : Catégories de billets</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3 mb-4">
                      Catégories de billets &amp; Tarification (FCFA)
                    </h3>

                    {/* Choix du format : Entrée unique vs Catégories multiples */}
                    <label className="block text-xs font-semibold text-[#666A80] mb-2">
                      Format de la billetterie *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => handleFormatChange("single")}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          ticketFormat === "single"
                            ? "border-[#009FEF] bg-[#E5F6FF]/40 shadow-sm"
                            : "border-[#E2E4ED] bg-white hover:border-[#009FEF]/40"
                        }`}
                      >
                        <div className="font-bold text-sm text-[#111326] mb-1">
                          Entrée unique (Tarif unique)
                        </div>
                        <div className="text-xs text-[#666A80]">
                          Un seul prix d'entrée pour l'événement.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleFormatChange("multiple")}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          ticketFormat === "multiple"
                            ? "border-[#009FEF] bg-[#E5F6FF]/40 shadow-sm"
                            : "border-[#E2E4ED] bg-white hover:border-[#009FEF]/40"
                        }`}
                      >
                        <div className="font-bold text-sm text-[#111326] mb-1">
                          Catégories multiples (Standard, VIP, VVIP...)
                        </div>
                        <div className="text-xs text-[#666A80]">
                          Deux catégories ou plus avec des tarifs distincts.
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Formulaire de saisie des catégories */}
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-[#666A80]">
                      {ticketFormat === "single" ? "Nom & Prix du Billet" : "Nommer vos catégories de billets"}
                    </label>

                    {tickets.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-[#E2E4ED] bg-[#F7F7FA] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-5">
                          <label className="block text-[11px] font-semibold text-[#666A80] mb-1">
                            Nom de la catégorie
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: STANDARD, VIP, PASS UNIQUE..."
                            value={t.name}
                            onChange={(e) => handleUpdateTicket(idx, "name", e.target.value)}
                            className="w-full bg-white border border-[#E2E4ED] rounded-xl px-3 py-2 text-sm font-bold text-[#111326]"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-[#666A80] mb-1">
                            Prix unitaire (FCFA)
                          </label>
                          <input
                            type="number"
                            required
                            min={0}
                            step={500}
                            placeholder="10000"
                            value={t.price}
                            onChange={(e) => handleUpdateTicket(idx, "price", parseInt(e.target.value, 10) || 0)}
                            className="w-full bg-white border border-[#E2E4ED] rounded-xl px-3 py-2 text-sm font-bold text-[#009FEF]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-[#666A80] mb-1">
                            Quantité
                          </label>
                          <input
                            type="number"
                            required
                            min={1}
                            placeholder="500"
                            value={t.qty}
                            onChange={(e) => handleUpdateTicket(idx, "qty", parseInt(e.target.value, 10) || 1)}
                            className="w-full bg-white border border-[#E2E4ED] rounded-xl px-3 py-2 text-sm font-bold text-[#111326]"
                          />
                        </div>

                        <div className="sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                          {tickets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTicket(idx)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Supprimer la catégorie"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {ticketFormat === "multiple" && (
                    <button
                      type="button"
                      onClick={handleAddTicket}
                      className="text-xs font-bold text-[#009FEF] bg-[#E5F6FF] hover:bg-[#D0EEFF] px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      + Ajouter une catégorie (ex: VVIP, PASS GOLD)
                    </button>
                  )}

                  <div className="pt-4 flex justify-between border-t border-[#E2E4ED]">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-100 text-[#111326] font-bold px-6 py-3 rounded-xl text-sm"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[#009FEF]" />
                      <span>Publier mon événement sur Ubbi</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111326]">
                Félicitations! Votre événement est en ligne.
              </h3>
              <p className="text-sm text-[#666A80] max-w-md mx-auto">
                Votre événement <strong>{title}</strong> a été publié avec succès. Il figure désormais dans les <strong>événements à la une</strong> sur la page d'accueil.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm text-center"
                >
                  Voir sur la Page d'Accueil
                </Link>
                <Link
                  href={createdSlug ? `/events/${createdSlug}` : "/events"}
                  className="w-full sm:w-auto bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm text-center"
                >
                  Voir la Page de l'Événement
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
