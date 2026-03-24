import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundAnimation = () => {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    const starCount = mobile ? 25 : 60;

    // Generate random stars on mount
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setStars(newStars);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .star-blink {
          animation: twinkle var(--duration) ease-in-out infinite var(--delay);
          will-change: opacity, transform;
        }
      `}</style>
      {/* Subtle moving gradient blobs */}
      {/* Subtle moving gradient blobs - Simplified on mobile */}
      <motion.div
        animate={isMobile ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
          x: ["0%", "5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--cyan) / 0.12), transparent 70%)",
          filter: isMobile ? "blur(80px)" : "blur(120px)",
          opacity: 0.05,
          willChange: isMobile ? "auto" : "transform, opacity",
        }}
      />
      
      <motion.div
        animate={isMobile ? {} : {
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.06, 0.03],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "-5%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--purple) / 0.12), transparent 70%)",
          filter: isMobile ? "blur(70px)" : "blur(100px)",
          opacity: 0.05,
          willChange: isMobile ? "auto" : "transform, opacity",
        }}
      />

      {/* Floating Stars - Conditional rendering for mobile vs desktop */}
      {isMobile ? (
        // High-performance CSS stars for mobile
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/60 star-blink"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              // @ts-ignore
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`,
            }}
          />
        ))
      ) : (
        // Original Framer Motion stars for desktop
        stars.map((star) => (
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
        ))
      )}

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
