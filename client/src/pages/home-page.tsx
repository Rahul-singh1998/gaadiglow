import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import HowItWorks from "@/components/home/how-it-works";
import TestimonialsSection from "@/components/home/testimonials";
import FaqSection from "@/components/home/faq-section";
import ServiceAreaSection from "@/components/home/service-area";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>GaadiGlow - Doorstep Car Wash &amp; Detailing in Delhi NCR</title>
        <meta name="description" content="GaadiGlow offers premium doorstep car wash, fabric &amp; leather seat care &amp; 3M wax polish in Delhi NCR. Book car cleaning at home or office in minutes — we bring all equipment to you." />
        <meta name="keywords" content="doorstep car wash Delhi, mobile car detailing, car cleaning at home, car wash Delhi NCR, interior car cleaning, 3M wax polish, fabric leather seat cleaning Delhi, home car wash service, basic wash, standard wash" />
        <meta property="og:title" content="GaadiGlow - Doorstep Car Wash &amp; Detailing in Delhi NCR" />
        <meta property="og:description" content="Premium mobile car wash &amp; detailing at your doorstep. Foam wash, fabric &amp; leather seat care, interior cleaning &amp; 3M wax polish. Serving Delhi NCR — book via WhatsApp!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaadiglow.com" />
        <meta property="og:image" content="https://res.cloudinary.com/dt5lgnfub/image/upload/v1775127770/doorstep-car-cleaning-service-delhi_qfun5o.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GaadiGlow - Doorstep Car Wash &amp; Detailing" />
        <meta name="twitter:description" content="Premium mobile car wash &amp; detailing at your doorstep in Delhi NCR. Book via WhatsApp!" />
        <meta name="twitter:image" content="https://res.cloudinary.com/daeobjgd0/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1765862042/main1_pnywak.png" />
      </Helmet>
      
      <div>
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <TestimonialsSection />
        <FaqSection />
        <ServiceAreaSection />
      </div>
    </>
  );
}
