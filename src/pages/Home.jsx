import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // ── Exactly mirrors the original DOMContentLoaded script ──────────────

    // 1. HERO ANIMATION
    const heroTl = gsap.timeline({ delay: 0.2 });

    gsap.set(".hero-anim", { y: 100, opacity: 0 });
    gsap.set(".hero-fade", { opacity: 0, y: 20 });

    heroTl
      .to(".hero-anim", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" })
      .to(".hero-fade", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6");

    // Parallax orbs
    gsap.to("#hero-orb-1", {
      yPercent: 30, ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("#hero-orb-2", {
      yPercent: -40, ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: true },
    });

    // 1.5 INTERACTIVE 3D STACK
    const stack = document.getElementById("interactive-stack");
    const layers = document.querySelectorAll(".stack-layer");

    if (stack && layers.length > 0) {
      gsap.set(stack, { rotationX: 55, rotationY: -15, rotationZ: 0 });

      layers.forEach((layer, i) => {
        const targetZ = i * 20;
        const targetOpacity = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.94, 0.98, 1][i] || 1;
        gsap.set(layer, { z: 0, opacity: 0 });
        gsap.to(layer, { z: targetZ, opacity: targetOpacity, duration: 1.5, ease: "back.out(1.2)", delay: 1.2 + i * 0.1 });
      });

      let resetTimeout;
      const onMouseMove = (e) => {
        clearTimeout(resetTimeout);
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(stack, { rotationX: 55 - y * 20, rotationY: -15 - x * 25, rotationZ: 0, duration: 0.8, ease: "power2.out" });
        gsap.to(layers, { z: (i) => i * (25 + (Math.abs(x) + Math.abs(y)) * 5), duration: 0.8, ease: "power2.out" });
        resetTimeout = setTimeout(() => {
          gsap.to(stack, { rotationX: 55, rotationY: -15, rotationZ: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" });
          gsap.to(layers, { z: (i) => i * 20, duration: 1.5, ease: "elastic.out(1, 0.5)" });
        }, 2000);
      };
      window.addEventListener("mousemove", onMouseMove);
      window.__homeCleanup = () => { window.removeEventListener("mousemove", onMouseMove); clearTimeout(resetTimeout); };
    }

    // 2. PROBLEM SECTION
    gsap.to(".problem-text-content", {
      scrollTrigger: { trigger: "#problem-section", start: "top 70%" },
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
    });
    gsap.to(".data-card", {
      scrollTrigger: { trigger: "#problem-section", start: "top 50%" },
      y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: "expo.out",
    });

    // 3. SOLUTION SECTION
    const solTl = gsap.timeline({
      scrollTrigger: { trigger: "#solution-section", start: "top 50%" },
    });
    solTl
      .to(".sol-title, .sol-sub", { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" })
      .to("#animated-path", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, "-=0.5")
      .to(".flow-node", { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" }, "-=1.5");

    // 4. SYSTEM BREAKDOWN
    gsap.utils.toArray(".sys-step").forEach((step) => {
      const line = step.querySelector(".step-line");
      const dot = step.querySelector(".step-dot");
      const content = step.querySelector(".step-content");

      gsap.to(line, {
        scrollTrigger: { trigger: step, start: "top 60%", end: "bottom 60%", scrub: true },
        height: "100%", ease: "none",
      });

      ScrollTrigger.create({
        trigger: step, start: "top 50%", end: "bottom 40%",
        onEnter: () => {
          gsap.to(content, { opacity: 1, duration: 0.5 });
          gsap.to(dot, { backgroundColor: "#00F5FF", borderColor: "#00F5FF", boxShadow: "0 0 10px rgba(0,245,255,0.6)", duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(content, { opacity: 0.3, duration: 0.5 });
          gsap.to(dot, { backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.2)", boxShadow: "none", duration: 0.3 });
        },
      });
    });

    // 5. METRICS SECTION
    gsap.from(gsap.utils.toArray(".stat-block"), {
      scrollTrigger: { trigger: ".stat-block", start: "top 80%" },
      y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      onComplete: () => {
        document.querySelectorAll(".counter").forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          gsap.to(counter, { innerHTML: target, duration: 2.5, snap: { innerHTML: 1 }, ease: "expo.out" });
        });
      },
    });

    // 6. WEBINAR SECTION
    gsap.from(".web-anim", {
      scrollTrigger: { trigger: ".web-anim", start: "top 85%" },
      y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
    });

    // 7. MOUSE-TRACKING GLOW CARDS
    document.querySelectorAll(".glow-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    // 8. MAGNETIC BUTTONS
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0, 0)"; });
    });

    return () => {
      if (window.__homeCleanup) { window.__homeCleanup(); delete window.__homeCleanup; }
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10">

      {/* HERO SECTION */}
      <section className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid z-0"></div>
        <div className="ambient-orb w-[800px] h-[800px] bg-primary/10 top-[-20%] left-[-10%] mix-blend-screen" id="hero-orb-1"></div>
        <div className="ambient-orb w-[600px] h-[600px] bg-secondary/10 bottom-[10%] right-[-5%] mix-blend-screen" id="hero-orb-2"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between relative z-10 pt-32 gap-16">
          <div className="flex-1 flex flex-col items-start w-full">
            <div className="clip-text-container mb-8">
              <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center gap-4 hero-anim">
                <span className="w-12 h-[1px] bg-primary"></span>
                Lead Automation Platform
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-10 w-full">
              <div className="clip-text-container">
                <h1 className="text-[2.8rem] md:text-[6rem] lg:text-[8.5rem] font-headline font-medium tracking-tighter leading-[0.85] text-white hero-anim">
                  NEVER LOSE
                </h1>
              </div>
              <div className="clip-text-container">
                <h1 className="text-[2.8rem] md:text-[6rem] lg:text-[8.5rem] font-headline font-medium tracking-tighter leading-[0.85] text-white hero-anim">
                  A LEAD <span className="animate-gradient-text italic font-light pr-8">AGAIN.</span>
                </h1>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-8 items-start md:items-end mt-8 border-t border-white/5 pt-12 hero-fade">
              <div className="flex-1">
                <p className="text-base md:text-lg font-body text-text-muted leading-relaxed font-light max-w-lg">
                  Generate, manage, and automate your leads on autopilot. We build the SaaS that ensures no lead goes unattended and drives super high conversion for your business.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-[450px] h-[280px] md:h-[400px] lg:h-[600px] perspective-container items-center justify-center relative hero-fade z-20 mt-16 md:mt-12 lg:mt-0 lg:translate-x-16 lg:translate-y-12" id="stack-container">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div id="interactive-stack" className="relative w-44 h-44 md:w-64 md:h-64 preserve-3d">
              <div className="stack-layer stack-layer-1"></div>
              <div className="stack-layer stack-layer-2"></div>
              <div className="stack-layer stack-layer-3"></div>
              <div className="stack-layer stack-layer-4"></div>
              <div className="stack-layer stack-layer-5"></div>
              <div className="stack-layer stack-layer-6"></div>
              <div className="stack-layer stack-layer-7"></div>
              <div className="stack-layer stack-layer-8"></div>
              <div className="stack-layer stack-layer-9"></div>
              <div className="stack-layer stack-layer-10"></div>
              <div className="stack-layer stack-layer-11"></div>
              <div className="stack-layer stack-layer-12"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* PROBLEM SECTION */}
      <section className="py-40 relative z-10 bg-background" id="problem-section">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="flex flex-col lg:flex-row gap-24 items-start">

            <div className="lg:w-1/2 lg:sticky lg:top-40 problem-text-content" style={{ opacity: 0, transform: "translateY(40px)" }}>
              <div className="clip-text-container mb-6">
                <p className="font-mono text-text-dim tracking-widest uppercase text-xs">01 // The Problem</p>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-headline font-medium tracking-tighter text-white mb-8 leading-[0.95]">
                THE FUNNEL <br /><span className="text-text-muted">IS BLEEDING.</span>
              </h2>
              <p className="text-lg font-body text-text-muted font-light max-w-md leading-relaxed mb-8">
                Traditional tools create friction. Leads fall through the cracks because of manual follow-ups, delayed responses, and scattered spreadsheets. You are losing revenue.
              </p>
              <div className="font-mono text-xs text-text-dim border-l-2 border-white/10 pl-6 space-y-2 py-2">
                <p>&gt; 47% of leads drop due to latency</p>
                <p>&gt; 60% conversion loss in manual routing</p>
                <p className="text-primary">&gt; Opportunities completely missed</p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full flex flex-col gap-16 relative pt-20 lg:pt-0">
              <div className="w-full max-w-sm ml-auto glass-panel glow-card hover-lift p-6 rounded-lg data-card" style={{ opacity: 0, transform: "translateY(96px)" }}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Lead: Sarah J.</span>
                  <div className="flex items-center gap-2">
                    <span className="widget-dot dot-red"></span>
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">Dropped</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-white/5 rounded"></div>
                  <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                  <div className="mt-6 flex justify-between font-mono text-[10px] text-text-dim">
                    <span>Response Time</span>
                    <span className="text-red-400">4h 12m</span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-md mr-auto glass-panel glow-card hover-lift p-6 rounded-lg data-card mt-12" style={{ opacity: 0, transform: "translateY(96px)" }}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Lead: Mike T.</span>
                  <div className="flex items-center gap-2">
                    <span className="widget-dot dot-red"></span>
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">Unattended</span>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-muted text-sm">mail</span>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="h-2 w-full bg-white/5 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                    <div className="mt-4 flex justify-between font-mono text-[10px] text-text-dim">
                      <span>Action Needed</span>
                      <span className="text-red-400">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* SOLUTION SECTION */}
      <section className="py-24 md:py-48 relative z-10 border-t border-white/5 bg-surface overflow-hidden" id="solution-section">
        <div className="ambient-orb w-[1000px] h-[500px] bg-primary/5 top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col items-center relative z-10">
          <div className="text-center mb-32 max-w-3xl">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-headline font-medium tracking-tighter text-white mb-6 sol-title" style={{ opacity: 0, transform: "translateY(40px)" }}>
              YOUR AUTOMATED <span className="animate-gradient-text">LEAD MACHINE.</span>
            </h2>
            <p className="text-base md:text-lg font-body text-text-muted font-light sol-sub" style={{ opacity: 0, transform: "translateY(40px)" }}>
              Replace fragmentation with a single SaaS platform. Your leads flow seamlessly from generation to closing without missing a beat.
            </p>
          </div>

          <div className="w-full relative h-auto md:h-[200px] flex flex-col md:flex-row items-center justify-between px-4 md:px-[5%] mt-12 gap-8 md:gap-0">
            <svg className="absolute left-[5%] right-[5%] top-0 h-full w-[90%] z-0 pointer-events-none hidden md:block" preserveAspectRatio="none" viewBox="0 0 1000 200">
              <path d="M 0 100 C 111 50, 222 50, 333 100 S 555 150, 666 100 S 888 50, 1000 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <path id="animated-path" d="M 0 100 C 111 50, 222 50, 333 100 S 555 150, 666 100 S 888 50, 1000 100" fill="none" stroke="#00F5FF" strokeWidth="3" strokeDasharray="1200" strokeDashoffset="1200" style={{ filter: "drop-shadow(0 0 10px rgba(0,245,255,0.8))" }} />
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 z-0 md:hidden"></div>

            {[["01","Generate"],["02","Manage"],["03","Automate"]].map(([num, label]) => (
              <div key={num} className="relative z-10 flex flex-col items-center gap-2 md:gap-4 flow-node" style={{ opacity: 0, transform: "translateY(40px)" }}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-background border border-white/10 relative z-20">
                  <span className="font-mono text-xs text-text-muted relative z-30">{num}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted md:absolute md:-bottom-8">{label}</span>
              </div>
            ))}

            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 flow-node" style={{ opacity: 0, transform: "translateY(40px)" }}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.2)] bg-background border border-primary/30 relative z-20 pulse-ring">
                <span className="material-symbols-outlined text-primary relative z-30">monetization_on</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary md:absolute md:-bottom-10">Convert</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* SYSTEM BREAKDOWN */}
      <section className="py-40 relative z-10 bg-background">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit mb-16 lg:mb-0">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-headline font-medium tracking-tighter text-white mb-6">
                HOW THE PLATFORM<br /><span className="animate-gradient-text">WORKS.</span>
              </h2>
              <p className="font-body text-text-muted font-light leading-relaxed">A granular look at your new lead generation machine.</p>
            </div>

            <div className="lg:col-span-8 space-y-48 pb-32">
              {[
                { phase: "01", title: "Lead Generation", body: "Deploy high-converting landing pages and capture forms that turn traffic into qualified prospects instantly." },
                { phase: "02", title: "Smart Lead Management", body: "Leads are automatically managed and routed to the right closer in your CRM. No more manual data entry or lost opportunities." },
                { phase: "03", title: "Automated Follow-ups", body: "Our SaaS automatically follows up via Email and SMS. Ensure absolutely no lead goes unattended while you sleep." },
              ].map((step) => (
                <div key={step.phase} className="sys-step relative pl-12 md:pl-24 group">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
                  <div className="step-line absolute left-0 top-0 h-0 w-[2px] bg-primary shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
                  <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-background border border-white/20 step-dot"></div>
                  <div className="opacity-30 transition-opacity duration-700 step-content">
                    <span className="font-mono text-sm text-primary mb-4 block">// Phase {step.phase}</span>
                    <h3 className="text-3xl font-headline font-medium text-white mb-6">{step.title}</h3>
                    <p className="text-lg text-text-muted font-light leading-relaxed mb-8 max-w-xl">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* METRICS SECTION */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-surface-raised">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-12 md:py-0 md:px-12 flex flex-col items-start stat-block glow-card rounded-lg">
              <span className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">Coverage</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-white counter" data-target="100">0</span>
                <span className="text-3xl text-primary font-mono">%</span>
              </div>
              <p className="text-sm font-body text-text-muted font-light leading-relaxed">No lead goes unattended. Absolute automation ensures every prospect receives an immediate response.</p>
            </div>
            <div className="py-12 md:py-0 md:px-12 flex flex-col items-start stat-block glow-card rounded-lg">
              <span className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">Performance</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-white counter" data-target="312">0</span>
                <span className="text-3xl text-primary font-mono">%</span>
              </div>
              <p className="text-sm font-body text-text-muted font-light leading-relaxed">Super high conversion rates driven by consistent, targeted automated follow-ups.</p>
            </div>
            <div className="py-12 md:py-0 md:px-12 flex flex-col items-start stat-block glow-card rounded-lg">
              <span className="font-mono text-xs text-text-dim uppercase tracking-widest mb-6">Engagement</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-6xl md:text-7xl font-headline font-medium text-white">&lt;<span className="counter" data-target="2">0</span></span>
                <span className="text-3xl text-text-muted font-mono">sec</span>
              </div>
              <p className="text-sm font-body text-text-muted font-light leading-relaxed">Instant lead engagement from the moment data is captured on your landing page.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* WEBINAR SECTION */}
      <section className="pt-24 md:pt-40 pb-16 relative z-10 overflow-hidden bg-[#030303]" id="webinar">
        <div className="absolute inset-0 z-0">
          <div className="ambient-orb w-[600px] h-[600px] bg-secondary/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center">
          <div className="clip-text-container mb-6 web-anim">
            <p className="font-mono text-secondary tracking-widest uppercase text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-secondary"></span> Live Demonstration <span className="w-8 h-[1px] bg-secondary"></span>
            </p>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-headline font-medium tracking-tighter text-white mb-6 text-center web-anim">
            SEE THE PLATFORM<br />IN ACTION.
          </h2>
          <p className="text-base md:text-lg font-body text-text-muted font-light max-w-xl text-center leading-relaxed mb-12 md:mb-16 web-anim">
            Join our product experts for a live walkthrough of the AutoFunnel SaaS. See exactly how we generate and automate leads for businesses like yours.
          </p>
          <div className="glass-panel glow-card w-full max-w-2xl p-8 md:p-12 rounded-xl border-white/10 web-anim text-center">
            <p className="text-text-muted mb-8 font-light">Secure your spot for the next live session.</p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Next Session: Thu, 2:00 PM EST</span>
              </div>
              <a href="#" className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-white w-full md:w-auto px-12 py-5 group overflow-hidden border border-secondary/50 hover:border-secondary transition-colors duration-500 rounded-sm text-center">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Register for Webinar</span>
                <div className="absolute inset-0 bg-secondary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
