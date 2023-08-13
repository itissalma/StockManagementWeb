import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTTokenResponse } from '../models/jwt-token-response.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7178'; 

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<JWTTokenResponse> {
    const user = { userName, password };
    return this.http.post<JWTTokenResponse>(`${this.apiUrl}/api/User/login`, user);
  }

  getToken(): string | null {
    // Implement the logic to retrieve the JWT token from your application
    // For example, you can store it in localStorage after successful login
    return localStorage.getItem('jwtToken');
  }

  setToken(token: string): void {
    // Implement the logic to save the JWT token in your application
    // For example, you can store it in localStorage after successful login
    localStorage.setItem('jwtToken', token);
  }
}
