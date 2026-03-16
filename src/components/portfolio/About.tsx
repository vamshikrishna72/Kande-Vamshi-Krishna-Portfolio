import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImg from "@/assets/vamshi-profile.jpeg";

const counters = [
  { label: "LeetCode Problems", value: 200, suffix: "+" },
  { label: "AI Projects", value: 5, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Certifications", value: 3, suffix: "" },
];

const AnimatedCounter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
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
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto md:mx-0"
          >
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/10 blur-sm"
              animate={inView ? { opacity: [0.5, 0.8, 0.5] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-primary/20">
              <motion.img
                src={profileImg}
                alt="Vamshi Krishna"
                className="w-full h-80 object-cover object-top"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-mono font-medium whitespace-nowrap"
            >
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-primary-foreground mr-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Open to Opportunities
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "I'm a Computer Science and Engineering student at Lovely Professional University with a strong passion for building impactful technology solutions using AI, Cloud Computing, and Full-Stack Development.",
                "As a Google Student Ambassador, I represent Google at campus events and drive student engagement in AI and developer communities. I've completed internships at Infosys and Microsoft.",
                "I thrive on solving complex problems from building blockchain-powered logistics systems to AI chatbots for medical symptom analysis. I've also filed a patent on an AI-powered dream recording system.",
                "With 200+ days of consistent LeetCode problem-solving and certifications from Google and Deloitte, I bring strong algorithmic foundations paired with practical engineering skills.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {counters.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors"
                >
                  <div className="text-2xl font-bold text-primary font-mono">
                    <AnimatedCounter target={c.value} suffix={c.suffix} inView={inView} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
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
