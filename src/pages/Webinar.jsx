import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

// ── Compute next Sunday 4:00 PM IST (UTC+5:30) ─────────────────────────────
function getNextSunday4PMIST() {
  const now = new Date();
  // Current time in IST
  const istOffset = 5.5 * 60 * 60 * 1000; // ms
  const nowIST = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);

  const day = nowIST.getDay(); // 0 = Sunday
  const daysUntilSunday = day === 0 ? 0 : 7 - day;

  const target = new Date(nowIST);
  target.setDate(nowIST.getDate() + daysUntilSunday);
  target.setHours(16, 0, 0, 0); // 4:00 PM

  // If today is Sunday but 4PM has already passed, go to next Sunday
  if (daysUntilSunday === 0 && nowIST >= target) {
    target.setDate(target.getDate() + 7);
  }

  // Convert back to UTC for countdown math
  return new Date(target.getTime() - istOffset - now.getTimezoneOffset() * 60 * 1000);
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [target, setTarget] = useState(getNextSunday4PMIST);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let diff = target - now;

      if (diff <= 0) {
        // Reset to next week
        const next = getNextSunday4PMIST();
        setTarget(next);
        diff = next - now;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function TimerBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="glass-panel rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="font-headline text-4xl md:text-5xl font-medium text-white tabular-nums relative z-10">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">{label}</span>
    </div>
  );
}

const agenda = [
  {
    time: "4:00 PM",
    title: "Welcome & Introduction",
    desc: "Meet the AutoFunnel Labs team and get an overview of what we'll cover today.",
    icon: "waving_hand",
    color: "text-primary",
  },
  {
    time: "4:10 PM",
    title: "Funnel Strategy Deep-Dive",
    desc: "How to build a high-converting sales funnel from scratch — landing pages, lead magnets, follow-up sequences.",
    icon: "filter_alt",
    color: "text-primary",
  },
  {
    time: "4:30 PM",
    title: "Facebook Ads Masterclass",
    desc: "Creative strategy, audience targeting, retargeting, and scaling campaigns that actually convert.",
    icon: "campaign",
    color: "text-secondary",
  },
  {
    time: "4:50 PM",
    title: "Google Ads & SEO",
    desc: "Search vs Display vs Performance Max — when to use each, how to structure campaigns for max ROI.",
    icon: "ads_click",
    color: "text-secondary",
  },
  {
    time: "5:10 PM",
    title: "Website & Landing Page Services",
    desc: "Live showcase of our done-for-you website and landing page builds — interactive, fast, and conversion-optimized.",
    icon: "web",
    color: "text-primary",
  },
  {
    time: "5:30 PM",
    title: "Live Q&A + Special Offer",
    desc: "Ask us anything. Attendees get exclusive pricing on our full-service packages — only available during the session.",
    icon: "forum",
    color: "text-secondary",
  },
];

const services = [
  {
    icon: "filter_alt",
    title: "Sales Funnel Build",
    desc: "End-to-end funnel design, copy, and automation. Landing page → CRM → follow-up → close.",
    tag: "Most Popular",
    tagColor: "bg-primary/20 text-primary border-primary/30",
  },
  {
    icon: "campaign",
    title: "Facebook & Instagram Ads",
    desc: "Strategy, creative, targeting, and full campaign management. We handle everything.",
    tag: "High ROI",
    tagColor: "bg-secondary/20 text-secondary border-secondary/30",
  },
  {
    icon: "ads_click",
    title: "Google Ads Management",
    desc: "Search, Display, and Performance Max campaigns managed and optimized for your goals.",
    tag: null,
    tagColor: "",
  },
  {
    icon: "web",
    title: "Website Development",
    desc: "Custom, interactive websites and landing pages built to convert visitors into leads.",
    tag: "New",
    tagColor: "bg-white/10 text-white border-white/20",
  },
];

export default function Webinar() {
  const timeLeft = useCountdown();
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.set(".web-hero-anim", { y: 60, opacity: 0 });
    gsap.to(".web-hero-anim", {
      y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.1,
    });

    gsap.from(".agenda-item", {
      scrollTrigger: { trigger: ".agenda-item", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });

    gsap.from(".service-card", {
      scrollTrigger: { trigger: ".service-card", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)",
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
      gsap.killTweensOf(".web-hero-anim, .agenda-item, .service-card");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen" ref={heroRef}>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="ambient-orb w-[700px] h-[700px] bg-secondary/10 top-[-10%] left-1/2 -translate-x-1/2 mix-blend-screen"></div>
        <div className="ambient-orb w-[400px] h-[400px] bg-primary/8 bottom-0 right-0 mix-blend-screen"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center text-center">
          <div className="web-hero-anim flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Live Every Sunday · 4:00 PM IST</span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          </div>

          <h1 className="text-[2.2rem] md:text-[5rem] lg:text-[7rem] font-headline font-medium tracking-tighter text-white leading-[0.88] mb-6 web-hero-anim">
            GROW YOUR BUSINESS<br />
            <span className="animate-gradient-text italic font-light">ON AUTOPILOT.</span>
          </h1>

          <p className="text-base md:text-lg font-body text-text-muted font-light max-w-2xl leading-relaxed mb-14 web-hero-anim">
            Join our free live webinar every Sunday. Learn funnels, Facebook Ads, Google Ads — and see exactly how we build websites and systems that turn clicks into clients.
          </p>

          {/* ── COUNTDOWN TIMER ── */}
          <div className="web-hero-anim w-full flex flex-col items-center gap-8 mb-14">
            <p className="font-mono text-xs text-text-dim uppercase tracking-widest">Next session starts in</p>
            <div className="flex items-start gap-4 md:gap-8">
              <TimerBlock value={timeLeft.days} label="Days" />
              <div className="text-4xl md:text-5xl font-headline text-white/30 mt-8 select-none">:</div>
              <TimerBlock value={timeLeft.hours} label="Hours" />
              <div className="text-4xl md:text-5xl font-headline text-white/30 mt-8 select-none">:</div>
              <TimerBlock value={timeLeft.minutes} label="Minutes" />
              <div className="text-4xl md:text-5xl font-headline text-white/30 mt-8 select-none">:</div>
              <TimerBlock value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* CTA */}
          <div className="web-hero-anim flex flex-col sm:flex-row gap-4">
            <a
              href="#register"
              className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                Reserve My Seat
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </a>
            <a
              href="#agenda"
              className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-white px-12 py-5 group overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-500 rounded-sm"
            >
              <span className="relative z-10">View Agenda</span>
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── AGENDA ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-background relative z-10" id="agenda">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="mb-20 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
            <div>
              <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">02 // Session Agenda</p>
              <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
                WHAT WE'LL<br /><span className="animate-gradient-text">COVER.</span>
              </h2>
            </div>
            <p className="font-body text-text-muted font-light max-w-sm leading-relaxed text-sm">
              Every session is packed with actionable insights. No fluff, no theory — only strategies we use for real clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agenda.map((item, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex gap-6 agenda-item hover-lift">
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${item.color === "text-primary" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`}>
                    <span className={`material-symbols-outlined text-xl ${item.color}`}>{item.icon}</span>
                  </div>
                  <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest whitespace-nowrap">{item.time}</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── SERVICES ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-surface relative z-10">
        <div className="ambient-orb w-[600px] h-[400px] bg-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">03 // What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white mb-6 leading-[0.95]">
              SERVICES WE'LL<br /><span className="animate-gradient-text">SHOWCASE LIVE.</span>
            </h2>
            <p className="font-body text-text-muted font-light max-w-xl mx-auto leading-relaxed">
              Attendees get exclusive session-only pricing. See the work, ask questions, and decide right there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 md:p-10 flex flex-col gap-6 service-card hover-lift relative overflow-hidden">
                {s.tag && (
                  <div className={`absolute top-6 right-6 px-3 py-1 rounded-full border text-[9px] font-mono uppercase tracking-widest ${s.tagColor}`}>
                    {s.tag}
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.03]">
                  <span className="material-symbols-outlined text-primary text-2xl">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-medium text-white mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── REGISTER FORM ──────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-[#030303] relative z-10 overflow-hidden" id="register">
        <div className="ambient-orb w-[800px] h-[500px] bg-secondary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>

        <div className="max-w-[700px] mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center text-center">
          <p className="font-mono text-secondary tracking-widest uppercase text-xs flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-secondary"></span> Secure Your Spot <span className="w-8 h-[1px] bg-secondary"></span>
          </p>
          <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white mb-4 leading-[0.95]">
            JOIN THE NEXT<br />LIVE SESSION.
          </h2>
          <p className="font-body text-text-muted font-light mb-12 leading-relaxed">
            Free to attend. Limited seats. Every Sunday at 4:00 PM IST.
          </p>

          <div className="glass-panel w-full rounded-xl p-8 md:p-12 text-left">
            {/* Name */}
            <div className="mb-6">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
              />
            </div>
            {/* Email */}
            <div className="mb-6">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
              />
            </div>
            {/* Phone */}
            <div className="mb-6">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Phone (WhatsApp)</label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300"
              />
            </div>
            {/* Business type */}
            <div className="mb-10">
              <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">I'm interested in</label>
              <div className="grid grid-cols-2 gap-3">
                {["Funnels", "Facebook Ads", "Google Ads", "Website Build"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary/20 transition-all group-hover:border-white/40">
                      <span className="material-symbols-outlined text-[12px] text-primary hidden peer-checked:block">check</span>
                    </div>
                    <span className="font-body text-sm text-text-muted group-hover:text-white transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-magnetic w-full relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm">
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-3">
                Reserve My Free Seat
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </button>

            <p className="font-mono text-[10px] text-text-dim text-center mt-6 uppercase tracking-widest">
              We'll send the session link to your WhatsApp & email.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
