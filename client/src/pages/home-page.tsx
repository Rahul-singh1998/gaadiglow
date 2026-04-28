import { lazy, Suspense } from "react";
import HeroSection from "@/components/home/hero-section";
import { Helmet } from "react-helmet-async";

const ServicesSection = lazy(() => import("@/components/home/services-section"));
const HowItWorks = lazy(() => import("@/components/home/how-it-works"));
const TestimonialsSection = lazy(() => import("@/components/home/testimonials"));
const FaqSection = lazy(() => import("@/components/home/faq-section"));
const ServiceAreaSection = lazy(() => import("@/components/home/service-area"));

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
        <link rel="canonical" href="https://gaadiglow.com/" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is GaadiGlow?","acceptedAnswer":{"@type":"Answer","text":"GaadiGlow is a professional doorstep car washing and detailing service. We come to your location with our own van, water, and electricity setup, so you don't have to worry about anything."}},{"@type":"Question","name":"Why should I choose GaadiGlow for my car wash and detailing?","acceptedAnswer":{"@type":"Answer","text":"Our team uses high-quality, pH-balanced products and separate microfiber cloths for every section. We come fully equipped with our own water and electricity setup, bringing complete convenience right to your doorstep."}},{"@type":"Question","name":"How do I book a car wash with GaadiGlow?","acceptedAnswer":{"@type":"Answer","text":"Call or WhatsApp us using the number on our website, or fill out the booking form. Once confirmed, our team reaches your location at your preferred time."}},{"@type":"Question","name":"How long does a car wash take?","acceptedAnswer":{"@type":"Answer","text":"Basic Wash: 20-30 minutes. Standard Wash: 30-45 minutes. Fabric / Leather Care: 1.5-3 hours."}},{"@type":"Question","name":"Do I need to provide water or electricity for the wash?","acceptedAnswer":{"@type":"Answer","text":"No. Our van is fully equipped with its own water tank and power supply."}},{"@type":"Question","name":"What types of cars do you service?","acceptedAnswer":{"@type":"Answer","text":"We service all car types — Hatchbacks, Sedans, and SUVs. Pricing varies by vehicle size and service type."}},{"@type":"Question","name":"What if there's not enough parking space for washing?","acceptedAnswer":{"@type":"Answer","text":"We only need a small, safe space around your car. Our team ensures the area stays clean and no mess is left behind."}},{"@type":"Question","name":"How does GaadiGlow manage water and wastage?","acceptedAnswer":{"@type":"Answer","text":"We use high-pressure water systems that reduce water usage by up to 60% compared to traditional washing. All waste water is properly managed and disposed of."}}]}`}</script>
      </Helmet>
      
      <div>
        <HeroSection />
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={null}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={null}>
          <ServiceAreaSection />
        </Suspense>
      </div>
    </>
  );
}
