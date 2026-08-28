"use client";

import React, { useState, useRef } from "react";
import { UbbiLogo } from "../brand/UbbiLogo";
import { QrCode, CheckCircle2, ShieldCheck, Download, Share2, Sparkles, Scan, ArrowRight, Loader2 } from "lucide-react";
import { generateTicketPDF } from "@/utils/generateTicketPDF";

interface DigitalTicketCardProps {
  ticketNumber?: string;
  eventName?: string;
  eventImage?: string;
  category?: string;
  date?: string;
  time?: string;
  venue?: string;
  attendeeName?: string;
  status?: "VALIDE" | "UTILISÉ" | "ANNULÉ";
}

export const DigitalTicketCard: React.FC<DigitalTicketCardProps> = ({
  ticketNumber = "UBBI-2026-9842",
  eventName = "Youssou N'Dour Live at Dakar Arena",
  eventImage = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  category = "VIP",
  date = "14 Novembre 2026",
  time = "20:30",
  venue = "Dakar Arena, Diamniadio",
  attendeeName = "Amadou Diallo",
  status = "VALIDE",
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await generateTicketPDF(
      {
        ticketNumber,
        eventName,
        category,
        date,
        time,
        venue,
        attendeeName,
        status,
      },
      ticketRef.current
    );
    setIsDownloading(false);
  };

  return (
    <div className="relative max-w-md mx-auto w-full group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#2A1464] via-[#009FEF] to-[#2A1464] rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />

      {/* Ticket Container */}
      <div ref={ticketRef} className="relative bg-white rounded-3xl shadow-2xl border border-[#E2E4ED] overflow-hidden text-[#111326]">
        
        {/* ========================================================= */}
        {/* GABARIT BILLET : EN-TÊTE PERSONNALISÉselon L'AFFICHE         */}
        {/* ========================================================= */}
        <div className="relative h-44 p-5 flex flex-col justify-between overflow-hidden text-white">
          {/* Photo de couverture de l'affiche de l'événement */}
          <img
            src={eventImage}
            alt={eventName}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#190262] via-[#190262]/80 to-black/40" />

          {/* Ligne Supérieure : Logo Ubbi & Badge Catégorie */}
          <div className="flex items-center justify-between relative z-10">
            <UbbiLogo variant="light" height={28} showTagline={false} />
            <div className="bg-[#009FEF] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Pass {category}</span>
            </div>
          </div>

          {/* Titre de l'événement */}
          <div className="relative z-10">
            <span className="text-[10px] text-[#009FEF] font-extrabold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs inline-block mb-1">
              Affiche Officielle de l'Événement
            </span>
            <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">{eventName}</h3>
          </div>
        </div>

        {/* Ligne de perforation & Numéro de Billet */}
        <div className="relative flex items-center justify-between px-4 py-2 bg-slate-50 border-y border-dashed border-[#E2E4ED]">
          <div className="w-4 h-4 bg-[#F7F7FA] rounded-full -ml-6 border border-[#E2E4ED]" />
          <div className="flex-1 mx-2 border-b border-dashed border-[#C4C7D4]" />
          <div className="text-[11px] font-mono text-[#2A1464] uppercase tracking-wider font-extrabold">
            {ticketNumber}
          </div>
          <div className="flex-1 mx-2 border-b border-dashed border-[#C4C7D4]" />
          <div className="w-4 h-4 bg-[#F7F7FA] rounded-full -mr-6 border border-[#E2E4ED]" />
        </div>

        {/* Détails du Billet */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Titulaire du billet</span>
              <span className="font-bold text-[#111326] text-sm">{attendeeName}</span>
            </div>
            <div>
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Statut d'accès</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {status}
              </span>
            </div>

            <div>
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Date &amp; Heure</span>
              <span className="font-bold text-[#111326]">{date}</span>
              <span className="text-[#666A80] block text-[11px]">{time}</span>
            </div>
            <div>
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Lieu</span>
              <span className="font-bold text-[#111326] truncate block">{venue}</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* GABARIT BILLET : EMPLACEMENT QR CODE AUTOMATIQUE          */}
          {/* ========================================================= */}
          <div className="relative rounded-2xl p-4 flex flex-col items-center justify-center text-center overflow-hidden border border-[#E2E4ED]">
            {/* Arrière-plan de l'affiche de l'événement flouté en fond autour du QR */}
            <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
              <img src={eventImage} alt="" className="w-full h-full object-cover filter blur-md scale-110" />
            </div>

            {/* Scan Beam Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#009FEF]/30 via-transparent to-[#009FEF]/10 z-30 animate-pulse flex items-center justify-center">
                <div className="bg-[#2A1464] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <Scan className="w-4 h-4 text-[#009FEF] animate-spin" />
                  Passe la porte Ubbi...
                </div>
              </div>
            )}

            {/* Emplacement QR Code Dédié (Encadré blanc net) */}
            <div className="relative z-10 w-full max-w-[210px] bg-white rounded-2xl p-3 shadow-md border-2 border-[#009FEF]/40 flex flex-col items-center">
              <span className="text-[9px] font-extrabold text-[#009FEF] uppercase tracking-wider mb-2 bg-[#E5F6FF] px-2.5 py-0.5 rounded-full border border-[#009FEF]/20">
                Emplacement QR Code
              </span>

              {/* QR Code Graphics auto-généré */}
              <div className="p-1.5 bg-white rounded-xl border border-[#E2E4ED] mb-1">
                <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* QR Finder Patterns */}
                  <rect x="5" y="5" width="28" height="28" rx="4" fill="#2A1464" />
                  <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="13" width="12" height="12" rx="1" fill="#2A1464" />

                  <rect x="67" y="5" width="28" height="28" rx="4" fill="#2A1464" />
                  <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="75" y="13" width="12" height="12" rx="1" fill="#2A1464" />

                  <rect x="5" y="67" width="28" height="28" rx="4" fill="#2A1464" />
                  <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="13" y="75" width="12" height="12" rx="1" fill="#2A1464" />

                  {/* Random Data Matrices simulating real QR */}
                  <rect x="38" y="8" width="6" height="6" fill="#009FEF" />
                  <rect x="48" y="8" width="12" height="6" fill="#2A1464" />
                  <rect x="38" y="18" width="6" height="12" fill="#2A1464" />
                  <rect x="48" y="24" width="8" height="6" fill="#009FEF" />

                  <rect x="8" y="38" width="12" height="6" fill="#2A1464" />
                  <rect x="24" y="38" width="6" height="12" fill="#009FEF" />
                  <rect x="8" y="48" width="6" height="12" fill="#2A1464" />

                  {/* Ubbi Center Icon Emblem */}
                  <rect x="38" y="38" width="24" height="24" rx="6" fill="#2A1464" />
                  <polygon points="45,43 56,46 56,58 45,55" fill="#009FEF" />
                  <circle cx="48" cy="50" r="1" fill="#FFFFFF" />

                  <rect x="67" y="38" width="12" height="6" fill="#2A1464" />
                  <rect x="83" y="38" width="12" height="12" fill="#009FEF" />
                  <rect x="67" y="48" width="6" height="12" fill="#2A1464" />

                  <rect x="38" y="67" width="12" height="6" fill="#2A1464" />
                  <rect x="54" y="67" width="10" height="10" fill="#009FEF" />
                  <rect x="38" y="77" width="6" height="18" fill="#2A1464" />
                  <rect x="48" y="83" width="16" height="12" fill="#2A1464" />
                  <rect x="68" y="67" width="27" height="6" fill="#2A1464" />
                  <rect x="68" y="77" width="12" height="18" fill="#009FEF" />
                  <rect x="83" y="83" width="12" height="12" fill="#2A1464" />
                </svg>
              </div>

              <span className="text-[10px] font-mono text-[#2A1464] font-extrabold mt-0.5">
                {ticketNumber}
              </span>
            </div>

            <p className="text-[11px] text-[#666A80] font-semibold mt-3 relative z-10">
              Scannage automatique à la porte d'accès Ubbi
            </p>

            <button
              onClick={simulateScan}
              className="mt-2 text-xs font-bold text-[#009FEF] hover:text-[#0084C9] bg-white px-3.5 py-1.5 rounded-xl border border-[#009FEF]/40 shadow-xs flex items-center gap-1.5 transition-all relative z-10"
            >
              <Scan className="w-3.5 h-3.5" />
              Simuler le contrôle d'accès
            </button>
          </div>
        </div>

        {/* Barre d'Actions Bas du Billet */}
        <div className="px-6 py-4 bg-slate-100/70 border-t border-[#E2E4ED] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[#2A1464] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#009FEF]" />
            Billet Crypté Ubbi SecuPass™
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-[#2A1464] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E2E4ED]" title="Partager">
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="p-2 text-[#2A1464] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E2E4ED] disabled:opacity-50"
              title="Télécharger Billet PDF"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 text-[#009FEF] animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-[#009FEF]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
