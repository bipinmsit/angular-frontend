import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private registerUrl = 'http://localhost:8000/auth/register/';

  // Method to register a new user
  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }
}
