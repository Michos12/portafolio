import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { GithubRepo } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/github`;

  readonly repos = signal<GithubRepo[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<GithubRepo[]>(`${this.base}/activity`).subscribe({
      next: (data) => {
        this.repos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('GitHub activity is unavailable right now.');
        this.loading.set(false);
      },
    });
  }
}
