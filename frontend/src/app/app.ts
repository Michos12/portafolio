/* Import Nav and Footer Components */
import { NavComponent } from './components/nav/nav';
import { FooterComponent } from './components/footer/footer';
/* Import Angular Core and Router Modules */
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

  ngOnInit(): void {
    // Pre-warm the sleeping backend while the user reads the landing page.
    this.health.warmUp();
  }

}
