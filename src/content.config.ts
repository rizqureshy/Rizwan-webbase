import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
  Writing collection. Add a new article by dropping an .md or .mdx file into
  src/content/writing/ with the frontmatter below. See README for details.
*/
const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // One of the five content pillars, used as a tag.
    pillar: z.string().optional(),
    // Set false to keep a post out of listings while you draft it.
    draft: z.boolean().default(false),
    /* Optional reading time override in minutes. Auto-estimated otherwise. */
    readingTime: z.number().optional(),
  }),
});

export const collections = { writing };
