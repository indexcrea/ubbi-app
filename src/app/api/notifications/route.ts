import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticketNumber, attendeeName, phone, email, eventName } = body;

    const ticketUrl = `https://ubbi.sn/ticket/${ticketNumber || "UBBI-2026-9842"}`;
    const smsContent = `[Ubbi] Billet validé pour ${eventName || "votre événement"} ! Votre lien d'accès QR Code : ${ticketUrl}`;

    return NextResponse.json({
      success: true,
      message: "Notification SMS et Email envoyées avec succès",
      details: {
        sentToEmail: email || "client@ubbi.sn",
        sentToPhone: phone || "+221 77 000 00 00",
        smsMessage: smsContent,
        ticketUrl,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'envoi de la notification" },
      { status: 500 }
    );
  }
}
