# Open Graph images

`default.png` (2400x1260, a 2x render of the 1200x630 card) is generated from
the brand design and ships with the site. It is used as the default social
share image, and per page cards can be passed via the `ogImage` prop on
`BaseLayout`.

To change it, edit `scripts/og-template.html` and re-render it to this path at
1200x630 (or 2x for crispness) with any HTML to image tool or a headless
browser screenshot.
