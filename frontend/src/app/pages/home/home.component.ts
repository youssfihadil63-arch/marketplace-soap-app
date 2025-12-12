import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService, Product } from '../../services/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- En-tête -->
    <div class="header">
      <h1>🛍️ Marketplace Premium</h1>
      <p>Découvrez nos produits high-tech exclusifs</p>
    </div>

    <!-- Barre de recherche -->
    <div class="search-container">
      <div class="search-box">
        <i>🔍</i>
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          [(ngModel)]="searchQuery"
          (input)="onSearch()">
      </div>
    </div>

    <!-- Produits -->
    <div class="products-section">
      <h2>📦 Nos Produits</h2>
      
      <div class="products-grid">
        <div 
          class="product-card" 
          *ngFor="let product of filteredProducts">
          
          <div class="product-image" [style.background-image]="'url(' + product.image + ')'">
            <div class="badge new" *ngIf="product.isNew">Nouveau</div>
            <div class="badge sale" *ngIf="product.onSale && product.originalPrice">
              -{{ getDiscountPercent(product) }}%
            </div>
            <div class="rating-badge">⭐ {{ product.rating }}</div>
          </div>
          
          <div class="product-info">
            <div class="category">{{ product.category }}</div>
            <div class="brand">{{ product.brand }}</div>
            <h3 class="name">{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            
            <div class="features" *ngIf="product.features && product.features.length > 0">
              <span class="feature-tag" *ngFor="let feature of product.features.slice(0, 2)">
                {{ feature }}
              </span>
            </div>
            
            <div class="product-rating">
              <div class="stock" [class.low-stock]="product.stock < 5">
                📦 {{ product.stock }} en stock
              </div>
            </div>
            
            <div class="product-footer">
              <div class="price-section">
                <div class="current-price">{{ product.price }}€</div>
                <div class="original-price" *ngIf="product.originalPrice">
                  {{ product.originalPrice }}€
                </div>
              </div>
              <button 
                class="add-to-cart"
                (click)="addToCart(product)"
                [disabled]="product.stock === 0">
                {{ product.stock === 0 ? 'Rupture' : '🛒' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message aucun résultat -->
      <div class="no-results" *ngIf="searchQuery && filteredProducts.length === 0">
        <p>😔 Aucun produit trouvé pour "{{ searchQuery }}"</p>
      </div>
    </div>

    <!-- Panier flottant -->
    <div class="floating-cart" *ngIf="cartService.getTotalItems() > 0" (click)="showCart()">
      <div class="cart-icon">
        🛒
        <span class="cart-count">{{ cartService.getTotalItems() }}</span>
      </div>
      <div class="cart-total">
        Total: {{ cartService.getTotalPrice() }}€
      </div>
    </div>

    <!-- Section Nouveaux Produits -->
    <div class="special-section" *ngIf="newProducts.length > 0 && !searchQuery">
      <h2>🎁 Nouveaux Produits</h2>
      <div class="products-grid">
        <div class="product-card" *ngFor="let product of newProducts.slice(0, 4)">
          <div class="product-image" [style.background-image]="'url(' + product.image + ')'">
            <div class="badge new">Nouveau</div>
            <div class="rating-badge">⭐ {{ product.rating }}</div>
          </div>
          <div class="product-info">
            <h3 class="name">{{ product.name }}</h3>
            <div class="price">{{ product.price }}€</div>
            <button class="add-to-cart" (click)="addToCart(product)">🛒</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Soldes -->
    <div class="special-section" *ngIf="saleProducts.length > 0 && !searchQuery">
      <h2>🔥 Produits en Solde</h2>
      <div class="products-grid">
        <div class="product-card" *ngFor="let product of saleProducts.slice(0, 4)">
          <div class="product-image" [style.background-image]="'url(' + product.image + ')'">
            <div class="badge sale" *ngIf="product.originalPrice">
              -{{ getDiscountPercent(product) }}%
            </div>
            <div class="rating-badge">⭐ {{ product.rating }}</div>
          </div>
          <div class="product-info">
            <h3 class="name">{{ product.name }}</h3>
            <div class="price-section">
              <div class="current-price">{{ product.price }}€</div>
              <div class="original-price">{{ product.originalPrice }}€</div>
            </div>
            <button class="add-to-cart" (click)="addToCart(product)">🛒</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background: #f5f7fa;
      color: #212529;
    }

    /* En-tête */
    .header {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    /* Barre de recherche */
    .search-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .search-box {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .search-box input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: none;
      border-radius: 25px;
      background: white;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      font-size: 1rem;
    }

    /* Section produits */
    .products-section {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .special-section {
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 2rem;
    }

    .products-section h2, .special-section h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    }

    .product-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      color: white;
      padding: 0.3rem 0.7rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .badge.new {
      background: #4361ee;
    }

    .badge.sale {
      background: #f72585;
    }

    .rating-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.3rem 0.7rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .product-info {
      padding: 1.5rem;
    }

    .category {
      color: #4361ee;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .brand {
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .name {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .description {
      color: #6c757d;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .features {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .feature-tag {
      background: #e9ecef;
      color: #495057;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.7rem;
    }

    .product-rating {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      gap: 0.5rem;
    }

    .stock {
      color: #28a745;
      font-size: 0.9rem;
    }

    .stock.low-stock {
      color: #ffc107;
      font-weight: 600;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price-section {
      display: flex;
      flex-direction: column;
    }

    .current-price {
      font-weight: 700;
      font-size: 1.3rem;
      color: #3a0ca3;
    }

    .original-price {
      font-size: 0.9rem;
      color: #6c757d;
      text-decoration: line-through;
    }

    .add-to-cart {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
      border: none;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .add-to-cart:hover:not(:disabled) {
      transform: scale(1.05);
    }

    .add-to-cart:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    /* Panier flottant */
    .floating-cart {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 25px;
      box-shadow: 0 10px 30px rgba(67, 97, 238, 0.3);
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      z-index: 1000;
    }

    .cart-icon {
      position: relative;
    }

    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #f72585;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
    }

    /* Aucun résultat */
    .no-results {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
    }

    @media (max-width: 768px) {
      .header {
        padding: 2rem 1rem;
      }
      
      .header h1 {
        font-size: 2rem;
      }
      
      .search-container,
      .products-section,
      .special-section {
        padding: 0 1rem;
      }
      
      .products-grid {
        grid-template-columns: 1fr;
      }

      .floating-cart {
        bottom: 1rem;
        right: 1rem;
        padding: 0.8rem 1.2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  newProducts: Product[] = [];
  saleProducts: Product[] = [];

  constructor(
    public productsService: ProductsService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.cartService.requestNotificationPermission();
  }

  loadProducts() {
    this.filteredProducts = this.productsService.getProducts();
    this.newProducts = this.productsService.getNewProducts();
    this.saleProducts = this.productsService.getSaleProducts();
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredProducts = this.productsService.searchProducts(this.searchQuery);
    } else {
      this.filteredProducts = this.productsService.getProducts();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  showCart() {
    // Pour l'instant, on montre une alerte
    const total = this.cartService.getTotalPrice();
    const items = this.cartService.getTotalItems();
    alert(`🛒 Votre panier: ${items} article(s) - Total: ${total}€`);
  }

  getDiscountPercent(product: Product): number {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  }
}