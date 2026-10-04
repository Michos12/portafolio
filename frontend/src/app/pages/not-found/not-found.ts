import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <section class="containerGlass section-card not-found-card">
        <h1 class="txt-hero code">404</h1>
        <p class="txt-title message">This page doesn't exist.</p>
        <a class="btn-1 btn-lg" routerLink="/">Back home</a>
      </section>
    </div>
  `,
  styles: `
    .not-found-page {
      display: flex;
      justify-content: center;
    }

    .not-found-card {
      align-items: center;
      gap: 24px;
      padding-block: 80px;
      text-align: center;
    }

    .code,
    .message {
      margin: 0;
    }

    .code {
      color: var(--blue);
    }

    .message {
      color: var(--grey);
    }
  `,
})
export class NotFound {}
