import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Github, Linkedin, Send, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contactInfo = [
    { icon: Mail, label: "Email", value: "vamshikande72@gmail.com", href: "mailto:vamshikande72@gmail.com", color: "hsl(var(--cyan))" },
    { icon: Phone, label: "Phone", value: "+91-9381832010", href: "tel:+919381832010", color: "hsl(var(--purple))" },
    { icon: MapPin, label: "Location", value: "Hyderabad, India", href: "#", color: "hsl(var(--blue))" },
    { icon: Clock, label: "Timezone", value: "IST (UTC +5:30)", href: "#", color: "hsl(var(--gold))" },
  ];

  const socials = [
    { href: "https://github.com/vamshikrishna72", icon: Github, label: "GitHub", color: "hsl(var(--foreground))" },
    { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin, label: "LinkedIn", color: "hsl(var(--blue))" },
  ];

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--cyan)), transparent 70%)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block">Let's Connect</span>
          <h2 className="section-heading">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto mt-4"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            Whether it's AI research, software engineering, or community building — let's talk!
          </motion.p>
        </motion.div>

        {/* Contact info grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl glass border border-border/50 hover:border-primary/20 hover-glow transition-all duration-400 group flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${color}12` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="mailto:vamshikande72@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px -10px hsl(var(--primary) / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-semibold text-sm relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(var(--purple)))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Send size={18} />
            <span className="relative z-10">Send Me a Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.a>

          <div className="flex items-center justify-center gap-4 mt-8">
            {socials.map(({ href, icon: Icon, label, color }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3, boxShadow: `0 0 30px -5px ${color}30` }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-4 rounded-xl glass border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
