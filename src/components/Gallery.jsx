import { useEffect, useRef, useState } from "react";
import { media } from "../data/media.js";

const categories = [
  "All",
  "Classroom",
  "Achievements",
  "Sports & Activities",
  "Awards & Events",
  "Study Material",
];

export default function Gallery() {
  const items = media.filter((m) => m.approved);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((m) => m.category === selectedCategory);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const close = () => {
    setActive(null);
    openerRef.current?.focus();
  };

  const current = active !== null ? filteredItems[active] : null;

  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2>Gallery & Media</h2>
        <p className="section-intro">
          Moments from our classrooms, competitive exam preparation batches, sports championships, and annual award ceremonies.
        </p>

        <div className="filter-tabs" role="tablist" aria-label="Gallery category filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="gallery-grid">
          {filteredItems.map((m, i) => (
            <li key={m.src} className="gallery-card">
              {m.type === "video" ? (
                <figure>
                  <div className="video-container">
                    <video
                      controls
                      preload="metadata"
                      poster={m.poster}
                      width={m.width}
                      height={m.height}
                      aria-label={m.alt}
                    >
                      <source src={m.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <figcaption>
                    <span className="gallery-tag">{m.category}</span>
                    <strong className="gallery-title">{m.title || m.alt}</strong>
                    {m.year && <span className="gallery-year">{m.year}</span>}
                  </figcaption>
                </figure>
              ) : (
                <figure>
                  <button
                    type="button"
                    className="thumb"
                    aria-label={`View larger: ${m.title || m.alt}`}
                    onClick={(e) => {
                      openerRef.current = e.currentTarget;
                      setActive(i);
                    }}
                  >
                    <img
                      src={m.src}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      loading="lazy"
                    />
                    <div className="thumb-overlay">
                      <span>Click to expand</span>
                    </div>
                  </button>
                  <figcaption>
                    <span className="gallery-tag">{m.category}</span>
                    <strong className="gallery-title">{m.title || m.alt}</strong>
                    {m.year && <span className="gallery-year">{m.year}</span>}
                  </figcaption>
                </figure>
              )}
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label="Image viewer"
      >
        {current && (
          <div className="lightbox-inner">
            <div className="lightbox-header">
              <span className="lightbox-title">{current.title || current.alt}</span>
              <button
                type="button"
                className="btn btn-primary btn-small"
                onClick={close}
                aria-label="Close viewer"
              >
                ✕ Close
              </button>
            </div>
            <div className="lightbox-content">
              {current.type === "video" ? (
                <video controls autoPlay src={current.src} className="lightbox-media" />
              ) : (
                <img src={current.src} alt={current.alt} className="lightbox-media" />
              )}
            </div>
            <div className="lightbox-caption">
              <p>{current.alt}</p>
              <span className="muted">{current.category} {current.year ? `· ${current.year}` : ""}</span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
