import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Star } from "lucide-react";

const education = [
  {
    school: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "B.Tech – Computer Science and Engineering",
    grade: "CGPA: 8.08",
    period: "Aug 2023 – Jun 2027",
    color: "hsl(var(--cyan))",
    highlights: ["Google Student Ambassador", "Video Editing", "Multiple Hackathon Participations"],
  },
  {
    school: "Sri Chaitanya Junior College",
    location: "Hyderabad, Telangana",
    degree: "Senior Secondary (Intermediate)",
    grade: "CGPA: 9.6",
    period: "Apr 2021 – Mar 2023",
    color: "hsl(var(--purple))",
    highlights: [],
  },
  {
    school: "Sri Chaitanya Techno School",
    location: "Hyderabad, Telangana",
    degree: "Secondary Schooling (SSC)",
    grade: "CGPA: 10.0",
    period: "Apr 2020 – Mar 2021",
    color: "hsl(var(--gold))",
    highlights: ["RK Budokan Karate", "Perfect 10.0 Score"],
  },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--cyan)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">Academic Background</span>
          <h2 className="section-heading">
            <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group"
            >
              {/* Gradient border on hover */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${edu.color}40, transparent, ${edu.color}20)`,
                }}
              />

              <div className="relative p-6 rounded-2xl glass border border-border/50 hover:border-transparent hover-glow transition-all duration-400 flex gap-5">
                <div className="shrink-0">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${edu.color}12` }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GraduationCap size={24} style={{ color: edu.color }} />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">{edu.school}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin size={12} />
                        {edu.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full glass text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-sm mt-2 text-foreground/80">{edu.degree}</p>
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <span
                      className="text-sm font-mono font-semibold px-3 py-1 rounded-lg"
                      style={{ background: `${edu.color}15`, color: edu.color }}
                    >
                      {edu.grade}
                    </span>
                    {edu.highlights.map((h) => (
                      <span key={h} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star size={10} className="text-primary" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
