import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileDown, Sparkles } from "lucide-react";

const roles = [
  "Machine Learning Engineer",
  "AI & Generative AI Specialist",
  "Google Student Ambassador",
  "Full-Stack Developer",
];

/* ── Floating geometric shapes ── */
const FloatingShape = ({ delay, duration, x, y, size, color, shape }: {
  delay: number; duration: number; x: string; y: string; size: number; color: string; shape: "circle" | "hex" | "triangle" | "ring";
}) => {
  const shapeStyles: Record<string, React.CSSProperties> = {
    circle: { borderRadius: "50%", background: color },
    hex: { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: color },
    triangle: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", background: color },
    ring: { borderRadius: "50%", border: `2px solid ${color}`, background: "transparent" },
  };
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, ...shapeStyles[shape] }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
        opacity: [0.15, 0.35, 0.15],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

/* ── Optimized particle background ── */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; hue: number }[] = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        r: isMobile ? (Math.random() * 2 + 0.5) : (Math.random() * 2.5 + 0.5),
        hue: 170 + Math.random() * 120,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const connectionDist = isMobile ? 100 : 130;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isMobile ? `hsla(${p.hue}, 80%, 60%, 0.3)` : `hsla(${p.hue}, 80%, 60%, 0.35)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const avgHue = (p.hue + particles[j].hue) / 2;
            const opacity = isMobile ? (0.1 * (1 - dist / connectionDist)) : (0.12 * (1 - dist / connectionDist));
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 55%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return null;
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.slice(0, text.length + 1));
        if (text.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentRole.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const shapes = useMemo(() => [
    { delay: 0, duration: 8, x: "10%", y: "15%", size: 20, color: "hsl(170 90% 50% / 0.15)", shape: "hex" as const },
    { delay: 1, duration: 10, x: "85%", y: "20%", size: 30, color: "hsl(280 80% 65% / 0.12)", shape: "circle" as const },
    { delay: 2, duration: 9, x: "75%", y: "70%", size: 18, color: "hsl(220 90% 60% / 0.15)", shape: "triangle" as const },
    { delay: 0.5, duration: 11, x: "15%", y: "75%", size: 35, color: "hsl(170 90% 50% / 0.08)", shape: "ring" as const },
    { delay: 3, duration: 7, x: "50%", y: "10%", size: 14, color: "hsl(330 80% 65% / 0.12)", shape: "hex" as const },
    { delay: 1.5, duration: 12, x: "90%", y: "50%", size: 24, color: "hsl(280 80% 65% / 0.10)", shape: "ring" as const },
    { delay: 2.5, duration: 8, x: "5%", y: "45%", size: 16, color: "hsl(45 90% 60% / 0.12)", shape: "circle" as const },
    { delay: 4, duration: 9, x: "40%", y: "85%", size: 22, color: "hsl(170 90% 50% / 0.10)", shape: "triangle" as const },
  ], []);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-28"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Particle network background */}
      <canvas id="particle-canvas" className="absolute inset-0 pointer-events-none" />
      <ParticleBackground />

      {/* Floating geometric shapes */}
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      {/* Mesh gradient orbs - Optimized for mobile */}
      <motion.div
        animate={isMobile ? {} : { scale: [1, 1.3, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, hsl(170 90% 50% / ${isMobile ? '0.12' : '0.15'}), transparent 70%)`, 
          filter: isMobile ? "blur(60px)" : "blur(80px)",
          opacity: isMobile ? 0.08 : 1,
          willChange: isMobile ? "auto" : "transform, opacity"
        }}
      />
      <motion.div
        animate={isMobile ? {} : { scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, hsl(280 80% 65% / ${isMobile ? '0.10' : '0.12'}), transparent 70%)`, 
          filter: isMobile ? "blur(60px)" : "blur(80px)",
          opacity: isMobile ? 0.08 : 1,
          willChange: isMobile ? "auto" : "transform, opacity"
        }}
      />
      <motion.div
        animate={isMobile ? {} : { scale: [1.1, 1, 1.1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, hsl(220 90% 60% / ${isMobile ? '0.06' : '0.08'}), transparent 70%)`, 
          filter: isMobile ? "blur(70px)" : "blur(100px)",
          opacity: isMobile ? 0.08 : 1,
          willChange: isMobile ? "auto" : "transform, opacity"
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="text-center lg:text-left flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">Available for opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight mb-4 leading-[0.95]"
          >
            Kande{" "}
            <span className="text-gradient inline-block">Vamshi</span>
            <br />
            <span className="text-gradient inline-block">Krishna</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="h-10 mb-8 flex items-center justify-center lg:justify-start"
          >
            <span className="text-lg md:text-xl text-muted-foreground font-mono">
              {">"} {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[3px] h-6 bg-primary ml-1 align-middle rounded-full"
              />
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
          >
            {[
              { href: "https://github.com/vamshikrishna72", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:vamshikande72@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="p-3 rounded-xl glass hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover-glow"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.1 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="ml-2 px-7 py-3 rounded-xl font-display font-semibold text-sm relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(var(--purple)))",
                color: "hsl(var(--primary-foreground))",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px -8px hsl(var(--primary) / 0.5)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.a>
            <motion.a
              href="/Kande_Vamshi_Krishna_Resume.pdf"
              download
              className="px-7 py-3 rounded-xl border border-primary/30 text-primary font-display font-semibold text-sm hover:bg-primary/10 hover-glow transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
            >
              <FileDown size={18} />
              Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Profile image with holographic 3D ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
          style={{ rotateX, rotateY, perspective: 1000, willChange: "transform" }}
          className="relative flex-shrink-0"
        >
          {/* Animated holographic ring */}
          <motion.div
            className="absolute -inset-5 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--cyan)), hsl(var(--purple)), hsl(var(--blue)), hsl(var(--pink)), hsl(var(--cyan)))",
              opacity: 0.5,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div className="absolute -inset-4 rounded-full bg-background" />

          {/* Pulsing energy glow */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Pulse ring effect */}
          <motion.div
            className="absolute -inset-6 rounded-full border border-primary/20"
            animate={{ scale: [0.9, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />

          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-2 border-primary/30 relative z-10 shadow-2xl shadow-primary/20 group">
              <motion.img
                alt="Kande Vamshi Krishna"
                className="w-full h-full object-cover object-[center_25%] scale-110 group-hover:scale-[1.18] transition-transform duration-700"
                src="/lovable-uploads/1fed168a-6d23-4027-9846-2d3c389aea4b.jpg"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full glass border border-primary/30 text-xs font-mono font-medium whitespace-nowrap z-20 flex items-center gap-2"
          >
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-foreground">Open to Work</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors inline-flex flex-col items-center gap-2 group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">Scroll Down</span>
          <ArrowDown size={18} className="group-hover:text-primary transition-colors" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
