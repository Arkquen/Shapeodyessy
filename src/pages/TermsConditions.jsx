import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "Use of Service",
    items: [
      "ShapeOdyssey's services — including funnel builds, Facebook Ads management, Google Ads management, website development, and monthly retainers — are provided for lawful business purposes only.",
      "You are responsible for maintaining the accuracy of information you provide to us during onboarding and throughout the project.",
      "You agree not to use our services or deliverables to engage in any fraudulent, deceptive, or illegal activity.",
      "You must not resell, sublicense, or redistribute any deliverable created by ShapeOdyssey without explicit written consent.",
    ],
  },
  {
    number: "02",
    title: "Payments & Billing",
    items: [
      "One-time service fees (funnel builds, website builds, ad campaign setups) are due as per the payment schedule agreed in your project proposal.",
      "Monthly retainer fees are billed in advance at the start of each billing cycle.",
      "A non-refundable deposit (typically 50%) is required to commence any project. The remaining balance is due upon delivery or as specified in your agreement.",
      "We reserve the right to pause or terminate services for accounts with outstanding payments.",
      "Prices are subject to change with 30 days' prior notice to active retainer clients.",
    ],
  },
  {
    number: "03",
    title: "Project Delivery",
    items: [
      "Delivery timelines are estimates and are contingent on timely provision of required assets, information, and approvals from the client.",
      "Delays caused by client-side factors (late content, unavailability for review, delayed feedback) do not constitute a breach on our part.",
      "Revisions are included as specified in your project agreement. Additional revisions or scope changes may be subject to additional charges.",
      "Final deliverables are released upon receipt of full payment.",
    ],
  },
  {
    number: "04",
    title: "Intellectual Property",
    items: [
      "Upon receipt of full payment, clients own the final deliverables created specifically for their project (landing pages, websites, ad creatives).",
      "ShapeOdyssey retains ownership of all underlying frameworks, code libraries, templates, and methodologies used in delivery.",
      "We reserve the right to display completed projects in our portfolio unless you request otherwise in writing.",
      "Our brand assets, website content, and proprietary materials are protected by copyright law and may not be reproduced without permission.",
    ],
  },
  {
    number: "05",
    title: "Ad Accounts & Third-Party Platforms",
    items: [
      "For ad management services, clients must provide ShapeOdyssey with access to their Meta Business Manager and/or Google Ads accounts.",
      "Ad spend (the budget used to run ads) is separate from our management fee and is billed directly to the client's ad account.",
      "We are not liable for policy violations, account suspensions, or restrictions imposed by Meta or Google on your ad accounts.",
      "We will make every reasonable effort to resolve platform issues on your behalf but cannot guarantee outcomes from third-party platform decisions.",
    ],
  },
  {
    number: "06",
    title: "Acceptable Use",
    items: [
      "You agree not to request content, campaigns, or funnels that promote illegal products, services, or activity.",
      "You agree not to misrepresent your business, product claims, or target audience in materials we create on your behalf.",
      "Violation of acceptable use policies may result in immediate termination of services without refund.",
    ],
  },
  {
    number: "07",
    title: "Termination",
    items: [
      "Either party may terminate a monthly retainer with 30 days' written notice.",
      "One-time project agreements are terminated upon delivery and final payment.",
      "We reserve the right to terminate immediately if a client is found to be in breach of these Terms.",
      "Upon termination, any outstanding invoices become immediately due and payable.",
    ],
  },
  {
    number: "08",
    title: "Limitation of Liability",
    items: [
      "ShapeOdyssey is not liable for indirect, incidental, or consequential damages arising from the use of our services.",
      "We do not guarantee specific results from ad campaigns, funnels, or websites, as outcomes depend on many factors outside our control including market conditions and ad platform algorithms.",
      "Our total liability in any event shall not exceed the total fees paid by you in the three months preceding the claim.",
      "Services are provided on a best-efforts basis in accordance with industry standards.",
    ],
  },
  {
    number: "09",
    title: "Governing Law",
    items: [
      "These Terms & Conditions are governed by the laws of India.",
      "Any disputes shall be subject to the exclusive jurisdiction of courts in India.",
      "We encourage resolving disputes through good-faith negotiation before pursuing legal action.",
    ],
  },
];

export default function TermsConditions() {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
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
      {/* Ambient glow — purple for T&C */}
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(138,43,226,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Hero */}
      <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "120px 32px 64px" }}>
        <div className="animate-in" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(138,43,226,0.08)", border: "1px solid rgba(138,43,226,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8A2BE2", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#8A2BE2", textTransform: "uppercase" }}>Legal Document</span>
        </div>

        <h1 className="animate-in" style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 20px" }}>
          Terms & <span style={{ color: "#8A2BE2" }}>Conditions</span>
        </h1>

        <div className="animate-in" style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>
            Effective Date: <span style={{ color: "#FAFAFA" }}>01/03/2026</span>
          </span>
          <span style={{ width: "1px", height: "14px", background: "#27272A", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>shapeodyssey.com</span>
        </div>

        <p className="animate-in" style={{ fontSize: "16px", lineHeight: 1.8, color: "#A1A1AA", maxWidth: "620px", margin: 0 }}>
          Welcome to ShapeOdyssey. By engaging our services — whether for funnel builds, ad management, website development, or webinars — you agree to be bound by the following Terms & Conditions. Please read them carefully.
        </p>

        <div className="animate-in" style={{ marginTop: "48px", height: "1px", background: "linear-gradient(90deg, rgba(138,43,226,0.4) 0%, rgba(138,43,226,0.08) 60%, transparent 100%)" }} />
      </div>

      {/* Sections */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 32px 100px" }}>
        {sections.map((section, i) => (
          <div key={section.number} ref={(el) => (sectionsRef.current[i] = el)} style={{ opacity: 0, marginBottom: "4px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "rgba(138,43,226,0.5)", letterSpacing: "0.08em", paddingTop: "4px" }}>{section.number}</div>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "16px", color: "#FAFAFA" }}>{section.title}</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px", fontSize: "14px", lineHeight: 1.75, color: "#A1A1AA" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#8A2BE2", flexShrink: 0, marginTop: "8px", opacity: 0.7 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Contact card */}
        <div style={{ marginTop: "48px", padding: "32px", background: "rgba(138,43,226,0.04)", border: "1px solid rgba(138,43,226,0.14)", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#FAFAFA" }}>Questions About These Terms?</h3>
          <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "16px" }}>If you have any questions or concerns regarding these Terms & Conditions, please reach out to our team.</p>
          <a href="mailto:hello@shapeodyssey.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#8A2BE2", textDecoration: "none", letterSpacing: "0.04em" }}>
            <span style={{ opacity: 0.6 }}>✉</span> hello@shapeodyssey.com
          </a>
        </div>

        {/* Cross links */}
        <div style={{ marginTop: "48px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[{ to: "/privacy", label: "Privacy Policy" }, { to: "/refund", label: "Refund Policy" }, { to: "/", label: "← Back to Home" }].map((l) => (
            <Link key={l.to} to={l.to} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525B", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#8A2BE2"}
              onMouseLeave={e => e.target.style.color = "#52525B"}
            >{l.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}