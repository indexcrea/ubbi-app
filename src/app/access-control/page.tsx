"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QRScannerModule } from "@/components/access/QRScannerModule";
import { ArrowLeft, ShieldCheck, QrCode } from "lucide-react";

export default function AccessControlPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FA] text-[#111326] antialiased">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard/organizer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#666A80] hover:text-[#009FEF]"
          >
            <ArrowLeft className="w-4 h-4" />
            Tableau de Bord Organisateur
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-[#2A1464] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <QrCode className="w-3.5 h-3.5 text-[#009FEF]" />
              Mode Contrôleur Porte Ubbi
            </span>
          </div>
        </div>

        {/* QR Scanner Component */}
        <QRScannerModule />
      </main>

      <Footer />
    </div>
  );
}
