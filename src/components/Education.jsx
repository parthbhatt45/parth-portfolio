import { useEffect, useRef, useState } from "react";

const EDUCATION = [
    {
        degree: "B.Tech — Information Technology",
        school: "Shah & Anchor Kutchhi Engineering College (SAKEC), Mumbai",
        period: "2023 — 2027",
        grade: "CGPA 8.94",
        status: "IN PROGRESS",
        accent: "var(--orange)",
    },
    {
        degree: "Higher Secondary Certificate (HSC) — Science",
        school: "Kiran Patil Jr. College, Maharashtra State Board",
        period: "2021 — 2023",
        grade: "70.33%",
        status: "COMPLETED",
        accent: "#a78bfa",
    },
    {
        degree: "Secondary School Certificate (SSC) — 10th",
        school: "Royal Academy School, Maharashtra State Board",
        period: "2021",
        grade: "89.20%",
        status: "COMPLETED",
        accent: "#22c55e",
    },
];

function EduCard({ edu, index, visible }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...S.card,
                borderLeftColor: hovered ? edu.accent : "rgba(255,255,255,.12)",
                background: hovered ? "var(--bg-card2)" : "var(--bg-card)",
                transform: visible
                    ? hovered ? "translateX(6px)" : "translateX(0)"
                    : "translateX(-28px)",
                opacity: visible ? 1 : 0,
                boxShadow: hovered ? "0 8px 32px rgba(0,0,0,.4)" : "none",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${index * .13}s,
                     transform .25s ease,
                     border-color .25s, background .25s, box-shadow .25s`,
            }}
        >
            <div style={S.cardLeft}>
                {/* Status + ID row */}
                <div style={S.topRow}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", letterSpacing: ".08em" }}>
                        EDU_00{index + 1}
                    </span>
                    <span style={{
                        ...S.statusBadge,
                        background: `${edu.accent}14`,
                        color: edu.accent,
                        borderColor: `${edu.accent}30`,
                    }}>
                        {edu.status === "IN PROGRESS" ? "● " : "✓ "}{edu.status}
                    </span>
                </div>

                <h3 style={S.degree}>{edu.degree}</h3>
                <p style={S.school}>{edu.school}</p>
                <span style={{ ...S.period, color: edu.accent }}>{edu.period}</span>
            </div>

            {/* Grade — right side */}
            <div style={{ ...S.grade, color: edu.accent }}>{edu.grade}</div>
        </div>
    );
}

export default function Education() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .07 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="education" ref={ref} style={S.section}>
            <div style={{
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)",
            }}>
                <p className="section-label">Academic Log</p>
                <h2 style={S.heading}>Education</h2>
            </div>

            <div style={S.list}>
                {EDUCATION.map((e, i) => (
                    <EduCard key={e.degree} edu={e} index={i} visible={visible} />
                ))}
            </div>
        </section>
    );
}

const S = {
    section: {
        width: "90%", maxWidth: "1280px", margin: "0 auto",
        padding: "110px 0", borderTop: "1px solid rgba(255,255,255,.07)",
    },
    heading: { fontFamily: "var(--display)", fontWeight: 800, fontSize: "48px", color: "#fff", letterSpacing: "-.02em", marginBottom: "48px" },
    list: { display: "flex", flexDirection: "column", gap: "16px" },
    card: {
        border: "1px solid rgba(255,255,255,.07)",
        borderLeft: "3px solid",
        borderRadius: "0 var(--radius-lg) var(--radius-lg) 0",
        padding: "26px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: "24px", flexWrap: "wrap",
    },
    cardLeft: { flex: 1 },
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
    statusBadge: {
        fontFamily: "var(--mono)", fontSize: "10px",
        padding: "3px 10px", borderRadius: "100px",
        border: "1px solid", letterSpacing: ".06em",
    },
    degree: { fontFamily: "var(--display)", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "6px", lineHeight: 1.35 },
    school: { color: "var(--text-mid)", fontSize: "14px", marginBottom: "6px" },
    period: { fontFamily: "var(--mono)", fontSize: "12px", display: "block" },
    grade: { fontFamily: "var(--display)", fontWeight: 800, fontSize: "24px", whiteSpace: "nowrap", letterSpacing: "-.01em" },
};