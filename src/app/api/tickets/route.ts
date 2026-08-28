import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get("id") || "UBBI-2026-9842";

  return NextResponse.json({
    success: true,
    ticket: {
      ticketNumber: ticketId,
      eventName: "Youssou N'Dour Live at Dakar Arena",
      category: "VIP",
      date: "14 Novembre 2026",
      time: "20:30",
      venue: "Dakar Arena, Diamniadio",
      attendeeName: "Amadou Diallo",
      status: "VALIDE",
      qrCodePayload: `https://ubbi.sn/ticket/${ticketId}`,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventSlug, category, attendeeName, phone, email } = body;

    const ticketNumber = `UBBI-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      message: "Billet émis avec succès",
      ticket: {
        ticketNumber,
        eventSlug,
        category: category || "STANDARD",
        attendeeName: attendeeName || "Client Ubbi",
        phone: phone || "+221 77 000 00 00",
        email: email || "client@ubbi.sn",
        status: "VALIDE",
        url: `https://ubbi.sn/ticket/${ticketNumber}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'émission du billet" },
      { status: 500 }
    );
  }
}
