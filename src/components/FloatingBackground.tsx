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
    const count = 18; // Adjust number of floating elements here

    for (let i = 0; i < count; i++) {
      allItems.push({
        id: i,
        content: elements[Math.floor(Math.random() * elements.length)],
        x: `${Math.random() * 100}vw`,
        y: `${Math.random() * 100}vh`,
        duration: 20 + Math.random() * 20, // 20s to 40s
        delay: Math.random() * -30, // Start at different points in animation
        scale: 0.6 + Math.random() * 0.8, // 0.6 to 1.4
        rotation: (Math.random() - 0.5) * 45, // -22.5deg to 22.5deg
      });
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(allItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: ["0vh", "-10vh", "0vh"],
            x: ["0vw", "3vw", "0vw"],
            rotate: [item.rotation, item.rotation + 15, item.rotation]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          className="absolute text-2xl sm:text-3xl lg:text-4xl font-mono text-text-secondary select-none opacity-50"
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
