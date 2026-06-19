import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsStrip = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "500+", label: "ACTIVE RIDERS" },
    { tagline: "ONE NATION, ONE BROTHERHOOD" },
  ];

  return (
    <div ref={sectionRef} className="bg-carbon py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              {stat.tagline ? (
                <span className="font-heading text-3xl sm:text-4xl md:text-5xl text-copper block mb-2 tracking-[0.15em] uppercase leading-tight">
                  {stat.tagline}
                </span>
              ) : (
                <>
                  <span className="font-heading text-6xl md:text-8xl text-white block mb-2">
                    {stat.number}
                  </span>
                  <span className="font-body text-xs md:text-sm text-copper tracking-[0.3em] font-bold uppercase">
                    {stat.label}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;
