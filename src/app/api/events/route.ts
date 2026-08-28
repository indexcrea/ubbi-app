import { NextResponse } from "next/server";
import { MOCK_EVENTS } from "@/data/mockEvents";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      events: MOCK_EVENTS,
      total: MOCK_EVENTS.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, venue, date, time, googleMapsUrl, image, organizerName, organizerAvatar, tickets } = body;

    if (!title || !venue) {
      return NextResponse.json(
        { success: false, message: "Nom de l'événement et lieu requis." },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `evt-${Date.now()}`;

    const newEvent = {
      id: `evt-api-${Date.now()}`,
      slug,
      title,
      category: category || "Concert",
      date: date || "Date à venir",
      time: time || "20:00",
      location: "Dakar",
      venue,
      googleMapsUrl: googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue + " Senegal")}`,
      minPrice: tickets?.length > 0 ? Math.min(...tickets.map((t: any) => t.price)) : 5000,
      image: image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      createdOnSite: true,
      organizer: {
        name: organizerName || "Mon Organisation Ubbi",
        verified: true,
        avatar: organizerAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      description: `Grand événement ${title} à ${venue}. Billets officiels sur Ubbi.`,
      tickets: tickets || [{ id: "t1", name: "ENTRÉE UNIQUE", price: 5000, qty: 500 }],
    };

    return NextResponse.json({
      success: true,
      message: "Événement créé avec succès",
      event: newEvent,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'événement" },
      { status: 500 }
    );
  }
}
