import React, { useRef, useState } from "react";
import "./GlareHover.css";

const GlareHover = ({
    width = "100%",
    height = "100%",
    background = "transparent",
    borderRadius = "12px",
    borderColor = "transparent",
    children,
    glareColor = "#ffffff",
    glareOpacity = 0.3,
    glareAngle = -30,
    glareSize = 150,
    transitionDuration = 800,
    playOnce = false,
    className = "",
    style = {},
}) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

    const handleMouseMove = (e) => {
        if (playOnce && hasPlayed) return;
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGlareStyle({
            opacity: glareOpacity,
            transform: `translate(${x - glareSize / 2}px, ${y - glareSize / 2}px)`,
        });
    };

    const handleMouseEnter = () => {
        if (playOnce && hasPlayed) return;
        setHovered(true);
    };

    const handleMouseLeave = () => {
        if (playOnce && hasPlayed) return;
        setHovered(false);
        if (playOnce) setHasPlayed(true);
        setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={ref}
            className={`glare-hover-wrapper ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                width,
                height,
                background,
                borderRadius,
                border: `1px solid ${borderColor}`,
                ...style,
            }}
        >
            <div
                className="glare-hover-overlay"
                style={{
                    ...glareStyle,
                    width: glareSize,
                    height: glareSize,
                    background: `radial-gradient(circle, ${glareColor} 0%, transparent 70%)`,
                    transition: hovered ? "none" : `opacity ${transitionDuration}ms ease-out`,
                }}
            />
            <div className="glare-hover-content">{children}</div>
        </div>
    );
};

export default GlareHover;
