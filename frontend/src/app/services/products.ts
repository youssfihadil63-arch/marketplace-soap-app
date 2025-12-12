import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  brand: string;
  isNew: boolean;
  onSale: boolean;
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    // SMARTPHONES (20 produits)
    {
      id: 1, name: "iPhone 15 Pro Max", category: "Électronique", type: "Smartphone", 
      price: 1299, originalPrice: 1399, description: "Flagship Apple avec titanium", 
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300", 
      stock: 15, rating: 4.8, brand: "Apple", isNew: true, onSale: true,
      features: ["5G", "128GB", "Camera 48MP", "A17 Pro"]
    },
    {
      id: 2, name: "Samsung Galaxy S24 Ultra", category: "Électronique", type: "Smartphone", 
      price: 1199, description: "Avec stylet S-Pen intégré", 
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300", 
      stock: 20, rating: 4.7, brand: "Samsung", isNew: true, onSale: false,
      features: ["5G", "256GB", "Camera 200MP", "Snapdragon 8 Gen 3"]
    },
    {
      id: 3, name: "Google Pixel 8 Pro", category: "Électronique", type: "Smartphone", 
      price: 899, originalPrice: 999, description: "Meilleur appareil photo smartphone", 
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300", 
      stock: 18, rating: 4.6, brand: "Google", isNew: false, onSale: true,
      features: ["5G", "128GB", "Camera 50MP", "Tensor G3"]
    },
    {
      id: 4, name: "OnePlus 12", category: "Électronique", type: "Smartphone", 
      price: 799, description: "Performance pure", 
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300", 
      stock: 25, rating: 4.5, brand: "OnePlus", isNew: true, onSale: false,
      features: ["5G", "256GB", "Snapdragon 8 Gen 3", "Charging 100W"]
    },
    {
      id: 5, name: "Xiaomi 14 Pro", category: "Électronique", type: "Smartphone", 
      price: 899, description: "Innovation technologique", 
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300", 
      stock: 22, rating: 4.4, brand: "Xiaomi", isNew: true, onSale: false,
      features: ["5G", "512GB", "Camera Leica", "Snapdragon 8 Gen 3"]
    },

    // ORDINATEURS (15 produits)
    {
      id: 21, name: "MacBook Pro 16\" M3", category: "Informatique", type: "Laptop", 
      price: 2499, description: "Performance extrême pour pros", 
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300", 
      stock: 8, rating: 4.9, brand: "Apple", isNew: true, onSale: false,
      features: ["M3 Pro", "16GB RAM", "1TB SSD", "32-core GPU"]
    },
    {
      id: 22, name: "Dell XPS 15", category: "Informatique", type: "Laptop", 
      price: 1799, originalPrice: 1999, description: "Écran 4K InfinityEdge", 
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", 
      stock: 12, rating: 4.7, brand: "Dell", isNew: false, onSale: true,
      features: ["Intel i7", "16GB RAM", "1TB SSD", "RTX 4060"]
    },
    {
      id: 23, name: "ASUS ROG Zephyrus", category: "Informatique", type: "Laptop Gaming", 
      price: 2199, description: "Ultra-performant pour gaming", 
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300", 
      stock: 6, rating: 4.8, brand: "ASUS", isNew: true, onSale: false,
      features: ["AMD Ryzen 9", "32GB RAM", "RTX 4080", "240Hz"]
    },

    // AUDIO (10 produits)
    {
      id: 36, name: "Sony WH-1000XM5", category: "Audio", type: "Casque", 
      price: 399, originalPrice: 449, description: "Meilleur antibruit du marché", 
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300", 
      stock: 30, rating: 4.8, brand: "Sony", isNew: false, onSale: true,
      features: ["ANC", "30h batterie", "Touch Control", "Hi-Res"]
    },
    {
      id: 37, name: "AirPods Pro 2", category: "Audio", type: "Écouteurs", 
      price: 279, description: "Audio spatial personnalisé", 
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300", 
      stock: 45, rating: 4.7, brand: "Apple", isNew: true, onSale: false,
      features: ["ANC", "Audio Spatial", "6h batterie", "MagSafe"]
    },

    // PHOTO & VIDÉO (10 produits)
    {
      id: 46, name: "Canon EOS R5", category: "Photo & Vidéo", type: "Appareil Photo", 
      price: 3899, originalPrice: 4299, description: "Mirrorless professionnel", 
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300", 
      stock: 5, rating: 4.9, brand: "Canon", isNew: false, onSale: true,
      features: ["45MP", "8K Video", "IBIS", "Dual Pixel AF"]
    },

    // MAISON CONNECTÉE (10 produits)
    {
      id: 56, name: "Nest Learning Thermostat", category: "Maison Connectée", type: "Thermostat", 
      price: 249, description: "Apprend vos habitudes", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300", 
      stock: 35, rating: 4.6, brand: "Google", isNew: true, onSale: false,
      features: ["Apprentissage", "Contrôle vocal", "Économie énergie"]
    },

    // JEUX VIDÉO (10 produits)
    {
      id: 66, name: "PlayStation 5", category: "Gaming", type: "Console", 
      price: 499, description: "Next-gen gaming", 
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300", 
      stock: 15, rating: 4.8, brand: "Sony", isNew: false, onSale: false,
      features: ["SSD 825GB", "4K 120Hz", "Ray Tracing", "Tempest 3D"]
    },
    {
      id: 67, name: "Xbox Series X", category: "Gaming", type: "Console", 
      price: 499, originalPrice: 549, description: "La plus puissante", 
      image: "https://images.unsplash.com/photo-1621259182978-8e3d0d2df4e5?w=300", 
      stock: 12, rating: 4.7, brand: "Microsoft", isNew: false, onSale: true,
      features: ["12 TFLOPS", "1TB SSD", "4K Gaming", "Game Pass"]
    },

    // Ajoutez 68 autres produits similaires avec différentes catégories...
    // VÉTEMENTS, SPORT, BEAUTÉ, LIVRES, etc.
  ];

  constructor() { 
    console.log('ProductsService initialisé avec', this.products.length, 'produits');
  }

  getProducts(): Product[] {
    return this.products;
  }

  searchProducts(query: string): Product[] {
    if (!query || query.trim() === '') return [];
    const searchTerm = query.toLowerCase().trim();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.type.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  getProductsByType(type: string): Product[] {
    return this.products.filter(product => 
      product.type.toLowerCase() === type.toLowerCase()
    );
  }

  getNewProducts(): Product[] {
    return this.products.filter(product => product.isNew);
  }

  getSaleProducts(): Product[] {
    return this.products.filter(product => product.onSale);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  getTypes(): string[] {
    return [...new Set(this.products.map(product => product.type))];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}