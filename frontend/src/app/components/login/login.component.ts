import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  loading = false;

  constructor(private authService: AuthService) {}

  async onLogin() {
    this.loading = true;
    this.message = '';
    
    try {
      const result = await this.authService.login(this.username, this.password);
      this.message = result.message;
      if (result.success) {
        console.log('✅ Connexion réussie!', result);
        // Redirection vers le dashboard plus tard
      }
    } catch (error) {
      this.message = '❌ Erreur de connexion';
      console.error('Login error:', error);
    } finally {
      this.loading = false;
    }
  }
}