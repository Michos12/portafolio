import { RouterLink } from '@angular/router';
import { inject, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { SectionTitleComponent } from '../../components/section-title/section-title';
import { DRAFT_PROJECTS, PROJECT_IMAGE_FALLBACK, STACK_ROWS } from './home.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SectionTitleComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  private projectService = inject(ProjectService);
  protected readonly stackRows = STACK_ROWS;
  protected readonly fallbackImage = PROJECT_IMAGE_FALLBACK;

  // TODO: replace the drafts with live data once the cards read from the database:
  protected readonly projects = this.projectService.projects;
  protected readonly loading = this.projectService.loading;
  protected readonly error = this.projectService.error;
  protected readonly skeletons = [0, 1, 2];

  ngOnInit(): void {
    this.projectService.load();
  }
}
