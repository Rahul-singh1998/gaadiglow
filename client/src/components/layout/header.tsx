import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { Menu, X, Moon, Sun } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          isScrolled
            ? "bg-background/95 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] border-border/70 supports-[backdrop-filter]:bg-background/25 supports-[backdrop-filter]:backdrop-blur-lg"
            : "bg-background/92 shadow-[0_6px_24px_-20px_rgba(15,23,42,0.18)] border-border/45 supports-[backdrop-filter]:bg-background/10 supports-[backdrop-filter]:backdrop-blur-md"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent dark:via-white/30"
        />
        <div className="container mx-auto py-3 px-4 md:px-8 flex items-center justify-between">
          <Link href="https://www.gaadiglow.com/" className="flex items-center">
            <span className="text-primary font-bold text-xl md:text-2xl">
              Gaadi<span className="text-yellow-400">Glow</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden text-foreground focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            <button
              onClick={() => handleNavigation("services")}
              className="font-medium hover:text-primary"
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation("how-it-works")}
              className="font-medium hover:text-primary"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigation("testimonials")}
              className="font-medium hover:text-primary"
            >
              Testimonials
            </button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="group relative active:scale-100 transition-all"
            >
              {/* Icon wrapper for animation */}
              <div className="transition-all duration-300 group-hover:scale-110 group-active:rotate-12 group-active:scale-95">
                {theme === "light" ? (
                  <Moon className="h-5 w-5 text-black group-hover:text-blue-400 transition-colors drop-shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
                ) : (
                  <Sun className="h-5 w-5 text-white group-hover:text-orange-500 transition-colors drop-shadow-[0_0_6px_rgba(251,146,60,0.4)]" />
                )}
              </div>

              {/* Glow pulse on click */}
              <span className="absolute inset-0 rounded-full scale-0 group-active:scale-100 opacity-0 group-active:opacity-40 bg-yellow-300 dark:bg-blue-300 transition-all duration-300 blur-md"></span>
            </Button>

            <a
              href="https://play.google.com/store/apps/details?id=com.gaadiglow.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1.5 px-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <i className="fab fa-google-play" />
              Download App
            </a>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          onNavigate={handleNavigation}
        />
      </header>
      <div aria-hidden="true" className="h-[60px] md:h-[68px]" />
    </>
  );
}