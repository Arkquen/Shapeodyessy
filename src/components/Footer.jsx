import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#030303] pt-12 pb-12 z-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0 opacity-30"></div>
      <div className="ambient-orb w-[400px] h-[400px] bg-secondary/5 bottom-0 right-0 mix-blend-screen translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
          <div className="max-w-sm">
            <Link className="flex items-center group mb-6" to="/">
              <img
                src="/assets/logo.png"
                alt="ShapeOdyssey"
                className="h-10 md:h-12 transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="font-mono text-xs text-text-dim leading-relaxed uppercase tracking-widest mb-8">
              The ultimate SaaS for lead generation, management, and automation.
              Transform your pipeline today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
            </div>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-white/20"></span>
                Platform
              </span>
              <Link
                to="/"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Generate Leads
              </Link>
              <Link
                to="/"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Manage CRM
              </Link>
              <Link
                to="/"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Automate
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-white/20"></span>
                Company
              </span>
              <Link
                to="/pricing"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Plans
              </Link>
              <a
                href="#webinar"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Webinars
              </a>
              <a
                href="#"
                className="font-body text-sm text-text-muted hover:text-white hover:translate-x-1 transition-all"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.02]">
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
            © 2024 SHAPEODYSSEY. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] text-white uppercase tracking-widest">
              Platform Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}