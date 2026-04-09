

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------


// Vehicle categories (source of truth)
export const VEHICLE_TIERS = [
  "HATCHBACK",
  "SEDAN_MINI_SUV",
  "STANDARD_SUV",
  "LARGE_SUV",
] as const;

export type VehicleTier = typeof VEHICLE_TIERS[number];

// Vehicle category labels for UI
export const VEHICLE_LABELS: Record<VehicleTier, string> = {
  HATCHBACK: "Hatchback",
  SEDAN_MINI_SUV: "Sedan & Mini SUVs",
  STANDARD_SUV: "Standard SUVs",
  LARGE_SUV: "Large SUVs",
};


export interface ServicePrice {
  /** Original / MRP price */
  mrp: number;
  /** Discounted / final price */
  final: number;
}

export interface ServiceImage {
  src: string;
  alt: string;
}

export interface Service {
  id: number;
  title: string;
  /** Optional parenthetical subtitle rendered below the title */
  subtitle?: string;
  /** Body text shown in the card (plain string) */
  description: string;
  features: string[];
  /**
   * One entry per VEHICLE_TIERS index:
   * [Hatchback, Sedan / Compact SUV, Standard SUV, Full-size SUV]
   */
  price: ServicePrice[];
  /** Approximate service duration shown on the card */
  duration?: string;
  /** Cloudinary / public image URL (primary / fallback) */
  image: string;
  /** Multiple images for the card slider */
  images?: ServiceImage[];
  /** Tailwind gradient class for the card header */
  color: string;
  /** Mark the card with a "Popular" badge */
  popular?: boolean;
  /**
   * Dual pricing by seat material — present only for services that charge
   * differently based on seat type (e.g. Fabric / Leather Care).
   * When present, use this instead of `price` for all pricing displays.
   * `price` holds the leather tier as a safe fallback.
   */
  priceBySeatType?: {
    leather: ServicePrice[];
    fabric: ServicePrice[];
  };
}

// ---------------------------------------------------------------------------
// Service catalogue
// ---------------------------------------------------------------------------

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Basic Wash",
    subtitle: "Quick & Effective Exterior Care",
    description: "Includes:",
    features: [
      "Exterior High-Pressure Wash",
      "Foam Wash with pH-Balanced Shampoo",
      "Manual Shampoo Rubbing For Dust Removal",
      "Drying with Soft Microfiber Cloths",
      "Alloy Wheel & Tyre Cleaning with Brush",
    ],
    price: [
      { mrp: 500, final: 399 },  // Hatchback
      { mrp: 625, final: 499 },  // Sedan / Compact SUV
      { mrp: 750, final: 599 },  // Standard SUV
      { mrp: 875, final: 699 },  // Full-size SUV
    ],
    duration: "20–30 min",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/basic-car-wash-service-delhi-3",
    images: [
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/basic-car-wash-service-delhi-3", alt: "Professional doorstep car foam wash exterior cleaning service" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/man-wash-car-using-shampoo_hb3niq", alt: "Car body polishing for enhanced shine and gloss finish doorstep service" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/car-wash-detailing-station_fvpkw3", alt: "High pressure car wash removing dirt and dust at doorstep Delhi" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/mirror-cleaning_qetktd", alt: "Alloy wheel and tyre cleaning with brush car wash service" },
    ],
    color: "from-blue-500 to-blue-200",
  },
  {
    id: 2,
    title: "Standard Wash",
    subtitle: "Beyond Basic — Shine & Protection Combined",
    description: "Includes Everything in Basic Wash, plus:",
    features: [
      "Engine Bay Cleaning (done safely by protecting battery area)",
      "Body Polishing for Enhanced Shine",
      "Glass Polishing for Clear Visibility",
      "Logo Dust Removal for Neat Finish",
      "Tyre Polish & Dressing for Rich Black look",
    ],
    price: [
      { mrp: 999, final: 799 },   // Hatchback
      { mrp: 1124, final: 899 },   // Sedan / Compact SUV
      { mrp: 1249, final: 999 },  // Standard SUV
      { mrp: 1499, final: 1199 },  // Full-size SUV
    ],
    
    duration: "1–1.5 hrs",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/seat-cleaning-service-car-delhi-2",
    images: [
      
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/seat-cleaning-service-car-delhi-2", alt: "Complete car interior cleaning and detailing service Delhi NCR" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/man-s-hand-is-cleaning-waxing-car_1150-6629_ltz1bo", alt: "Safe engine bay cleaning with protective covering car detailing Delhi" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/close-up-person-cleaning-car-interior_ir8c60", alt: "Car glass polishing for clear visibility standard wash service" },
    ],
    color: "from-purple-500 to-purple-200",
    popular: true,
  },
  {
    id: 3,
    title: "Fabric / Leather Care",
    subtitle: "Complete Interior Deep Cleaning & Care",
    description: "Includes:",
    features: [
      "Deep dry cleaning of all fabric/leather seats (edges, stitching & corners included)",
      "Roof (headliner) cleaning using safe dry method",
      "Complete interior vacuuming (under seats, carpets & boot area)",
      "Floor mats washing, scrubbing & cleaning",
      "Car basement cleaning with foam & scrubbing",
      "Door panels, strips & side trims detailed cleaning",
      "Dashboard & center console cleaning, detailing & polishing",
      "Stain & dirt removal with proper treatment",
      "Full interior detailing for a fresh finish",
    ],
    price: [
      { mrp: 1799, final: 1399 },  // Hatchback (leather — default)
      { mrp: 1999, final: 1599 },  // Sedan
      { mrp: 2249, final: 1799 },  // Standard SUV
      { mrp: 2749, final: 2199 },  // Large SUV
    ],
    priceBySeatType: {
      leather: [
        { mrp: 1799, final: 1399 },
        { mrp: 1999, final: 1599 },
        { mrp: 2249, final: 1799 },
        { mrp: 2749, final: 2199 },
      ],
      fabric: [
        { mrp: 2199, final: 1699 },
        { mrp: 2399, final: 1899 },
        { mrp: 2599, final: 2099 },
        { mrp: 3149, final: 2499 },
      ],
    },
    duration: "1.5 – 3 hrs",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Leather_Seat_Cleaning_c266ld",
    images: [
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Leather_Seat_Cleaning_c266ld", alt: "Deep dry cleaning of fabric and leather car seats at doorstep Delhi" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Keeping_Car_Seats_in_Top_Condition_halbdz", alt: "Dashboard and center console cleaning polishing service Delhi" },
      { src: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Remove_Stains_and_Odors_hc1pf7", alt: "Dashboard and center console cleaning polishing service Delhi" },
    ],
    color: "from-amber-500 to-amber-200",
  },
  // 3M Wax Polish as Add-On Service
  {
    id: 5,
    title: "3M Wax Polish",
    subtitle: "Premium Paint Protection Treatment",
    description: "Includes:",
    features: [
      "Premium 3M Wax Application",
      "10-Minute Curing for Deep Protection",
      "Manual Buffing for Mirror-Like Shine",
    ],
    price: [
      { mrp: 199, final: 149 }, // Hatchback
      { mrp: 249, final: 199 }, // Sedan / Compact SUV
      { mrp: 249, final: 199 }, // Standard SUV
      { mrp: 375, final: 299 }, // Full-size SUV
    ],
    duration: "15–30 min",
    image: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/car-wax-polish-service-delhi-1",
    color: "from-rose-500 to-rose-200",
    
  },
];
