import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

/**
 * Pings the backend health endpoint to pre-warm the free Render instance
 * (which sleeps after 15 min of inactivity). Called once on app start so the
 * server is awake by the time the user reaches the Projects/Contact sections.
 */
@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);

  warmUp(): void {
    this.http
      .get(`${environment.apiUrl}/health`)
      .subscribe({ next: () => {}, error: () => {} });
  }
}
