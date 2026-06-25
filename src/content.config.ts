import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Projects collection — one .mdx per project, frontmatter-driven (brief §5). */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(), // one line, used on cards
      role: z.string(), // my specific contribution
      stack: z.array(z.string()),
      links: z
        .object({
          demo: z.string().url().optional(),
          repo: z.string().url().optional(), // deferred — leave empty unless confirmed
          writeup: z.string().url().optional(),
        })
        .optional(),
      heroImage: image().optional(),
      video: z.string().optional(), // embed URL (YouTube/Vimeo unlisted or MP4)
      featured: z.boolean().default(false),
      order: z.number().default(0),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

/* Writing collection — scaffolded now, NOT linked in nav until it has content. */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, writing };
