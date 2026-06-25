/*
  GLOBAL SITE CONFIG — edit this to change name, tagline, social links, nav.
  Content changes should touch this file (and src/content/*), not layout files.
*/

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Sam McManagan',
  /* The hero one-liner: ML/DS core, psychology differentiator, SWE range. */
  tagline:
    'Machine learning and data science, shaped by a psychology background — I build models and the products around them.',
  /* Short intro shown on the landing page (the layered positioning story). */
  intro:
    "I'm a machine learning and data scientist whose work is grounded in a background in psychology — it shapes how I frame problems and design features people actually want to use. Alongside the modelling, I build the full-stack engineering around it, end to end.",
  email: 'sammcmanagan@hotmail.com',
  url: 'https://sam-mcm-642.github.io',
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/sam-mcm-642' },
  // TODO: confirm LinkedIn vanity URL — update if different.
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sammcmanagan' },
  { label: 'Email', href: `mailto:${site.email}` },
];

/* Top-level nav. Projects is rendered as a dropdown built from the content
   collection (see Nav.astro). Writing is intentionally NOT linked until it has
   real content. CV links directly to the static PDF — no intermediate page. */
export const nav: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'CV', href: '/cv.pdf' },
];
