import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPricing = location.pathname === "/pricing";
  const isWebinar = location.pathname === "/webinar";
  const isAds = location.pathname === "/ads";
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled ? "border-white/10" : "border-white/[0.02]"
        }`}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-xl"></div>
        <div className="flex justify-between items-center px-8 md:px-16 w-full mx-auto h-20 relative z-10 max-w-[1800px]">
          <div className="flex items-center gap-4">
            <Link className="flex items-center group" to="/">
              <img
                src="/assets/logo.png"
                alt="ShapeOdyssey"
                className="h-8 md:h-10 transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="hidden md:flex gap-12 items-center">
            <Link
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                !isPricing && !isWebinar && !isAds ? "text-white" : "text-text-muted hover:text-white"
              }`}
              to="/"
            >
              Features
            </Link>
            <Link
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isAds ? "text-primary" : "text-text-muted hover:text-white"
              }`}
              to="/ads"
            >
              Ads
            </Link>
            <Link
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isPricing ? "text-primary" : "text-text-muted hover:text-white"
              }`}
              to="/pricing"
            >
              Plans
            </Link>
            <Link
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                isWebinar ? "text-secondary" : "text-text-muted hover:text-white"
              }`}
              to="/webinar"
            >
              Webinar
            </Link>
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <Link
              to={isPricing ? "/#webinar" : "#webinar"}
              className="btn-magnetic relative font-mono text-xs uppercase tracking-widest text-white px-8 py-3 group overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500 rounded-sm"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                Register for Webinar
              </span>
              <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            className="flex md:hidden relative z-50 w-10 h-10 flex-col items-center justify-center gap-[5px]"
            aria-label="Open menu"
          >
            <span className="hamburger-line w-5 h-[1.5px] bg-white rounded-full block"></span>
            <span className="hamburger-line w-5 h-[1.5px] bg-white rounded-full block"></span>
            <span className="hamburger-line w-5 h-[1.5px] bg-white rounded-full block"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu fixed inset-y-0 right-0 w-[75vw] max-w-[320px] bg-surface/95 backdrop-blur-2xl z-[60] flex flex-col pt-24 px-8 border-l border-white/5 ${
          mobileOpen ? "open" : ""
        }`}
      >
        <button
          id="mobile-menu-close"
          onClick={closeMobile}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col gap-8">
          <Link
            className="font-mono text-sm tracking-widest uppercase text-text-muted hover:text-white transition-all duration-300"
            to="/"
            onClick={closeMobile}
          >
            Features
          </Link>
          <Link
            className={`font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
              isAds ? "text-primary" : "text-text-muted hover:text-white"
            }`}
            to="/ads"
            onClick={closeMobile}
          >
            Ads
          </Link>
          <Link
            className={`font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
              isPricing ? "text-primary" : "text-text-muted hover:text-white"
            }`}
            to="/pricing"
            onClick={closeMobile}
          >
            Plans
          </Link>
          <Link
            className={`font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
              isWebinar ? "text-secondary" : "text-text-muted hover:text-white"
            }`}
            to="/webinar"
            onClick={closeMobile}
          >
            Webinar
          </Link>
          <div className="w-full h-[1px] bg-white/5"></div>
          <Link
            to={isPricing ? "/#webinar" : "#webinar"}
            onClick={closeMobile}
            className="font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 px-6 py-3 text-center hover:bg-primary/10 transition-colors rounded-sm"
          >
            Register for Webinar
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu-overlay"
        ref={overlayRef}
        onClick={closeMobile}
        className={`fixed inset-0 bg-black/60 z-[55] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </>
  );
}