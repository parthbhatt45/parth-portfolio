import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const EDUCATION = [
    { degree: "B.Tech — Information Technology", school: "Shah & Anchor Kutchhi Engineering College (SAKEC), Mumbai", period: "2023 — 2027", grade: "CGPA 8.94", status: "IN PROGRESS", accent: "var(--orange)" },
    { degree: "Higher Secondary Certificate (HSC) — Science", school: "Kiran Patil Jr. College, Maharashtra State Board", period: "2021 — 2023", grade: "70.33%", status: "COMPLETED", accent: "#a78bfa" },
    { degree: "Secondary School Certificate (SSC) — 10th", school: "Royal Academy School, Maharashtra State Board", period: "2021", grade: "89.20%", status: "COMPLETED", accent: "#22c55e" },
];

function EduCard({ edu, index, visible, isMobile }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? "var(--bg-card2)" : "var(--bg-card)",
                border: "1px solid rgba(255,255,255,.07)",
                borderLeft: `3px solid ${hovered ? edu.accent : "rgba(255,255,255,.12)"}`,
                borderRadius: "0 var(--radius-lg) var(--radius-lg) 0",
                padding: isMobile ? "20px 18px" : "26px 32px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                gap: isMobile ? "12px" : "24px",
                flexWrap: "wrap",
                opacity: visible ? 1 : 0,
                transform: visible ? (hovered ? "translateX(6px)" : "translateX(0)") : "translateX(-28px)",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${index * .13}s, transform .25s ease, border-color .25s, background .25s, box-shadow .25s`,
                boxShadow: hovered ? "0 8px 32px rgba(0,0,0,.4)" : "none",
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: ".08em" }}>EDU_00{index + 1}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "3px 10px", borderRadius: "100px", background: `${edu.accent}14`, color: edu.accent, letterSpacing: ".06em" }}>
                        {edu.status === "IN PROGRESS" ? "● " : "✓ "}{edu.status}
                    </span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: isMobile ? "15px" : "17px", color: "#fff", marginBottom: "6px", lineHeight: 1.35 }}>{edu.degree}</h3>
                <p style={{ color: "var(--text-mid)", fontSize: isMobile ? "13px" : "14px", marginBottom: "4px" }}>{edu.school}</p>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: edu.accent }}>{edu.period}</span>
            </div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: isMobile ? "20px" : "24px", color: edu.accent, whiteSpace: "nowrap" }}>{edu.grade}</div>
        </div>
    );
}

export default function Education() {
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
        <section id="education" ref={ref} style={{ width: "90%", maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "70px 0" : "110px 0", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)" }}>
                <p className="section-label">Academic Log</p>
                <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: isMobile ? "32px" : "48px", color: "#fff", letterSpacing: "-.02em", marginBottom: "40px" }}>Education</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {EDUCATION.map((e, i) => <EduCard key={e.degree} edu={e} index={i} visible={visible} isMobile={isMobile} />)}
            </div>
        </section>
    );
}