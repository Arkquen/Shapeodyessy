import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const logoUrl = "/assets/logo.png";

const navLinks = [
  { label: "Features", to: "/",        activeCheck: (p) => p === "/" },
  { label: "Ads",      to: "/ads",     activeCheck: (p) => p === "/ads" },
  { label: "Plans",    to: "/pricing", activeCheck: (p) => p === "/pricing" },
  { label: "Webinar",  to: "/webinar", activeCheck: (p) => p === "/webinar" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location   = useLocation();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const closeMobile = () => setMobileOpen(false);
  const pathname    = location.pathname;

  return (
    <>
      {/* ── DESKTOP NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-6">
        <div
          className="w-full max-w-[900px] flex items-center justify-between gap-3 px-3 py-2 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(10,10,12,0.85)"
              : "rgba(10,10,12,0.65)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group ml-1">
            <img
              src={logoUrl}
              alt="ShapeOdyssey"
              className="h-9 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Nav pills — desktop only */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.activeCheck(pathname);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-5 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(161,161,170,0.8)",
                    border: isActive ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                    boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(161,161,170,0.8)";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Burger */}
          <div className="flex items-center gap-2">
            <Link
              to="/webinar"
              className="hidden md:flex items-center font-mono text-[11px] uppercase tracking-widest px-5 py-2 rounded-xl transition-all duration-300 flex-shrink-0"
              style={{
                background: "rgba(0,245,255,0.1)",
                border: "1px solid rgba(0,245,255,0.25)",
                color: "#00F5FF",
                boxShadow: "0 0 16px rgba(0,245,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,245,255,0.18)";
                e.currentTarget.style.boxShadow  = "0 0 24px rgba(0,245,255,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,245,255,0.1)";
                e.currentTarget.style.boxShadow  = "0 0 16px rgba(0,245,255,0.08)";
              }}
            >
              Register for Webinar
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex md:hidden w-9 h-9 rounded-xl items-center justify-center flex-col gap-[5px] transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label="Open menu"
            >
              <span className="w-4 h-[1.5px] bg-white rounded-full block"></span>
              <span className="w-4 h-[1.5px] bg-white rounded-full block"></span>
              <span className="w-4 h-[1.5px] bg-white rounded-full block"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ───────────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu fixed inset-y-0 right-0 w-[75vw] max-w-[300px] z-[60] flex flex-col pt-24 px-8 border-l border-white/5 ${mobileOpen ? "open" : ""}`}
        style={{ background: "rgba(8,8,12,0.97)", backdropFilter: "blur(24px)" }}
      >
        <button
          onClick={closeMobile}
          className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex flex-col gap-2 mb-8">
          {navLinks.map((link) => {
            const isActive = link.activeCheck(pathname);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className="px-5 py-3 rounded-xl font-mono text-sm uppercase tracking-widest transition-all duration-300"
                style={{
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(161,161,170,0.7)",
                  border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="w-full h-[1px] bg-white/5 mb-8"></div>

        <Link
          to="/webinar"
          onClick={closeMobile}
          className="px-5 py-3 rounded-xl font-mono text-sm uppercase tracking-widest text-center transition-all duration-300"
          style={{
            background: "rgba(0,245,255,0.1)",
            border: "1px solid rgba(0,245,255,0.25)",
            color: "#00F5FF",
          }}
        >
          Register for Webinar
        </Link>
      </div>

      {/* Overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 bg-black/60 z-[55] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
    </>
  );
}