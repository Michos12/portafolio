import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginRequest, Token } from '../models/models';

const TOKEN_KEY = 'portfolio_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/admin`;

  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly isLoggedIn = computed(() => this.token() !== null);

  login(credentials: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${this.base}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        this.token.set(res.accessToken);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
  }
}
