import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Blockchain-Powered Logistics System",
    period: "Aug 2025 – Sep 2025",
    tech: ["Python", "SQL", "AWS S3", "Pandas", "SQLite"],
    points: [
      "Architected blockchain-based supply chain tracking with tamper-proof logging, improving traceability by 100%.",
      "Designed normalized relational DB schema optimizing query performance by 40% through indexing.",
      "Integrated AWS S3 for secure contract storage and Pandas analytics to reduce route inefficiencies by 25%.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
  },
  {
    title: "AI Chatbot for Symptom Analysis",
    period: "Mar 2024 – Apr 2024",
    tech: ["Python", "NLP", "Flask"],
    points: [
      "Built an NLP-powered medical chatbot serving 500+ users with real-time health insights.",
      "Improved prediction accuracy by 30% via TF-IDF vectorization and multi-model evaluation (LR, SVM, NB).",
      "Optimized Flask backend reducing response time by 35% and achieving 98% uptime.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Projects</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.15)] transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground">{proj.period}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 flex-1">
                {proj.points.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-1 shrink-0">▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {/* Action buttons */}
              <div className="flex gap-3 mt-5 pt-4 border-t border-border">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg bg-secondary hover:bg-primary/10"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg bg-secondary hover:bg-primary/10"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
