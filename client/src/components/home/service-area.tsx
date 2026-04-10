import { motion } from "framer-motion";
import { MapPin, Clock, Building2, CheckCircle2, ArrowRight, Rocket } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: MapPin,
    title: "New Delhi Only",
    text: "Currently serving all major areas within the New Delhi city limits — homes, offices & societies.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Same-day & next-day slots available for most New Delhi areas.",
  },
  {
    icon: Building2,
    title: "We Come to You",
    text: "We arrive fully equipped — our own water, electricity & supplies. Zero hassle.",
  },
];

const areas = [
  "Greater Kailash (GK1 & GK2)", "Saket", "Vasant Kunj", "Vasant Vihar",
  "Defence Colony", "Hauz Khas", "Lajpat Nagar", "Malviya Nagar",
  "Panchsheel Park", "South Extension", "Kalkaji", "New Friends Colony (NFC)",
  "Alaknanda", "CR Park"
];

export default function ServiceAreaSection() {
  return (
    <section
      id="service-area"
      className="relative px-4 md:px-8 lg:px-16 py-16 bg-muted/30 overflow-hidden"
    >
      {/* subtle background mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.08) 0%, transparent 55%), radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.07) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-3">Our Service Area</h2>
          <div className="w-12 h-1 bg-accent rounded-full mb-4 mx-auto" />
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Currently serving across <span className="font-semibold text-foreground">New Delhi</span> — doorstep car cleaning at your home, office or society.
          </p>
        </motion.div>

        {/* ── Main layout: map left, info right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Map ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/10 border border-border/50 aspect-[4/3] lg:aspect-auto lg:h-[420px] bg-muted">
              {/* Place-based embed — Google automatically highlights New Delhi's city boundary */}
              <iframe
                title="GaadiGlow Service Area — New Delhi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83946516867!2d77.20897000000001!3d28.613939999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1712682000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              {/* Service area badge overlay */}
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  Service Active &mdash; New Delhi
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Info panel ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Highlight cards */}
            {highlights.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-card border border-border/60 rounded-xl p-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            ))}

            {/* Areas served */}
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                Areas We Currently Serve
              </p>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="text-xs font-medium bg-primary/8 text-primary border border-primary/20 px-2.5 py-1 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
              {/* NCR coming soon */}
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/50">
                <Rocket className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Expanding to Noida, Gurgaon &amp; NCR soon.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link href="/booking">
              <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:brightness-110 text-primary-foreground font-semibold gap-2 shadow-md shadow-primary/20 transition-[filter] duration-200">
                Book Your Service
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
