import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SecureSoapService } from '../services/secure-soap.service';

@Component({
  selector: 'app-register-soap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>📝 Créer un compte</h2>
      
      <div class="card">
        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div class="form-group">
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" name="username" 
                   [(ngModel)]="userData.username" required minlength="3"
                   class="form-control"
                   placeholder="Entrez votre nom d'utilisateur">
            @if (registerForm.submitted && registerForm.controls['username']?.errors) {
              <div class="error-text">
                Le nom d'utilisateur doit avoir au moins 3 caractères
              </div>
            }
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" 
                   [(ngModel)]="userData.email" required
                   class="form-control"
                   placeholder="entrez@votre.email">
            @if (registerForm.submitted && registerForm.controls['email']?.errors) {
              <div class="error-text">
                Veuillez entrer un email valide
              </div>
            }
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" 
                   [(ngModel)]="userData.password" required minlength="6"
                   class="form-control"
                   placeholder="Au moins 6 caractères">
            @if (registerForm.submitted && registerForm.controls['password']?.errors) {
              <div class="error-text">
                Le mot de passe doit avoir au moins 6 caractères
              </div>
            }
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" 
                   [(ngModel)]="userData.confirmPassword" required
                   class="form-control"
                   placeholder="Retapez votre mot de passe">
          </div>
          
          <div class="form-actions">
            <button type="submit" [disabled]="loading" 
                    class="btn btn-primary">
              {{ loading ? 'Création en cours...' : 'Créer mon compte' }}
            </button>
            <button type="button" (click)="goToLogin()" class="btn btn-secondary">
              Déjà un compte ? Se connecter
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
          ✅ Compte créé avec succès ! Redirection vers la connexion...
        </div>
      }
    </div>
  `,
  styles: [`
    .register-container { 
      padding: 2rem; 
      max-width: 500px;
      margin: 0 auto;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }
    h2 {
      text-align: center;
      color: #3a0ca3;
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      border: 1px solid #e9ecef;
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
      transition: border-color 0.3s ease;
    }
    .form-control:focus {
      outline: none;
      border-color: #4361ee;
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
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
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background: #5a6268;
    }
    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    .error-text {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      border: 1px solid #f5c6cb;
    }
    .success-message {
      background: #d1edff;
      color: #155724;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      border: 1px solid #c3e6cb;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .register-container {
        padding: 1rem;
      }
      .card {
        padding: 1.5rem;
      }
    }
  `]
})
export class RegisterSoapComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;
  error = '';
  success = false;

  constructor(
    private soapService: SecureSoapService,
    private router: Router
  ) {}

  onRegister() {
    this.error = '';
    this.success = false;

    if (this.userData.password !== this.userData.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userData.email)) {
      this.error = 'Veuillez entrer un email valide';
      return;
    }

    this.loading = true;

    console.log('Tentative d\'inscription:', this.userData);
    
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      console.log('✅ Inscription simulée avec succès');
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      
    }, 1500);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}