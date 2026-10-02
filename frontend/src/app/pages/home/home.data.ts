// Static content for the Home page.
import { Project } from '../../models/models';

export interface StackItem {
  name: string;
  /** Optional logo shown inside the chip (served from /assets/icons). */
  icon?: string;
  /** Rendered icon width in px; matches the design, defaults to 38. */
  iconWidth?: number;
}

/** Tech stack from the CV, split into the three carousel rows of the design. */
export const STACK_ROWS: StackItem[][] = [
  // Frontend & design tools
  [
    { name: 'Angular', icon: 'assets/icons/angular.png' },
    { name: 'TypeScript', icon: 'assets/icons/typescript.png', iconWidth: 34 },
    { name: 'React', icon: 'assets/icons/react.jpeg' },
    { name: 'Next.js', icon: 'assets/icons/nextjs.jpeg' },
    { name: 'JavaScript', icon: 'assets/icons/javascript.jpg' },
    { name: 'Tailwind CSS', icon: 'assets/icons/tailwind.jpeg' },
    { name: 'Figma', icon: 'assets/icons/figma.jpeg' },
    { name: 'Jira', icon: 'assets/icons/jira.jpeg' },
    { name: 'Bitbucket', icon: 'assets/icons/bitbucket.jpeg' },
  ],
  // Backend & tooling
  [
    { name: 'Python', icon: 'assets/icons/python.png' },
    { name: 'FastAPI', icon: 'assets/icons/fastapi.png' },
    { name: 'Express.js', icon: 'assets/icons/expressjs.png' },
    { name: 'REST APIs', icon: 'assets/icons/restapis.png' },
    { name: 'C++', icon: 'assets/icons/C++.jpeg' },
    { name: 'Docker', icon: 'assets/icons/docker.jpeg' },
    { name: 'Git', icon: 'assets/icons/git.jpeg' },
    { name: 'Bash', icon: 'assets/icons/bash.jpeg' },
    { name: 'Postman', icon: 'assets/icons/postman.jpeg' },
  ],
  // Data & AI
  [
    { name: 'PostgreSQL', icon: 'assets/icons/postgresql.png' },
    { name: 'MySQL', icon: 'assets/icons/sql.jpeg' },
    { name: 'MongoDB', icon: 'assets/icons/mongodb.jpeg' },
    { name: 'Supabase', icon: 'assets/icons/supabase.jpeg' },
    { name: 'Firestore', icon: 'assets/icons/firestore.jpeg' },
    { name: 'Excel', icon: 'assets/icons/excel.jpeg' },
    { name: 'Claude Code', icon: 'assets/icons/claude.jpeg' },
  ],
];

export const PROJECT_IMAGE_FALLBACK = 'assets/projects/placeholder.jpg';

/**
 * Draft project cards. Temporary: they mirror the backend `Project` shape so the
 * Home page can later switch to `ProjectService.projects` without template changes.
 */
export const DRAFT_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Developer Portfolio',
    description:
      'Decoupled full-stack portfolio: Angular SPA, FastAPI backend with a JWT-protected admin and a cached GitHub proxy.',
    techStack: ['Angular', 'FastAPI', 'PostgreSQL'],
    repoUrl: 'https://github.com/Michos12/portafolio',
    liveUrl: 'https://michaelveliz.com',
    imageUrl: null,
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'FlatFinder',
    description:
      'Property-management platform to track rentals, tenants and rent, and browse nearby listings.',
    techStack: ['Angular', 'Firestore', 'Docker'],
    repoUrl: 'https://github.com/Michos12/FlatFinder-BackEnd',
    liveUrl: null,
    imageUrl: null,
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: 'FocusFlow',
    description: 'Task manager with a React interface, a Node.js API and a MySQL database.',
    techStack: ['React', 'Node.js', 'MySQL'],
    repoUrl: 'https://github.com/Michos12/FocusFlow',
    liveUrl: null,
    imageUrl: null,
    featured: false,
    order: 3,
  },
  {
    id: 4,
    title: 'Bacano',
    description: 'Work-in-progress online home for an Ecuadorian restaurant, with Shopify planned.',
    techStack: ['TypeScript', 'Shopify'],
    repoUrl: 'https://github.com/Michos12/Bacano',
    liveUrl: null,
    imageUrl: null,
    featured: false,
    order: 4,
  },
];
