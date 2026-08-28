"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, ChevronDown, Sparkles, X } from "lucide-react";
import { COUNTRY_CODES } from "@/data/countryCodes";
import { LandingPageBackdrop } from "@/components/layout/LandingPageBackdrop";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+221");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/organizer");
  };

  return (
    <div className="relative min-h-screen text-[#111326] antialiased overflow-hidden">
      {/* 1. Landing Page Floue en Arrière-plan */}
      <LandingPageBackdrop />

      {/* 2. Superposition Sombre avec Flou Glassmorphism */}
      <div className="fixed inset-0 z-50 bg-[#0a0331]/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* 3. Fenêtre Modal Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 max-w-md w-full relative z-50 animate-in fade-in zoom-in-95 duration-200 my-auto">
          
          {/* Bouton de Fermeture X */}
          <Link
            href="/"
            className="absolute top-5 right-5 p-2 rounded-full text-[#666A80] hover:text-[#111326] hover:bg-[#F7F7FA] transition-colors"
            title="Fermer et retourner à l'accueil"
          >
            <X className="w-5 h-5" />
          </Link>

          <div className="text-center mb-5 pr-6 pl-2">
            <h2 className="text-2xl font-extrabold text-[#111326]">Créer un compte</h2>
            <p className="mt-1 text-xs text-[#666A80]">
              Rejoignez Ubbi pour créer, gérer et suivre vos événements au Sénégal.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Prénom & Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#666A80] mb-1">Prénom *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#666A80] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Amadou"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium transition-colors outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#666A80] mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  placeholder="Diallo"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl px-3 py-2.5 text-sm font-medium transition-colors outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#666A80] mb-1">Adresse Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="exemple@domaine.sn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                />
              </div>
            </div>

            {/* Téléphone avec Liste Déroulante Indicatifs Mondiaux */}
            <div>
              <label className="block text-xs font-semibold text-[#666A80] mb-1">Numéro de Téléphone *</label>
              <div className="flex gap-2">
                <div className="relative flex-shrink-0">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] rounded-xl pl-2.5 pr-7 py-2.5 text-xs font-bold text-[#111326] appearance-none cursor-pointer h-full max-w-[125px] truncate outline-none"
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={`${country.iso}-${country.code}`} value={country.code}>
                        {country.flag} {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#666A80] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="77 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-xs font-semibold text-[#666A80] mb-1">Mot de passe *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#666A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium transition-colors outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all mt-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Créer un compte</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E2E4ED] text-center text-xs text-[#666A80]">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-bold text-[#2A1464] hover:underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
