import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";

const softSkillsStyles = {
  icon: Users,
  title: "Core Soft Skills",
  color: "hsl(var(--purple))",
  skills: [
    { name: "Strategic Leadership", level: 90 },
    { name: "Public Speaking & Communication", level: 92 },
    { name: "Advanced Problem Solving", level: 95 },
    { name: "Analytical & Critical Thinking", level: 90 },
    { name: "Cross-functional Collaboration", level: 88 },
  ],
};

const SkillBar = ({ name, level, color, delay, inView }: { name: string; level: number; color: string; delay: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay, duration: 0.4 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{name}</span>
      <motion.span
        className="text-xs font-mono font-bold text-primary"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        {level}%
      </motion.span>
    </div>
    <div className="h-2.5 rounded-full bg-secondary/80 overflow-hidden border border-white/5">
      <motion.div
        className="h-full rounded-full relative"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ delay: delay + 0.1, duration: 1.2, ease: "circOut" }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  </motion.div>
);

const SoftSkills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="soft-skills" className="py-20 relative" ref={ref}>
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">My Interpersonal Expertise</span>
          <h2 className="section-heading">
            Soft <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl p-8 rounded-2xl glass border border-border/50 hover-glow transition-all duration-400"
          >
            <div className="flex items-center gap-3 mb-6">
              <softSkillsStyles.icon size={24} style={{ color: softSkillsStyles.color }} />
              <h3 className="text-xl font-display font-semibold">{softSkillsStyles.title}</h3>
            </div>
            <div className="space-y-4">
              {softSkillsStyles.skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={softSkillsStyles.color}
                  delay={i * 0.08}
                  inView={inView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;
