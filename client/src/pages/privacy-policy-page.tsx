import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const LAST_UPDATED = "April 2026";

const SECTIONS = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-collect", title: "2. How We Collect Information" },
  { id: "purpose", title: "3. Purpose of Data Collection" },
  { id: "payment", title: "4. Payment Information" },
  { id: "media-usage", title: "5. Vehicle Photos & Media" },
  { id: "information-sharing", title: "6. Information Sharing" },
  { id: "data-security", title: "7. Data Security" },
  { id: "customer-responsibility", title: "8. Customer Responsibility" },
  { id: "third-party", title: "9. Third-Party Platforms" },
  { id: "cookies", title: "10. Cookies & Website Usage" },
  { id: "data-retention", title: "11. Data Retention" },
  { id: "policy-updates", title: "12. Policy Updates" },
  { id: "consent", title: "13. Consent" },
  { id: "contact-us", title: "14. Contact Us" },
];

// ─── Table of Contents ───────────────────────────────────────────────────────
function TableOfContents({ activeId, mobile }: { activeId: string; mobile?: boolean }) {
  return (
    <nav aria-label="Privacy policy table of contents">
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

// ─── Section Component ────────────────────────────────────────────────────────
function PolicySection({
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
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="space-y-3 text-foreground/85 leading-relaxed text-[15px]">
        {children}
      </div>
      {highlight && (
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/15 text-foreground/90 text-sm font-medium">
          {highlight}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
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
        <title>Privacy Policy - GaadiGlow Doorstep Car Cleaning Service</title>
        <meta
          name="description"
          content="Read GaadiGlow's privacy policy for our doorstep car cleaning service. Learn how we collect, use, and protect your personal information."
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
            <span className="text-sm text-muted-foreground">Privacy Policy</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          {/* Page header */}
          <div className="mb-10 max-w-3xl">
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: <strong>{LAST_UPDATED}</strong>
            </p>
            <p className="mt-4 text-foreground/80 text-[15px] leading-relaxed">
              GaadiGlow ("we", "our", "us") respects your privacy and is committed to protecting the
              personal information you share with us. By using our website, booking services, or
              interacting with us, you agree to the terms of this Privacy Policy.
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

              <PolicySection id="information-we-collect" title="1. Information We Collect">
                <p>
                  When you use our website booking form or contact us, we may collect the following
                  information:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Personal Information</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Full Name</li>
                      <li>Mobile Number</li>
                      <li>Address (including flat/house number, area, landmark)</li>
                      <li>Service location details</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Booking Information</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Selected service type</li>
                      <li>Preferred service date and time</li>
                      <li>Special instructions (if provided)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Service Data</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Vehicle details (if shared)</li>
                      <li>Before/after photos or videos (for documentation and quality purposes)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Communication Data</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Messages, calls, or chats via WhatsApp, phone, or social media</li>
                    </ul>
                  </div>
                </div>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="how-we-collect" title="2. How We Collect Information">
                <p>We collect your data through:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Website booking forms</li>
                  <li>WhatsApp, phone calls, or social media interactions</li>
                  <li>Direct communication with our team</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="purpose" title="3. Purpose of Data Collection">
                <p>Your information is used for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Booking confirmation and service scheduling</li>
                  <li>Providing doorstep car cleaning services</li>
                  <li>Customer support and communication</li>
                  <li>Service quality monitoring and staff training</li>
                  <li>Internal record keeping</li>
                  <li>Marketing and promotional communication (without revealing identity)</li>
                  <li>Legal compliance</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection
                id="payment"
                title="4. Payment Information"
                highlight={
                  <>
                    ✅ GaadiGlow does <strong>NOT</strong> collect online payments through the
                    website. We do not store any bank details, card details, or payment credentials.
                  </>
                }
              >
                <ul className="list-disc pl-5 space-y-1">
                  <li>All payments are collected after service completion, directly from the customer.</li>
                  <li>We do not store any bank details, card details, or payment credentials on our website.</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="media-usage" title="5. Vehicle Photos & Media Usage">
                <p>We may capture photos/videos during service for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Quality control</li>
                  <li>Staff training</li>
                  <li>Marketing purposes</li>
                </ul>
                <p>We ensure:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No customer face is shown</li>
                  <li>No personal identity is revealed</li>
                  <li>Vehicle number plates are hidden or blurred unless consent is given</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="information-sharing" title="6. Information Sharing">
                <p>
                  We do <strong>NOT</strong> sell, rent, or trade your personal data.
                </p>
                <p>Your data may only be shared:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>With internal staff for service execution</li>
                  <li>If required by law, government authorities, or legal process</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="data-security" title="7. Data Security">
                <p>
                  We take reasonable steps to protect your information from unauthorized access,
                  misuse, or disclosure.
                </p>
                <p>However:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No method of electronic storage or transmission is 100% secure</li>
                  <li>By using our website, you acknowledge this risk</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="customer-responsibility" title="8. Customer Responsibility">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Customers must ensure accurate information while booking</li>
                  <li>
                    Customers are advised to remove personal belongings from the vehicle before
                    service
                  </li>
                  <li>
                    GaadiGlow is not responsible for any loss or damage to items left inside the
                    vehicle
                  </li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="third-party" title="9. Third-Party Platforms">
                <p>If you book services via WhatsApp, phone calls, or social media platforms, those platforms may also process your data according to their own privacy policies.</p>
                <p>GaadiGlow is not responsible for third-party data handling.</p>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="cookies" title="10. Cookies & Website Usage">
                <p>Our website may use basic cookies or tracking tools to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Improve user experience</li>
                  <li>Analyze website traffic</li>
                </ul>
                <p>You can disable cookies through your browser settings.</p>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="data-retention" title="11. Data Retention">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Your data is stored only as long as necessary for service and legal purposes
                  </li>
                  <li>After that, it may be deleted or anonymized</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="policy-updates" title="12. Policy Updates">
                <p>
                  GaadiGlow reserves the right to update or modify this Privacy Policy at any time.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Changes will be updated on this page</li>
                  <li>
                    Continued use of our website means you accept the updated policy
                  </li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="consent" title="13. Consent">
                <p>By using our website and booking services, you:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Agree to this Privacy Policy</li>
                  <li>Consent to the collection and use of your data as described</li>
                </ul>
              </PolicySection>

              <div className="h-px bg-border" />

              <PolicySection id="contact-us" title="14. Contact Us">
                <p>
                  For any questions or concerns regarding this Privacy Policy, you can contact us:
                </p>
                <div className="mt-3 p-4 rounded-xl bg-muted border border-border space-y-2 text-sm">
                  <p className="font-semibold text-foreground">GaadiGlow Services</p>
                  <p>
                    📞{" "}
                    <a
                      href="tel:7800800122"
                      className="text-primary underline underline-offset-2 font-medium"
                    >
                      7800 800 122
                    </a>
                  </p>
                  <p>
                    📧{" "}
                    <a
                      href="mailto:support@gaadiglow.com"
                      className="text-primary underline underline-offset-2 font-medium"
                    >
                      support@gaadiglow.com
                    </a>
                  </p>
                </div>
              </PolicySection>

              {/* Related links */}
              <div className="p-5 rounded-2xl bg-muted/50 border border-border text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>Also read our</span>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 text-primary font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Terms &amp; Conditions →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
