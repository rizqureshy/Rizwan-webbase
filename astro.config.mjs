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
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
