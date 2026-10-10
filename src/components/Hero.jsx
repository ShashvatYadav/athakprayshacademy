import { academy } from "../data/academy.js";
import { heroImage } from "../data/media.js";
import { whatsappLink } from "../lib/whatsapp.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">{academy.tagline}</p>
          <h1 lang="hi">सही मार्गदर्शन, नियमित अभ्यास और बेहतर तैयारी</h1>
          <p className="lead">
            Classes 6–12, UP/CBSE Board support, and focused preparation for JNVST, CHS, BHU, NMMS
            and other listed exams.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={whatsappLink({})} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
            <a className="btn btn-outline" href={`tel:${academy.phonePrimary}`}>
              Call the Academy
            </a>
          </div>
          <p className="location">
            <svg className="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{academy.addressShort}</span>
          </p>
        </div>
        {heroImage && (
          <div className="hero-media-wrapper">
            <img
              className="hero-img"
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              fetchPriority="high"
            />
            <div className="hero-img-badge">
              <span>Authentic Classroom Session</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
