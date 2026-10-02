import { Component } from '@angular/core';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
  external: boolean;
}

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class FooterComponent {
    protected readonly year = new Date().getFullYear();

    protected readonly socials: SocialLink[] = [
        {
            label: 'corozomichel@gmail.com',
            href: 'mailto:corozomichel@gmail.com',
            icon: 'assets/social/mail.svg',
            external: false,
        },
        {
            label: 'linkedin/michael-veliz',
            href: 'https://www.linkedin.com/in/michael-veliz-3b9893300/',
            icon: 'assets/social/linkedin.svg',
            external: true,
        },
        {
            label: 'github/Michos12',
            href: 'https://github.com/Michos12',
            icon: 'assets/social/github.svg',
            external: true,
        },
    ];

    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
