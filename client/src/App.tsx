import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import HomePage from "@/pages/home-page";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/layout/back-to-top";

const NotFound = lazy(() => import("@/pages/not-found"));
const TermsPage = lazy(() => import("@/pages/terms-page"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy-page"));
const BookingPage = lazy(() => import("@/pages/booking-page"));

function Router() {
  return (
    <Suspense fallback={<div className="flex-grow" />}>
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
        <BackToTop />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
