/*
  Prefixes internal paths with the configured base path so the site works
  whether it is served at the root (user site or custom domain) or under a
  subpath (GitHub Pages project site, for example /Rizwan-webbase/).

  Use it for every internal link and every asset in public/, for example:
    withBase("/about")               -> "/Rizwan-webbase/about"
    withBase("/images/headshot.jpg") -> "/Rizwan-webbase/images/headshot.jpg"

  External links, mailto, tel, anchors, and data URIs pass through untouched.
*/
const BASE = import.meta.env.BASE_URL; // e.g. "/Rizwan-webbase/" or "/"

export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#|data:|\/\/)/i.test(path)) return path;
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
