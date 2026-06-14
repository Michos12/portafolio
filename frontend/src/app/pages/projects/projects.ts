import { Component, OnInit, inject } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);
  private githubService = inject(GithubService);

  // Expose service signals directly to the template.
  protected readonly projects = this.projectService.projects;
  protected readonly loading = this.projectService.loading;
  protected readonly error = this.projectService.error;

  protected readonly repos = this.githubService.repos;
  protected readonly reposLoading = this.githubService.loading;
  protected readonly reposError = this.githubService.error;

  protected readonly skeletons = [0, 1, 2];

  ngOnInit(): void {
    this.projectService.load();
    this.githubService.load();
  }
}
