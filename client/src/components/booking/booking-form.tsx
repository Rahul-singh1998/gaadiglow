
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryModal from "./category-modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookingFormData } from "@/pages/booking-page";
import { SERVICES, VEHICLE_TIERS, VEHICLE_LABELS } from "@/constants/services";
import { VEHICLE_IMAGES } from "@/constants/serviceImages";
import { BOOKING_SERVICE_IMAGES, ServiceImageKey } from "@/constants/serviceImages";
import { motion } from "framer-motion";
import { MapPin, Loader2, Phone, User, Calendar, Clock, Car, Sparkles, ExternalLink, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  bookingData: BookingFormData;
  updateBookingData: (data: Partial<BookingFormData>) => void;
}

const TIME_SLOTS = [
  "06:00 AM - 08:00 AM",
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
  "08:00 PM - 09:00 PM",
];



/* Stagger animation helpers */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

const inputBase =
  "h-12 w-full rounded-xl bg-white/80 dark:bg-background/60 border border-border/50 px-4 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground/50 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white dark:focus:bg-background focus:scale-[1.01]";

const ErrorMsg = ({ msg }: { msg?: string }) =>
  msg ? (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex items-center gap-2 text-destructive text-xs bg-destructive/5 px-3 py-2 rounded-lg"
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      <span className="font-medium">{msg}</span>
    </motion.div>
  ) : null;

export default function BookingForm({
  bookingData,
  updateBookingData,
}: BookingFormProps) {
  const [locating, setLocating] = useState(false);
  const [locationUrl, setLocationUrl] = useState<string>("");
  const [manualAddress, setManualAddress] = useState<string>("");
  const [seatType, setSeatType] = useState<'leather' | 'fabric' | ''>('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { toast } = useToast();

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = formatDate(today);
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 30);
  const maxDate = formatDate(maxDateObj);

  const [errors, setErrors] = useState<{
    phone?: string;
    service?: string;
    vehicleType?: string;
    seatType?: string;
    locationUrl?: string;
    manualAddress?: string;
    date?: string;
    time?: string;
    acceptedTerms?: string;
  }>({});

  const clearError = (field: keyof typeof errors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const recalculatePrice = (serviceName: string, vehicleType: string, currentSeatType?: string) => {
    const service = SERVICES.find((s) => s.title === serviceName);
    if (!service) return;
    const tierIndex = VEHICLE_TIERS.indexOf(vehicleType as typeof VEHICLE_TIERS[number]);
    const idx = tierIndex >= 0 ? tierIndex : 0;
    if (service.priceBySeatType && (currentSeatType === 'leather' || currentSeatType === 'fabric')) {
      updateBookingData({ price: service.priceBySeatType[currentSeatType][idx].final });
      return;
    }
    updateBookingData({ price: service.price[idx].final });
  };

  const handleServiceSelect = (title: string) => {
    updateBookingData({ service: title });
    if (title !== "Fabric / Leather Care") setSeatType('');
    recalculatePrice(title, bookingData.vehicleType, title === "Fabric / Leather Care" ? seatType || undefined : undefined);
  };

  const handleVehicleTypeSelect = (vehicleType: string) => {
    updateBookingData({ vehicleType });
    recalculatePrice(bookingData.service, vehicleType, seatType || undefined);
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setErrors((prev) => ({ ...prev, locationUrl: "Geolocation not supported." }));
      toast({ title: "Geolocation not supported", description: "Your browser does not support location sharing.", variant: "destructive" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationUrl(mapsUrl);
        setLocating(false);
        setErrors((prev) => ({ ...prev, locationUrl: undefined }));
        toast({ title: "Location captured successfully" });
      },
      (err) => {
        setLocating(false);
        setLocationUrl("");
        setErrors((prev) => ({
          ...prev,
          locationUrl:
            err.code === 1
              ? "Location access denied. Please enter address manually."
              : "Could not fetch location. Please enter address manually.",
        }));
        toast({ title: "Location error", description: "Could not fetch location. Please enter address manually.", variant: "destructive" });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <motion.form
      className="space-y-7"
      initial="hidden"
      animate="visible"
      onSubmit={(e) => {
        e.preventDefault();
        const phoneRegex = /^[6-9]\d{9}$/;
        const newErrors: typeof errors = {};
        if (!bookingData.phone || !phoneRegex.test(bookingData.phone))
          newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
        if (!bookingData.service)
          newErrors.service = "Please select a service.";
        if (!bookingData.vehicleType)
          newErrors.vehicleType = "Please select your vehicle type.";
        if (bookingData.service === "Fabric / Leather Care" && !seatType)
          newErrors.seatType = "Please select Leather or Fabric seat type.";
        // Address validation
        if (!locationUrl && !manualAddress.trim()) {
          newErrors.manualAddress = "Please provide address or share location.";
        }
        if (manualAddress) {
          if (manualAddress.length < 4) newErrors.manualAddress = "Address too short.";
          else if (!/\d+/.test(manualAddress)) newErrors.manualAddress = "Include your door or flat number.";
        }
        if (!bookingData.date) {
          newErrors.date = "Please select a booking date.";
        } else {
          const selected = new Date(bookingData.date);
          selected.setHours(0, 0, 0, 0);
          if (selected < today) newErrors.date = "Please select a valid future date.";
          else if (selected > maxDateObj) newErrors.date = "You can only book within the next 30 days.";
        }
        if (!bookingData.time)
          newErrors.time = "Please select a time slot.";
        if (!bookingData.acceptedTerms)
          newErrors.acceptedTerms = "You must accept the Terms & Conditions.";
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        setErrors({});
        // Vehicle type → readable label
        const vehicleTypeLabels: Record<string, string> = {
          HATCHBACK: "Hatchback",
          SEDAN_MINI_SUV: "Sedan / Mini SUV",
          STANDARD_SUV: "Standard SUV",
          LARGE_SUV: "Large SUV",
        };
        const vehicleLabel = vehicleTypeLabels[bookingData.vehicleType] ?? bookingData.vehicleType;
        // Generate WhatsApp message
        const seatTypeLine = bookingData.service === "Fabric / Leather Care" && seatType
          ? `\nSeat Type: ${seatType.charAt(0).toUpperCase() + seatType.slice(1)}`
          : "";
        const msg = encodeURIComponent(
`GaadiGlow Booking Request

Customer Details:
Name: ${bookingData.vehicleModel || "Not provided"}
Phone: ${bookingData.phone}

Location Details:
GPS Location: ${locationUrl || "Not Provided"}
Address: ${manualAddress || "Not Provided"}

Booking Details:
Date: ${bookingData.date}
Time: ${bookingData.time || "Not Selected"}
Service: ${bookingData.service}
Vehicle Type: ${vehicleLabel}${seatTypeLine}`
        );
        window.open(`https://wa.me/917800800122?text=${msg}`, "_blank");
      }}
    >
      {/* ─── Name & Phone ─── */}
      <motion.div variants={fadeUp} custom={0} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="vehicle-model" className="flex items-center gap-2 text-sm font-semibold mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-primary" />
            </div>
            Your Name
          </Label>
          <Input
            id="vehicle-model"
            placeholder="e.g. Rahul Sharma"
            autoFocus
            className={inputBase}
            value={bookingData.vehicleModel}
            onChange={(e) => updateBookingData({ vehicleModel: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="h-3.5 w-3.5 text-primary" />
            </div>
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            className={`${inputBase} ${errors.phone ? "!border-destructive ring-1 ring-destructive/30" : ""}`}
            value={bookingData.phone}
            onChange={(e) => {
              updateBookingData({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) });
              clearError("phone");
            }}
          />
          <ErrorMsg msg={errors.phone} />
        </div>
      </motion.div>

      {/* ─── Address Section Refactored ─── */}
      <motion.div variants={fadeUp} custom={1} className="space-y-6">
        {/* A) Current Location (Auto-filled) */}
        <div>
          <Label className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Current Location (via GPS)
          </Label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={locationUrl}
              placeholder="Share your current location"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleShareLocation}
              disabled={locating}
              className="shrink-0"
            >
              {locating ? <Loader2 className="animate-spin h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              Share Location
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Faster service with precise GPS location</div>
          {errors.locationUrl && <ErrorMsg msg={errors.locationUrl} />}
          {locationUrl && (
            <a
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
            >
              <ExternalLink className="h-3 w-3" />
              View on Maps
            </a>
          )}
        </div>

        {/* B) Manual Address (User Input) */}
        <div>
          <Label className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Door / Flat No &amp; Building Name <span className="text-destructive">*</span>
          </Label>
          <Input
            value={manualAddress}
            onChange={e => { setManualAddress(e.target.value); clearError("manualAddress"); }}
            placeholder="Enter door or building number for precise arrival"
            className={errors.manualAddress ? "!border-destructive ring-1 ring-destructive/30" : ""}
          />
          {errors.manualAddress && <ErrorMsg msg={errors.manualAddress} />}
        </div>
      </motion.div>

      {/* ─── Date ─── */}
      <motion.div variants={fadeUp} custom={2}>
        <div>
          <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-3.5 w-3.5 text-primary" />
            </div>
            Booking Date
          </Label>
          <Input
            id="date"
            type="date"
            min={minDate}
            max={maxDate}
            className={`${inputBase} ${errors.date ? "!border-destructive ring-1 ring-destructive/30" : ""}`}
            value={bookingData.date || minDate}
            onChange={(e) => {
              const val = e.target.value;
              const selected = new Date(val);
              selected.setHours(0, 0, 0, 0);
              if (selected < today) {
                toast({ title: "Invalid date", description: "Please select a valid future date.", variant: "destructive" });
                return;
              }
              if (selected > maxDateObj) {
                toast({ title: "Invalid date", description: "You can only book within the next 30 days.", variant: "destructive" });
                return;
              }
              updateBookingData({ date: val });
              clearError("date");
            }}
          />
          <ErrorMsg msg={errors.date} />
          <p className="text-xs text-muted-foreground mt-1.5 ml-1">You can book up to 30 days in advance</p>
        </div>
      </motion.div>

      {/* ─── Time Slot Pills ─── */}
      <motion.div variants={fadeUp} custom={2.5}>
        <Label className="flex items-center gap-2 text-sm font-semibold mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-3.5 w-3.5 text-primary" />
          </div>
          Available Time Slot <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Select a time slot">
          {TIME_SLOTS.map((slot) => {
            const isSelected = bookingData.time === slot;
            return (
              <motion.label
                key={slot}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center justify-center cursor-pointer rounded-xl px-3 py-3 text-center text-sm font-medium transition-all duration-200 border-2 select-none ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/15 ring-2 ring-primary/25"
                    : errors.time
                    ? "border-destructive/40 bg-muted/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                    : "border-border/30 bg-muted/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="time-slot"
                  value={slot}
                  checked={isSelected}
                  onChange={() => { updateBookingData({ time: slot }); clearError("time"); }}
                  className="sr-only"
                  aria-label={slot}
                />
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <span className="leading-tight">{slot}</span>
              </motion.label>
            );
          })}
        </div>
        <ErrorMsg msg={errors.time} />
      </motion.div>

      {/* ─── Choose Package ─── */}
      <motion.div variants={fadeUp} custom={3}>
        <Label className="flex items-center gap-2 text-sm font-semibold mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          Choose Package <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SERVICES.map((service) => {
            const isSelected = bookingData.service === service.title;
            // Map service.title to ServiceImageKey
            let imageKey: ServiceImageKey | undefined = undefined;
            switch (service.title) {
              case "Basic Wash":
                imageKey = "BASIC_WASH";
                break;
              case "Standard Wash":
                imageKey = "STANDARD_WASH";
                break;
              case "Fabric / Leather Care":
                imageKey = "FABRIC_LEATHER_CARE";
                break;
              case "3M Wax Polish":
                imageKey = "ADD_ON_3M_WAX_POLISH";
                break;
              default:
                imageKey = undefined;
            }
            return (
              <motion.button
                key={service.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex flex-col items-center rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30"
                    : errors.service
                    ? "border-destructive/50"
                    : "border-border/30 hover:border-primary/40 hover:shadow-md"
                }`}
                onClick={() => { handleServiceSelect(service.title); clearError("service"); }}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={imageKey ? BOOKING_SERVICE_IMAGES[imageKey] : ''}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={`w-full px-2 py-2.5 text-center transition-colors ${isSelected ? "bg-primary/10" : "bg-muted/30"}`}>
                  <span className="font-semibold text-xs block leading-tight">{service.title}</span>
                  <span className={`text-xs font-bold mt-0.5 block ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                    {(() => {
                      const tierIdx = bookingData.vehicleType
                        ? VEHICLE_TIERS.indexOf(bookingData.vehicleType as typeof VEHICLE_TIERS[number])
                        : -1;
                      if (service.priceBySeatType) {
                        const st = (seatType === 'leather' || seatType === 'fabric') ? seatType : 'leather';
                        const p = service.priceBySeatType[st][tierIdx >= 0 ? tierIdx : 0].final;
                        return tierIdx >= 0 ? `₹${p}` : `₹${p}+`;
                      }
                      const p = service.price[tierIdx >= 0 ? tierIdx : 0]?.final ?? service.price[0].final;
                      return bookingData.vehicleType ? `₹${p}` : `₹${p}+`;
                    })()}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <ErrorMsg msg={errors.service} />
      </motion.div>

      {/* ─── Seat Type (Fabric / Leather Care only) ─── */}
      {bookingData.service === "Fabric / Leather Care" && (
        <motion.div variants={fadeUp} custom={3.5} initial="hidden" animate="visible">
          <Label className="flex items-center gap-2 text-sm font-semibold mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            Seat Type <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(['leather', 'fabric'] as const).map((type) => {
              const isSelected = seatType === type;
              const svc = SERVICES.find((s) => s.title === "Fabric / Leather Care");
              const tierIdx = bookingData.vehicleType
                ? VEHICLE_TIERS.indexOf(bookingData.vehicleType as typeof VEHICLE_TIERS[number])
                : -1;
              const priceLabel = svc?.priceBySeatType
                ? `₹${svc.priceBySeatType[type][tierIdx >= 0 ? tierIdx : 0].final}${tierIdx < 0 ? '+' : ''}`
                : '';
              return (
                <motion.button
                  key={type}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex flex-col items-center gap-1.5 rounded-2xl px-4 py-4 cursor-pointer transition-all duration-300 border-2 ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 ring-2 ring-primary/30'
                      : errors.seatType
                      ? 'border-destructive/50 bg-muted/20'
                      : 'border-border/30 bg-muted/20 hover:border-primary/40 hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSeatType(type);
                    clearError('seatType');
                    recalculatePrice(bookingData.service, bookingData.vehicleType, type);
                  }}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <span className="font-semibold text-sm capitalize">{type} Seats</span>
                  {priceLabel && (
                    <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                      {priceLabel}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <ErrorMsg msg={errors.seatType} />
        </motion.div>
      )}

      {/* ─── Select Car Type ─── */}
      <motion.div variants={fadeUp} custom={4}>
        <Label className="flex items-center gap-2 text-sm font-semibold mb-1">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Car className="h-3.5 w-3.5 text-primary" />
          </div>
          Select Car Type <span className="text-destructive">*</span>
        </Label>
        <button
          type="button"
          className="block text-xs text-primary/80 underline underline-offset-2 hover:text-primary font-medium mb-3 ml-10 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          onClick={() => setShowCategoryModal(true)}
        >
          Confused about your car category? Find out →
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {VEHICLE_TIERS.map((tier) => {
            const isSelected = bookingData.vehicleType === tier;
            return (
              <motion.button
                key={tier}
                type="button"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-white ${
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30"
                    : errors.vehicleType
                    ? "border-destructive/50"
                    : "border-border/30 hover:border-primary/40 hover:shadow-md"
                }`}
                onClick={() => { handleVehicleTypeSelect(tier); clearError("vehicleType"); }}
              >
                <div className="w-full aspect-square flex items-center justify-center transition-colors bg-transparent">
                  <div className="w-[80%] h-[80%] flex items-center justify-center">
                    <img
                      src={VEHICLE_IMAGES[tier]}
                      alt={VEHICLE_LABELS[tier]}
                      className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={`w-full px-2 py-2.5 text-center transition-colors ${isSelected ? "bg-primary/10" : "bg-muted/30"}`}>
                  <span className="font-semibold text-xs block leading-tight">{VEHICLE_LABELS[tier]}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <ErrorMsg msg={errors.vehicleType} />
      </motion.div>



      <CategoryModal open={showCategoryModal} onClose={() => setShowCategoryModal(false)} />

      {/* ─── Price Display ─── */}
      <motion.div variants={fadeUp} custom={5} className="p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/15 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">Estimated Price</span>
          <span className="text-3xl font-bold text-primary">₹{bookingData.price}</span>
        </div>
        
      </motion.div>

      {/* ─── Terms & Conditions ─── */}
      <motion.div variants={fadeUp} custom={6}>
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/30 transition-colors">
          <Checkbox
            id="terms"
            checked={bookingData.acceptedTerms}
            onCheckedChange={(checked) => {
              updateBookingData({ acceptedTerms: checked === true });
              clearError("acceptedTerms");
            }}
          />
          <Label htmlFor="terms" className="text-sm leading-snug cursor-pointer">
            I agree to the{" "}
            <Link href="/terms" className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium">
              Terms and Conditions
            </Link>{" "}
            as set out by the user agreement.{" "}
            <span className="text-destructive">*</span>
            <p className="text-xs text-muted-foreground leading-snug">
          Luxury vehicles may be charged an additional ₹100 for enhanced care and precision cleaning.
        </p>
          </Label>
        </div>
        <ErrorMsg msg={errors.acceptedTerms} />
      </motion.div>

      {/* ─── Submit ─── */}
      <motion.div variants={fadeUp} custom={7}>
        <Button
          type="submit"
          disabled={!bookingData.acceptedTerms}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-base gap-2.5 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
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
          Book via WhatsApp
        </Button>
      </motion.div>
    </motion.form>
  );
}
