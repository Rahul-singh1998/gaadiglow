import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rohan Singh",
    location: "Kalkaji, New Delhi",
    rating: 5.0,
    text: "Exceptional service quality! The team arrived exactly on time and delivered outstanding results. My car looks brand new. Will definitely book again.",
    initials: "RS",
    bgColor: "from-blue-500 to-blue-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/v1775118542/rohan_singh_budazd",
  },
  {
    id: 2,
    name: "Ujwal M",
    location: "Nehru Place, New Delhi",
    rating: 5.0,
    text: "The Premium Detailing service exceeded my expectations. Professional team, eco-friendly products, and attention to detail. Highly recommended!",
    initials: "UM",
    bgColor: "from-purple-500 to-purple-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/v1775118555/ujwal_king_ftwoxt",
  },
  {
    id: 3,
    name: "Ajay Dana",
    location: "Kalkaji, New Delhi",
    rating: 4.5,
    text: "Convenient mobile service that saves time and delivers quality. The booking process is seamless and the results speak for themselves.",
    initials: "AD",
    bgColor: "from-amber-500 to-amber-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/v1775118541/ajay_dana_kb3hhz",
  },
  {
    id: 4,
    name: "Neha Sharma",
    location: "Connaught Place, New Delhi",
    rating: 5.0,
    text: "Amazing attention to detail and great customer service. My car has never looked better!",
    initials: "NS",
    bgColor: "from-pink-500 to-pink-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/v1775118542/neha_sharma_msodvx",
  },
  {
    id: 5,
    name: "Vikram Patel",
    location: "Dwarka, New Delhi",
    rating: 4.5,
    text: "Highly professional team, prompt service and very satisfied with the results.",
    initials: "VP",
    bgColor: "from-green-500 to-green-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/v1775118577/vikram_patel_cimyfs",
  },
  {
    id: 6,
    name: "Simran Kaur",
    location: "Greater Kailash, New Delhi",
    rating: 5.0,
    text: "Excellent detailing and friendly staff. My car looks spotless every time!",
    initials: "SK",
    bgColor: "from-indigo-500 to-indigo-600",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/simran_kaur_tbicds",
  },
];

const TestimonialCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="min-w-[260px] max-w-[300px] w-full bg-card rounded-xl p-5 shadow-md border border-border flex-shrink-0">
    {/* Profile */}
    <div className="flex items-center mb-3">
      <div className="relative">
        <img
          src={t.image}
          alt={t.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow"
          loading="lazy"
        />
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r ${t.bgColor} flex items-center justify-center text-white text-[9px] font-bold shadow`}
        >
          {t.initials}
        </div>
      </div>
      <div className="ml-3">
        <h3 className="font-semibold text-sm">{t.name}</h3>
        <p className="text-xs text-mediumgray">{t.location}</p>
      </div>
    </div>

    {/* Stars */}
    <div className="flex items-center mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.floor(t.rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < t.rating
              ? "text-yellow-400 fill-yellow-400/50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-mediumgray text-xs font-medium">
        {t.rating}
      </span>
    </div>

    {/* Review */}
    <p className="text-sm leading-relaxed text-mediumgray">
      &ldquo;{t.text}&rdquo;
    </p>
  </div>
);

/* Duplicate array for seamless loop */
const marqueeItems = testimonials.concat(testimonials);

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  function pause() {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  }
  function resume() {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  }

  return (
    <section
      id="testimonials"
      className="relative z-30 py-16 bg-background"
    >
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-16">
        <motion.div
          className="text-center mb-10 max-w-[1200px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-3">
            What Our Customers Say
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full" />
          <p className="text-darkgray max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied customers
            about their experience with GaadiGlow.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        className="testimonial-marquee relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onTouchCancel={resume}
      >
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="marquee-track" ref={trackRef}>
          {marqueeItems.map((t, index) => (
            <TestimonialCard key={`${t.id}-${index}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
