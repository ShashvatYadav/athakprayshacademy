import { useEffect, useState } from "react";
import { academy } from "../data/academy.js";
import { courses, classOptions } from "../data/courses.js";
import { whatsappLink, isValidPhone } from "../lib/whatsapp.js";

const interestOptions = [...courses.filter((c) => c.show).map((c) => c.title), "Not sure yet"];

export default function Contact({ preselected }) {
  const [form, setForm] = useState({ name: "", phone: "", className: "", interest: "", message: "" });
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null); // holds the WhatsApp link once prepared

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, interest: preselected }));
  }, [preselected]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter the student or parent name.";
    if (!form.phone.trim()) errs.phone = "Please enter a phone number.";
    else if (!isValidPhone(form.phone)) errs.phone = "Please enter a valid phone number (10 digits, with or without +91).";
    return errs;
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      setPrepared(null);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    const link = whatsappLink({
      name: form.name.trim(),
      phone: form.phone.trim(),
      className: form.className,
      interest: form.interest,
      message: form.message.trim(),
    });
    setPrepared(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="section alt">
      <div className="container contact-grid">
        <div>
          <h2>Contact the academy</h2>
          <address>
            <p>{academy.address}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${academy.phonePrimary}`}>{academy.phonePrimary}</a>,{" "}
              <a href={`tel:${academy.phoneSecondary}`}>{academy.phoneSecondary}</a>
            </p>
            <p>
              WhatsApp:{" "}
              <a href={academy.whatsappUrl} target="_blank" rel="noopener noreferrer">{academy.whatsappDisplay}</a>
            </p>
            <p>
              Email: <a href={`mailto:${academy.email}`}>{academy.email}</a>
            </p>
          </address>
          <p>
            <a className="btn btn-outline btn-small" href={academy.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions on Google Maps
            </a>
          </p>
          <p className="social">
            <a href={academy.youtubeUrl} target="_blank" rel="noopener noreferrer">YouTube</a>
            {" · "}
            <a href={academy.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate aria-labelledby="enquiry-title">
          <h3 id="enquiry-title">Send an enquiry</h3>
          <p className="note">
            This opens WhatsApp with your message ready. Your enquiry reaches us only after you press Send there.
          </p>

          <div className="field">
            <label htmlFor="name">Student / parent name <span aria-hidden="true">*</span></label>
            <input id="name" value={form.name} onChange={set("name")} autoComplete="name" required
              aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
            {errors.name && <p className="error" id="name-err">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
            <input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" required
              aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
            {errors.phone && <p className="error" id="phone-err">{errors.phone}</p>}
          </div>

          <div className="field">
            <label htmlFor="className">Class</label>
            <select id="className" value={form.className} onChange={set("className")}>
              <option value="">Select class</option>
              {classOptions.map((c) => (
                <option key={c} value={c === "Other" ? "Other" : `Class ${c}`}>{c === "Other" ? "Other" : `Class ${c}`}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="interest">Interested course / exam</label>
            <select id="interest" value={form.interest} onChange={set("interest")}>
              <option value="">Select course</option>
              {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Message (optional)</label>
            <textarea id="message" rows="3" value={form.message} onChange={set("message")} />
          </div>

          <button className="btn btn-primary" type="submit">Prepare WhatsApp message</button>

          <div aria-live="polite" className="status">
            {prepared && (
              <p>
                WhatsApp should now open in a new tab with your message ready. Please press Send there to
                contact us. If it did not open,{" "}
                <a href={prepared} target="_blank" rel="noopener noreferrer">open WhatsApp here</a>, or call{" "}
                <a href={`tel:${academy.phonePrimary}`}>{academy.phonePrimary}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
