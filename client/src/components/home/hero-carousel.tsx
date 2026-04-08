import { useState, useEffect, useRef } from "react";

const CDN = "https://res.cloudinary.com/dt5lgnfub/image/upload";

/**
 * Returns a Cloudinary URL for mobile viewports: portrait 3:4 crop.
 * Pass a specific Cloudinary gravity so the key subject stays in frame.
 * - g_face  → centres crop on detected faces (workers, technicians)
 * - g_auto  → AI subject detection (good for vehicle/scene shots)
 * - g_center → predictable centre crop (fallback)
 */
function toMobileSrc(publicId: string, gravity = "g_face"): string {
  return `${CDN}/f_auto,q_auto,w_700,ar_3:4,c_fill,${gravity}/${publicId}`;
}

/** Desktop: full-width 16:9, capped at 1400 px to avoid oversized downloads. */
function toDesktopSrc(publicId: string): string {
  return `${CDN}/f_auto,q_auto,w_1400,ar_16:9,c_fill/${publicId}`;
}

const SLIDES = [
  {
    id: "car-cleaning-india-gate-delhi",
    alt: "Doorstep car cleaning service near India Gate Delhi",
    // Workers visible on the right — face gravity crops onto them, not van branding
    mobileGravity: "g_face",
  },
  {
    id: "car-cleaning-professional-at-work",
    alt: "Professional car cleaning expert providing doorstep service in Delhi",
    mobileGravity: "g_face",
  },
  {
    id: "hero-2-car-cleaning-sunset-delhi",
    alt: "Evening car cleaning service in Delhi with doorstep convenience",
    // Scene/environment shot — AI subject detection is more suitable
    mobileGravity: "g_auto",
  },
  {
    id: "Professional_detailers_cleaning_white_sedan",
    alt: "Premium car detailing and cleaning service for sedan in Delhi",
    mobileGravity: "g_face",
  },
];

const N = SLIDES.length;
const DRAG_THRESHOLD = 50;
const INTERVAL_MS = 4000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);

  function restart() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent((p) => (p + 1) % N), INTERVAL_MS);
  }

  function goTo(index: number) {
    setCurrent(((index % N) + N) % N);
    restart();
  }

  useEffect(() => {
    restart();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (isDragging.current) dragDeltaX.current = e.clientX - dragStartX.current;
  }
  function onMouseUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const d = dragDeltaX.current;
    dragDeltaX.current = 0;
    if (d < -DRAG_THRESHOLD) goTo(current + 1);
    else if (d > DRAG_THRESHOLD) goTo(current - 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    dragStartX.current = e.touches[0].clientX;
    dragDeltaX.current = 0;
  }
  function onTouchMove(e: React.TouchEvent) {
    dragDeltaX.current = e.touches[0].clientX - dragStartX.current;
  }
  function onTouchEnd() {
    const d = dragDeltaX.current;
    dragDeltaX.current = 0;
    if (d < -DRAG_THRESHOLD) goTo(current + 1);
    else if (d > DRAG_THRESHOLD) goTo(current - 1);
  }

  return (
    <>
      {/* Slide track — fills parent absolutely */}
      <div
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ width: `${N * 100}%`, transform: `translateX(-${current * (100 / N)}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <picture
              key={i}
              className="flex-shrink-0 h-full block"
              style={{ width: `${100 / N}%` }}
            >
              {/* Mobile: portrait 3:4 crop, per-slide gravity keeps subject in frame */}
              <source
                media="(max-width: 767px)"
                srcSet={toMobileSrc(slide.id, slide.mobileGravity)}
              />
              {/* Desktop: standard 16:9 crop */}
              <img
                src={toDesktopSrc(slide.id)}
                alt={slide.alt}
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                className="w-full h-full object-cover"
              />
            </picture>
          ))}
        </div>
      </div>

      {/* Navigation dots — bottom-center, z-20 above all overlays */}
      <div
        className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2.5"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              i === current
                ? "w-7 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}
