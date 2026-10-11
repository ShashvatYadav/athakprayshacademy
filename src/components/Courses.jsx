import { courses } from "../data/courses.js";
import { courseLink } from "../lib/whatsapp.js";

function Artwork({ kind }) {
  const props = { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  if (kind === "calculator") return <svg {...props}><rect x="10" y="5" width="28" height="38" rx="3"/><path d="M15 11h18v8H15zM16 26h1m7 0h1m7 0h1M16 33h1m7 0h1m7 0h1" strokeWidth="3"/></svg>;
  if (kind === "english") return <svg {...props}><path d="M7 9h15a5 5 0 0 1 5 5v26a5 5 0 0 0-5-5H7zM41 9H27v31a5 5 0 0 1 5-5h9z"/><path d="M12 16h8m-8 6h7m14-6h3m-3 6h3"/></svg>;
  if (kind === "science") return <svg {...props}><path d="M18 5h12M21 5v12L10 37a3 3 0 0 0 3 5h22a3 3 0 0 0 3-5L27 17V5"/><path d="M15 31h18m-14-7h10"/><circle cx="23" cy="33" r="1" fill="currentColor"/></svg>;
  if (kind === "shield") return <svg {...props}><path d="M24 4 39 10v12c0 10-7 17-15 22C16 39 9 32 9 22V10z"/><path d="m17 24 5 5 10-11"/></svg>;
  if (kind === "medal") return <svg {...props}><circle cx="24" cy="28" r="11"/><path d="m15 19-4-14h10l3 9m9 5 4-14H27l-3 9"/><path d="m24 22 2 4 4 .5-3 3 .7 4.5-3.7-2-3.7 2L21 29.5l-3-3 4-.5z"/></svg>;
  return <svg {...props}><path d="M7 11h14a6 6 0 0 1 6 6v23a6 6 0 0 0-6-6H7zM41 11H27v29a6 6 0 0 1 6-6h8z"/></svg>;
}

export default function Courses({ onChoose }) {
  return <section id="courses" className="section alt"><div className="container">
    <h2>Courses &amp; Preparation</h2>
    <p className="section-intro">Teaching and preparation for school classes and the exams listed below.</p>
    <ul className="course-list">
      {courses.filter((course) => course.show).map((course, index) => <li key={course.id} className={`course-card course-${course.id} ${index === 0 ? "course-featured" : ""}`}>
        <div className={`course-image ${course.imageFit === "contain" ? "contain" : ""}`}>
          {course.image ? <img src={course.image} alt={course.imageAlt || ""} width={course.imageWidth} height={course.imageHeight} style={{ objectPosition: course.imagePosition || "center" }} loading="lazy" decoding="async" /> : course.subjects ? <div className="subject-artwork">{course.subjects.map((subject, i) => <div className="subject-artwork-item" key={subject}><Artwork kind={["calculator", "english", "science"][i]} /><span>{subject}</span></div>)}</div> : <Artwork kind={course.id === "agniveer" ? "shield" : "book"} />}
        </div>
        <div className="course-copy"><span className="course-chip">{course.label}</span><h3>{course.title}</h3><p>{course.description}</p><ul className="course-points">{course.bullets.map((point) => <li key={point}>{point}</li>)}</ul>{course.seoUrl && <a className="text-link" href={course.seoUrl}>Course details <span aria-hidden="true">→</span></a>}<a className="text-link" href={courseLink(course.title)} target="_blank" rel="noopener noreferrer" onClick={() => onChoose(course.title)}>Ask about this course <span aria-hidden="true">→</span><span className="visually-hidden">: {course.title}</span></a></div>
      </li>)}
    </ul>
    <p className="course-footnote">Contact us for current batches, fees and schedules.</p>
  </div></section>;
}
