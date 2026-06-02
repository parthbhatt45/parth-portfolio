import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
        title: "BeatByte — Music Streaming App",
        desc: "Full-stack MERN music streaming platform with JWT authentication, playlist management, liked songs, artist browsing and real-time audio playback controls.",
        tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
        github: "https://github.com/parthbhatt45/Beatbyte-Music",
        accent: "#22c55e",
        label: "MERN Stack",
    },
    {
        title: "Voyager — Travel Management System",
        desc: "Responsive travel booking platform with separate user and admin modules for trip and booking management. Built with PHP and MySQL.",
        tags: ["PHP", "MySQL", "HTML", "CSS"],
        github: "https://github.com/parthbhatt45/Voyager",
        accent: "var(--orange)",
        label: "Full Stack",
    },
    {
        title: "Online Shopping Site",
        desc: "E-commerce website featuring product listings, cart functionality and a simple checkout interface.",
        tags: ["PHP", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/parthbhatt45",
        accent: "#a78bfa",
        label: "Web App",
    },
];

function ProjectCard({ p, index, visible }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...S.card,
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered ? "translateY(-6px)" : "translateY(0)"
                    : "translateY(32px)",
                borderColor: hovered ? `${p.accent}35` : "rgba(255,255,255,.07)",
                boxShadow: hovered ? "0 20px 56px rgba(0,0,0,.5)" : "none",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${index * .12}s,
                     transform .25s ease,
                     border-color .25s, box-shadow .25s`,
            }}
        >
            {/* Accent top bar — reveals on hover */}
            <div style={{
                ...S.topBar,
                background: p.accent,
                transform: hovered ? "scaleX(1)" : "scaleX(0)",
            }} />

            <div style={S.cardInner}>
                {/* Header row */}
                <div style={S.cardHead}>
                    <div style={S.metaRow}>
                        <span style={{ ...S.labelBadge, background: `${p.accent}14`, color: p.accent }}>
                            {p.label}
                        </span>
                        <span style={S.idText}>PRJ_00{index + 1}</span>
                    </div>
                    <h3 style={S.title}>{p.title}</h3>
                </div>

                <p style={S.desc}>{p.desc}</p>

                {/* Tags */}
                <div style={S.tags}>
                    {p.tags.map(t => (
                        <span key={t} style={{
                            ...S.tag,
                            borderColor: hovered ? `${p.accent}35` : "rgba(255,255,255,.07)",
                            color: hovered ? p.accent : "var(--text-mid)",
                            background: hovered ? `${p.accent}0d` : "rgba(255,255,255,.03)",
                            transition: "all .25s",
                        }}>{t}</span>
                    ))}
                </div>

                {/* Repository link only */}
                <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        ...S.repoBtn,
                        background: hovered ? p.accent : "transparent",
                        borderColor: hovered ? p.accent : "rgba(255,255,255,.12)",
                        color: hovered ? "#fff" : "var(--text-mid)",
                        transition: "all .25s",
                    }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Repository
                </a>
            </div>
        </div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .07 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="projects" ref={ref} style={S.section}>
            <div style={{
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)",
            }}>
                <div style={S.topRow}>
                    <div>
                        <p className="section-label">Build Log</p>
                        <h2 style={S.heading}>Projects</h2>
                    </div>
                    <a href="https://github.com/parthbhatt45" target="_blank" rel="noreferrer"
                        className="btn-outline" style={{ alignSelf: "flex-end", fontSize: "13px" }}>
                        All Repositories →
                    </a>
                </div>
            </div>

            <div style={S.grid}>
                {PROJECTS.map((p, i) => (
                    <ProjectCard key={p.title} p={p} index={i} visible={visible} />
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
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" },
    heading: { fontFamily: "var(--display)", fontWeight: 800, fontSize: "48px", color: "#fff", letterSpacing: "-.02em" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px" },
    card: {
        background: "var(--bg-card)", border: "1px solid",
        borderRadius: "var(--radius-lg)", overflow: "hidden",
        position: "relative",
    },
    topBar: {
        height: "2px",
        transformOrigin: "left", transition: "transform .28s ease",
    },
    cardInner: { padding: "26px 28px 28px" },
    cardHead: { marginBottom: "14px" },
    metaRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
    labelBadge: {
        fontFamily: "var(--mono)", fontSize: "10px",
        padding: "3px 10px", borderRadius: "100px", letterSpacing: ".06em",
    },
    idText: { fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" },
    title: { fontFamily: "var(--display)", fontWeight: 700, fontSize: "17px", color: "#fff", lineHeight: 1.35 },
    desc: { color: "var(--text-mid)", fontSize: "14px", lineHeight: 1.78, marginBottom: "18px" },
    tags: { display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "24px" },
    tag: {
        fontFamily: "var(--mono)", fontSize: "11px",
        padding: "4px 12px", borderRadius: "100px", border: "1px solid",
        transition: "all .25s",
    },
    repoBtn: {
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "11px 22px", borderRadius: "100px",
        border: "1.5px solid", fontFamily: "var(--display)",
        fontWeight: 600, fontSize: "13px", cursor: "pointer",
        textDecoration: "none",
    },
};