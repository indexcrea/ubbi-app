"use client";

import React from "react";

export const HeroPhoneHandVisual: React.FC = () => {
  return (
    <>
      {/* Desktop View (Background composition) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
        <img
          src="/ubbi-hero-woman-smartphone.png"
          alt="UBBI Hero Composition"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Mobile View (Clean image placed below text & CTA, zero overlap) */}
      <div className="block lg:hidden relative z-20 mt-6 w-full max-w-sm mx-auto px-4 pointer-events-none select-none">
        <img
          src="/ubbi-hero-woman-smartphone.png"
          alt="UBBI Hero Composition Mobile"
          className="w-full h-auto object-contain rounded-2xl drop-shadow-xl max-h-[320px] mx-auto"
        />
      </div>
    </>
  );
};
