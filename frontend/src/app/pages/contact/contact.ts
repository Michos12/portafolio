import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  protected readonly submitting = signal(false);
  protected readonly success = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly slow = signal(false); // cold-start hint

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''], // honeypot — hidden field, must stay empty
  });

  private slowTimer?: ReturnType<typeof setTimeout>;

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.success.set(false);
    this.error.set(null);

    // If the backend is cold (Render free tier sleeps), warn the user after 3s.
    this.slowTimer = setTimeout(() => this.slow.set(true), 3000);

    const v = this.form.getRawValue();
    this.contactService
      .send({ name: v.name!, email: v.email!, body: v.body!, website: v.website ?? '' })
      .subscribe({
      next: () => {
        this.finish();
        this.success.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.finish();
        this.error.set(
          err?.status === 429
            ? 'Too many messages — please wait a minute and try again.'
            : 'Something went wrong sending your message. Please try again.',
        );
      },
    });
  }

  private finish(): void {
    clearTimeout(this.slowTimer);
    this.slow.set(false);
    this.submitting.set(false);
  }
}
