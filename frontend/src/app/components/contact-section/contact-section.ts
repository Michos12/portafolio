import { Component, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContactService } from '../../services/contact.service';
import { SectionTitleComponent } from '../section-title/section-title';

/**
 * "Let's build something together" block: contact details plus a form that
 * posts to the backend /api/contact endpoint. Reusable on any page.
 */
@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSectionComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  protected readonly email = 'corozomichel@gmail.com';
  protected readonly githubUrl = 'https://github.com/Michos12';
  protected readonly linkedinUrl = 'https://www.linkedin.com/in/michael-veliz-3b9893300/';

  protected readonly submitting = signal(false);
  protected readonly success = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly slow = signal(false); // cold-start hint

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    projectType: ['', Validators.maxLength(120)],
    // Leaves room for the project-type prefix within the backend's 5000-char limit.
    message: ['', [Validators.required, Validators.maxLength(4800)]],
    website: [''], // honeypot: hidden field, must stay empty
  });

  private slowTimer?: ReturnType<typeof setTimeout>;

  /** True when a field should show its validation error. */
  protected showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

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

    const { name, email, projectType, message, website } = this.form.getRawValue();
    // The API has no project-type field, so it travels as the first line of the body.
    const body = projectType.trim() ? `Project type: ${projectType.trim()}\n\n${message}` : message;

    this.contactService.send({ name, email, body, website }).subscribe({
      next: () => {
        this.finish();
        this.success.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.finish();
        this.error.set(
          err?.status === 429
            ? 'Too many messages. Please wait a minute and try again.'
            : 'Something went wrong sending your message. Please try again.',
        );
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.slowTimer);
  }

  private finish(): void {
    clearTimeout(this.slowTimer);
    this.slow.set(false);
    this.submitting.set(false);
  }
}
