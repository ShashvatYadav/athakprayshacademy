import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createHttpServer } from "node:http";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vite = await createServer({
  root: rootDir,
  configFile: path.join(rootDir, "vite.config.js"),
  server: { middlewareMode: true, hmr: { server: createHttpServer() } },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const markup = renderToString(React.createElement(App));
  const indexPath = path.join(rootDir, "dist", "index.html");
  const html = await readFile(indexPath, "utf8");
  const prerendered = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  if (prerendered === html) throw new Error('Could not find the empty #root element in dist/index.html');
  await writeFile(indexPath, prerendered);

  const routes = [
    { file: "index.html", canonical: "https://athakprayasacademy.com/", heading: "Coaching Classes in Handia, Prayagraj" },
    { file: "coaching-classes-handia/index.html", canonical: "https://athakprayasacademy.com/coaching-classes-handia/", heading: "Coaching Classes for Classes 6–12 in Handia, Prayagraj" },
    { file: "up-nmms-scholarship-exam-handia/index.html", canonical: "https://athakprayasacademy.com/up-nmms-scholarship-exam-handia/", heading: "UP NMMS Scholarship Exam Preparation in Handia, Prayagraj" },
    { file: "entrance-exam-preparation-handia/index.html", canonical: "https://athakprayasacademy.com/entrance-exam-preparation-handia/", heading: "JNVST, CHS and BHU Entrance Exam Preparation in Handia" },
  ];
  for (const route of routes) {
    const routeHtml = route.file === "index.html" ? prerendered : await readFile(path.join(rootDir, "dist", route.file), "utf8");
    const headingCount = [...routeHtml.matchAll(/<h1(?:\s|>)/gi)].length;
    if (headingCount !== 1) throw new Error(`${route.file} must contain exactly one <h1>; found ${headingCount}`);
    if (!routeHtml.includes(route.heading)) throw new Error(`${route.file} is missing its expected page heading`);
    if (!routeHtml.includes(`href="${route.canonical}"`)) throw new Error(`${route.file} is missing its canonical URL`);
    if (route.file === "index.html" && routeHtml.includes('<div id="root"></div>')) throw new Error("Homepage root is empty after prerendering");
  }
  console.log(`Prerendered homepage and verified HTML content for ${routes.length} public routes`);
} finally {
  await vite.close();
}
