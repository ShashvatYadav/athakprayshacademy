import { useEffect, useRef, useState } from "react";
import { media } from "../data/media.js";

const categories = ["All", "Classroom", "Ceremony", "Awards", "Events", "Results", "Videos", "Study Material"];

export default function Gallery() {
  const items = media.filter((m) => m.approved);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);
  const [limits, setLimits] = useState({ start: true, end: false });
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const filteredItems = selectedCategory === "All" ? items : items.filter((m) => m.category === selectedCategory);
  const current = active !== null ? filteredItems[active] : null;

  useEffect(() => { const d = dialogRef.current; if (!d) return; if (active !== null && !d.open) d.showModal(); if (active === null && d.open) d.close(); }, [active]);
  useEffect(() => { if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "auto" }); setProgress(0); }, [selectedCategory]);
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      setLimits({ start: track.scrollLeft < 4, end: max <= 4 || track.scrollLeft >= max - 4 });
      const cards = [...track.querySelectorAll(".gallery-card")];
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = null; let distance = Infinity;
      cards.forEach((card) => { const rect = card.getBoundingClientRect(); const d = Math.abs(rect.left + rect.width / 2 - center); if (d < distance) { nearest = card; distance = d; } });
      cards.forEach((card) => card.classList.toggle("is-active", card === nearest));
    };
    track.addEventListener("scroll", update, { passive: true }); update(); return () => track.removeEventListener("scroll", update);
  }, [filteredItems.length, selectedCategory]);
  useEffect(() => {
    const track = trackRef.current; if (!track || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) entry.target.pause(); }), { root: track, threshold: 0.2 });
    track.querySelectorAll("video").forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [filteredItems.length, selectedCategory]);
  const close = () => { setActive(null); openerRef.current?.focus(); };
  const scrollByCard = (dir) => { const track = trackRef.current; const card = track?.querySelector(".gallery-card"); if (track && card) track.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" }); };
  const drag = useRef({ down: false, x: 0, left: 0 });

  return <section id="gallery" className="section"><div className="container">
    <h2>Gallery &amp; Media</h2><p className="section-intro">Moments from our classrooms, preparation batches, sports and award events.</p>
    <div className="filter-tabs" role="tablist" aria-label="Gallery category filters">{categories.map((cat) => <button key={cat} type="button" role="tab" aria-selected={selectedCategory === cat} className={`filter-btn ${selectedCategory === cat ? "active" : ""}`} onClick={() => setSelectedCategory(cat)}>{cat}</button>)}</div>
    <div className="gallery-controls"><button type="button" className="gallery-arrow" aria-label="Previous" disabled={limits.start} onClick={() => scrollByCard(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button><button type="button" className="gallery-arrow" aria-label="Next" disabled={limits.end} onClick={() => scrollByCard(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button></div>
    <ul ref={trackRef} className="gallery-grid" onPointerDown={(e) => { if (e.pointerType === "mouse") { drag.current = { down: true, x: e.clientX, left: e.currentTarget.scrollLeft }; e.currentTarget.classList.add("dragging"); } }} onPointerMove={(e) => { if (drag.current.down) e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x); }} onPointerUp={(e) => { drag.current.down = false; e.currentTarget.classList.remove("dragging"); }} onPointerLeave={(e) => { drag.current.down = false; e.currentTarget.classList.remove("dragging"); }}>
      {filteredItems.map((m, i) => <li key={m.src} className={`gallery-card ${m.type === "poster" ? "poster" : ""} ${m.type === "video" ? `video-card ${m.aspectRatio === "9 / 16" ? "video-portrait" : "video-landscape"}` : ""}`} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); e.currentTarget.nextElementSibling?.focus(); } if (e.key === "ArrowLeft") { e.preventDefault(); e.currentTarget.previousElementSibling?.focus(); } }}>
        <figure>{m.type === "video" ? <button type="button" className="video-thumb" style={{ "--video-ratio": m.aspectRatio }} aria-label={`Play video: ${m.title}`} onClick={(e) => { openerRef.current = e.currentTarget; setActive(i); }}><img src={m.poster} alt="" width={m.width} height={m.height} loading="lazy" decoding="async" /><span className="video-play-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M17 11v26l21-13z" /></svg></span></button> : <button type="button" className={`thumb ${m.type === "poster" ? "poster-thumb" : ""}`} aria-label={`View larger: ${m.title || m.alt}`} onClick={(e) => { openerRef.current = e.currentTarget; setActive(i); }}><img src={m.src} alt={m.alt} width={m.width} height={m.height} style={{ objectPosition: m.imagePosition || "center" }} loading="lazy" decoding="async" /><span className="thumb-overlay">Click to expand</span></button>}
        <figcaption><span className="gallery-tag">{m.category}</span><strong className="gallery-title">{m.title || m.alt}</strong>{m.year && <span className="gallery-year">{m.year}</span>}</figcaption></figure>
      </li>)}
    </ul><div className="gallery-progress" aria-label={`Gallery scroll position ${Math.round(progress * 100)} percent`}><span style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></div>
  </div>
  <dialog ref={dialogRef} className="lightbox" onClose={() => setActive(null)} onClick={(e) => e.target === dialogRef.current && close()} aria-label="Image viewer">{current && <div className="lightbox-inner"><div className="lightbox-header"><span className="lightbox-title">{current.title || current.alt}</span><button type="button" className="btn btn-primary btn-small" onClick={close} aria-label="Close viewer">× Close</button></div><div className="lightbox-content">{current.type === "video" ? <video controls playsInline preload="metadata" poster={current.poster} src={current.src} className="lightbox-media lightbox-video" style={{ aspectRatio: current.aspectRatio }} /> : <img src={current.src} alt={current.alt} className="lightbox-media" />}</div><div className="lightbox-caption"><p>{current.alt}</p><span className="muted">{current.category} {current.year ? `· ${current.year}` : ""}</span></div></div>}</dialog>
  </section>;
}
