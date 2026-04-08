import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Phone, HelpCircle, Wrench, CalendarCheck, LayoutGrid, X } from "lucide-react";

// --- Types ---

const CATEGORIES = ["All", "General", "Booking", "Service"] as const;
type Category = typeof CATEGORIES[number];

interface FAQ {
  question: string;
  answer: string;
  category: Exclude<Category, "All">;
}

// --- Data ---

const faqs: FAQ[] = [
  {
    question: "What is GaadiGlow?",
    answer:
      "GaadiGlow is a professional doorstep car washing and detailing service. We come to your location with our own van, water, and electricity setup, so you don't have to worry about anything.",
    category: "General",
  },
  {
    question: "Why should I choose GaadiGlow for my car wash and detailing?",
    answer:
      "GaadiGlow stands out because we're not just washing cars — we're giving them the professional care they deserve. Our team uses high-quality, pH-balanced products and separate microfiber cloths for every section to keep your car safe from scratches. We come fully equipped with our own water and electricity setup, bringing complete convenience right to your doorstep. With every wash, you'll notice the visible difference in shine, care, and attention to detail — all in one hassle-free visit.",
    category: "General",
  },
  {
    question: "How do I book a car wash with GaadiGlow?",
    answer:
      "You can easily call or WhatsApp us using the number on our website, or fill out the booking form. Once confirmed, our team reaches your location at your preferred time.",
    category: "Booking",
  },
  {
    question: "How long does a car wash take?",
    answer:
      "Basic Wash: 20-30 minutes. Standard Wash: 30-45 minutes. Fabric / Leather Care: 1.5-3 hours. Timings may vary slightly depending on your car's condition and selected package.",
    category: "Booking",
  },
  {
    question: "Do I need to provide water or electricity for the wash?",
    answer:
      "No, not at all! Our van is fully equipped with its own water tank and power supply, so the entire service is handled by our team without using your resources.",
    category: "Service",
  },
  {
    question: "What types of cars do you service?",
    answer:
      "We provide washing and detailing for all car types -- Hatchbacks, Sedans, and SUVs. The pricing varies slightly depending on the vehicle size and service type.",
    category: "Service",
  },
  {
    question: "What if there's not enough parking space for washing?",
    answer:
      "No problem! We only need a small, safe space around your car -- like your parking area, open ground floor, or society corner. Our team ensures the area stays clean and no mess is left behind.",
    category: "Service",
  },
  {
    question: "How does GaadiGlow manage water and wastage?",
    answer:
      "We use high-pressure water systems that reduce water usage by up to 60% compared to traditional washing. All waste water is properly managed and disposed of, ensuring eco-friendly and responsible cleaning.",
    category: "Service",
  },
];

const CATEGORY_META: Record<Category, { icon: React.ElementType; label: string }> = {
  All: { icon: LayoutGrid, label: "All" },
  General: { icon: HelpCircle, label: "General" },
  Booking: { icon: CalendarCheck, label: "Booking" },
  Service: { icon: Wrench, label: "Service" },
};

// --- FAQ Item ---

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`rounded-2xl border bg-card transition-all duration-200 ${
        isOpen
          ? "border-primary/30 shadow-lg shadow-primary/5"
          : "border-border hover:border-primary/20 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-sm md:text-[15px] leading-snug transition-colors ${
            isOpen ? "text-primary" : "text-foreground"
          }`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown
            className={`h-5 w-5 transition-colors ${
              isOpen ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-2 text-sm md:text-[15px] text-muted-foreground leading-relaxed border-t border-primary/10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Main Section ---

export default function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0].question);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackStatus, setCallbackStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setOpenQuestion(null);
  }, [activeCategory, searchQuery]);

  const leftColumn = filteredFaqs.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredFaqs.filter((_, i) => i % 2 !== 0);

  function toggle(question: string) {
    setOpenQuestion((prev) => (prev === question ? null : question));
  }

  async function handleCallbackSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setCallbackStatus("loading");
    const fd = new FormData(form);
    fd.append("_template", "table");
    try {
      const res = await fetch("https://formsubmit.co/19991b6612b28fb7dca7bd8ef644e3d1", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setCallbackStatus("success");
        form.reset();
      } else {
        setCallbackStatus("error");
      }
    } catch {
      setCallbackStatus("error");
    }
  }

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });

  return (
    <section
      className="relative z-50 py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background"
      aria-labelledby="faq-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3"
          >
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know before booking your doorstep car wash.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-lg mx-auto mb-6 relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your question..."
            aria-label="Search FAQs"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-card text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          role="tablist"
          aria-label="FAQ categories"
        >
          {CATEGORIES.map((cat) => {
            const { icon: Icon, label } = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            const count =
              cat === "All"
                ? faqs.length
                : faqs.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* FAQ grid */}
        {filteredFaqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No questions found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-sm text-primary underline underline-offset-4"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <>
            {/* Desktop 2-column */}
            <div className="hidden md:grid grid-cols-2 gap-4 items-start">
              <div className="space-y-4">
                {leftColumn.map((faq) => (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    index={filteredFaqs.indexOf(faq)}
                    isOpen={openQuestion === faq.question}
                    onToggle={() => toggle(faq.question)}
                  />
                ))}
              </div>
              <div className="space-y-4">
                {rightColumn.map((faq) => (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    index={filteredFaqs.indexOf(faq)}
                    isOpen={openQuestion === faq.question}
                    onToggle={() => toggle(faq.question)}
                  />
                ))}
              </div>
            </div>

            {/* Mobile single column */}
            <div className="md:hidden space-y-3">
              {filteredFaqs.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={i}
                  isOpen={openQuestion === faq.question}
                  onToggle={() => toggle(faq.question)}
                />
              ))}
            </div>
          </>
        )}

        {/* Still have questions */}
        <motion.div
          id="callback"
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border border-border rounded-3xl p-8 md:p-12">

            <div className="text-center mb-8">
              <h3 className="font-bold text-2xl md:text-3xl mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Our team is ready to help -- reach us instantly via WhatsApp or request a call back.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <a
                href="https://wa.me/917800800122?text=Hi!%20I%20have%20a%20question%20about%20GaadiGlow."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-green-400/20 hover:bg-[#1ebe5d] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.66 6.05L0 24l6.23-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.9 9.9 0 01-5.02-1.39l-.36-.22-3.69.96.98-3.6-.23-.37A9.9 9.9 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.24-7.76c-.29-.14-1.71-.84-1.97-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.03 2.83 1.18 3.03c.14.19 2.03 3.1 4.92 4.34 1.84.8 2.56.87 3.48.73.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z" />
                </svg>
                Chat on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setShowCallbackForm((p) => !p)}
                className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  showCallbackForm
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                <Phone className="h-4 w-4" />
                {showCallbackForm ? "Hide Form" : "Request a Call Back"}
              </button>
            </div>

            <AnimatePresence>
              {showCallbackForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border pt-8 mt-6">
                    <form
                      onSubmit={handleCallbackSubmit}
                      method="POST"
                      className="max-w-md mx-auto space-y-5"
                    >
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />

                      <div>
                        <label htmlFor="cb-name" className="block text-sm font-semibold mb-1.5">
                          Full Name
                        </label>
                        <input
                          id="cb-name"
                          name="name"
                          type="text"
                          required
                          placeholder="e.g. Saurav Singh"
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="cb-phone" className="block text-sm font-semibold mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                            +91
                          </span>
                          <input
                            id="cb-phone"
                            name="phone"
                            type="text"
                            required
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                            }}
                            className="w-full pl-12 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          We will call in the time slot you select below.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="cb-time" className="block text-sm font-semibold mb-1.5">
                          Preferred Time
                        </label>
                        <select
                          id="cb-time"
                          name="time"
                          defaultValue=""
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        >
                          <option value="" disabled>Select a convenient time</option>
                          <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening (4 PM - 6 PM)">Evening (4 PM - 6 PM)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={callbackStatus === "loading"}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {callbackStatus === "loading" ? (
                          <span className="inline-flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Requesting...
                          </span>
                        ) : (
                          "Request Call Back"
                        )}
                      </button>

                      {callbackStatus === "success" && (
                        <p className="text-center text-sm text-green-600 font-medium" aria-live="polite">
                          Request received -- we will call you shortly!
                        </p>
                      )}
                      {callbackStatus === "error" && (
                        <p className="text-center text-sm text-destructive font-medium" aria-live="polite">
                          Submission failed -- please try again.
                        </p>
                      )}
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}