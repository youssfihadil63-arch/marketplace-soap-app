import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-test-soap',
  standalone: true,
  imports: [CommonModule, JsonPipe], // ✅ CommonModule et JsonPipe importés
  template: `
    <div class="test-container">
      <h2>🧪 Test Services SOAP</h2>
      
      <div class="test-section">
        <button (click)="testHealth()" [disabled]="loading">Test Health</button>
        <button (click)="testAuth()" [disabled]="loading">Test Auth</button>
      </div>

      @if (loading) { <!-- ✅ Utilisation de @if au lieu de *ngIf -->
        <div class="loading">Loading...</div>
      }

      @if (result) {
        <div class="result">
          <h3>Result:</h3>
          <pre>{{ result | json }}</pre> <!-- ✅ Plus d'erreur json pipe -->
        </div>
      }

      @if (error) {
        <div class="error">
          <h3>Error:</h3>
          <pre>{{ error | json }}</pre> <!-- ✅ Plus d'erreur json pipe -->
        </div>
      }
    </div>
  `,
  styles: [`
    .test-container { padding: 1rem; }
    .test-section { margin: 1rem 0; }
    button { margin-right: 0.5rem; }
    .loading { color: blue; }
    .result { color: green; }
    .error { color: red; }
  `]
})
export class TestSoapComponent {
  loading = false;
  result: any;
  error: any;

  testHealth() {
    // Implémentez le test health
  }

  testAuth() {
    // Implémentez le test auth
  }
}