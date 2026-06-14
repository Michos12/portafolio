import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section" style="text-align: center; padding-top: 6rem;">
      <h1 style="font-size: 4rem; margin-bottom: 0;">404</h1>
      <p class="section-sub">This page doesn't exist.</p>
      <a class="btn btn-primary" routerLink="/">Back home</a>
    </section>
  `,
})
export class NotFound {}
