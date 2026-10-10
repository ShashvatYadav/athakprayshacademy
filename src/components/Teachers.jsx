import { teachers } from "../data/teachers.js";

export default function Teachers() {
  return (
    <section id="teachers" className="section alt">
      <div className="container">
        <h2>Our Faculty & Mentors</h2>
        <p className="section-intro">
          Dedicated educators committed to concept building, doubt resolution, and personalized student mentoring.
        </p>
        <ul className="teacher-list">
          {teachers.map((t) => (
            <li key={t.id} className="teacher-card">
              {t.photo ? (
                <img
                  className="teacher-avatar-img"
                  src={t.photo}
                  alt={`${t.name}, ${t.subject}`}
                  width="110"
                  height="110"
                  loading="lazy"
                />
              ) : (
                <div className="avatar-placeholder" aria-hidden="true">
                  <span>{t.name[0]}</span>
                </div>
              )}
              <div className="teacher-info">
                <h3>{t.name}</h3>
                <p className="subject">{t.subject}</p>
                {t.details && <p className="teacher-details">{t.details}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
