import { MOCK_EVENTS, EventItem } from "@/data/mockEvents";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const STORAGE_KEY = "ubbi_custom_events";

export function getStoredEvents(): EventItem[] {
  if (typeof window === "undefined") {
    return MOCK_EVENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const customEvents: EventItem[] = raw ? JSON.parse(raw) : [];
    return [...customEvents, ...MOCK_EVENTS];
  } catch (e) {
    console.error("Failed to load events from storage", e);
    return MOCK_EVENTS;
  }
}

export async function fetchSupabaseEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured()) {
    return getStoredEvents();
  }

  try {
    const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("Supabase fetch error, fallback to local:", error);
      return getStoredEvents();
    }

    const fetchedEvents: EventItem[] = data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      date: item.date,
      time: item.time,
      location: "Dakar",
      venue: item.venue,
      googleMapsUrl: item.google_maps_url,
      minPrice: item.min_price,
      image: item.image,
      featured: item.featured,
      createdOnSite: true,
      organizer: {
        name: item.organizer_name || "Mon Organisation Ubbi",
        verified: true,
        avatar: item.organizer_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      description: `Événement ${item.title} à ${item.venue}. Billets officiels sur Ubbi.`,
      tickets: item.tickets_json || [],
    }));

    return [...fetchedEvents, ...MOCK_EVENTS];
  } catch (err) {
    console.error("Supabase fetch exception", err);
    return getStoredEvents();
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

  // Save to local storage
  const updatedCustomEvents = [newEvent, ...customEvents];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomEvents));
  }

  // Asynchronously insert into Supabase if configured
  if (isSupabaseConfigured()) {
    supabase
      .from("events")
      .insert([
        {
          slug: newEvent.slug,
          title: newEvent.title,
          category: newEvent.category,
          venue: newEvent.venue,
          date: newEvent.date,
          time: newEvent.time,
          google_maps_url: newEvent.googleMapsUrl,
          min_price: newEvent.minPrice,
          image: newEvent.image,
          organizer_name: newEvent.organizer.name,
          organizer_avatar: newEvent.organizer.avatar,
          tickets_json: newEvent.tickets,
          featured: true,
        },
      ])
      .then(({ error }) => {
        if (error) console.error("Supabase insert error:", error);
      });
  }

  return newEvent;
}

export function deleteStoredEvent(idOrSlug: string): EventItem[] {
  if (typeof window === "undefined") return MOCK_EVENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const customEvents: EventItem[] = raw ? JSON.parse(raw) : [];
    const updatedCustomEvents = customEvents.filter(
      (e) => e.id !== idOrSlug && e.slug !== idOrSlug
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomEvents));

    if (isSupabaseConfigured()) {
      supabase.from("events").delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`).then(({ error }) => {
        if (error) console.error("Supabase delete error:", error);
      });
    }

    return getStoredEvents();
  } catch (e) {
    console.error("Failed to delete event", e);
    return getStoredEvents();
  }
}

export function toggleSuspendEvent(idOrSlug: string): EventItem[] {
  if (typeof window === "undefined") return getStoredEvents();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const customEvents: EventItem[] = raw ? JSON.parse(raw) : [];
    const updatedCustomEvents = customEvents.map((e) => {
      if (e.id === idOrSlug || e.slug === idOrSlug) {
        return { ...e, isSuspended: !((e as any).isSuspended) };
      }
      return e;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomEvents));
    return getStoredEvents();
  } catch (e) {
    console.error("Failed to toggle suspension", e);
    return getStoredEvents();
  }
}
