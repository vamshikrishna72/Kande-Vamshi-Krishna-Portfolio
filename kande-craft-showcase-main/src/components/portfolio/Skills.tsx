import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Server, Cloud, BarChart3, Brain, Users, Cpu, Database, Globe, Paintbrush } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    color: "hsl(var(--cyan))",
    skills: [
      { name: "Python", level: 92 },
      { name: "Java", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "JavaScript", level: 78 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    icon: Brain,
    title: "AI / Machine Learning",
    color: "hsl(var(--purple))",
    skills: [
      { name: "TensorFlow", level: 88 },
      { name: "PyTorch", level: 82 },
      { name: "Scikit-learn", level: 90 },
      { name: "OpenCV", level: 85 },
      { name: "YOLOv5", level: 78 },
      { name: "NLP", level: 80 },
      { name: "GenAI", level: 75 },
    ],
  },
  {
    icon: Server,
    title: "Backend & Frameworks",
    color: "hsl(var(--blue))",
    skills: [
      { name: "Flask", level: 85 },
      { name: "Django", level: 72 },
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 72 },
      { name: "REST APIs", level: 88 },
      { name: "Streamlit", level: 80 },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "hsl(var(--pink))",
    skills: [
      { name: "Google Cloud", level: 78 },
      { name: "Azure", level: 75 },
      { name: "Docker", level: 72 },
      { name: "Git/GitHub", level: 90 },
      { name: "CI/CD", level: 68 },
    ],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    color: "hsl(var(--gold))",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 88 },
      { name: "Matplotlib", level: 85 },
      { name: "SQL/SQLite", level: 82 },
      { name: "Data Preprocessing", level: 88 },
    ],
  },
];

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

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--purple)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">My Expertise</span>
          <h2 className="section-heading">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-3 mb-10 w-full"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === activeTab;
            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "text-white shadow-xl"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/50 border-border/30"
                }`}
                style={isActive ? {
                  backgroundColor: cat.color,
                  backgroundImage: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)`,
                  boxShadow: `0 10px 25px -5px ${cat.color}60`,
                  borderColor: "transparent",
                } : {}}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={18} className={isActive ? "text-white" : ""} />
                <span className="hidden sm:inline">{cat.title}</span>
                <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active skill category */}
        <div className="flex justify-center">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl p-8 rounded-2xl glass border border-border/50 hover-glow transition-all duration-400"
          >
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const Icon = skillCategories[activeTab].icon;
                return <Icon size={24} style={{ color: skillCategories[activeTab].color }} />;
              })()}
              <h3 className="text-xl font-display font-semibold">{skillCategories[activeTab].title}</h3>
            </div>
            <div className="space-y-4">
              {skillCategories[activeTab].skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={skillCategories[activeTab].color}
                  delay={i * 0.08}
                  inView={true}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
