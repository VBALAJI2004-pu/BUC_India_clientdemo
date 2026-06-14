import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Trigger app reveal and split exit
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex overflow-hidden select-none pointer-events-none"
      exit={{ pointerEvents: "none" }}
      style={{ transform: "translateZ(0)" }}
    >
      {/* Left Pane: BUC */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
        className="relative flex-1 bg-black h-full flex items-center justify-end overflow-hidden will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 100% 50%, #0d0f10 0%, #000000 80%, #000000 100%)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pr-[5%] md:pr-[2vw] text-right"
        >
          <h1 className="font-heading text-[24vw] text-copper uppercase leading-none tracking-tighter mb-4">
            BUC
          </h1>
          <p className="font-body text-copper/60 text-[10px] md:text-sm tracking-[0.4em] uppercase font-bold">
            Join India's Premier
          </p>
        </motion.div>

        {/* Animated Sweep Line */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      </motion.div>

      {/* Global Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Right Pane: INDIA */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
        className="relative flex-1 bg-copper h-full flex items-center justify-start overflow-hidden will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 0% 50%, #d4ac7d 0%, #b88a4d 100%)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pl-[5%] md:pl-[2vw] text-left"
        >
          <h1 className="font-heading text-[24vw] text-carbon uppercase leading-none tracking-tighter mb-4">
            INDIA
          </h1>
          <p className="font-body text-carbon/60 text-[10px] md:text-sm tracking-[0.4em] uppercase font-bold">
            Riding Community
          </p>
        </motion.div>

        {/* Floating Particle Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </motion.div>

      {/* Inner Center Line Glow */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "40vh" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] bg-white/50 blur-[2px] z-10 md:block hidden"
      />
    </motion.div>
  );
};

export default Preloader;
