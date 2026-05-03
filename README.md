# AutoFunnel Labs

A modern, dark-themed marketing SaaS website built with React + Vite. Features GSAP scroll animations, interactive 3D elements, a live countdown webinar timer, and a fully tabbed pricing system across five service categories.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| GSAP + ScrollTrigger | 3.15 | Animations & scroll effects |
| Tailwind CSS | 3 | Utility-first styling |
| PostCSS + Autoprefixer | — | CSS processing |

**Fonts (Google Fonts CDN)**
- `Space Grotesk` — headlines
- `Inter` — body text
- `JetBrains Mono` — monospace / labels
- `Material Symbols Outlined` — icons

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone or unzip the project
cd autofunnel-labs

# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
autofunnel-labs/
├── public/
│   └── assets/
│       └── logo.png          ← Place your logo here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Shared navigation (desktop + mobile drawer)
│   │   └── Footer.jsx        ← Shared footer
│   ├── pages/
│   │   ├── Home.jsx          ← Landing page (/)
│   │   ├── Pricing.jsx       ← Plans page (/pricing)
│   │   ├── Ads.jsx           ← Facebook & Google Ads page (/ads)
│   │   └── Webinar.jsx       ← Live webinar page with timer (/webinar)
│   ├── styles/
│   │   └── globals.css       ← Global CSS, custom classes, keyframe animations
│   ├── App.jsx               ← Router setup + layout wrapper
│   └── main.jsx              ← React root (StrictMode disabled — see note below)
├── tailwind.config.js        ← Custom theme (colors, fonts)
├── postcss.config.js
├── vite.config.js
└── index.html                ← Google Fonts + Material Symbols loaded here
```

---

## Pages

### `/` — Home
Full marketing landing page with:
- **Hero** — animated headline reveal + interactive 3D rotating layer stack (mouse-tracked)
- **Problem section** — sticky text with scrolling lead-drop cards
- **Solution section** — animated SVG pipeline: Generate → Manage → Automate → Convert
- **System breakdown** — scroll-triggered step lines with active dot highlighting
- **Metrics** — animated number counters (100%, 312%, <2 sec)
- **Webinar CTA** — register section

### `/pricing` — Plans
Tabbed pricing system with Shape Odyssey-style navigation:

| Tab | One-time Plans | Monthly Retainer |
|---|---|---|
| Funnels | Core System · Growth Engine · Kinetic Conduit | Funnel Maintenance |
| Facebook Ads | Ad Launch · Ad Accelerator | Facebook Ads Management |
| Google Ads | Search Launch · Full Funnel Search | Google Ads Management |
| Website | Launch Site · Authority Site | Website Maintenance |

Pricing is currently placeholder (`₹ —,———`). See **Updating Pricing** below.

### `/ads` — Ads Services
- Hero with CTAs
- Results strip (avg ROAS, CPL, CPC, time-to-results)
- Facebook & Instagram Ads — platform capabilities + 6 service cards
- Google Ads — intent-based breakdown + 6 service cards
- Facebook vs Google side-by-side comparison table
- 4-step engagement process
- CTA to webinar

### `/webinar` — Live Webinar
- **Live countdown timer** — auto-calculates time until next Sunday 4:00 PM IST, resets weekly
- Session agenda (6 timed slots: Welcome → Funnels → Facebook Ads → Google Ads → Website Services → Q&A)
- Services showcase
- Registration form (Name, Email, WhatsApp, interest checkboxes)

---

## Updating Pricing

All pricing lives in the `categories` array at the top of `src/pages/Pricing.jsx`.

Find the plan you want to update and change the `price` field:

```js
// Placeholder
price: "₹ —,———",

// Real price
price: "₹ 15,000",
```

Also update `period` if needed:
```js
period: "one-time",    // for one-time builds
period: "/ month",     // for retainers
```

To remove the "Pricing coming soon" badge from a card, delete this block inside the `PlanCard` component:

```jsx
<div className="mt-2 inline-flex items-center gap-2 bg-white/[0.04] ...">
  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></span>
  <span className="font-mono text-[9px] ...">Pricing coming soon</span>
</div>
```

---

## Customisation

### Brand Colors
Edit `tailwind.config.js`:

```js
colors: {
  background:       "#050505",
  surface:          "#0a0a0a",
  "surface-raised": "#121212",
  primary:          "#00F5FF",   // cyan — main accent
  secondary:        "#8A2BE2",   // purple — secondary accent
  "text-main":      "#FAFAFA",
  "text-muted":     "#A1A1AA",
  "text-dim":       "#52525B",
}
```

### Logo
Place your logo at `public/assets/logo.png`. The Navbar already references `/assets/logo.png`.

### Webinar Day & Time
Edit `getNextSunday4PMIST()` in `src/pages/Webinar.jsx`:

```js
// Change target day (0 = Sunday, 1 = Monday ... 6 = Saturday)
const daysUntilSunday = day === 0 ? 0 : 7 - day;

// Change target time — 24h format (16 = 4 PM)
target.setHours(16, 0, 0, 0);
```

### Webinar Session Label
Update the static display text in `src/pages/Webinar.jsx`:
```jsx
<span>Next Session: Thu, 2:00 PM EST</span>
```

---

## Adding a New Page

1. Create `src/pages/YourPage.jsx`
2. Add the route in `src/App.jsx`:

```jsx
import YourPage from "./pages/YourPage";

<Route path="/your-path" element={<YourPage />} />
```

3. Add nav links in `src/components/Navbar.jsx` — follow the existing active-state pattern:

```jsx
// Add to isActive variables
const isYourPage = location.pathname === "/your-path";

// Add in desktop nav
<Link
  className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
    isYourPage ? "text-primary" : "text-text-muted hover:text-white"
  }`}
  to="/your-path"
>
  Your Page
</Link>
```

---

## Important Notes

### React StrictMode is Disabled

`src/main.jsx` intentionally does **not** use `<React.StrictMode>`. StrictMode double-invokes `useEffect` in development, which causes GSAP to run twice — setting elements to `opacity: 0` on the first pass and leaving them stuck there when cleanup kills the tweens. Removing StrictMode makes GSAP behave identically to the original plain-HTML implementation.

### GSAP Animation Pattern

All scroll-triggered elements that need to start hidden use inline `style={{ opacity: 0 }}` in JSX rather than Tailwind classes like `opacity-0`. This is because GSAP sets styles via inline overrides — if Tailwind's class is also setting the same property, a specificity conflict can leave elements invisible after animation. Inline styles always win, so GSAP can cleanly take full control.

```jsx
// Correct — GSAP can override this
<div style={{ opacity: 0 }}>...</div>

// Avoid for animated elements — Tailwind class may fight GSAP
<div className="opacity-0">...</div>
```

### Fonts are in `index.html`

Google Fonts and Material Symbols load from `<link>` tags in `index.html`, not from CSS `@import`. This gives better performance and avoids a flash of unstyled text.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot module replacement |
| `npm run build` | Build optimised production bundle → `/dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

After `npm run build`, the `dist/` folder is a fully static site deployable anywhere:

**Vercel** — connect the repo, Vite is auto-detected. All routing handled automatically.

**Netlify** — drag and drop `dist/`, or connect the repo with build command `npm run build` and publish directory `dist`. Add a `public/_redirects` file for client-side routing:
```
/*    /index.html   200
```

**Cloudflare Pages** — build command: `npm run build`, output directory: `dist`.

> React Router uses client-side routing — your host must redirect all paths to `index.html`. Vercel and Cloudflare Pages do this automatically. Netlify requires the `_redirects` file above.