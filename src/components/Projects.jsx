import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const PROJECTS = [
    { title: "BeatByte — Music Streaming App", desc: "Full-stack MERN music streaming platform with JWT authentication, playlist management, liked songs, artist browsing and real-time audio playback controls.", tags: ["React", "Node.js", "Express", "MongoDB", "JWT"], github: "https://github.com/parthbhatt45/Beatbyte-Music", accent: "#22c55e", label: "MERN Stack" },
    { title: "Voyager — Travel Management System", desc: "Responsive travel booking platform with separate user and admin modules for trip and booking management. Built with PHP and MySQL.", tags: ["PHP", "MySQL", "HTML", "CSS"], github: "https://github.com/parthbhatt45/Voyager", accent: "var(--orange)", label: "Full Stack" },
    { title: "Online Shopping Site", desc: "E-commerce website featuring product listings, cart functionality and a simple checkout interface.", tags: ["PHP", "HTML", "CSS", "JavaScript"], github: "https://github.com/parthbhatt45", accent: "#a78bfa", label: "Web App" },
];

const GithubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

function ProjectCard({ p, index, visible, isMobile }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "var(--bg-card)", border: `1px solid ${hovered ? `${p.accent}35` : "rgba(255,255,255,.07)"}`,
                borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)",
                boxShadow: hovered ? "0 20px 56px rgba(0,0,0,.5)" : "none",
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${index * .12}s, transform .25s ease, border-color .25s, box-shadow .25s`,
            }}
        >
            <div style={{ height: "2px", background: p.accent, transformOrigin: "left", transform: hovered ? "scaleX(1)" : "scaleX(0)", transition: "transform .28s ease" }} />
            <div style={{ padding: isMobile ? "20px" : "26px 28px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>PRJ_00{index + 1}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", padding: "3px 10px", borderRadius: "100px", background: `${p.accent}14`, color: p.accent }}>{p.label}</span>
                </div>
                <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: isMobile ? "16px" : "17px", color: "#fff", lineHeight: 1.35, marginBottom: "12px" }}>{p.title}</h3>
                <p style={{ color: "var(--text-mid)", fontSize: "14px", lineHeight: 1.78, marginBottom: "16px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
                    {p.tags.map(t => (
                        <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "11px", padding: "4px 12px", borderRadius: "100px", border: `1px solid ${hovered ? `${p.accent}35` : "rgba(255,255,255,.07)"}`, color: hovered ? p.accent : "var(--text-mid)", background: hovered ? `${p.accent}0d` : "rgba(255,255,255,.03)", transition: "all .25s" }}>{t}</span>
                    ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "10px 22px", borderRadius: "100px",
                    border: `1.5px solid ${hovered ? p.accent : "rgba(255,255,255,.12)"}`,
                    background: hovered ? p.accent : "transparent",
                    color: hovered ? "#fff" : "var(--text-mid)",
                    fontFamily: "var(--display)", fontWeight: 600, fontSize: "13px",
                    textDecoration: "none", transition: "all .25s",
                }}>
                    <GithubIcon /> View Repository
                </a>
            </div>
        </div>
    );
}

export default function Projects() {
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
        <section id="projects" ref={ref} style={{ width: "90%", maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "70px 0" : "110px 0", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <p className="section-label">Build Log</p>
                        <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: isMobile ? "32px" : "48px", color: "#fff", letterSpacing: "-.02em" }}>Projects</h2>
                    </div>
                    <a href="https://github.com/parthbhatt45" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: "13px", padding: "10px 22px" }}>All Repositories →</a>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1024 ? "1fr 1fr" : "repeat(3,1fr)", gap: "20px" }}>
                {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} index={i} visible={visible} isMobile={isMobile} />)}
            </div>
        </section>
    );
}