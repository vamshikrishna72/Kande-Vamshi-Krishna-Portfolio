import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-28">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
        >
          Hello, I'm
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Kande{" "}
          <span className="text-gradient">Vamshi Krishna</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Computer Science Engineer • AI & Cloud Enthusiast • Google Student Ambassador
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-4"
        >
          <a href="https://github.com/vamshikrishna72" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/kandevamshikrishna/" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:vamshikande72@gmail.com" className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
            <Mail size={20} />
          </a>
          <a href="#contact" className="ml-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-float inline-block">
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
