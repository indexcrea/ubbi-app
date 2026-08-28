"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, Eye, ArrowLeft, Database } from "lucide-react";

export default function PrivacyPage() {
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
              Protection de vos Données Personnelles
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Politique de Confidentialité
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Conforme aux normes de protection des données au Sénégal (CDP) • Mis à jour en 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E4ED] shadow-sm space-y-8 text-sm text-[#111326] leading-relaxed">
            {/* Intro Alert */}
            <div className="p-4 rounded-2xl bg-[#E5F6FF] border border-[#009FEF]/30 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#009FEF] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#111326]">
                Chez <strong>Ubbi</strong>, la sécurité et la confidentialité de vos données personnelles (numéro de téléphone, adresse email, transactions Mobile Money) constituent notre priorité absolue. Nous garantissons la protection cryptographique de vos informations.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <Database className="w-5 h-5 text-[#009FEF]" />
                1. Données Collectées
              </h2>
              <p className="text-[#666A80]">
                Nous collectons uniquement les informations nécessaires au bon déroulement de l'achat de billets et du contrôle d'accès :
              </p>
              <ul className="list-disc pl-5 text-[#666A80] space-y-1 text-xs">
                <li><strong>Informations de compte :</strong> Nom, prénom, adresse email et numéro de téléphone (utilisé pour les notifications de billet SMS/WhatsApp).</li>
                <li><strong>Transactions :</strong> Données relatives aux paiements Wave et Orange Money (aucun numéro de carte ni code PIN n'est conservé sur nos serveurs).</li>
                <li><strong>Données de billetterie :</strong> Historique des billets achetés, heures et portiques de validation QR Code.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <Lock className="w-5 h-5 text-[#009FEF]" />
                2. Utilisation et Protection des Données
              </h2>
              <p className="text-[#666A80]">
                Vos données sont exclusivement utilisées pour :
              </p>
              <ul className="list-disc pl-5 text-[#666A80] space-y-1 text-xs">
                <li>Générer et transmettre vos billets électroniques SecuPass™.</li>
                <li>Permettre aux organisateurs de vérifier votre accès à l'entrée de l'événement.</li>
                <li>Assurer le service après-vente et le traitement des éventuels remboursements.</li>
              </ul>
              <p className="text-[#666A80] pt-1">
                Ubbi s'engage solennellement à ne <strong>jamais vendre ni louer</strong> vos données personnelles à des tiers à des fins publicitaires.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#2A1464] flex items-center gap-2 border-b border-[#E2E4ED] pb-2">
                <Eye className="w-5 h-5 text-[#009FEF]" />
                3. Vos Droits d'Accès et de Rectification
              </h2>
              <p className="text-[#666A80]">
                Conformément à la réglementation sénégalaise relative à la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur l'ensemble de vos données. Vous pouvez exercer ce droit à tout moment en écrivant à notre Délégué à la Protection des Données : <strong>dpo@ubbi.sn</strong>.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-4 border-t border-[#E2E4ED] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#666A80]">
                Besoin de détails supplémentaires ? Contactez-nous à :{" "}
                <a href="mailto:privacy@ubbi.sn" className="font-bold text-[#009FEF] hover:underline">
                  privacy@ubbi.sn
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
