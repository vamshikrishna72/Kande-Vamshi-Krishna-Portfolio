import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/vamshi-profile.jpeg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-28">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/[0.05] to-transparent rounded-full blur-[100px]" />
      </div>

      {/* Animated ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      

      {/* Floating particles */}
      {[...Array(6)].map((_, i) =>
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        style={{
          top: `${20 + i * 12}%`,
          left: `${10 + i * 15}%`
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5
        }} />

      )}

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Text content */}
        <div className="text-center md:text-left flex-1">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            
            Kande{" "}
            <motion.span
              className="text-gradient inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
              
              Vamshi Krishna
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            
            Computer Science Engineer • AI & Cloud Enthusiast • Google Student Ambassador
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-3">
            
            {[
            { href: "https://github.com/vamshikrishna72", icon: Github },
            { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin },
            { href: "mailto:vamshikande72@gmail.com", icon: Mail }].
            map(({ href, icon: Icon }, i) =>
            <motion.a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="p-3 rounded-lg bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}>
              
                <Icon size={20} />
              </motion.a>
            )}
            <motion.a
              href="#contact"
              className="ml-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}>
              
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative flex-shrink-0">
          
          {/* Rotating ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          
          {/* Pulsing glow */}
          <motion.div
            className="absolute -inset-2 rounded-full bg-primary/10 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
            style={{ top: "50%", left: "50%" }}
            animate={{
              x: [0, 120, 0, -120, 0],
              y: [-120, 0, 120, 0, -120]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          
          <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/30 relative z-10 shadow-2xl shadow-primary/20">
            <motion.img
              alt="Kande Vamshi Krishna"
              className="w-full h-full object-cover object-[center_25%] scale-110"
              whileHover={{ scale: 1.18 }}
              transition={{ duration: 0.4 }} src="/lovable-uploads/9236dbfa-ff84-42ea-9027-f9e219b6cc85.png" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2">
        
        <motion.a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors inline-block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>);

};

export default Hero;