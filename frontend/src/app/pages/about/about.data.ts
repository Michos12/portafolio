// Static content for the About page. Edit here to update skills or experience.

export interface Skill {
  name: string;
  /** Optional logo shown inside the chip (served from /assets/icons). */
  icon?: string;
  /** Rendered icon width in px; matches the design, defaults to 24. */
  iconWidth?: number;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Experience {
  /** Year shown in the timeline circle (start year). */
  year: number;
  position: string;
  company: string;
  summary: string;
  dates: string;
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Angular', icon: 'assets/icons/angular.png' },
      { name: 'TypeScript', icon: 'assets/icons/typescript.png', iconWidth: 22 },
      { name: 'React' },
      { name: 'JavaScript' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: 'assets/icons/python.png' },
      { name: 'FastAPI', icon: 'assets/icons/fastapi.png' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Cloud & Data',
    skills: [
      { name: 'PostgreSQL', icon: 'assets/icons/postgresql.png' },
      { name: 'Supabase' },
      { name: 'MySQL' },
      { name: 'Docker' },
      { name: 'Git' },
    ],
  },
];

// Ordered by start date, oldest first, to read as a chronological timeline.
export const EXPERIENCES: Experience[] = [
  {
    year: 2026,
    position: 'Data Analyst',
    company: 'TELUS International AI',
    summary:
      'Support AI training workflows through data annotation and search relevance evaluation. ' +
      'Work with geospatial and structured datasets to improve recommendation and ranking ' +
      'systems, and run quality analysis on machine learning data pipelines.',
    dates: 'Jan 2026 - Present',
  },
  {
    year: 2026,
    position: 'Full Stack Developer',
    company: 'Taquería Playa Tropical',
    summary:
      'Built a full-stack business management application with React, TypeScript, Node.js, ' +
      'Express and MySQL: responsive Tailwind CSS interfaces, authenticated REST APIs and ' +
      'integrations validated against delivery platforms, helping drive more customer inquiries.',
    dates: 'Mar 2026 - Jul 2026',
  },
  {
    year: 2026,
    position: 'Data Analyst & ETL Developer',
    company: 'Rocky Mountaineer',
    summary:
      'Built ETL workflows with Python, Pandas and PostgreSQL that automated order calculations ' +
      'and migrated operational data from Excel into relational databases, supporting logistics ' +
      'and food delivery for tourism train services.',
    dates: 'Mar 2026 - May 2026',
  },
];
