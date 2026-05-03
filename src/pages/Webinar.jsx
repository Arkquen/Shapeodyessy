import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ── Timer logic ─────────────────────────────────────────────────────────────
function getNextSunday4PMIST() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
  const day = nowIST.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const target = new Date(nowIST);
  target.setDate(nowIST.getDate() + daysUntilSunday);
  target.setHours(16, 0, 0, 0);
  if (daysUntilSunday === 0 && nowIST >= target) target.setDate(target.getDate() + 7);
  return new Date(target.getTime() - istOffset - now.getTimezoneOffset() * 60 * 1000);
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [target, setTarget] = useState(getNextSunday4PMIST);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let diff = target - now;
      if (diff <= 0) { const next = getNextSunday4PMIST(); setTarget(next); diff = next - now; }
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
      <div className="glass-panel rounded-xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <span className="font-headline text-3xl md:text-4xl font-medium text-white tabular-nums relative z-10">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">{label}</span>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const agenda = [
  { time: "4:00 PM", title: "Welcome & Introduction", desc: "Meet the AutoFunnel Labs team. We'll set the stage for what you'll learn and how to get the most from the session.", icon: "waving_hand", color: "text-primary" },
  { time: "4:10 PM", title: "Funnel Strategy Deep-Dive", desc: "How to build a high-converting sales funnel from scratch — landing pages, lead magnets, CRM setup, and follow-up sequences that close.", icon: "filter_alt", color: "text-primary" },
  { time: "4:30 PM", title: "Facebook & Instagram Ads", desc: "Creative strategy, audience targeting, retargeting systems, and how to scale campaigns profitably without wasting budget.", icon: "campaign", color: "text-secondary" },
  { time: "4:50 PM", title: "Google Ads & Search", desc: "Search vs Display vs Performance Max — when to use each, keyword strategy, and how to structure campaigns for maximum ROI.", icon: "ads_click", color: "text-secondary" },
  { time: "5:10 PM", title: "Website & Landing Page Services", desc: "Live showcase of our done-for-you website and landing page builds — interactive, fast, and built specifically to generate leads.", icon: "web", color: "text-primary" },
  { time: "5:30 PM", title: "Live Q&A + Exclusive Offer", desc: "Ask us anything. Attendees receive session-only pricing on all our packages — not available anywhere else.", icon: "forum", color: "text-secondary" },
];

const services = [
  { icon: "filter_alt", title: "Sales Funnel Build", desc: "End-to-end funnel design, copy, and automation. Landing page → CRM → follow-up → close.", tag: "Most Popular", tagColor: "bg-primary/20 text-primary border-primary/30", accentClass: "text-primary", borderClass: "border-primary/20", bgClass: "bg-primary/5" },
  { icon: "campaign", title: "Facebook & Instagram Ads", desc: "Strategy, creative, targeting, and full campaign management. We handle everything — you collect the leads.", tag: "High ROI", tagColor: "bg-secondary/20 text-secondary border-secondary/30", accentClass: "text-secondary", borderClass: "border-secondary/20", bgClass: "bg-secondary/5" },
  { icon: "ads_click", title: "Google Ads Management", desc: "Search, Display, and Performance Max campaigns managed and optimised for your specific goals.", tag: null, tagColor: "", accentClass: "text-secondary", borderClass: "border-secondary/20", bgClass: "bg-secondary/5" },
  { icon: "web", title: "Website Development", desc: "Custom, interactive websites and landing pages built to convert visitors into leads and clients.", tag: "New", tagColor: "bg-white/10 text-white border-white/20", accentClass: "text-primary", borderClass: "border-primary/20", bgClass: "bg-primary/5" },
];

const faqs = [
  { q: "Is this webinar really free?", a: "Yes, 100% free. No credit card, no catch. We run this every Sunday to show businesses exactly how we work before they commit to anything." },
  { q: "What level of experience do I need?", a: "None. Whether you've never run an ad in your life or you're already spending on ads but not getting results — this session is built to be practical and actionable for everyone." },
  { q: "Will there be a replay?", a: "Replays are sent to registered attendees only. Register your spot and we'll email you the link if you miss the live session." },
  { q: "How long is the session?", a: "Approximately 90 minutes including the Q&A. You can drop in for specific topics using the agenda as a guide." },
  { q: "What's the exclusive offer at the end?", a: "Attendees get session-only pricing on our services — funnels, ads management, and website builds. These rates aren't listed anywhere publicly." },
  { q: "How do I get the session link?", a: "After you register, we'll send the link directly to your WhatsApp and email before the session starts every Sunday." },
];

const testimonials = [
  { name: "Priya M.", role: "Real Estate Agent, Mumbai", text: "Attended the webinar with zero idea about funnels. Walked out with a clear plan. Signed up for the funnel build the same week — leads started coming in within 10 days.", stars: 5 },
  { name: "Rahul S.", role: "Coaching Business, Delhi", text: "Was sceptical about Facebook Ads. The session completely changed how I think about targeting. Our cost per lead dropped by 60% in the first month.", stars: 5 },
  { name: "Anita K.", role: "E-commerce Store Owner", text: "The Google Ads section alone was worth attending. We restructured our campaigns exactly as shown and saw a 3x improvement in ROAS within 6 weeks.", stars: 5 },
];

const whatYoullLearn = [
  { icon: "psychology", title: "The Funnel Framework", desc: "The exact 4-step system we use to take a cold stranger to a paying client — works for any service business." },
  { icon: "campaign", title: "Meta Ads That Convert", desc: "How to structure campaigns, choose audiences, and write creatives that stop the scroll and generate leads." },
  { icon: "search", title: "Google Search Strategy", desc: "How to capture high-intent buyers, eliminate wasted spend, and set up conversion tracking that actually works." },
  { icon: "web", title: "Website Architecture", desc: "What makes a website generate leads vs just look good — and how our builds are different from typical agencies." },
  { icon: "auto_awesome", title: "Automation Sequences", desc: "The email and WhatsApp follow-up sequences that nurture leads on autopilot so no opportunity goes cold." },
  { icon: "bar_chart", title: "Reading the Numbers", desc: "Which metrics actually matter, which ones are vanity, and how to make decisions based on data — not guesswork." },
];

export default function Webinar() {
  const timeLeft = useCountdown();
  const [openFaq, setOpenFaq] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    gsap.set(".web-hero-anim", { y: 60, opacity: 0 });
    gsap.to(".web-hero-anim", { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.1 });

    const revealEls = gsap.utils.toArray(".reveal-up");
    revealEls.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        y: 35, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    });

    gsap.from(".agenda-item", {
      scrollTrigger: { trigger: ".agenda-item", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });

    gsap.from(".learn-card", {
      scrollTrigger: { trigger: ".learn-card", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.2)",
    });

    gsap.from(".service-card", {
      scrollTrigger: { trigger: ".service-card", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
    });

    gsap.from(".testimonial-card", {
      scrollTrigger: { trigger: ".testimonial-card", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });

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
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen" ref={heroRef}>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="ambient-orb w-[800px] h-[700px] bg-secondary/10 top-[-10%] left-1/2 -translate-x-1/2 mix-blend-screen"></div>
        <div className="ambient-orb w-[400px] h-[400px] bg-primary/8 bottom-0 right-0 mix-blend-screen translate-x-1/3"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center text-center">

          {/* Live badge */}
          <div className="web-hero-anim flex items-center gap-3 mb-8 glass-panel border border-white/5 rounded-full px-6 py-2.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">Live Every Sunday · 4:00 PM IST · Free to Attend</span>
          </div>

          <h1 className="text-[2rem] md:text-[4.5rem] lg:text-[6.5rem] font-headline font-medium tracking-tighter text-white leading-[0.88] mb-6 web-hero-anim">
            GROW YOUR BUSINESS<br />
            <span className="animate-gradient-text italic font-light">ON AUTOPILOT.</span>
          </h1>

          <p className="text-base md:text-lg font-body text-text-muted font-light max-w-2xl leading-relaxed mb-12 web-hero-anim">
            A free live session every Sunday covering funnels, Facebook Ads, Google Ads, and website builds. See the strategies we use for real clients — then decide if you want us to do it for you.
          </p>

          {/* ── COUNTDOWN ── */}
          <div className="web-hero-anim w-full flex flex-col items-center gap-6 mb-12">
            <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Next session starts in</p>
            <div className="flex items-start gap-3 md:gap-6">
              <TimerBlock value={timeLeft.days} label="Days" />
              <div className="text-3xl md:text-4xl font-headline text-white/20 mt-6 select-none">:</div>
              <TimerBlock value={timeLeft.hours} label="Hours" />
              <div className="text-3xl md:text-4xl font-headline text-white/20 mt-6 select-none">:</div>
              <TimerBlock value={timeLeft.minutes} label="Min" />
              <div className="text-3xl md:text-4xl font-headline text-white/20 mt-6 select-none">:</div>
              <TimerBlock value={timeLeft.seconds} label="Sec" />
            </div>
          </div>

          {/* CTAs */}
          <div className="web-hero-anim flex flex-col sm:flex-row gap-4">
            <a href="#register" className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm">
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                Reserve My Seat
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </a>
            <a href="#agenda" className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-white px-12 py-5 group overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-500 rounded-sm">
              <span className="relative z-10">View Agenda</span>
            </a>
          </div>

          {/* Social proof strip */}
          <div className="web-hero-anim mt-16 flex flex-wrap justify-center gap-8 pt-12 border-t border-white/5 w-full max-w-2xl">
            {[
              { value: "500+", label: "Attendees this year" },
              { value: "Every Sunday", label: "Consistent schedule" },
              { value: "90 min", label: "Packed session" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-headline text-2xl font-medium text-white">{s.value}</span>
                <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── WHAT YOU'LL LEARN ───────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-16 reveal-up">
            <div>
              <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">01 // What You'll Learn</p>
              <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
                SKILLS YOU'LL LEAVE<br /><span className="animate-gradient-text">WITH.</span>
              </h2>
            </div>
            <p className="font-body text-text-muted font-light max-w-sm leading-relaxed text-sm">
              No slides, no theory. Every topic is demonstrated with real campaigns, real numbers, and real client results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatYoullLearn.map((item, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex flex-col gap-5 learn-card hover-lift">
                <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-medium text-white mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── AGENDA ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-surface relative z-10" id="agenda">
        <div className="ambient-orb w-[600px] h-[400px] bg-secondary/5 top-1/2 right-0 -translate-y-1/2 translate-x-1/2 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-16 reveal-up">
            <div>
              <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">02 // Session Agenda</p>
              <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
                WHAT WE'LL<br /><span className="animate-gradient-text">COVER.</span>
              </h2>
            </div>
            <p className="font-body text-text-muted font-light max-w-sm leading-relaxed text-sm">
              Every session is packed with actionable insights. No fluff — only strategies we use for real clients every week.
            </p>
          </div>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical line desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0"></div>

            <div className="space-y-6">
              {agenda.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className={`flex flex-col lg:flex-row gap-6 agenda-item ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Card */}
                    <div className="lg:w-[calc(50%-2rem)] glass-panel glow-card rounded-xl p-7 flex gap-5 hover-lift">
                      <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <div className={`w-11 h-11 rounded-full border flex items-center justify-center ${item.color === "text-primary" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`}>
                          <span className={`material-symbols-outlined text-lg ${item.color}`}>{item.icon}</span>
                        </div>
                        <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest whitespace-nowrap">{item.time}</span>
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-medium text-white mb-2">{item.title}</h3>
                        <p className="font-body text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Centre dot — desktop only */}
                    <div className="hidden lg:flex w-16 flex-shrink-0 items-center justify-center relative">
                      <div className={`w-3 h-3 rounded-full border-2 ${item.color === "text-primary" ? "border-primary bg-primary/30" : "border-secondary bg-secondary/30"} shadow-[0_0_12px_rgba(0,245,255,0.5)]`}></div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── SERVICES SHOWCASE ───────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="text-center mb-16 reveal-up">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">03 // What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white mb-5 leading-[0.95]">
              SERVICES WE'LL<br /><span className="animate-gradient-text">SHOWCASE LIVE.</span>
            </h2>
            <p className="font-body text-text-muted font-light max-w-xl mx-auto leading-relaxed">
              Attendees get exclusive session-only pricing. See the work, ask questions, and sign up right there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className={`glass-panel glow-card rounded-xl p-8 md:p-10 flex gap-6 service-card hover-lift relative overflow-hidden border ${s.borderClass}`}>
                {s.tag && (
                  <div className={`absolute top-5 right-5 px-3 py-1 rounded-full border text-[9px] font-mono uppercase tracking-widest ${s.tagColor}`}>
                    {s.tag}
                  </div>
                )}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl border ${s.borderClass} ${s.bgClass} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${s.accentClass} text-2xl`}>{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-medium text-white mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center reveal-up">
            <Link to="/pricing" className="btn-magnetic font-mono text-xs uppercase tracking-widest text-text-muted border border-white/10 px-8 py-3 rounded-sm hover:text-white hover:border-white/30 transition-all duration-300 flex items-center gap-2">
              View All Plans & Pricing
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-surface relative z-10 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[400px] bg-primary/5 top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="text-center mb-16 reveal-up">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">04 // Past Attendees</p>
            <h2 className="text-3xl md:text-4xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
              WHAT PEOPLE<br /><span className="animate-gradient-text">ARE SAYING.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-panel glow-card rounded-xl p-8 flex flex-col gap-6 testimonial-card hover-lift">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, si) => (
                    <span key={si} className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body text-sm text-text-muted font-light leading-relaxed flex-grow">"{t.text}"</p>
                <div className="border-t border-white/5 pt-5">
                  <p className="font-headline text-sm font-medium text-white">{t.name}</p>
                  <p className="font-mono text-[9px] text-text-dim uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-background relative z-10">
        <div className="max-w-[900px] mx-auto px-8 md:px-16">
          <div className="text-center mb-16 reveal-up">
            <p className="font-mono text-text-dim tracking-widest uppercase text-xs mb-4">05 // FAQ</p>
            <h2 className="text-3xl md:text-4xl font-headline font-medium tracking-tighter text-white leading-[0.95]">
              COMMON<br /><span className="animate-gradient-text">QUESTIONS.</span>
            </h2>
          </div>

          <div className="space-y-3 reveal-up">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left group"
                >
                  <span className="font-headline text-base font-medium text-white group-hover:text-primary transition-colors duration-300">{faq.q}</span>
                  <span className={`material-symbols-outlined text-text-muted flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>add</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openFaq === i ? "max-h-48" : "max-h-0"}`}>
                  <p className="font-body text-sm text-text-muted font-light leading-relaxed px-8 pb-6">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* ── REGISTER ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-[#030303] relative z-10 overflow-hidden" id="register">
        <div className="ambient-orb w-[800px] h-[600px] bg-secondary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — pitch */}
            <div className="reveal-up">
              <p className="font-mono text-secondary tracking-widest uppercase text-xs flex items-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-secondary"></span> Secure Your Spot
              </p>
              <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-white mb-6 leading-[0.9]">
                JOIN THE NEXT<br />LIVE SESSION.
              </h2>
              <p className="font-body text-text-muted font-light leading-relaxed mb-10">
                Free to attend. Limited seats. Every Sunday at 4:00 PM IST. Register once and get reminders every week.
              </p>

              {/* Next session info */}
              <div className="glass-panel rounded-xl p-6 border border-white/5 mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">Next Session Details</span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: "calendar_today", label: "Date", value: "Every Sunday" },
                    { icon: "schedule", label: "Time", value: "4:00 PM IST (UTC+5:30)" },
                    { icon: "videocam", label: "Format", value: "Live via Google Meet / Zoom" },
                    { icon: "currency_rupee", label: "Cost", value: "Free — always" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-text-muted text-sm">{d.icon}</span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">{d.label}</span>
                        <span className="font-body text-sm text-white">{d.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countdown mini */}
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">timer</span>
                <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                  Next session: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m away
                </span>
              </div>
            </div>

            {/* Right — form */}
            <div className="glass-panel rounded-xl p-8 md:p-10 reveal-up">
              <h3 className="font-headline text-xl font-medium text-white mb-8">Register for Free</h3>

              <div className="space-y-5">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">WhatsApp Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">I'm interested in</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Funnels", "Facebook Ads", "Google Ads", "Website Build"].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="hidden peer" />
                        <div className="w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary/20 transition-all group-hover:border-white/40 flex-shrink-0">
                          <span className="material-symbols-outlined text-[12px] text-primary hidden peer-checked:block">check</span>
                        </div>
                        <span className="font-body text-xs text-text-muted group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-dim block mb-3">Business Type <span className="text-text-dim">(optional)</span></label>
                  <input type="text" placeholder="e.g. Real estate, coaching, e-commerce..." className="w-full bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 font-body text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-300" />
                </div>
              </div>

              <button className="btn-magnetic mt-8 w-full relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm">
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center justify-center gap-3">
                  Reserve My Free Seat
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
                <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>

              <p className="font-mono text-[9px] text-text-dim text-center mt-5 uppercase tracking-widest">
                Session link sent to your WhatsApp & email before every session.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}