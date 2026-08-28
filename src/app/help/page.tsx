"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, ChevronDown, HelpCircle, Ticket, Smartphone, ShieldCheck } from "lucide-react";

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Comment recevoir mon billet après avoir payé ?",
      a: "Dès que le paiement Wave ou Orange Money est validé, votre billet digital avec son QR code unique apparaît immédiatement sur l'écran et est envoyé par email ainsi que par SMS.",
    },
    {
      q: "Puis-je transférer mon billet à un ami ?",
      a: "Oui, depuis votre espace 'Mes Billets', vous pouvez transférer en un clic votre billet via WhatsApp ou email.",
    },
    {
      q: "Comment fonctionne le contrôle d'accès Ubbi à l'entrée ?",
      a: "Il vous suffit de présenter l'écran de votre téléphone avec le QR Code. Les agents d'accueil scannent le code en moins d'une seconde.",
    },
    {
      q: "Je suis organisateur, quand recevrai-je le montant de mes ventes ?",
      a: "Les fonds sont versés directement sur votre compte Wave Business, Orange Money Pro ou compte bancaire sous 24h ouvrées.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="bg-[#2A1464] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Centre d'aide Ubbi</h1>
            <p className="text-slate-300 text-sm">
              Trouvez des réponses rapides sur vos achats, vos billets et l'organisation d'événements.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-4">
          <h2 className="text-xl font-extrabold text-[#111326] mb-6">Foire Aux Questions (FAQ)</h2>

          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E2E4ED] overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left font-bold text-[#111326] flex items-center justify-between text-sm hover:text-[#009FEF]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#666A80] transition-transform ${
                    openFaq === i ? "rotate-180 text-[#009FEF]" : ""
                  }`}
                />
              </button>

              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-[#666A80] leading-relaxed border-t border-[#E2E4ED]/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
