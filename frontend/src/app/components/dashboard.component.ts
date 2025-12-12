import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SecureSoapService } from '../services/secure-soap.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>👤 Tableau de Bord</h2>
      
      <div class="welcome-card">
        <h3>Bienvenue sur votre espace personnel !</h3>
        <p>Gérez votre compte et suivez vos activités</p>
      </div>

      <div class="dashboard-grid">
        <!-- Carte Statistiques -->
        <div class="dashboard-card">
          <div class="card-header">
            <h4>📊 Mes Statistiques</h4>
          </div>
          <div class="card-content">
            <ul class="stats-list">
              <li>
                <span class="stat-label">Commandes passées:</span>
                <span class="stat-value">0</span>
              </li>
              <li>
                <span class="stat-label">Produits consultés:</span>
                <span class="stat-value">0</span>
              </li>
              <li>
                <span class="stat-label">Compte créé le:</span>
                <span class="stat-value">{{ today | date:'dd/MM/yyyy' }}</span>
              </li>
              <li>
                <span class="stat-label">Statut:</span>
                <span class="stat-value badge-active">Actif</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Carte Actions Rapides -->
        <div class="dashboard-card">
          <div class="card-header">
            <h4>⚡ Actions Rapides</h4>
          </div>
          <div class="card-content">
            <div class="action-buttons">
              <button (click)="goToProducts()" class="btn btn-primary">
                🛍️ Voir les produits
              </button>
              <button (click)="editProfile()" class="btn btn-secondary">
                ✏️ Modifier le profil
              </button>
              <button (click)="viewOrders()" class="btn btn-info">
                📋 Mes commandes
              </button>
              <button (click)="logout()" class="btn btn-danger">
                🚪 Se déconnecter
              </button>
            </div>
          </div>
        </div>

        <!-- Carte Dernières Activités -->
        <div class="dashboard-card">
          <div class="card-header">
            <h4>📝 Dernières Activités</h4>
          </div>
          <div class="card-content">
            <div class="activities">
              <div class="activity-item">
                <span class="activity-icon">✅</span>
                <span class="activity-text">Compte créé avec succès</span>
                <span class="activity-time">Aujourd'hui</span>
              </div>
              <div class="activity-item">
                <span class="activity-icon">🔐</span>
                <span class="activity-text">Première connexion</span>
                <span class="activity-time">Aujourd'hui</span>
              </div>
              <div class="activity-item">
                <span class="activity-icon">👋</span>
                <span class="activity-text">Bienvenue sur Marketplace SOAP</span>
                <span class="activity-time">Aujourd'hui</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte Informations Compte -->
        <div class="dashboard-card">
          <div class="card-header">
            <h4>ℹ️ Informations Compte</h4>
          </div>
          <div class="card-content">
            <div class="account-info">
              <div class="info-item">
                <span class="info-label">Nom d'utilisateur:</span>
                <span class="info-value">utilisateur</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">utilisateur@example.com</span>
              </div>
              <div class="info-item">
                <span class="info-label">Membre depuis:</span>
                <span class="info-value">{{ today | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { 
      padding: 2rem; 
      max-width: 1200px;
      margin: 0 auto;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }
    
    h2 {
      text-align: center;
      color: #3a0ca3;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    
    .welcome-card {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .welcome-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }
    
    .welcome-card p {
      margin: 0;
      opacity: 0.9;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .dashboard-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      border: 1px solid #e9ecef;
      overflow: hidden;
    }
    
    .card-header {
      background: #f8f9fa;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
    }
    
    .card-header h4 {
      margin: 0;
      color: #495057;
      font-size: 1.2rem;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .stats-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .stats-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f3f4;
    }
    
    .stats-list li:last-child {
      border-bottom: none;
    }
    
    .stat-label {
      color: #6c757d;
      font-weight: 500;
    }
    
    .stat-value {
      color: #495057;
      font-weight: 600;
    }
    
    .badge-active {
      background: #d1edff;
      color: #155724;
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }
    
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .btn {
      padding: 0.875rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      text-align: left;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-info {
      background: #17a2b8;
      color: white;
    }
    
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .activities {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .activity-icon {
      font-size: 1.2rem;
    }
    
    .activity-text {
      flex: 1;
      color: #495057;
    }
    
    .activity-time {
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    .account-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f1f3f4;
    }
    
    .info-item:last-child {
      border-bottom: none;
    }
    
    .info-label {
      color: #6c757d;
    }
    
    .info-value {
      color: #495057;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }
      
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .btn {
        text-align: center;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  today = new Date();

  constructor(
    private soapService: SecureSoapService,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté
    if (!this.soapService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  editProfile() {
    alert('Fonctionnalité "Modifier le profil" à venir !');
  }

  viewOrders() {
    alert('Fonctionnalité "Mes commandes" à venir !');
  }

  logout() {
    this.soapService.logout();
    this.router.navigate(['/login']);
  }
}