import React from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { generateCertificate } from "../utils/certificateUtils";

const CertificatePage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "";
  const eventTitle = searchParams.get("eventTitle") || "";
  const eventDate = searchParams.get("eventDate") || "";
  const location = searchParams.get("location") || "";
  const registrationId = searchParams.get("registrationId") || "";

  const safeName =
    name ||
    searchParams.get("fullName") ||
    searchParams.get("n") ||
    "Participant";

  const handleDownload = () => {
    const registration = {
      _id: registrationId || undefined,
      fullName: safeName,
    };
    const event = {
      title: eventTitle || "BUC India Ride",
      eventDate: eventDate || "",
      location: location || "",
    };
    generateCertificate(registration, event);
  };

  const hasParams = !!(safeName && eventTitle);

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black py-24 px-4">
      <div className="max-w-2xl w-full bg-black/60 border border-blue-500/30 rounded-3xl p-8 sm:p-10 shadow-[0_0_70px_rgba(249,115,22,0.3)] backdrop-blur-md">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-400 mb-2">
            BUC India • E‑Certificate
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Download Your Ride Certificate
          </h1>
        </div>

        {hasParams ? (
          <>
            <div className="space-y-3 mb-8 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-gray-400">Rider</span>
                <span className="font-semibold text-white text-right">
                  {safeName}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-gray-400">Event</span>
                <span className="font-semibold text-blue-400 text-right">
                  {eventTitle}
                </span>
              </div>
              {eventDate && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-gray-400">Date</span>
                  <span className="font-semibold text-white text-right">
                    {eventDate}
                  </span>
                </div>
              )}
              {location && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold text-white text-right">
                    {location}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download Certificate (PDF)</span>
            </button>

            <p className="mt-4 text-xs text-gray-400 text-center">
              This certificate is generated instantly based on your registration
              details for the selected BUC India event.
            </p>
          </>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-gray-300">
              This page is used to generate ride participation certificates for
              BUC India events.
            </p>
            <p className="text-gray-400 text-sm">
              Please access this link from the{" "}
              <span className="font-semibold text-blue-400">
                admin registrations panel
              </span>{" "}
              or from your{" "}
              <span className="font-semibold text-blue-400">Your Events</span>{" "}
              dashboard to download a valid certificate.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              <span>
                If you believe you should have access, please request the
                certificate link or QR code from the ride admin.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatePage;

