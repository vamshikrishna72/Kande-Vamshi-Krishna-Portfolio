import { motion } from "framer-motion";
import { ArrowUp, Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/30">
      {/* Gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--cyan) / 0.5), hsl(var(--purple) / 0.5), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#" className="text-2xl font-display font-bold text-gradient inline-block mb-2">
              VK
            </a>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={14} className="text-pink fill-current" style={{ color: "hsl(var(--pink))" }} />
              </motion.span>{" "}
              & passion
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/vamshikrishna72", icon: Github },
              { href: "https://www.linkedin.com/in/kandevamshikrishna/", icon: Linkedin },
              { href: "mailto:vamshikande72@gmail.com", icon: Mail },
            ].map(({ href, icon: Icon }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-all duration-300 hover:border-primary/20"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.1, boxShadow: "0 0 25px -5px hsl(var(--primary) / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl glass border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-border/20">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Kande Vamshi Krishna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
