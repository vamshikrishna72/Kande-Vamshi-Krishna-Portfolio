import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Trophy, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface Cert {
  title: string;
  issuer: string;
  date: string;
  color: string;
  image?: string;
  highlight?: boolean;
}

const certs: Cert[] = [
  // Google & Microsoft
  { title: "Google Student Ambassador – Completion", issuer: "Google", date: "Dec 2025", color: "hsl(var(--cyan))", image: "/certificates/Google Student Ambassador.png", highlight: true },
  { title: "Google AI Essentials", issuer: "Google via Coursera", date: "Sep 2025", color: "hsl(var(--cyan))", image: "/certificates/Google AI Essentials.png", highlight: true },
  { title: "Google Gemini Certified Educator", issuer: "Google", date: "Oct 2025", color: "hsl(var(--cyan))", image: "/certificates/Google Certified Educator.png", highlight: true },
  { title: "Microsoft Azure AI Fundamentals", issuer: "Microsoft", date: "Jul 2025", color: "hsl(var(--blue))", image: "/certificates/Microsoft Azure AI.png", highlight: true },
  
  // High-Tier AI & ML
  { title: "Master Generative AI", issuer: "Infosys Springboard", date: "Jul 2025", color: "hsl(var(--purple))", image: "/certificates/converted/master-gen-ai.png", highlight: true },
  { title: "Principles of Generative AI", issuer: "Infosys Springboard", date: "Jun 2025", color: "hsl(var(--purple))", image: "/certificates/converted/principles-of-generative-ai-certification.png" },
  { title: "ChatGPT-4 Prompt Engineering", issuer: "Infosys", date: "Aug 2025", color: "hsl(var(--purple))", image: "/certificates/converted/chatgpt-4.png" },

  // Key Programming & DSA
  { title: "Data Structures & Algorithms", issuer: "Board Infinity", date: "Feb 2024", color: "hsl(var(--blue))", image: "/certificates/converted/bi-20240205-812416.png", highlight: true },
  { title: "Java Programming (72 Hours)", issuer: "Lovely Professional University", date: "May 2025", color: "hsl(var(--blue))", image: "/certificates/converted/https___s3.amazonaws.com_exams-media_java-programming_student-certificate_12309228@neocolab.ai-1.png", highlight: true },
  { title: "C++ Certificate", issuer: "iamneo – NIIT Venture", date: "Dec 2024", color: "hsl(var(--blue))", image: "/certificates/converted/cpp-certificate.png" },

  // Key Simulations & Other
  { title: "Privacy & Security in Social Media", issuer: "NPTEL (IIIT Hyderabad)", date: "May 2025", color: "hsl(var(--muted-foreground))", image: "/certificates/converted/privacy-and-security-in-online-social-media.png", highlight: true },
  { title: "Deloitte Technology Job Simulation", issuer: "Deloitte via Forage", date: "Jul 2025", color: "hsl(var(--muted-foreground))", image: "/certificates/converted/deloitte-technology-completion-certificate.png" },
];

const activities = [
  { icon: Trophy, text: "Selected as Google Student Ambassador through competitive multi-stage interview process." },
  { icon: Star, text: "305+ LeetCode problems solved — 94 Easy, 162 Medium, 51 Hard." },
  { icon: Award, text: "Filed a patent on AI-powered dream recording system with neural data analysis." },
  { icon: Sparkles, text: "Delivered end-to-end AI projects under industry mentorship." },
];

/* ── Single certificate card with image ── */
const CertCard = ({ cert, index }: { cert: Cert; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const issuerInitials = cert.issuer.split(" ").slice(0, 2).map(w => w[0]).join("");

  return (
    <motion.div
      className="flex-shrink-0 w-[340px] sm:w-[380px] group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
    >
      <div className="h-full rounded-2xl glass border border-border/50 hover:border-primary/30 hover-glow transition-all duration-400 overflow-hidden">
        {/* Certificate image preview */}
        <div className="relative w-full h-[220px] overflow-hidden bg-secondary/30">
          {cert.image && !imgError ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Styled fallback card when no image */
            <div
              className="w-full h-full flex flex-col items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${cert.color}08, ${cert.color}15, ${cert.color}05)`,
              }}
            >
              <div
                className="absolute inset-4 rounded-lg border-2 border-dashed opacity-15"
                style={{ borderColor: cert.color }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 text-xl font-display font-bold"
                style={{ background: `${cert.color}15`, color: cert.color }}
              >
                {issuerInitials}
              </div>
              <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Certificate</p>
            </div>
          )}

          {/* Gradient overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(225,20%,7%)] to-transparent" />

          {/* Featured badge */}
          {cert.highlight && (
            <div
              className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-mono font-medium flex items-center gap-1"
              style={{ background: `${cert.color}20`, color: cert.color, backdropFilter: "blur(8px)" }}
            >
              <Star size={10} /> Featured
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-5">
          <div
            className="w-8 h-1 rounded-full mb-3"
            style={{ background: cert.color }}
          />
          <h4 className="font-display font-semibold text-sm leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {cert.title}
          </h4>
          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
          <p className="text-[10px] font-mono text-muted-foreground/60 mt-1.5">{cert.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* ── Horizontal drag scroll ── */
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="certificates" className="section-padding relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--purple)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-[100vw] relative">
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">
              Credentials & Achievements
            </span>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h2 className="section-heading">
                  Featured <span className="text-gradient">Certificates</span>
                </h2>
                <p className="text-muted-foreground text-sm mt-3 font-mono">
                   Scroll horizontally to view my key certifications →
                </p>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => scroll("left")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={() => scroll("right")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══════ Horizontal scroll track ══════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-4 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex-shrink-0 w-[max(0px,calc((100vw-1200px)/2))]" />

            {certs.map((cert, i) => (
              <div key={i} className="snap-start">
                <CertCard cert={cert} index={i} />
              </div>
            ))}

            <div className="flex-shrink-0 w-8" />
          </div>

          {/* Scroll gradient fades */}
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" style={{ top: "auto", height: "360px" }} />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" style={{ top: "auto", height: "360px" }} />
        </motion.div>

        {/* ══════ Achievements section below ══════ */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-display font-semibold mb-5 flex items-center gap-2">
                <Trophy size={20} className="text-primary" />
                Key Achievements
              </h3>
              <div className="space-y-3">
                {activities.map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="p-4 rounded-xl glass border border-border/30 hover:border-primary/20 hover-glow transition-all duration-300 group"
                  >
                    <div className="flex gap-3">
                      <Icon size={18} className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div
                className="p-6 rounded-2xl border border-primary/30 hover-glow transition-all duration-300 flex-1"
                style={{ background: "linear-gradient(135deg, hsl(var(--cyan) / 0.06), hsl(var(--purple) / 0.04))" }}
              >
                <h4 className="font-display font-semibold text-base text-primary mb-3 flex items-center gap-2">
                  🔬 Patent Filed
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">AI-Powered Dream Recorder with Mobile Application Integration</strong> — a non-invasive
                  neural interface headband for recording and interpreting brain activity during REM sleep with AI-powered
                  interpretation and a mobile app for visualization, storage, and analysis.
                </p>
                <span className="text-[10px] font-mono text-muted-foreground px-3 py-1 rounded-full glass">
                  Status: Application Pending
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Certificates;