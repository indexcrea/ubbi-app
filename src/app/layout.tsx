import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ubbi — Ticketing & Event Access",
  description:
    "Découvrez, achetez et vivez vos événements avec Ubbi, la plateforme sénégalaise de ticketing et d'accès aux événements.",
  keywords: [
    "Ubbi",
    "Ticketing",
    "Billetterie Sénégal",
    "Événements Dakar",
    "Concert Dakar",
    "Festival Sénégal",
    "Wave",
    "Orange Money",
    "Event Access",
  ],
  authors: [{ name: "Ubbi Technologies" }],
  openGraph: {
    title: "Ubbi — Ticketing & Event Access",
    description:
      "Ouvre l'expérience. La nouvelle façon de découvrir, acheter et vivre vos événements au Sénégal.",
    url: "https://ubbi-tickets.com",
    siteName: "Ubbi",
    locale: "fr_SN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubbi — Ticketing & Event Access",
    description:
      "Ouvre l'expérience. La nouvelle façon de découvrir, acheter et vivre vos événements au Sénégal.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#F7F7FA] text-[#111326]">
        {children}
      </body>
    </html>
  );
}
