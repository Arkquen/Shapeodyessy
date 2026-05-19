
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const fbServices = [
  { title: "Audience Targeting", desc: "Find high-intent buyers." },
  { title: "Creative Testing", desc: "Scale winning creatives." },
  { title: "Retargeting", desc: "Recover lost visitors." },
  { title: "Lead Funnels", desc: "Generate qualified leads." },
  { title: "A/B Testing", desc: "Lower your CPL weekly." },
  { title: "Scaling", desc: "Increase ROAS profitably." },
];

const googleServices = [
  { title: "Search Ads", desc: "Capture active buyers." },
  { title: "YouTube Ads", desc: "Video ads that convert." },
  { title: "Performance Max", desc: "Automated AI campaigns." },
  { title: "Keyword Research", desc: "Target profitable searches." },
  { title: "Remarketing", desc: "Stay top of mind." },
  { title: "Bid Optimisation", desc: "Improve conversion cost." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We analyse your business & goals." },
  { step: "02", title: "Launch", desc: "Campaigns go live with full tracking." },
  { step: "03", title: "Optimise", desc: "We test creatives & audiences weekly." },
  { step: "04", title: "Scale", desc: "Winning campaigns get scaled profitably." },
];

export default function Ads() {
  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    gsap.set(".ads-hero-anim", { y: 60, opacity: 0 });
    gsap.to(".ads-hero-anim", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
    });

    gsap.utils.toArray(".reveal-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-28 pb-0 min-h-screen">

      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-visible">
        <div className="absolute inset-0 bg-grid z-0"></div>

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* LEFT */}
            <div className="flex-1">
              <p className="font-mono text-primary tracking-[0.35em] uppercase text-xs mb-8 ads-hero-anim">
                Paid Advertising
              </p>

              <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-headline font-medium tracking-tight leading-[0.9] text-white ads-hero-anim mb-8 overflow-visible">
                ADS THAT<br />
                <span className="animate-gradient-text italic font-light pr-6 inline-block">
                  PRINT
                </span><br />
                MONEY.
              </h1>

              <p className="text-base md:text-lg font-body text-text-muted max-w-md leading-relaxed mb-10 ads-hero-anim">
                High-performance Meta & Google campaigns designed to scale revenue.
              </p>

              <div className="flex flex-wrap gap-4 ads-hero-anim">
                <Link
                  to="/webinar"
                  className="btn-magnetic font-mono text-sm uppercase tracking-widest text-background font-bold px-10 py-4 bg-white rounded-sm hover:opacity-90 transition"
                >
                  Book Strategy Call
                </Link>

                <Link
                  to="/pricing"
                  className="btn-magnetic font-mono text-sm uppercase tracking-widest text-white px-10 py-4 border border-white/10 rounded-sm hover:border-white/30 transition"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-shrink-0 w-full lg:w-[520px] ads-hero-anim">
              <div className="glass-panel dashboard-blur metric-glow rounded-[32px] p-6 relative overflow-hidden">

                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-4">
                    <FaFacebook className="text-2xl text-primary" />
                    <FaInstagram className="text-2xl text-pink-400" />
                    <FaGoogle className="text-2xl text-secondary" />
                    <FaYoutube className="text-2xl text-red-500" />
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
                    LIVE CAMPAIGNS
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:rotate-[-1deg] hover:border-primary/20">
                    <div className="flex justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                        Return On Ad Spend
                      </span>

                      <span className="text-primary font-headline text-2xl">
                        3.2×
                      </span>
                    </div>

                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:rotate-[-1deg] hover:border-primary/20">
                      <div className="font-headline text-3xl text-white mb-1">
                        ₹38
                      </div>

                      <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                        COST PER LEAD
                      </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:rotate-[-1deg] hover:border-primary/20">
                      <div className="font-headline text-3xl text-white mb-1">
                        +67%
                      </div>

                      <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                        CONVERSION RATE
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-headline text-lg text-white">
                          Campaign Scaling
                        </div>

                        <div className="font-body text-sm text-text-muted">
                          Budget increased 42% this month.
                        </div>
                      </div>

                      <div className="text-primary text-3xl">
                        ↗
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* META ADS */}
      <section className="py-24 md:py-32 bg-background relative" id="facebook">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/10 top-0 right-0 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">

          <div className="flex items-center gap-4 mb-14 reveal-up">
            <FaFacebook className="text-primary text-4xl" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                META PLATFORM
              </div>

              <h2 className="text-4xl md:text-6xl font-headline text-white tracking-tight">
                META ADS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fbServices.map((s, i) => (
              <div
                key={i}
                className="premium-card glass-panel rounded-[28px] p-8 hover-lift reveal-up border border-white/5"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                
                  e.currentTarget.style.setProperty(
                    "--mouse-x",
                    `${e.clientX - rect.left}px`
                  );
                
                  e.currentTarget.style.setProperty(
                    "--mouse-y",
                    `${e.clientY - rect.top}px`
                  );
                }}
            > 
                <div className="card-top-glow"></div>
              
                <div className="floating-number font-headline text-6xl text-white/[0.06] mb-10">
                  0{i + 1}
                </div>
              
                <div className="icon-glow w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <FaFacebook className="text-primary text-2xl" />
                </div>
              
                <h3 className="font-headline text-2xl text-white mb-3 tracking-tight">
                  {s.title}
                </h3>
              
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {s.desc}
                </p>
              
                <div className="mt-8 flex items-center gap-2 text-primary">
                  <div className="w-8 h-[1px] bg-primary"></div>
              
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
                    PERFORMANCE
                  </span>
                </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* GOOGLE ADS */}
      <section className="py-24 md:py-32 bg-surface relative" id="google">
        <div className="ambient-orb w-[500px] h-[500px] bg-secondary/10 bottom-0 left-0 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">

          <div className="flex items-center gap-4 mb-14 reveal-up">
            <FaGoogle className="text-secondary text-4xl" />

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
                GOOGLE NETWORK
              </div>

              <h2 className="text-4xl md:text-6xl font-headline text-white tracking-tight">
                GOOGLE ADS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleServices.map((s, i) => (
              <div
                key={i}
                className="premium-card glass-panel rounded-[28px] p-8 hover-lift reveal-up border border-white/5"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                
                  e.currentTarget.style.setProperty(
                    "--mouse-x",
                    `${e.clientX - rect.left}px`
                  );
                
                  e.currentTarget.style.setProperty(
                    "--mouse-y",
                    `${e.clientY - rect.top}px`
                  );
                }}
              >
                <div className="card-top-glow"></div>
              
                <div className="floating-number font-headline text-6xl text-white/[0.06] mb-10">
                  0{i + 1}
                </div>
              
                <div className="icon-glow w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
                  <FaGoogle className="text-secondary text-2xl" />
                </div>
              
                <h3 className="font-headline text-2xl text-white mb-3 tracking-tight">
                  {s.title}
                </h3>
              
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {s.desc}
                </p>
              
                <div className="mt-8 flex items-center gap-2 text-secondary">
                  <div className="w-8 h-[1px] bg-secondary"></div>
              
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
                    SEARCH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8 md:mx-16"></div>

      {/* PROCESS */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/10 top-0 right-0 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">

          <div className="text-center mb-20 reveal-up">
            <p className="font-mono text-text-dim tracking-[0.3em] uppercase text-xs mb-4">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl md:text-6xl font-headline text-white tracking-tight">
              OUR PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-8 relative overflow-hidden reveal-up"
              >
                <div className="absolute top-5 right-5 font-headline text-5xl text-white/[0.05]">
                  {p.step}
                </div>

                <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
                  STEP {p.step}
                </div>

                <h3 className="font-headline text-xl text-white mb-3">
                  {p.title}
                </h3>

                <p className="font-body text-sm text-text-muted">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
