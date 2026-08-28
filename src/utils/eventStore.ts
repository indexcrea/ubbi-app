import { MOCK_EVENTS, EventItem } from "@/data/mockEvents";

const STORAGE_KEY = "ubbi_custom_events";

export function getStoredEvents(): EventItem[] {
  if (typeof window === "undefined") {
    return MOCK_EVENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return MOCK_EVENTS;
    const customEvents: EventItem[] = JSON.parse(raw);
    // Combine custom events at the beginning + base mock events
    return [...customEvents, ...MOCK_EVENTS];
  } catch (e) {
    console.error("Failed to load events from storage", e);
    return MOCK_EVENTS;
  }
}

export function saveNewEvent(data: {
  title: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  googleMapsUrl?: string;
  description?: string;
  image?: string;
  organizerName?: string;
  organizerAvatar?: string;
  tickets: Array<{ name: string; price: number; qty: number }>;
}): EventItem {
  const customEvents = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    : [];

  const slug = data.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `evt-${Date.now()}`;

  const minPrice = data.tickets.length > 0
    ? Math.min(...data.tickets.map((t) => t.price))
    : 5000;

  const defaultMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue + " Senegal")}`;

  const newEvent: EventItem = {
    id: `evt-user-${Date.now()}`,
    slug: slug,
    title: data.title,
    category: data.category as any,
    date: data.date || "Date à venir",
    time: data.time || "20:00",
    location: "Dakar",
    venue: data.venue,
    googleMapsUrl: data.googleMapsUrl && data.googleMapsUrl.trim() !== "" ? data.googleMapsUrl : defaultMapsUrl,
    minPrice: minPrice,
    image: data.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    createdOnSite: true,
    organizer: {
      name: data.organizerName && data.organizerName.trim() !== "" ? data.organizerName : "Mon Organisation Ubbi",
      verified: true,
      avatar: data.organizerAvatar && data.organizerAvatar.trim() !== "" ? data.organizerAvatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    description: data.description || `Grand événement ${data.title} à ${data.venue}. Achetez vos billets officiels sur Ubbi.`,
    tickets: data.tickets.map((t, idx) => ({
      id: `t-user-${Date.now()}-${idx}`,
      name: t.name,
      price: t.price,
      available: t.qty || 100,
      description: `Billet d'accès ${t.name}`,
      features: ["Entrée prioritaire", "Scannage QR Code instantané", "Billet digital"],
    })),
  };

  const updatedCustomEvents = [newEvent, ...customEvents];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomEvents));
  }

  return newEvent;
}
