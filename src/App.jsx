import { useState } from "react";
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
      <Header nav={nav} />
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
    </>
  );
}
