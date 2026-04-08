# GaadiGlow Website – Modernization Implementation Roadmap
> **For use with GitHub Copilot · Production-Grade · Implementation-Ready**
> Stack: React + Vite · Tailwind CSS · Node.js/Express (optional backend) · Vercel/Netlify

---

## Table of Contents

1. [📌 Executive Overview](#1--executive-overview)
2. [🏗️ System Architecture Design](#2-️-system-architecture-design)
3. [🔧 Feature-by-Feature Implementation Plan](#3--feature-by-feature-implementation-plan)
4. [⚙️ Tech Stack Recommendations](#4-️-tech-stack-recommendations)
5. [🔄 Migration Strategy](#5--migration-strategy)
6. [🚀 Performance Optimization Plan](#6--performance-optimization-plan)
7. [🔐 Security Enhancements](#7--security-enhancements)
8. [🧪 Testing Strategy](#8--testing-strategy)
9. [📦 Deployment & DevOps](#9--deployment--devops)
10. [🧭 Developer Workflow & Sprint Plan](#10--developer-workflow--sprint-plan)

---

## 1. 📌 Executive Overview

### What the Modernization Aims to Achieve

GaadiGlow is a doorstep car wash service operating in Delhi. The current website is a static, visually understated page with minimal interactivity, no booking prominence, no social proof, and no motion/animation. The modernization initiative transforms this into a **conversion-optimized, visually premium, and fully accessible** web experience on par with leading car-wash service platforms globally.

The goal is not a simple visual refresh — it is a **full UI/UX and front-end architectural overhaul** that positions GaadiGlow as a credible, trustworthy, and engaging brand in the Delhi market.

### Key Architectural Shifts

| Dimension | Current State | Target State |
|---|---|---|
| Visual Design | Static, monochrome, no motion | Vibrant, animated, neumorphic/modern |
| Hero Section | Static image + basic CTA | Full-width media + inline booking CTA |
| Header | Static, non-sticky | Sticky with scroll-aware transparency |
| Form UX | Plain HTML inputs | Floating labels, icon-inlaid, real-time validation |
| Trust Signals | None | Testimonials carousel, stats counters, trust badges |
| Interactivity | None | Scroll-triggered AOS, hover effects, dark mode |
| Accessibility | Untested | WCAG AA compliant, ARIA labels, keyboard navigable |
| Performance | Unoptimized | WebP images, lazy loading, Lighthouse 90+ score |
| Contact/Maps | Buried | Prominent footer + embedded Google Map |
| Design System | Ad hoc | CSS variables / Tailwind theme tokens |

### Expected Outcomes

- **Conversion Rate**: Higher booking form engagement due to hero-embedded CTA
- **Trust & Credibility**: Social proof section with real reviews, trust badges, animated counters
- **Performance**: First Contentful Paint (FCP) < 1.5s on mobile; Lighthouse score > 90
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Semantic HTML, proper heading hierarchy, meta tags, sitemap
- **Brand Consistency**: Unified design system with tokens for color, spacing, and typography
- **Engagement**: Scroll animations and hover effects that retain user attention

---

## 2. 🏗️ System Architecture Design

### Current Architecture (Inferred)

```
┌────────────────────────────────────────────────┐
│               Static HTML Website              │
│  - Basic HTML/CSS (likely Tailwind)            │
│  - No component structure                      │
│  - Static images (unoptimized)                 │
│  - Basic contact form (no validation)          │
│  - Hosted on shared hosting / Netlify static   │
└────────────────────────────────────────────────┘
```

### Proposed Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (Browser)                    │
│                                                                  │
│  React + Vite SPA                                                │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │
│  │  Header  │ │  Hero    │ │  Booking  │ │  Testimonials    │  │
│  │ (sticky) │ │ (media + │ │  Form     │ │  Carousel        │  │
│  │          │ │  CTA)    │ │ (floating │ │  (Swiper)        │  │
│  └──────────┘ └──────────┘ │  labels)  │ └──────────────────┘  │
│                            └───────────┘                         │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │
│  │ Services │ │  Stats   │ │  Map      │ │  Footer          │  │
│  │  Grid    │ │ Counter  │ │  (iframe) │ │  (links+social)  │  │
│  └──────────┘ └──────────┘ └───────────┘ └──────────────────┘  │
│                                                                  │
│  AOS.js (scroll animations) · Swiper (carousel)                 │
│  CSS Variables (design tokens) · Dark Mode Toggle               │
└──────────────────────────────────────────────────────────────────┘
                              │
                    HTTPS / Fetch / EmailJS
                              │
┌──────────────────────────────────────────────────────────────────┐
│                     OPTIONAL BACKEND LAYER                       │
│  Node.js + Express (if form submissions need server logic)       │
│  ┌─────────────────┐   ┌──────────────────────────────────────┐ │
│  │  /api/booking   │   │  Email Service (Nodemailer/SendGrid) │ │
│  │  POST endpoint  │──▶│  on form submit                      │ │
│  └─────────────────┘   └──────────────────────────────────────┘ │
│  OR: Use EmailJS directly from frontend (no backend needed)      │
└──────────────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────────────┐
│                     HOSTING / INFRA LAYER                        │
│  Vercel (recommended) or Netlify                                 │
│  - Automatic HTTPS                                               │
│  - CI/CD from GitHub (push-to-deploy)                            │
│  - Edge CDN for static assets                                    │
│  - Environment variables for API keys                            │
└──────────────────────────────────────────────────────────────────┘
```

### Frontend Architecture

```
src/
├── assets/
│   ├── images/          # WebP-optimized images
│   ├── videos/          # Hero background video (muted, looping)
│   └── fonts/           # Self-hosted web fonts (if any)
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── BookingForm.jsx
│   │   ├── ServicesGrid.jsx
│   │   ├── TestimonialsCarousel.jsx
│   │   ├── StatsCounter.jsx
│   │   ├── WhyUsSection.jsx
│   │   ├── MapSection.jsx
│   │   └── InstagramGallery.jsx   (optional)
│   └── ui/
│       ├── Button.jsx
│       ├── InputField.jsx
│       ├── StarRating.jsx
│       ├── TrustBadge.jsx
│       ├── BackToTop.jsx
│       └── DarkModeToggle.jsx
├── hooks/
│   ├── useScrollPosition.js
│   ├── useCounter.js
│   └── useDarkMode.js
├── styles/
│   ├── globals.css       # CSS custom properties (design tokens)
│   └── animations.css    # Keyframe animations
├── utils/
│   ├── formValidation.js
│   └── emailService.js
├── App.jsx
├── main.jsx
└── index.html
```

### Design Token System (CSS Variables)

```css
/* src/styles/globals.css */
:root {
  /* Brand Colors */
  --color-primary: #1A73E8;       /* Primary Blue */
  --color-primary-dark: #1558B0;
  --color-accent: #FF6B00;        /* Accent Orange */
  --color-accent-dark: #CC5500;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F7FA;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;

  /* Dark Mode (toggled via .dark class on <html>) */
  --color-bg-dark: #0F172A;
  --color-bg-alt-dark: #1E293B;
  --color-text-dark: #F1F5F9;

  /* Neumorphic Shadows */
  --shadow-neu-light: 6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff;
  --shadow-neu-inset: inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff;

  /* Typography */
  --font-heading: 'Syne', sans-serif;      /* Bold, modern display */
  --font-body: 'DM Sans', sans-serif;       /* Clean, readable body */

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}

html.dark {
  --color-bg: var(--color-bg-dark);
  --color-bg-alt: var(--color-bg-alt-dark);
  --color-text: var(--color-text-dark);
}
```

### Infrastructure

```
GitHub Repository
      │
      ├── main branch ──────▶ Production (Vercel / gaadiglow.com)
      ├── staging branch ───▶ Preview URL (vercel.app/...)
      └── feature/* branches ▶ Per-branch preview URLs (Vercel auto-preview)

GitHub Actions CI:
  - On PR: lint → unit tests → build check
  - On merge to main: deploy to production
```

---

## 3. 🔧 Feature-by-Feature Implementation Plan

---

### 🔹 Feature 1: Design System & Token Setup

**Description:**
Establish the foundational design language — color tokens, typography, spacing scale, and reusable component primitives. Every other feature depends on this being in place first. This prevents visual inconsistency and makes global theme changes (including dark mode) trivially easy.

**Why it matters:**
Without a design system, the site will look cobbled together. Tokens ensure every component speaks the same visual language.

**Technical Requirements:**
- Tailwind config extending default theme
- CSS custom properties in `globals.css`
- Google Fonts import for Syne + DM Sans
- Reusable Tailwind component classes

**Step-by-Step Implementation:**

1. **Setup** – Initialize project:
   ```bash
   npm create vite@latest gaadiglow-web -- --template react
   cd gaadiglow-web
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Tailwind Config** – Extend theme in `tailwind.config.js`:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     darkMode: 'class',
     content: ['./index.html', './src/**/*.{js,jsx}'],
     theme: {
       extend: {
         colors: {
           primary: { DEFAULT: '#1A73E8', dark: '#1558B0' },
           accent:  { DEFAULT: '#FF6B00', dark: '#CC5500' },
           surface: { DEFAULT: '#F5F7FA', dark: '#1E293B' },
         },
         fontFamily: {
           heading: ['Syne', 'sans-serif'],
           body:    ['DM Sans', 'sans-serif'],
         },
         borderRadius: {
           neu: '16px',
         },
         boxShadow: {
           neu: '6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff',
           'neu-inset': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
           'neu-dark': '6px 6px 12px #0a0f1a, -6px -6px 12px #1a2540',
         },
       },
     },
     plugins: [],
   }
   ```

3. **Google Fonts** – Add to `index.html`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
   ```

4. **Globals CSS** – Add the full token block (shown in Architecture section above) to `src/styles/globals.css`. Import it in `main.jsx`:
   ```js
   import './styles/globals.css'
   ```

5. **Reusable Button Component** (`src/components/ui/Button.jsx`):
   ```jsx
   export function Button({ variant = 'primary', children, className = '', ...props }) {
     const base = 'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-pill px-6 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4';
     const variants = {
       primary: 'bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-accent/40',
       outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary/40',
       ghost:   'text-primary hover:bg-primary/10 focus-visible:ring-primary/20',
     };
     return (
       <button className={`${base} ${variants[variant]} ${className}`} {...props}>
         {children}
       </button>
     );
   }
   ```

**Copilot Guidance:**
- Prompt: *"Create a Tailwind CSS design token file for a car wash brand with blue primary and orange accent, neumorphic shadow utilities, and Syne/DM Sans fonts"*
- Watch out for: Tailwind's JIT purging — make sure all dynamic class names are in source files, not constructed dynamically as string concatenation.

---

### 🔹 Feature 2: Sticky Header with Scroll Behavior

**Description:**
The header becomes sticky on scroll and transitions from transparent (over the hero) to a solid background (when scrolled). Includes navigation links, a WhatsApp/phone icon, and a persistent "Book Now" CTA button. Mobile gets a hamburger menu.

**Why it matters:**
Users expect persistent navigation. The prominent contact icon and CTA ensure conversion opportunities exist on every scroll position.

**Technical Requirements:**
- `useScrollPosition` hook to detect scroll > 0
- Conditional Tailwind classes for transparency transition
- Mobile drawer/burger menu (state-managed)
- WhatsApp deep link: `https://wa.me/91XXXXXXXXXX`

**Step-by-Step Implementation:**

1. **Scroll Hook** (`src/hooks/useScrollPosition.js`):
   ```js
   import { useState, useEffect } from 'react';
   export function useScrollPosition() {
     const [scrolled, setScrolled] = useState(false);
     useEffect(() => {
       const handler = () => setScrolled(window.scrollY > 60);
       window.addEventListener('scroll', handler, { passive: true });
       return () => window.removeEventListener('scroll', handler);
     }, []);
     return scrolled;
   }
   ```

2. **Header Component** (`src/components/layout/Header.jsx`):
   ```jsx
   import { useState } from 'react';
   import { useScrollPosition } from '../../hooks/useScrollPosition';
   import { Button } from '../ui/Button';
   import { PhoneIcon, MenuIcon, XIcon } from 'lucide-react'; // or heroicons

   const NAV_LINKS = [
     { label: 'Services', href: '#services' },
     { label: 'Pricing', href: '#pricing' },
     { label: 'About', href: '#about' },
     { label: 'Contact', href: '#contact' },
   ];

   export function Header() {
     const scrolled = useScrollPosition();
     const [menuOpen, setMenuOpen] = useState(false);

     return (
       <header
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
           scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
         }`}
         role="banner"
       >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
           {/* Logo */}
           <a href="/" aria-label="GaadiGlow Home" className="flex items-center gap-2">
             <img src="/logo.svg" alt="GaadiGlow" className="h-9 w-auto" />
           </a>

           {/* Desktop Nav */}
           <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
             {NAV_LINKS.map(link => (
               <a
                 key={link.href}
                 href={link.href}
                 className="font-body text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 relative group"
               >
                 {link.label}
                 <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
               </a>
             ))}
           </nav>

           {/* Action Icons */}
           <div className="flex items-center gap-3">
             <a
               href="https://wa.me/91XXXXXXXXXX"
               aria-label="Chat on WhatsApp"
               className="hidden sm:flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors"
               target="_blank"
               rel="noopener noreferrer"
             >
               {/* WhatsApp SVG icon */}
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
               </svg>
               <span className="text-sm font-medium">WhatsApp</span>
             </a>
             <Button variant="primary" className="hidden md:inline-flex text-sm py-2.5 px-5">
               Book Now
             </Button>
             {/* Mobile burger */}
             <button
               className="md:hidden p-2 rounded-md text-gray-700"
               onClick={() => setMenuOpen(!menuOpen)}
               aria-label={menuOpen ? 'Close menu' : 'Open menu'}
               aria-expanded={menuOpen}
               aria-controls="mobile-menu"
             >
               {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
             </button>
           </div>
         </div>

         {/* Mobile Menu Drawer */}
         {menuOpen && (
           <div
             id="mobile-menu"
             className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4"
           >
             {NAV_LINKS.map(link => (
               <a
                 key={link.href}
                 href={link.href}
                 className="font-body text-base font-medium text-gray-700 py-2"
                 onClick={() => setMenuOpen(false)}
               >
                 {link.label}
               </a>
             ))}
             <Button variant="primary" className="mt-2">Book Now</Button>
           </div>
         )}
       </header>
     );
   }
   ```

3. **Testing**: Tab through nav links, check focus ring visibility; test on 375px viewport.

**Copilot Guidance:**
- Prompt: *"React sticky header that transitions from transparent to white/blur on scroll, with a mobile hamburger drawer, WhatsApp link, and a Book Now CTA button using Tailwind CSS"*
- Watch out for: `z-index` conflicts with modals or carousels; ensure header `z-50` is the highest on the page unless a modal is open.

---

### 🔹 Feature 3: Hero Section (Full-Width Media + CTA)

**Description:**
The hero is the first thing users see. It should feature a full-width, high-quality background (looping muted video OR a large hero image with a subtle Ken Burns zoom effect), an overlay for text readability, a bold headline, a supporting tagline, and a prominent CTA — either a direct "Book Now" button that scrolls to the form, or an inline mini-booking widget (name + phone + service picker).

**Why it matters:**
Industry leaders (GoWashMyCar, Club Car Wash) all front-load their booking form in the hero. This is the highest-converting page real estate.

**Technical Requirements:**
- `<video>` element with `autoPlay muted loop playsInline` for video background
- `<img>` fallback with `object-fit: cover`
- Fade-up entrance animation on text + CTA (CSS keyframes or AOS.js)
- Inline mini-booking form (optional — fields for Name, Phone, Service)

**Step-by-Step Implementation:**

1. **Install AOS** for scroll/entrance animations:
   ```bash
   npm install aos
   ```
   Initialize in `App.jsx`:
   ```js
   import AOS from 'aos';
   import 'aos/dist/aos.css';
   useEffect(() => { AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' }); }, []);
   ```

2. **Hero Component** (`src/components/sections/HeroSection.jsx`):
   ```jsx
   import { Button } from '../ui/Button';

   export function HeroSection() {
     return (
       <section
         className="relative min-h-screen flex items-center justify-center overflow-hidden"
         aria-label="GaadiGlow Hero"
       >
         {/* Video Background */}
         <video
           className="absolute inset-0 w-full h-full object-cover"
           autoPlay
           muted
           loop
           playsInline
           poster="/assets/images/hero-poster.webp"
           aria-hidden="true"
         >
           <source src="/assets/videos/hero-carwash.mp4" type="video/mp4" />
         </video>

         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" aria-hidden="true" />

         {/* Content */}
         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
           <p
             className="text-accent font-body font-semibold text-sm uppercase tracking-widest mb-4"
             data-aos="fade-up"
             data-aos-delay="100"
           >
             Doorstep Car Wash Service · Delhi NCR
           </p>
           <h1
             className="font-heading text-5xl md:text-7xl font-extrabold leading-tight mb-6"
             data-aos="fade-up"
             data-aos-delay="200"
           >
             Your Car Deserves to{' '}
             <span className="text-accent">Glow</span>
           </h1>
           <p
             className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
             data-aos="fade-up"
             data-aos-delay="300"
           >
             Professional doorstep car washing — we come to you. Book in 60 seconds, shine in minutes.
           </p>

           {/* Inline Mini Booking Widget */}
           <div
             className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
             data-aos="fade-up"
             data-aos-delay="400"
           >
             <input
               type="tel"
               placeholder="Your Phone Number"
               aria-label="Phone number for booking"
               className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent font-body"
             />
             <select
               aria-label="Select car wash service"
               className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-accent font-body"
             >
               <option value="" className="text-black">Select Service</option>
               <option value="basic" className="text-black">Basic Wash</option>
               <option value="premium" className="text-black">Premium Wash</option>
               <option value="deep" className="text-black">Deep Clean</option>
             </select>
             <Button variant="primary" className="whitespace-nowrap px-8">
               Book Now →
             </Button>
           </div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60" aria-hidden="true">
           <span className="text-xs font-body tracking-wide">Scroll</span>
           <div className="w-0.5 h-8 bg-white/40 animate-bounce" />
         </div>
       </section>
     );
   }
   ```

3. **CSS Keyframe for Ken Burns** (add to `animations.css` — use this when no video):
   ```css
   @keyframes kenBurns {
     0%   { transform: scale(1) translate(0, 0); }
     100% { transform: scale(1.1) translate(-2%, -1%); }
   }
   .hero-img-animate {
     animation: kenBurns 12s ease-in-out infinite alternate;
   }
   ```

4. **Video optimization**: Compress hero video to < 5MB using HandBrake (H.264, 720p). Provide WebM alongside MP4:
   ```html
   <source src="/assets/videos/hero-carwash.webm" type="video/webm" />
   <source src="/assets/videos/hero-carwash.mp4" type="video/mp4" />
   ```

**Copilot Guidance:**
- Prompt: *"React hero section with looping muted video background, dark gradient overlay, fade-up AOS animations, bold headline, and an inline booking widget with phone input and service dropdown using Tailwind CSS"*
- Watch out for: `autoPlay` requires `muted` in React to work across browsers; on iOS, video won't autoplay without `playsInline` attribute.

---

### 🔹 Feature 4: Booking Form Redesign (Full Page Section)

**Description:**
A dedicated full booking form section below the hero. Inputs use floating label pattern — the label starts inside the input as placeholder text, then animates upward on focus/fill. Inputs have icon adornments, neumorphic shadows, and real-time validation feedback (red error or green check).

**Why it matters:**
The form is the primary conversion point. A polished, interactive form with clear feedback dramatically reduces abandonment.

**Technical Requirements:**
- Floating label CSS technique
- SVG icon inside input (absolutely positioned)
- HTML5 + JS real-time validation
- State management per field (value, touched, error)
- EmailJS or API POST on submit

**Step-by-Step Implementation:**

1. **Install EmailJS** (no backend needed):
   ```bash
   npm install @emailjs/browser
   ```

2. **FloatingInput UI Component** (`src/components/ui/InputField.jsx`):
   ```jsx
   export function InputField({ id, label, type = 'text', icon: Icon, error, ...props }) {
     return (
       <div className="relative w-full">
         {/* Icon */}
         {Icon && (
           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true">
             <Icon className="w-4 h-4" />
           </span>
         )}

         {/* Input */}
         <input
           id={id}
           type={type}
           placeholder=" "
           className={`peer w-full pt-5 pb-2 ${Icon ? 'pl-10' : 'pl-4'} pr-4 rounded-neu
             bg-surface border-2 transition-all duration-200 font-body text-sm
             shadow-neu focus:shadow-neu-inset focus:outline-none
             ${error
               ? 'border-red-400 focus:border-red-500'
               : 'border-transparent focus:border-primary'
             }`}
           aria-invalid={!!error}
           aria-describedby={error ? `${id}-error` : undefined}
           {...props}
         />

         {/* Floating Label */}
         <label
           htmlFor={id}
           className={`absolute ${Icon ? 'left-10' : 'left-4'} top-3.5
             text-gray-500 text-sm transition-all duration-200 pointer-events-none
             peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
             peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary
             peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs`}
         >
           {label}
         </label>

         {/* Error Message */}
         {error && (
           <p id={`${id}-error`} className="mt-1 text-xs text-red-500 font-body" role="alert">
             {error}
           </p>
         )}
       </div>
     );
   }
   ```

3. **Validation Utility** (`src/utils/formValidation.js`):
   ```js
   export const validators = {
     name: (v) => !v.trim() ? 'Name is required' : v.trim().length < 2 ? 'Name too short' : '',
     phone: (v) => {
       if (!v.trim()) return 'Phone number is required';
       if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ''))) return 'Enter a valid 10-digit Indian mobile number';
       return '';
     },
     service: (v) => !v ? 'Please select a service' : '',
     address: (v) => !v.trim() ? 'Address is required' : v.trim().length < 10 ? 'Please enter a more complete address' : '',
   };

   export function validateForm(fields) {
     const errors = {};
     Object.keys(fields).forEach(key => {
       if (validators[key]) errors[key] = validators[key](fields[key]);
     });
     return errors;
   }
   ```

4. **Full Booking Form Section** (`src/components/sections/BookingForm.jsx`):
   ```jsx
   import { useState } from 'react';
   import { InputField } from '../ui/InputField';
   import { Button } from '../ui/Button';
   import { validateForm } from '../../utils/formValidation';
   import emailjs from '@emailjs/browser';
   import { UserIcon, PhoneIcon, MapPinIcon, CarIcon } from 'lucide-react';

   const INITIAL = { name: '', phone: '', service: '', address: '', notes: '' };

   export function BookingForm() {
     const [fields, setFields] = useState(INITIAL);
     const [errors, setErrors] = useState({});
     const [touched, setTouched] = useState({});
     const [status, setStatus] = useState('idle'); // idle | loading | success | error

     const handleChange = (e) => {
       const { name, value } = e.target;
       setFields(prev => ({ ...prev, [name]: value }));
       if (touched[name]) {
         setErrors(prev => ({ ...prev, [name]: validateForm({ [name]: value })[name] }));
       }
     };

     const handleBlur = (e) => {
       const { name } = e.target;
       setTouched(prev => ({ ...prev, [name]: true }));
       setErrors(prev => ({ ...prev, [name]: validateForm({ [name]: fields[name] })[name] }));
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       const allTouched = Object.keys(INITIAL).reduce((acc, k) => ({ ...acc, [k]: true }), {});
       setTouched(allTouched);
       const validationErrors = validateForm(fields);
       setErrors(validationErrors);
       if (Object.values(validationErrors).some(Boolean)) return;

       setStatus('loading');
       try {
         await emailjs.send(
           'YOUR_SERVICE_ID',
           'YOUR_TEMPLATE_ID',
           fields,
           'YOUR_PUBLIC_KEY'
         );
         setStatus('success');
         setFields(INITIAL);
         setTouched({});
       } catch {
         setStatus('error');
       }
     };

     return (
       <section id="booking" className="py-20 bg-surface" aria-labelledby="booking-heading">
         <div className="max-w-2xl mx-auto px-4">
           <div className="text-center mb-10" data-aos="fade-up">
             <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Book a Wash</span>
             <h2 id="booking-heading" className="font-heading text-4xl font-bold text-gray-900 mt-2">
               Schedule Your Doorstep Wash
             </h2>
             <p className="text-gray-500 mt-3 font-body">We come to your location. Fill the form and we'll confirm within minutes.</p>
           </div>

           <form
             onSubmit={handleSubmit}
             noValidate
             className="bg-white rounded-2xl p-6 md:p-8 shadow-neu space-y-5"
             data-aos="fade-up"
             data-aos-delay="100"
           >
             <InputField id="name" name="name" label="Full Name" icon={UserIcon}
               value={fields.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
             <InputField id="phone" name="phone" label="Mobile Number" type="tel" icon={PhoneIcon}
               value={fields.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} />

             {/* Service Select */}
             <div className="relative">
               <CarIcon className="absolute left-4 top-4 w-4 h-4 text-gray-400" aria-hidden="true" />
               <select
                 id="service" name="service"
                 value={fields.service} onChange={handleChange} onBlur={handleBlur}
                 aria-label="Select wash service"
                 className={`w-full pl-10 pr-4 py-4 rounded-neu border-2 bg-surface font-body text-sm
                   shadow-neu focus:shadow-neu-inset focus:outline-none transition-all duration-200
                   ${errors.service ? 'border-red-400' : 'border-transparent focus:border-primary'}
                   ${!fields.service ? 'text-gray-400' : 'text-gray-800'}`}
               >
                 <option value="">Select a Service</option>
                 <option value="basic">Basic Exterior Wash – ₹299</option>
                 <option value="premium">Premium Wash + Interior – ₹599</option>
                 <option value="deep">Deep Clean + Polish – ₹999</option>
               </select>
               {errors.service && <p className="mt-1 text-xs text-red-500" role="alert">{errors.service}</p>}
             </div>

             <InputField id="address" name="address" label="Pickup Address" icon={MapPinIcon}
               value={fields.address} onChange={handleChange} onBlur={handleBlur} error={errors.address} />

             <textarea
               id="notes" name="notes" rows={3}
               placeholder="Additional notes (optional)"
               value={fields.notes} onChange={handleChange}
               aria-label="Additional notes"
               className="w-full px-4 py-3 rounded-neu border-2 border-transparent bg-surface font-body text-sm
                 shadow-neu focus:shadow-neu-inset focus:border-primary focus:outline-none transition-all duration-200 resize-none"
             />

             <Button
               type="submit"
               variant="primary"
               className="w-full py-4 text-base"
               disabled={status === 'loading'}
             >
               {status === 'loading' ? 'Booking...' : 'Confirm Booking →'}
             </Button>

             {status === 'success' && (
               <p className="text-center text-green-600 font-body text-sm font-medium" role="status">
                 ✅ Booking confirmed! We'll call you shortly.
               </p>
             )}
             {status === 'error' && (
               <p className="text-center text-red-500 font-body text-sm" role="alert">
                 ❌ Something went wrong. Please call us directly.
               </p>
             )}
           </form>
         </div>
       </section>
     );
   }
   ```

5. **EmailJS Setup**:
   - Create account at [emailjs.com](https://emailjs.com)
   - Create an Email Service (Gmail/custom)
   - Create an Email Template with variables: `{{name}}`, `{{phone}}`, `{{service}}`, `{{address}}`
   - Store Service ID, Template ID, Public Key in `.env`:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

**Copilot Guidance:**
- Prompt: *"React form with floating label inputs using Tailwind CSS peer-* classes, neumorphic box shadows, real-time field validation, and EmailJS submission with loading/success/error state"*
- Watch out for: Tailwind's `peer` utility requires the `<input>` to appear **before** the `<label>` in DOM order for CSS sibling selectors to work.

---

### 🔹 Feature 5: Services & Pricing Grid

**Description:**
A section displaying GaadiGlow's service offerings as a card grid. Each card has a service icon, title, short description, price badge, and a CTA. On hover, cards lift with shadow and color shift.

**Why it matters:**
Users need to quickly understand what they're booking. Clear pricing and feature differentiation increases conversion and reduces friction.

**Step-by-Step Implementation:**

1. **Services Data** (define in component or a data file):
   ```js
   // src/data/services.js
   export const SERVICES = [
     {
       id: 'basic',
       icon: '🚿',
       title: 'Basic Wash',
       description: 'Exterior rinse, foam wash, and dry. Perfect for weekly maintenance.',
       price: '₹299',
       duration: '30 min',
       features: ['Exterior foam wash', 'Rinse & dry', 'Tyre clean'],
     },
     {
       id: 'premium',
       icon: '✨',
       title: 'Premium Wash',
       description: 'Full exterior + interior vacuuming, dashboard wipe, and glass clean.',
       price: '₹599',
       duration: '60 min',
       features: ['All Basic features', 'Interior vacuum', 'Dashboard wipe', 'Glass cleaning'],
       popular: true,
     },
     {
       id: 'deep',
       icon: '💎',
       title: 'Deep Clean',
       description: 'Complete detailing — exterior polish, interior deep clean, odor removal.',
       price: '₹999',
       duration: '90 min',
       features: ['All Premium features', 'Paint polish', 'Deep interior clean', 'Odor removal'],
     },
   ];
   ```

2. **Services Section Component** (`src/components/sections/ServicesGrid.jsx`):
   ```jsx
   import { SERVICES } from '../../data/services';
   import { Button } from '../ui/Button';

   export function ServicesGrid() {
     return (
       <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
         <div className="max-w-6xl mx-auto px-4">
           <div className="text-center mb-12" data-aos="fade-up">
             <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Our Services</span>
             <h2 id="services-heading" className="font-heading text-4xl font-bold text-gray-900 mt-2">
               Choose Your Wash
             </h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {SERVICES.map((svc, i) => (
               <div
                 key={svc.id}
                 data-aos="fade-up"
                 data-aos-delay={i * 100}
                 className={`relative rounded-2xl p-6 border-2 transition-all duration-300 group cursor-pointer
                   hover:-translate-y-2 hover:shadow-xl
                   ${svc.popular
                     ? 'border-primary bg-primary text-white'
                     : 'border-gray-100 bg-white text-gray-800 hover:border-primary'
                   }`}
               >
                 {svc.popular && (
                   <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-body font-bold px-4 py-1 rounded-pill">
                     MOST POPULAR
                   </span>
                 )}
                 <div className="text-4xl mb-4" aria-hidden="true">{svc.icon}</div>
                 <h3 className="font-heading text-xl font-bold mb-2">{svc.title}</h3>
                 <p className={`font-body text-sm mb-4 ${svc.popular ? 'text-white/80' : 'text-gray-500'}`}>
                   {svc.description}
                 </p>
                 <div className="text-3xl font-heading font-extrabold mb-1">{svc.price}</div>
                 <div className={`text-xs font-body mb-4 ${svc.popular ? 'text-white/70' : 'text-gray-400'}`}>
                   {svc.duration}
                 </div>
                 <ul className="space-y-1.5 mb-6">
                   {svc.features.map(f => (
                     <li key={f} className="flex items-center gap-2 text-sm font-body">
                       <span className={`${svc.popular ? 'text-white' : 'text-green-500'}`} aria-hidden="true">✓</span>
                       {f}
                     </li>
                   ))}
                 </ul>
                 <Button
                   variant={svc.popular ? 'outline' : 'primary'}
                   className={`w-full ${svc.popular ? 'border-white text-white hover:bg-white hover:text-primary' : ''}`}
                 >
                   Book This
                 </Button>
               </div>
             ))}
           </div>
         </div>
       </section>
     );
   }
   ```

**Copilot Guidance:**
- Prompt: *"React services pricing grid with 3 cards using Tailwind CSS, hover lift effect, a highlighted 'most popular' card variant, feature lists, and a Book CTA"*

---

### 🔹 Feature 6: Testimonials Carousel

**Description:**
A slider/carousel of customer testimonials. Each slide shows a user avatar (initials or photo), name, review text, and star rating. Auto-plays every 4 seconds with pause on hover. Uses Swiper.js for touch/mobile support.

**Why it matters:**
Social proof is one of the most powerful trust signals in e-commerce and service businesses. Star ratings and real reviews directly increase booking intent.

**Step-by-Step Implementation:**

1. **Install Swiper**:
   ```bash
   npm install swiper
   ```

2. **Testimonials Data**:
   ```js
   // src/data/testimonials.js
   export const TESTIMONIALS = [
     { id: 1, name: 'Priya Sharma', location: 'Dwarka, Delhi', rating: 5,
       text: 'Amazing service! The team was punctual, professional, and my car looks brand new. Highly recommended!' },
     { id: 2, name: 'Arjun Mehta', location: 'Rohini, Delhi', rating: 5,
       text: 'Booked the premium wash — worth every rupee. Interior was spotless. Will book again next week.' },
     { id: 3, name: 'Sunita Kapoor', location: 'Janakpuri, Delhi', rating: 4,
       text: 'Convenient and well-priced. Love that they come to my home. Minor delay but overall great experience.' },
     { id: 4, name: 'Rohit Verma', location: 'Pitampura, Delhi', rating: 5,
       text: 'GaadiGlow is my go-to for car washing. The deep clean made my 5-year-old car look showroom fresh.' },
   ];
   ```

3. **Star Rating Component** (`src/components/ui/StarRating.jsx`):
   ```jsx
   export function StarRating({ rating, max = 5 }) {
     return (
       <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
         {Array.from({ length: max }, (_, i) => (
           <svg
             key={i}
             className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
             fill="currentColor"
             viewBox="0 0 20 20"
             aria-hidden="true"
           >
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
           </svg>
         ))}
       </div>
     );
   }
   ```

4. **Testimonials Carousel Section** (`src/components/sections/TestimonialsCarousel.jsx`):
   ```jsx
   import { Swiper, SwiperSlide } from 'swiper/react';
   import { Autoplay, Pagination, A11y } from 'swiper/modules';
   import 'swiper/css';
   import 'swiper/css/pagination';
   import { StarRating } from '../ui/StarRating';
   import { TESTIMONIALS } from '../../data/testimonials';

   function getInitials(name) {
     return name.split(' ').map(n => n[0]).join('').toUpperCase();
   }

   export function TestimonialsCarousel() {
     return (
       <section id="testimonials" className="py-20 bg-surface" aria-labelledby="testimonials-heading">
         <div className="max-w-5xl mx-auto px-4">
           <div className="text-center mb-12" data-aos="fade-up">
             <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Reviews</span>
             <h2 id="testimonials-heading" className="font-heading text-4xl font-bold text-gray-900 mt-2">
               What Our Customers Say
             </h2>
             <p className="text-gray-500 mt-3 font-body">Trusted by 100+ happy car owners in Delhi NCR</p>
           </div>

           <div data-aos="fade-up" data-aos-delay="100">
             <Swiper
               modules={[Autoplay, Pagination, A11y]}
               spaceBetween={24}
               slidesPerView={1}
               breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
               autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
               pagination={{ clickable: true }}
               a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
               className="pb-10"
             >
               {TESTIMONIALS.map(t => (
                 <SwiperSlide key={t.id}>
                   <article className="bg-white rounded-2xl p-6 shadow-neu h-full flex flex-col gap-4">
                     <StarRating rating={t.rating} />
                     <blockquote className="font-body text-gray-600 text-sm leading-relaxed flex-1">
                       "{t.text}"
                     </blockquote>
                     <div className="flex items-center gap-3">
                       <div
                         className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm"
                         aria-hidden="true"
                       >
                         {getInitials(t.name)}
                       </div>
                       <div>
                         <div className="font-body font-semibold text-gray-800 text-sm">{t.name}</div>
                         <div className="font-body text-gray-400 text-xs">{t.location}</div>
                       </div>
                     </div>
                   </article>
                 </SwiperSlide>
               ))}
             </Swiper>
           </div>
         </div>
       </section>
     );
   }
   ```

**Copilot Guidance:**
- Prompt: *"React Swiper.js testimonials carousel with star ratings, auto-scroll, pause on hover, responsive 1/2/3 columns, and accessible aria labels using Tailwind CSS"*

---

### 🔹 Feature 7: Stats Counter (Animated Numbers)

**Description:**
A section with 3–4 key metrics (e.g., "500+ Washes Done", "100+ Happy Customers", "4.9★ Rating", "5+ Cities") that animate from 0 to their target values when the section scrolls into view using an Intersection Observer.

**Why it matters:**
Animated stats act as trust badges in motion. They communicate scale and credibility within a split second of visual attention.

**Step-by-Step Implementation:**

1. **Counter Hook** (`src/hooks/useCounter.js`):
   ```js
   import { useState, useEffect, useRef } from 'react';

   export function useCounter(target, duration = 1500, start = false) {
     const [count, setCount] = useState(0);
     useEffect(() => {
       if (!start) return;
       let startTime = null;
       const step = (timestamp) => {
         if (!startTime) startTime = timestamp;
         const progress = Math.min((timestamp - startTime) / duration, 1);
         setCount(Math.floor(progress * target));
         if (progress < 1) requestAnimationFrame(step);
       };
       requestAnimationFrame(step);
     }, [target, duration, start]);
     return count;
   }
   ```

2. **Stats Section** (`src/components/sections/StatsCounter.jsx`):
   ```jsx
   import { useRef, useState, useEffect } from 'react';
   import { useCounter } from '../../hooks/useCounter';

   const STATS = [
     { label: 'Washes Completed', value: 500, suffix: '+' },
     { label: 'Happy Customers', value: 100, suffix: '+' },
     { label: 'Average Rating', value: 4.9, suffix: '★', isFloat: true },
     { label: 'Cities Served', value: 3, suffix: '+' },
   ];

   function StatItem({ stat, started }) {
     const count = useCounter(stat.isFloat ? stat.value * 10 : stat.value, 1800, started);
     const display = stat.isFloat ? (count / 10).toFixed(1) : count;
     return (
       <div className="text-center" data-aos="zoom-in">
         <div className="font-heading text-5xl font-extrabold text-primary">
           {display}{stat.suffix}
         </div>
         <div className="font-body text-gray-500 mt-2 text-sm">{stat.label}</div>
       </div>
     );
   }

   export function StatsCounter() {
     const ref = useRef(null);
     const [started, setStarted] = useState(false);

     useEffect(() => {
       const observer = new IntersectionObserver(
         ([entry]) => { if (entry.isIntersecting) setStarted(true); },
         { threshold: 0.3 }
       );
       if (ref.current) observer.observe(ref.current);
       return () => observer.disconnect();
     }, []);

     return (
       <section
         ref={ref}
         className="py-16 bg-primary"
         aria-label="GaadiGlow statistics"
       >
         <div className="max-w-5xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {STATS.map(stat => (
               <StatItem key={stat.label} stat={stat} started={started} />
             ))}
           </div>
         </div>
       </section>
     );
   }
   ```

**Copilot Guidance:**
- Prompt: *"React animated counter section using Intersection Observer to start counting when visible, with requestAnimationFrame for smooth animation, using Tailwind CSS"*

---

### 🔹 Feature 8: Dark Mode Toggle

**Description:**
A toggle button (sun/moon icon) persisted via `localStorage` that adds/removes the `dark` class on `<html>`. All color tokens defined with CSS variables automatically flip. The toggle appears in the header.

**Why it matters:**
Dark mode is a 2026 design standard expectation. It improves accessibility for light-sensitive users and adds perceived modernity to the brand.

**Step-by-Step Implementation:**

1. **Dark Mode Hook** (`src/hooks/useDarkMode.js`):
   ```js
   import { useState, useEffect } from 'react';

   export function useDarkMode() {
     const [isDark, setIsDark] = useState(() => {
       if (typeof window === 'undefined') return false;
       const stored = localStorage.getItem('theme');
       if (stored) return stored === 'dark';
       return window.matchMedia('(prefers-color-scheme: dark)').matches;
     });

     useEffect(() => {
       const root = document.documentElement;
       if (isDark) {
         root.classList.add('dark');
         localStorage.setItem('theme', 'dark');
       } else {
         root.classList.remove('dark');
         localStorage.setItem('theme', 'light');
       }
     }, [isDark]);

     return [isDark, setIsDark];
   }
   ```

2. **DarkModeToggle Component** (`src/components/ui/DarkModeToggle.jsx`):
   ```jsx
   import { SunIcon, MoonIcon } from 'lucide-react';
   import { useDarkMode } from '../../hooks/useDarkMode';

   export function DarkModeToggle() {
     const [isDark, setIsDark] = useDarkMode();
     return (
       <button
         onClick={() => setIsDark(!isDark)}
         aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
         aria-pressed={isDark}
         className="p-2 rounded-full border border-gray-200 dark:border-gray-700
           bg-white dark:bg-gray-800 text-gray-600 dark:text-yellow-400
           hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
       >
         {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
       </button>
     );
   }
   ```

3. Add `<DarkModeToggle />` next to the Book Now button in `Header.jsx`.

4. Ensure all Tailwind classes use `dark:` variants where color matters. For custom CSS, use:
   ```css
   html.dark {
     --color-bg: #0F172A;
     --color-text: #F1F5F9;
     /* etc. */
   }
   ```

**Copilot Guidance:**
- Prompt: *"React dark mode toggle with localStorage persistence, system preference detection, and sun/moon icon using Tailwind CSS dark: variants"*
- Watch out for: Flash of incorrect theme (FOIT) on initial load. Fix by inlining a tiny script in `index.html` before React loads:
  ```html
  <script>
    if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  </script>
  ```

---

### 🔹 Feature 9: Scroll-Triggered Animations (AOS.js)

**Description:**
Every section fades, slides, or zooms into view as the user scrolls down. This is already partially handled by AOS.js initialized in Feature 3. This feature documents the complete integration strategy across all sections.

**Why it matters:**
Scroll animations guide user attention, create a sense of progression, and make the page feel alive and premium without heavy JavaScript.

**Implementation Details:**

1. **AOS Config** (centralized in `App.jsx`):
   ```js
   AOS.init({
     duration: 700,
     easing: 'ease-out-cubic',
     once: true,       // Animate only once (better performance)
     offset: 80,       // Start animation 80px before element enters viewport
     delay: 0,
   });
   ```

2. **AOS Attribute Reference** – Apply these to section wrappers and key elements:
   ```
   data-aos="fade-up"          → Default for most section content
   data-aos="fade-right"       → For left-side content blocks
   data-aos="fade-left"        → For right-side content blocks
   data-aos="zoom-in"          → For stat numbers, badges, icons
   data-aos="flip-left"        → For service cards
   data-aos-delay="100"        → Stagger cards: 0, 100, 200ms
   data-aos-duration="900"     → Slower for hero elements
   ```

3. **Reduced Motion Accessibility** – AOS respects `prefers-reduced-motion` media query. Ensure your CSS also handles it:
   ```css
   @media (prefers-reduced-motion: reduce) {
     [data-aos] { transition: none !important; animation: none !important; }
   }
   ```

---

### 🔹 Feature 10: Back-to-Top Button

**Description:**
A floating circular button (↑ arrow) that appears after the user scrolls past 100px. Smooth-scrolls to the top when clicked. Fades in/out with CSS transition.

**Step-by-Step Implementation:**

```jsx
// src/components/ui/BackToTop.jsx
import { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
        bg-primary text-white shadow-lg flex items-center justify-center
        transition-all duration-300 hover:bg-primary-dark hover:-translate-y-1
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
}
```

Add `<BackToTop />` in `App.jsx` at root level.

---

### 🔹 Feature 11: Map & Contact Section

**Description:**
A visually separated footer-adjacent section with:
- An embedded Google Map iframe showing Delhi (or the service zone)
- Clear contact information: phone, WhatsApp, email, address
- Social media links (Instagram, Facebook)
- Optional newsletter signup input

**Why it matters:**
Buried contact info is a conversion killer. Making it prominent and map-integrated builds location trust, especially for a doorstep service where geography matters.

**Step-by-Step Implementation:**

1. **Map Component**:
   ```jsx
   // src/components/sections/MapSection.jsx
   export function MapSection() {
     return (
       <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
         <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-12" data-aos="fade-up">
             <span className="text-accent font-body font-semibold text-sm uppercase tracking-widest">Find Us</span>
             <h2 id="contact-heading" className="font-heading text-4xl font-bold text-gray-900 mt-2">
               We Serve Across Delhi NCR
             </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
             {/* Map */}
             <div className="rounded-2xl overflow-hidden shadow-neu h-80 lg:h-full min-h-64" data-aos="fade-right">
               <iframe
                 title="GaadiGlow service area map"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.95103338745!2d76.76357449999999!3d28.6439985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
                 className="w-full h-full border-0"
                 loading="lazy"
                 allowFullScreen
                 referrerPolicy="no-referrer-when-downgrade"
               />
             </div>

             {/* Contact Info */}
             <div className="space-y-6" data-aos="fade-left">
               <div>
                 <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                 <ul className="space-y-3">
                   {[
                     { icon: '📞', label: 'Call/WhatsApp', value: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
                     { icon: '📧', label: 'Email', value: 'hello@gaadiglow.com', href: 'mailto:hello@gaadiglow.com' },
                     { icon: '📍', label: 'Base Location', value: 'Delhi NCR, India', href: null },
                   ].map(item => (
                     <li key={item.label} className="flex items-start gap-3">
                       <span className="text-xl" aria-hidden="true">{item.icon}</span>
                       <div>
                         <div className="text-xs text-gray-400 font-body">{item.label}</div>
                         {item.href ? (
                           <a href={item.href} className="font-body text-gray-700 hover:text-primary transition-colors font-medium">
                             {item.value}
                           </a>
                         ) : (
                           <span className="font-body text-gray-700 font-medium">{item.value}</span>
                         )}
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Social Links */}
               <div>
                 <h4 className="font-body font-semibold text-gray-700 mb-3">Follow Us</h4>
                 <div className="flex gap-3">
                   {[
                     { name: 'Instagram', href: 'https://instagram.com/gaadiglow', color: 'hover:text-pink-500' },
                     { name: 'Facebook', href: 'https://facebook.com/gaadiglow', color: 'hover:text-blue-600' },
                   ].map(s => (
                     <a
                       key={s.name}
                       href={s.href}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label={`GaadiGlow on ${s.name}`}
                       className={`text-gray-400 ${s.color} transition-colors font-body text-sm font-medium`}
                     >
                       {s.name}
                     </a>
                   ))}
                 </div>
               </div>

               {/* Newsletter */}
               <div>
                 <h4 className="font-body font-semibold text-gray-700 mb-3">Get Offers in Your Inbox</h4>
                 <div className="flex gap-2">
                   <input
                     type="email"
                     placeholder="your@email.com"
                     aria-label="Email for newsletter"
                     className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                   />
                   <button className="px-5 py-2.5 bg-accent text-white rounded-xl font-body text-sm font-semibold
                     hover:bg-accent-dark transition-colors">
                     Subscribe
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     );
   }
   ```

**Copilot Guidance:**
- Prompt: *"React contact section with Google Maps iframe, contact info list, social links, and newsletter email input, using Tailwind CSS grid layout"*

---

### 🔹 Feature 12: Footer

**Description:**
A full-width footer with: logo, tagline, nav links, service links, contact info snippet, social icons, copyright, and a "Made with ❤️ in Delhi" note.

```jsx
// src/components/layout/Footer.jsx
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <img src="/logo-white.svg" alt="GaadiGlow" className="h-9 mb-4" />
          <p className="font-body text-gray-400 text-sm max-w-xs leading-relaxed">
            Doorstep car washing in Delhi NCR. We come to you — clean car, zero effort.
          </p>
        </div>
        <div>
          <h3 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wide">Services</h3>
          <ul className="space-y-2">
            {['Basic Wash', 'Premium Wash', 'Deep Clean'].map(s => (
              <li key={s}><a href="#services" className="font-body text-gray-400 hover:text-white text-sm transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wide">Company</h3>
          <ul className="space-y-2">
            {[['About', '#about'], ['Testimonials', '#testimonials'], ['Contact', '#contact']].map(([label, href]) => (
              <li key={label}><a href={href} className="font-body text-gray-400 hover:text-white text-sm transition-colors">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-5 px-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="font-body text-gray-500 text-xs">© {new Date().getFullYear()} GaadiGlow. All rights reserved.</p>
        <p className="font-body text-gray-500 text-xs">Made with ❤️ in Delhi</p>
      </div>
    </footer>
  );
}
```

---

### 🔹 Feature 13: Accessibility Audit & Implementation

**Description:**
A systematic pass through the entire site to ensure WCAG 2.1 AA compliance. This is not a single component — it's a discipline applied to every feature.

**Checklist Implementation:**

1. **Semantic HTML** – Every section must use:
   ```html
   <header role="banner">
   <nav aria-label="Main navigation">
   <main>
   <section aria-labelledby="section-heading-id">
   <footer role="contentinfo">
   ```

2. **Image Alt Text** – All `<img>` tags:
   ```jsx
   <img src="..." alt="GaadiGlow team washing a car at client's doorstep in Delhi" />
   // Decorative images:
   <img src="..." alt="" aria-hidden="true" />
   ```

3. **Focus Styles** – Add visible focus rings (Tailwind handles this with `focus-visible:ring-*`). Also add to global CSS:
   ```css
   :focus-visible {
     outline: 3px solid var(--color-primary);
     outline-offset: 3px;
   }
   ```

4. **Color Contrast** – Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) for:
   - Body text (#1A1A2E on white) – Should be > 4.5:1
   - White text on primary blue – Check both pass

5. **ARIA Labels** – Add to all icon-only buttons:
   ```jsx
   <button aria-label="Close menu">...</button>
   <a aria-label="Chat with us on WhatsApp">...</a>
   ```

6. **Form Accessibility**:
   - Every `<input>` must have an associated `<label>` (via `htmlFor` / `id` pair)
   - Error messages must use `role="alert"` and `aria-describedby`
   - Required fields: `aria-required="true"`

7. **Run audits**: `npm install -D @axe-core/react`, add in dev mode:
   ```js
   if (import.meta.env.DEV) {
     const axe = await import('@axe-core/react');
     axe.default(React, ReactDOM, 1000);
   }
   ```

---

### 🔹 Feature 14: SEO Setup

**Description:**
Meta tags, heading hierarchy, structured data, and sitemap setup to ensure Google indexes GaadiGlow correctly.

**Step-by-Step Implementation:**

1. **Install React Helmet Async**:
   ```bash
   npm install react-helmet-async
   ```

2. **SEO Component** (`src/components/SEO.jsx`):
   ```jsx
   import { Helmet } from 'react-helmet-async';

   export function SEO({ title, description, canonical }) {
     return (
       <Helmet>
         <title>{title} | GaadiGlow</title>
         <meta name="description" content={description} />
         <link rel="canonical" href={canonical} />
         <meta property="og:title" content={`${title} | GaadiGlow`} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content="https://gaadiglow.com/og-image.jpg" />
         <meta property="og:url" content={canonical} />
         <meta property="og:type" content="website" />
         <meta name="twitter:card" content="summary_large_image" />
       </Helmet>
     );
   }
   ```

3. **Usage in `App.jsx`**:
   ```jsx
   <SEO
     title="Doorstep Car Wash in Delhi NCR"
     description="Book a professional doorstep car wash in Delhi NCR. We come to you — exterior, interior, and deep clean packages starting at ₹299."
     canonical="https://gaadiglow.com"
   />
   ```

4. **Heading Hierarchy** – Strictly enforce:
   - One `<h1>` per page (Hero headline: "Your Car Deserves to Glow")
   - Section headings: `<h2>` (Services, Testimonials, About, Contact)
   - Sub-headings: `<h3>` (individual service names, contact sub-headers)

5. **Structured Data** – Add JSON-LD in `index.html`:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "GaadiGlow",
     "description": "Doorstep car wash service in Delhi NCR",
     "url": "https://gaadiglow.com",
     "telephone": "+91-XXXXXXXXXX",
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "Delhi",
       "addressRegion": "DL",
       "addressCountry": "IN"
     },
     "areaServed": "Delhi NCR",
     "priceRange": "₹₹"
   }
   </script>
   ```

---

### 🔹 Feature 15: Performance Optimization

*(See also Section 6 for expanded detail)*

**Step-by-Step Implementation:**

1. **Image Optimization**:
   - Convert all images to WebP using [Squoosh](https://squoosh.app/) or `cwebp` CLI
   - Add `srcset` for responsive images:
     ```jsx
     <img
       src="/images/hero.webp"
       srcSet="/images/hero-480.webp 480w, /images/hero-768.webp 768w, /images/hero-1200.webp 1200w"
       sizes="100vw"
       alt="GaadiGlow doorstep car wash"
       loading="eager"   // hero image — don't lazy load
     />
     // All below-fold images:
     loading="lazy"
     ```

2. **Vite Build Optimization** (`vite.config.js`):
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             swiper: ['swiper'],
             aos:    ['aos'],
           }
         }
       },
       minify: 'terser',
       sourcemap: false,
     }
   })
   ```

3. **Lazy load heavy sections** (below the fold):
   ```jsx
   import { lazy, Suspense } from 'react';
   const TestimonialsCarousel = lazy(() => import('./components/sections/TestimonialsCarousel'));
   const MapSection = lazy(() => import('./components/sections/MapSection'));

   // Wrap with Suspense:
   <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}>
     <TestimonialsCarousel />
   </Suspense>
   ```

---

## 4. ⚙️ Tech Stack Recommendations

| Layer | Choice | Justification | Alternative |
|---|---|---|---|
| **Framework** | React 18 + Vite | Fast dev server, HMR, modern tooling; already implied by project | Next.js (if SSR/SEO becomes critical) |
| **Styling** | Tailwind CSS v3 | Utility-first, JIT, dark mode class strategy, highly customizable | CSS Modules + SCSS |
| **Animations** | AOS.js | Minimal, zero-dependency scroll animations; battle-tested | Framer Motion (heavier, but better for complex animations) |
| **Carousel** | Swiper.js | Industry standard, touch-native, accessible, tree-shakeable modules | React Slick (older) |
| **Icons** | Lucide React | Lightweight, consistent, 1000+ icons, React-native | Heroicons |
| **Forms/Email** | EmailJS | Zero-backend form submission; free tier generous | Netlify Forms (if on Netlify) |
| **Fonts** | Google Fonts (Syne + DM Sans) | Free, fast via CDN, distinctive yet readable | Self-host for privacy |
| **Linting** | ESLint + Prettier | Code consistency | — |
| **Testing** | Vitest + Testing Library | Native Vite integration; fast | Jest |
| **E2E Testing** | Playwright | Modern, cross-browser E2E | Cypress |
| **Hosting** | Vercel | Git-based deploy, preview URLs, free tier, edge CDN | Netlify |
| **Analytics** | Vercel Analytics or Plausible | Privacy-friendly; Plausible is GDPR compliant | Google Analytics 4 |

---

## 5. 🔄 Migration Strategy

### Phase 1: Parallel Build (No Risk)
- Build the new React + Vite site in a **separate GitHub repository** or `new-site/` directory
- Do NOT touch the current live site during development
- Use a Vercel preview URL (`gaadiglow-new.vercel.app`) for review

### Phase 2: Content Migration
- Copy all existing text content (headings, service descriptions, pricing) to the new data files in `src/data/`
- Download and re-optimize all images to WebP; re-upload to `src/assets/images/`
- Verify booking form: if current form emails to a specific address, replicate that in EmailJS template

### Phase 3: DNS Cutover
- Deploy new site to Vercel under a staging domain first
- Get stakeholder approval on staging
- Update Vercel project settings: add custom domain `gaadiglow.com`
- Update DNS records (A/CNAME) at domain registrar → Vercel IPs
- Vercel auto-provisions SSL via Let's Encrypt

### Backward Compatibility
- All existing URL paths (`/`, `#contact`, `#services`) are preserved since it's a single-page scroll-based site
- No backend database to migrate — it's a marketing site

### Rollback Strategy
- Keep old site on a subdomain (`old.gaadiglow.com`) or as a separate Vercel project for 30 days
- If new site has critical issues, update DNS back to old hosting — rollback takes < 5 minutes

---

## 6. 🚀 Performance Optimization Plan

### Image Strategy
```
Hero image: WebP, compressed to < 200KB, loaded eagerly with preload:
<link rel="preload" as="image" href="/images/hero.webp">

Below-fold images: loading="lazy" + srcset
Logo: SVG (vector, tiny, no compression needed)
Icons: Lucide React (SVG-in-JS, tree-shaken)
```

### Code Splitting
```js
// Automatic via Vite — each dynamic import() creates a separate chunk
// Manual chunks for large libraries (swiper, aos) via manualChunks in vite.config.js
// React.lazy() for below-fold sections
```

### Caching (Vercel)
Vercel automatically sets:
- HTML: `Cache-Control: no-cache` (always fresh)
- Hashed assets (JS/CSS): `Cache-Control: public, max-age=31536000, immutable`

### Performance Targets

| Metric | Target | Tool |
|---|---|---|
| FCP (mobile) | < 1.5s | PageSpeed Insights |
| LCP | < 2.5s | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| Lighthouse Score | > 90 | Chrome DevTools |
| Total JS (gzipped) | < 150KB | Vite build output |

### Optimization Checklist
- [ ] Hero video compressed with HandBrake (H.264, 720p, < 5MB)
- [ ] All images converted to WebP
- [ ] Google Fonts loaded with `display=swap`
- [ ] AOS initialized only once in App.jsx
- [ ] Swiper modules tree-shaken (import only what's used)
- [ ] `rel="preconnect"` on Google Fonts and Maps
- [ ] Tailwind CSS purge config covers all source files
- [ ] No render-blocking scripts in `<head>` (all deferred)

---

## 7. 🔐 Security Enhancements

### HTTPS
- Vercel enforces HTTPS automatically. Ensure HTTP → HTTPS redirect is on (Vercel default).

### EmailJS Security
- Store Service ID, Template ID, and Public Key in Vite environment variables:
  ```
  VITE_EMAILJS_SERVICE_ID=...
  VITE_EMAILJS_TEMPLATE_ID=...
  VITE_EMAILJS_PUBLIC_KEY=...
  ```
- EmailJS Public Key is safe to expose client-side (it's intentionally public). Private key never used in frontend.
- Enable **domain whitelist** in EmailJS dashboard to only allow submissions from `gaadiglow.com`

### Content Security Policy (CSP)
Add via `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Input Sanitization
- All form inputs are validated client-side (see Feature 4) before submission
- EmailJS handles server-side — no SQL or server injection possible on a static site
- Sanitize any user-provided data before displaying (e.g., if testimonials are user-submitted in future)

### Dependency Security
```bash
npm audit                    # Run regularly
npm audit fix                # Auto-fix moderate issues
```
- Set up GitHub Dependabot in `.github/dependabot.yml`:
  ```yaml
  version: 2
  updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
        interval: "weekly"
  ```

### API (If Backend Added Later)
- Rate limit POST `/api/booking` endpoint: max 10 requests/IP/hour
- Validate and sanitize all incoming fields server-side (Zod or Joi)
- Use CORS to allow only `gaadiglow.com` origin

---

## 8. 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Configure** in `vite.config.js`:
```js
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.js',
}
```

**Setup file** (`src/test/setup.js`):
```js
import '@testing-library/jest-dom';
```

**Example Tests**:
```js
// src/components/ui/Button.test.jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders primary button with text', () => {
  render(<Button variant="primary">Book Now</Button>);
  expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
});

test('applies primary styles by default', () => {
  render(<Button>Click</Button>);
  const btn = screen.getByRole('button');
  expect(btn).toHaveClass('bg-accent');
});
```

```js
// src/utils/formValidation.test.js
import { validators } from './formValidation';

describe('phone validator', () => {
  test('accepts valid Indian mobile', () => {
    expect(validators.phone('9876543210')).toBe('');
  });
  test('rejects invalid number', () => {
    expect(validators.phone('1234567890')).toMatch(/valid/i);
  });
  test('rejects empty', () => {
    expect(validators.phone('')).toMatch(/required/i);
  });
});
```

### Integration Tests

```js
// src/components/sections/BookingForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from './BookingForm';

test('shows validation errors on empty submit', async () => {
  render(<BookingForm />);
  fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
  });
});

test('shows success message after valid submission', async () => {
  // Mock emailjs
  vi.mock('@emailjs/browser', () => ({ send: vi.fn(() => Promise.resolve()) }));
  render(<BookingForm />);
  await userEvent.type(screen.getByLabelText(/full name/i), 'Rahul Kumar');
  await userEvent.type(screen.getByLabelText(/mobile number/i), '9876543210');
  // ... fill remaining fields
  fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));
  await waitFor(() => expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument());
});
```

### E2E Tests (Playwright)

```bash
npm install -D @playwright/test
npx playwright install
```

```js
// tests/booking.spec.js
import { test, expect } from '@playwright/test';

test('user can submit booking form', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('[aria-label="Full Name"]', 'Test User');
  await page.fill('[aria-label="Mobile Number"]', '9876543210');
  await page.selectOption('[aria-label="Select wash service"]', 'premium');
  await page.fill('[aria-label="Pickup Address"]', '123 Main Street, Delhi');
  await page.click('button:has-text("Confirm Booking")');
  await expect(page.locator('text=Booking confirmed')).toBeVisible({ timeout: 5000 });
});

test('header becomes opaque on scroll', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const header = page.locator('header');
  await expect(header).toHaveClass(/bg-transparent/);
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(header).toHaveClass(/bg-white/);
});
```

**Accessibility Test** (Playwright + axe):
```bash
npm install -D @axe-core/playwright
```
```js
import { checkA11y } from '@axe-core/playwright';
test('homepage passes accessibility audit', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await checkA11y(page);
});
```

**Run commands**:
```bash
npm run test          # Vitest unit + integration
npx playwright test   # E2E
npx playwright test --reporter=html  # Visual HTML report
```

---

## 9. 📦 Deployment & DevOps

### CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/ci.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Lint, Test & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit & Integration Tests
        run: npm run test -- --run

      - name: Build
        run: npm run build
        env:
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}

      - name: Playwright E2E
        run: |
          npx playwright install --with-deps
          npm run build && npm run preview &
          sleep 3
          npx playwright test
```

### Vercel Configuration

`vercel.json`:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ],
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | Vercel + `.env.local` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Vercel + `.env.local` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Vercel + `.env.local` | EmailJS public key |
| `VITE_GOOGLE_MAPS_KEY` | Vercel + `.env.local` | If using Maps API (optional) |

`.env.local` (never commit — add to `.gitignore`):
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Versioning Strategy
- Use semantic versioning in `package.json` (`1.0.0` → `1.1.0` → etc.)
- Tag releases on GitHub: `git tag v1.1.0 && git push --tags`
- Keep a `CHANGELOG.md` updated with each PR

### Monitoring & Logging
- **Vercel Analytics**: Enable in Vercel dashboard for Core Web Vitals tracking
- **Sentry** (optional, for JS error tracking):
  ```bash
  npm install @sentry/react
  ```
  ```js
  // main.jsx
  import * as Sentry from '@sentry/react';
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.2,
  });
  ```
- **Uptime monitoring**: Use [UptimeRobot](https://uptimerobot.com) (free) to ping `gaadiglow.com` every 5 minutes

---

## 10. 🧭 Developer Workflow & Sprint Plan

### Prerequisites
```bash
# Required tools
node --version   # >= 20.x
git --version
code --version   # VS Code with GitHub Copilot extension

# VS Code Extensions
# - GitHub Copilot
# - Tailwind CSS IntelliSense
# - ESLint
# - Prettier
# - Auto Rename Tag
```

### Initial Setup (Day 1)
```bash
git clone https://github.com/your-org/gaadiglow-web.git
cd gaadiglow-web
npm install
cp .env.example .env.local   # Fill in your keys
npm run dev                  # → http://localhost:5173
```

### Daily Developer Loop
1. Pull latest `main`: `git pull origin main`
2. Create feature branch: `git checkout -b feat/services-grid`
3. Build the feature (reference this doc + use Copilot prompts)
4. Run tests: `npm run test`
5. Run lint: `npm run lint`
6. Commit: `git commit -m "feat: add services pricing grid with hover effects"`
7. Push & open PR → GitHub Actions runs CI automatically
8. Merge after passing checks → Vercel auto-deploys

### Suggested Sprint Breakdown

---

#### 🏃 Sprint 1 (Week 1): Foundation
**Goal**: Working React project with design system and header

| Task | Estimate |
|---|---|
| Initialize Vite + React project | 0.5h |
| Configure Tailwind + theme tokens | 1h |
| Add design tokens (CSS variables) | 1h |
| Set up fonts (Syne + DM Sans) | 0.5h |
| Build reusable Button component | 1h |
| Build reusable InputField with floating labels | 2h |
| Build sticky Header with scroll behavior | 2h |
| Mobile hamburger menu | 1h |
| Dark mode toggle + hook | 2h |
| Set up ESLint + Prettier | 0.5h |
| **Total** | **~11.5h** |

---

#### 🏃 Sprint 2 (Week 2): Hero + Booking Form
**Goal**: Most important conversion sections live

| Task | Estimate |
|---|---|
| Hero section with video/image background | 3h |
| AOS.js integration + entrance animations | 1h |
| Hero inline mini-booking widget | 1.5h |
| Full booking form section | 3h |
| Real-time form validation logic | 2h |
| EmailJS integration + test submission | 1.5h |
| Form success/error states | 0.5h |
| **Total** | **~12.5h** |

---

#### 🏃 Sprint 3 (Week 3): Sections + Social Proof
**Goal**: Complete the main page content

| Task | Estimate |
|---|---|
| Services grid (3 cards) | 2h |
| Testimonials carousel (Swiper) | 2.5h |
| StarRating component | 0.5h |
| Stats counter with Intersection Observer | 2h |
| Why Us / About section | 1.5h |
| Back-to-top button | 0.5h |
| **Total** | **~9h** |

---

#### 🏃 Sprint 4 (Week 4): Contact, Footer, SEO, Accessibility
**Goal**: Production-ready with full SEO and a11y

| Task | Estimate |
|---|---|
| Map + contact section | 2h |
| Footer | 1h |
| SEO setup (react-helmet-async) | 1h |
| JSON-LD structured data | 0.5h |
| Accessibility audit (all sections) | 3h |
| ARIA labels + focus styles pass | 1h |
| Color contrast validation | 0.5h |
| **Total** | **~9h** |

---

#### 🏃 Sprint 5 (Week 5): Testing, Optimization, Deploy
**Goal**: Ship to production

| Task | Estimate |
|---|---|
| Image conversion to WebP | 1h |
| Vite build optimization (code splitting) | 1h |
| Lazy loading implementation | 1h |
| Unit tests for components | 3h |
| E2E tests with Playwright | 2h |
| Lighthouse audit + fixes | 2h |
| GitHub Actions CI/CD setup | 1.5h |
| Vercel deployment + custom domain | 1h |
| Final cross-browser testing | 1.5h |
| **Total** | **~14h** |

---

### Milestone Summary

| Milestone | Target | Deliverable |
|---|---|---|
| M1 — Foundation | End of Week 1 | Design system + header deployed to staging |
| M2 — Core Conversion | End of Week 2 | Hero + working booking form |
| M3 — Full Page | End of Week 3 | Complete page visible on staging |
| M4 — Production-ready | End of Week 4 | SEO + a11y complete |
| M5 — Launch | End of Week 5 | Live on gaadiglow.com, Lighthouse 90+ |

---

### GitHub Copilot Quick-Reference Prompts

| What to Build | Copilot Prompt |
|---|---|
| Sticky header | *"React sticky header with scroll-aware bg transition from transparent to white/blur, WhatsApp icon, Book Now CTA, mobile hamburger, Tailwind CSS"* |
| Hero section | *"React hero with looping muted video background, dark overlay, fade-up AOS, headline with colored word, inline booking widget"* |
| Floating label input | *"React input with floating label using Tailwind peer-* classes, icon adornment, neumorphic shadow, error state"* |
| Services grid | *"React 3-card pricing grid Tailwind, hover lift effect, popular badge, feature list with checkmarks, Book CTA"* |
| Testimonials | *"Swiper.js React testimonials carousel, auto-scroll, pause on hover, star ratings, avatar initials, Tailwind"* |
| Stats counter | *"React animated counter from 0 to target using requestAnimationFrame, triggered by IntersectionObserver, Tailwind"* |
| Dark mode | *"React dark mode with localStorage, system preference fallback, Tailwind dark: class strategy, sun/moon toggle"* |
| Form validation | *"JavaScript form validation for Indian phone numbers, required name, address, service selection, real-time error display"* |
| AOS integration | *"Initialize AOS.js in React App.jsx useEffect, configure once: true, duration 700, ease-out-cubic"* |

---

> **Final Note for the Implementing Developer:**
>
> Follow the sprint order strictly — the design system (Sprint 1) must be complete before any other feature is built, as all components depend on it. Use the Copilot prompts as starting points but always review generated code for accessibility, performance, and consistency with the design tokens defined in Sprint 1.
>
> Every section added should be immediately checked at 375px (iPhone SE) width and 1440px (desktop) before marking it done. Run `npm run test` before every PR. Run a Lighthouse audit at the end of every sprint.
>
> Build this like a product, not a page.
