import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import HeroCarousel from "./hero-carousel";

const services = [
  "Foam Wash",
  "Pressure Wash",
  "Vacuum",
  "Leather/Fabric Care",
  "Dry Cleaning",
  "3M Wax Polish",
];

export default function HeroSection() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden text-white min-h-[520px] md:min-h-[580px]">
      {/* ── Full-width background carousel ──────────────────────────────── */}
      <HeroCarousel />

      {/* ── Left-side gradient — stronger on mobile to mask van branding text ── */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/70 via-black/30 to-black/5 md:from-black/50 md:via-black/0 md:to-black/10" />

      {/* ── Top fade (mobile only) — darkens behind H1 for clean contrast ——— */}
      <div className="absolute inset-x-0 top-0 h-52 z-10 pointer-events-none bg-gradient-to-b from-black/40 to-transparent md:hidden" />
    
      {/* ── Bottom fade so dots contrast well ───────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none bg-gradient-to-t from-black/50 to-transparent" />

      {/* ── Hero content ────────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 flex items-center min-h-[520px] md:min-h-[580px] py-12">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white">
          Doorstep Car Wash <br />
            <span className="text-primary">Service in Delhi</span>
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Premium
          </p>

          <div className="h-20 md:h-24 overflow-hidden mb-3 md:mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentServiceIndex}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent"
              >
                {services[currentServiceIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
            {/* Primary CTA */}
            <a
              href="https://wa.me/917800800122?text=Hi%21%20I%E2%80%99d%20like%20to%20book%20a%20car%20cleaning%20service%20with%20GaadiGlow!"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 px-7 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-600 hover:shadow-green-400/40 hover:scale-105"
            >
              <span className="absolute inset-0 flex items-center justify-center bg-green-600 opacity-0 group-hover:opacity-10 blur-lg transition-all duration-500" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2 text-white"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.66 6.05L0 24l6.23-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.9 9.9 0 01-5.02-1.39l-.36-.22-3.69.96.98-3.6-.23-.37A9.9 9.9 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.24-7.76c-.29-.14-1.71-.84-1.97-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.83 1.18 3.03c.14.19 2.03 3.1 4.92 4.34 1.84.8 2.56.87 3.48.73.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z" />
              </svg>
              Book via WhatsApp
            </a>

            {/* Secondary CTA */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-white/20 hover:border-white/60"
            >
              View Services
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              4.8/5 Rating
            </span>
            <span className="text-white/40">·</span>
            <span>5,000+ Washes Done</span>
            <span className="text-white/40">·</span>
            <span>No Advance Payment</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating orbs */}
      <div className="absolute top-4 right-4 md:right-20 w-24 h-24 bg-accent opacity-10 rounded-full z-10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 md:left-10 w-32 h-32 bg-white opacity-5 rounded-full z-10 pointer-events-none" />
    </section>
  );
}

