import { useEffect, useRef, useState } from "react";

export default function About() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" ref={ref} style={S.section}>
            <div style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
            }}>
                <span className="section-label">Who I Am</span>
                <h2 style={S.heading}>About Me</h2>
                <p style={S.text}>
                    I am a passionate Information Technology student at Shah & Anchor Kutchhi Engineering College (SAKEC), Mumbai, with a strong interest in web development, UI design, and modern digital experiences. I enjoy building responsive and user-focused websites that combine clean design with practical functionality.<br /><br />

                    My journey in technology started with curiosity and gradually evolved into a deep passion for frontend and full stack development. I work with technologies like HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB while continuously improving my problem-solving and development skills through projects, internships, and certifications.<br /><br />

                    Beyond coding, I enjoy exploring creative tools like Figma and Canva to design visually engaging interfaces and content. I also actively participate in technical learning programs and collaborative activities that help me grow as a communicator, team player, and future software developer.<br /><br />
                    I believe great technology is not just about writing code — it is about creating experiences that are simple, impactful, and meaningful for users.
                </p>
            </div>
        </section>
    );
}

const S = {
    section: {
        width: "90%", maxWidth: "1280px", margin: "0 auto",
        padding: "110px 0",
        borderTop: "1px solid rgba(255,255,255,.07)",
    },
    heading: {
        fontFamily: "var(--display)", fontWeight: 800, fontSize: "48px",
        color: "#fff", letterSpacing: "-.02em", marginBottom: "24px",
    },
    text: {
        color: "var(--text-mid)", lineHeight: 1.9,
        maxWidth: "760px", fontSize: "17px",
    },
};