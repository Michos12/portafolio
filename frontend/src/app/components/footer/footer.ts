import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class FooterComponent {
    protected readonly year = new Date().getFullYear();
}