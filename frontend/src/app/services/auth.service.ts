import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
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
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // Simulation d'inscription
  register(user: User): Observable<LoginResponse> {
    // Pour l'instant, simulation réussie
    return of({
      success: true,
      message: 'Inscription réussie!'
    }).pipe(
      tap(() => {
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
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        return of({
          success: true,
          token: token,
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
    return localStorage.getItem('token') !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('demo_user');
    this.currentUserSubject.next(null);
  }

  // Vérification token (pour interceptor)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}