import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  useEffect(() => {
    // Kill old triggers from previous page visits
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Exactly mirrors the original HTML's DOMContentLoaded script
    const tl = gsap.timeline();

    tl.from(".anim-fade-up", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }).from(
      ".anim-card",
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );

    // Mouse-tracking glow cards
    const glowCards = document.querySelectorAll(".glow-card");
    glowCards.forEach((card) => {
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
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(".anim-fade-up, .anim-card");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-32 pb-16 min-h-screen">
      <div className="absolute inset-0 bg-grid z-0 top-0 h-[60vh]"></div>
      <div className="ambient-orb w-[800px] h-[800px] bg-primary/10 top-0 left-1/2 -translate-x-1/2 mix-blend-screen"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 anim-fade-up">
          <div className="clip-text-container mb-6 flex justify-center">
            <p className="font-mono text-primary tracking-widest uppercase text-xs flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span> Deployment Plans{" "}
              <span className="w-8 h-[1px] bg-primary"></span>
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-headline font-medium tracking-tighter text-white mb-6 leading-[0.9]">
            SCALE YOUR <br />
            <span className="animate-gradient-text italic font-light">ACQUISITION.</span>
          </h1>
          <p className="text-base md:text-lg font-body text-text-muted font-light leading-relaxed">
            Architectured for high conversion. Choose the funnel deployment that aligns with your
            growth velocity.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          {/* Plan 1: Basic */}
          <div className="glass-panel glow-card rounded-xl p-6 md:p-10 flex flex-col relative overflow-hidden group anim-card mt-8">
            <div className="mb-8 border-b border-white/5 pb-8">
              <h3 className="text-2xl font-headline font-medium text-white mb-2">Core System</h3>
              <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest">Basic Funnel</p>
            </div>
            <ul className="space-y-6 mb-12 flex-grow">
              {["Landing Page","Lead CRM Integration","15 Days Email Automation","7 WABA (WhatsApp) Messages","7 Custom Facebook Creatives"].map((f) => (
                <li key={f} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-text-muted text-sm mt-0.5">check_circle</span>
                  <span className="font-body text-sm text-text-main font-light leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 2: Advanced (Highlighted) */}
          <div className="glass-panel-accent glow-card rounded-xl p-6 md:p-10 flex flex-col relative overflow-hidden group anim-card md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-primary/20 px-4 py-1 rounded-bl-lg border-b border-l border-primary/30">
              <span className="font-mono text-[9px] text-primary uppercase tracking-widest">Recommended</span>
            </div>
            <div className="mb-8 border-b border-white/10 pb-8">
              <h3 className="text-2xl font-headline font-medium text-white mb-2">Growth Engine</h3>
              <p className="font-mono text-[10px] text-primary uppercase tracking-widest">Advanced Funnel</p>
            </div>
            <ul className="space-y-6 mb-12 flex-grow">
              {["High-Converting Landing Page","Advanced Lead CRM","30 Days Email Automation","14 WABA (WhatsApp) Messages","14 Custom Facebook Creatives"].map((f) => (
                <li key={f} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                  <span className="font-body text-sm text-white font-medium leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan 3: Premium */}
          <div className="glass-panel glow-card rounded-xl p-6 md:p-10 flex flex-col relative overflow-hidden group anim-card mt-8">
            <div className="mb-8 border-b border-white/5 pb-8">
              <h3 className="text-2xl font-headline font-medium text-white mb-2">Kinetic Conduit</h3>
              <p className="font-mono text-[10px] text-secondary uppercase tracking-widest">Premium Funnel</p>
            </div>
            <ul className="space-y-6 mb-12 flex-grow">
              {[
                { icon: "text-secondary", text: "Interactive & Responsive Landing Page" },
                { icon: "text-text-muted", text: "Full CRM Integration" },
                { icon: "text-text-muted", text: "30 Days Email Automation" },
                { icon: "text-text-muted", text: "14 WABA (WhatsApp) Messages" },
                { icon: "text-text-muted", text: "14 Custom Facebook Creatives" },
              ].map((f) => (
                <li key={f.text} className="flex items-start gap-4">
                  <span className={`material-symbols-outlined ${f.icon} text-sm mt-0.5`}>check_circle</span>
                  <span className="font-body text-sm text-text-main font-light leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="section-divider mx-8 md:mx-16 my-8"></div>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center mt-20 pt-16 border-t border-white/5 anim-fade-up">
          <h3 className="text-2xl font-headline font-medium text-white mb-4">
            Ready to see the platform in action?
          </h3>
          <p className="font-body text-text-muted text-sm font-light mb-8 text-center max-w-md">
            Join our product experts for a live walkthrough of the AutoFunnel SaaS. See exactly how
            we generate and automate leads.
          </p>
          <Link
            to="/#webinar"
            className="btn-magnetic relative font-mono text-sm uppercase tracking-widest text-background font-bold px-12 py-5 group overflow-hidden bg-white hover:bg-transparent transition-colors duration-500 rounded-sm"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300 flex items-center gap-4">
              Register for Webinar
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
