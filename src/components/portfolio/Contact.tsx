import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In Touch</h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8 mx-auto" />
          <p className="text-muted-foreground mb-10 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="mailto:vamshikande72@gmail.com"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Mail size={18} />
              vamshikande72@gmail.com
            </a>
            <a
              href="tel:+919381832010"
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              <Phone size={18} />
              +91-9381832010
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/vamshikrishna72" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/kandevamshikrishna/" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
