import jsPDF from "jspdf";

export interface TicketPDFData {
  ticketNumber: string;
  eventName: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  attendeeName: string;
  status?: string;
  eventImage?: string;
}

async function getImageDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

export async function generateTicketPDF(
  data: TicketPDFData,
  _elementRef?: HTMLElement | null
): Promise<void> {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Background fill light grey/purple
    pdf.setFillColor(247, 247, 250);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    // =========================================================
    // BILLET CONTAINER CARD (Centered in A4)
    // =========================================================
    const cardWidth = 140; // 140mm width
    const cardHeight = 200; // 200mm height
    const cardX = (pdfWidth - cardWidth) / 2; // 35mm
    const cardY = 25; // 25mm

    // Draw main card background (white with rounded corners & border)
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 6, 6, "F");

    pdf.setDrawColor(226, 228, 237);
    pdf.setLineWidth(0.4);
    pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 6, 6, "D");

    // =========================================================
    // HEADER BANNER (Deep Violet #190262)
    // =========================================================
    const headerHeight = 45;
    pdf.setFillColor(25, 2, 98); // #190262
    pdf.roundedRect(cardX, cardY, cardWidth, headerHeight, 6, 6, "F");
    // Cover bottom rounded corners of header
    pdf.rect(cardX, cardY + headerHeight - 6, cardWidth, 6, "F");

    // Try drawing Ubbi Monogramme U logo
    const logoDataUrl = await getImageDataUrl("/ubbi-monogramme-u.png");
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, "PNG", cardX + 8, cardY + 8, 12, 14);
    } else {
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text("U", cardX + 8, cardY + 18);
    }

    // Pass Category Badge Top Right
    const badgeText = `PASS ${data.category || "ENTRÉE UNIQUE"}`.toUpperCase();
    pdf.setFillColor(0, 159, 239); // #009FEF
    pdf.roundedRect(cardX + cardWidth - 52, cardY + 9, 44, 8, 4, 4, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(badgeText, cardX + cardWidth - 30, cardY + 14.5, { align: "center" });

    // Official Event Tag
    pdf.setFillColor(0, 0, 0);
    pdf.roundedRect(cardX + 8, cardY + 26, 52, 5, 1, 1, "F");
    pdf.setTextColor(0, 159, 239);
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("AFFICHE OFFICIELLE DE L'ÉVÉNEMENT", cardX + 10, cardY + 29.5);

    // Event Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.eventName, cardX + 8, cardY + 39);

    // =========================================================
    // PERFORATION LINE & TICKET NUMBER
    // =========================================================
    const perfY = cardY + headerHeight + 5;
    pdf.setDrawColor(200, 202, 215);
    pdf.setLineWidth(0.3);
    pdf.setLineDashPattern([1.5, 1.5], 0);
    pdf.line(cardX + 10, perfY, cardX + cardWidth - 10, perfY);
    pdf.setLineDashPattern([], 0); // reset line dash

    pdf.setFillColor(255, 255, 255);
    pdf.rect(cardX + (cardWidth / 2) - 22, perfY - 3, 44, 6, "F");
    pdf.setTextColor(42, 20, 100);
    pdf.setFontSize(9);
    pdf.setFont("courier", "bold");
    pdf.text(data.ticketNumber, cardX + (cardWidth / 2), perfY + 1, { align: "center" });

    // =========================================================
    // TICKET DETAILS GRID
    // =========================================================
    const gridY = perfY + 10;

    // Titulaire du Billet
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("TITULAIRE DU BILLET", cardX + 10, gridY);
    pdf.setTextColor(17, 19, 38);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.attendeeName || "Amadou Diallo", cardX + 10, gridY + 5);

    // Statut d'accès
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("STATUT D'ACCÈS", cardX + 80, gridY);

    pdf.setFillColor(236, 253, 245); // emerald-50
    pdf.setDrawColor(167, 243, 208); // emerald-200
    pdf.roundedRect(cardX + 80, gridY + 1.5, 24, 5.5, 1.5, 1.5, "FD");
    pdf.setTextColor(5, 150, 105); // emerald-600
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text(`✓ ${data.status || "VALIDE"}`, cardX + 92, gridY + 5.2, { align: "center" });

    // Date & Heure
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("DATE & HEURE", cardX + 10, gridY + 14);
    pdf.setTextColor(17, 19, 38);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.date, cardX + 10, gridY + 19);
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(data.time, cardX + 10, gridY + 23.5);

    // Lieu
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("LIEU", cardX + 80, gridY + 14);
    pdf.setTextColor(17, 19, 38);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.venue, cardX + 80, gridY + 19);

    // =========================================================
    // CENTERED QR CODE CARD
    // =========================================================
    const qrBoxY = gridY + 30;
    const qrBoxWidth = 120;
    const qrBoxHeight = 85;
    const qrBoxX = cardX + (cardWidth - qrBoxWidth) / 2;

    pdf.setFillColor(247, 251, 254);
    pdf.roundedRect(qrBoxX, qrBoxY, qrBoxWidth, qrBoxHeight, 5, 5, "F");
    pdf.setDrawColor(226, 228, 237);
    pdf.roundedRect(qrBoxX, qrBoxY, qrBoxWidth, qrBoxHeight, 5, 5, "D");

    // QR Badge Pill
    pdf.setFillColor(229, 246, 255);
    pdf.setDrawColor(0, 159, 239);
    pdf.roundedRect(qrBoxX + (qrBoxWidth / 2) - 22, qrBoxY + 5, 44, 5.5, 2, 2, "FD");
    pdf.setTextColor(0, 159, 239);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text("QR CODE SÉCURISÉ UBBI", qrBoxX + (qrBoxWidth / 2), qrBoxY + 9, { align: "center" });

    // Load & Add Real Scannable ISO QR Code
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.ticketNumber)}`;
    const qrDataUrl = await getImageDataUrl(qrApiUrl);

    if (qrDataUrl) {
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(qrBoxX + (qrBoxWidth / 2) - 24, qrBoxY + 14, 48, 48, 3, 3, "F");
      pdf.setDrawColor(226, 228, 237);
      pdf.roundedRect(qrBoxX + (qrBoxWidth / 2) - 24, qrBoxY + 14, 48, 48, 3, 3, "D");

      pdf.addImage(qrDataUrl, "PNG", qrBoxX + (qrBoxWidth / 2) - 21, qrBoxY + 17, 42, 42);
    }

    // QR Ticket Ref below QR
    pdf.setTextColor(42, 20, 100);
    pdf.setFontSize(8.5);
    pdf.setFont("courier", "bold");
    pdf.text(data.ticketNumber, qrBoxX + (qrBoxWidth / 2), qrBoxY + 68, { align: "center" });

    // Caption
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("Scannage automatique à la porte d'accès Ubbi", qrBoxX + (qrBoxWidth / 2), qrBoxY + 76, { align: "center" });

    // =========================================================
    // BOTTOM TICKET CARD FOOTER
    // =========================================================
    pdf.setFillColor(241, 245, 249);
    pdf.roundedRect(cardX, cardY + cardHeight - 14, cardWidth, 14, 6, 6, "F");
    // Cover top rounded corners of footer
    pdf.rect(cardX, cardY + cardHeight - 14, cardWidth, 6, "F");

    pdf.setTextColor(42, 20, 100);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("🛡️ Billet Crypté Ubbi SecuPass™", cardX + 10, cardY + cardHeight - 5);

    pdf.setTextColor(0, 159, 239);
    pdf.setFontSize(7.5);
    pdf.text("ubbi-tickets.com", cardX + cardWidth - 10, cardY + cardHeight - 5, { align: "right" });

    // Save PDF file
    pdf.save(`Billet-Ubbi-${data.ticketNumber}.pdf`);
  } catch (error) {
    console.error("Erreur lors de la génération du PDF", error);
    alert("Une erreur est survenue lors du téléchargement du PDF. Veuillez réessayer.");
  }
}
