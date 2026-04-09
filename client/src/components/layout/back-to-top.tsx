import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-110 hover:shadow-primary/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        visible ? "opacity-70 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={3.5} />
    </button>
  );
}
