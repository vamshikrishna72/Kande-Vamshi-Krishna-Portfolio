import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundAnimation = () => {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);

  useEffect(() => {
    // Generate random stars on mount
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background/50">
      {/* Subtle moving gradient blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
          x: ["0%", "5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyan) / 0.15), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.06, 0.03],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "-5%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--purple) / 0.15), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
            y: [0, -15, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
