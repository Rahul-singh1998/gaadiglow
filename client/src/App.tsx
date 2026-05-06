import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
const HomePage = lazy(() => import("@/pages/home-page"));
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFAB from "@/components/layout/back-to-top";

const NotFound = lazy(() => import("@/pages/not-found"));
const TermsPage = lazy(() => import("@/pages/terms-page"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy-page"));
const BookingPage = lazy(() => import("@/pages/booking-page"));

/**
 * ScrollToTop: Resets page scroll position to top on route navigation.
 * Uses useLayoutEffect to scroll BEFORE paint, preventing visible jumps.
 * Ensures instant scroll with no animation.
 */
function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100vh] w-full bg-background" />
      }
    >
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Disable browser native scroll restoration to prevent jumps on route change
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Defensive initial scroll reset on app mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
        <WhatsAppFAB />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
