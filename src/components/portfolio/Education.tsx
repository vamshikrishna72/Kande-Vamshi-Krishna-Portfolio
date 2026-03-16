import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "B.Tech – Computer Science and Engineering",
    grade: "CGPA: 8.08",
    period: "Aug 2023 – Present",
  },
  {
    school: "Sri Chaitanya Junior College",
    location: "Hyderabad, Telangana",
    degree: "Senior Secondary",
    grade: "CGPA: 9.6",
    period: "Apr 2021 – Mar 2023",
  },
  {
    school: "Sri Chaitanya Techno School",
    location: "Hyderabad, Telangana",
    degree: "Schooling",
    grade: "CGPA: 10.0",
    period: "Apr 2020 – Mar 2021",
  },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding bg-card/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Education</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.15)] transition-all duration-300 flex gap-4 group"
            >
              <div className="shrink-0 mt-1">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <GraduationCap size={20} className="text-primary" />
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{edu.school}</h3>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
                <p className="text-sm mt-1">{edu.degree}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-mono text-primary">{edu.grade}</span>
                  <span className="text-xs text-muted-foreground">{edu.period}</span>
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
