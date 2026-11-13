import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import BookingService from "../services/BookingService";

const PAGE_WIDTH = 210;
const NAVY = [20, 42, 67];
const TEAL = [37, 150, 140];
const TEXT = [42, 54, 66];
const MUTED = [106, 119, 132];
const LIGHT = [243, 247, 250];

const pdfText = (value) => String(value ?? "Not available")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^\x20-\x7E]/g, " ");

const formattedDate = (value) => {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
};

const formattedFare = (value) => {
  const amount = Number(value);
  return value !== null && value !== undefined && Number.isFinite(amount)
    ? `INR ${amount.toFixed(2)}`
    : "Not available";
};

function drawContinuationHeader(doc, booking) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_WIDTH, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("SKYRESERVE  |  E-TICKET", 16, 14);
  doc.setFont("helvetica", "normal");
  doc.text(`BOOKING ${pdfText(booking.bookingCode)}`, 194, 14, { align: "right" });
}

function createTicketPdf(booking, passengers) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const flight = booking.flight || {};
  const departure = flight.departureAirport || {};
  const arrival = flight.arrivalAirport || {};
  const status = pdfText(booking.bookingStatus || "UNKNOWN").toUpperCase();
  const flightClass = pdfText(booking.flightClass || "Not available").replace(/_/g, " ");

  doc.setProperties({
    title: `SkyReserve ticket ${pdfText(booking.bookingCode)}`,
    subject: "Electronic flight ticket",
    author: "SkyReserve"
  });

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_WIDTH, 48, "F");
  doc.setFillColor(...TEAL);
  doc.rect(0, 46, PAGE_WIDTH, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("SKYRESERVE", 16, 19);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(205, 220, 232);
  doc.text("ELECTRONIC FLIGHT TICKET", 16, 27);
  doc.setFontSize(8);
  doc.text("BOOKING REFERENCE", 16, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(pdfText(booking.bookingCode), 16, 44);

  doc.setFillColor(...(status === "CANCELLED" ? [111, 121, 132] : TEAL));
  doc.roundedRect(151, 11, 43, 11, 3, 3, "F");
  doc.setFontSize(8);
  doc.text(status, 172.5, 18, { align: "center", maxWidth: 39 });

  doc.setTextColor(...TEXT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("JOURNEY OVERVIEW", 16, 59);

  doc.setFillColor(...LIGHT);
  doc.roundedRect(16, 65, 178, 47, 3, 3, "F");
  doc.setFontSize(21);
  doc.setTextColor(...NAVY);
  doc.text(pdfText(departure.airportCode || "---"), 27, 81, { maxWidth: 58 });
  doc.text(pdfText(arrival.airportCode || "---"), 130, 81, { maxWidth: 58 });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(pdfText(departure.airportName), 27, 88, { maxWidth: 62 });
  doc.text(pdfText(arrival.airportName), 130, 88, { maxWidth: 58 });

  doc.setFontSize(8);
  doc.setTextColor(...TEAL);
  doc.text("DEPARTURE", 27, 96);
  doc.text("ARRIVAL", 130, 96);
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  doc.text(formattedDate(flight.departureTime), 27, 103, { maxWidth: 70 });
  doc.text(formattedDate(flight.arrivalTime), 130, 103, { maxWidth: 58 });

  doc.setDrawColor(...TEAL);
  doc.setLineWidth(0.6);
  doc.line(92, 82, 118, 82);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...TEAL);
  doc.text("TO", 105, 78, { align: "center" });

  doc.setFillColor(250, 251, 252);
  doc.setDrawColor(226, 232, 238);
  doc.roundedRect(16, 120, 178, 34, 3, 3, "FD");
  const detailColumns = [
    { x: 26, label: "FLIGHT", value: flight.flightNumber || "Not available" },
    { x: 88, label: "TRAVEL CLASS", value: flightClass },
    { x: 150, label: "PASSENGERS", value: booking.totalPassengers ?? passengers.length }
  ];
  detailColumns.forEach(({ x, label, value }) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(label, x, 132);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...TEXT);
    doc.text(pdfText(value), x, 142, { maxWidth: 38 });
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.text("PASSENGER DETAILS", 16, 165);

  const passengerRows = passengers.length
    ? passengers.map(passenger => [
      passenger.passengerName || "Not available",
      passenger.age ?? "Not available",
      passenger.gender || "Not available",
      passenger.seatNumber || "Not assigned"
    ])
    : [["Passenger details unavailable", "-", "-", "-"]];

  autoTable(doc, {
    startY: 170,
    margin: { left: 16, right: 16, top: 30, bottom: 24 },
    head: [["PASSENGER", "AGE", "GENDER", "SEAT"]],
    body: passengerRows.map(row => row.map(pdfText)),
    theme: "striped",
    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: TEXT,
      cellPadding: 3,
      lineColor: [226, 232, 238],
      lineWidth: 0.15
    },
    headStyles: {
      fillColor: NAVY,
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },
    alternateRowStyles: { fillColor: [247, 249, 251] },
    columnStyles: {
      0: { cellWidth: 82 },
      1: { cellWidth: 22, halign: "center" },
      2: { cellWidth: 34 },
      3: { cellWidth: 40 }
    },
    didDrawPage: data => {
      if (data.pageNumber > 1) drawContinuationHeader(doc, booking);
    }
  });

  let summaryY = doc.lastAutoTable.finalY + 10;
  if (summaryY > 246) {
    doc.addPage();
    drawContinuationHeader(doc, booking);
    summaryY = 38;
  }

  doc.setFillColor(...LIGHT);
  doc.roundedRect(16, summaryY, 178, 24, 3, 3, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("TOTAL FARE", 25, summaryY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...NAVY);
  doc.text(formattedFare(booking.totalFare), 185, summaryY + 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Please carry a valid photo ID and keep your booking reference available for check-in.", 16, summaryY + 33, {
    maxWidth: 178
  });

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(220, 227, 233);
    doc.setLineWidth(0.3);
    doc.line(16, 284, 194, 284);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("SKYRESERVE  |  Electronic ticket", 16, 290);
    doc.text(`${page} / ${pageCount}`, 194, 290, { align: "right" });
  }

  return doc;
}

function TicketButton({ booking }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const download = async () => {
    setDownloading(true);
    setError("");
    try {
      const response = await BookingService.getPassengers(booking.bookingId);
      if (!Array.isArray(response.data)) {
        throw new Error("Passenger details were not returned.");
      }

      const doc = createTicketPdf(booking, response.data);
      const reference = pdfText(booking.bookingCode || `Booking-${booking.bookingId}`)
        .replace(/[^A-Za-z0-9_-]/g, "");
      doc.save(`SkyReserve-${reference || booking.bookingId}.pdf`);
    } catch (downloadError) {
      setError(downloadError.response?.data?.message || downloadError.message || "Unable to download the ticket.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="d-inline-flex flex-column align-items-end">
      <button
        className="btn btn-sm btn-outline-primary fw-semibold"
        onClick={download}
        disabled={downloading}
        aria-busy={downloading}
      >
        {downloading ? "Preparing..." : "Ticket PDF"}
      </button>
      {error && <span className="small text-danger mt-1" role="alert">{error}</span>}
    </div>
  );
}

export default TicketButton;
