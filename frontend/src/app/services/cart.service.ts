import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface pour un article du panier
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

// Interface pour le panier complet
export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Subject pour suivre l'état du panier
  private cartSubject = new BehaviorSubject<Cart>(this.getInitialCart());
  // Observable pour que les composants puissent s'abonner aux changements
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    console.log('🛒 CartService initialisé');
    this.loadCartFromStorage();
  }

  /**
   * Retourne un panier vide initial
   */
  private getInitialCart(): Cart {
    return {
      items: [],
      total: 0,
      itemCount: 0
    };
  }

  /**
   * Charge le panier depuis le localStorage
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('marketplace_cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartSubject.next(cart);
        console.log('📦 Panier chargé depuis le storage:', cart);
      } catch (error) {
        console.error('❌ Erreur lors du chargement du panier:', error);
        this.clearCart();
      }
    }
  }

  /**
   * Sauvegarde le panier dans le localStorage
   */
  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('marketplace_cart', JSON.stringify(cart));
  }

  /**
   * Met à jour le panier avec une fonction de transformation
   */
  private updateCart(updateFn: (cart: Cart) => Cart): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = updateFn(currentCart);
    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
    console.log('🔄 Panier mis à jour:', updatedCart);
  }

  /**
   * Calcule les totaux du panier
   */
  private calculateCartTotals(cart: Cart): Cart {
    cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    console.log(`💰 Totaux calculés: ${cart.itemCount} articles, ${cart.total}€`);
    
    return cart;
  }

  /**
   * Ajoute un produit au panier
   */
  addItem(product: any, quantity: number = 1): void {
    console.log('➕ Ajout au panier:', product.name, 'x', quantity);
    
    this.updateCart(cart => {
      const existingItem = cart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Augmenter la quantité si le produit existe déjà
        existingItem.quantity += quantity;
        console.log(`📊 Quantité mise à jour: ${existingItem.quantity}`);
      } else {
        // Ajouter un nouvel item
        cart.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image,
          description: product.description
        });
        console.log('🎉 Nouveau produit ajouté au panier');
      }
      
      return this.calculateCartTotals(cart);
    });
  }

  /**
   * Ancien nom pour addItem() - pour la compatibilité
   */
  addToCart(product: any): void {
    this.addItem(product, 1);
  }

  /**
   * Modifie la quantité d'un item
   */
  updateQuantity(itemId: number, quantity: number): void {
    console.log(`✏️ Modification quantité item ${itemId}: ${quantity}`);
    
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    this.updateCart(cart => {
      const item = cart.items.find(i => i.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      return this.calculateCartTotals(cart);
    });
  }

  /**
   * Retire un item du panier
   */
  removeItem(itemId: number): void {
    console.log('🗑️ Retrait du panier item:', itemId);
    
    this.updateCart(cart => {
      cart.items = cart.items.filter(item => item.id !== itemId);
      return this.calculateCartTotals(cart);
    });
  }

  /**
   * Vide complètement le panier
   */
  clearCart(): void {
    console.log('🧹 Panier vidé');
    
    this.updateCart(cart => {
      return this.getInitialCart();
    });
  }

  /**
   * Récupère le panier actuel
   */
  getCart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * Vérifie si le panier est vide
   */
  isEmpty(): boolean {
    return this.cartSubject.value.items.length === 0;
  }

  /**
   * Récupère le nombre total d'articles
   */
  getItemCount(): number {
    return this.cartSubject.value.itemCount;
  }

  /**
   * Récupère le total du panier
   */
  getTotal(): number {
    return this.cartSubject.value.total;
  }

  /**
   * Récupère un item spécifique par son ID
   */
  getItem(itemId: number): CartItem | undefined {
    return this.cartSubject.value.items.find(item => item.id === itemId);
  }

  /**
   * Vérifie si un produit est déjà dans le panier
   */
  hasItem(productId: number): boolean {
    return this.cartSubject.value.items.some(item => item.id === productId);
  }

  /**
   * Récupère la quantité d'un produit spécifique
   */
  getItemQuantity(productId: number): number {
    const item = this.getItem(productId);
    return item ? item.quantity : 0;
  }

  // ===========================================================================
  // MÉTHODES DE COMPATIBILITÉ POUR LES ANCIENS COMPOSANTS
  // ===========================================================================

  /**
   * Ancien nom pour getItemCount() - pour la compatibilité
   */
  getTotalItems(): number {
    return this.getItemCount();
  }

  /**
   * Ancien nom pour getTotal() - pour la compatibilité
   */
  getTotalPrice(): number {
    return this.getTotal();
  }

  /**
   * Méthode pour les notifications (simulée)
   */
  requestNotificationPermission(): void {
    console.log('🔔 Permission notification demandée');
    
    // Vérifie si l'API Notification est disponible
    if (!('Notification' in window)) {
      console.log('❌ This browser does not support notifications');
      return;
    }
    
    // Vérifie la permission actuelle
    if (Notification.permission === 'granted') {
      console.log('✅ Notification permission already granted');
      return;
    }
    
    if (Notification.permission === 'denied') {
      console.log('❌ Notification permission denied');
      return;
    }
    
    // Demande la permission
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('🔔 Notification permission:', permission);
        
        if (permission === 'granted') {
          // Crée une notification de test
          this.showNotification('Marketplace SOAP', 'Notifications activées avec succès !');
        }
      });
    }
  }

  /**
   * Affiche une notification
   */
  private showNotification(title: string, body: string): void {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/assets/logo.png', // Remplacez par le chemin de votre logo
        badge: '/assets/badge.png'
      });
    }
  }

  /**
   * Notifie l'ajout d'un produit au panier
   */
  notifyProductAdded(productName: string): void {
    if (Notification.permission === 'granted') {
      this.showNotification(
        'Produit ajouté au panier 🛒',
        `${productName} a été ajouté à votre panier !`
      );
    }
  }

  // ===========================================================================
  // MÉTHODES UTILITAIRES SUPPLÉMENTAIRES
  // ===========================================================================

  /**
   * Applique une réduction au panier
   */
  applyDiscount(discountPercent: number): number {
    const currentTotal = this.getTotal();
    const discountAmount = currentTotal * (discountPercent / 100);
    const newTotal = currentTotal - discountAmount;
    
    console.log(`🎁 Réduction appliquée: ${discountPercent}% (-${discountAmount.toFixed(2)}€)`);
    
    return newTotal;
  }

  /**
   * Exporte le panier en format JSON
   */
  exportCart(): string {
    return JSON.stringify(this.getCart(), null, 2);
  }

  /**
   * Importe un panier depuis du JSON
   */
  importCart(jsonData: string): boolean {
    try {
      const cartData = JSON.parse(jsonData);
      
      // Validation basique des données
      if (cartData && Array.isArray(cartData.items)) {
        this.cartSubject.next(cartData);
        this.saveCartToStorage(cartData);
        console.log('📥 Panier importé avec succès');
        return true;
      }
      
      console.error('❌ Format de panier invalide');
      return false;
    } catch (error) {
      console.error('❌ Erreur lors de l\'import du panier:', error);
      return false;
    }
  }

  /**
   * Récupère les statistiques du panier
   */
  getCartStats(): { totalItems: number, totalValue: number, averagePrice: number } {
    const cart = this.getCart();
    const totalItems = cart.itemCount;
    const totalValue = cart.total;
    const averagePrice = totalItems > 0 ? totalValue / totalItems : 0;
    
    return {
      totalItems,
      totalValue,
      averagePrice: Number(averagePrice.toFixed(2))
    };
  }

  /**
   * Vérifie si le panier dépasse un certain montant
   */
  exceedsAmount(amount: number): boolean {
    return this.getTotal() > amount;
  }

  /**
   * Récupère les produits les plus chers du panier
   */
  getMostExpensiveItems(limit: number = 3): CartItem[] {
    return this.getCart().items
      .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
      .slice(0, limit);
  }
}