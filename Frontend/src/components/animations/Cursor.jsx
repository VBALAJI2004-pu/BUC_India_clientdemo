import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const CursorContext = createContext(null);

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) throw new Error("useCursor must be used within a CursorProvider");
    return context;
};

export const CursorProvider = ({ children }) => {
    const [cursorType, setCursorType] = useState("default");
    const [isHovering, setIsHovering] = useState(false);

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType, isHovering, setIsHovering }}>
            {children}
        </CursorContext.Provider>
    );
};

export const Cursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
        </motion.div>
    );
};

export const CursorFollow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
                zIndex: 9998,
            }}
        >
            <div className="w-8 h-8 border border-blue-500/30 rounded-full" />
        </motion.div>
    );
};
