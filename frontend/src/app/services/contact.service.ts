import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MessageInput } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/contact`;

  send(message: MessageInput): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.base, message);
  }
}
