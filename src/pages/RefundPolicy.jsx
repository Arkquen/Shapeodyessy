import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "One-Time Service Payments",
    items: [
      "Payments for one-time builds — including funnel builds, website development, and ad campaign setups — are non-refundable once work has commenced.",
      "A non-refundable deposit (typically 50%) is required to secure your project slot and begin work.",
      "The remaining balance is due upon project completion and delivery, as outlined in your project agreement.",
      "If ShapeOdyssey fails to deliver the agreed scope of work, a partial or full refund may be negotiated in good faith.",
    ],
  },
  {
    number: "02",
    title: "Monthly Retainer Fees",
    items: [
      "Monthly retainer fees for ad management (Facebook Ads, Google Ads) and website maintenance are non-refundable once the billing cycle has commenced.",
      "You will continue to receive the agreed services until the end of your current billing period.",
      "No further charges will be made after a cancellation has been confirmed in writing.",
      "Charges for partial billing periods at the start of an engagement are non-refundable.",
    ],
  },
  {
    number: "03",
    title: "Cancellation Policy",
    items: [
      "Monthly retainer services may be cancelled with 30 days' written notice sent to hello@shapeodyssey.com.",
      "One-time projects may be cancelled before work commences for a refund of any amount paid beyond the deposit.",
      "Cancellations made after work has commenced on a one-time project are not eligible for a refund of the deposit.",
      "Upon cancellation of an ad management retainer, we will provide a final performance report and hand over all account access.",
    ],
  },
  {
    number: "04",
    title: "Exceptions — When Refunds May Be Considered",
    intro: "Refunds may be considered only in the following circumstances:",
    items: [
      "You were charged by mistake due to a technical or billing error on our part.",
      "A service was not delivered due to a fault entirely on ShapeOdyssey's side.",
      "A duplicate charge was processed for the same billing period.",
      "Refund requests must be submitted within 7 days of the charge date, with supporting documentation.",
    ],
  },
  {
    number: "05",
    title: "Refund Process",
    items: [
      "Approved refunds will be processed within 7–10 business days of approval.",
      "Refunds are issued to the original payment method used at the time of purchase.",
      "We reserve the right to deny refund requests that do not meet the above criteria.",
      "All refund decisions are final once communicated in writing.",
    ],
  },
  {
    number: "06",
    title: "Ad Spend",
    items: [
      "Ad spend (the budget used to run ads on Meta or Google) is billed directly to your ad account and is entirely separate from ShapeOdyssey's management fees.",
      "Ad spend is non-refundable. Any queries regarding ad spend should be directed to Meta or Google directly.",
      "ShapeOdyssey is not liable for ad spend that results in lower-than-expected campaign performance due to platform algorithm changes, market conditions, or other factors outside our control.",
    ],
  },
];

export default function RefundPolicy() {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const highlightRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(highlightRef.current, { scaleX: 0, opacity: 0 }, {
        scaleX: 1, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out", transformOrigin: "left center",
      });
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#050505", minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif", color: "#FAFAFA" }}>
      {/* Dual ambient glow */}
      <div style={{ position: "fixed", top: "-20%", left: "30%", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "10%", right: "10%", width: "400px", height: "300px", background: "radial-gradient(ellipse, rgba(138,43,226,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Hero */}
      <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "120px 32px 64px" }}>
        <div className="animate-in" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.18)", borderRadius: "100px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00F5FF", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#00F5FF", textTransform: "uppercase" }}>Legal Document</span>
        </div>

        <h1 className="animate-in" style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 20px" }}>
          Refund <span style={{ color: "#00F5FF" }}>Policy</span>
        </h1>

        <div className="animate-in" style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>
            Effective Date: <span style={{ color: "#FAFAFA" }}>01/03/2026</span>
          </span>
          <span style={{ width: "1px", height: "14px", background: "#27272A", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>shapeodyssey.com</span>
        </div>

        <p className="animate-in" style={{ fontSize: "16px", lineHeight: 1.8, color: "#A1A1AA", maxWidth: "620px", margin: 0 }}>
          At ShapeOdyssey, client satisfaction is important to us. Please review our refund policy carefully before purchasing any of our services — including funnel builds, ad management, website development, or monthly retainers.
        </p>

        <div ref={highlightRef} style={{ marginTop: "48px", height: "1px", background: "linear-gradient(90deg, rgba(0,245,255,0.3) 0%, rgba(138,43,226,0.15) 50%, transparent 100%)" }} />
      </div>

      {/* Sections */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 32px 100px" }}>
        {sections.map((section, i) => (
          <div key={section.number} ref={(el) => (sectionsRef.current[i] = el)} style={{ opacity: 0, marginBottom: "4px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "rgba(0,245,255,0.4)", letterSpacing: "0.08em", paddingTop: "4px" }}>{section.number}</div>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "12px", color: "#FAFAFA" }}>{section.title}</h2>
                {section.intro && (
                  <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "12px" }}>{section.intro}</p>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px", fontSize: "14px", lineHeight: 1.75, color: "#A1A1AA" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00F5FF", flexShrink: 0, marginTop: "8px", opacity: 0.7 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Contact card */}
        <div style={{ marginTop: "48px", padding: "32px", background: "linear-gradient(135deg, rgba(0,245,255,0.04) 0%, rgba(138,43,226,0.04) 100%)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#FAFAFA" }}>Contact for Refunds</h3>
          <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "16px" }}>For refund-related queries, please contact our support team. Include your project name and the reason for your request to speed up the process.</p>
          <a href="mailto:hello@shapeodyssey.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#00F5FF", textDecoration: "none", letterSpacing: "0.04em" }}>
            <span style={{ opacity: 0.6 }}>✉</span> hello@shapeodyssey.com
          </a>
        </div>

        {/* Cross links */}
        <div style={{ marginTop: "48px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[{ to: "/privacy", label: "Privacy Policy" }, { to: "/terms", label: "Terms & Conditions" }, { to: "/", label: "← Back to Home" }].map((l) => (
            <Link key={l.to} to={l.to} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525B", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#00F5FF"}
              onMouseLeave={e => e.target.style.color = "#52525B"}
            >{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}