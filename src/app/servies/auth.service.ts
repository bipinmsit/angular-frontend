import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private registerUrl = 'http://localhost:8000/auth/register/';
  private loginUrl = 'http://localhost:8000/auth/login/';

  // Method to register a new user
  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  // login(userData: { username: string; password: string }): Observable<any> {
  //   return this.http.post<any>(this.loginUrl, userData);
  // }

  login(loginData: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password);

    return this.http.post(this.loginUrl, body.toString(), { headers });
  }
}
