import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight, Layers } from "lucide-react";

const projects = [
  {
    title: "Blockchain-Powered Logistics System",
    period: "Aug 2025 – Sep 2025",
    description: "A blockchain-based supply chain tracking platform with tamper-proof logging, route optimization, and real-time analytics.",
    tech: ["Python", "SQL", "AWS S3", "Pandas", "SQLite", "Blockchain"],
    color: "hsl(var(--cyan))",
    points: [
      "Architected blockchain-based supply chain tracking with tamper-proof logging, improving traceability by 100%.",
      "Designed normalized relational DB schema optimizing query performance by 40% through indexing.",
      "Integrated AWS S3 for secure contract storage and Pandas analytics to reduce route inefficiencies by 25%.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
    image: "",
  },
  {
    title: "AI Chatbot for Symptom Analysis",
    period: "Mar 2024 – Apr 2024",
    description: "An NLP-powered medical chatbot that analyzes symptoms and medical PDFs to provide real-time health insights and triage.",
    tech: ["Python", "NLP", "Flask", "TF-IDF", "SVM", "Streamlit"],
    color: "hsl(var(--purple))",
    points: [
      "Built an NLP-powered medical chatbot serving 500+ users with real-time health insights.",
      "Improved prediction accuracy by 30% via TF-IDF vectorization and multi-model evaluation (LR, SVM, NB).",
      "Optimized Flask backend reducing response time by 35% and achieving 98% uptime.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
    image: "",
  },
  {
    title: "HealthMate Diagnosis – AI Medical Analysis",
    period: "May 2025 – Jun 2025",
    description: "A web-based AI health diagnosis system using SVC models and Gemini 1.5 Pro NLP for symptom interpretation and medical guidance.",
    tech: ["Python", "Streamlit", "Flask", "SVC", "Gemini 1.5 Pro", "Google Maps API", "Razorpay"],
    color: "hsl(var(--blue))",
    points: [
      "Developed a comprehensive AI health diagnosis platform with document and symptom analysis.",
      "Integrated Gemini 1.5 Pro NLP for interpreting user inputs for medical guidance and triage.",
      "Built clinic location finder (Google Maps) and virtual payment system (Razorpay) with data privacy.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
    image: "",
  },
  {
    title: "Smart Traffic Management System",
    period: "Jul 2025 – Nov 2025",
    description: "Real-time traffic management using YOLOv5 for vehicle detection, OCR for number plate recognition, and automated congestion analysis.",
    tech: ["Python", "YOLOv5", "OpenCV", "Tesseract OCR", "Flask", "Docker", "SQLite"],
    color: "hsl(var(--pink))",
    points: [
      "Achieved 94% vehicle detection accuracy at 25+ FPS using YOLOv5 and OpenCV.",
      "Built modular ANPR + ATCC pipeline supporting 5+ vehicle classes.",
      "Deployed Dockerized microservices architecture with 99% uptime during stress testing.",
    ],
    github: "https://github.com/vamshikrishna72",
    demo: "",
    image: "",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
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
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">What I've Built</span>
          <h2 className="section-heading">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative group"
            >
              {/* Gradient border on hover */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${proj.color}, ${proj.color}44, transparent)`,
                }}
              />

              <div className="relative p-6 rounded-2xl glass border border-border/50 hover:border-transparent hover-glow transition-all duration-400 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${proj.color}15` }}
                    >
                      <Layers size={20} style={{ color: proj.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors leading-tight">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">{proj.period}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-lg font-mono transition-colors duration-300"
                      style={{
                        background: hoveredProject === i ? `${proj.color}15` : "hsl(var(--secondary))",
                        color: hoveredProject === i ? proj.color : "hsl(var(--secondary-foreground))",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Points */}
                <ul className="space-y-2 flex-1">
                  {proj.points.map((p, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: proj.color }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="flex gap-3 mt-5 pt-4 border-t border-border/30">
                  {proj.github && (
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg glass hover:bg-primary/10"
                      whileHover={{ y: -2 }}
                    >
                      <Github size={14} />
                      Source Code
                    </motion.a>
                  )}
                  {proj.demo && (
                    <motion.a
                      href={proj.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300"
                      style={{
                        background: `${proj.color}15`,
                        color: proj.color,
                      }}
                      whileHover={{ y: -2 }}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
