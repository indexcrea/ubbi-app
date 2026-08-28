"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#009FEF] uppercase tracking-widest block mb-1">
            Contact Ubbi
          </span>
          <h1 className="text-3xl font-extrabold text-[#111326]">Besoin d'aide ou d'un devis Pro ?</h1>
          <p className="text-sm text-[#666A80] mt-1">Notre équipe à Dakar est à votre écoute 7j/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 bg-[#2A1464] text-white p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Nos Coordonnées</h3>
            <div className="space-y-4 text-xs text-slate-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#009FEF]" />
                <span>Corniche Ouest, Mermoz, Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#009FEF]" />
                <span>contact@ubbi.sn</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#009FEF]" />
                <span>+221 33 800 00 00 / WhatsApp Pro</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-[#E2E4ED] shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#666A80] mb-1">Nom complet</label>
                  <input required type="text" className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#666A80] mb-1">Email</label>
                  <input required type="email" className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#666A80] mb-1">Message</label>
                  <textarea required rows={4} className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5" />
                </div>
                <button type="submit" className="w-full bg-[#009FEF] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2">
                  <span>Envoyer mon message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-lg text-[#111326]">Message Envoyé !</h4>
                <p className="text-xs text-[#666A80]">Nous vous répondrons sous quelques heures.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
