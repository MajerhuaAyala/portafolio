export type Locale = 'es' | 'en';

/**
 * Strings typed as `Marked` may wrap at most one key phrase in `==double equals==`.
 * The UI renders it as a highlighter mark.
 */
export type Marked = string;

export interface Fact {
  label: string;
  value: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  /** ISO year-month, e.g. "2024-10". */
  start: string;
  /** ISO year-month, or null when it is the current job. */
  end: string | null;
  location?: string;
  summary: string;
  achievements: Marked[];
  technologies: string[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  sector: string;
  role: string;
  /** One-line business outcome shown on cards. */
  summary: Marked;
  challenge: string;
  whatIDid: string[];
  results: string[];
  technologies: string[];
  /** Path relative to the site root, no leading slash, e.g. "projects/multicines/cartelera.webp". */
  cover: string;
  coverAlt: string;
  /** Folder under public/projects. */
  galleryDir: string;
  featured: boolean;
}

export interface SkillGroup {
  name: string;
  description: string;
  tools: string[];
}

export interface Value {
  title: string;
  text: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    projects: string;
    experience: string;
    skills: string;
    about: string;
    contact: string;
    cv: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    headline: Marked;
    lead: string;
    availability: string;
    ctaCv: string;
    ctaEmail: string;
    ctaLinkedin: string;
    factsTitle: string;
    facts: Fact[];
    photoAlt: string;
  };
  brands: { title: string; items: string[] };
  projects: {
    title: string;
    intro: string;
    featuredLabel: string;
    viewCase: string;
    backToProjects: string;
    nextProject: string;
    labels: {
      client: string;
      sector: string;
      role: string;
      challenge: string;
      whatIDid: string;
      results: string;
      technologies: string;
      gallery: string;
    };
    items: Project[];
  };
  experience: {
    title: string;
    intro: string;
    present: string;
    /** Duration units, e.g. { year: 'año', years: 'años', month: 'mes', months: 'meses' }. */
    units: { year: string; years: string; month: string; months: string };
    items: ExperienceEntry[];
  };
  skills: { title: string; intro: string; groups: SkillGroup[] };
  about: { title: string; paragraphs: string[]; valuesTitle: string; values: Value[] };
  contact: {
    title: string;
    text: string;
    email: string;
    linkedinUrl: string;
    cvFile: string;
    location: string;
  };
  footer: { rights: string };
  ui: {
    language: string;
    switchTo: string;
    skipToContent: string;
    theme: { label: string; light: string; dark: string; system: string };
    lightbox: { close: string; previous: string; next: string; of: string };
  };
}
