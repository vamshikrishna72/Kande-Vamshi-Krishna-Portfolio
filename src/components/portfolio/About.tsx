import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Computer Science and Engineering student at Lovely Professional University with a strong passion for building impactful technology solutions using AI, Cloud Computing, and Full-Stack Development.
              </p>
              <p>
                As a Google Student Ambassador, I represent Google at campus events and drive student engagement in AI and developer communities. I've completed internships at Infosys and Microsoft, working on real-world projects in computer vision, cybersecurity, and cloud infrastructure.
              </p>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I thrive on solving complex problems — from building blockchain-powered logistics systems to AI chatbots for medical symptom analysis. I've also filed a patent on an AI-powered dream recording system.
              </p>
              <p>
                With 100+ days of consistent LeetCode problem-solving and certifications from Google and Deloitte, I bring strong algorithmic foundations paired with practical engineering skills.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
