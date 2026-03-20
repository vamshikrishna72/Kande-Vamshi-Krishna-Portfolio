import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ChevronRight, ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "Google Student Ambassador",
    company: "Google",
    type: "Part-time",
    period: "Aug 2025 – Present",
    color: "hsl(var(--cyan))",
    points: [
      "Selected through competitive multi-stage interview process to represent Google on campus across India.",
      "Organizing workshops, hackathons, and tech sessions to promote Google's AI tools and platform innovations.",
      "Building a tech-focused student community and mentoring peers in leveraging Google technologies.",
      "Collaborating with 4,500+ Google Student Ambassadors across India for campus tech initiatives.",
      "Completed Google's Gemini AI Champion certification course and specialized training modules.",
    ],
  },
  {
    role: "Virtual Intern – Smart Traffic Management (ANPR/ATCC)",
    company: "Infosys Springboard",
    type: "Internship",
    period: "Jul 2025 – Nov 2025",
    color: "hsl(var(--purple))",
    points: [
      "Built a real-time Smart Traffic Management System using YOLOv5, OpenCV, and Tesseract OCR, achieving 94% vehicle detection accuracy at 25+ FPS.",
      "Developed a modular ANPR + ATCC pipeline supporting 5+ vehicle classes, automating congestion analysis and reducing manual survey effort by 80%.",
      "Deployed a Dockerized microservices architecture with Python, Flask, Streamlit, and SQLite — 99% uptime during stress testing.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Prodigy InfoTech",
    type: "Internship",
    period: "Jul 2025 – Sep 2025",
    color: "hsl(var(--blue))",
    points: [
      "Worked on real-world machine learning projects, building predictive models and enhancing practical ML skills.",
      "Collaborated with professionals on data preprocessing, feature engineering, and model evaluation.",
      "Gained hands-on experience with supervised learning algorithms and deployment pipelines.",
    ],
  },
  {
    role: "AI Azure Intern",
    company: "Edunet Foundation (Microsoft AICTE)",
    type: "Internship",
    period: "May 2025 – Jun 2025",
    color: "hsl(var(--pink))",
    points: [
      "Developed HealthMate Diagnosis — an AI-based medical analysis system using Streamlit, Flask, and SVC models.",
      "Integrated Gemini 1.5 Pro NLP for symptom interpretation and medical triage guidance.",
      "Built and integrated APIs (Google Maps for clinic locations, Razorpay for payments) with data privacy through encryption.",
      "Presented completed project in virtual demo, earning official recognition for successful delivery.",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--blue)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">Career Journey</span>
          <h2 className="section-heading">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Static timeline track */}
          <div className="absolute left-5 md:left-7 top-0 bottom-0 w-[2px] bg-border/50 rounded-full" />
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-5 md:left-7 top-0 w-[2px] origin-top rounded-full"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, hsl(var(--cyan)), hsl(var(--purple)), hsl(var(--blue)))",
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-14 md:pl-18 group"
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-3 md:left-5 top-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 20px -3px ${exp.color}60`,
                  }}
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Briefcase size={10} className="text-primary-foreground" />
                </motion.div>

                {/* Pulse ring */}
                <motion.div
                  className="absolute left-3 md:left-5 top-2 w-5 h-5 rounded-full"
                  style={{ border: `2px solid ${exp.color}` }}
                  animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  className="p-6 rounded-2xl glass border border-border/50 hover:border-primary/20 hover-glow transition-all duration-400"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">{exp.company}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${exp.color}15`, color: exp.color }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full glass text-muted-foreground">{exp.period}</span>
                  </div>

                  <ul className="space-y-2.5 mt-4">
                    {exp.points.map((p, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.2 + j * 0.08 + 0.3 }}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" style={{ color: exp.color }} />
                        <span>{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
