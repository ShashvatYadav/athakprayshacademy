import { courses } from "../data/courses.js";
import { courseLink } from "../lib/whatsapp.js";

export default function Courses({ onChoose }) {
  return (
    <section id="courses" className="section alt">
      <div className="container">
        <h2>Courses & Preparation</h2>
        <p className="section-intro">
          Dedicated coaching programs with regular testing, study materials, and individual attention. For current batch schedules, timings, and fees, please inquire directly.
        </p>
        <ul className="course-list">
          {courses.filter((c) => c.show).map((c) => (
            <li key={c.id} className="course-card">
              <div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
              <a
                className="text-link"
                href={courseLink(c.title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onChoose(c.title)}
              >
                Ask about this course<span className="visually-hidden">: {c.title}</span> →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
