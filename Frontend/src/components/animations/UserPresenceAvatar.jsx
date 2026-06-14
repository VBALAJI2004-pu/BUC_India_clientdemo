import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const UserPresenceAvatar = () => {
    const riders = [
        { name: "Rahul", color: "#3B82F6" },
        { name: "Suresh", color: "#8B5CF6" },
        { name: "Amit", color: "#EC4899" },
        { name: "Priya", color: "#10B981" },
    ];

    return (
        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="flex -space-x-2">
                <AnimatePresence>
                    {riders.map((rider, index) => (
                        <motion.div
                            key={rider.name}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                            title={`${rider.name} is online`}
                        >
                            {/* Avatar Circle */}
                            <div 
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-carbon"
                                style={{ backgroundColor: rider.color }}
                            >
                                {rider.name[0]}
                            </div>
                            
                            {/* Presence Badge with Ripple */}
                            <div className="absolute bottom-0 right-0 w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-green-500 border border-carbon z-10"></span>
                                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                            </div>

                            {/* Custom Tooltip (Pure CSS) */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-carbon border border-white/10 px-2 py-1 rounded text-[8px] uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                {rider.name} ONLINE
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white uppercase leading-none">4 Active</span>
                </div>
                <span className="text-[7px] text-steel-dim font-medium uppercase tracking-[0.2em]">Riders online</span>
            </div>
        </div>
    );
};
