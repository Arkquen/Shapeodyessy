import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stages = [
  { label: "TRAFFIC",   count: "10,000", widthPct: 100, color: "rgba(0,210,230,0.55)",  border: "rgba(0,220,240,0.5)",  glow: "rgba(0,220,240,0.25)", colorB: "rgba(0,160,180,0.4)"  },
  { label: "LEADS",     count: "3,200",  widthPct: 82,  color: "rgba(50,130,255,0.55)", border: "rgba(70,150,255,0.45)", glow: "rgba(60,130,255,0.2)", colorB: "rgba(30,90,210,0.4)"  },
  { label: "PROSPECTS", count: "1,100",  widthPct: 64,  color: "rgba(100,75,255,0.6)",  border: "rgba(120,100,255,0.45)",glow: "rgba(100,80,255,0.2)", colorB: "rgba(75,50,220,0.45)" },
  { label: "QUALIFIED", count: "380",    widthPct: 46,  color: "rgba(150,45,235,0.65)", border: "rgba(165,65,245,0.5)", glow: "rgba(150,45,235,0.25)",colorB: "rgba(120,30,200,0.5)" },
  { label: "CONVERTED", count: "142",    widthPct: 30,  color: "rgba(190,40,210,0.75)", border: "rgba(205,70,225,0.6)", glow: "rgba(190,40,210,0.4)", colorB: "rgba(160,30,180,0.6)" },
];

const CONVERSIONS = ["32%", "34%", "35%", "37%"];

export default function FunnelHero() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const bars       = wrapRef.current?.querySelectorAll(".funnel-stage");
    const connectors = wrapRef.current?.querySelectorAll(".funnel-connector");
    const badges     = wrapRef.current?.querySelectorAll(".funnel-badge");
    if (!bars?.length) return;

    gsap.set(bars,       { opacity: 0, y: 30 });
    gsap.set(connectors, { opacity: 0 });
    gsap.set(badges,     { opacity: 0, scale: 0.8 });

    gsap.to(bars,       { opacity: 1, y: 0, duration: 0.65, stagger: 0.11, ease: "power3.out", delay: 0.3 });
    gsap.to(connectors, { opacity: 1,        duration: 0.4,  stagger: 0.11, ease: "power2.out", delay: 0.52 });
    gsap.to(badges,     { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.5)", delay: 1.1 });

    const listeners = [];
    bars.forEach((bar) => {
      const onEnter = () => gsap.to(bar, { scale: 1.025, duration: 0.25, ease: "power2.out" });
      const onLeave = () => gsap.to(bar, { scale: 1,     duration: 0.35, ease: "power2.out" });
      bar.addEventListener("mouseenter", onEnter);
      bar.addEventListener("mouseleave", onLeave);
      listeners.push({ bar, onEnter, onLeave });
    });

    return () => {
      listeners.forEach(({ bar, onEnter, onLeave }) => {
        bar.removeEventListener("mouseenter", onEnter);
        bar.removeEventListener("mouseleave", onLeave);
      });
      gsap.killTweensOf([bars, connectors, badges]);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full flex items-center justify-center">

      {/* Badge — conv rate (top left) */}
      <div
        className="funnel-badge absolute left-2 top-4 rounded-xl z-10"
        style={{
          background: "rgba(6,6,14,0.92)",
          border: "1px solid rgba(0,245,255,0.3)",
          backdropFilter: "blur(10px)",
          padding: "10px 16px",
        }}
      >
        <div className="font-mono font-bold text-primary" style={{ fontSize: "22px", lineHeight: 1 }}>1.42%</div>
        <div className="font-mono text-text-dim uppercase tracking-widest mt-1" style={{ fontSize: "9px" }}>Conv. Rate</div>
      </div>

      {/* Badge — response (top right) */}
      <div
        className="funnel-badge absolute right-2 top-4 rounded-xl z-10"
        style={{
          background: "rgba(6,6,14,0.92)",
          border: "1px solid rgba(138,43,226,0.35)",
          backdropFilter: "blur(10px)",
          padding: "10px 16px",
        }}
      >
        <div className="font-mono font-bold text-secondary" style={{ fontSize: "22px", lineHeight: 1 }}>&lt;2s</div>
        <div className="font-mono text-text-dim uppercase tracking-widest mt-1" style={{ fontSize: "9px" }}>Response</div>
      </div>

      {/* Funnel */}
      <div className="w-full flex flex-col items-center px-8">
        {stages.map((s, i) => (
          <div key={s.label} className="w-full flex flex-col items-center">

            {/* Bar */}
            <div
              className="funnel-stage relative flex items-center justify-between cursor-pointer overflow-hidden"
              style={{
                width: `${s.widthPct}%`,
                height: "62px",
                borderRadius: "12px",
                border: `1px solid ${s.border}`,
                background: `linear-gradient(135deg, ${s.color}, ${s.colorB})`,
                boxShadow: `0 0 28px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`,
                padding: "0 22px",
              }}
            >
              {/* shine */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%)", borderRadius: "12px", pointerEvents: "none" }} />
              <span className="font-mono font-semibold text-white relative z-10" style={{ fontSize: s.widthPct < 38 ? "10px" : "12px", letterSpacing: "0.1em" }}>
                {s.label}
              </span>
              <span className="font-mono text-white/60 relative z-10" style={{ fontSize: s.widthPct < 38 ? "10px" : "12px" }}>
                {s.count}
              </span>
            </div>

            {/* Connector */}
            {i < stages.length - 1 && (
              <div className="funnel-connector flex flex-col items-center" style={{ height: "30px" }}>
                <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
                <span className="font-mono text-white/25" style={{ fontSize: "9px", letterSpacing: "0.05em", lineHeight: 1, margin: "2px 0" }}>
                  ↓ {CONVERSIONS[i]}
                </span>
                <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}