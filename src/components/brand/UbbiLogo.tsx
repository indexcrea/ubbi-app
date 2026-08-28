import React from "react";

interface UbbiLogoProps {
  variant?: "default" | "light" | "icon-only" | "vertical";
  className?: string;
  height?: number;
  showTagline?: boolean;
}

export const UbbiLogo: React.FC<UbbiLogoProps> = ({
  variant = "default",
  className = "",
  height = 40,
  showTagline = true,
}) => {
  const isLight = variant === "light";

  if (variant === "icon-only") {
    return (
      <div className={`inline-block overflow-hidden relative select-none ${className}`} style={{ height: height }}>
        <img
          src="/ubbi-official-logo.png"
          alt="Ubbi"
          style={{ height: height, width: "auto", objectFit: "contain" }}
          className={`h-full w-auto ${isLight ? "brightness-200" : ""}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center select-none ${
        variant === "vertical" ? "flex-col text-center" : "flex-row"
      } ${className}`}
    >
      <img
        src="/ubbi-official-logo.png"
        alt="Ubbi — Ticketing & Event Access"
        style={{ height: height, width: "auto", objectFit: "contain" }}
        className={`h-full w-auto max-h-none transition-all ${
          isLight ? "brightness-200 invert contrast-200" : ""
        }`}
      />
    </div>
  );
};
