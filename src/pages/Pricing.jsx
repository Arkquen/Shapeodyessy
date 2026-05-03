import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────
const categories = [
  {
    id: "funnels",
    label: "Funnels",
    icon: "filter_alt",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Core System",
        tag: "Basic Funnel",
        tagColor: "text-text-dim",
        highlighted: false,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "Landing Page Design & Build", included: true },
          { text: "Lead CRM Integration", included: true },
          { text: "15-Day Email Automation Sequence", included: true },
          { text: "7 WABA WhatsApp Messages", included: true },
          { text: "7 Custom Facebook Creatives", included: true },
          { text: "A/B Testing", included: false },
          { text: "Priority Support", included: false },
        ],
      },
      {
        name: "Growth Engine",
        tag: "Advanced Funnel",
        tagColor: "text-primary",
        highlighted: true,
        recommended: true,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "High-Converting Landing Page", included: true },
          { text: "Advanced Lead CRM Setup", included: true },
          { text: "30-Day Email Automation Sequence", included: true },
          { text: "14 WABA WhatsApp Messages", included: true },
          { text: "14 Custom Facebook Creatives", included: true },
          { text: "A/B Testing (2 variants)", included: true },
          { text: "Priority Support", included: false },
        ],
      },
      {
        name: "Kinetic Conduit",
        tag: "Premium Funnel",
        tagColor: "text-secondary",
        highlighted: false,
        price: "₹ ——,———",
        period: "one-time",
        features: [
          { text: "Interactive & Animated Landing Page", included: true },
          { text: "Full CRM + Pipeline Integration", included: true },
          { text: "30-Day Multi-channel Automation", included: true },
          { text: "14 WABA WhatsApp Messages", included: true },
          { text: "14 Custom Facebook Creatives", included: true },
          { text: "Full A/B Testing Suite", included: true },
          { text: "Priority Support", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Funnel Maintenance",
      icon: "build",
      desc: "Keep your funnel optimised, updated, and converting month after month.",
      price: "₹ —,———",
      period: "/ month",
      perks: [
        "Monthly performance audit & report",
        "Landing page copy & design tweaks",
        "Email sequence optimisation",
        "CRM health checks & cleanup",
        "Conversion rate monitoring",
      ],
    },
  },
  {
    id: "facebook",
    label: "Facebook Ads",
    icon: "campaign",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Ad Launch",
        tag: "Creation",
        tagColor: "text-primary",
        highlighted: false,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "Campaign Strategy & Architecture", included: true },
          { text: "Audience Research & Targeting Setup", included: true },
          { text: "3 Ad Creatives (Image/Video)", included: true },
          { text: "Facebook Pixel Installation", included: true },
          { text: "Ad Copywriting", included: true },
          { text: "Retargeting Audiences Setup", included: false },
          { text: "Ongoing Optimisation", included: false },
        ],
      },
      {
        name: "Ad Accelerator",
        tag: "Creation + Retargeting",
        tagColor: "text-primary",
        highlighted: true,
        recommended: true,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "Full Campaign Strategy", included: true },
          { text: "Advanced Audience Segmentation", included: true },
          { text: "6 Ad Creatives (Image + Video)", included: true },
          { text: "Pixel + Conversion API Setup", included: true },
          { text: "Persuasive Ad Copywriting", included: true },
          { text: "Retargeting Audiences Setup", included: true },
          { text: "First-Month Optimisation Included", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Facebook Ads Management",
      icon: "manage_accounts",
      desc: "Hands-off ad management — we test, optimise, and scale your campaigns every week.",
      price: "₹ —,———",
      period: "/ month",
      perks: [
        "Weekly performance review & reporting",
        "Continuous A/B creative testing",
        "Budget scaling & bid optimisation",
        "New audience exploration monthly",
        "Fresh creatives every 30 days",
      ],
    },
  },
  {
    id: "google",
    label: "Google Ads",
    icon: "ads_click",
    accentColor: "secondary",
    accentClass: "text-secondary",
    borderClass: "border-secondary/40",
    bgClass: "bg-secondary/10",
    glowClass: "shadow-[0_0_60px_rgba(138,43,226,0.08)]",
    plans: [
      {
        name: "Search Launch",
        tag: "Creation",
        tagColor: "text-secondary",
        highlighted: false,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "Keyword Research & Strategy", included: true },
          { text: "Search Campaign Build", included: true },
          { text: "Ad Copywriting (3 variations)", included: true },
          { text: "Conversion Tracking Setup", included: true },
          { text: "Negative Keyword List", included: true },
          { text: "Display / Remarketing Campaign", included: false },
          { text: "Ongoing Optimisation", included: false },
        ],
      },
      {
        name: "Full Funnel Search",
        tag: "Creation + Display",
        tagColor: "text-secondary",
        highlighted: true,
        recommended: true,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "In-depth Keyword Research", included: true },
          { text: "Search + Performance Max Setup", included: true },
          { text: "Ad Copywriting (6 variations)", included: true },
          { text: "Full Conversion & Call Tracking", included: true },
          { text: "Negative Keyword Sculpting", included: true },
          { text: "Display & Remarketing Campaign", included: true },
          { text: "First-Month Optimisation Included", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Google Ads Management",
      icon: "query_stats",
      desc: "Active campaign management to lower your cost-per-click and raise conversions every month.",
      price: "₹ —,———",
      period: "/ month",
      perks: [
        "Weekly bid & budget optimisation",
        "Monthly keyword expansion & pruning",
        "Ad copy split-testing",
        "Quality score improvement",
        "Monthly performance report",
      ],
    },
  },
  {
    id: "website",
    label: "Website",
    icon: "web",
    accentColor: "primary",
    accentClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    glowClass: "shadow-[0_0_60px_rgba(0,245,255,0.08)]",
    plans: [
      {
        name: "Launch Site",
        tag: "Creation · Starter",
        tagColor: "text-primary",
        highlighted: false,
        price: "₹ —,———",
        period: "one-time",
        features: [
          { text: "Up to 5 Pages", included: true },
          { text: "Mobile Responsive Design", included: true },
          { text: "Contact Form Integration", included: true },
          { text: "Basic SEO Setup", included: true },
          { text: "Performance Optimisation", included: true },
          { text: "Custom Animations", included: false },
          { text: "CMS / Blog System", included: false },
        ],
      },
      {
        name: "Authority Site",
        tag: "Creation · Full",
        tagColor: "text-primary",
        highlighted: true,
        recommended: true,
        price: "₹ ——,———",
        period: "one-time",
        features: [
          { text: "Up to 12 Pages", included: true },
          { text: "Bespoke UI/UX Design", included: true },
          { text: "Custom Animations & Interactions", included: true },
          { text: "Full SEO & Schema Markup", included: true },
          { text: "CMS / Blog System", included: true },
          { text: "Lead Capture & CRM Integration", included: true },
          { text: "3 Months Maintenance Included", included: true },
        ],
      },
    ],
    maintenance: {
      name: "Website Maintenance",
      icon: "health_and_safety",
      desc: "Keep your site fast, secure, and up to date — we handle everything technical.",
      price: "₹ —,———",
      period: "/ month",
      perks: [
        "Content updates & page edits",
        "Security patches & plugin updates",
        "Uptime monitoring & backups",
        "Performance & Core Web Vitals tuning",
        "Monthly analytics report",
      ],
    },
  },
];

// ── CARD ──────────────────────────────────────────────────────────────────
function PlanCard({ plan, accent }) {
  const isHighlighted = plan.highlighted;
  return (
    <div
      className={`relative rounded-2xl flex flex-col overflow-hidden anim-card glow-card transition-transform duration-300 hover:-translate-y-1
        ${isHighlighted
          ? "glass-panel-accent border-t-2 border-primary/60 shadow-[0_0_40px_rgba(0,245,255,0.1)]"
          : "glass-panel border border-white/5"
        }`}
    >
      {plan.recommended && (
        <div className="absolute top-0 right-0 bg-primary/20 border-b border-l border-primary/30 px-4 py-1.5 rounded-bl-xl">
          <span className="font-mono text-[9px] text-primary uppercase tracking-widest">Recommended</span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-white/5">
          <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${plan.tagColor}`}>{plan.tag}</p>
          <h3 className="font-headline text-2xl font-medium text-white">{plan.name}</h3>
        </div>

        {/* Price */}
        <div className="mb-8 pb-6 border-b border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-3xl font-medium text-white tracking-tight">{plan.price}</span>
          </div>
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{plan.period}</span>
          <div className="mt-2 inline-flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></span>
            <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">Pricing coming soon</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 flex-grow mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${f.included ? (isHighlighted ? "text-primary" : "text-text-muted") : "text-white/10"}`}>
                {f.included ? "check_circle" : "remove_circle"}
              </span>
              <span className={`font-body text-sm leading-relaxed ${f.included ? "text-text-main" : "text-text-dim line-through decoration-white/10"}`}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/webinar"
          className={`btn-magnetic w-full relative font-mono text-xs uppercase tracking-widest py-4 rounded-sm text-center group overflow-hidden transition-colors duration-500
            ${isHighlighted
              ? "bg-white text-background hover:bg-transparent font-bold"
              : "border border-white/10 text-white hover:border-white/30"
            }`}
        >
          <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-2">
            Get Started
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
          {isHighlighted && (
            <>
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

// ── MAINTENANCE CARD ──────────────────────────────────────────────────────
function MaintenanceCard({ data, accentClass, borderClass, bgClass }) {
  return (
    <div className={`glass-panel glow-card anim-card rounded-2xl border ${borderClass} overflow-hidden flex flex-col md:flex-row`}>
      {/* Left accent strip */}
      <div className={`${bgClass} w-full md:w-2 flex-shrink-0`}></div>

      <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 flex-grow">
        {/* Icon + name */}
        <div className="flex-shrink-0 flex flex-col items-start gap-4">
          <div className={`w-14 h-14 rounded-xl ${bgClass} border ${borderClass} flex items-center justify-center`}>
            <span className={`material-symbols-outlined text-2xl ${accentClass}`}>{data.icon}</span>
          </div>
          <div>
            <h3 className="font-headline text-lg font-medium text-white">{data.name}</h3>
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mt-1">Monthly Retainer</p>
          </div>
        </div>

        {/* Description + perks */}
        <div className="flex-grow">
          <p className="font-body text-sm text-text-muted font-light leading-relaxed mb-6">{data.desc}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.perks.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${accentClass}`}>check_small</span>
                <span className="font-body text-xs text-text-muted">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="flex-shrink-0 flex flex-col items-start md:items-end justify-between gap-6 min-w-[160px]">
          <div className="text-right">
            <div className="font-headline text-2xl font-medium text-white">{data.price}</div>
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{data.period}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/5 rounded-full px-3 py-1">
              <span className={`w-1.5 h-1.5 rounded-full ${accentClass.replace("text-", "bg-")} animate-pulse`}></span>
              <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">Soon</span>
            </div>
          </div>
          <Link
            to="/webinar"
            className={`btn-magnetic font-mono text-[10px] uppercase tracking-widest border ${borderClass} px-6 py-3 rounded-sm ${accentClass} hover:opacity-80 transition-opacity whitespace-nowrap`}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────
export default function Pricing() {
  const [activeTab, setActiveTab] = useState("funnels");

  const active = categories.find((c) => c.id === activeTab);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const tl = gsap.timeline();
    tl.from(".anim-fade-up", { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .from(".anim-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.5");

    document.querySelectorAll(".glow-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0, 0)"; });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Re-animate cards when tab changes
  useEffect(() => {
    gsap.fromTo(".anim-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)" });
  }, [activeTab]);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen">

      {/* ── BG ── */}
      <div className="absolute inset-0 bg-grid z-0 h-[70vh]"></div>
      <div className="ambient-orb w-[900px] h-[600px] bg-primary/8 top-0 left-1/2 -translate-x-1/2 mix-blend-screen"></div>
      <div className="ambient-orb w-[400px] h-[400px] bg-secondary/6 top-32 right-0 mix-blend-screen translate-x-1/2"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center max-w-4xl mx-auto mb-16 anim-fade-up pt-8">
          <div className="flex justify-center mb-8">
            <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span> Service Plans <span className="w-8 h-[1px] bg-primary"></span>
            </p>
          </div>
          <h1 className="text-[2.2rem] md:text-[5rem] lg:text-[7rem] font-headline font-medium tracking-tighter text-white leading-[0.88] mb-6">
            PICK YOUR<br />
            <span className="animate-gradient-text italic font-light">GROWTH ENGINE.</span>
          </h1>
          <p className="text-base md:text-lg font-body text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Every service built for conversion. Choose a one-time build, an ongoing retainer, or stack both for compounding results.
          </p>

          {/* Pricing coming soon badge */}
          <div className="mt-8 inline-flex items-center gap-3 glass-panel border border-white/5 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Pricing reveal coming soon — join the webinar for exclusive rates</span>
          </div>
        </div>

        {/* ── SHAPE ODYSSEY TAB STRIP ── */}
        <div className="flex justify-center mb-16 anim-fade-up">
          <div className="glass-panel border border-white/5 rounded-2xl p-2 flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-300 group
                  ${activeTab === cat.id
                    ? "bg-white/10 text-white border border-white/15"
                    : "text-text-dim hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className={`material-symbols-outlined text-base transition-colors duration-300 ${activeTab === cat.id ? cat.accentClass : "text-text-dim group-hover:text-white"}`}>
                  {cat.icon}
                </span>
                {cat.label}
                {activeTab === cat.id && (
                  <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${cat.accentClass.replace("text-", "bg-")}`}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── SECTION LABEL ── */}
        <div className="flex items-center gap-4 mb-10 anim-fade-up">
          <div className={`w-10 h-10 rounded-xl ${active.bgClass} border ${active.borderClass} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${active.accentClass} text-xl`}>{active.icon}</span>
          </div>
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-medium text-white">{active.label} Plans</h2>
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">One-time build options</p>
          </div>
        </div>

        {/* ── PLAN CARDS ── */}
        <div className={`grid gap-6 mb-8 ${active.plans.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 max-w-3xl"}`}>
          {active.plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} accent={active.accentColor} />
          ))}
        </div>

        {/* ── MAINTENANCE CARD ── */}
        <div className="mb-8 anim-card">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-full h-[1px] bg-white/5"></span>
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-text-dim">autorenew</span>
              Monthly Retainer
            </span>
            <span className="w-full h-[1px] bg-white/5"></span>
          </div>
          <MaintenanceCard
            data={active.maintenance}
            accentClass={active.accentClass}
            borderClass={active.borderClass}
            bgClass={active.bgClass}
          />
        </div>

        <div className="section-divider mx-0 my-16"></div>

        {/* ── ALL SERVICES OVERVIEW ── */}
        <div className="mb-16 anim-fade-up">
          <div className="text-center mb-12">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-3">Everything we offer</p>
            <h2 className="font-headline text-3xl md:text-4xl font-medium text-white tracking-tighter">FULL SERVICE OVERVIEW</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`glass-panel glow-card rounded-xl p-6 text-left flex flex-col gap-4 border hover:border-white/15 transition-all duration-300 hover:-translate-y-1 group ${activeTab === cat.id ? cat.borderClass : "border-white/5"}`}
              >
                <div className={`w-12 h-12 rounded-xl ${cat.bgClass} border ${cat.borderClass} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${cat.accentClass} text-xl`}>{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-medium text-white mb-1">{cat.label}</h3>
                  <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                    {cat.plans.length} plan{cat.plans.length > 1 ? "s" : ""} + maintenance
                  </p>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors group-hover:gap-2.5 duration-300 ${activeTab === cat.id ? cat.accentClass : "text-text-dim group-hover:text-white"}`}>
                  View plans <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider mx-0 my-16"></div>

        {/* ── BOTTOM CTA ── */}
        <div className="flex flex-col items-center text-center pb-24 anim-fade-up">
          <h3 className="text-2xl md:text-3xl font-headline font-medium text-white mb-4">
            Not sure which plan is right?
          </h3>
          <p className="font-body text-text-muted text-sm font-light mb-10 max-w-md leading-relaxed">
            Join our free live webinar. We'll walk through every service, show real results, and help you find the perfect fit for your business — live.
          </p>
          <Link
            to="/webinar"
            className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-14 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
              Join Free Webinar
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
            <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </Link>
        </div>

      </div>
    </main>
  );
}