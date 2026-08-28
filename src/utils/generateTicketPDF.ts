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

    // Background fill light grey
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
    // HEADER BANNER WITH EVENT POSTER IMAGE
    // =========================================================
    const headerHeight = 48;

    // Draw default dark violet header base
    pdf.setFillColor(25, 2, 98); // #190262
    pdf.roundedRect(cardX, cardY, cardWidth, headerHeight, 6, 6, "F");
    pdf.rect(cardX, cardY + headerHeight - 6, cardWidth, 6, "F");

    // Try embedding the real Event Poster image in the header background
    if (data.eventImage) {
      const posterDataUrl = await getImageDataUrl(data.eventImage);
      if (posterDataUrl) {
        try {
          pdf.addImage(posterDataUrl, "JPEG", cardX, cardY, cardWidth, headerHeight);
        } catch (e) {
          // Ignore fallback to solid header
        }
      }
    }

    // Top logo: Ubbi Monogramme U
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
    pdf.roundedRect(cardX + cardWidth - 54, cardY + 9, 46, 8, 4, 4, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(badgeText, cardX + cardWidth - 31, cardY + 14.5, { align: "center" });

    // Event Title (White text)
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.eventName, cardX + 8, cardY + 41);

    // =========================================================
    // PERFORATION LINE & TICKET NUMBER
    // =========================================================
    const perfY = cardY + headerHeight + 6;
    pdf.setDrawColor(200, 202, 215);
    pdf.setLineWidth(0.3);
    pdf.setLineDashPattern([1.5, 1.5], 0);
    pdf.line(cardX + 10, perfY, cardX + cardWidth - 10, perfY);
    pdf.setLineDashPattern([], 0);

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

    // Statut d'accès (Initial: NON SCANNÉ)
    const currentStatus = data.status || "NON SCANNE";
    const isScanned = currentStatus.toUpperCase().includes("VALIDE") || currentStatus.toUpperCase().includes("UTILISE");

    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("STATUT D'ACCES", cardX + 80, gridY);

    if (isScanned) {
      pdf.setFillColor(236, 253, 245); // emerald-50
      pdf.setDrawColor(167, 243, 208); // emerald-200
      pdf.roundedRect(cardX + 80, gridY + 1.5, 28, 5.5, 1.5, 1.5, "FD");
      pdf.setTextColor(5, 150, 105); // emerald-600
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      pdf.text("SCANNE / VALIDE", cardX + 94, gridY + 5.2, { align: "center" });
    } else {
      pdf.setFillColor(241, 245, 249); // slate-100
      pdf.setDrawColor(226, 228, 237); // slate-200
      pdf.roundedRect(cardX + 80, gridY + 1.5, 26, 5.5, 1.5, 1.5, "FD");
      pdf.setTextColor(100, 116, 139); // slate-500
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      pdf.text("NON SCANNE", cardX + 93, gridY + 5.2, { align: "center" });
    }

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
    const qrBoxY = gridY + 29;
    const qrBoxWidth = 120;
    const qrBoxHeight = 84;
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
    pdf.text("QR CODE SECURISE UBBI", qrBoxX + (qrBoxWidth / 2), qrBoxY + 9, { align: "center" });

    // Load & Add Real Scannable ISO QR Code
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.ticketNumber)}`;
    const qrDataUrl = await getImageDataUrl(qrApiUrl);

    if (qrDataUrl) {
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(qrBoxX + (qrBoxWidth / 2) - 24, qrBoxY + 13, 48, 48, 3, 3, "F");
      pdf.setDrawColor(226, 228, 237);
      pdf.roundedRect(qrBoxX + (qrBoxWidth / 2) - 24, qrBoxY + 13, 48, 48, 3, 3, "D");

      pdf.addImage(qrDataUrl, "PNG", qrBoxX + (qrBoxWidth / 2) - 21, qrBoxY + 16, 42, 42);
    }

    // QR Ticket Ref below QR
    pdf.setTextColor(42, 20, 100);
    pdf.setFontSize(8.5);
    pdf.setFont("courier", "bold");
    pdf.text(data.ticketNumber, qrBoxX + (qrBoxWidth / 2), qrBoxY + 67, { align: "center" });

    // Caption
    pdf.setTextColor(102, 106, 128);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "bold");
    pdf.text("Scannage automatique a la porte d'acces Ubbi", qrBoxX + (qrBoxWidth / 2), qrBoxY + 75, { align: "center" });

    // =========================================================
    // BOTTOM TICKET CARD FOOTER (Clean ASCII text)
    // =========================================================
    pdf.setFillColor(241, 245, 249);
    pdf.roundedRect(cardX, cardY + cardHeight - 14, cardWidth, 14, 6, 6, "F");
    pdf.rect(cardX, cardY + cardHeight - 14, cardWidth, 6, "F");

    pdf.setTextColor(42, 20, 100);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("Billet Crypte Ubbi SecuPass (TM)", cardX + 10, cardY + cardHeight - 5);

    pdf.setTextColor(0, 159, 239);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("ubbi-tickets.com", cardX + cardWidth - 10, cardY + cardHeight - 5, { align: "right" });

    // Save PDF file
    pdf.save(`Billet-Ubbi-${data.ticketNumber}.pdf`);
  } catch (error) {
    console.error("Erreur lors de la génération du PDF", error);
    alert("Une erreur est survenue lors du téléchargement du PDF. Veuillez réessayer.");
  }
}
