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
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-10 leading-relaxed"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.a
              href="mailto:vamshikande72@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Mail size={18} />
              vamshikande72@gmail.com
            </motion.a>
            <motion.a
              href="tel:+919381832010"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              <Phone size={18} />
              +91-9381832010
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-4">
            {[
              { href: "https://github.com/vamshikrishna72", icon: Github },
              { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin },
            ].map(({ href, icon: Icon }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-card border border-border hover:border-primary/30 text-muted-foreground hover:text-primary hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-300"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
