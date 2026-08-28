export interface TicketCategory {
  id: string;
  name: "STANDARD" | "VIP" | "VVIP" | string;
  price: number;
  description?: string;
  available: number;
  features?: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: "Concert" | "Festival" | "Sport" | "Conférence" | "Spectacle" | "Culture" | "Formation" | "Business";
  date: string;
  time: string;
  location: string;
  venue: string;
  minPrice: number;
  image: string;
  googleMapsUrl?: string;
  featured?: boolean;
  createdOnSite?: boolean;
  organizer: {
    name: string;
    verified: boolean;
    avatar: string;
  };
  description: string;
  tickets: TicketCategory[];
}

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    slug: "youssou-ndour-live",
    title: "Youssou N'Dour Live",
    category: "Concert",
    date: "31 Mai 2025",
    time: "20:30",
    location: "Dakar",
    venue: "Dakar Arena",
    minPrice: 10000,
    featured: true,
    createdOnSite: true,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Super Étoile Production",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    description:
      "Le roi du Mbalax revient sur la scène mythique de la Dakar Arena pour un concert d'exception. Une soirée magique et explosive avec des invités surprises d'Afrique et du monde entier.",
    tickets: [
      {
        id: "t1-std",
        name: "STANDARD",
        price: 10000,
        available: 450,
        description: "Accès général en tribune haute",
        features: ["Placement libre tribune", "Entrée dès 18h30", "Billet digital QR"],
      },
      {
        id: "t1-vip",
        name: "VIP",
        price: 25000,
        available: 120,
        description: "Accès parquet devant la scène",
        features: ["Fosse parquet réservée", "Accès prioritaire rapide", "Badge souvenir Ubbi"],
      },
    ],
  },
  {
    id: "evt-2",
    slug: "senegal-vs-bresil",
    title: "Sénégal vs Brésil",
    category: "Sport",
    date: "08 Juin 2025",
    time: "17:00",
    location: "Dakar",
    venue: "Stade Abdoulaye Wade",
    minPrice: 5000,
    featured: true,
    createdOnSite: false,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Fédération Sénégalaise de Football",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
    description:
      "Match amical de prestige opposant les Lions de la Teranga à la Seleção du Brésil au Stade Abdoulaye Wade de Diamniadio. Vivez une ambiance de choc !",
    tickets: [
      {
        id: "t2-std",
        name: "VIRAGE / TRIBUNE POPULAIRE",
        price: 5000,
        available: 2000,
        description: "Placement tribune virage",
        features: ["Accès virage", "Entrée fluide QR Code"],
      },
      {
        id: "t2-vip",
        name: "TRIBUNE ANNEXE VIP",
        price: 15000,
        available: 300,
        description: "Tribune couverte axe central",
        features: ["Vue panoramique", "Accès rapide porte 3"],
      },
    ],
  },
  {
    id: "evt-3",
    slug: "festival-colors",
    title: "Festival Colors",
    category: "Festival",
    date: "24 Mai 2025",
    time: "20:00",
    location: "Dakar",
    venue: "Place du Souvenir, Dakar",
    minPrice: 5000,
    featured: true,
    createdOnSite: true,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Colors Events West Africa",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    description:
      "Le plus grand festival de musique électronique, Afrobeats et d'arts visuels au bord de l'océan Atlantique. Plus de 20 DJs et artistes sur scène.",
    tickets: [
      {
        id: "t3-std",
        name: "STANDARD",
        price: 5000,
        available: 800,
        description: "Pass journée",
        features: ["Accès aux scènes", "Poudre de couleur offerte à l'entrée"],
      },
      {
        id: "t3-vip",
        name: "VIP",
        price: 15000,
        available: 200,
        description: "Pass Lounge VIP face à la mer",
        features: ["Espace ombragé lounge VIP", "Fast-track à l'entrée"],
      },
    ],
  },
  {
    id: "evt-4",
    slug: "africa-tech-summit",
    title: "Africa Tech Summit",
    category: "Conférence",
    date: "20 Juin 2025",
    time: "09:00",
    location: "Dakar",
    venue: "CICAD, Diamniadio",
    minPrice: 15000,
    featured: true,
    createdOnSite: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Tech Hub Senegal",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    description:
      "Le sommet annuel des startups, investisseurs et décideurs technologiques africains. Panels de haut niveau, démonstrations et networking stratégique.",
    tickets: [
      {
        id: "t4-std",
        name: "PASS CONFÉRENCE",
        price: 15000,
        available: 300,
        description: "Pass 2 Jours",
        features: ["Accès à tous les panels", "Espace exposition", "Pause café"],
      },
    ],
  },
];

export const CATEGORIES = [
  "Tous",
  "Concert",
  "Festival",
  "Sport",
  "Conférence",
  "Spectacle",
  "Culture",
  "Formation",
  "Business",
] as const;
