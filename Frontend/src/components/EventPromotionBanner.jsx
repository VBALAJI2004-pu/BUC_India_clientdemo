import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar } from "lucide-react";
import { eventService } from "../services/api";

const EventPromotionBanner = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await eventService.getHomepage();
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        setEvents([]);
      }
    };
    load();
  }, []);

  if (dismissed || !events.length) return null;

  const event = events[index % events.length];
  const eventDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const slug = event.title
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[999] animate-slide-up">
      <div className="relative border border-copper/40 bg-carbon/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {event.banner && (
          <div className="h-24 overflow-hidden">
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}
        <div className="p-5">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 text-steel-dim hover:text-white"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-copper font-bold block mb-2">
            Register Now
          </span>
          <h3 className="font-heading text-xl uppercase mb-2 pr-6">{event.title}</h3>
          <div className="flex items-center gap-2 text-steel-dim font-body text-[10px] uppercase tracking-widest mb-4">
            <Calendar size={12} className="text-copper" />
            {eventDate} · {event.eventTime}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(slug ? `/register/${slug}` : "/register")}
              className="flex-1 py-3 bg-copper text-carbon font-heading text-sm uppercase hover:bg-white transition-colors"
            >
              Register
            </button>
            {events.length > 1 && (
              <button
                onClick={() => setIndex((i) => (i + 1) % events.length)}
                className="px-4 py-3 border border-white/10 font-body text-[10px] uppercase tracking-widest hover:border-copper"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPromotionBanner;
