import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        fn();
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: "-40% 0px -55% 0px" }
        );
        sections.forEach(s => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    const goto = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header style={{
            position: "fixed", top: 0, width: "100%", zIndex: 1000,
            background: scrolled ? "rgba(13,13,13,0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.05)" : "none",
            transition: "background .3s, box-shadow .3s",
        }}>
            <nav style={{
                width: "90%", maxWidth: "1280px", margin: "0 auto",
                height: "70px", display: "flex",
                justifyContent: "space-between", alignItems: "center", gap: "16px",
            }}>

                {/* Logo */}
                <a href="#home" onClick={e => goto(e, "#home")} style={{
                    fontFamily: "var(--display)", fontWeight: 800, fontSize: "20px",
                    color: "#fff", textDecoration: "none", letterSpacing: "-.02em", flexShrink: 0,
                }}>
                    Parth<span style={{ color: "var(--orange)" }}>.</span>
                </a>

                {/* Desktop links */}
                <ul className="desktop-nav" style={{
                    display: "flex", gap: "24px", alignItems: "center", listStyle: "none",
                }}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                            <a href={href} onClick={e => goto(e, href)}
                                className={`nav-link${active === href.slice(1) ? " active" : ""}`}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a href="/resume.pdf" target="_blank" rel="noreferrer"
                    className="btn-primary desktop-cta"
                    style={{ padding: "9px 22px", fontSize: "13px" }}>
                    Resume →
                </a>

                {/* Hamburger */}
                <button className="hamburger-btn" onClick={() => setMenuOpen(o => !o)}
                    aria-label="menu"
                    style={{
                        flexDirection: "column", gap: "5px",
                        background: "none", border: "none", cursor: "pointer", padding: "8px",
                    }}>
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            display: "block", width: "22px", height: "1.5px",
                            background: "#fff", borderRadius: "1px", transition: "all .3s",
                            transform: menuOpen
                                ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                                    : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none"
                                : "none",
                            opacity: menuOpen && i === 1 ? 0 : 1,
                        }} />
                    ))}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    position: "absolute", top: "100%", left: 0, right: 0,
                    background: "rgba(13,13,13,.98)", backdropFilter: "blur(20px)",
                    display: "flex", flexDirection: "column",
                    padding: "20px 5% 24px", gap: "4px",
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                    boxShadow: "0 16px 40px rgba(0,0,0,.5)",
                }}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={label} href={href} onClick={e => goto(e, href)} style={{
                            textDecoration: "none",
                            fontFamily: "var(--body)", fontSize: "16px", fontWeight: 500,
                            color: active === href.slice(1) ? "var(--orange)" : "var(--text-mid)",
                            padding: "12px 0",
                            borderBottom: "1px solid rgba(255,255,255,.04)",
                            transition: "color .2s",
                        }}>{label}</a>
                    ))}
                    <a href="/resume.pdf" target="_blank" rel="noreferrer"
                        className="btn-primary"
                        style={{ marginTop: "16px", justifyContent: "center" }}>
                        Hire Me →
                    </a>
                </div>
            )}
        </header>
    );
}