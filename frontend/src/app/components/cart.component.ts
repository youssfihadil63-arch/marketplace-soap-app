import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartItemCount = 0;
  isCartEmpty = true;
  
  // Gestion des codes promo
  promoCode = '';
  discount = 0;
  finalTotal = 0;
  promoMessage = '';
  promoMessageClass = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart.items;
      this.cartTotal = cart.total;
      this.cartItemCount = cart.itemCount;
      this.isCartEmpty = cart.items.length === 0;
      this.calculateFinalTotal();
    });
  }

  // Gestion des quantités
  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  clearCart() {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.cartService.clearCart();
    }
  }

  // Codes promo
  applyPromoCode() {
    const code = this.promoCode.trim().toUpperCase();
    
    if (!code) {
      this.promoMessage = 'Veuillez entrer un code promo';
      this.promoMessageClass = 'promo-error';
      return;
    }

    // Codes promo simulés
    const validCodes: { [key: string]: number } = {
      'WELCOME10': 10,
      'SOLDE20': 20,
      'ETE2024': 15,
      'SOAP15': 15
    };

    if (validCodes[code]) {
      this.discount = this.cartTotal * (validCodes[code] / 100);
      this.calculateFinalTotal();
      this.promoMessage = `✅ Code appliqué ! ${validCodes[code]}% de réduction (-${this.discount.toFixed(2)}€)`;
      this.promoMessageClass = 'promo-success';
    } else {
      this.discount = 0;
      this.calculateFinalTotal();
      this.promoMessage = '❌ Code promo invalide';
      this.promoMessageClass = 'promo-error';
    }

    // Effacer le message après 5 secondes
    setTimeout(() => {
      this.promoMessage = '';
    }, 5000);
  }

  calculateFinalTotal() {
    this.finalTotal = Math.max(0, this.cartTotal - this.discount);
  }

  // Navigation
  proceedToCheckout() {
    if (this.isCartEmpty) {
      alert('Votre panier est vide !');
      return;
    }
    
    if (confirm(`Confirmer la commande de ${this.cartItemCount} articles pour ${this.finalTotal}€ ?`)) {
      // Simulation de commande
      alert('✅ Commande validée ! Redirection vers la page de confirmation...');
      
      // Ici vous intégrerez le service SOAP de commande
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation']);
      }, 2000);
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  // Sauvegarde du panier
  saveCart() {
    const cartData = this.cartService.exportCart();
    const blob = new Blob([cartData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `panier-marketplace-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showNotification('📥 Panier sauvegardé !');
  }

  // Notification
  private showNotification(message: string) {
    // Implémentation simple de notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  // Statistiques supplémentaires
  getAverageItemPrice(): number {
    return this.cartItemCount > 0 ? this.cartTotal / this.cartItemCount : 0;
  }

  getMostExpensiveItem(): CartItem | null {
    return this.cartItems.length > 0 
      ? this.cartItems.reduce((prev, current) => 
          (prev.price * prev.quantity) > (current.price * current.quantity) ? prev : current)
      : null;
  }
}