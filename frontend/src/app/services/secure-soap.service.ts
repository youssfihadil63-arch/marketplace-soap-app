import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecureSoapService {
  private readonly baseUrl = 'http://localhost:8081/ws/auth';
  private readonly healthUrl = 'http://localhost:8081/health';

  constructor(private http: HttpClient) {
    console.log('SecureSoapService initialisé');
  }

  // === MÉTHODES D'AUTHENTIFICATION ===

  // Méthode pour déconnecter
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.clearCache();
    console.log('✅ Utilisateur déconnecté');
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Méthode pour sauvegarder les données utilisateur
  setUserData(userData: any): void {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  // Méthode pour récupérer les données utilisateur
  getUserData(): any {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  // Méthode d'inscription (simulée pour l'instant)
  registerUser(userData: any): Observable<any> {
    console.log('📝 Tentative d\'inscription:', userData);
    
    // Simulation d'inscription réussie
    const mockResponse = {
      success: true,
      message: 'Utilisateur créé avec succès',
      user: {
        id: Math.floor(Math.random() * 1000),
        username: userData.username,
        email: userData.email,
        created_at: new Date().toISOString()
      }
    };
    
    return of(mockResponse).pipe(delay(1000));
  }

  // Méthode de connexion (simulée pour l'instant)
  login(credentials: any): Observable<any> {
    console.log('🔐 Tentative de connexion:', credentials);
    
    // Simulation de connexion réussie
    const mockResponse = {
      success: true,
      message: 'Connexion réussie',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        username: credentials.username,
        email: 'utilisateur@example.com'
      }
    };
    
    // Sauvegarder le token et les données utilisateur
    localStorage.setItem('auth_token', mockResponse.token);
    this.setUserData(mockResponse.user);
    
    return of(mockResponse).pipe(delay(1000));
  }

  // === MÉTHODES SOAP EXISTANTES ===

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.http.get(this.healthUrl, { 
        observe: 'response' 
      }).toPromise();
      return response?.status === 200;
    } catch (error) {
      console.error('Test connexion échoué:', error);
      return false;
    }
  }

  async authenticate(email: string, password: string): Promise<any> {
    try {
      const soapEnvelope = this.createSOAPEnvelope('authenticate', {
        email: this.sanitizeInput(email),
        password: this.sanitizeInput(password)
      });

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://marketplace.example.com/authenticate'
        },
        body: soapEnvelope
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const xmlResponse = await response.text();
      return this.parseSOAPResponse(xmlResponse, 'authenticate');

    } catch (error) {
      console.error('Erreur authentification:', error);
      throw this.handleError(error, 'Authentification échouée');
    }
  }

  async searchProducts(category?: string, keywords?: string): Promise<any> {
    try {
      const parameters: any = {};
      if (category) parameters.category = this.sanitizeInput(category);
      if (keywords) parameters.keywords = this.sanitizeInput(keywords);

      const soapEnvelope = this.createSOAPEnvelope('searchProducts', parameters);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://marketplace.example.com/searchProducts'
        },
        body: soapEnvelope
      });

      const xmlResponse = await response.text();
      return this.parseSOAPResponse(xmlResponse, 'searchProducts');

    } catch (error) {
      console.error('Erreur recherche produits:', error);
      throw this.handleError(error, 'Recherche échouée');
    }
  }

  // === MÉTHODES DE GESTION DE CACHE ===

  private cache = new Map<string, { data: any, timestamp: number }>();
  private cacheTimeout = 300000; // 5 minutes

  clearCache(): void {
    this.cache.clear();
    console.log('✅ Cache vidé');
  }

  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }

  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setToCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // === MÉTHODES PRIVÉES SOAP ===

  private createSOAPEnvelope(method: string, parameters: any): string {
    let paramsXml = '';
    
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        paramsXml += `<${key}>${parameters[key]}</${key}>`;
      }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                 xmlns:tns="http://marketplace.example.com/">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:${method}>
      ${paramsXml}
    </tns:${method}>
  </soapenv:Body>
</soapenv:Envelope>`;
  }

  private parseSOAPResponse(xmlResponse: string, method: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");

    const fault = xmlDoc.getElementsByTagName('faultstring')[0]?.textContent;
    if (fault) {
      throw new Error(fault);
    }

    if (method === 'authenticate') {
      return {
        userId: xmlDoc.getElementsByTagName('userId')[0]?.textContent || '',
        username: xmlDoc.getElementsByTagName('username')[0]?.textContent || '',
        email: xmlDoc.getElementsByTagName('email')[0]?.textContent || '',
        token: xmlDoc.getElementsByTagName('token')[0]?.textContent || '',
        status: xmlDoc.getElementsByTagName('status')[0]?.textContent || '',
        success: true
      };
    }

    if (method === 'searchProducts') {
      const products = [];
      const productElements = xmlDoc.getElementsByTagName('product');
      
      for (let i = 0; i < productElements.length; i++) {
        const product = productElements[i];
        products.push({
          id: product.getElementsByTagName('id')[0]?.textContent || '',
          name: product.getElementsByTagName('name')[0]?.textContent || '',
          price: parseFloat(product.getElementsByTagName('price')[0]?.textContent || '0'),
          category: product.getElementsByTagName('category')[0]?.textContent || '',
          stock: parseInt(product.getElementsByTagName('stock')[0]?.textContent || '0')
        });
      }

      return {
        products,
        success: true,
        count: products.length
      };
    }

    return { success: true, raw: xmlResponse };
  }

  private sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, '').trim();
  }

  private handleError(error: any, context: string): any {
    return {
      code: 'SERVICE_ERROR',
      message: context,
      details: error.message,
      timestamp: new Date()
    };
  }

  // === MÉTHODES ADDITIONNELLES POUR LE DASHBOARD ===

  // Récupérer les statistiques utilisateur
  getUserStats(): Observable<any> {
    const mockStats = {
      totalOrders: 0,
      productsViewed: 0,
      accountCreated: new Date().toISOString(),
      status: 'active'
    };
    
    return of(mockStats).pipe(delay(500));
  }

  // Récupérer les activités récentes
  getRecentActivities(): Observable<any[]> {
    const mockActivities = [
      {
        icon: '✅',
        text: 'Compte créé avec succès',
        time: 'Aujourd\'hui'
      },
      {
        icon: '🔐',
        text: 'Première connexion',
        time: 'Aujourd\'hui'
      },
      {
        icon: '👋',
        text: 'Bienvenue sur Marketplace SOAP',
        time: 'Aujourd\'hui'
      }
    ];
    
    return of(mockActivities).pipe(delay(300));
  }
}