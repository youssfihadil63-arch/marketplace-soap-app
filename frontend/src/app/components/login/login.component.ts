import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  loginForm: any; // À remplacer par FormGroup si vous utilisez Reactive Forms

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm && this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.credentials.email, this.credentials.password)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
        },
        error: (error: any) => {
          console.error('Login failed', error);
        }
      });
  }
}