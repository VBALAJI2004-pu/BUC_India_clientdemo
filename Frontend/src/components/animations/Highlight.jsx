import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const HighlightContext = React.createContext();

export const Highlight = ({
    children,
    defaultValue,
    value,
    onValueChange,
    hover = false,
    className = "",
}) => {
    const [activeValue, setActiveValue] = useState(defaultValue || value || null);

    useEffect(() => {
        if (value !== undefined) {
            setActiveValue(value);
        }
    }, [value]);

    const handleValueChange = (val) => {
        setActiveValue(val);
        if (onValueChange) onValueChange(val);
    };

    return (
        <div className={`relative flex ${className}`}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                const itemValue = child.props["data-value"];
                const isActive = activeValue === itemValue;

                return (
                    <div
                        className="relative flex items-center justify-center cursor-pointer"
                        onMouseEnter={hover ? () => handleValueChange(itemValue) : undefined}
                        onClick={!hover ? () => handleValueChange(itemValue) : undefined}
                        onMouseLeave={hover ? () => handleValueChange(value || defaultValue) : undefined}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="highlight-bg"
                                className="absolute inset-0 bg-blue-600 rounded-full z-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            />
                        )}
                        {React.cloneElement(child, {
                            className: `${child.props.className || ""} relative z-10`,
                            "data-active": isActive,
                        })}
                    </div>
                );
            })}
        </div>
    );
};
