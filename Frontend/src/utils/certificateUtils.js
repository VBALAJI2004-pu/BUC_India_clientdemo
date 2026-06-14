import jsPDF from "jspdf";

// Helper to format event date nicely
const formatEventDate = (eventDate) => {
  if (!eventDate) return "";
  try {
    const d = new Date(eventDate);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

/**
 * Generate a BUC India participation certificate as a PDF for a single registration.
 * This runs entirely on the frontend using jsPDF.
 */
export const generateCertificate = (registration, event) => {
  if (!registration || !event) return;

  const userName =
    registration.fullName ||
    registration.name ||
    `${registration.firstName || ""} ${registration.lastName || ""}`.trim() ||
    registration.email ||
    "Participant";

  const eventTitle = event.title || "BUC India Ride";
  const eventDateLabel = formatEventDate(event.eventDate);

  const doc = new jsPDF("landscape", "mm", "a4");

  // Background
  doc.setFillColor(12, 10, 24); // deep slate
  doc.rect(0, 0, 297, 210, "F");

  // Accent gradient bars
  doc.setFillColor(59, 130, 246); // blue
  doc.rect(0, 0, 297, 12, "F");
  doc.setFillColor(220, 38, 38); // indigo
  doc.rect(0, 198, 297, 12, "F");

  // Outer border
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, 281, 194);

  // Title: BUC India
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("BUC INDIA", 148.5, 32, { align: "center" });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(248, 250, 252);
  doc.text("Bikers Unity Calls", 148.5, 42, { align: "center" });

  // Certificate heading
  doc.setFontSize(22);
  doc.setTextColor(251, 146, 60);
  doc.text("Certificate of Participation", 148.5, 64, { align: "center" });

  // Intro text
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  doc.text(
    "This is to certify that",
    148.5,
    80,
    { align: "center" },
  );

  // Participant name
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(userName.toUpperCase(), 148.5, 94, { align: "center" });

  // Body text
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  const bodyLines = [
    "has successfully participated in the BUC India ride",
    `“${eventTitle}”`,
    eventDateLabel ? `held on ${eventDateLabel}.` : "",
  ].filter(Boolean);

  let y = 108;
  bodyLines.forEach((line) => {
    doc.text(line, 148.5, y, { align: "center" });
    y += 8;
  });

  // Event meta
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  const locationLabel = event.location ? `Ride Location: ${event.location}` : "";
  const idLabel = registration._id ? `Registration ID: ${registration._id}` : "";

  if (locationLabel) {
    doc.text(locationLabel, 148.5, 136, { align: "center" });
  }
  if (idLabel) {
    doc.text(idLabel, 148.5, 144, { align: "center" });
  }

  // Footer signatures placeholders
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  // Left signature line
  doc.line(50, 168, 120, 168);
  // Right signature line
  doc.line(177, 168, 247, 168);

  doc.setFontSize(10);
  doc.setTextColor(226, 232, 240);
  doc.text("BUC Founder / Admin", 85, 176, { align: "center" });
  doc.text("Club / Ride Lead", 212, 176, { align: "center" });

  // Soft watermark text in the middle (simulating club / BUC branding)
  doc.setFontSize(40);
  doc.setTextColor(100, 116, 139);
  doc.text("BUC INDIA", 148.5, 120, { align: "center" });

  // Generated date
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    148.5,
    190,
    { align: "center" },
  );

  // Authorization line
  doc.setFontSize(9);
  doc.setTextColor(226, 232, 240);
  doc.text(
    "Club photo/logo registered with BUC India • Authorized by BUC India",
    148.5,
    184,
    { align: "center" },
  );

  const safeEvent = eventTitle.replace(/[^a-z0-9]+/gi, "_");
  const safeName = userName.replace(/[^a-z0-9]+/gi, "_");
  const filename = `BUC_Certificate_${safeEvent}_${safeName}.pdf`;

  doc.save(filename);
};

