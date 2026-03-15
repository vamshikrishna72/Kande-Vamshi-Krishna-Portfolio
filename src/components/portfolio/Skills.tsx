import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, BarChart3, Brain, Users } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "C", "C++", "Java", "JavaScript"],
  },
  {
    icon: Server,
    title: "Backend & Web",
    skills: ["Node.js", "Express.js", "Flask", "Django", "REST APIs"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub", "Google Cloud", "Azure", "CI/CD"],
  },
  {
    icon: BarChart3,
    title: "Data & Analysis",
    skills: ["Matplotlib", "NumPy", "Pandas"],
  },
  {
    icon: Brain,
    title: "AI / ML Tools",
    skills: ["TensorFlow", "Scikit Learn", "OpenCV", "YOLOv5", "NLP"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    skills: ["Analytical Thinking", "Communication", "Leadership", "Problem Solving"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Skills</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <cat.icon className="text-primary mb-4" size={28} />
              <h3 className="font-semibold text-lg mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
