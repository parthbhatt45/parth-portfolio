import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

const ROLES = ["Full Stack Developer", "MERN Stack Engineer", "React Specialist", "Frontend Developer"];

const SOCIAL_LINKS = [
  {
    label: "GitHub", href: "https://github.com/parthbhatt45",
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>,
  },
  {
    label: "LinkedIn", href: "https://www.linkedin.com/in/parth-bhatt-aa053b292",
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: "Email", href: "mailto:parthbhatt695@gmail.com",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>,
  },
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = ROLES[idx]; let t;
    if (!del && text.length < cur.length)
      t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 66);
    else if (!del && text.length === cur.length)
      t = setTimeout(() => setDel(true), 1900);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(cur.slice(0, text.length - 1)), 36);
    else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ fontFamily: "var(--body)", fontSize: "clamp(15px,2.5vw,19px)", fontWeight: 400, color: "var(--text-mid)" }}>{text}</span>
      <span style={{ color: "var(--orange)", fontSize: "19px", animation: "blink 1s step-end infinite" }}>|</span>
    </div>
  );
}

export default function Hero() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      width: "90%", maxWidth: "1280px", margin: "0 auto",
      minHeight: "100vh", display: "flex", alignItems: "center",
      paddingTop: isMobile ? "90px" : "76px",
      paddingBottom: isMobile ? "60px" : "40px",
      position: "relative",
    }}>
      {/* Glows */}
      <div style={{ position: "fixed", top: "-80px", left: "-80px", width: "560px", height: "560px", background: "radial-gradient(circle,rgba(255,107,43,.065) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-60px", right: "40px", width: "420px", height: "420px", background: "radial-gradient(circle,rgba(255,107,43,.035) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "48px" : isTablet ? "40px" : "80px",
        width: "100%", position: "relative", zIndex: 1,
      }}>
        {/* ── LEFT ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Available badge */}
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)",
            borderRadius: "100px", padding: "7px 16px", marginBottom: "24px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#22c55e", letterSpacing: ".08em" }}>Available for work</span>
          </div>

          {/* Heading */}
          <h1 className="fade-up" style={{ marginBottom: "14px", lineHeight: 1 }}>
            <span style={{
              fontFamily: "var(--display)", fontWeight: 800,
              fontSize: isMobile ? "22px" : "32px",
              color: "var(--text-mid)",
              letterSpacing: ".1em", textTransform: "uppercase",
              display: "block", marginBottom: "8px",
            }}>Parth Bhatt</span>
            <span style={{
              fontFamily: "var(--display)", fontWeight: 800,
              fontSize: isMobile ? "clamp(44px,12vw,56px)" : isTablet ? "52px" : "60px",
              color: "#fff", letterSpacing: "-.025em", lineHeight: .95, display: "block",
            }}>
              Software<br />
              <span style={{ color: "var(--orange)" }}>Developer</span>
            </span>
          </h1>

          {/* Typewriter */}
          <div className="fade-up" style={{ animationDelay: ".15s", marginBottom: "0" }}>
            <Typewriter />
          </div>

          {/* Description */}
          <p className="fade-up" style={{
            animationDelay: ".22s",
            color: "var(--text-mid)", lineHeight: 1.85,
            marginTop: "20px", fontSize: isMobile ? "14px" : "15px",
            maxWidth: "480px",
          }}>
            B.Tech Information Technology undergraduate at SAKEC, Mumbai.
            I design and develop responsive, user-focused web applications
            with modern frontend technologies and a growing passion for full stack development.
          </p>

          {/* Buttons */}
          <div className="fade-up" style={{
            animationDelay: ".3s",
            marginTop: "32px", display: "flex", gap: "12px",
            flexWrap: "wrap",
          }}>
            <button className="btn-primary" style={{ padding: isMobile ? "12px 24px" : "14px 32px", fontSize: isMobile ? "13px" : "14px" }}
              onClick={() => go("#projects")}>View Projects</button>
            <button className="btn-outline" style={{ padding: isMobile ? "11px 22px" : "13px 30px", fontSize: isMobile ? "13px" : "14px" }}
              onClick={() => go("#contact")}>Get In Touch</button>
          </div>

          {/* Social links */}
          <div className="fade-up" style={{
            animationDelay: ".38s",
            display: "flex", gap: "10px", alignItems: "center",
            marginTop: "24px", flexWrap: "wrap",
          }}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "8px 14px",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "100px",
                  color: "var(--text-mid)",
                  textDecoration: "none",
                  fontFamily: "var(--body)", fontWeight: 500, fontSize: "13px",
                  transition: "color .2s, border-color .2s, transform .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-mid)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — image ── */}
        {/* On mobile show image below content but smaller */}
        <div className="fade-in" style={{
          flexShrink: 0,
          width: isMobile ? "100%" : isTablet ? "280px" : "370px",
          display: "flex", justifyContent: isMobile ? "center" : "flex-end",
        }}>
          <div style={{
            position: "relative",
            width: isMobile ? "min(280px, 80vw)" : isTablet ? "280px" : "370px",
            borderRadius: "var(--radius-xl)", overflow: "hidden",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,.6)",
          }}>
            <span style={{ position: "absolute", top: 0, left: 0, width: "44px", height: "44px", borderTop: "2px solid var(--orange)", borderLeft: "2px solid var(--orange)", borderRadius: "var(--radius-xl) 0 0 0", zIndex: 5, pointerEvents: "none" }} />
            <span style={{ position: "absolute", bottom: 0, right: 0, width: "44px", height: "44px", borderBottom: "2px solid var(--orange)", borderRight: "2px solid var(--orange)", borderRadius: "0 0 var(--radius-xl) 0", zIndex: 5, pointerEvents: "none" }} />
            <img
              src="/src/assets/profile.jpeg" alt="Parth Bhatt"
              style={{ width: "100%", height: isMobile ? "320px" : isTablet ? "340px" : "460px", objectFit: "cover", objectPosition: "top center", display: "block" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ width: "100%", height: isMobile ? "320px" : "460px", background: "var(--bg-card)", alignItems: "center", justifyContent: "center", display: "none" }}>
              <span style={{ fontFamily: "var(--display)", fontSize: "80px", fontWeight: 800, color: "rgba(255,107,43,.15)" }}>PB</span>
            </div>
            <div style={{
              position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
              background: "rgba(13,13,13,.9)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,.1)", borderRadius: "100px",
              padding: "9px 18px", whiteSpace: "nowrap", zIndex: 10,
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#fff", fontWeight: 500 }}>Open To Work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}