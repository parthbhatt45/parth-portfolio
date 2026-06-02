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
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* active section via IntersectionObserver */
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
            ...S.header,
            background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.05)" : "none",
        }}>
            <nav style={S.nav}>

                {/* Logo */}
                <a href="#home" onClick={e => goto(e, "#home")} style={S.logo}>
                    Parth<span style={{ color: "var(--orange)" }}>.</span>
                </a>

                {/* Desktop links */}
                <ul style={S.menu}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={label} style={{ listStyle: "none" }}>
                            <a href={href} onClick={e => goto(e, href)}
                                className={`nav-link${active === href.slice(1) ? " active" : ""}`}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hire me CTA */}
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-primary"
                    style={{ padding: "10px 24px", fontSize: "13px" }}>
                    Resume →
                </a>

                {/* Hamburger */}
                <button style={S.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="menu">
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            ...S.bar,
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
                <div style={S.mobileMenu}>
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={label} href={href} onClick={e => goto(e, href)} style={{
                            ...S.mobileLink,
                            color: active === href.slice(1) ? "var(--orange)" : "var(--text-mid)",
                        }}>{label}</a>
                    ))}
                    <a href="/resume.pdf" target="_blank" rel="noreferrer"
                        className="btn-primary" style={{ marginTop: "8px", justifyContent: "center" }}>
                        Hire Me →
                    </a>
                </div>
            )}
        </header>
    );
}

const S = {
    header: {
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        transition: "background .3s, box-shadow .3s",
    },
    nav: {
        width: "90%", maxWidth: "1280px", margin: "0 auto",
        height: "76px", display: "flex",
        justifyContent: "space-between", alignItems: "center", gap: "24px",
    },
    logo: {
        fontFamily: "var(--display)", fontWeight: 800, fontSize: "22px",
        color: "#fff", textDecoration: "none", letterSpacing: "-.02em",
    },
    menu: { display: "flex", gap: "28px", alignItems: "center", listStyle: "none" },
    hamburger: {
        display: "none", flexDirection: "column", gap: "5px",
        background: "none", border: "none", cursor: "pointer", padding: "4px",
    },
    bar: {
        display: "block", width: "22px", height: "1.5px",
        background: "#fff", borderRadius: "1px", transition: "all .3s",
    },
    mobileMenu: {
        position: "absolute", top: "100%", left: 0, right: 0,
        background: "rgba(13,13,13,.97)", backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        padding: "24px 5% 28px", gap: "18px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
    },
    mobileLink: {
        textDecoration: "none", fontFamily: "var(--body)", fontSize: "16px",
        transition: "color .2s",
    },
};