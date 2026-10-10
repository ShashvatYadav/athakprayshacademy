import { academy } from "../data/academy.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-name">
            {academy.name} · <span lang="hi">{academy.nameHindi}</span>
          </p>
          <p className="footer-tagline">“{academy.tagline}”</p>
          <p>{academy.address}</p>
        </div>
        <div>
          <p>
            Phone: <a href={`tel:${academy.phonePrimary}`}>{academy.phonePrimary}</a> ·{" "}
            <a href={`tel:${academy.phoneSecondary}`}>{academy.phoneSecondary}</a>
          </p>
          <p>
            WhatsApp:{" "}
            <a href={academy.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {academy.whatsappDisplay}
            </a>
          </p>
          <p>
            Email: <a href={`mailto:${academy.email}`}>{academy.email}</a>
          </p>
          <p>
            Social:{" "}
            <a href={academy.youtubeUrl} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>{" "}
            ·{" "}
            <a href={academy.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>
      </div>
      <p className="container copyright">
        © {new Date().getFullYear()} {academy.name} (अथक प्रयास एकेडमी). All rights reserved. Direct inquiries via WhatsApp.
      </p>
    </footer>
  );
}
