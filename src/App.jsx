import { useEffect, useState } from "react";
import { academy } from "./data/academy.js";
import { media } from "./data/media.js";
import { studentResults, pastEvents } from "./data/results.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Courses from "./components/Courses.jsx";
import Results from "./components/Results.jsx";
import Teachers from "./components/Teachers.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [courseChoice, setCourseChoice] = useState("");
  const [scrollState, setScrollState] = useState({ progress: 0, showTop: false, active: "home" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = document.querySelectorAll(".section h2, .course-card, .result-card, .teacher-card, .gallery-card");
    if (!reduced && "IntersectionObserver" in window) {
      revealTargets.forEach((el, i) => { el.classList.add("reveal-pending"); el.style.setProperty("--reveal-delay", `${(i % 5) * 55}ms`); });
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
      revealTargets.forEach((el) => observer.observe(el));
    }
    const ids = ["home", "courses", "results", "teachers", "gallery", "contact"];
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      let active = "home";
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 150) active = id; });
      setScrollState({ progress: max > 0 ? window.scrollY / max : 0, showTop: window.scrollY > 550, active });
      document.querySelector(".site-header")?.classList.toggle("compact", window.scrollY > 18);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasResults =
    studentResults.some((r) => r.approved) || pastEvents.some((e) => e.approved);
  const hasGallery = media.some((m) => m.approved);

  const nav = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses" },
    hasResults && { id: "results", label: "Results" },
    { id: "teachers", label: "Teachers" },
    hasGallery && { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ].filter(Boolean);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollState.progress})` }} aria-hidden="true" />
      <Header nav={nav} active={scrollState.active} />
      <main id="main">
        <Hero />
        <Courses onChoose={setCourseChoice} />
        {hasResults && <Results />}
        <Teachers />
        {hasGallery && <Gallery />}
        <Contact preselected={courseChoice} />
      </main>
      <Footer />
      <div className="mobile-bar" role="group" aria-label="Quick contact">
        <a href={`tel:${academy.phonePrimary}`}>Call</a>
        <a href={academy.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
      <button className={`back-to-top ${scrollState.showTop ? "visible" : ""}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </>
  );
}
