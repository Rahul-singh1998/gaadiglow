import type { VehicleTier } from "./services";


// Service image keys (keep in sync everywhere)
export const SERVICE_IMAGE_KEYS = [
  "BASIC_WASH",
  "STANDARD_WASH",
  "FABRIC_LEATHER_CARE",
  "ADD_ON_3M_WAX_POLISH",
] as const;
export type ServiceImageKey = typeof SERVICE_IMAGE_KEYS[number];

// Booking page service images (minimal/iconic)
export const BOOKING_SERVICE_IMAGES: Record<ServiceImageKey, string> = {
  BASIC_WASH: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/basic-wash_ekli0v",
  STANDARD_WASH: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/standard-wash_l6l3r7",
  FABRIC_LEATHER_CARE: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/deep-wash_hbupxa",
  ADD_ON_3M_WAX_POLISH: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/3M-auto-wax_pwdiwp",
};

export const VEHICLE_IMAGES: Record<VehicleTier, string> = {
  HATCHBACK: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Hatchback_logo_jtvi41",
  SEDAN_MINI_SUV: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Sedan_logo_khrx4o",
  STANDARD_SUV: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Standard_SUVs_logo_uhg5ji",
  LARGE_SUV: "https://res.cloudinary.com/dt5lgnfub/image/upload/f_auto,q_auto/Large_SUVs_logo_klpf8t",
};

