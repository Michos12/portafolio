import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private projectService = inject(ProjectService);
  protected readonly stack = [
    "React", "Angular", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
    "Node.js", "Express.js", "REST APIs", "Python", "C++",
    "MySQL", "MongoDB", "Firestore", "SupaBase", "PostgreSQL", "Excel",
    "Git", "Docker", "Jira", "Figma", "Bash", "Postman", "BitBucket",
    "Pandas", "Claude Code", "Tableu"
  ];
  readonly projects = this.projectService.projects;
  ngOnInit(): void {
    const techStackContainerList = document.getElementsByClassName('row-stack');
    for (let i = 0; i < techStackContainerList.length; i++) {
      const techStackContainer = techStackContainerList[i] as HTMLElement;
      this.stack.forEach((tech: string) => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = tech;
        techStackContainer.appendChild(span);
      });    
  }
  }
  downloadResume(){
    const resumeUrl = 'assets/CV dev.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'CV dev.pdf';
    link.click();
  }
}
  