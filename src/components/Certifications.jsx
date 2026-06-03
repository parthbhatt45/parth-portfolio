import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const CERTS = [
    { title: "Web Development Internship — SAKEC", accent: "var(--orange)" },
    { title: "Python Essentials 1 — Cisco", accent: "#22c55e" },
    { title: "Basics of Python — Infosys", accent: "#22c55e" },
    { title: "Introduction to Cybersecurity — Cisco", accent: "#38bdf8" },
    { title: "C++ Internship — Concept Simplified", accent: "#a78bfa" },
    { title: "Programming Essentials in C — Cisco", accent: "#fb923c" },
];

function CertCard({ cert, index, visible }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? "var(--bg-card2)" : "var(--bg-card)",
                border: `1px solid ${hovered ? `${cert.accent}35` : "rgba(255,255,255,.07)"}`,
                borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? (hovered ? "translateY(-5px)" : "translateY(0)") : "translateY(28px)",
                boxShadow: hovered ? "0 14px 40px rgba(0,0,0,.45)" : "none",
                transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${index * .08}s, transform .25s ease, border-color .25s, background .25s, box-shadow .25s`,
            }}
        >
            <div style={{ height: "2px", background: cert.accent, transformOrigin: "left", transform: hovered ? "scaleX(1)" : "scaleX(0)", transition: "transform .28s ease" }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "20px 20px 22px" }}>
                <div style={{ fontFamily: "var(--mono)", fontWeight: 500, fontSize: "13px", width: "36px", height: "36px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `${cert.accent}14`, color: cert.accent }}>
                    {String(index + 1).padStart(2, "0")}
                </div>
                <p style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "14px", lineHeight: 1.55, color: hovered ? "#fff" : "var(--text-main)", transition: "color .25s" }}>{cert.title}</p>
            </div>
        </div>
    );
}

export default function Certifications() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const w = useWindowWidth();
    const isMobile = w < 768;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .07 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="certifications" ref={ref} style={{ width: "90%", maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "70px 0" : "110px 0", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)" }}>
                <p className="section-label">Credentials</p>
                <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: isMobile ? "32px" : "48px", color: "#fff", letterSpacing: "-.02em", marginBottom: "40px" }}>Certifications</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1024 ? "1fr 1fr" : "repeat(3,1fr)", gap: "16px" }}>
                {CERTS.map((c, i) => <CertCard key={c.title} cert={c} index={i} visible={visible} />)}
            </div>
        </section>
    );
}