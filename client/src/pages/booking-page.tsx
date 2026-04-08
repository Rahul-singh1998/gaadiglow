import { Helmet } from "react-helmet";
import BookingForm from "@/components/booking/booking-form";
import { useState } from "react";

export type BookingFormData = {
  phone: string;
  service: string;
  vehicleType: string;
  vehicleModel: string;
  location: string;
  date: string;
  time: string;
  price: number;
  acceptedTerms: boolean;
};

export default function BookingPage() {
  const [bookingData, setBookingData] = useState<BookingFormData>({
    phone: "",
    service: "Basic Wash",
    vehicleType: "",
    vehicleModel: "",
    location: "",
    date: "",
    time: "",
    price: 399,
    acceptedTerms: false,
  });

  const updateBookingData = (data: Partial<BookingFormData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <>
      <Helmet>
        <title>Book Car Wash at Home - Doorstep Car Cleaning Delhi | GaadiGlow</title>
        <meta name="description" content="Book doorstep car cleaning in Delhi NCR with GaadiGlow. Fabric & leather seat care, interior cleaning & 3M wax polish at your home or office. Quick WhatsApp booking." />
        <meta name="keywords" content="doorstep car cleaning Delhi, car wash at home Delhi, interior car cleaning Delhi, book car wash online, mobile car wash Delhi NCR, fabric leather seat cleaning, basic wash, standard wash, 3M wax polish" />
        <meta property="og:title" content="Book Car Wash at Home - Doorstep Car Cleaning Delhi | GaadiGlow" />
        <meta property="og:description" content="Book doorstep car cleaning in Delhi NCR. Fabric & leather seat care, foam wash & 3M wax polish at your home or office. Book in 60 seconds via WhatsApp." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gaadiglow.com/booking" />
        <meta property="og:image" content="https://res.cloudinary.com/daeobjgd0/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1765862042/main1_pnywak.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Car Wash at Home - GaadiGlow" />
        <meta name="twitter:description" content="Doorstep car cleaning in Delhi NCR. Book via WhatsApp in 60 seconds!" />
        <meta name="twitter:image" content="https://res.cloudinary.com/daeobjgd0/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1765862042/main1_pnywak.png" />
      </Helmet>

      <main className="relative min-h-screen">
        {/* Soft gradient background + blurred blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-white/0 blur-3xl opacity-70" />
          <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-white/0 blur-2xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-gradient-to-br from-accent/20 via-blue-100/30 to-white/0 blur-2xl opacity-50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-10 md:pt-16 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="text-center mb-10">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-widest">
                Book in 60 Seconds
              </span>
              <h1 className="font-bold text-3xl md:text-5xl mb-4 leading-tight text-foreground">
                Booking Form
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-[15px] leading-relaxed">
                Need a special car cleaning service? We are happy to fulfil every request to exceed your expectations.
              </p>
            </header>

            {/* Form Card */}
            <div className="bg-white/70 dark:bg-card/80 backdrop-blur-2xl border border-white/40 dark:border-border/40 p-6 md:p-12 rounded-[2.2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.12),0_1.5px_8px_0_rgba(80,120,255,0.08)] hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.18),0_2px_12px_0_rgba(80,120,255,0.12)] transition-all duration-500 ring-1 ring-primary/10 ring-inset hover:ring-2 hover:ring-primary/20 group">
              <BookingForm
                bookingData={bookingData}
                updateBookingData={updateBookingData}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}