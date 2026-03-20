import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="#" className="relative group">
          <span className="text-2xl font-display font-bold text-gradient">VK</span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--cyan)), hsl(var(--purple)))" }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1 items-center">
          {links.map((l) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className={`text-sm relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="/Kande_Vamshi_Krishna_Resume.pdf"
            download
            className="flex items-center gap-2 ml-3 px-4 py-2 rounded-lg text-sm font-medium relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan) / 0.15), hsl(var(--purple) / 0.15))",
              border: "1px solid hsl(var(--primary) / 0.3)",
              color: "hsl(var(--primary))",
            }}
          >
            <FileDown size={15} />
            Resume
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg glass text-foreground hover:text-primary transition-colors"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-border/30"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-sm py-2.5 px-3 rounded-lg transition-all duration-300 ${
                    active === l.href.replace("#", "")
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="/Kande_Vamshi_Krishna_Resume.pdf"
                download
                className="flex items-center gap-2 text-sm text-primary py-2.5 px-3 mt-2 rounded-lg bg-primary/10 border border-primary/20"
              >
                <FileDown size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
