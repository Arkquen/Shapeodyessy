import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    items: [
      "Personal information (name, email address, WhatsApp number, and billing details) when you register for a webinar, enquire about a service, or become a client.",
      "Business information (company name, industry, marketing goals) collected during onboarding for funnel builds, ad management, or website projects.",
      "Usage data (IP address, browser type, device info, pages visited, time on site) collected automatically when you visit our website.",
      "Communication data from emails, WhatsApp messages, and any other correspondence between you and our team.",
      "Transactional data related to service payments and project agreements.",
    ],
  },
  {
    number: "02",
    title: "How We Use Your Information",
    items: [
      "To deliver and manage services you have engaged us for — including funnel builds, Facebook Ads management, Google Ads management, website development, and monthly retainers.",
      "To send webinar session links, reminders, and session recordings to registered attendees via WhatsApp and email.",
      "To communicate project updates, performance reports, deliverables, and invoices.",
      "To send promotional communications about our services, upcoming webinars, and exclusive offers. You may opt out at any time.",
      "To respond to enquiries and provide ongoing client support.",
      "To improve our website, services, and overall client experience.",
      "To comply with applicable legal obligations.",
    ],
  },
  {
    number: "03",
    title: "Data Protection",
    items: [
      "We use industry-standard security measures including SSL/TLS encryption for all data transmissions.",
      "Your personal data is never sold, rented, or traded to third parties.",
      "Access to your data is restricted to team members directly involved in delivering your project or service.",
      "We use trusted third-party platforms (CRM tools, email platforms, payment processors, Meta Ads, Google Ads) that are contractually bound to protect your data under their own privacy policies.",
    ],
  },
  {
    number: "04",
    title: "Cookies & Tracking",
    items: [
      "Our website uses cookies to improve user experience and measure performance.",
      "We use analytics tools (e.g. Google Analytics) to understand how visitors use our site.",
      "We use marketing pixels (Meta Pixel, Google Ads tag) to run and optimise our advertising campaigns.",
      "You can manage or disable cookies through your browser settings. Disabling certain cookies may affect site functionality.",
    ],
  },
  {
    number: "05",
    title: "Data Retention",
    items: [
      "Client project data is retained for a minimum of 2 years after project completion to support any future queries or disputes.",
      "Webinar registration data is retained for 12 months.",
      "Upon written request, we will delete your personal data except where retention is required by law.",
      "Anonymised, aggregated data may be retained indefinitely for internal analytics and reporting.",
    ],
  },
  {
    number: "06",
    title: "Third-Party Services",
    items: [
      "We work with third-party platforms including payment gateways, CRM systems, email marketing tools, and advertising platforms.",
      "These providers operate under their own privacy policies and are responsible for their own data handling.",
      "We ensure all third-party providers we engage meet adequate data protection standards.",
    ],
  },
  {
    number: "07",
    title: "Your Rights",
    items: [
      "Right to access: Request a copy of the personal data we hold about you.",
      "Right to correction: Request correction of inaccurate or incomplete information.",
      "Right to deletion: Request deletion of your personal data, subject to legal obligations.",
      "Right to object: Object to processing of your data for marketing communications at any time.",
      "To exercise any of these rights, contact us at the details below.",
    ],
  },
];

export default function PrivacyPolicy() {
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
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Hero */}
      <div ref={heroRef} style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "120px 32px 64px" }}>
        <div className="animate-in" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.18)", borderRadius: "100px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00F5FF", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", color: "#00F5FF", textTransform: "uppercase" }}>Legal Document</span>
        </div>

        <h1 className="animate-in" style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 20px" }}>
          Privacy <span style={{ color: "#00F5FF" }}>Policy</span>
        </h1>

        <div className="animate-in" style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>
            Effective Date: <span style={{ color: "#FAFAFA" }}>01/03/2026</span>
          </span>
          <span style={{ width: "1px", height: "14px", background: "#27272A", display: "inline-block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A1A1AA", letterSpacing: "0.06em" }}>shapeodyssey.com</span>
        </div>

        <p className="animate-in" style={{ fontSize: "16px", lineHeight: 1.8, color: "#A1A1AA", maxWidth: "620px", margin: 0 }}>
          At ShapeOdyssey, we value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our services — including funnel builds, ad management, website development, and webinars.
        </p>

        <div className="animate-in" style={{ marginTop: "48px", height: "1px", background: "linear-gradient(90deg, rgba(0,245,255,0.3) 0%, rgba(0,245,255,0.06) 60%, transparent 100%)" }} />
      </div>

      {/* Sections */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 32px 100px" }}>
        {sections.map((section, i) => (
          <div key={section.number} ref={(el) => (sectionsRef.current[i] = el)} style={{ opacity: 0, marginBottom: "4px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "rgba(0,245,255,0.4)", letterSpacing: "0.08em", paddingTop: "4px" }}>{section.number}</div>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "16px", color: "#FAFAFA" }}>{section.title}</h2>
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
        <div style={{ marginTop: "48px", padding: "32px", background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.12)", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#FAFAFA" }}>Contact Us</h3>
          <p style={{ fontSize: "14px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "16px" }}>For privacy-related queries or to exercise your data rights, reach out to us at:</p>
          <a href="mailto:hello@shapeodyssey.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#00F5FF", textDecoration: "none", letterSpacing: "0.04em" }}>
            <span style={{ opacity: 0.6 }}>✉</span> hello@shapeodyssey.com
          </a>
        </div>

        {/* Cross links */}
        <div style={{ marginTop: "48px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {[{ to: "/terms", label: "Terms & Conditions" }, { to: "/refund", label: "Refund Policy" }, { to: "/", label: "← Back to Home" }].map((l) => (
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