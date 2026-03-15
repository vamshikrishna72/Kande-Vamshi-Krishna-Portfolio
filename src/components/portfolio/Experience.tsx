import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Virtual Intern – Smart Traffic Management",
    company: "Infosys Springboard",
    period: "Jul 2025 – Nov 2025",
    points: [
      "Built a real-time Smart Traffic Management System using YOLOv5, OpenCV, and Tesseract OCR, achieving 94% vehicle detection accuracy at 25+ FPS.",
      "Developed a modular ANPR + ATCC pipeline supporting 5+ vehicle classes, automating congestion analysis and reducing manual survey effort by 80%.",
      "Deployed a Dockerized microservices architecture with Python, Flask, Streamlit, and SQLite — 99% uptime during stress testing.",
    ],
  },
  {
    role: "Azure AI Intern",
    company: "Microsoft via Edunet",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Engineered a secure GUI-based system call interface using python-ptrace and psutil, reducing unauthorized system call attempts by 70%.",
      "Built a real-time security monitoring pipeline tracking 150+ system metrics with 95% detection accuracy.",
      "Evolved RBAC with structured SQLite logging zero successful privilege escalation during penetration testing.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Internships</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-2 md:left-4 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Briefcase size={10} className="text-primary" />
                </div>
                <span className="text-xs font-mono text-primary mb-1 block">{exp.period}</span>
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-muted-foreground text-sm mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">▹</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
