import { Component } from '@angular/core';

interface SkillGroup {
  label: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly skills: SkillGroup[] = [
    { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'HTML/CSS'] },
    { label: 'Backend', items: ['Python', 'FastAPI', 'REST APIs', 'JWT Auth', 'Pydantic'] },
    { label: 'Data & Cloud', items: ['PostgreSQL', 'Supabase', 'Vercel', 'Render', 'Git/GitHub'] },
  ];
}
