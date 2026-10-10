import { studentResults, pastEvents } from "../data/results.js";

export default function Results() {
  const results = studentResults.filter((r) => r.approved && r.verified);
  const events = pastEvents.filter((e) => e.approved);
  const card = (r) => <li key={r.id} className="result-card">
    {r.showPhoto && r.photo ? <img className="result-photo" src={r.photo} alt={`${r.name}, student achiever`} width="600" height="750" loading="lazy" decoding="async" /> : <div className="result-avatar" role="img" aria-label={`${r.name} initials avatar`}>{r.name.split(" ").map((n) => n[0]).join("")}</div>}
    <div className="result-copy"><span className="exam-badge">{r.exam} · {r.year}</span><strong className="student-name">{r.name}</strong><span className="rank-badge">{r.detail}</span></div>
  </li>;
  return <section id="results" className="section">
    <div className="container">
      <h2>Students’ Achievements &amp; Results</h2>
      <p className="section-intro">Selected examination results shared by the academy.</p>
      {results.length > 0 && <div className="results-wrapper"><h3 className="sub">Student Results</h3><ul className="result-grid result-grid-photos">{results.map(card)}</ul><p className="note">Results are academy-provided. They are not a guarantee of future marks or selection.</p></div>}
      {events.length > 0 && <div className="events-wrapper"><h3 className="sub">Events &amp; Awards</h3><ul className="event-list">{events.map((e) => <li key={e.id} className="event-item"><span className="event-icon" aria-hidden="true">◇</span><div className="event-info"><strong>{e.title}</strong><span className="muted">({e.year} · Past event)</span></div></li>)}</ul></div>}
    </div>
  </section>;
}
