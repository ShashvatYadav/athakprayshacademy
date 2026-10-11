import { useEffect, useRef, useState } from "react";
import { studentResults, pastEvents } from "../data/results.js";

function ResultsCarousel({ items, renderCard, label }) {
  const trackRef = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0 });
  const [progress, setProgress] = useState(0);
  const [limits, setLimits] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      setLimits({ start: track.scrollLeft < 4, end: max <= 4 || track.scrollLeft >= max - 4 });
      const cards = [...track.querySelectorAll(".result-card")];
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = null;
      let distance = Infinity;
      cards.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
        if (nextDistance < distance) { nearest = item; distance = nextDistance; }
      });
      cards.forEach((item) => item.classList.toggle("is-active", item === nearest));
    };
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => track.removeEventListener("scroll", update);
  }, [items.length]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".result-card");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return <>
    <div className="gallery-controls">
      <button type="button" className="gallery-arrow" aria-label={`Previous ${label}`} disabled={limits.start} onClick={() => scrollByCard(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
      <button type="button" className="gallery-arrow" aria-label={`Next ${label}`} disabled={limits.end} onClick={() => scrollByCard(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button>
    </div>
    <ul
      ref={trackRef}
      className="result-carousel-track"
      aria-label={`${label}, scroll horizontally`}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") {
          drag.current = { down: true, x: event.clientX, left: event.currentTarget.scrollLeft };
          event.currentTarget.classList.add("dragging");
        }
      }}
      onPointerMove={(event) => {
        if (drag.current.down) event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
      }}
      onPointerUp={(event) => { drag.current.down = false; event.currentTarget.classList.remove("dragging"); }}
      onPointerCancel={(event) => { drag.current.down = false; event.currentTarget.classList.remove("dragging"); }}
      onPointerLeave={(event) => { drag.current.down = false; event.currentTarget.classList.remove("dragging"); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); event.target.closest(".result-card")?.nextElementSibling?.focus(); }
        if (event.key === "ArrowLeft") { event.preventDefault(); event.target.closest(".result-card")?.previousElementSibling?.focus(); }
      }}
    >{items.map(renderCard)}</ul>
    <div className="gallery-progress" aria-label={`${label} scroll position ${Math.round(progress * 100)} percent`}><span style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></div>
  </>;
}

export default function Results() {
  const results = studentResults.filter((r) => r.approved && r.verified);
  const filters = ["All", "UP Board", "UP NMMS", "JNVST"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const categoryOf = (result) => result.exam.startsWith("JNVST") ? "JNVST" : result.exam;
  const filteredResults = selectedFilter === "All"
    ? [...results].sort((a, b) => ["UP Board", "UP NMMS", "JNVST"].indexOf(categoryOf(a)) - ["UP Board", "UP NMMS", "JNVST"].indexOf(categoryOf(b)))
    : results.filter((r) => categoryOf(r) === selectedFilter);
  const events = pastEvents.filter((e) => e.approved);
  const card = (r) => <li key={r.id} className="result-card" tabIndex={0}>
    {r.showPhoto && r.photo ? <img className="result-photo" src={r.photo} alt={`${r.name}, student achiever`} width="600" height="750" loading="lazy" decoding="async" /> : <div className="result-avatar" role="img" aria-label={`${r.name} initials avatar`}>{r.name.split(" ").map((n) => n[0]).join("")}</div>}
    <div className="result-copy"><span className="exam-badge">{r.exam} · {r.year}</span><strong className="student-name">{r.name}</strong><span className="rank-badge">{r.detail}</span></div>
  </li>;
  return <section id="results" className="section">
    <div className="container">
      <h2>Students’ Achievements &amp; Results</h2>
      <p className="section-intro">Selected examination results shared by the academy.</p>
      <div className="filter-tabs" role="tablist" aria-label="Filter student results">
        {filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={selectedFilter === filter} className={`filter-btn ${selectedFilter === filter ? "active" : ""}`} onClick={() => setSelectedFilter(filter)}>{filter}</button>)}
      </div>
      {filteredResults.length > 0 && <div className="results-wrapper"><ResultsCarousel key={selectedFilter} items={filteredResults} renderCard={card} label={selectedFilter === "All" ? "All student results" : `${selectedFilter} results`} /><p className="note">Results are academy-provided. They are not a guarantee of future marks or selection.</p></div>}
      {events.length > 0 && <div className="events-wrapper"><h3 className="sub">Events &amp; Awards</h3><ul className="event-list">{events.map((e) => <li key={e.id} className="event-item"><span className="event-icon" aria-hidden="true">◇</span><div className="event-info"><strong>{e.title}</strong><span className="muted">({e.year} · Past event)</span></div></li>)}</ul></div>}
    </div>
  </section>;
}
