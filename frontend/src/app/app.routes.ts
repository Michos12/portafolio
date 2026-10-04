import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

// Lazy-loaded standalone pages. Keeps the initial bundle small.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Michel Corozo — Full Stack Developer',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About — Michel Corozo',
  },
  // Legacy pages removed in the redesign: keep old links and bookmarks working.
  {
    path: 'projects',
    redirectTo: () => inject(Router).createUrlTree(['/'], { fragment: 'projects' }),
  },
  {
    path: 'contact',
    redirectTo: () => inject(Router).createUrlTree(['/about'], { fragment: 'contact' }),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
    title: 'Admin',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Page not found',
  },
];
