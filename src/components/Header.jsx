import { useState } from "react";
import { academy } from "../data/academy.js";

export default function Header({ nav }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          <img
            src="/media/logo.png"
            alt="Athak Prayas Academy emblem"
            className="header-logo"
            width="46"
            height="46"
          />
          <div className="wordmark-text">
            <span className="wordmark-en">{academy.name}</span>
            <span className="wordmark-hi" lang="hi">{academy.nameHindi}</span>
          </div>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" aria-label="Main" className={open ? "open" : ""}>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-primary btn-small header-cta"
            href={academy.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enquire on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
