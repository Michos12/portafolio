/* Import Nav and Footer Components */
import { NavComponent } from './components/nav/nav';
import { FooterComponent } from './components/footer/footer';
/* Import Angular Core and Router Modules */
import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './services/health.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private health = inject(HealthService);
  private viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    // Pre-warm the sleeping backend while the user reads the landing page.
    this.health.warmUp();

    // Anchor links (e.g. /about#contact) land below the sticky nav instead of under it.
    this.viewportScroller.setOffset(() => {
      const nav = document.querySelector('app-nav');
      return [0, (nav?.getBoundingClientRect().height ?? 0) + 20];
    });
  }

}
