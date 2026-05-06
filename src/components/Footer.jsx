import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#030303] pt-12 pb-12 z-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0 opacity-30"></div>
      <div className="ambient-orb w-[400px] h-[400px] bg-secondary/5 bottom-0 right-0 mix-blend-screen translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-start gap-12 mb-16">

          {/* Brand */}
          <div className="max-w-sm">
            <Link className="flex items-center group mb-6" to="/">
              <img
                src="/assets/logo.png"
                alt="ShapeOdyssey"
                className="h-12 md:h-14 transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="font-mono text-xs text-text-dim leading-relaxed uppercase tracking-widest mb-8">
              Funnels, Facebook Ads, Google Ads & Website builds that convert. Transform your pipeline today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">

            {/* Services */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-white/20"></span> Services
              </span>
              {[
                { label: "Funnel Builds", to: "/pricing" },
                { label: "Facebook Ads", to: "/ads#facebook" },
                { label: "Google Ads", to: "/ads#google" },
                { label: "Website Development", to: "/pricing" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all">{l.label}</Link>
              ))}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-white/20"></span> Company
              </span>
              {[
                { label: "Plans", to: "/pricing" },
                { label: "Ads", to: "/ads" },
                { label: "Webinar", to: "/webinar" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all">{l.label}</Link>
              ))}
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-white/20"></span> Legal
              </span>
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "Refund Policy", to: "/refund" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all">{l.label}</Link>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/[0.02]">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
              © 2026 SHAPEODYSSEY. ALL RIGHTS RESERVED.
            </span>
            <div className="hidden md:flex gap-6">
              {[
                { label: "Privacy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
                { label: "Refund", to: "/refund" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="font-mono text-[10px] text-text-dim hover:text-white uppercase tracking-widest transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">Platform Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}