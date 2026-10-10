import { academy } from "../data/academy.js";

export function buildMessage({ name, phone, className, interest, message } = {}) {
  const lines = [
    "Namaste Athak Prayas Academy,",
    "I would like to enquire about admission.",
  ];
  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (className) lines.push(`Class: ${className}`);
  if (interest) lines.push(`Interested in: ${interest}`);
  if (message) lines.push(`Message: ${message}`);
  lines.push("Please share the available batches, timings, and fee details. Thank you.");
  return lines.join("\n");
}

export function whatsappLink(fields) {
  return `${academy.whatsappUrl}?text=${encodeURIComponent(buildMessage(fields))}`;
}

export function courseLink(courseTitle) {
  return whatsappLink({ interest: courseTitle });
}

// Accepts +91 / spaces / dashes; requires 10-13 digits overall.
export function isValidPhone(value) {
  const digits = value.replace(/[\s\-().+]/g, "");
  return /^\d{10,13}$/.test(digits);
}
