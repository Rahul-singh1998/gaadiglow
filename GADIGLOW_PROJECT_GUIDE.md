# GADIGLOW PROJECT GUIDE

> **Version:** 1.0.0 | **Last Updated:** February 2026  
> **Purpose:** Complete technical reference for developers managing, maintaining, or extending the GaadiGlow web application.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Architecture & Folder Structure](#2-project-architecture--folder-structure)
3. [Application Flow](#3-application-flow)
4. [UI/UX & SEO Analysis](#4-uiux--seo-analysis)
5. [Local Development Setup](#5-local-development-setup)
6. [Testing Before Publishing](#6-testing-before-publishing)
7. [Pre-Release Checklist](#7-pre-release-checklist-before-any-new-version)
8. [Deployment Guide](#8-deployment-guide)
9. [How to Make Small Changes Safely](#9-how-to-make-small-changes-safely)
10. [Maintenance & Future Development Guide](#10-maintenance--future-development-guide)
11. [Virtual Environment Management](#11-virtual-environment-management)
12. [Recommendations](#12-recommendations)

---

## 1. Project Overview

### Purpose of the Application

GaadiGlow is a **professional doorstep car washing and detailing service** web application. The platform acts as the primary digital presence for the GaadiGlow brand — providing customers with service information, pricing, and a direct booking channel via WhatsApp. The site is targeted at vehicle owners in New Delhi, India who want premium car care without leaving their home.

### Target Users

- Vehicle owners in Delhi NCR (Hatchback, Sedan, SUV owners)
- Customers looking for convenient, at-home car washing services
- Mobile-first users who prefer quick WhatsApp-based booking

### Core Features and Functionality

| Feature | Description |
|---|---|
| **Hero Section** | Animated service name cycling (Foam Wash, Pressure Washing, etc.) with a direct WhatsApp booking CTA |
| **Services Section** | Three service tiers (Normal Wash, Standard Wash, Deep Wash) with tiered pricing by vehicle size |
| **How It Works** | Three-step process explanation (Book → We Come → Relax) |
| **Testimonials** | Auto-scrolling customer review carousel |
| **FAQ Section** | Accordion-based frequently asked questions |
| **CTA Section** | Full-width call-to-action with "Mobile App Coming Soon" announcement |
| **Footer** | Contact information, newsletter subscription field, and address |
| **Delete Account Page** | Standalone compliance page at `/help/delete-account` — allows users to submit an account deletion request via FormSubmit.co |
| **Dark Mode** | System-aware theme with manual toggle (light/dark) |

> **Note:** Pages for `auth`, `booking`, and `dashboard` exist in the codebase but are **not currently routed** in the application. They represent future features or a previously explored direction. The primary booking mechanism is WhatsApp.

### Technology Stack

**Frontend**
- **React 18** — UI library
- **TypeScript 5.6** — Static typing
- **Vite 5** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first CSS framework
- **shadcn/ui** — Pre-built accessible component library (built on Radix UI)
- **Radix UI** — Headless accessible primitives
- **Framer Motion** — Animation library
- **Wouter** — Lightweight client-side routing
- **TanStack Query (React Query v5)** — Server state and data fetching management
- **react-helmet** — Head/meta tag management per page
- **react-hook-form + Zod** — Form state management and schema validation
- **next-themes** — Dark mode management
- **Lucide React + React Icons** — Icon libraries
- **date-fns** — Date formatting utilities
- **Cloudinary** — External CDN for service images

**Backend (Schema Defined, Not Active in Current Workspace)**
- **Drizzle ORM** — TypeScript-first ORM
- **PostgreSQL** — Target database (via `drizzle-orm/pg-core` schema definitions)
- **drizzle-zod** — Auto-generates Zod schemas from Drizzle table definitions

**Deployment**
- **Vercel** — Hosting and CI/CD platform

**Configuration / Dev Tools**
- **PostCSS + Autoprefixer** — CSS processing
- **@tailwindcss/typography** — Prose styling plugin
- **Font Awesome 6** (CDN) — Icon set used in layout

---

## 2. Project Architecture & Folder Structure

### Root-Level Files

```
gaadiglow-2.0/
├── package.json           # Project metadata, scripts, all dependencies
├── tsconfig.json          # TypeScript compiler configuration and path aliases
├── vite.config.ts         # Vite build config: aliases, entry root, output dir
├── tailwind.config.ts     # Tailwind theme, dark mode, custom colors, animations
├── postcss.config.js      # PostCSS pipeline (Tailwind + Autoprefixer)
├── components.json        # shadcn/ui component configuration
├── vercel.json            # Vercel deployment config: SPA rewrite rules
├── robots.txt             # Search engine crawler directives
└── README.md              # Basic project readme
```

**Key root-file notes:**
- `vite.config.ts`: Sets `root` to `./client`, output to `../dist`, and registers the `@` path alias pointing to `./client/src`.
- `tsconfig.json`: Defines two path aliases — `@/*` → `./client/src/*` and `@shared/*` → `./shared/*`.
- `vercel.json`: All URL patterns rewrite to `/index.html` — this is essential for client-side routing (SPA behavior) on Vercel.
- `robots.txt`: Allows all crawlers on public pages, disallows `/shared` and `/.git`. Points sitemap to `https://www.gaadiglow.com/`.

---

### `client/` — Frontend Application

```
client/
├── index.html             # App shell: meta tags, Open Graph, favicon links, Google Ads tag, JSON-LD schema
├── public/
│   ├── favicon/           # Favicon variants (ico, png 16x16, 32x32, apple-touch) + site.webmanifest
│   ├── general/           # General static assets (e.g., header_icon.png — currently commented out)
│   └── images/            # Testimonial reviewer photos (rohan_singh.jpg, ujwal_king.jpg, etc.)
└── src/
    ├── main.tsx            # React entry point — mounts App inside ThemeProvider
    ├── App.tsx             # Root component — sets up QueryClient, routing, global layout
    ├── index.css           # Global CSS: Tailwind directives + CSS custom properties (design tokens)
    ├── components/         # All reusable React components
    ├── constants/          # Static configuration data
    ├── hooks/              # Custom React hooks
    ├── lib/                # Utility functions and non-UI helpers
    └── pages/              # Page-level components (one per route)
```

---

### `client/src/` — Detailed Breakdown

#### Entry & Root Files

| File | Role |
|---|---|
| `main.tsx` | React bootstrap: wraps `<App>` in `<ThemeProvider>` with `defaultTheme="system"` and `storageKey="gaadiglow-theme"` |
| `App.tsx` | Global layout wrapper: `QueryClientProvider` → `TooltipProvider` → sticky flex layout with `<Header>`, `<main>/<Router>`, `<Footer>`, `<Toaster>` |
| `index.css` | Tailwind base/components/utilities, CSS variables for the entire design system (colors, radii, dark mode overrides) |

#### `pages/` — Route-Level Components

| File | Route | Purpose |
|---|---|---|
| `home-page.tsx` | `/` | Composes all home sections. Sets `<Helmet>` with title and meta description + OG tags |
| `delete-account-page.tsx` | `/help/delete-account` | GDPR/compliance page. Submits deletion request via `formsubmit.co` API to `gaadiglow@gmail.com` |
| `not-found.tsx` | Fallback (`<Route component={NotFound}>`) | 404 page |
| `auth-page.tsx` | *(unrouted)* | Login/Register forms using `react-hook-form` + Zod, connected to `useAuth()` hook |
| `booking-page.tsx` | *(unrouted)* | Multi-field booking form with real-time state management. Submits via `POST /api/bookings` |
| `dashboard-page.tsx` | *(unrouted)* | Authenticated user dashboard with two tabs: Booking History + Profile |

#### `components/layout/` — Global Layout

| File | Role |
|---|---|
| `header.tsx` | Sticky header with scroll-aware background blur, brand logo (linking to `gaadiglow.com`), desktop nav, theme toggle, mobile hamburger. Smooth-scrolls to page sections via `scrollToSection()` utility |
| `footer.tsx` | Dark footer with brand description, contact info (address, phone, email), newsletter subscribe input, and quick links |
| `mobile-menu.tsx` | Slide-in menu for mobile (`<768px`) with the same section-scroll navigation as desktop header |

#### `components/home/` — Homepage Sections

| File | Section ID | Content |
|---|---|---|
| `hero-section.tsx` | *(no id)* | Full-width gradient hero with animated service name cycling (Framer Motion `AnimatePresence`), WhatsApp booking button, Cloudinary hero image |
| `services-section.tsx` | `#services` | 3 service cards (Normal, Standard, Deep Wash) with tiered pricing table per vehicle category, feature lists, and Cloudinary images |
| `how-it-works.tsx` | `#how-it-works` | 3-step process cards with Font Awesome icons and Framer Motion scroll-triggered stagger animation |
| `testimonials.tsx` | `#testimonials` | Auto-scrolling horizontal customer review carousel with pause-on-hover, local testimonial images from `public/images/` |
| `cta-section.tsx` | *(no id)* | Full-width gradient CTA section — "Mobile App Coming Soon" announcement with Cloudinary background image |
| `faq-section.tsx` | *(no id)* | 8 FAQs rendered using Radix UI `Accordion` with Framer Motion viewport-triggered animation |

#### `components/booking/` — Booking Form (Unrouted)

| File | Role |
|---|---|
| `booking-form.tsx` | Multi-step form: service selection, date picker, time slot, location, vehicle type/model |
| `booking-summary.tsx` | Live preview panel showing selected service, price, date/time, and vehicle info |

#### `components/dashboard/` — Dashboard (Unrouted)

| File | Role |
|---|---|
| `booking-history.tsx` | Fetches `GET /api/bookings` via React Query, renders booking cards with status badges and formatted dates |
| `profile-section.tsx` | Displays user profile info with option to trigger account deletion flow |

#### `components/ui/` — shadcn/ui Component Library

Contains 40+ pre-built accessible components (accordion, button, card, dialog, form, input, select, tabs, toast, etc.). These are generated/managed via the shadcn/ui CLI and should generally **not be manually edited**.

#### `constants/`

| File | Content |
|---|---|
| `serviceImages.ts` | Exports `SERVICE_IMAGES` — Cloudinary URLs for Normal, Standard, and Deep Wash images with auto-format, auto-quality, DPR-aware transformations |

#### `hooks/`

| File | Role |
|---|---|
| `use-auth.tsx` | `AuthContext` + `AuthProvider` — manages user session state via React Query (`GET /api/user`), exposes `loginMutation`, `registerMutation`, `logoutMutation` |
| `use-mobile.tsx` | Media query hook returning `true` when viewport is `<768px` |
| `use-toast.ts` | Toast notification state management (works with the `<Toaster>` component) |

#### `lib/`

| File | Role |
|---|---|
| `queryClient.ts` | Configures `QueryClient` with global defaults (no refetch on focus/interval, `staleTime: Infinity`). Exports `apiRequest()` for typed `fetch` calls (includes credentials) and `getQueryFn()` factory for query functions |
| `protected-route.tsx` | HOC wrapping `<Route>` that redirects unauthenticated users to `/auth` and shows a spinner during auth loading |
| `utils.ts` | `cn()` — className merger (clsx + tailwind-merge). `scrollToSection()` — smooth-scrolls to a DOM element by ID with header offset compensation |

---

### `shared/` — Shared Types and Schema

```
shared/
└── schema.ts    # Drizzle ORM table definitions + Zod schemas + TypeScript types
```

**`schema.ts` defines:**
- `users` table: `id`, `username` (unique), `password`
- `bookings` table: `id`, `userId` (FK → users), `service`, `date`, `time`, `location`, `vehicleType`, `vehicleModel`, `price`, `status` (default: `"Upcoming"`), `createdAt`
- Zod insert schemas via `drizzle-zod`: `insertUserSchema`, `insertBookingSchema`
- TypeScript types: `User`, `InsertUser`, `Booking`, `InsertBooking`

> This schema drives both client-side form validation and (when a backend is connected) the PostgreSQL database structure.

---

## 3. Application Flow

### How the App Starts (Entry Point)

1. Browser loads `client/index.html` — sets base meta tags, loads Font Awesome CDN, fires Google Ads gtag, includes JSON-LD `WebSite` schema
2. Vite loads `src/main.tsx` — mounts React root inside `<div id="root">`
3. `main.tsx` renders `<ThemeProvider>` (persists theme to `localStorage` under key `gaadiglow-theme`)
4. Inside `ThemeProvider`, `<App>` renders:
   - `<QueryClientProvider>` — makes TanStack Query available globally
   - `<TooltipProvider>` — Radix tooltip context
   - Flex column layout: `<Header>` → `<main>` (flex-grow) → `<Footer>`
   - `<Toaster>` — global toast notifications

### Request / Response Flow

```
User Action
    │
    ▼
React Component (e.g., BookingHistory)
    │
    ▼
TanStack Query (useQuery / useMutation)
    │  queryKey: ["/api/bookings"]
    ▼
apiRequest() or getQueryFn() in queryClient.ts
    │  fetch() with credentials: "include"
    ▼
Backend API (Not present in current workspace)
    │  Expected at same origin: /api/*
    ▼
Response JSON → queryClient cache → component re-render
```

**Current state:** For the live site, the WhatsApp CTA is the primary booking mechanism. The API-dependent features (auth, booking, dashboard) require a backend server that is not deployed.

### Component / Page Lifecycle

- `main.tsx` → `App.tsx` (always rendered)
- `Header` and `Footer` are always visible regardless of route
- Route changes are handled client-side by `wouter` — no full page reload
- Per-page `<Helmet>` tags from `react-helmet` update `<title>` and meta on route change

### Data Flow Between Frontend and Backend

- All API calls are routed through `apiRequest()` in `lib/queryClient.ts`
- All queries use `getQueryFn()` which handles 401 responses based on context
- User session state lives in TanStack Query cache under key `["/api/user"]`
- After mutations, `queryClient.setQueryData()` or `queryClient.invalidateQueries()` keeps the cache consistent

### State Management

| State Type | Mechanism |
|---|---|
| Server/async state | TanStack Query (`useQuery`, `useMutation`) |
| Auth state | `AuthContext` (React Context, backed by React Query) |
| UI/local state | `useState` within components |
| Theme preference | `next-themes` → `localStorage` |
| Form state | `react-hook-form` with Zod resolvers |
| Toast notifications | `use-toast` hook + Radix UI Toast |

### Build Process Overview

```
npm run build
    │
    ▼
Vite reads vite.config.ts
    │  root: "./client"
    ▼
TypeScript compiled (tsc via Vite's esbuild pipeline)
    │
    ▼
Tailwind CSS purged and minified
    │
    ▼
React code tree-shaken and bundled
    │
    ▼
Output written to: ../dist/
    │  (relative to client/ → project root /dist)
    ▼
dist/ contains: index.html + hashed JS/CSS chunks + public assets
```

---

## 4. UI/UX & SEO Analysis

### Modern UI Practices

- **Component-driven architecture** — each section is an isolated component
- **Design tokens** — all colors, radii, and spacing use CSS custom properties defined in `index.css`, referenced by Tailwind's config. Dark mode is fully supported via `.dark` class token overrides
- **Framer Motion animations** — entrance animations on scroll (`whileInView`), stagger effects on card groups, hero text cycling with `AnimatePresence`
- **Accessible primitives** — all interactive components (accordion, dialog, select, etc.) are built on Radix UI, which handles ARIA attributes, keyboard navigation, and focus management
- **Card-based layout** — services, testimonials, and process steps use consistent `<Card>` containers
- **Sticky header** — changes opacity/backdrop-blur on scroll for a polished glassmorphism effect

### Responsiveness Strategy

- **Mobile-first** — Tailwind classes target mobile by default, with `md:` and `lg:` breakpoints for larger screens
- **Breakpoints used:** `sm` (640px), `md` (768px), `lg` (1024px)
- **Mobile navigation:** Desktop nav is `hidden md:flex`; hamburger with `MobileMenu` is `block md:hidden`
- **Grid layouts:** Services (`grid-cols-1 md:grid-cols-3`), footer (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Viewport meta:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">` prevents zoom quirks on mobile
- **PWA manifest:** `site.webmanifest` enables add-to-home-screen on mobile browsers

### Accessibility Considerations

- Radix UI components provide full keyboard navigation and screen-reader support
- `aria-label` attributes on icon-only buttons (hamburger menu: `aria-label="Open menu"/"Close menu"`)
- Semantic HTML elements: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<h1>`–`<h3>` hierarchy
- `alt` text on all images
- Sufficient color contrast via design token system (light/dark modes)
- Focus visible states provided by Radix UI defaults

### SEO Implementation

#### Meta Tags
- **Base HTML** (`index.html`): `<title>`, `<meta name="description">`, `og:site_name`, `og:title`
- **Per-page** (via `react-helmet`):
  - Home: "GaadiGlow - Your Car, Our Care" + full description + OG equivalents
  - Auth: "Login or Register - GaadiGlow"
  - Booking: "Book Your Car Wash - GaadiGlow"
  - Dashboard: "My Dashboard - GaadiGlow"
  - Delete Account: "Request Account Deletion - GaadiGlow"

#### Structured Data
- JSON-LD `WebSite` schema in `index.html`:
  ```json
  { "@context": "https://schema.org", "@type": "WebSite", "name": "GaadiGlow", "url": "https://www.gaadiglow.com" }
  ```

#### Semantic Structure
- Page sections use `<section>` tags with `id` attributes (`#services`, `#how-it-works`, `#testimonials`, `#contact`) enabling anchor linking and crawlability
- `<h1>` is correctly placed in the hero section ("Your Car, Our Care")
- `<h2>` headings on each section ("How GaadiGlow Works", "Frequently Asked Questions", etc.)

#### Performance Factors
- **Images via Cloudinary CDN** with `f_auto,q_auto,dpr_auto` transforms (auto-format, auto-quality, device-pixel-ratio aware)
- **Vite code splitting** — JS output is hashed and chunked for optimal browser caching
- **Tailwind CSS purging** — only used utility classes are included in the production build
- **Font Awesome via CDN** — external dependency that adds a render-blocking stylesheet (see Recommendations)
- **Google Analytics (gtag)** loaded with `async` attribute at the bottom of `<body>` to minimize render-blocking impact

#### URL Structure
- `/` — Home
- `/help/delete-account` — Compliance/legal page
- `robots.txt` — Disallows `/shared` and `/.git`, sitemap points to `https://www.gaadiglow.com/`

#### Keyword Readiness
- Primary keywords present in headings and body: "doorstep car wash", "mobile car wash", "professional car wash", "car detailing", "car wash Delhi"
- Service names (Normal Wash, Standard Wash, Deep Wash, Foam Wash) repeated across headings and content

---

## 5. Local Development Setup

### Required Software

| Software | Minimum Version | Notes |
|---|---|---|
| **Node.js** | v18.x or higher | LTS recommended. Includes `npm` |
| **npm** | v9.x or higher | Comes with Node.js |
| **Git** | Any recent version | For cloning/version control |
| A code editor | — | VS Code recommended |

### Step-by-Step Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd gaadiglow-2.0
```

**2. Install dependencies**
```bash
npm install
```
This installs all packages listed in `package.json` (both `dependencies` and `devDependencies`).

**3. Environment variables**

This is a **frontend-only** static application in its current deployed state. There is no `.env` file required to run the client.

If connecting a backend in the future, create a `.env` file at the project root:
```env
# Example (not currently in use)
DATABASE_URL=postgresql://user:password@localhost:5432/gaadiglow
SESSION_SECRET=your-secret-key
```

> Never commit `.env` files to version control. Add `.env` to `.gitignore`.

**4. Start the development server**
```bash
npm run dev
```
Vite starts a local dev server (default: `http://localhost:5173`). Hot Module Replacement (HMR) is enabled — changes to source files reflect instantly in the browser.

**5. Preview production build locally**
```bash
npm run build
npm run preview
```
Builds the production output to `/dist` and serves it locally for final testing before deploying.

---

## 6. Testing Before Publishing

### Functional Testing Checklist

- [ ] Home page loads fully without console errors
- [ ] All 6 home sections render correctly (Hero, Services, How It Works, Testimonials, CTA, FAQ)
- [ ] WhatsApp booking button opens `https://wa.me/917800800122` with pre-filled message
- [ ] FAQ accordion opens/closes each question correctly
- [ ] testimonials carousel scrolls automatically and pauses on hover
- [ ] Dark mode toggle switches theme and persists on page reload
- [ ] Delete Account page (`/help/delete-account`) loads and form submits correctly
- [ ] 404 page renders for unknown routes
- [ ] Header scroll behavior (background blur) triggers on scroll
- [ ] Mobile navigation menu opens, shows all links, and closes on selection

### UI Testing (Device/Viewport)

- [ ] **Mobile** (320px–480px): Hero CTA button full-width, hamburger nav functional, no horizontal overflow
- [ ] **Tablet** (768px–1024px): Two-column grid layouts correct, nav transitions to desktop
- [ ] **Desktop** (1280px+): Three-column service cards, testimonials carousel full-width
- [ ] Verify hero section image loads from Cloudinary
- [ ] Service section images load (Normal, Standard, Deep Wash)
- [ ] Testimonial reviewer photos load from `public/images/`

### SEO Checks

- [ ] `<title>` tags are correct per page (check via browser tab)
- [ ] `<meta name="description">` validates in browser DevTools → Elements
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:site_name`)
- [ ] JSON-LD `WebSite` schema is parseable (validate at [schema.org validator](https://validator.schema.org/))
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `site.webmanifest` accessible at `/favicon/site.webmanifest`
- [ ] All images have descriptive `alt` text
- [ ] No broken anchor links within the page

### Performance Testing

- [ ] Run Lighthouse (Chrome DevTools → Lighthouse → Mobile) — target: Performance ≥ 85
- [ ] Verify Cloudinary images are served in `webp`/`avif` format (check Network tab)
- [ ] No render-blocking resources above the fold (except Font Awesome CDN)
- [ ] JavaScript bundle sizes reviewed in build output (`npm run build`)

### Console / Network Error Checks

- [ ] Open Chrome DevTools → Console — zero errors on page load
- [ ] Network tab — all fetch requests respond (no 404s for images or fonts)
- [ ] No CORS errors
- [ ] Font Awesome CDN loads successfully

### Build Verification

- [ ] `npm run build` completes without TypeScript errors
- [ ] `dist/` folder is generated with `index.html` and hashed assets
- [ ] `npm run preview` serves the production build correctly locally

---

## 7. Pre-Release Checklist (Before Any New Version)

### Versioning Best Practices

- Update `"version"` in `package.json` following **Semantic Versioning** (SemVer):
  - `PATCH` (1.0.1): Bug fixes, copy changes
  - `MINOR` (1.1.0): New section, new feature, non-breaking change
  - `MAJOR` (2.0.0): Complete redesign or breaking structural change
- Commit with a descriptive message: `git commit -m "chore: bump version to 1.1.0"`
- Tag releases in Git: `git tag v1.1.0`

### Environment Verification

- [ ] Confirm `vercel.json` rewrite rules are still correct for new routes (if any added)
- [ ] Confirm `tsconfig.json` path aliases are correct
- [ ] Confirm Cloudinary image URLs in `serviceImages.ts` and `hero-section.tsx` are valid

### Backup Considerations

- The project is version-controlled via Git — ensure all changes are committed and pushed before deploying
- If a database is connected: take a PostgreSQL dump before any migration

### Database Considerations

- A database schema is defined in `shared/schema.ts` (users, bookings tables)
- Currently no active backend or database is deployed
- If activating: use Drizzle's `drizzle-kit push` or migration commands to apply schema — test on a staging database first

### Security Checks

- [ ] No secrets or API keys hardcoded in client-side code
- [ ] Google Ads tag `AW-17372217201` in `index.html` — verify it belongs to the correct account
- [ ] Any new environment variables are in `.env`, not committed to Git
- [ ] `credentials: "include"` in `apiRequest()` — only necessary when a backend with sessions is active

### Dependency Audit

```bash
npm audit
```
- Review and resolve any `high` or `critical` severity vulnerabilities before releasing
- Update patch versions: `npm update`
- Test after updates — particularly Framer Motion, Radix UI, or TanStack Query version bumps

### SEO Impact Review

- [ ] No `<title>` or `<meta name="description">` regressions on existing pages
- [ ] New pages have correct `<Helmet>` entries
- [ ] New routes are not accidentally blocked in `robots.txt`
- [ ] Sitemap URL in `robots.txt` is correct

---

## 8. Deployment Guide

### Build Process

```bash
npm run build
```
- Reads `vite.config.ts`: root is `./client`, output dir is `../dist`
- TypeScript checked, React code compiled via esbuild
- Tailwind CSS purged, assets fingerprinted
- Output: `dist/` at project root

### Production Configuration

No `.env` file is required for the current frontend-only deployment.

The following are hardcoded and must be reviewed before each release:
- WhatsApp link: `https://wa.me/917800800122` (in `hero-section.tsx`)
- Cloudinary base URL: `https://res.cloudinary.com/daeobjgd0/` (in `serviceImages.ts` and inline in `hero-section.tsx`, `cta-section.tsx`)
- FormSubmit email: `gaadiglow@gmail.com` (in `delete-account-page.tsx`)
- Google Ads tag: `AW-17372217201` (in `client/index.html`)
- Contact phone: `+917800800122` (in `footer.tsx` and `hero-section.tsx`)

### Deployment Steps (Vercel)

**Automatic deployment (recommended):**
1. Push changes to the connected Git branch (typically `main`)
2. Vercel detects the push, triggers an automatic build using `npm run build`
3. Output directory `dist` is deployed globally via Vercel's CDN
4. Preview deployments are generated for non-main branches automatically

**Manual deployment:**
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy to production
vercel --prod
```

**Vercel project settings to verify:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: Vite
- Rewrites: all `/*` → `/index.html` (defined in `vercel.json`)

### Environment Variables for Production

Currently none are required. If a backend is added:
- Set environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**
- Mark them as `Production` only (not exposed to preview unless needed)

### Post-Deployment Validation

- [ ] Visit `https://www.gaadiglow.com` — confirms production deployment
- [ ] Check all sections load (Hero, Services, FAQ, etc.)
- [ ] Test WhatsApp CTA button opens correct link
- [ ] Test `/help/delete-account` route loads
- [ ] Test an unknown route shows 404 page
- [ ] Dark mode toggle works
- [ ] Run Lighthouse on production URL

---

## 9. How to Make Small Changes Safely

### Locating the Correct File

| Change Type | File to Edit |
|---|---|
| Hero text or WhatsApp number | `client/src/components/home/hero-section.tsx` |
| Service names, prices, or features | `client/src/components/home/services-section.tsx` |
| Service images (Cloudinary URLs) | `client/src/constants/serviceImages.ts` |
| FAQ questions and answers | `client/src/components/home/faq-section.tsx` |
| Testimonials (names, text, photos) | `client/src/components/home/testimonials.tsx` |
| "How It Works" steps | `client/src/components/home/how-it-works.tsx` |
| CTA section content | `client/src/components/home/cta-section.tsx` |
| Footer contact info / address | `client/src/components/layout/footer.tsx` |
| Header navigation items | `client/src/components/layout/header.tsx` |
| Page `<title>` and meta description | Respective `pages/*.tsx` file (`<Helmet>` tags) |
| Global colors / design tokens | `client/src/index.css` (CSS variables) |
| Global fonts, breakpoints | `tailwind.config.ts` |
| Site-wide favicon | `client/public/favicon/` |
| HTML-level meta or scripts | `client/index.html` |

### Making UI / Content Changes

1. Open the target file (see table above)
2. Edit only the specific text string, URL, or value
3. Avoid modifying surrounding JSX structure unless intentional
4. Save the file — Vite HMR will update the browser immediately

### Testing Locally

```bash
npm run dev
```
- Open `http://localhost:5173`
- Verify the change visually across mobile and desktop viewport widths

### Rebuilding

```bash
npm run build
npm run preview
```
- Confirm the production build reflects the change
- No TypeScript errors in the build output

### Verifying Impact

- [ ] The changed section renders correctly
- [ ] No adjacent sections are broken
- [ ] Console is clean (no errors)
- [ ] Mobile layout still correct (resize browser or use DevTools device mode)

### Deploying Safely

```bash
git add <changed-file>
git commit -m "content: update service prices in services-section"
git push origin main
```
Vercel auto-deploys on push to `main`. Monitor the Vercel dashboard for build status.

---

## 10. Maintenance & Future Development Guide

### Onboarding a New Developer

1. Read this document fully
2. Clone the repo and run `npm install && npm run dev`
3. Browse the live site at `https://www.gaadiglow.com`
4. Read `client/src/App.tsx` (routing and global layout)
5. Read `client/src/pages/home-page.tsx` (understand page composition)
6. Read `client/src/components/home/` files (understand each section)
7. Read `shared/schema.ts` (understand the data model)
8. Read `client/src/hooks/use-auth.tsx` and `lib/queryClient.ts` for API patterns

### Key Areas to Understand First

| Area | Why it matters |
|---|---|
| `App.tsx` | Defines global layout and all routes |
| `index.css` | All design token changes affect the entire site |
| `tailwind.config.ts` | Custom colors / animations must be registered here |
| `shared/schema.ts` | Any future backend integration must align with these types |
| `vercel.json` | SPA rewrites — must be updated when adding new routes |
| `queryClient.ts` | All API calls follow this pattern |

### Risk-Sensitive Parts of the Project

| Area | Risk | Caution |
|---|---|---|
| `client/index.html` | Google Ads tag, JSON-LD, base meta | Wrong changes affect SEO and ad tracking globally |
| `vercel.json` | SPA rewrite rules | Incorrect rewrites break all client-side routing in production |
| `index.css` | CSS custom properties | Changing a variable affects every component using that token |
| `shared/schema.ts` | Database schema | Any future changes require matching DB migrations |
| WhatsApp phone number in `hero-section.tsx` | Primary booking channel | Test after any change |
| Cloudinary URLs | Image delivery | Broken URLs remove all service images |

### Recommended Workflow for New Features

1. **Create a feature branch:** `git checkout -b feature/new-section-name`
2. **Develop locally:** `npm run dev`
3. **Test thoroughly** — see Section 6 checklist
4. **Build and preview:** `npm run build && npm run preview`
5. **Open a pull request** for peer review before merging to `main`
6. **Merge to main only when build passes** — Vercel preview deployments let you verify before merging

**When adding a new page:**
- Create `client/src/pages/your-page.tsx` with a `<Helmet>` block
- Add a `<Route path="/your-path" component={YourPage} />` in `App.tsx`
- Ensure `vercel.json` rewrites still cover the new path (the current wildcard `/(.*) → /index.html` already handles all paths)

**When adding a new UI component:**
- Use the shadcn/ui CLI for new primitives: `npx shadcn-ui@latest add <component>`
- Custom, project-specific components go in `components/home/`, `components/layout/`, or a new folder

---

## 11. Virtual Environment Management

This project is a **Node.js / npm project**. There is no Python virtual environment. The equivalent concept in Node.js is the `node_modules/` directory managed by `npm`.

### Dependency Management

**Install all dependencies (fresh clone or after `package.json` changes):**
```bash
npm install
```

**Add a new runtime dependency:**
```bash
npm install <package-name>
```

**Add a new dev dependency:**
```bash
npm install --save-dev <package-name>
```

**Remove a dependency:**
```bash
npm uninstall <package-name>
```

**View outdated packages:**
```bash
npm outdated
```

**Update all packages to latest compatible versions:**
```bash
npm update
```

**Pin exact versions (generate/update `package-lock.json`):**
The `package-lock.json` file serves the same role as a Python `requirements.txt` with pinned versions. Always commit it.

**Audit for security vulnerabilities:**
```bash
npm audit
npm audit fix   # auto-fix safe patches
```

**Reproduce an exact environment on another machine:**
```bash
npm ci
```
`npm ci` installs exactly the versions in `package-lock.json` — recommended for CI/CD pipelines and production builds.

---

## 12. Recommendations

The following are high-level suggestions only. No code changes are implied or required at this time.

### Performance

- **Replace Font Awesome CDN with Lucide React or React Icons** — Font Awesome is loaded as a render-blocking external stylesheet. The project already has `lucide-react` and `react-icons` installed; migrating the few Font Awesome icon usages (header/footer `<i className="fas ...">`) would eliminate this external dependency and improve Lighthouse performance score.
- **Self-host or lazy-load images in `public/images/`** — Testimonial photos are served from the local `public/images/` directory without Cloudinary optimization. Consider uploading them to Cloudinary and applying the same `f_auto,q_auto,dpr_auto` transform used for service images.
- **Add `loading="lazy"` to below-the-fold images** — Particularly testimonial reviewer photos and the CTA background image, to defer loading until needed.

### SEO

- **Add `og:image` meta tag** — No Open Graph image is currently set. Adding a branded OG image to `index.html` (and per-page in `<Helmet>`) would improve link preview appearance on WhatsApp, Facebook, and LinkedIn shares — directly relevant given WhatsApp is the primary booking channel.
- **Fix `site.webmanifest` typo** — The `"name"` field reads `"GaadiGloe"` (missing letter 'w'). It should be `"GaadiGlow"`.
- **Add `LocalBusiness` JSON-LD schema** — The current JSON-LD only declares a `WebSite` type. Adding a `LocalBusiness` schema with address, phone, and service area would improve Google local search visibility for the Delhi NCR service area.
- **Add a proper XML sitemap** — `robots.txt` points to `https://www.gaadiglow.com/` as the sitemap, but the URL should point to a `sitemap.xml` file. A sitemap listing all public pages (home, delete-account) helps search engines index the site efficiently.

### UI Improvement

- **Activate social media links in footer** — The social media icon links are commented out in `footer.tsx`. Once GaadiGlow's social profiles are live, enabling these improves brand discoverability.
- **Add `og:image` visual consistency** — The header logo uses an inline text render (`Gaadi<span>Glow</span>`). A commented-out `<img>` tag for a header icon exists. When the icon design is finalized, enabling it provides a more polished brand experience.
- **Uncomment star rating display in hero** — A star rating block (`4.8/5, 2.3k+ reviews`) is commented out in `hero-section.tsx`. When review data is established, social proof directly in the hero is a high-impact conversion element.

### Maintainability

- **Move hardcoded contact data to a constants file** — The phone number (`+917800800122`), email (`gaadiglow@gmail.com`), and address appear in multiple components (`hero-section.tsx`, `footer.tsx`, `delete-account-page.tsx`). Centralizing these in a `constants/contact.ts` file would make future updates a single-file change.
- **Document unrouted pages** — `auth-page.tsx`, `booking-page.tsx`, and `dashboard-page.tsx` are unrouted but maintained in the codebase. Adding a brief comment at the top of each file explaining their status ("planned feature, currently unrouted") prevents confusion for new developers.
- **Consider a staging environment** — Currently all Vercel deployments to `main` go directly to production. Setting up a `staging` or `develop` branch with a separate Vercel preview URL would allow final QA before production release.
