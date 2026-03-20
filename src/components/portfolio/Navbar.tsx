import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
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
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="#" className="text-xl font-bold text-gradient font-mono">VK</a>
        <div className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className={`text-sm relative py-1 transition-colors ${
                active === l.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
              {active === l.href.replace("#", "") && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="/Kande_Vamshi_Krishna_Resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] transition-all duration-300"
          >
            <FileDown size={16} />
            Resume
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="flex flex-col p-4 gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`text-sm py-1 transition-colors ${
                    active === l.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/Kande_Vamshi_Krishna_Resume.pdf"
                download
                className="flex items-center gap-2 text-sm text-primary py-1"
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
