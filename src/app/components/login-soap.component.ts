import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SecureSoapService } from '../services/secure-soap.service';

@Component({
  selector: 'app-login-soap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>🔐 Connexion</h2>
      <p>Connectez-vous à votre compte Marketplace SOAP</p>
      
      <div class="card">
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" name="username" 
                   [(ngModel)]="credentials.username" required
                   class="form-control"
                   placeholder="Entrez votre nom d'utilisateur">
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" 
                   [(ngModel)]="credentials.password" required
                   class="form-control"
                   placeholder="Entrez votre mot de passe">
          </div>
          
          <div class="form-actions">
            <button type="submit" [disabled]="!loginForm.valid || loading" 
                    class="btn btn-primary">
              {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>
            <button type="button" (click)="goToRegister()" class="btn btn-secondary">
              Pas de compte ? S'inscrire
            </button>
          </div>
        </form>
      </div>

      @if (error) {
        <div class="error-message">
          ❌ {{ error }}
        </div>
      }

      @if (success) {
        <div class="success-message">
          ✅ Connexion réussie ! Redirection...
        </div>
      }
    </div>
  `,
  styles: [`
    .login-container { 
      padding: 2rem; 
      max-width: 400px;
      margin: 0 auto;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }
    h2 {
      text-align: center;
      color: #3a0ca3;
      margin-bottom: 1rem;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #495057;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
    }
    .form-control:focus {
      outline: none;
      border-color: #4361ee;
    }
    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    .success-message {
      background: #d1edff;
      color: #155724;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class LoginSoapComponent {
  credentials = {
    username: '',
    password: ''
  };

  loading = false;
  error = '';
  success = false;

  constructor(
    private soapService: SecureSoapService,
    private router: Router
  ) {}

  async onLogin() {
    this.loading = true;
    this.error = '';
    this.success = false;

    try {
      // Utiliser la nouvelle méthode login du service
      this.soapService.login(this.credentials).subscribe({
        next: (response) => {
          this.loading = false;
          
          if (response.success) {
            this.success = true;
            console.log('✅ Connexion réussie:', response);
            
            // Redirection vers le dashboard après 1 seconde
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          } else {
            this.error = response.message || 'Erreur de connexion';
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'Erreur lors de la connexion';
          console.error('❌ Erreur connexion:', error);
        }
      });
      
    } catch (error) {
      this.loading = false;
      this.error = 'Erreur inattendue';
      console.error('❌ Erreur connexion:', error);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}