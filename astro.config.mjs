// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// `site` is the deployed origin. For a GitHub Pages user site this is
// https://<username>.github.io served from a repo named <username>.github.io.
// When you move to a custom domain, change this and add public/CNAME.
export default defineConfig({
  site: "https://rizqureshy.github.io",
  // Served as a GitHub Pages project site under this repo's name. If you move
  // to a user site (repo named <username>.github.io) or a custom domain, set
  // this to "/" (or remove it). All internal links use withBase() so they
  // follow this value automatically.
  base: "/Rizwan-webbase",
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
