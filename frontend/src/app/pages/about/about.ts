import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContactSectionComponent } from '../../components/contact-section/contact-section';
import { SectionTitleComponent } from '../../components/section-title/section-title';
import { EXPERIENCES, SKILL_GROUPS } from './about.data';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SectionTitleComponent, ContactSectionComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly experiences = EXPERIENCES;
}
