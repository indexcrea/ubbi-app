"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, FileText, ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Banner Hero */}
        <section
          className="text-white py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-white/10"
          style={{ background: "linear-gradient(135deg, #190262 0%, #24027D 100%)" }}
        >
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#009FEF] uppercase tracking-widest block">
              Cadre Légal &amp; Transparence
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Conditions Générales de Vente et d'Utilisation (CGV / CGU)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Dernière mise à jour : 1er Janvier 2026 • Ubbi Technologies Sénégal
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E4ED] shadow-sm space-y-8 text-sm text-[#111326] leading-relaxed">
            {/* Article 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <FileText className="w-5 h-5 text-[#009FEF]" />
                1. Objet et Présentation des Services
              </h2>
              <p className="text-[#666A80]">
                Les présentes Conditions Générales d'Utilisation et de Vente régissent l'accès et l'utilisation de la plateforme de billetterie et de contrôle d'accès Ubbi, éditée par Ubbi Technologies (Sénégal). Ubbi agit en tant qu'intermédiaire technologique permettant aux organisateurs de créer, promouvoir et vendre des billets pour leurs événements, et aux participants d'acheter et de recevoir des billets électroniques sécurisés SecuPass™.
              </p>
            </div>

            {/* Article 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <FileText className="w-5 h-5 text-[#009FEF]" />
                2. Achat de Billets et Moyens de Paiement
              </h2>
              <p className="text-[#666A80]">
                Toute réservation effectuée sur Ubbi est ferme et définitive après confirmation du paiement. La plateforme accepte les moyens de paiement locaux et internationaux, notamment <strong>Wave</strong>, <strong>Orange Money</strong> ainsi que les cartes bancaires (Visa, Mastercard). L'acheteur reçoit immédiatement un billet numérique muni d'un QR code unique cryptographiquement sécurisé dès la validation du paiement.
              </p>
            </div>

            {/* Article 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <FileText className="w-5 h-5 text-[#009FEF]" />
                3. Conditions d'Accès et Contrôle à l'Entrée
              </h2>
              <p className="text-[#666A80]">
                Chaque billet Ubbi comporte un identifiant unique et un QR code valide pour une seule entrée, sauf mention contraire précisée par l'organisateur. Lors de l'accès à l'événement, le porteur du billet doit présenter son écran de smartphone avec le QR code ou une version imprimée lisible. Ubbi et l'organisateur se réservent le droit de refuser l'accès en cas de réutilisation frauduleuse ou de contrefaçon détectée par nos scanners d'accès.
              </p>
            </div>

            {/* Article 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <FileText className="w-5 h-5 text-[#009FEF]" />
                4. Annulation, Report et Remboursement
              </h2>
              <p className="text-[#666A80]">
                Conformément à la réglementation sur les prestations de services de loisirs datées, les billets ne sont ni échangeables ni remboursables, sauf en cas d'annulation ou de report de l'événement par l'organisateur. En cas d'annulation officielle, le remboursement s'effectuera directement sur le compte de paiement d'origine (Wave ou Orange Money) déduction faite, le cas échéant, des frais techniques de traitement explicités.
              </p>
            </div>

            {/* Article 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <Scale className="w-5 h-5 text-[#009FEF]" />
                5. Responsabilité et Droit Applicable
              </h2>
              <p className="text-[#666A80]">
                Ubbi décline toute responsabilité concernant la tenue, la sécurité interne ou le contenu des événements, ceux-ci relèvent de la responsabilité exclusive de l'organisateur déclaré. Les présentes CGV sont soumises au droit sénégalais. Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux de Dakar.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-4 border-t border-[#E2E4ED] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#666A80]">
                Des questions sur nos CGV ? Contactez notre pôle juridique :{" "}
                <a href="mailto:support@ubbi.sn" className="font-bold text-[#009FEF] hover:underline">
                  support@ubbi.sn
                </a>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2A1464] bg-[#F7F7FA] hover:bg-slate-200 px-4 py-2.5 rounded-xl border border-[#E2E4ED]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à l'accueil</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
