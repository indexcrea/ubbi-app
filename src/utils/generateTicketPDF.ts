import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface TicketPDFData {
  ticketNumber: string;
  eventName: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  attendeeName: string;
  status?: string;
}

export async function generateTicketPDF(
  data: TicketPDFData,
  elementRef?: HTMLElement | null
): Promise<void> {
  try {
    if (elementRef) {
      // 1. Capture the DOM Element using html2canvas with HD scaling
      const canvas = await html2canvas(elementRef, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

      // Header Band Ubbi Violet #190262
      pdf.setFillColor(25, 2, 98);
      pdf.rect(0, 0, pdfWidth, 32, "F");

      // Header Text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      pdf.text("UBBI", 15, 18);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 159, 239); // #009FEF
      pdf.text("BILLET D'ACCÈS ÉVÉNEMENTIEL SÉCURISÉ", 15, 25);

      // Subheader Date & Ref
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 170);
      pdf.text(`Réf: ${data.ticketNumber}`, pdfWidth - 15, 22, { align: "right" });

      // Calculate Image Dimensions centered in A4
      const imgWidth = 140; // 140mm width for ticket card
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = 42;

      // Draw HD Ticket Card Image
      pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

      // Footer Instructions Box
      const footerY = yPos + imgHeight + 15;

      pdf.setFillColor(247, 247, 250);
      pdf.roundedRect(15, footerY, pdfWidth - 30, 45, 4, 4, "F");

      pdf.setDrawColor(226, 228, 237);
      pdf.roundedRect(15, footerY, pdfWidth - 30, 45, 4, 4, "D");

      pdf.setTextColor(42, 20, 100);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("INSTRUCTIONS D'ACCÈS À L'ÉVÉNEMENT", 22, footerY + 12);

      pdf.setTextColor(102, 106, 128);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        "1. Présentez ce document sur l'écran de votre smartphone ou imprimé sur papier.",
        22,
        footerY + 21
      );
      pdf.text(
        "2. Le contrôleur à la porte scannera le QR Code unique figurant ci-dessus.",
        22,
        footerY + 28
      );
      pdf.text(
        "3. Chaque billet est valide pour une entrée unique et cryptographique sécurisée.",
        22,
        footerY + 35
      );

      // Security Watermark Footer
      pdf.setFontSize(8);
      pdf.setTextColor(160, 160, 180);
      pdf.text(
        `Document officiel généré par Ubbi Sénégal — © ${new Date().getFullYear()} Ubbi. Tous droits réservés.`,
        pdfWidth / 2,
        pdfHeight - 10,
        { align: "center" }
      );

      // Save PDF
      pdf.save(`Billet-Ubbi-${data.ticketNumber}.pdf`);
    } else {
      // Fallback Direct jsPDF Document Generation
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();

      // Top Header
      pdf.setFillColor(25, 2, 98);
      pdf.rect(0, 0, pdfWidth, 35, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("UBBI", 15, 20);

      pdf.setFontSize(10);
      pdf.setTextColor(0, 159, 239);
      pdf.text("BILLET D'ACCÈS ÉVÉNEMENTIEL SÉCURISÉ", 15, 27);

      pdf.setTextColor(150, 150, 170);
      pdf.setFontSize(9);
      pdf.text(`Réf: ${data.ticketNumber}`, pdfWidth - 15, 24, { align: "right" });

      // Ticket Box
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(42, 20, 100);
      pdf.roundedRect(15, 45, pdfWidth - 30, 110, 6, 6, "D");

      // Event Title
      pdf.setTextColor(42, 20, 100);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(data.eventName, 22, 60);

      // Pass Badge
      pdf.setFillColor(0, 159, 239);
      pdf.roundedRect(pdfWidth - 55, 52, 35, 10, 3, 3, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text(`PASS ${data.category}`, pdfWidth - 37.5, 58.5, { align: "center" });

      // Divider line
      pdf.setDrawColor(226, 228, 237);
      pdf.line(22, 68, pdfWidth - 22, 68);

      // Details grid
      pdf.setTextColor(102, 106, 128);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      pdf.text("TITULAIRE DU BILLET", 22, 78);
      pdf.setTextColor(17, 19, 38);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text(data.attendeeName, 22, 85);

      pdf.setTextColor(102, 106, 128);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("DATE & HEURE", 110, 78);
      pdf.setTextColor(17, 19, 38);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${data.date} à ${data.time}`, 110, 85);

      pdf.setTextColor(102, 106, 128);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("LIEU DE L'ÉVÉNEMENT", 22, 98);
      pdf.setTextColor(17, 19, 38);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text(data.venue, 22, 105);

      pdf.setTextColor(102, 106, 128);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("STATUT", 110, 98);
      pdf.setTextColor(16, 185, 129); // Emerald
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text(data.status || "VALIDE", 110, 105);

      // Code QR Note & Image Box
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.ticketNumber)}`;

      try {
        const qrResponse = await fetch(qrUrl);
        const blob = await qrResponse.blob();
        const reader = new FileReader();

        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        const qrDataUrl = await base64Promise;

        // Draw QR Container Box
        pdf.setFillColor(247, 247, 250);
        pdf.roundedRect(22, 115, pdfWidth - 44, 45, 4, 4, "F");
        pdf.setDrawColor(226, 228, 237);
        pdf.roundedRect(22, 115, pdfWidth - 44, 45, 4, 4, "D");

        // Add QR Image on left
        pdf.addImage(qrDataUrl, "PNG", 28, 120, 35, 35);

        // Add QR Text info on right
        pdf.setTextColor(42, 20, 100);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("CONTRÔLE D'ACCÈS SÉCURISÉ", 70, 128);

        pdf.setTextColor(0, 159, 239);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Billet ID: ${data.ticketNumber}`, 70, 135);

        pdf.setTextColor(102, 106, 128);
        pdf.setFontSize(8.5);
        pdf.setFont("helvetica", "normal");
        pdf.text("Présentez ce QR Code unique au scanner à la porte d'accès.", 70, 142);
        pdf.text("Validation instantanée et sécurisée.", 70, 148);
      } catch (e) {
        console.warn("Could not load QR code image for PDF fallback", e);
      }

      pdf.save(`Billet-Ubbi-${data.ticketNumber}.pdf`);
    }
  } catch (error) {
    console.error("Erreur lors de la génération du PDF", error);
    alert("Une erreur est survenue lors du téléchargement du PDF. Veuillez réessayer.");
  }
}
