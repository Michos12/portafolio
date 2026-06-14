import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Project, ProjectInput } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/projects`;
  private adminBase = `${environment.apiUrl}/admin/projects`;

  // Public state consumed by the Projects page (Signals, no NgRx).
  readonly projects = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Project[]>(this.base).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load projects. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  // --- Admin CRUD (JWT attached by the interceptor) ---
  create(input: ProjectInput): Observable<Project> {
    return this.http.post<Project>(this.adminBase, input);
  }

  update(id: number, input: Partial<ProjectInput>): Observable<Project> {
    return this.http.put<Project>(`${this.adminBase}/${id}`, input);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminBase}/${id}`);
  }
}
