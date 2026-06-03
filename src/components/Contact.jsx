import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const LINKS = [
    {
        label: "Email", value: "parthbhatt695@gmail.com",
        href: "mailto:parthbhatt695@gmail.com", accent: "var(--orange)",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>,
    },
    {
        label: "GitHub", value: "github.com/parthbhatt45",
        href: "https://github.com/parthbhatt45", accent: "#fff",
        icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>,
    },
    {
        label: "LinkedIn", value: "in/parth-bhatt-aa053b292",
        href: "https://www.linkedin.com/in/parth-bhatt-aa053b292", accent: "#38bdf8",
        icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    },
    {
        label: "Resume", value: "Download Resume",
        href: "/resume.pdf", accent: "#22c55e",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9 15 12 18 15 15" /></svg>,
    },
];

const LEFT_LINKS = LINKS.slice(0, 2); // Email + GitHub
const RIGHT_LINKS = LINKS.slice(2, 4); // LinkedIn + Resume

function LinkCard({ item, visible, delay }) {
    return (
        <a
            href={item.href}
            target={item.label !== "Email" ? "_blank" : undefined}
            rel="noreferrer"
            className="contact-link"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}s, transform .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
            }}
        >
            <div style={{
                width: "44px", height: "44px", borderRadius: "var(--radius-sm)",
                background: `${item.accent}14`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, color: item.accent,
            }}>
                <div style={{ width: "20px", height: "20px" }}>{item.icon}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    fontFamily: "var(--display)", fontWeight: 600,
                    fontSize: "13px", color: item.accent,
                    letterSpacing: ".04em", marginBottom: "3px",
                }}>{item.label}</p>
                <p style={{
                    fontFamily: "var(--mono)", fontSize: "13px",
                    color: "var(--text-mid)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{item.value}</p>
            </div>
            <span style={{ color: item.accent, fontSize: "20px", flexShrink: 0 }}>→</span>
        </a>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const w = useWindowWidth();
    const isMobile = w < 768;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="contact" ref={ref} style={{
            width: "90%", maxWidth: "1280px", margin: "0 auto",
            padding: isMobile ? "70px 0 40px" : "110px 0 60px",
            borderTop: "1px solid rgba(255,255,255,.07)",
        }}>

            {/* Heading */}
            <div style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)",
                marginBottom: "48px",
            }}>
                <p className="section-label">Get In Touch</p>
                <h2 style={{
                    fontFamily: "var(--display)", fontWeight: 800,
                    fontSize: isMobile ? "32px" : "48px",
                    color: "#fff", letterSpacing: "-.02em",
                    marginBottom: "16px", lineHeight: 1.1,
                }}>
                    Let's work<br />together
                </h2>
                <p style={{
                    color: "var(--text-mid)",
                    fontSize: isMobile ? "14px" : "15px",
                    lineHeight: 1.8, maxWidth: "520px",
                }}>
                    I'm currently open to internships, freelance work and collaborations.
                    Whether it's a full-time role or just a friendly hello — I'm always active.
                </p>
            </div>

            {/* 2 × 2 grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "12px",
            }}>
                {LINKS.map((item, i) => (
                    <LinkCard key={item.label} item={item} visible={visible} delay={0.08 + i * 0.08} />
                ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: "72px" }}>
                <hr className="divider" style={{ marginBottom: "24px" }} />
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexWrap: "wrap", gap: "8px",
                }}>
                    <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "16px", color: "var(--orange)" }}>
                        Parth Bhatt
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                        Built with React + Vite
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                        © {new Date().getFullYear()} All rights reserved
                    </span>
                </div>
            </div>
        </section>
    );
}