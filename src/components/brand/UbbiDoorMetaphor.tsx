import React from "react";

interface UbbiDoorMetaphorProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

export const UbbiDoorMetaphor: React.FC<UbbiDoorMetaphorProps> = ({
  size = "md",
  className = "",
  glow = true,
}) => {
  const dimensions = {
    sm: { width: 120, height: 140 },
    md: { width: 220, height: 260 },
    lg: { width: 340, height: 400 },
    xl: { width: 480, height: 560 },
  }[size];

  return (
    <div className={`relative inline-block ${className}`}>
      {glow && (
        <div
          className="absolute inset-0 bg-[#009FEF]/20 blur-3xl rounded-full transform scale-125 animate-pulse"
          style={{ pointerEvents: "none" }}
        />
      )}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 340 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-xl"
      >
        <defs>
          <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#009FEF" />
            <stop offset="100%" stopColor="#0077C8" />
          </linearGradient>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#009FEF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#009FEF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* U Arch Frame Deep Purple */}
        <path
          d="M40 30 C40 13.431 53.431 0 70 0 H130 C146.569 0 160 13.431 160 30 V220 C160 275.228 204.772 320 260 320 H280 C296.569 320 310 333.431 310 350 C310 366.569 296.569 380 280 380 H260 C171.634 380 100 308.366 100 220 V80 H70 C53.431 80 40 66.569 40 50 V30 Z"
          fill="#2A1464"
        />

        {/* Access Light Beam Projection */}
        <polygon points="170,120 330,390 190,380" fill="url(#beamGradient)" className="animate-beam" />

        {/* Electric Blue Perspective Door Opening Outward */}
        <polygon points="170,40 280,80 280,340 170,360" fill="url(#doorGradient)" />

        {/* Door Frame Inner Highlights */}
        <line x1="170" y1="40" x2="170" y2="360" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.4" />
        <circle cx="195" cy="200" r="7" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
