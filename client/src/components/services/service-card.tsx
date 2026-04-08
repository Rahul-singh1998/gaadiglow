import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  type Service,
  type ServiceImage,
  VEHICLE_TIERS,
  VEHICLE_LABELS,
  type ServicePrice,
} from "@/constants/services";
import { useState } from "react";

// Append width/fill to a Cloudinary f_auto,q_auto URL for bandwidth reduction
function cdnUrl(src: string, width: number): string {
  return src.replace(
    /\/upload\/(f_auto,q_auto)/,
    `/upload/$1,w_${width},c_fill`
  );
}

// ─── Static Image Card (no auto-slide) ────────────────────────────────────────
function ServiceImagePanel({
  images,
  title,
  subtitle,
}: {
  images: ServiceImage[];
  title: string;
  subtitle?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative h-60 overflow-hidden select-none">
      <img
        src={cdnUrl(images[activeIndex].src, 600)}
        alt={images[activeIndex].alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        width={600}
        height={240}
      />

      {/* Gradient + title */}
      <div className="absolute bottom-0 left-0 right-0 p-2 z-10 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-white/80 font-medium">{subtitle}</p>
        )}
      </div>

      {/* Dot indicators — manual browse only, no auto-slide */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-3 z-20 flex items-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Image ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-200 ${
                i === activeIndex
                  ? "bg-white w-4 h-1.5"
                  : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  showAddonBadge?: boolean;
}

export default function ServiceCard({
  service,
  showAddonBadge,
}: ServiceCardProps) {
  const [showPrices, setShowPrices] = useState(false);
  const [selectedSeatTab, setSelectedSeatTab] = useState<"leather" | "fabric">(
    "leather"
  );
  const isPopular = !!service.popular;

  const card = (
    <div
      className={`group relative flex flex-col h-full rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-200 ${
        isPopular ? "border-0" : "border border-border"
      }`}
    >
      {/* Add-On badge */}
      {showAddonBadge && (
        <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-20">
          Add-On
        </span>
      )}

      {/* Static image panel */}
      <ServiceImagePanel
        images={
          service.images && service.images.length > 0
            ? service.images
            : [{ src: service.image, alt: service.title }]
        }
        title={service.title}
        subtitle={service.subtitle}
      />

      {/* Content body */}
      <div className="flex flex-col flex-1 min-h-0 p-4 pt-3">
        {/* Duration pill + starting price */}
        <div className="flex items-center gap-3 mb-3">
          {service.duration && (
            <span
              className={`inline-flex items-center gap-1.5 self-start text-xs font-semibold bg-gradient-to-r ${service.color} text-white rounded-full px-3 py-1 shadow-sm`}
            >
              <Clock className="h-3 w-3" />
              {service.duration}
            </span>
          )}
          <span className="text-xs text-muted-foreground font-medium">
            Starting @{" "}
            &#8377;
            {service.priceBySeatType
              ? service.priceBySeatType.leather[0].final
              : service.price[0].final}
          </span>
        </div>

        <p className="text-sm text-darkgray mb-2 leading-relaxed">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-1 mb-3 overflow-y-auto max-h-36 pr-1 scrollbar-custom">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check
                className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"
                strokeWidth={2.5}
              />
              <span className="text-sm leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Collapsible price section — CSS max-height, no framer-motion */}
        <div className="mt-auto pt-3 border-t border-border">
          <button
            type="button"
            onClick={() => setShowPrices((prev) => !prev)}
            className="w-full flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1"
          >
            <span>
              {showPrices ? "Hide Prices" : "View Prices by Vehicle"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showPrices ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* CSS max-height collapse — no JS animation library needed */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-out ${
              showPrices ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {service.priceBySeatType && (
              <div className="flex gap-1 pt-2 pb-1">
                {(["leather", "fabric"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedSeatTab(tab)}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-colors duration-150 capitalize ${
                      selectedSeatTab === tab
                        ? "bg-primary text-white shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-1 pt-1">
              {VEHICLE_TIERS.map((tier, index) => {
                const priceGroup = service.priceBySeatType
                  ? service.priceBySeatType[selectedSeatTab]
                  : service.price;
                const entry: ServicePrice = priceGroup[index];
                const discountPct = Math.round(
                  (1 - entry.final / entry.mrp) * 100
                );
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-xs font-medium">
                      {VEHICLE_LABELS[tier]}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-400/10 rounded px-1 py-0.5">
                        {discountPct}% OFF
                      </span>
                      <span className="text-sm font-bold">
                        &#8377;{entry.final}
                      </span>
                      <span className="line-through text-darkgray text-[10px]">
                        &#8377;{entry.mrp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/booking">
          <Button
            className={`w-full mt-3 bg-gradient-to-r ${service.color} hover:brightness-110 text-white font-semibold rounded-xl h-9 text-xs shadow-md transition-[filter] duration-200`}
          >
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );

  if (isPopular) {
    return (
      <div className="golden-border-wrapper h-full relative">
        {/* Popular badge */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-400/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
            Most Popular
          </span>
        </div>
        {card}
      </div>
    );
  }
  return card;
}