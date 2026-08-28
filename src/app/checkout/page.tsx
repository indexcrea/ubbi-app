"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getStoredEvents } from "@/utils/eventStore";
import { getLoggedInUser } from "@/utils/authStore";
import {
  Check,
  ShieldCheck,
  Smartphone,
  CreditCard,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Ticket,
} from "lucide-react";

const WORLD_COUNTRY_CODES = [
  // West & Central Africa (Priority)
  { code: "+221", flag: "🇸🇳", country: "Sénégal" },
  { code: "+225", flag: "🇨🇮", country: "Côte d'Ivoire" },
  { code: "+223", flag: "🇲🇱", country: "Mali" },
  { code: "+224", flag: "🇬🇳", country: "Guinée" },
  { code: "+226", flag: "🇧🇫", country: "Burkina Faso" },
  { code: "+222", flag: "🇲🇷", country: "Mauritanie" },
  { code: "+220", flag: "🇬🇲", country: "Gambie" },
  { code: "+228", flag: "🇹🇬", country: "Togo" },
  { code: "+229", flag: "🇧🇯", country: "Bénin" },
  { code: "+234", flag: "🇳🇬", country: "Nigeria" },
  { code: "+233", flag: "🇬🇭", country: "Ghana" },
  { code: "+227", flag: "🇳🇪", country: "Niger" },
  { code: "+238", flag: "🇨🇻", country: "Cap-Vert" },
  { code: "+232", flag: "🇸🇱", country: "Sierra Leone" },
  { code: "+231", flag: "🇱🇷", country: "Libéria" },
  { code: "+237", flag: "🇨🇲", country: "Cameroun" },
  { code: "+241", flag: "🇬🇦", country: "Gabon" },
  { code: "+242", flag: "🇨🇬", country: "Congo (Brazzaville)" },
  { code: "+243", flag: "🇨🇩", country: "RDC (Kinshasa)" },
  { code: "+235", flag: "🇹🇩", country: "Tchad" },
  { code: "+236", flag: "🇨🇫", country: "Centrafrique" },
  { code: "+240", flag: "🇬🇶", country: "Guinée Équatoriale" },

  // North & East & Southern Africa
  { code: "+212", flag: "🇲🇦", country: "Maroc" },
  { code: "+213", flag: "🇩🇿", country: "Algérie" },
  { code: "+216", flag: "🇹🇳", country: "Tunisie" },
  { code: "+20", flag: "🇪🇬", country: "Égypte" },
  { code: "+254", flag: "🇰🇪", country: "Kenya" },
  { code: "+250", flag: "🇷🇼", country: "Rwanda" },
  { code: "+255", flag: "🇹🇿", country: "Tanzanie" },
  { code: "+256", flag: "🇺🇬", country: "Ouganda" },
  { code: "+251", flag: "🇪🇹", country: "Éthiopie" },
  { code: "+27", flag: "🇿🇦", country: "Afrique du Sud" },
  { code: "+244", flag: "🇦🇴", country: "Angola" },
  { code: "+258", flag: "🇲🇿", country: "Mozambique" },
  { code: "+261", flag: "🇲🇬", country: "Madagascar" },

  // Europe
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+32", flag: "🇧🇪", country: "Belgique" },
  { code: "+41", flag: "🇨🇭", country: "Suisse" },
  { code: "+34", flag: "🇪🇸", country: "Espagne" },
  { code: "+39", flag: "🇮🇹", country: "Italie" },
  { code: "+44", flag: "🇬🇧", country: "Royaume-Uni" },
  { code: "+49", flag: "🇩🇪", country: "Allemagne" },
  { code: "+31", flag: "🇳🇱", country: "Pays-Bas" },
  { code: "+351", flag: "🇵🇹", country: "Portugal" },
  { code: "+46", flag: "🇸🇪", country: "Suède" },
  { code: "+47", flag: "🇳🇴", country: "Norvège" },
  { code: "+45", flag: "🇩🇰", country: "Danemark" },
  { code: "+358", flag: "🇫🇮", country: "Finlande" },
  { code: "+90", flag: "🇹🇷", country: "Turquie" },

  // Americas & Middle East & Asia
  { code: "+1", flag: "🇺🇸", country: "États-Unis / Canada" },
  { code: "+971", flag: "🇦🇪", country: "Émirats Arabes Unis" },
  { code: "+966", flag: "🇸🇦", country: "Arabie Saoudite" },
  { code: "+974", flag: "🇶🇦", country: "Qatar" },
  { code: "+965", flag: "🇰🇼", country: "Koweït" },
  { code: "+86", flag: "🇨🇳", country: "Chine" },
  { code: "+81", flag: "🇯🇵", country: "Japon" },
  { code: "+82", flag: "🇰🇷", country: "Corée du Sud" },
  { code: "+91", flag: "🇮🇳", country: "Inde" },
  { code: "+55", flag: "🇧🇷", country: "Brésil" },
  { code: "+52", flag: "🇲🇽", country: "Mexique" },
  { code: "+61", flag: "🇦🇺", country: "Australie" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventSlug = searchParams.get("event") || "";
  const ticketId = searchParams.get("ticket") || "";
  const qtyParam = parseInt(searchParams.get("qty") || "1", 10);

  const allAvailableEvents = getStoredEvents();
  const event =
    allAvailableEvents.find((e) => e.slug === eventSlug || e.id === eventSlug) ||
    allAvailableEvents[0];

  const ticketTier =
    event.tickets.find((t) => t.id === ticketId) || event.tickets[0];

  const loggedUser = typeof window !== "undefined" ? getLoggedInUser() : null;

  const [step, setStep] = useState<number>(1);
  const [countryCode, setCountryCode] = useState("+221");
  const [phoneInput, setPhoneInput] = useState("");
  const [formData, setFormData] = useState({
    fullName: loggedUser ? `${loggedUser.firstName || ""} ${loggedUser.lastName || ""}`.trim() : "",
    email: loggedUser ? loggedUser.email : "",
    phone: "",
    paymentMethod: "wave" as "wave" | "om" | "card",
  });

  // Auto-detect visitor's country by IP location
  useEffect(() => {
    async function detectCountryByIP() {
      try {
        const response = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          if (data && data.country_calling_code) {
            const callingCode = data.country_calling_code.startsWith("+")
              ? data.country_calling_code
              : `+${data.country_calling_code}`;

            const matched = WORLD_COUNTRY_CODES.some((c) => c.code === callingCode);
            if (matched) {
              setCountryCode(callingCode);
            }
          }
        }
      } catch (err) {
        // Fallback default stays +221 Senegal
      }
    }
    detectCountryByIP();
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const subtotal = ticketTier.price * qtyParam;
  const serviceFee = Math.round(subtotal * 0.035); // 3.5% fee
  const total = subtotal + serviceFee;

  const handleGoToPayment = () => {
    if (!formData.fullName.trim() || !phoneInput.trim()) {
      setValidationError("Veuillez remplir votre Nom & Prénom ainsi que votre Numéro WhatsApp pour continuer.");
      return;
    }
    const fullPhone = `${countryCode} ${phoneInput.trim()}`;
    setFormData((prev) => ({ ...prev, phone: fullPhone }));
    setValidationError(null);
    setStep(3);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2000);
  };

  return (
    <main className="flex-1 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#666A80] hover:text-[#009FEF] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'événement
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111326]">
            Achat de votre billet Ubbi
          </h1>

          {/* Steps Progress Bar */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {[
              { num: 1, label: "Billets" },
              { num: 2, label: "Informations" },
              { num: 3, label: "Paiement" },
              { num: 4, label: "Confirmation" },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  step >= s.num
                    ? "bg-[#2A1464] text-white border-[#2A1464] font-bold"
                    : "bg-white text-[#666A80] border-[#E2E4ED]"
                }`}
              >
                <span className="text-xs">
                  {s.num}. {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Step Body */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E4ED] shadow-sm">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                  1. Vérification de la commande
                </h3>

                <div className="p-4 rounded-xl bg-[#F7F7FA] border border-[#E2E4ED] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111326]">{event.title}</span>
                    <span className="text-xs bg-[#009FEF] text-white font-bold px-2.5 py-0.5 rounded-full">
                      {ticketTier.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#666A80]">
                    {event.date} • {event.time} @ {event.venue}
                  </p>
                  <div className="pt-2 border-t border-[#E2E4ED] flex justify-between text-xs font-semibold text-[#111326]">
                    <span>Quantité sélectionnée:</span>
                    <span>{qtyParam} billet(s)</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#009FEF] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <span>Continuer vers vos coordonnées</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                  2. Coordonnées du participant
                </h3>

                {validationError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 font-bold text-xs rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Nom &amp; Prénom *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Entrez votre Nom et Prénom..."
                        value={formData.fullName}
                        onChange={(e) => {
                          setValidationError(null);
                          setFormData({ ...formData, fullName: e.target.value });
                        }}
                        className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] rounded-xl pl-10 pr-4 py-2.5 text-[#111326] font-medium outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Numéro de téléphone WhatsApp *
                    </label>
                    <div className="flex gap-2">
                      {/* Liste déroulante indicatifs pays */}
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] rounded-xl px-3 py-2.5 text-xs font-bold text-[#111326] outline-none cursor-pointer"
                      >
                        {WORLD_COUNTRY_CODES.map((c) => (
                          <option key={c.code + c.country} value={c.code}>
                            {c.flag} {c.code} ({c.country})
                          </option>
                        ))}
                      </select>

                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="77 000 00 00"
                          value={phoneInput}
                          onChange={(e) => {
                            setValidationError(null);
                            const val = e.target.value;
                            setPhoneInput(val);
                            setFormData({ ...formData, phone: `${countryCode} ${val}` });
                          }}
                          className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] rounded-xl pl-10 pr-4 py-2.5 text-[#111326] font-medium outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 text-[#111326] font-bold py-3.5 rounded-xl text-sm"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleGoToPayment}
                    className="w-2/3 bg-[#009FEF] hover:bg-[#0084C9] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <span>Passer au paiement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !isConfirmed && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#111326] border-b border-[#E2E4ED] pb-3">
                  3. Choisissez votre mode de paiement
                </h3>

                {/* Payment Option Buttons */}
                <div className="space-y-3">
                  {/* Wave Option */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "wave" })
                    }
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === "wave"
                        ? "border-[#009FEF] bg-[#E5F6FF]/40"
                        : "border-[#E2E4ED]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00A2FF] text-white font-black flex items-center justify-center text-sm shadow-xs">
                        wave
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#111326]">Wave Digital Finance</h4>
                        <p className="text-xs text-[#666A80]">Paiement instantané sans frais via QR code</p>
                      </div>
                    </div>
                    {formData.paymentMethod === "wave" && (
                      <Check className="w-5 h-5 text-[#009FEF]" />
                    )}
                  </div>

                  {/* Orange Money Option */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "om" })
                    }
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === "om"
                        ? "border-[#009FEF] bg-[#E5F6FF]/40"
                        : "border-[#E2E4ED]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF6600] text-white font-black flex items-center justify-center text-sm shadow-xs">
                        OM
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#111326]">Orange Money Sénégal</h4>
                        <p className="text-xs text-[#666A80]">Paiement sécurisé via code USSD ou app OM</p>
                      </div>
                    </div>
                    {formData.paymentMethod === "om" && (
                      <Check className="w-5 h-5 text-[#009FEF]" />
                    )}
                  </div>

                  {/* Credit Card Option */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "card" })
                    }
                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === "card"
                        ? "border-[#009FEF] bg-[#E5F6FF]/40"
                        : "border-[#E2E4ED]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2A1464] text-white font-bold flex items-center justify-center shadow-xs">
                        <CreditCard className="w-5 h-5 text-[#009FEF]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#111326]">Carte Bancaire (Visa / Mastercard)</h4>
                        <p className="text-xs text-[#666A80]">Paiement international sécurisé 3D-Secure</p>
                      </div>
                    </div>
                    {formData.paymentMethod === "card" && (
                      <Check className="w-5 h-5 text-[#009FEF]" />
                    )}
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Traitement sécurisé en cours...
                    </span>
                  ) : (
                    <>
                      <span>Payer {new Intl.NumberFormat("fr-FR").format(total)} FCFA</span>
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {isConfirmed && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#111326]">Paiement Réussi !</h3>
                <p className="text-sm text-[#666A80] max-w-md mx-auto">
                  Votre billet digital Ubbi a été généré avec succès et envoyé sur votre WhatsApp au <strong>{formData.phone}</strong>.
                </p>
                <div className="pt-4">
                  <Link
                    href={`/ticket/UBBI-2026-9842`}
                    className="inline-flex items-center gap-2 bg-[#2A1464] text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm"
                  >
                    <Ticket className="w-4 h-4 text-[#009FEF]" />
                    <span>Afficher mon billet digital QR</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Stick Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#111326] text-white rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="font-bold text-sm text-[#009FEF] uppercase tracking-wider">
                Résumé de la commande
              </h4>

              <div className="space-y-3 text-xs border-b border-white/10 pb-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Événement:</span>
                  <span className="font-bold text-white text-right max-w-[180px] truncate">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Catégorie:</span>
                  <span className="font-bold text-[#009FEF]">{ticketTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Prix unitaire:</span>
                  <span>{new Intl.NumberFormat("fr-FR").format(ticketTier.price)} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Quantité:</span>
                  <span>{qtyParam}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Sous-total</span>
                  <span>{new Intl.NumberFormat("fr-FR").format(subtotal)} FCFA</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Frais de plateforme Ubbi (3,5%)</span>
                  <span>{new Intl.NumberFormat("fr-FR").format(serviceFee)} FCFA</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total TTC</span>
                  <span className="text-[#009FEF]">
                    {new Intl.NumberFormat("fr-FR").format(total)} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center">Chargement du checkout...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
