import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const fbServices = [
  { icon: "person_search", title: "Audience Research", desc: "Deep demographic, interest, and behavioural analysis to find your exact buyer before spending a rupee." },
  { icon: "brush", title: "Creative Production", desc: "Scroll-stopping image and video ads written, designed, and produced in-house for your brand." },
  { icon: "target", title: "Campaign Architecture", desc: "Full-funnel structure: Awareness → Retargeting → Conversion — each layer doing exactly its job." },
  { icon: "autorenew", title: "Retargeting Systems", desc: "Bring back every visitor, video viewer, and page engager with precision retargeting sequences." },
  { icon: "analytics", title: "A/B Split Testing", desc: "Continuous creative, copy, and audience testing so your cost-per-lead keeps dropping over time." },
  { icon: "trending_up", title: "Scale & Optimise", desc: "Data-driven budget scaling. We double down on what works and cut what doesn't — every week." },
];

const googleServices = [
  { icon: "search", title: "Search Campaigns", desc: "Show up at the exact moment someone searches for what you offer. High-intent, ready-to-buy traffic." },
  { icon: "display_settings", title: "Display & Remarketing", desc: "Visual banner ads across millions of websites to keep your brand top-of-mind after every visit." },
  { icon: "shopping_bag", title: "Performance Max", desc: "Google's AI-powered campaign type across Search, Display, YouTube, Gmail, and Maps — all in one." },
  { icon: "play_circle", title: "YouTube Ads", desc: "Pre-roll and mid-roll video ads that build authority and drive direct response at scale." },
  { icon: "format_list_bulleted", title: "Keyword Strategy", desc: "Exhaustive keyword research, negative keyword sculpting, and match-type strategy to eliminate wasted spend." },
  { icon: "price_check", title: "Bid Management", desc: "Smart bidding strategies — Target CPA, ROAS, Enhanced CPC — tuned to your business economics." },
];

const results = [
  { metric: "3.2×", label: "Avg. ROAS", sub: "across Facebook campaigns", color: "text-primary" },
  { metric: "₹38", label: "Avg. Cost Per Lead", sub: "for Indian service businesses", color: "text-primary" },
  { metric: "67%", label: "Lower CPC", sub: "vs industry benchmark on Google", color: "text-secondary" },
  { metric: "14 Days", label: "To First Results", sub: "from campaign launch", color: "text-secondary" },
];

const process = [
  { step: "01", title: "Discovery Call", desc: "We learn your business, audience, goals, and current marketing. No templates — everything is custom." },
  { step: "02", title: "Strategy & Setup", desc: "Pixel installation, account audit, campaign architecture, creative brief, and full strategy document." },
  { step: "03", title: "Launch", desc: "Campaigns go live with daily monitoring for the first week to catch and fix anything early." },
  { step: "04", title: "Optimise & Scale", desc: "Weekly reports, continuous A/B testing, and data-backed scaling decisions every single month." },
];

export default function Ads() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    gsap.set(".ads-hero-anim", { y: 60, opacity: 0 });
    gsap.to(".ads-hero-anim", {
      y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power4.out", delay: 0.1,
    });

    // Section headings
    gsap.utils.toArray(".reveal-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    });

    // Cards
    gsap.utils.toArray(".service-grid").forEach((grid) => {
      gsap.from(grid.querySelectorAll(".s-card"), {
        scrollTrigger: { trigger: grid, start: "top 80%" },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
      });
    });

    // Result blocks
    gsap.from(".result-block", {
      scrollTrigger: { trigger: ".result-block", start: "top 80%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
    });

    // Process steps
    gsap.from(".proc-step", {
      scrollTrigger: { trigger: ".proc-step", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
    });

    // Glow cards
    document.querySelectorAll(".glow-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    // Magnetic buttons
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-visible">
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="ambient-orb w-[700px] h-[700px] bg-primary/10 top-[-15%] left-[-10%] mix-blend-screen"></div>
        <div className="ambient-orb w-[500px] h-[500px] bg-secondary/8 top-[10%] right-[-5%] mix-blend-screen"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* LEFT — text */}
            <div className="flex-1">
              <div className="mb-8">
                <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center gap-4 ads-hero-anim">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  Paid Advertising Services
                </p>
              </div>
              <div className="mb-8">
                <h1 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-headline font-medium tracking-tight leading-[0.92] text-white ads-hero-anim overflow-visible">
                  ADS THAT<br />
                  <span className="animate-gradient-text italic font-light pr-4 inline-block">ACTUALLY</span><br />
                  <span className="animate-gradient-text italic font-light pr-4 inline-block">CONVERT</span>
                </h1>
              </div>
              <p className="text-base md:text-lg font-body text-text-muted font-light max-w-lg leading-relaxed mb-10 ads-hero-anim">
                Facebook, Instagram, and Google Ads managed end-to-end. We handle strategy, creative, targeting, and optimisation — you handle the leads coming in.
              </p>
              <div className="flex flex-wrap gap-4 ads-hero-anim">
                <Link
                  to="/webinar"
                  className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-10 py-4 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
                >
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                    Book Free Strategy Call
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                  <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                </Link>
                <a
                  href="#facebook"
                  className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-white px-10 py-4 group overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-500 rounded-sm"
                >
                  <span className="relative z-10">See Our Services</span>
                </a>
              </div>
            </div>

            {/* RIGHT — stats visual */}
            <div className="flex-shrink-0 w-full lg:w-[480px] ads-hero-anim">
              <div className="grid grid-cols-2 gap-4">
                {/* Stat cards */}
                {[
                  { value: "3.2×", label: "Avg. ROAS", sub: "Facebook campaigns",       color: "text-primary",   border: "border-primary/25",   bg: "bg-primary/5"   },
                  { value: "₹38",  label: "Avg. CPL",  sub: "Cost per lead (India)",    color: "text-primary",   border: "border-primary/25",   bg: "bg-primary/5"   },
                  { value: "67%",  label: "Lower CPC", sub: "vs industry benchmark",    color: "text-secondary", border: "border-secondary/25", bg: "bg-secondary/5" },
                  { value: "14d",  label: "To Results", sub: "From campaign launch",    color: "text-secondary", border: "border-secondary/25", bg: "bg-secondary/5" },
                ].map((s, i) => (
                  <div key={i} className={`glass-panel rounded-2xl p-6 border ${s.border} flex flex-col gap-3`}>
                    <div className={`font-headline text-4xl font-medium tracking-tight ${s.color}`}>{s.value}</div>
                    <div>
                      <div className="font-mono text-xs text-white uppercase tracking-widest">{s.label}</div>
                      <div className="font-mono text-[9px] text-text-dim uppercase tracking-widest mt-0.5">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Platform badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Facebook", "Instagram", "Google Search", "YouTube", "Display"].map((p) => (
                  <span key={p} className="font-mono text-[9px] uppercase tracking-widest text-text-dim border border-white/8 px-3 py-1.5 rounded-full bg-white/[0.02]">{p}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── RESULTS STRIP ─────────────────────────────────────────── */}
      <section className="py-20 bg-surface-raised border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-2 md:divide-y-0 md:divide-x divide-white/5">
            {results.map((r, i) => (
              <div key={i} className="py-6 md:py-0 md:px-10 flex flex-col items-start result-block">
                <span className={`font-headline text-4xl md:text-5xl font-medium mb-2 ${r.color}`}>{r.metric}</span>
                <span className="font-mono text-xs text-white uppercase tracking-widest mb-1">{r.label}</span>
                <span className="font-body text-xs text-text-dim">{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── FACEBOOK ADS ──────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-background relative overflow-hidden" id="facebook">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/8 top-0 right-0 mix-blend-screen translate-x-1/3 -translate-y-1/4"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

          {/* Label + Heading */}
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-20 reveal-up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">campaign</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Meta Advertising</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-medium tracking-tighter text-white leading-[0.9]">
                FACEBOOK &<br />INSTAGRAM ADS
              </h2>
            </div>
            <p className="font-body text-text-muted font-light max-w-md leading-relaxed">
              With over 500 million users in India on Meta platforms, your customers are already there. We make sure your ads reach the right ones — at the right time, with the right message.
            </p>
          </div>

          {/* What Meta ads can do */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 mb-16 reveal-up border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {[
                { icon: "visibility", label: "Brand Awareness", desc: "Put your brand in front of millions of targeted users — build recall before they even search." },
                { icon: "group_add", label: "Lead Generation", desc: "Native lead forms, landing page traffic, and Messenger campaigns that collect leads directly inside the app." },
                { icon: "shopping_cart", label: "Direct Sales", desc: "Catalogue ads, dynamic product ads, and purchase conversion campaigns that drive revenue." },
              ].map((item, i) => (
                <div key={i} className="py-6 md:py-0 md:px-8 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                  <h4 className="font-headline text-lg font-medium text-white">{item.label}</h4>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 service-grid">
            {fbServices.map((s, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex flex-col gap-5 s-card hover-lift">
                <div className="w-12 h-12 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-medium text-white mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform note */}
          <div className="mt-12 flex flex-wrap gap-3 reveal-up">
            {["Facebook Feed","Instagram Feed","Instagram Reels","Facebook Stories","Messenger","Audience Network","Instagram Explore"].map((p) => (
              <span key={p} className="font-mono text-[10px] uppercase tracking-widest text-text-dim border border-white/5 px-4 py-2 rounded-full bg-white/[0.02]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── GOOGLE ADS ────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-surface relative overflow-hidden" id="google">
        <div className="ambient-orb w-[600px] h-[600px] bg-secondary/8 bottom-0 left-0 mix-blend-screen -translate-x-1/3 translate-y-1/4"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-20 reveal-up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl">ads_click</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Google Advertising</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-medium tracking-tighter text-white leading-[0.9]">
                GOOGLE ADS &<br />SEARCH MARKETING
              </h2>
            </div>
            <p className="font-body text-text-muted font-light max-w-md leading-relaxed">
              Capture demand the moment it exists. When someone searches for exactly what you offer, your ad is there — above the fold, first in line, ready to convert.
            </p>
          </div>

          {/* What Google ads can do */}
          <div className="glass-panel-accent rounded-2xl p-8 md:p-12 mb-16 reveal-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {[
                { icon: "bolt", label: "Intent-Based Traffic", desc: "People searching on Google already want what you're selling. You're catching buyers, not creating demand." },
                { icon: "local_atm", label: "Pay Per Click Only", desc: "You only pay when someone actually clicks your ad. Every rupee goes toward interested prospects." },
                { icon: "area_chart", label: "Measurable ROI", desc: "Full conversion tracking from click to lead to sale. See exactly what every campaign is generating." },
              ].map((item, i) => (
                <div key={i} className="py-6 md:py-0 md:px-8 flex flex-col gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">{item.icon}</span>
                  <h4 className="font-headline text-lg font-medium text-white">{item.label}</h4>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 service-grid">
            {googleServices.map((s, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex flex-col gap-5 s-card hover-lift">
                <div className="w-12 h-12 rounded-lg border border-secondary/20 bg-secondary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-medium text-white mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform note */}
          <div className="mt-12 flex flex-wrap gap-3 reveal-up">
            {["Google Search","Google Display Network","YouTube","Gmail Ads","Google Maps","Performance Max","Shopping Ads"].map((p) => (
              <span key={p} className="font-mono text-[10px] uppercase tracking-widest text-text-dim border border-white/5 px-4 py-2 rounded-full bg-white/[0.02]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── FB vs GOOGLE COMPARISON ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-16 reveal-up">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">Which is right for you?</p>
            <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
              FACEBOOK <span className="text-text-muted font-light">vs</span> GOOGLE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-up">
            {/* Facebook */}
            <div className="glass-panel glow-card rounded-2xl p-8 md:p-10 border-t-2 border-primary/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">campaign</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-medium text-white">Facebook & Instagram</h3>
                  <p className="font-mono text-[10px] text-primary uppercase tracking-widest">Demand Creation</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Best for: Building awareness + generating leads",
                  "Audience: Interest & behaviour-based targeting",
                  "Funnel stage: Top & Middle of funnel",
                  "Format: Image, Video, Carousel, Reels, Stories",
                  "Works well for: Coaching, real estate, e-comm, local services",
                  "Strength: Massive reach, creative storytelling, retargeting",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5 flex-shrink-0">check_circle</span>
                    <span className="font-body text-sm text-text-muted font-light">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google */}
            <div className="glass-panel glow-card rounded-2xl p-8 md:p-10 border-t-2 border-secondary/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-2xl">ads_click</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-medium text-white">Google Ads</h3>
                  <p className="font-mono text-[10px] text-secondary uppercase tracking-widest">Demand Capture</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Best for: Capturing high-intent buyers immediately",
                  "Audience: Keyword & search-intent targeting",
                  "Funnel stage: Bottom of funnel, ready-to-buy",
                  "Format: Text search, Display banners, YouTube video",
                  "Works well for: Local services, SaaS, B2B, e-commerce",
                  "Strength: Highest purchase intent, measurable conversion",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-sm mt-0.5 flex-shrink-0">check_circle</span>
                    <span className="font-body text-sm text-text-muted font-light">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center font-body text-sm text-text-dim mt-10 reveal-up">
            Can't decide? Most of our clients run both — Facebook to create demand, Google to capture it. <Link to="/webinar" className="text-primary hover:underline underline-offset-4">Join our webinar</Link> and we'll map out the right mix for your business.
          </p>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── OUR PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-surface relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-20 reveal-up">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">How it works</p>
            <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
              OUR <span className="animate-gradient-text">PROCESS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex flex-col gap-5 proc-step hover-lift relative overflow-hidden">
                <div className="absolute top-6 right-6 font-mono text-5xl font-medium text-white/[0.04] select-none leading-none">{p.step}</div>
                <span className="font-mono text-xs text-primary uppercase tracking-widest">Step {p.step}</span>
                <h3 className="font-headline text-lg font-medium text-white">{p.title}</h3>
                <p className="font-body text-sm text-text-muted font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-[#030303] relative z-10 overflow-hidden">
        <div className="ambient-orb w-[700px] h-[500px] bg-primary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
        <div className="max-w-[800px] mx-auto px-8 md:px-16 relative z-10 text-center reveal-up">
          <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-primary"></span> Ready to grow? <span className="w-8 h-[1px] bg-primary"></span>
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-medium tracking-tighter text-white mb-6 leading-[0.9]">
            LET'S BUILD YOUR<br /><span className="animate-gradient-text italic font-light">AD MACHINE.</span>
          </h2>
          <p className="font-body text-text-muted font-light max-w-xl mx-auto leading-relaxed mb-12">
            Join our free live webinar to see real campaigns, real results, and get a personalised strategy for your business — completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/webinar"
              className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                Join Free Webinar
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </Link>
            <Link
              to="/pricing"
              className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-white px-12 py-5 group overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-500 rounded-sm"
            >
              <span className="relative z-10">View Plans</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}