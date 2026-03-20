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
  {
    icon: Users,
    title: "Soft Skills",
    color: "hsl(var(--cyan))",
    skills: [
      { name: "Leadership", level: 90 },
      { name: "Communication", level: 92 },
      { name: "Problem Solving", level: 95 },
      { name: "Analytical Thinking", level: 90 },
      { name: "Team Collaboration", level: 88 },
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
      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{name}</span>
      <motion.span
        className="text-xs font-mono text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        {level}%
      </motion.span>
    </div>
    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
      <motion.div
        className="h-full rounded-full relative"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ delay: delay + 0.1, duration: 1, ease: "easeOut" }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
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
          className="mb-14"
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
          className="flex flex-wrap gap-2 mb-10"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === activeTab;
            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground shadow-lg"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${cat.color}, ${cat.color}88)`,
                  boxShadow: `0 0 30px -5px ${cat.color}40`,
                } : {}}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{cat.title}</span>
                <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active skill category */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-2xl glass border border-border/50 hover-glow transition-all duration-400"
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

          {/* All categories overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                onClick={() => setActiveTab(i)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                  i === activeTab
                    ? "glass border-primary/30 shadow-lg"
                    : "glass border-border/30 hover:border-primary/20"
                }`}
                style={i === activeTab ? { boxShadow: `0 0 25px -8px ${cat.color}30` } : {}}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${cat.color}15` }}
                    >
                      <cat.icon size={16} style={{ color: cat.color }} />
                    </div>
                    <span className="font-medium text-sm">{cat.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{cat.skills.length} skills</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.skills.slice(0, 4).map((s) => (
                    <span
                      key={s.name}
                      className="text-[11px] px-2 py-0.5 rounded-md font-mono"
                      style={{
                        background: `${cat.color}10`,
                        color: cat.color,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                  {cat.skills.length > 4 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-mono">
                      +{cat.skills.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
