// products.ts - Données des produits pour l'application Angular

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
  isFeatured?: boolean;
}

// Données des produits
export const PRODUCTS_DATA: Product[] = [
  // 📱 SMARTPHONES
  { 
    id: 1, 
    name: "iPhone 15 Pro", 
    category: "smartphones", 
    brand: "Apple",
    price: 1229, 
    description: "Écran 6.1\", Titanium, 128GB, triple caméra 48MP", 
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 342,
    badge: "Nouveau",
    stock: 15,
    isFeatured: true,
    features: ["Titanium", "iOS 17", "USB-C", "5G"]
  },
  { 
    id: 2, 
    name: "Samsung Galaxy S24 Ultra", 
    category: "smartphones", 
    brand: "Samsung",
    price: 1349, 
    description: "Écran 6.8\" Dynamic AMOLED, S Pen, 256GB", 
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 287,
    stock: 8,
    isFeatured: true,
    features: ["S Pen", "Android 14", "Snapdragon 8 Gen 3"]
  },
  { 
    id: 3, 
    name: "Google Pixel 8 Pro", 
    category: "smartphones", 
    brand: "Google",
    price: 999, 
    description: "Écran 6.7\", Google Tensor G3, Appel vidéo 4K", 
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 156,
    features: ["Tensor G3", "Android 14", "Assistant Google"]
  },
  { 
    id: 4, 
    name: "OnePlus 12", 
    category: "smartphones", 
    brand: "OnePlus",
    price: 849, 
    description: "Écran 6.82\" LTPO, Snapdragon 8 Gen 3, 256GB", 
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 203,
    features: ["OxygenOS", "Charge rapide 100W", "Hasselblad"]
  },

  // 🎧 AUDIO
  { 
    id: 5, 
    name: "Sony WH-1000XM5", 
    category: "audio", 
    brand: "Sony",
    price: 399, 
    description: "Casque antibruit, autonomie 30h, son HD", 
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 432,
    badge: "Top Vente",
    isFeatured: true,
    features: ["ANC", "30h autonomie", "Touch controls"]
  },
  { 
    id: 6, 
    name: "AirPods Pro 2", 
    category: "audio", 
    brand: "Apple",
    price: 279, 
    description: "Réduction de bruit active, autonomie 6h", 
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 389,
    features: ["Spatial Audio", "MagSafe", "Adaptive EQ"]
  },
  { 
    id: 7, 
    name: "Bose QuietComfort Ultra", 
    category: "audio", 
    brand: "Bose",
    price: 429, 
    description: "Audio immersif, réduction de bruit adaptative", 
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 267,
    features: ["Bose Immersive Audio", "24h autonomie"]
  },

  // 💻 INFORMATIQUE
  { 
    id: 8, 
    name: "MacBook Pro 16\" M3 Max", 
    category: "informatique", 
    brand: "Apple",
    price: 3799, 
    description: "Chip M3 Max, 48GB RAM, 1TB SSD, écran Liquid Retina XDR", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 187,
    badge: "Populaire",
    isFeatured: true,
    features: ["M3 Max", "Liquid Retina XDR", "macOS"]
  },
  { 
    id: 9, 
    name: "Dell XPS 15", 
    category: "informatique", 
    brand: "Dell",
    price: 2299, 
    description: "Intel Core i9, 32GB RAM, RTX 4070, écran 3.5K OLED", 
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 243,
    features: ["Intel i9", "RTX 4070", "OLED 3.5K"]
  },

  // ⌚ MONTRES CONNECTÉES
  { 
    id: 10, 
    name: "Apple Watch Series 9", 
    category: "montres", 
    brand: "Apple",
    price: 429, 
    description: "Écran Retina, GPS, moniteur cardiaque, S9 SiP", 
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 567,
    badge: "Nouveau",
    isFeatured: true,
    features: ["watchOS 10", "ECG", "Double Tap"]
  },
  { 
    id: 11, 
    name: "Samsung Galaxy Watch6 Classic", 
    category: "montres", 
    brand: "Samsung",
    price: 389, 
    description: "Bezel rotatif, écran Sapphire, suivi santé avancé", 
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 432,
    features: ["Wear OS", "Bezel rotatif", "BioActive Sensor"]
  },

  // 🎮 GAMING
  { 
    id: 12, 
    name: "PlayStation 5", 
    category: "gaming", 
    brand: "Sony",
    price: 499, 
    description: "Console next-gen, SSD ultra-rapide, 4K 120fps", 
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 876,
    badge: "Populaire",
    isFeatured: true,
    features: ["SSD 825GB", "4K 120fps", "DualSense"]
  },
  { 
    id: 13, 
    name: "Xbox Series X", 
    category: "gaming", 
    brand: "Microsoft",
    price: 499, 
    description: "12 Teraflops, Quick Resume, rétrocompatibilité", 
    image: "https://images.unsplash.com/photo-1621259182978-fbf83296f9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 654,
    features: ["12 TFLOPS", "Quick Resume", "Game Pass"]
  },

  // 📷 PHOTO
  { 
    id: 14, 
    name: "Canon EOS R5", 
    category: "photo", 
    brand: "Canon",
    price: 3899, 
    description: "45MP, vidéo 8K, stabilisation 8 stops, double pixel AF", 
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 287,
    badge: "Pro",
    features: ["45MP", "8K video", "IBIS 8 stops"]
  },
  { 
    id: 15, 
    name: "Sony A7 IV", 
    category: "photo", 
    brand: "Sony",
    price: 2499, 
    description: "33MP, vidéo 4K 60p, AF réel temps, stabilisation 5.5 stops", 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 354,
    features: ["33MP", "4K 60p", "Real-time AF"]
  },

  // 🏠 MAISON CONNECTÉE
  { 
    id: 16, 
    name: "Google Nest Hub Max", 
    category: "maison", 
    brand: "Google",
    price: 229, 
    description: "Écran 10\", assistant Google, caméra de surveillance", 
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 432,
    features: ["Google Assistant", "Camera", "10\" screen"]
  },
  { 
    id: 17, 
    name: "Philips Hue Starter Kit", 
    category: "maison", 
    brand: "Philips",
    price: 199, 
    description: "3 ampoules couleur, bridge, contrôle vocal et app", 
    image: "https://images.unsplash.com/photo-1513500043951-671f76e50770?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 654,
    features: ["3 bulbs", "Bridge", "16M colors"]
  }
];

// Catégories disponibles
export const CATEGORIES = [
  { id: 'all', name: 'Tous les produits', icon: '📦', emoji: '📦' },
  { id: 'smartphones', name: 'Smartphones', icon: '📱', emoji: '📱' },
  { id: 'audio', name: 'Audio', icon: '🎧', emoji: '🎧' },
  { id: 'informatique', name: 'Informatique', icon: '💻', emoji: '💻' },
  { id: 'montres', name: 'Montres Connectées', icon: '⌚', emoji: '⌚' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', emoji: '🎮' },
  { id: 'photo', name: 'Photo', icon: '📷', emoji: '📷' },
  { id: 'maison', name: 'Maison Connectée', icon: '🏠', emoji: '🏠' }
];

// Marques disponibles
export const BRANDS = [
  'Apple', 'Samsung', 'Sony', 'Google', 'OnePlus', 'Bose', 
  'Dell', 'Canon', 'Microsoft', 'Philips'
];

// Utilitaires pour les produits
export class ProductUtils {
  
  // Formater le prix
  static formatPrice(price: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(price);
  }

  // Calculer la note moyenne
  static calculateAverageRating(products: Product[]): number {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, product) => sum + product.rating, 0);
    return Math.round((total / products.length) * 10) / 10;
  }

  // Obtenir les produits par marque
  static getProductsByBrand(products: Product[], brand: string): Product[] {
    return products.filter(product => product.brand === brand);
  }

  // Obtenir les produits vedettes
  static getFeaturedProducts(products: Product[], count: number = 6): Product[] {
    return products
      .filter(product => product.isFeatured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }

  // Obtenir les produits par catégorie
  static getProductsByCategory(products: Product[], category: string): Product[] {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  }

  // Filtrer les produits par prix
  static filterByPriceRange(products: Product[], min: number, max: number): Product[] {
    return products.filter(product => product.price >= min && product.price <= max);
  }

  // Rechercher des produits
  static searchProducts(products: Product[], query: string): Product[] {
    if (!query.trim()) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Trier les produits
  static sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'reviews':
        return sorted.sort((a, b) => b.reviews - a.reviews);
      default:
        return sorted;
    }
  }

  // Obtenir l'emoji de catégorie
  static getCategoryEmoji(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'smartphones': '📱',
      'audio': '🎧',
      'informatique': '💻',
      'montres': '⌚',
      'gaming': '🎮',
      'photo': '📷',
      'maison': '🏠'
    };
    return categoryMap[category] || '📦';
  }

  // Générer le HTML des étoiles
  static generateStarRating(rating: number): string {
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

  // Obtenir les statistiques des produits
  static getProductsStats(products: Product[]) {
    const totalProducts = products.length;
    const averageRating = this.calculateAverageRating(products);
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const categories = [...new Set(products.map(p => p.category))];
    
    return {
      totalProducts,
      averageRating,
      totalValue,
      categoriesCount: categories.length,
      brandsCount: [...new Set(products.map(p => p.brand))].length
    };
  }
}

// Types de tri disponibles
export const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Meilleures notes' },
  { value: 'name', label: 'Nom A-Z' },
  { value: 'reviews', label: 'Plus d\'avis' }
];

// Export par défaut
export default PRODUCTS_DATA;