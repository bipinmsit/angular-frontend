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
  private ingestUrl = 'http://localhost:8000/api/ingest/';
  private queryUrl = 'http://localhost:8000/api/query/';
  private documentsUrl = 'http://localhost:8000/api/documents/';

  // Method to register a new user
  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  login(loginData: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password);

    return this.http.post(this.loginUrl, body.toString(), { headers });
  }

  // Method to ingest a document
  ingestDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add the Authorization header
    });

    return this.http.post(this.ingestUrl, formData, { headers });
  }
}
