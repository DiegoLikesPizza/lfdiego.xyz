"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DataStreamProps {
  delay: number;
  duration: number;
  top: string;
  width: number;
  height: number;
  color: "cyan" | "purple" | "white";
  angle?: number;
}

function DataStream({ delay, duration, top, width, height, color, angle = 0 }: DataStreamProps) {
  const colorClasses = {
    cyan: "bg-accent-cyan shadow-[0_0_20px_rgba(0,240,255,0.8),0_0_40px_rgba(0,240,255,0.4)]",
    purple: "bg-accent-purple shadow-[0_0_20px_rgba(168,85,247,0.8),0_0_40px_rgba(168,85,247,0.4)]",
    white: "bg-white shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.3)]",
  };

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0.8 }}
      animate={{ x: "100vw", opacity: [0.8, 1, 1, 0] }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { delay, duration, times: [0, 0.2, 0.7, 1] },
      }}
      className="absolute left-0"
      style={{
        top,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className={`w-full h-full rounded-full ${colorClasses[color]}`}
        style={{ filter: "blur(1px)" }}
      />
    </motion.div>
  );
}

const dataStreams: Omit<DataStreamProps, "delay" | "duration">[] = [
  { top: "8%", width: 150, height: 3, color: "cyan", angle: 2 },
  { top: "18%", width: 200, height: 5, color: "purple", angle: -1 },
  { top: "32%", width: 100, height: 2, color: "white", angle: 3 },
  { top: "45%", width: 180, height: 4, color: "cyan", angle: -2 },
  { top: "58%", width: 220, height: 6, color: "purple", angle: 1 },
  { top: "72%", width: 120, height: 3, color: "cyan", angle: -3 },
  { top: "85%", width: 160, height: 4, color: "white", angle: 2 },
];

export function IntroDataStreams() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Subtle flash on start */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-accent-cyan"
          />

          {/* Data streams - horizontal */}
          {dataStreams.map((stream, index) => (
            <DataStream
              key={index}
              {...stream}
              delay={0.05 + index * 0.1}
              duration={0.6 + Math.random() * 0.3}
            />
          ))}

          {/* Additional smaller particles - horizontal */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ x: "-20px", opacity: 0 }}
              animate={{ x: "100vw", opacity: [0, 1, 0] }}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.7,
                ease: "easeIn",
              }}
              className="absolute left-0 w-2 h-1 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)]"
              style={{ top: `${15 + i * 14}%` }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

