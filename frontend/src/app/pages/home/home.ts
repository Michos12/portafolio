import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SectionTitleComponent } from '../../components/section-title/section-title';
import { DRAFT_PROJECTS, PROJECT_IMAGE_FALLBACK, STACK_ROWS } from './home.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SectionTitleComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly stackRows = STACK_ROWS;
  protected readonly fallbackImage = PROJECT_IMAGE_FALLBACK;

  // TODO: replace the drafts with live data once the cards read from the database:
  //   private projectService = inject(ProjectService);
  //   protected readonly projects = this.projectService.projects; // + projectService.load()
  // (the template would then iterate over `projects()` instead of `projects`).
  protected readonly projects = DRAFT_PROJECTS;
}
