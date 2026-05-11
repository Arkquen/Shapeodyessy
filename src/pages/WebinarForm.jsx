import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function WebinarForm() {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";

    // Entrance animation
    gsap.fromTo(".form-modal", { opacity: 0, scale: 0.96, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
    gsap.fromTo(".form-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(".form-modal",   { opacity: 0, scale: 0.96, y: 16, duration: 0.3, ease: "power2.in" });
    gsap.to(".form-backdrop",{ opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => navigate(-1),
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">

      {/* Backdrop */}
      <div
        className="form-backdrop absolute inset-0 bg-black/80"
        style={{ backdropFilter: "blur(12px)" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="form-modal relative w-full max-w-2xl max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#0a0a0a",
          boxShadow: "0 0 0 1px rgba(138,43,226,0.3), 0 0 80px rgba(138,43,226,0.12), 0 40px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* Gradient top bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg,#00F5FF 0%,#8A2BE2 100%)", flexShrink: 0 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[9px] text-secondary uppercase tracking-widest">Limited Seats · Every Sunday 4 PM IST</span>
            </div>
            <h2 className="font-headline text-lg font-medium text-white tracking-tight">Reserve Your Free Seat</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-white/30 transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Iframe — dark background around it */}
        <div className="flex-grow overflow-auto" style={{ background: "#0a0a0a" }}>
          <iframe
            src="https://login.arkquen.com/widget/form/6a01c487d1cef"
            style={{ width: "100%", height: "640px", border: "none", display: "block" }}
            id="inline-6a01c487d1cef"
            data-form-name="ShapeOdyssey Webinar Form"
            data-layout-iframe-id="inline-6a01c487d1cef"
            data-form-id="6a01c487d1cef"
            data-height="640"
            title="ShapeOdyssey Webinar Form"
          />
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-white/5 flex-shrink-0 flex items-center justify-center">
          <span className="font-mono text-[9px] text-text-dim uppercase tracking-widest">
            🔒 &nbsp;No spam · Unsubscribe anytime · 100% free
          </span>
        </div>
      </div>
    </div>
  );
}
