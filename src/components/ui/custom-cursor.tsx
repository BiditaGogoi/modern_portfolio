"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "@/context/cursor-context";

const CustomCursor = () => {
    const { cursorType } = useCursor();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Standard dot cursor */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            
            {/* Soft faded glow cursor for name hover */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[998] blur-xl opacity-0"
                animate={{
                    width: cursorType === "name-hover" ? 120 : 0,
                    height: cursorType === "name-hover" ? 120 : 0,
                    opacity: cursorType === "name-hover" ? 0.25 : 0,
                    backgroundColor: cursorType === "name-hover" ? "rgba(168, 85, 247, 0.4)" : "transparent",
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};

export default CustomCursor;
