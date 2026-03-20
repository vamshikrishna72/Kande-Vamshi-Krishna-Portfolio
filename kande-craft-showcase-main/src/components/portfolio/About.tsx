import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImg from "@/assets/vamshi-profile.jpeg";
import { MapPin, GraduationCap, Award, Briefcase } from "lucide-react";

const counters = [
  { label: "LeetCode Problems", value: 305, suffix: "+", icon: "💻" },
  { label: "AI/ML Projects", value: 5, suffix: "+", icon: "🤖" },
  { label: "Internships", value: 4, suffix: "", icon: "🏢" },
  { label: "Certifications", value: 30, suffix: "+", icon: "🏆" },
];

const AnimatedCounter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const highlights = [
    {
      icon: GraduationCap,
      text: "CS Engineering student at Lovely Professional University with a CGPA of 8.08, passionate about building impactful AI solutions.",
    },
    {
      icon: Award,
      text: "Google Student Ambassador representing Google at campus events, driving AI & developer community engagement across the university.",
    },
    {
      icon: Briefcase,
      text: "Completed internships at Infosys, Microsoft (via Edunet), and Prodigy InfoTech — building real-world AI systems, traffic management tools, and ML pipelines.",
    },
    {
      icon: MapPin,
      text: "Filed a patent on an AI-powered dream recording system. 305+ LeetCode problems solved. Certified by Google, Microsoft, Deloitte, and more.",
    },
  ];

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--cyan)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">Who I Am</span>
          <h2 className="section-heading">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start">
          {/* Profile image card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto lg:mx-0"
          >
            <motion.div
              className="absolute -inset-1 rounded-2xl opacity-60"
              style={{
                background: "linear-gradient(135deg, hsl(var(--cyan) / 0.3), hsl(var(--purple) / 0.2), hsl(var(--blue) / 0.3))",
                backgroundSize: "200% 200%",
              }}
              animate={inView ? { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-primary/20 glass">
              <motion.img
                src={profileImg}
                alt="Kande Vamshi Krishna"
                className="w-full h-[380px] object-cover object-top"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm font-display font-semibold text-foreground">Vamshi Krishna Kande</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  Hyderabad, India
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-xs font-mono font-medium whitespace-nowrap z-20 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(var(--purple)))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-primary-foreground"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Open to Opportunities
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="p-5 rounded-xl glass border border-border/50 hover:border-primary/30 hover-glow transition-all duration-400 group"
                >
                  <Icon size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"
            >
              {counters.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl glass border border-border/50 text-center hover:border-primary/30 hover-glow transition-all duration-300 group"
                >
                  <div className="text-lg mb-1">{c.icon}</div>
                  <div className="text-2xl font-bold text-gradient font-mono">
                    <AnimatedCounter target={c.value} suffix={c.suffix} inView={inView} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">{c.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
