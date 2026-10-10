import { teachers } from "../data/teachers.js";

function TeacherCard({ teacher, featured = false }) {
  return <li className={`teacher-card ${featured ? "teacher-featured" : ""}`}>
    {teacher.photo ? <img className="teacher-avatar-img" src={teacher.photo} alt={`${teacher.name}`} width="350" height="350" loading="lazy" decoding="async" /> : <div className="avatar-placeholder" aria-hidden="true">{teacher.name[0]}</div>}
    <div className="teacher-info"><span className="teacher-title">{teacher.title || "Faculty"}</span><h3>{teacher.name}</h3><p className="subject">{teacher.subject}</p>{teacher.details && <p className="teacher-details">{teacher.details}</p>}</div>
  </li>;
}

export default function Teachers() {
  const vikas = teachers.find((t) => t.id === "vikas");
  const otherTeachers = teachers.filter((t) => t.id !== "vikas");
  return <section id="teachers" className="section alt"><div className="container">
    <h2>Our Faculty &amp; Mentors</h2>
    <p className="section-intro">Meet the teachers supporting students at Athak Prayas Academy.</p>
    <ul className="teacher-list">{vikas && <TeacherCard teacher={vikas} featured />}{otherTeachers.map((t) => <TeacherCard key={t.id} teacher={t} />)}</ul>
  </div></section>;
}
