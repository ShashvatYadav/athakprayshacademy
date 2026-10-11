import { useEffect, useState } from "react";
import { academy } from "../data/academy.js";
import { courses, classOptions } from "../data/courses.js";
import { whatsappLink, isValidPhone } from "../lib/whatsapp.js";

const interestOptions = [...courses.filter((c) => c.show).map((c) => c.title), "Not sure yet"];
function ContactIcon({ kind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...common}>{kind === "address" ? <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></> : kind === "phone" ? <path d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3c0 1-1 2-2 2C10 19 5 14 5 5c0-1 1-2 2-2Z"/> : kind === "whatsapp" ? <><path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2 2 3.5 4 4"/></> : <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>}</svg>;
}

export default function Contact({ preselected }) {
  const [form, setForm] = useState({ name: "", phone: "", className: "", interest: "", message: "" });
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null); // holds the WhatsApp link once prepared

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, interest: preselected }));
  }, [preselected]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const socials = [
    { label: "YouTube", href: academy.youtubeUrl, icon: <path d="M22 12s0-4-1-5-9-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 9 1 9 1 8 0 9-1 1-5 1-5ZM10 9l6 3-6 3z" /> },
    { label: "Instagram", href: academy.instagramUrl, icon: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r=".8" fill="currentColor"/></> },
    { label: "WhatsApp", href: academy.whatsappUrl, icon: <><path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2 2 3.5 4 4"/></> },
    { label: "Email", href: `mailto:${academy.email}`, icon: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></> },
    { label: "Call", href: `tel:${academy.phonePrimary}`, icon: <path d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3c0 1-1 2-2 2C10 19 5 14 5 5c0-1 1-2 2-2Z"/> },
  ];

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
          <address className="contact-rows">
            <p><a className="contact-location-link" href={academy.mapsUrl} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><ContactIcon kind="address" /></span><span>{academy.address}</span></a></p>
            <p><span className="contact-icon"><ContactIcon kind="phone" /></span><span><a href={`tel:${academy.phonePrimary}`}>{academy.phonePrimary}</a><br /><a href={`tel:${academy.phoneSecondary}`}>{academy.phoneSecondary}</a></span></p>
            <p><span className="contact-icon"><ContactIcon kind="whatsapp" /></span><span><a href={academy.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp · {academy.whatsappDisplay}</a></span></p>
            <p><span className="contact-icon"><ContactIcon kind="email" /></span><span><a href={`mailto:${academy.email}`}>{academy.email}</a></span></p>
          </address>
          <p className="timing-note">Call or WhatsApp for batch timings.</p>
          <div className="social-buttons" aria-label="Contact and social links">{socials.map((s) => <a key={s.label} className="social-button" href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg></a>)}</div>
          <div className="map-frame">
            <iframe src={academy.mapsEmbedUrl} loading="lazy" title="Athak Prayas Academy location map" referrerPolicy="no-referrer-when-downgrade" />
            <a className="map-open-link" href={academy.mapsUrl} target="_blank" rel="noopener noreferrer">Open <span aria-hidden="true">↗</span></a>
          </div>
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
