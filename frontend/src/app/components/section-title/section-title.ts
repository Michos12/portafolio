import { Component, computed, input } from '@angular/core';

/**
 * Section heading with the yellow accent bar from the design system.
 * `size` picks the typography scale; `level` picks the semantic heading tag,
 * so a page can keep exactly one <h1> regardless of how big the title looks.
 */
@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.html',
  styleUrl: './section-title.css',
})
export class SectionTitleComponent {
  readonly text = input.required<string>();
  readonly size = input<'hero' | 'h1' | 'h2'>('h1');
  readonly level = input<1 | 2>(2);

  protected readonly textClass = computed(() => `txt-${this.size()}`);
}
