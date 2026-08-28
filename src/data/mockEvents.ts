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
    id: "evt-on-seclate",
    slug: "on-seclate",
    title: "on s'eclate",
    category: "Concert",
    date: "14 Nov 2026",
    time: "20:00",
    location: "Dakar",
    venue: "Dakar, Sénégal",
    minPrice: 2000,
    featured: true,
    createdOnSite: true,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    organizer: {
      name: "Organisateur Ubbi",
      verified: true,
      avatar: "/ubbi-monogramme-u.png",
    },
    description: "Événement officiel créé sur Ubbi. Billetterie ouverte avec entrée unique à 2 000 FCFA et frais de plateforme à 3,5%.",
    tickets: [
      {
        id: "t-on-seclate-std",
        name: "ENTRÉE UNIQUE",
        price: 2000,
        available: 500,
        description: "Accès à l'événement",
        features: ["Billet digital QR", "Validation instantanée à la porte"],
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
