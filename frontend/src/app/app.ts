import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { HealthService } from './services/health.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private health = inject(HealthService);

  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);

  ngOnInit(): void {
    // Pre-warm the sleeping backend while the user reads the landing page.
    this.health.warmUp();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
