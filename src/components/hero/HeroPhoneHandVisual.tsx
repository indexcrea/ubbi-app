"use client";

import React from "react";

export const HeroPhoneHandVisual: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
      {/* Visuel Hero composition complète recouvrant 100% de la largeur du Hero avec object-cover */}
      <img
        src="/ubbi-hero-woman-smartphone.png"
        alt="UBBI Hero Composition"
        className="w-full h-full object-cover object-right"
        style={{
          objectFit: "cover",
          objectPosition: "right center",
        }}
      />
    </div>
  );
};
