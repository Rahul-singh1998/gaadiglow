import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { scrollToSection } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNavigation = (sectionId: string) => {
    onClose(); // Close the menu first
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden w-full absolute z-50 rounded-b-lg border-b border-border/60 bg-background/95 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.32)] supports-[backdrop-filter]:bg-background/58 supports-[backdrop-filter]:backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => handleNavigation("services")}
              className="block font-medium hover:text-primary transition-colors py-1.5 w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation("how-it-works")}
              className="block font-medium hover:text-primary transition-colors py-1.5 w-full text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigation("testimonials")}
              className="block font-medium hover:text-primary transition-colors py-1.5 w-full text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleNavigation("callback")}
              className="block font-medium hover:text-primary transition-colors py-1.5 w-full text-left"
            >
              Request Call Back
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className="block font-medium hover:text-primary transition-colors py-1.5 w-full text-left"
            >
              Contact
            </button>
            <div className="flex items-center justify-between py-1.5">
              <span className="font-medium">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
              <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
                {theme === "light" ? (
                  <Moon className="h-4 w-4 text-black group-hover:text-blue-400 transition-colors drop-shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
                ) : (
                  <Sun className="h-4 w-4 text-white group-hover:text-orange-500 transition-colors drop-shadow-[0_0_6px_rgba(251,146,60,0.4)]" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}