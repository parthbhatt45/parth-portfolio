import { useEffect, useRef, useState } from "react";

const LINKS = [
    {
        icon: "✉️", label: "Email",
        value: "parthbhatt695@gmail.com",
        href: "mailto:parthbhatt695@gmail.com",
        accent: "var(--orange)",
    },
    {
        icon: "⌨️", label: "GitHub",
        value: "github.com/parthbhatt45",
        href: "https://github.com/parthbhatt45",
        accent: "#fff",
    },
    {
        icon: "💼", label: "LinkedIn",
        value: "linkedin.com/in/parth-bhatt-aa053b292",
        href: "https://www.linkedin.com/in/parth-bhatt-aa053b292",
        accent: "#38bdf8",
    },
    {
        icon: "📄", label: "Resume",
        value: "Download Resume",
        href: "/resume.pdf",
        accent: "#22c55e",
    },
];

export default function Contact() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="contact" ref={ref} style={S.section}>
            <div style={S.inner}>
                {/* Left — heading + info */}
                <div style={{
                    ...S.left,
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
                    transition: "opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1)",
                }}>
                    <span className="section-label">Get In Touch</span>
                    <h2 style={S.heading}>Let's work<br />together</h2>
                    <p style={S.sub}>
                        I'm currently open to internships, freelance work and collaborations.
                        Whether it's a full-time role or just a friendly hello — I'm always active.
                    </p>

                    <div style={S.contactList}>
                        {LINKS.map(({ icon, label, value, href, accent }, i) => (
                            <a key={label} href={href}
                                target={label !== "Email" ? "_blank" : undefined}
                                rel="noreferrer" className="contact-link"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                                    transition: `opacity .5s ease ${i * .1}s, transform .5s ease ${i * .1}s, border-color .25s, background .25s`,
                                }}>
                                <div style={{ ...S.iconWrap, background: `${accent}14` }}>
                                    <span style={{ fontSize: "20px" }}>{icon}</span>
                                </div>
                                <div>
                                    <p style={{ ...S.linkLabel, color: accent }}>{label}</p>
                                    <p style={S.linkValue}>{value}</p>
                                </div>
                                <span style={{ marginLeft: "auto", color: accent, fontSize: "18px" }}>→</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right — contact form */}
                <div style={{
                    ...S.right,
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
                    transition: "opacity .6s cubic-bezier(.16,1,.3,1) .15s, transform .6s cubic-bezier(.16,1,.3,1) .15s",
                }}>
                    <div style={S.formCard}>
                        <div style={S.formRow}>
                            <div style={S.formGroup}>
                                <label style={S.label}>Name *</label>
                                <input style={S.input} placeholder="Parth Bhatt" />
                            </div>
                            <div style={S.formGroup}>
                                <label style={S.label}>Email *</label>
                                <input style={S.input} placeholder="hello@example.com" type="email" />
                            </div>
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Subject</label>
                            <input style={S.input} placeholder="Project inquiry" />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Message *</label>
                            <textarea style={{ ...S.input, ...S.textarea }} placeholder="Tell me about your project..." />
                        </div>
                        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                            Send message →
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={S.footer}>
                <hr className="divider" style={{ marginBottom: "28px" }} />
                <div style={S.footerRow}>
                    <span style={S.footerName}>Parth Bhatt</span>
                    <span style={S.footerMid}>Built with React + Vite</span>
                    <span style={S.footerCopy}>© {new Date().getFullYear()} All rights reserved</span>
                </div>
            </div>
        </section>
    );
}

const S = {
    section: {
        width: "90%", maxWidth: "1280px", margin: "0 auto",
        padding: "110px 0 60px",
        borderTop: "1px solid rgba(255,255,255,.07)",
    },
    inner: { display: "flex", gap: "80px", alignItems: "flex-start", flexWrap: "wrap" },
    left: { flex: "1", minWidth: "280px" },
    heading: { fontFamily: "var(--display)", fontWeight: 800, fontSize: "48px", color: "#fff", letterSpacing: "-.02em", marginBottom: "16px", lineHeight: 1.1 },
    sub: { color: "var(--text-mid)", fontSize: "15px", lineHeight: 1.8, marginBottom: "36px", maxWidth: "420px" },
    contactList: { display: "flex", flexDirection: "column", gap: "12px" },
    iconWrap: { width: "42px", height: "42px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    linkLabel: { fontFamily: "var(--display)", fontWeight: 600, fontSize: "12px", letterSpacing: ".04em", marginBottom: "2px" },
    linkValue: { fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-mid)" },

    /* form */
    right: { flex: "1", minWidth: "300px" },
    formCard: {
        background: "var(--bg-card)", border: "1px solid rgba(255,255,255,.07)",
        borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", gap: "20px",
    },
    formRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
    formGroup: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, minWidth: "140px" },
    label: { fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: ".08em", textTransform: "uppercase" },
    input: {
        background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "var(--radius-sm)", padding: "12px 16px",
        color: "var(--text-main)", fontFamily: "var(--body)", fontSize: "14px",
        outline: "none", width: "100%",
        transition: "border-color .2s",
    },
    textarea: { height: "120px", resize: "vertical" },

    /* footer */
    footer: { marginTop: "80px" },
    footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" },
    footerName: { fontFamily: "var(--display)", fontWeight: 700, fontSize: "16px", color: "var(--orange)" },
    footerMid: { fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" },
    footerCopy: { fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)" },
};