import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "Google AI Essentials", issuer: "Google via Coursera", date: "Sep 2025" },
  { title: "Google Gemini Certified Educator", issuer: "Google", date: "Sep 2025" },
  { title: "Technology Virtual Experience", issuer: "Deloitte via Forage", date: "Oct 2025" },
  { title: "Building Agentic AI Applications", issuer: "Programming Pathshala", date: "Jul 2025" },
];

const activities = [
  "Selected as a Google Student Ambassador, representing Google at campus events and driving AI & developer engagement.",
  "Completed 100+ Days of LeetCode Challenge, demonstrating consistency in algorithms and data structures.",
  "Delivered end-to-end AI projects under industry mentorship, meeting all evaluation benchmarks.",
  "Filed a patent on AI-powered dream recording system integrating neural data analysis and mobile visualization.",
];

const Certificates = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Certificates & Activities</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award size={20} className="text-primary" /> Certifications
            </h3>
            <div className="space-y-3">
              {certs.map((c, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-border">
                  <p className="font-medium text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.issuer} • {c.date}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Co-Curricular Activities</h3>
            <ul className="space-y-3">
              {activities.map((a, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2 p-4 rounded-lg bg-card border border-border">
                  <span className="text-primary mt-0.5 shrink-0">▹</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
