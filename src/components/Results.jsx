import { studentResults, pastEvents } from "../data/results.js";

export default function Results() {
  const results = studentResults.filter((r) => r.approved);
  const events = pastEvents.filter((e) => e.approved);

  return (
    <section id="results" className="section">
      <div className="container">
        <h2>Students’ Achievements & Results</h2>
        <p className="section-intro">
          Notable ranks and selections achieved by our students in competitive entrance and board examinations.
        </p>

        {results.length > 0 && (
          <div className="results-wrapper">
            <h3 className="sub">Examination Achievements</h3>
            <ul className="result-grid">
              {results.map((r) => (
                <li key={r.id} className="result-card">
                  <div className="result-card-header">
                    <span className="exam-badge">{r.exam}</span>
                    <span className="year-badge">{r.year}</span>
                  </div>
                  <strong className="student-name">{r.name}</strong>
                  <p className="achievement-detail">{r.detail}</p>
                </li>
              ))}
            </ul>
            <p className="note">
              * Results are achieved through the dedication and hard work of individual students. The academy does not guarantee examination selection or specific marks.
            </p>
          </div>
        )}

        {events.length > 0 && (
          <div className="events-wrapper">
            <h3 className="sub">Past Events & Honors</h3>
            <ul className="event-list">
              {events.map((e) => (
                <li key={e.id} className="event-item">
                  <span className="event-icon" aria-hidden="true">🏆</span>
                  <div className="event-info">
                    <strong>{e.title}</strong>
                    <span className="muted">({e.year} · Past event)</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
