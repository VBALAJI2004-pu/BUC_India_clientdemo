import React from "react";

const Marquee = () => {
  return (
    <div className="bg-copper py-8 overflow-hidden border-y border-carbon/10 select-none relative z-10 pointer-events-none">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-12 w-fit">
        {/* Defining the content once */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {[
              { text: "BUC INDIA", icon: "wheel" },
              { text: "BROTHERHOOD", icon: "tool" },
              { text: "PASSION", icon: "disc" },
              { text: "HUMANITY", icon: "wheel" },
              { text: "SAFETY", icon: "disc" }
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="font-heading text-4xl md:text-5xl text-carbon tracking-[0.3em] uppercase leading-none">
                  {item.text}
                </span>
                <div className="flex items-center justify-center text-carbon/40">
                  {item.icon === "wheel" && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20M2 12h20m-3.5-6.5l-13 13m0-13l13 13" />
                    </svg>
                  )}
                  {item.icon === "tool" && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  )}
                  {item.icon === "disc" && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" strokeDasharray="2 2" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="12" cy="12" r="7" strokeDasharray="1 4" />
                    </svg>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      
      {/* Inline Styles with optimized performance */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
          will-change: transform;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
