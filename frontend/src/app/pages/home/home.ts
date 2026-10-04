import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SectionTitleComponent } from '../../components/section-title/section-title';
import { ProjectService } from '../../services/project.service';
import { PROJECT_IMAGE_FALLBACK, STACK_ROWS } from './home.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SectionTitleComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private projectService = inject(ProjectService);

  protected readonly stackRows = STACK_ROWS;
  protected readonly fallbackImage = PROJECT_IMAGE_FALLBACK;

  // Project cards are read from the database through the API.
  protected readonly projects = this.projectService.projects;
  protected readonly loading = this.projectService.loading;
  protected readonly error = this.projectService.error;
  protected readonly skeletons = [0, 1, 2, 3];

  ngOnInit(): void {
    this.projectService.load();
  }

  retry(): void {
    this.projectService.load();
  }
}
