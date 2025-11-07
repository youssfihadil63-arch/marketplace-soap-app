import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // À adapter pour SOAP
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  // Simulation d'inscription (en attendant le backend)
  register(user: User): Observable<LoginResponse> {
    // Pour l'instant, simulation réussie
    return of({
      success: true,
      message: 'Inscription réussie!'
    }).pipe(
      tap(() => {
        // Stocker en localStorage pour la démo
        localStorage.setItem('demo_user', JSON.stringify(user));
      })
    );
  }

  // Simulation de connexion
  login(email: string, password: string): Observable<LoginResponse> {
    const demoUser = localStorage.getItem('demo_user');
    
    if (demoUser) {
      const user = JSON.parse(demoUser);
      if (user.email === email && user.password === password) {
        this.isAuthenticated = true;
        localStorage.setItem('token', 'demo-token-' + Date.now());
        return of({
          success: true,
          token: 'demo-token',
          user: user
        });
      }
    }
    
    return of({
      success: false,
      message: 'Email ou mot de passe incorrect'
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('token') !== null;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('demo_user');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('demo_user');
    return user ? JSON.parse(user) : null;
  }
}