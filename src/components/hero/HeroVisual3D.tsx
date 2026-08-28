"use client";

import React from "react";
import { UbbiLogo } from "@/components/brand/UbbiLogo";

export const HeroVisual3D: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[480px] sm:h-[520px] flex items-center justify-center">
      {/* Background Soft Blue Glow */}
      <div className="absolute inset-0 bg-[#009FEF]/20 blur-3xl rounded-full transform scale-110 pointer-events-none animate-pulse" />

      {/* 3D Purple Open Door (Positioned behind the phone on the right) */}
      <div className="absolute right-0 sm:right-4 top-6 w-48 sm:w-56 h-[380px] sm:h-[420px] z-0 transform rotate-y-[-25deg] rotate-z-[2deg] perspective-1000">
        <div className="w-full h-full bg-gradient-to-b from-[#2A1464] to-[#1D0C4A] rounded-2xl border-4 border-[#3D1E8A] shadow-2xl relative overflow-hidden flex items-center justify-center">
          {/* Door Handle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-12 bg-slate-300 rounded-sm shadow-md" />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-100 rounded-full shadow-md" />
          
          {/* Bright Electric Blue Light Beam emerging from behind the open door */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#009FEF]/40 to-[#009FEF]/80 animate-beam pointer-events-none" />
        </div>
      </div>

      {/* Smartphone Device Mockup (Positioned in front, slightly overlapping the door) */}
      <div className="relative z-10 w-[270px] sm:w-[300px] bg-[#111326] p-3 rounded-[44px] shadow-2xl border-[5px] border-slate-800 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
        {/* Dynamic Island / Speaker notch */}
        <div className="w-24 h-4 bg-black mx-auto rounded-full mb-3 flex items-center justify-center gap-1">
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800" />
          <div className="w-8 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Screen Container */}
        <div className="bg-[#F7F7FA] rounded-[34px] p-4 text-[#111326] shadow-inner space-y-3">
          {/* App Header */}
          <div className="flex items-center justify-center pt-1 pb-2 border-b border-[#E2E4ED]">
            <UbbiLogo height={24} showTagline={false} />
          </div>

          {/* Ticket Body inside Phone */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-sm space-y-2 text-center">
            <h4 className="font-extrabold text-[#111326] text-sm">Festival Colors</h4>
            <p className="text-[11px] text-[#666A80]">
              Sam. 24 Mai 2025 - 20:00
            </p>
            <p className="text-[10px] text-[#666A80] font-medium">
              Place du Souvenir, Dakar
            </p>

            {/* QR Code */}
            <div className="my-2 p-2 bg-slate-50 border border-[#E2E4ED] rounded-xl inline-block">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="28" height="28" rx="3" fill="#2A1464" />
                <rect x="9" y="9" width="20" height="20" rx="1.5" fill="#FFFFFF" />
                <rect x="13" y="13" width="12" height="12" rx="1" fill="#2A1464" />

                <rect x="67" y="5" width="28" height="28" rx="3" fill="#2A1464" />
                <rect x="71" y="9" width="20" height="20" rx="1.5" fill="#FFFFFF" />
                <rect x="75" y="13" width="12" height="12" rx="1" fill="#2A1464" />

                <rect x="5" y="67" width="28" height="28" rx="3" fill="#2A1464" />
                <rect x="9" y="71" width="20" height="20" rx="1.5" fill="#FFFFFF" />
                <rect x="13" y="75" width="12" height="12" rx="1" fill="#2A1464" />

                <rect x="38" y="8" width="6" height="6" fill="#009FEF" />
                <rect x="48" y="8" width="12" height="6" fill="#2A1464" />
                <rect x="38" y="38" width="24" height="24" rx="4" fill="#2A1464" />
                <polygon points="45,43 56,46 56,58 45,55" fill="#009FEF" />
                <rect x="67" y="38" width="27" height="6" fill="#2A1464" />
                <rect x="68" y="67" width="12" height="18" fill="#009FEF" />
                <rect x="83" y="83" width="12" height="12" fill="#2A1464" />
              </svg>
            </div>

            {/* Ticket Info Row */}
            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#E2E4ED]">
              <div className="text-left">
                <span className="text-[#666A80] block text-[9px]">VIP</span>
                <span className="font-mono text-[#111326] font-semibold">UBB-5248-1609</span>
              </div>
              <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[9px] border border-emerald-300">
                Valide
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
