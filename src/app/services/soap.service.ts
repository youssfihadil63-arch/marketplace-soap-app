import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Interfaces
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
  success: boolean;
}

export interface ProductsResponse {
  products: any[];
  success: boolean;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecureSoapService {
  private baseUrl = 'http://localhost:8081';
  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTimeout = 300000; // 5 minutes

  constructor(private http: HttpClient) {}

  // Méthode pour vérifier la santé du service
  checkHealth(): Observable<HealthResponse> {
    const url = `${this.baseUrl}/health`;
    
    return this.http.get<HealthResponse>(url, {
      headers: this.getSecurityHeaders()
    }).pipe(
      catchError(error => {
        console.error('Health check error:', error);
        return of({
          status: 'error',
          service: 'SOAP Service',
          timestamp: new Date().toISOString(),
          success: false
        });
      })
    );
  }

  // Méthode d'authentification
  authenticateUser(username: string, password: string): Observable<AuthResponse> {
    const cacheKey = `auth_${username}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return of(cached.data);
    }

    // Pour l'instant, retournez une réponse simulée
    const mockResponse: AuthResponse = {
      success: true,
      message: 'Authentication successful',
      token: 'mock-jwt-token-' + Date.now()
    };

    this.cache.set(cacheKey, { data: mockResponse, timestamp: Date.now() });
    return of(mockResponse);
  }

  // Méthode pour récupérer les produits
  getProducts(): Observable<ProductsResponse> {
    const cacheKey = 'products';
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return of(cached.data);
    }

    // Pour l'instant, retournez des produits simulés
    const mockProducts: ProductsResponse = {
      products: [
        { id: 1, name: 'Product 1', price: 29.99, description: 'Description 1' },
        { id: 2, name: 'Product 2', price: 39.99, description: 'Description 2' },
        { id: 3, name: 'Product 3', price: 49.99, description: 'Description 3' }
      ],
      success: true,
      count: 3
    };

    this.cache.set(cacheKey, { data: mockProducts, timestamp: Date.now() });
    return of(mockProducts);
  }

  // Méthodes de parsing (ajoutez celles qui manquent)
  private parseOrderResponse(xmlDoc: Document): any {
    const success = xmlDoc.getElementsByTagName('success')[0]?.textContent === 'true';
    const message = xmlDoc.getElementsByTagName('message')[0]?.textContent || '';
    
    return { success, message };
  }

  private parseHealthResponse(xmlDoc: Document): HealthResponse {
    const status = xmlDoc.getElementsByTagName('status')[0]?.textContent || 'unknown';
    const service = xmlDoc.getElementsByTagName('service')[0]?.textContent || 'unknown';
    const timestamp = xmlDoc.getElementsByTagName('timestamp')[0]?.textContent || new Date().toISOString();
    const success = xmlDoc.getElementsByTagName('success')[0]?.textContent === 'true';
    
    return { status, service, timestamp, success };
  }

  private parseGenericResponse(xmlDoc: Document): any {
    const success = xmlDoc.getElementsByTagName('success')[0]?.textContent === 'true';
    const message = xmlDoc.getElementsByTagName('message')[0]?.textContent || '';
    
    return { success, message };
  }

  // Méthode pour parser les réponses produits
  private parseProductsResponse(xmlDoc: Document): ProductsResponse {
    const success = xmlDoc.getElementsByTagName('success')[0]?.textContent === 'true';
    const count = parseInt(xmlDoc.getElementsByTagName('count')[0]?.textContent || '0');
    
    const products: Product[] = [];
    const productElements = xmlDoc.getElementsByTagName('product');
    
    for (let i = 0; i < productElements.length; i++) {
      const product = productElements[i];
      products.push({
        id: parseInt(product.getElementsByTagName('id')[0]?.textContent || '0'),
        name: product.getElementsByTagName('name')[0]?.textContent || '',
        price: parseFloat(product.getElementsByTagName('price')[0]?.textContent || '0'),
        description: product.getElementsByTagName('description')[0]?.textContent || ''
      });
    }
    
    return { products, success, count };
  }

  // Méthode générique pour appeler les services SOAP
  private callSoapService<T>(soapAction: string, soapBody: string, responseParser: (xmlDoc: Document) => T): Observable<T> {
    const headers = this.getSecurityHeaders();
    const soapEnvelope = this.buildSoapEnvelope(soapBody);
    
    return this.http.post(`${this.baseUrl}/ws/auth`, soapEnvelope, {
      headers: {
        ...headers,
        'SOAPAction': soapAction,
        'Content-Type': 'text/xml; charset=utf-8'
      },
      responseType: 'text'
    }).pipe(
      map(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response as string, 'text/xml');
        return responseParser(xmlDoc);
      }),
      catchError(error => {
        console.error('SOAP Service error:', error);
        throw this.handleSoapError(error);
      })
    );
  }

  // Construction de l'enveloppe SOAP
  private buildSoapEnvelope(body: string): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    ${body}
  </soap:Body>
</soap:Envelope>`;
  }

  // Headers de sécurité
  private getSecurityHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    const headers: Record<string, string> = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Gestion des erreurs SOAP
  private handleSoapError(error: any): any {
    if (error.status === 0) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Impossible de se connecter au serveur SOAP',
        details: 'Vérifiez que le serveur backend est démarré'
      };
    }
    
    return {
      code: `SOAP_${error.status || 'UNKNOWN'}`,
      message: 'Erreur du service SOAP',
      details: error.message || 'Erreur inconnue'
    };
  }

  // Nettoyage du cache
  clearCache(): void {
    this.cache.clear();
  }

  // Nettoyage d'une entrée spécifique du cache
  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }
}