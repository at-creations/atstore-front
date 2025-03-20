"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundDecoratives() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating gradient blob - top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-300 to-purple-400 blur-[120px] pointer-events-none"
      />

      {/* Abstract curved line - left side */}
      <div className="absolute left-0 top-[25%] w-[20%] h-[60%] pointer-events-none opacity-[0.07] dark:opacity-[0.03]">
        <svg
          viewBox="0 0 200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M198 1C155.5 152.5 11.5 227 2 398C-7.5 569 102.5 799 198 799"
            stroke="url(#paint0_linear_curve)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_curve"
              x1="198"
              y1="1"
              x2="198"
              y2="799"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0071bc" />
              <stop offset="1" stopColor="#0071bc" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating circles - between sections */}
      <div className="absolute left-[10%] top-[30%] opacity-[0.07] dark:opacity-[0.03] pointer-events-none">
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-32 h-32 rounded-full border-[3px] border-[#0071bc]"
        />
      </div>

      <div className="absolute right-[15%] top-[60%] opacity-[0.05] dark:opacity-[0.02] pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="w-40 h-40 rounded-full border-[2px] border-[#0071bc]"
        />
      </div>

      {/* Wavy line - middle right */}
      <div className="absolute right-0 top-[45%] w-[25%] opacity-[0.06] dark:opacity-[0.03] pointer-events-none">
        <svg
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50C50 20 75 80 125 50C175 20 200 80 250 50C300 20 300 50 300 50"
            stroke="#0071bc"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Dot pattern - bottom left */}
      <div className="absolute left-[5%] bottom-[15%] opacity-[0.1] dark:opacity-[0.05] pointer-events-none">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 10 }).map((_, rowIndex) =>
            Array.from({ length: 10 }).map((_, colIndex) => (
              <circle
                key={`${rowIndex}-${colIndex}`}
                cx={10 + colIndex * 20}
                cy={10 + rowIndex * 20}
                r="2"
                fill="#0071bc"
              />
            ))
          )}
        </svg>
      </div>

      {/* Gradient background blob - bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-pink-300/30 blur-[150px] pointer-events-none"
      />
    </>
  );
}
