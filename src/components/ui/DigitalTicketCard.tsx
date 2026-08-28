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
  status?: "NON SCANNÉ" | "VALIDE" | "UTILISÉ" | "ANNULÉ" | string;
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
  status = "NON SCANNÉ",
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
        eventImage,
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
        {/* AFFICHE OFFICIELLE EN HAUT (Clean Image Display)           */}
        {/* ========================================================= */}
        <div className="relative h-44 w-full overflow-hidden bg-[#2A1464]">
          <img
            src={eventImage}
            alt={eventName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ========================================================= */}
        {/* INFO BAR EN BAS DE L'AFFICHE : Logo, Titre & Badge Pass   */}
        {/* ========================================================= */}
        <div className="p-4 bg-white border-b border-[#E2E4ED] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/ubbi-monogramme-u.png"
              alt="Ubbi Monogramme U"
              className="h-9 w-auto object-contain flex-shrink-0"
            />
            <div>
              <span className="text-[9px] font-extrabold text-[#009FEF] uppercase tracking-wider block">
                Événement Officiel
              </span>
              <h3 className="text-base font-extrabold text-[#111326] leading-tight">{eventName}</h3>
            </div>
          </div>

          <div className="bg-[#009FEF] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Pass {category}</span>
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
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Date &amp; Heure</span>
              <span className="font-bold text-[#111326] block text-sm">{date}</span>
              <span className="text-[#666A80] text-xs font-medium">{time}</span>
            </div>

            <div>
              <span className="text-[#666A80] block text-[10px] uppercase font-semibold tracking-wider">Lieu de l'événement</span>
              <span className="font-bold text-[#111326] text-sm truncate block">{venue}</span>
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

            {/* Emplacement QR Code Dédié (Encadré blanc net) */}
            <div className="relative z-10 w-full max-w-[220px] bg-white rounded-2xl p-3.5 shadow-md border-2 border-[#009FEF]/40 flex flex-col items-center">
              <span className="text-[9px] font-extrabold text-[#009FEF] uppercase tracking-wider mb-2 bg-[#E5F6FF] px-2.5 py-0.5 rounded-full border border-[#009FEF]/20">
                QR CODE SÉCURISÉ UBBI
              </span>

              {/* VRAI QR Code ISO scannable par tout appareil */}
              <div className="p-1 bg-white rounded-xl border border-[#E2E4ED] shadow-xs mb-1">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(ticketNumber)}`}
                  alt={`QR Code Billet ${ticketNumber}`}
                  crossOrigin="anonymous"
                  className="w-36 h-36 object-contain rounded-lg"
                />
              </div>

              <span className="text-[11px] font-mono text-[#2A1464] font-extrabold mt-1">
                {ticketNumber}
              </span>
            </div>

            <p className="text-[11px] text-[#666A80] font-semibold mt-3 relative z-10">
              Présentez ce billet à l'entrée pour valider votre accès
            </p>
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
