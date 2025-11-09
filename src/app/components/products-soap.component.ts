import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureSoapService } from '../services/secure-soap.service'; // ✅ Utilisez SecureSoapService

@Component({
  selector: 'app-products-soap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h2>📦 Gestion des Produits SOAP</h2>
      <p>Interface de gestion des produits via services SOAP sécurisés</p>
      <div class="card">
        <h3>Fonctionnalités produits</h3>
        <ul>
          <li>Liste des produits</li>
          <li>Recherche de produits</li>
          <li>Gestion du stock</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .products-container { 
      padding: 1rem; 
      max-width: 800px;
      margin: 0 auto;
    }
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-top: 1rem;
    }
  `]
})
export class ProductsSoapComponent {
  constructor(private soapService: SecureSoapService) {} // ✅ Utilisez SecureSoapService
}