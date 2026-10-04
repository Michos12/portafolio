// Static content for the Home page.

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
    { name: 'TypeScript', icon: 'assets/icons/typescript.png'},
    { name: 'React', icon: 'assets/icons/react.png' },
    { name: 'Next.js', icon: 'assets/icons/nextjs.png' },
    { name: 'JavaScript', icon: 'assets/icons/javascript.png' },
    { name: 'Tailwind CSS', icon: 'assets/icons/tailwind.png' },
    { name: 'Figma', icon: 'assets/icons/figma.png', iconWidth: 18},
    { name: 'Jira', icon: 'assets/icons/jira.png' },
    { name: 'Bitbucket', icon: 'assets/icons/bitbucket.png' },
  ],
  // Backend & tooling
  [
    { name: 'Python', icon: 'assets/icons/python.png' },
    { name: 'FastAPI', icon: 'assets/icons/fastapi.png' },
    { name: 'Express.js', icon: 'assets/icons/expressjs.png' },
    { name: 'REST APIs', icon: 'assets/icons/restapis.png' },
    { name: 'C++', icon: 'assets/icons/C++.png' },
    { name: 'Docker', icon: 'assets/icons/docker.png' },
    { name: 'Git', icon: 'assets/icons/git.png' },
    { name: 'Bash', icon: 'assets/icons/bash.png' },
    { name: 'Postman', icon: 'assets/icons/postman.png' },
  ],
  // Data & AI
  [
    { name: 'PostgreSQL', icon: 'assets/icons/postgresql.png' },
    { name: 'MySQL', icon: 'assets/icons/sql.png' },
    { name: 'MongoDB', icon: 'assets/icons/mongodb.png' },
    { name: 'Supabase', icon: 'assets/icons/supabase.png' },
    { name: 'Firestore', icon: 'assets/icons/firestore.png' },
    { name: 'Excel', icon: 'assets/icons/excel.png' },
    { name: 'Claude Code', icon: 'assets/icons/claude.png' },
  ],
];

export const PROJECT_IMAGE_FALLBACK = 'assets/projects/placeholder.jpg';
