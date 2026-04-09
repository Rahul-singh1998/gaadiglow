import { motion } from "framer-motion";
import { SERVICES } from "@/constants/services";
import ServiceCard from "@/components/services/service-card";
import { Droplets, UsersRound, TruckIcon, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// IDs: 1=Basic Wash, 2=Standard Wash, 3=Fabric / Leather Care (main), 5=3M Wax Polish (add-on)
const MAIN_SERVICE_IDS = [1, 2, 3];
const ADDON_SERVICE_ID = 5;

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const whyChooseFeatures: Feature[] = [
  {
    icon: Droplets,
    title: "Eco-Friendly Products",
    description:
      "We use biodegradable and non-toxic products that are tough on dirt but safe for your family and the environment.",
  },
  {
    icon: UsersRound,
    title: "Expert Technicians",
    description:
      "Our team is professionally trained, background-checked, and passionate about car detailing perfection.",
  },
  {
    icon: TruckIcon,
    title: "We Come to You",
    description:
      "Fully equipped mobile units bring the car wash to your doorstep, saving you time and hassle.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description:
      "What you see is exactly what you pay- no unexpected fees, no last-minute additions, and no hidden costs.",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-md transition-[transform,box-shadow] duration-200 ease-out">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
        <feature.icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-bold text-base mb-2">{feature.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

export default function ServicesSection() {
  const mainServices = SERVICES.filter((s) => MAIN_SERVICE_IDS.includes(s.id));
  const addonService = SERVICES.find((s) => s.id === ADDON_SERVICE_ID);

  return (
    <section
      id="services"
      className="relative z-10 px-4 md:px-8 lg:px-16 py-16 bg-background"
    >
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-3">
            Our Services
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mb-4 mx-auto" />
          <p className="text-darkgray max-w-xl mx-auto text-base">
            Professional car care at your doorstep with premium quality and
            attention to detail.
          </p>
        </motion.div>

        {/* Main service cards — fixed card height; long feature lists scroll inside the card.
             → To make cards taller/shorter, change the h-[...] value on the motion.div below. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {mainServices.map((service, i) => (
            <motion.div
              key={service.id}
              className="h-[560px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* Add-On section */}
        {addonService && (
          <div className="mt-8 max-w-[300px] mx-auto">
            <ServiceCard service={addonService} showAddonBadge compact />
          </div>
        )}

        {/* Why Choose Us */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl mb-3">
              Why Choose Us
            </h2>
            <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver excellence in every detail. Here is why Delhi NCR trusts
              us with their vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
