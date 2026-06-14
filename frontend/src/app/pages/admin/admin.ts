import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { ProjectInput } from '../../models/models';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private projectService = inject(ProjectService);

  protected readonly isLoggedIn = this.auth.isLoggedIn;
  protected readonly projects = this.projectService.projects;

  protected readonly loginError = signal<string | null>(null);
  protected readonly formError = signal<string | null>(null);
  protected readonly busy = signal(false);
  protected readonly editingId = signal<number | null>(null);

  protected readonly loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected readonly projectForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    techStack: [''], // comma-separated in the UI
    repoUrl: [''],
    liveUrl: [''],
    imageUrl: [''],
    featured: [false],
    order: [0],
  });

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.projectService.load();
    }
  }

  login(): void {
    if (this.loginForm.invalid) return;
    this.loginError.set(null);
    this.busy.set(true);
    this.auth.login(this.loginForm.getRawValue() as { username: string; password: string }).subscribe({
      next: () => {
        this.busy.set(false);
        this.projectService.load();
      },
      error: () => {
        this.busy.set(false);
        this.loginError.set('Invalid credentials.');
      },
    });
  }

  logout(): void {
    this.auth.logout();
  }

  private buildPayload(): ProjectInput {
    const v = this.projectForm.getRawValue();
    return {
      title: v.title!,
      description: v.description!,
      techStack: (v.techStack ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      repoUrl: v.repoUrl || null,
      liveUrl: v.liveUrl || null,
      imageUrl: v.imageUrl || null,
      featured: !!v.featured,
      order: Number(v.order) || 0,
    };
  }

  save(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    this.formError.set(null);
    const payload = this.buildPayload();
    const id = this.editingId();
    const request = id
      ? this.projectService.update(id, payload)
      : this.projectService.create(payload);

    request.subscribe({
      next: () => {
        this.busy.set(false);
        this.resetForm();
        this.projectService.load();
      },
      error: () => {
        this.busy.set(false);
        this.formError.set('Could not save the project.');
      },
    });
  }

  edit(id: number): void {
    const project = this.projects().find((p) => p.id === id);
    if (!project) return;
    this.editingId.set(id);
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      repoUrl: project.repoUrl ?? '',
      liveUrl: project.liveUrl ?? '',
      imageUrl: project.imageUrl ?? '',
      featured: project.featured,
      order: project.order,
    });
  }

  remove(id: number): void {
    this.projectService.remove(id).subscribe({
      next: () => this.projectService.load(),
      error: () => this.formError.set('Could not delete the project.'),
    });
  }

  resetForm(): void {
    this.editingId.set(null);
    this.projectForm.reset({ featured: false, order: 0 });
  }
}
