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
  console.log("Prerendered homepage content into dist/index.html");
} finally {
  await vite.close();
}
