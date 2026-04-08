import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const LAST_UPDATED = "April 2026";

const SECTIONS = [
  { id: "booking-service", title: "1. Booking & Service Details" },
  { id: "scope-of-service", title: "2. Scope of Service" },
  { id: "customer-responsibility", title: "3. Customer Responsibility" },
  { id: "service-quality", title: "4. Service Quality & Rework" },
  { id: "payment-terms", title: "5. Payment Terms" },
  { id: "delayed-payment", title: "6. Delayed Payment Policy" },
  { id: "cancellation", title: "7. Cancellation & Rescheduling" },
  { id: "service-limitations", title: "8. Service Limitations" },
  { id: "right-to-refuse", title: "9. Right to Refuse Service" },
  { id: "data-privacy", title: "10. Data & Privacy" },
  { id: "changes-to-terms", title: "11. Changes to Terms" },
];

// ─── Table of Contents ──────────────────────────────────────────────────────
function TableOfContents({ activeId, mobile }: { activeId: string; mobile?: boolean }) {
  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Contents
      </p>
      <ul className={`space-y-1 ${mobile ? "grid grid-cols-2 gap-1 space-y-0" : ""}`}>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-sm py-1 px-2 rounded-lg transition-all duration-200 leading-snug ${
                activeId === s.id
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Section Component ───────────────────────────────────────────────────────
function TermsSection({
  id,
  title,
  children,
  highlight,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  highlight?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        {title}
      </h2>
      <div className="space-y-3 text-foreground/85 leading-relaxed text-[15px]">
        {children}
      </div>
      {highlight && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-sm font-medium">
          {highlight}
        </div>
      )}
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - GaadiGlow Doorstep Car Cleaning Service</title>
        <meta
          name="description"
          content="Read GaadiGlow's terms and conditions for doorstep car wash policy, payment terms, cancellation, service quality guarantee, and customer responsibilities."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 px-4 md:px-8">
          <div className="max-w-6xl mx-auto py-3 flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <span className="text-border">|</span>
            <span className="text-sm text-muted-foreground">Terms & Conditions</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          {/* Page header */}
          <div className="mb-10 max-w-3xl">
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: <strong>{LAST_UPDATED}</strong>
            </p>
            <p className="mt-4 text-foreground/80 text-[15px] leading-relaxed">
              By submitting a booking with GaadiGlow — via our website, WhatsApp, or any other channel —
              you agree to the following terms. Please read carefully before placing a booking.
            </p>
          </div>

          {/* Mobile TOC toggle */}
          <div className="lg:hidden mb-6 border border-border rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/40 text-sm font-semibold"
              onClick={() => setTocOpen((v) => !v)}
            >
              <span>Table of Contents</span>
              {tocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {tocOpen && (
              <div className="px-4 py-3 bg-background">
                <TableOfContents activeId={activeId} mobile />
              </div>
            )}
          </div>

          <div className="flex gap-10 items-start">
            {/* Sticky desktop TOC */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20 self-start">
              <div className="bg-muted/30 border border-border rounded-2xl p-5">
                <TableOfContents activeId={activeId} />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 space-y-10">

              <TermsSection id="booking-service" title="1. Booking & Service Details">
                <p>By submitting a booking through our website, you agree to provide accurate details including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full name and 10-digit mobile number</li>
                  <li>Service location (address or GPS link)</li>
                  <li>Vehicle type and desired service package</li>
                </ul>
                <p>
                  GaadiGlow reserves the right to accept, reschedule, or cancel bookings based on availability
                  and operational conditions. You will be notified via WhatsApp in any such case.
                </p>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="scope-of-service" title="2. Scope of Service">
                <p>Services will be delivered as per the selected package.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Any additional requests or add-ons not included in the selected package may be chargeable.</li>
                  <li>Customers are advised to clearly communicate any specific requirements at the time of booking.</li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="customer-responsibility" title="3. Customer Responsibility Before Service">
                <p>Before the service begins, customers must:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure the vehicle is accessible at the scheduled time and location</li>
                  <li>Remove all valuable and personal belongings from inside the vehicle</li>
                </ul>
                <p>
                  GaadiGlow will not be responsible for any loss or damage to items left inside the vehicle
                  during service.
                </p>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="service-quality" title="4. Service Quality & Rework Policy">
                <p>Our goal is to deliver high-quality service every time.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>If you are not satisfied, report the issue <strong>immediately at the time of service completion</strong> — before making payment.</li>
                  <li>We may offer a re-service or correction visit at our discretion.</li>
                  <li>In some cases, GaadiGlow may choose not to charge if the service is deemed unsatisfactory.</li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection
                id="payment-terms"
                title="5. Payment Terms"
                highlight={
                  <>
                    ⚠️ <strong>Important:</strong> Once payment is made, it will be considered as final acceptance
                    of the service. No claims or disputes regarding service quality, damage, or missing items
                    will be entertained after payment is completed.
                  </>
                }
              >
                <ul className="list-disc pl-5 space-y-1">
                  <li>No advance payment is required.</li>
                  <li>Payment must be made <strong>only after</strong> the service is completed.</li>
                  <li>By making payment, the customer confirms:
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>The service was completed satisfactorily</li>
                      <li>No damage (including scratches) has occurred</li>
                      <li>No belongings are missing from the vehicle</li>
                    </ul>
                  </li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection
                id="delayed-payment"
                title="6. Delayed Payment Policy"
                highlight={
                  <>
                    ⚠️ Failure to clear dues may result in <strong>suspension of future services</strong> and
                    permanent restriction from booking GaadiGlow services.
                  </>
                }
              >
                <p>Customers are expected to complete payment immediately after service.</p>
                <p><strong>In case of delay:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>GaadiGlow reserves the right to send reminders via call or message.</li>
                  <li>Payment must be cleared within <strong>48 hours (2 days)</strong> of service completion.</li>
                </ul>
                <p><strong>If the customer delays or avoids payment:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>GaadiGlow reserves the right to charge additional fees or penalties for the delay.</li>
                  <li>GaadiGlow may initiate appropriate legal action to recover the pending amount.</li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="cancellation" title="7. Cancellation & Rescheduling">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Customers may cancel or reschedule a booking by informing us in advance via WhatsApp or call.</li>
                  <li>Last-minute cancellations or unavailability at the location may affect future booking priority.</li>
                  <li>GaadiGlow may reschedule due to unforeseen circumstances (weather, equipment, etc.) and will notify you promptly.</li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="service-limitations" title="8. Service Limitations">
                <p>While utmost care is taken, GaadiGlow is not liable for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pre-existing damage (scratches, dents, paint defects, cracked glass)</li>
                  <li>Normal wear and tear due to regular use</li>
                  <li>Stains, marks, or odors that may not be fully removable depending on vehicle condition</li>
                </ul>
                <p>
                  Customers are advised to inform our team of any known vehicle issues before service begins.
                </p>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="right-to-refuse" title="9. Right to Refuse Service">
                <p>GaadiGlow reserves the right to refuse or discontinue service if:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The working environment is deemed unsafe for our team</li>
                  <li>Misbehavior, threats, or unreasonable demands are made by the customer</li>
                  <li>The vehicle's condition poses a safety or logistics concern</li>
                </ul>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="data-privacy" title="10. Data & Privacy">
                <p>Customer details collected through the booking form are used <strong>only for</strong>:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Service fulfillment and scheduling</li>
                  <li>Communication regarding bookings and follow-ups</li>
                </ul>
                <p>We do not sell, share, or misuse customer data for any third-party marketing.</p>
              </TermsSection>

              <div className="h-px bg-border" />

              <TermsSection id="changes-to-terms" title="11. Changes to Terms">
                <p>
                  GaadiGlow reserves the right to modify these Terms &amp; Conditions at any time without
                  prior notice. The "Last Updated" date at the top reflects the most recent revision.
                  Continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </TermsSection>

              {/* Important note */}
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-bold text-foreground mb-2">📋 Important Note to Customers</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                  <li>Please <strong>inspect your vehicle carefully</strong> before making the payment.</li>
                  <li>Once payment is completed, it confirms <strong>full satisfaction</strong> with the service.</li>
                  <li>Raise any concerns <strong>before payment</strong> for them to be addressed.</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="p-5 rounded-2xl bg-muted border border-border text-sm text-muted-foreground">
                Questions about these terms?{" "}
                <a
                  href="https://wa.me/917800800122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  Contact us on WhatsApp
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:gaadiglow@gmail.com"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  gaadiglow@gmail.com
                </a>
                .
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}


