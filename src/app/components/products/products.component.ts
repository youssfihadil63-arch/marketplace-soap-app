import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

// Interfaces
export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock?: number;
  features?: string[];
}

export interface FilterState {
  currentFilter: string;
  currentSearch: string;
  currentSort: string;
  priceRange?: [number, number];
  brands?: string[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() showSearch: boolean = true;
  @Input() showFilters: boolean = true;
  @Input() showSort: boolean = true;
  @Input() itemsPerPage: number = 12;
  @Input() enablePagination: boolean = false;

  @Output() productAddedToCart = new EventEmitter<Product>();
  @Output() productClicked = new EventEmitter<Product>();
  @Output() productsRendered = new EventEmitter<Product[]>();

  filteredProducts: Product[] = [];
  state: FilterState = {
    currentFilter: 'all',
    currentSearch: '',
    currentSort: 'default'
  };
  
  // AJOUT : Propriété pour les articles du panier
  cartItems: any[] = [];

  // AJOUT : Injection du service Cart
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.filteredProducts = this.getFilteredProducts();
    this.emitProductsRendered();
    
    // AJOUT : Abonnement aux changements du panier
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart.items;
    });
  }

  // AJOUT : Méthodes pour les statistiques
  getAveragePrice(): number {
    if (this.filteredProducts.length === 0) return 0;
    const total = this.filteredProducts.reduce((sum, product) => sum + product.price, 0);
    return total / this.filteredProducts.length;
  }

  getTotalStock(): number {
    return this.filteredProducts.reduce((sum, product) => sum + (product.stock || 0), 0);
  }

  getAverageRating(): number {
    if (this.filteredProducts.length === 0) return 0;
    const total = this.filteredProducts.reduce((sum, product) => sum + product.rating, 0);
    return Math.round((total / this.filteredProducts.length) * 10) / 10;
  }

  // AJOUT : Méthode pour vérifier si un produit est dans le panier
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }

  // Render Methods
  private emitProductsRendered(): void {
    this.productsRendered.emit(this.filteredProducts);
  }

  // Products Rendering
  generateStarRating(rating: number): string {
    return Array(5).fill(0).map((_, i) => {
      if (i < Math.floor(rating)) {
        return '<i class="fas fa-star"></i>';
      } else if (i < rating) {
        return '<i class="fas fa-star-half-alt"></i>';
      } else {
        return '<i class="far fa-star"></i>';
      }
    }).join('');
  }

  formatCategory(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'smartphones': '📱 Smartphones',
      'audio': '🎧 Audio',
      'informatique': '💻 Informatique',
      'montres': '⌚ Montres Connectées',
      'gaming': '🎮 Gaming',
      'photo': '📷 Photo',
      'maison': '🏠 Maison Connectée',
      'cosmetique': '🧴 Cosmétique'
    };
    
    return categoryMap[category] || category;
  }

  // Event Handlers
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.currentSearch = value;
    this.applyFilters();
  }

  onFilterChange(filter: string): void {
    this.state.currentFilter = filter;
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.state.currentSort = value;
    this.applyFilters();
  }

  // MODIFICATION : Méthode onAddToCart pour utiliser le service Cart
  onAddToCart(event: Event, product: Product): void {
    event.stopPropagation();
    
    const button = event.target as HTMLElement;
    const cartButton = button.closest('.add-to-cart') as HTMLElement;
    
    if (cartButton) {
      // Add loading state
      cartButton.classList.add('loading');
      cartButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      // Simulate API call
      setTimeout(() => {
        cartButton.classList.remove('loading');
        cartButton.classList.add('success');
        cartButton.innerHTML = '<i class="fas fa-check"></i>';

        setTimeout(() => {
          cartButton.classList.remove('success');
          // AJOUT : Mise à jour du texte selon l'état du panier
          if (this.isInCart(product.id)) {
            cartButton.innerHTML = '<i class="fas fa-shopping-cart"></i> ✓ Ajouté';
          } else {
            cartButton.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter';
          }
        }, 2000);

        // AJOUT : Utilisation du service Cart
        this.cartService.addToCart(product);
        this.cartService.notifyProductAdded(product.name);
        
        this.productAddedToCart.emit(product);
        this.showNotification(`${product.name} ajouté au panier!`);
      }, 1000);
    }
  }

  onProductClick(product: Product): void {
    this.productClicked.emit(product);
  }

  onRemoveFilter(event: Event, type: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (type === 'filter') {
      this.state.currentFilter = 'all';
    } else if (type === 'search') {
      this.state.currentSearch = '';
    }
    this.applyFilters();
  }

  onClearAllFilters(): void {
    this.state = {
      currentFilter: 'all',
      currentSearch: '',
      currentSort: 'default'
    };
    this.applyFilters();
  }

  // Filtering and Sorting
  private applyFilters(): void {
    this.filteredProducts = this.getFilteredProducts();
    this.emitProductsRendered();
  }

  private getFilteredProducts(): Product[] {
    let filtered = this.products.filter(product => {
      const matchesFilter = this.state.currentFilter === 'all' || 
                           product.category === this.state.currentFilter;
      const matchesSearch = !this.state.currentSearch ||
                           product.name.toLowerCase().includes(this.state.currentSearch.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.state.currentSearch.toLowerCase()) ||
                           product.brand.toLowerCase().includes(this.state.currentSearch.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });

    return this.sortProducts(filtered);
  }

  private sortProducts(products: Product[]): Product[] {
    switch (this.state.currentSort) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }

  // Public Methods
  updateProducts(newProducts: Product[]): void {
    this.products = newProducts;
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    this.state.currentFilter = category;
    this.applyFilters();
  }

  searchProducts(query: string): void {
    this.state.currentSearch = query;
    this.applyFilters();
  }

  sortProductsBy(criteria: string): void {
    this.state.currentSort = criteria;
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.state = {
      currentFilter: 'all',
      currentSearch: '',
      currentSort: 'default'
    };
    this.applyFilters();
  }

  getCurrentProducts(): Product[] {
    return this.filteredProducts;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  // Utility Methods
  hasActiveFilters(): boolean {
    return this.state.currentFilter !== 'all' || this.state.currentSearch !== '';
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.state.currentFilter !== 'all') count++;
    if (this.state.currentSearch) count++;
    return count;
  }

  private showNotification(message: string): void {
    // Cette méthode pourrait être améliorée avec un service de notification
    console.log('Notification:', message);
    // Implémentation basique - à remplacer par un vrai service de notifications
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4cc9f0;
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // AJOUT : Méthode pour charger des produits d'exemple
  loadSampleProducts(): void {
    this.products = [
      {
        id: 1,
        name: 'Savon Lavande Bio',
        category: 'cosmetique',
        brand: 'Nature & Soins',
        price: 5.99,
        description: 'Savon naturel à la lavande bio, parfait pour une peau douce et relaxée',
        image: 'https://via.placeholder.com/300x200/9361ee/ffffff?text=Savon+Lavande',
        rating: 4.8,
        reviews: 124,
        badge: 'Bio',
        stock: 25,
        features: ['100% naturel', 'Sans paraben', 'Vegan']
      },
      {
        id: 2,
        name: 'Gel Douche Citron Vert',
        category: 'cosmetique',
        brand: 'Fresh & Clean',
        price: 7.50,
        description: 'Gel douche rafraîchissant au citron vert, réveille vos sens le matin',
        image: 'https://via.placeholder.com/300x200/ffd700/ffffff?text=Gel+Citron',
        rating: 4.5,
        reviews: 89,
        stock: 15,
        features: ['Énergisant', 'Odeur fraîche', 'Bouteille recyclable']
      },
      {
        id: 3,
        name: 'Shampoing Fortifiant',
        category: 'cosmetique',
        brand: 'Hair Care Pro',
        price: 12.99,
        description: 'Shampoing professionnel pour cheveux forts et brillants',
        image: 'https://via.placeholder.com/300x200/8b4513/ffffff?text=Shampoing',
        rating: 4.7,
        reviews: 203,
        badge: 'Best Seller',
        stock: 8,
        features: ['Sans sulfate', 'Keratine', 'Cheveux forts']
      },
      {
        id: 4,
        name: 'Crème Hydratante Visage',
        category: 'cosmetique',
        brand: 'Skin Care',
        price: 15.99,
        description: 'Crème hydratante quotidienne pour une peau éclatante',
        image: 'https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Crème+Visage',
        rating: 4.9,
        reviews: 156,
        badge: 'Nouveau',
        stock: 30,
        features: ['SPF 30', 'Hydratation 24h', 'Peau sensible']
      }
    ];
    this.applyFilters();
  }
}

// Export utility functions
export const ProductUtils = {
  formatPrice(price: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(price);
  },

  calculateAverageRating(products: Product[]): number {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, product) => sum + product.rating, 0);
    return Math.round((total / products.length) * 10) / 10;
  },

  getProductsByBrand(products: Product[], brand: string): Product[] {
    return products.filter(product => product.brand === brand);
  },

  getFeaturedProducts(products: Product[], count: number = 6): Product[] {
    return products
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }
};