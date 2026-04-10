
import { useState, useEffect } from "react";
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
import { MapPin, Loader2, User, Calendar, Sparkles, ExternalLink, AlertCircle } from "lucide-react";
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

/**
 * Returns true when a slot should be disabled.
 * Logic: only applies when bookingDate === today.
 * We parse the slot's START hour so the slot is disabled as soon as it begins.
 */
function isPastSlot(slot: string, bookingDate: string): boolean {
  if (!bookingDate) return false;
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
  if (bookingDate !== todayStr) return false;

  // Parse start time, e.g. "06:00 AM" from "06:00 AM - 08:00 AM"
  const startPart = slot.split(" - ")[0].trim(); // "06:00 AM"
  const [timePart, meridiem] = startPart.split(" ");
  const [hStr, mStr] = timePart.split(":");
  let hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const slotStart = new Date(now);
  slotStart.setHours(hours, minutes, 0, 0);
  return now >= slotStart;
}



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
  "h-10 w-full max-w-full box-border rounded-lg bg-background border border-border/60 px-3.5 text-sm transition-all duration-150 placeholder:text-muted-foreground/40 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

const dateInputBase =
  "h-10 w-full max-w-full box-border block rounded-lg bg-background border border-border/60 px-3.5 text-sm transition-all duration-150 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary [appearance:textfield] [&::-webkit-date-and-time-value]:text-left";

const sectionLabel =
  "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3";

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

  // Use local date parts to avoid UTC offset shifting the day backward (e.g. IST = UTC+5:30)
  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = formatDate(today);

  // Auto-select today's date on first render if none is set
  useEffect(() => {
    if (!bookingData.date) {
      updateBookingData({ date: minDate });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
      className="space-y-0"
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
          // address is optional — no error
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
      {/* ══ SECTION: Personal Info ══ */}
      <motion.div variants={fadeUp} custom={0} className="pt-2 pb-6 border-b border-border/30">
        <p className={sectionLabel}><User className="h-3 w-3 text-primary" /> Personal Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicle-model" className="text-sm font-medium text-foreground/80">Your Name</Label>
            <Input
              id="vehicle-model"
              placeholder="e.g. Rahul Sharma"
              autoFocus
              className={inputBase}
              value={bookingData.vehicleModel}
              onChange={(e) => updateBookingData({ vehicleModel: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground/80">Phone Number <span className="text-destructive">*</span></Label>
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
        </div>
      </motion.div>

      {/* ══ SECTION: Location ══ */}
      <motion.div variants={fadeUp} custom={1} className="py-6 border-b border-border/30 space-y-4">
        <p className={sectionLabel}><MapPin className="h-3 w-3 text-primary" /> Location</p>

        {/* GPS */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground/80">Current Location <span className="text-muted-foreground font-normal text-xs">(via GPS)</span></Label>
          <div className="flex flex-col gap-2">
            <Input
              readOnly
              value={locationUrl}
              placeholder={locationUrl ? locationUrl : "Tap \"Share Location\" to skip the hassle."}
              className={`${inputBase} ${locationUrl ? "text-primary font-medium" : ""}`}
            />
            <Button
              type="button"
              onClick={handleShareLocation}
              disabled={locating}
              variant="outline"
              className="w-full h-9 rounded-lg border-primary/40 text-primary hover:bg-primary/5 font-medium text-sm gap-2"
            >
              {locating ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
              {locating ? "Fetching location…" : "Share Location"}
            </Button>
          </div>
          {locationUrl && (
            <a href={locationUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <ExternalLink className="h-3 w-3" /> View on Maps
            </a>
          )}
          {errors.locationUrl && <ErrorMsg msg={errors.locationUrl} />}
        </div>

        {/* Manual address */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground/80">
            Door / Flat No &amp; Building Name
            {/* <span className="ml-1.5 text-xs font-normal text-muted-foreground">(Optional)</span> */}
          </Label>
          <Input
            value={manualAddress}
            onChange={e => { setManualAddress(e.target.value); clearError("manualAddress"); }}
            placeholder="e.g. Flat 4B, Sunrise Apartments"
            className={`${inputBase} ${errors.manualAddress ? "!border-destructive ring-1 ring-destructive/30" : ""}`}
          />
          {errors.manualAddress && <ErrorMsg msg={errors.manualAddress} />}
        </div>
      </motion.div>

      {/* ══ SECTION: Booking Schedule ══ */}
      <motion.div variants={fadeUp} custom={2} className="py-6 border-b border-border/30 space-y-5">
        <p className={sectionLabel}><Calendar className="h-3 w-3 text-primary" /> Schedule</p>

        {/* Date */}
        <div className="space-y-1.5">
          <Label htmlFor="date" className="text-sm font-medium text-foreground/80">Booking Date <span className="text-destructive">*</span></Label>
          <Input
            id="date"
            type="date"
            min={minDate}
            max={maxDate}
            className={`${dateInputBase} ${errors.date ? "!border-destructive ring-1 ring-destructive/30" : ""}`}
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
          <p className="text-xs text-muted-foreground">Book up to 30 days in advance</p>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground/80">Available Time Slot <span className="text-destructive">*</span></Label>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select a time slot">
            {TIME_SLOTS.map((slot) => {
              const isSelected = bookingData.time === slot;
              const isDisabled = isPastSlot(slot, bookingData.date);
              return (
                <motion.label
                  key={slot}
                  whileHover={isDisabled ? {} : { scale: 1.02 }}
                  whileTap={isDisabled ? {} : { scale: 0.98 }}
                  className={`relative flex items-center justify-center rounded-lg px-2 py-3 text-center text-xs font-medium transition-all duration-150 border select-none ${
                    isDisabled
                      ? "cursor-not-allowed opacity-30 border-border/20 bg-muted/20 text-muted-foreground/50 line-through"
                      : isSelected
                      ? "cursor-pointer border-primary bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                      : errors.time
                      ? "cursor-pointer border-destructive/50 bg-background text-foreground font-semibold shadow-sm hover:border-primary hover:bg-primary/5"
                      : "cursor-pointer border-border bg-background text-foreground font-semibold shadow-sm hover:border-primary hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="time-slot"
                    value={slot}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => {
                      if (isDisabled) return;
                      updateBookingData({ time: slot });
                      clearError("time");
                    }}
                    className="sr-only"
                    aria-label={slot}
                  />
                  {isSelected && !isDisabled && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
        </div>
      </motion.div>

      {/* ══ SECTION: Service & Vehicle ══ */}
      <motion.div variants={fadeUp} custom={3} className="py-6 border-b border-border/30 space-y-5">
        <p className={sectionLabel}><Sparkles className="h-3 w-3 text-primary" /> Service &amp; Vehicle</p>
        <div>
          <Label className="text-sm font-medium text-foreground/80 mb-2 block">Choose Package <span className="text-destructive">*</span></Label>
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
        </div>

        {/* Seat Type (conditional) */}
        {bookingData.service === "Fabric / Leather Care" && (
          <motion.div variants={fadeUp} custom={3.5} initial="hidden" animate="visible">
            <Label className="text-sm font-medium text-foreground/80 mb-2 block">Seat Type <span className="text-destructive">*</span></Label>
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

        {/* Car Type */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-foreground/80">Car Type <span className="text-destructive">*</span></Label>
            <button
              type="button"
              className="text-xs text-primary/80 underline underline-offset-2 hover:text-primary font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              onClick={() => setShowCategoryModal(true)}
            >
              Not sure? Find out →
            </button>
          </div>
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
        </div>
      </motion.div>

      <CategoryModal open={showCategoryModal} onClose={() => setShowCategoryModal(false)} />

      {/* ══ SECTION: Summary ══ */}
      <motion.div variants={fadeUp} custom={5} className="pt-6 space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/15">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Estimated Price</span>
            <span className="text-3xl font-bold text-primary">₹{bookingData.price}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-muted/20">
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
            as set out by the user agreement. <span className="text-destructive">*</span>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5">
              Luxury vehicles may be charged an additional ₹100 for enhanced care.
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
