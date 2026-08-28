"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Ticket, Calendar, Heart, User, ShieldCheck, Download, QrCode } from "lucide-react";

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header User Profile */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2A1464] text-white font-black text-2xl flex items-center justify-center shadow-md">
              AD
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#111326]">Amadou Diallo</h1>
              <p className="text-xs text-[#666A80]">amadou.diallo@example.sn • +221 77 842 90 12</p>
              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Compte Ubbi Vérifié
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/events"
              className="bg-[#009FEF] hover:bg-[#0084C9] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
            >
              Trouver un événement
            </Link>
          </div>
        </div>

        {/* My Tickets List */}
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-[#111326] flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#009FEF]" />
            Mes Billets Actifs (1)
          </h2>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E4ED] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#2A1464] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  CONCERT
                </span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  VALIDE
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#111326]">Youssou N'Dour — Live at Dakar Arena</h3>
              <p className="text-xs text-[#666A80]">
                14 Novembre 2026 • 20:30 @ Dakar Arena, Diamniadio
              </p>
              <div className="text-xs font-semibold text-[#2A1464] pt-1">
                Pass VIP • Billet ID: UBBI-2026-9842
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row items-center gap-3 justify-end">
              <Link
                href="/ticket/UBBI-2026-9842"
                className="w-full sm:w-auto bg-[#009FEF] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm text-center flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4 h-4" />
                <span>Afficher QR Code</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
