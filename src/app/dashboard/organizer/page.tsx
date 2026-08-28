"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UbbiLogo } from "@/components/brand/UbbiLogo";
import { QRScannerModule } from "@/components/access/QRScannerModule";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  QrCode,
  DollarSign,
  Settings,
  PlusCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  Scan,
} from "lucide-react";

export default function OrganizerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#2A1464] text-white text-xs font-bold px-3 py-1 rounded-full">
                Organisateur Pro
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Compte Actif
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111326] mt-1">
              Tableau de bord Organisateur Ubbi
            </h1>
          </div>

          <Link
            href="/organizers/create"
            className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold text-sm px-5 py-3 rounded-xl shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Créer un événement</span>
          </Link>
        </div>

        {/* Dashboard Main Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-sm space-y-1">
              {[
                { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
                { id: "events", label: "Événements", icon: Calendar },
                { id: "tickets", label: "Billets", icon: Ticket },
                { id: "attendees", label: "Participants", icon: Users },
                { id: "access", label: "Contrôle d'accès", icon: QrCode },
                { id: "revenue", label: "Revenus", icon: DollarSign },
                { id: "settings", label: "Paramètres", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#2A1464] text-white shadow-xs"
                        : "text-[#666A80] hover:bg-[#F7F7FA] hover:text-[#111326]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#009FEF]" : ""}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* 4 Core Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="ubbi-card p-5 bg-white rounded-2xl border border-[#E2E4ED] space-y-2">
                <span className="text-xs font-semibold text-[#666A80] uppercase tracking-wider block">
                  Billets vendus
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#111326]">1 842</span>
                  <span className="text-xs text-[#666A80]">/ 2 000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#009FEF] h-full rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              {/* Card 2 */}
              <div className="ubbi-card p-5 bg-white rounded-2xl border border-[#E2E4ED] space-y-2">
                <span className="text-xs font-semibold text-[#666A80] uppercase tracking-wider block">
                  Chiffre d'affaires
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-[#2A1464]">18,4M FCFA</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs semaine passée
                </span>
              </div>

              {/* Card 3 */}
              <div className="ubbi-card p-5 bg-white rounded-2xl border border-[#E2E4ED] space-y-2">
                <span className="text-xs font-semibold text-[#666A80] uppercase tracking-wider block">
                  Entrées Scannées
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#111326]">1 420</span>
                  <span className="text-xs text-emerald-600 font-bold">77%</span>
                </div>
                <span className="text-[11px] text-[#666A80]">Contrôle en direct actif</span>
              </div>

              {/* Card 4 */}
              <div className="ubbi-card p-5 bg-white rounded-2xl border border-[#E2E4ED] space-y-2">
                <span className="text-xs font-semibold text-[#666A80] uppercase tracking-wider block">
                  Taux de remplissage
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#009FEF]">92.1%</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Jauge quasi complète
                </span>
              </div>
            </div>

            {/* Tab Navigation Views */}
            {activeTab === "access" ? (
              <QRScannerModule />
            ) : activeTab === "settings" ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E4ED] shadow-sm space-y-6">
                <div className="border-b border-[#E2E4ED] pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl text-[#111326]">
                      Paramètres du Profil Organisateur
                    </h3>
                    <p className="text-xs text-[#666A80] mt-0.5">
                      Gérez la photo de profil, le logo et les coordonnées officielles de votre structure sur Ubbi.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#009FEF] bg-[#E5F6FF] px-3 py-1 rounded-full">
                    Compte Vérifié ✓
                  </span>
                </div>

                {/* Photo de profil / Logo Organisateur */}
                <div className="p-6 rounded-2xl bg-[#F7F7FA] border border-[#E2E4ED] flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Avatar Organisateur"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#009FEF] shadow-md"
                    />
                  </div>

                  <div className="space-y-3 text-center sm:text-left flex-1">
                    <div>
                      <span className="text-xs font-bold text-[#009FEF] bg-[#E5F6FF] px-3 py-1 rounded-full inline-block mb-1">
                        Dimensions conseillées : 200 x 200 px (Carré 1:1, Max 2 Mo)
                      </span>
                      <h4 className="font-bold text-[#111326] text-base">Logo &amp; Photo de Profil</h4>
                      <p className="text-xs text-[#666A80]">
                        Cette image sera affichée sur toutes vos fiches d'événements et billets officiels.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <label className="bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-md transition-colors">
                        <span>Changer la photo de profil</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                      <button
                        type="button"
                        className="bg-white border border-[#E2E4ED] hover:bg-slate-50 text-[#111326] font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Nom de la Structure / Organisateur *
                    </label>
                    <input
                      type="text"
                      defaultValue="Super Étoile Production"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Adresse Email Officielle *
                    </label>
                    <input
                      type="email"
                      defaultValue="contact@superetoile.sn"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Téléphone de contact *
                    </label>
                    <input
                      type="tel"
                      defaultValue="+221 77 123 45 67"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#666A80] mb-1">
                      Ville / Siège au Sénégal *
                    </label>
                    <input
                      type="text"
                      defaultValue="Dakar, Sénégal"
                      className="w-full bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E4ED] flex justify-end">
                  <button
                    type="button"
                    className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold px-6 py-3 rounded-xl shadow-md text-sm"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E4ED] pb-4">
                  <h3 className="font-bold text-lg text-[#111326]">
                    Vos événements récents
                  </h3>
                  <span className="text-xs text-[#009FEF] font-bold">3 Événements actifs</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-[#111326]">
                    <thead className="bg-[#F7F7FA] text-xs uppercase text-[#666A80] font-semibold border-y border-[#E2E4ED]">
                      <tr>
                        <th className="px-4 py-3">Événement</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Billets Vendus</th>
                        <th className="px-4 py-3">Revenus</th>
                        <th className="px-4 py-3 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E4ED]">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-bold">Youssou N'Dour — Live</td>
                        <td className="px-4 py-3.5 text-xs text-[#666A80]">14 Nov 2026</td>
                        <td className="px-4 py-3.5 font-semibold">1 842 / 2000</td>
                        <td className="px-4 py-3.5 font-bold text-[#009FEF]">18 420 000 FCFA</td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            En cours
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-bold">Festival Colors Dakar</td>
                        <td className="px-4 py-3.5 text-xs text-[#666A80]">05 Déc 2026</td>
                        <td className="px-4 py-3.5 font-semibold">850 / 1500</td>
                        <td className="px-4 py-3.5 font-bold text-[#009FEF]">6 250 000 FCFA</td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            En cours
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-3.5 font-bold">Africa Tech Summit</td>
                        <td className="px-4 py-3.5 text-xs text-[#666A80]">18 Nov 2026</td>
                        <td className="px-4 py-3.5 font-semibold">375 / 400</td>
                        <td className="px-4 py-3.5 font-bold text-[#009FEF]">8 625 000 FCFA</td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            Bientôt
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
