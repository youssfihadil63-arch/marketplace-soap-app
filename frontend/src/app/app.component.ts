import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { SecureSoapService } from './services/secure-soap.service';
import { CartService } from './services/cart.service'; // ← AJOUTEZ CET IMPORT
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Navigation -->
    <div class="header">
      <h1>🛍️ Marketplace SOAP</h1>
      <nav>
        <!-- Liens toujours visibles -->
        <a routerLink="/products" routerLinkActive="active" class="nav-link">📦 Produits</a>
        
        <!-- Lien panier toujours visible -->
        <a routerLink="/cart" routerLinkActive="active" class="nav-link cart-link">
          🛒 Panier 
          <span *ngIf="cartItemCount > 0" class="cart-badge">{{cartItemCount}}</span>
        </a>
        
        <!-- Liens conditionnels selon la connexion -->
        @if (isLoggedIn) {
          <!-- Liens pour utilisateur connecté -->
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">👤 Tableau de Bord</a>
          <div class="user-menu">
            <span class="user-greeting">Bonjour, {{userName}}!</span>
            <button (click)="logout()" class="nav-link logout-btn">🚪 Déconnexion</button>
          </div>
        } @else {
          <!-- Liens pour utilisateur non connecté -->
          <a routerLink="/login" routerLinkActive="active" class="nav-link">🔐 Connexion</a>
          <a routerLink="/register" routerLinkActive="active" class="nav-link">📝 Inscription</a>
        }
        
        <!-- Lien toujours visible -->
        <a routerLink="/test" routerLinkActive="active" class="nav-link">🧪 Test</a>
      </nav>
    </div>

    <!-- Contenu principal -->
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      margin-left: 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 0.9rem;
      white-space: nowrap;
      position: relative;
    }
    
    .nav-link:hover, .nav-link.active {
      background: rgba(255,255,255,0.2);
      transform: translateY(-1px);
    }
    
    .cart-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .cart-badge {
      background: #ff4757;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: bold;
    }
    
    .logout-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .logout-btn:hover {
      background: rgba(255,59,48,0.2);
      border-color: rgba(255,59,48,0.5);
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 1rem;
      padding-left: 1rem;
      border-left: 1px solid rgba(255,255,255,0.3);
    }
    
    .user-greeting {
      font-size: 0.9rem;
      opacity: 0.9;
      font-weight: 500;
    }
    
    .main-content {
      padding: 2rem;
      min-height: calc(100vh - 120px);
      background: #f8f9fa;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        text-align: center;
        padding: 1rem;
      }
      
      nav {
        justify-content: center;
        margin-top: 0.5rem;
      }
      
      .user-menu {
        flex-direction: column;
        border-left: none;
        border-top: 1px solid rgba(255,255,255,0.3);
        padding-left: 0;
        padding-top: 0.5rem;
        margin-left: 0;
        width: 100%;
      }
      
      .main-content {
        padding: 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .nav-link {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
        margin-left: 0.25rem;
      }
      
      .header h1 {
        font-size: 1.3rem;
      }
      
      .cart-badge {
        width: 18px;
        height: 18px;
        font-size: 0.6rem;
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Marketplace SOAP';
  isLoggedIn = false;
  userName = 'Utilisateur';
  cartItemCount = 0; // ← AJOUTEZ CETTE PROPRIÉTÉ
  
  private routerSubscription: Subscription = new Subscription();
  private cartSubscription: Subscription = new Subscription(); // ← AJOUTEZ CETTE SOUSCRIPTION

  constructor(
    private soapService: SecureSoapService,
    private cartService: CartService, // ← AJOUTEZ DANS LE CONSTRUCTEUR
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthStatus();
    
    // Écouter les changements de route pour mettre à jour le statut
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.checkAuthStatus();
      });

    // ← AJOUTEZ CETTE PARTIE POUR LE PANIER
    // Écouter les changements du panier
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.itemCount;
      console.log('🛒 Panier mis à jour:', cart);
    });
  }

  ngOnDestroy() {
    // N'oubliez pas de vous désabonner pour éviter les fuites mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.cartSubscription) { // ← AJOUTEZ CETTE LIGNE
      this.cartSubscription.unsubscribe();
    }
  }

  checkAuthStatus() {
    this.isLoggedIn = this.soapService.isLoggedIn();
    
    if (this.isLoggedIn) {
      const userData = this.soapService.getUserData();
      this.userName = userData?.username || 'Utilisateur';
    } else {
      this.userName = 'Utilisateur';
    }
    
    console.log('Statut connexion:', this.isLoggedIn ? 'Connecté' : 'Déconnecté');
  }

  logout() {
    this.soapService.logout();
    this.isLoggedIn = false;
    this.userName = 'Utilisateur';
    
    // Rediriger vers la page d'accueil
    this.router.navigate(['/products']);
    
    // Afficher un message de confirmation
    console.log('✅ Déconnexion réussie');
  }
}