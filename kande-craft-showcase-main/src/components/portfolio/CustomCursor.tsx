import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 350 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 350 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(isTouchDevice);
      return isTouchDevice;
    };

    if (checkTouch()) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        setIsHovering(true);
      }
    };
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Main glow cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          width: isHovering ? 60 : 24,
          height: isHovering ? 60 : 24,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isHovering
              ? "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)"
              : "radial-gradient(circle, hsl(var(--primary) / 0.8), transparent 70%)",
            filter: isHovering ? "blur(8px)" : "blur(2px)",
          }}
        />
      </motion.div>

      {/* Trail glow */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          width: isHovering ? 100 : 50,
          height: isHovering ? 100 : 50,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)",
            filter: "blur(15px)",
          }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
