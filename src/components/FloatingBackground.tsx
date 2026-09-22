"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  content: string;
  x: string;
  y: string;
  duration: number;
  delay: number;
  scale: number;
  rotation: number;
}

const elements = [
  "🚀", "💻", "☕", "{ }", "< />", "=>", "✨", "💡", "🧠", "⚙️", "📈", "📱", ";", "()"
];

export default function FloatingBackground() {
  const [items, setItems] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random items only on the client to avoid hydration mismatch
    const allItems: FloatingElement[] = [];
    const count = 15; // slightly reduced count for better performance

    for (let i = 0; i < count; i++) {
      allItems.push({
        id: i,
        content: elements[Math.floor(Math.random() * elements.length)],
        x: `${Math.random() * 100}vw`,
        y: `${Math.random() * 100}vh`,
        duration: 25 + Math.random() * 20, // 25s to 45s (slower is smoother)
        delay: Math.random() * -30, 
        scale: 0.6 + Math.random() * 0.8, 
        rotation: (Math.random() - 0.5) * 45, 
      });
    }

    setItems(allItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: ["0vh", "-8vh", "0vh"],
            x: ["0vw", "2vw", "0vw"],
            rotate: [item.rotation, item.rotation + 15, item.rotation]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          className="absolute text-xl sm:text-2xl lg:text-3xl font-mono text-text-secondary select-none opacity-40"
          style={{
            left: item.x,
            top: item.y,
            transform: `scale(${item.scale}) rotate(${item.rotation}deg)`
          }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}
