import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react";

const roles = [
  "Computer Science Engineer",
  "AI Developer & Machine Learning Innovator",
  "Cloud & AI Enthusiast",
  "Google Student Ambassador",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 20 });

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
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.slice(0, text.length + 1));
        if (text.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
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

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-28"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Neural network / particle background */}
      <canvas id="particle-canvas" className="absolute inset-0 pointer-events-none" />
      <ParticleBackground />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/[0.05] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Text content */}
        <div className="text-center md:text-left flex-1">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Kande{" "}
            <span className="text-gradient inline-block">Vamshi Krishna</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="h-10 mb-8 flex items-center justify-center md:justify-start"
          >
            <span className="text-lg md:text-xl text-muted-foreground font-mono">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
              />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-3 flex-wrap"
          >
            {[
              { href: "https://github.com/vamshikrishna72", icon: Github },
              { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin },
              { href: "mailto:vamshikande72@gmail.com", icon: Mail },
            ].map(({ href, icon: Icon }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="p-3 rounded-lg bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
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
              className="ml-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="/Kande_Vamshi_Krishna_Resume.pdf"
              download
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm hover:bg-primary/10 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] transition-all duration-300 flex items-center gap-2"
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

        {/* Profile image with parallax tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
          style={{ rotateX, rotateY, perspective: 800 }}
          className="relative flex-shrink-0"
        >
          {/* Animated glowing ring */}
          <motion.div
            className="absolute -inset-4 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--primary)), transparent, hsl(var(--accent)), transparent, hsl(var(--primary)))",
              opacity: 0.4,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div className="absolute -inset-3 rounded-full bg-background" />

          {/* Pulsing glow */}
          <motion.div
            className="absolute -inset-2 rounded-full bg-primary/10 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 relative z-10 shadow-2xl shadow-primary/20 group">
              <motion.img
                alt="Kande Vamshi Krishna"
                className="w-full h-full object-cover object-[center_25%] scale-110 group-hover:scale-[1.18] transition-transform duration-500"
                src="/lovable-uploads/1fed168a-6d23-4027-9846-2d3c389aea4b.jpg"
              />
              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-full" />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-card border border-primary/30 text-xs font-mono font-medium whitespace-nowrap z-20 flex items-center gap-2"
          >
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-foreground">Open to Opportunities</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bouncing scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors inline-flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono text-muted-foreground">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

// Particle / neural-network background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 50;

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
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
      const [h, s, l] = primary.split(" ").map((v) => parseFloat(v));

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, 0.3)`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${0.1 * (1 - dist / 150)})`;
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

export default Hero;
