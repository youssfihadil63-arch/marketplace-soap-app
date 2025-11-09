import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
 
@Component({ 
  selector: 'app-order-confirmation', 
  standalone: true, 
  imports: [CommonModule], 
  template: ` 
    <div class="confirmation-container"> 
      <div class="confirmation-card"> 
        <div class="success-icon">?</div> 
        <h1>Commande Confirm‚e !</h1> 
        <p class="confirmation-message"> 
          Votre commande a ‚t‚ trait‚e avec succŠs. Vous recevrez un email de confirmation sous peu. 
        </p> 
 
        <div class="order-details"> 
          <div class="detail-item"> 
            <span class="label">Num‚ro de commande:</span> 
            <span class="value">CMD-{{ orderNumber }}</span> 
          </div> 
          <div class="detail-item"> 
            <span class="label">Date:</span> 
            <span class="value">{{ orderDate }}</span> 
          </div> 
          <div class="detail-item"> 
            <span class="label">Statut:</span> 
            <span class="value status-confirmed">Confirm‚e</span> 
          </div> 
        </div> 
 
        <div class="confirmation-actions"> 
          <button (click)="continueShopping()" class="btn-continue"> 
            ?? Continuer mes achats 
          </button> 
          <button (click)="viewOrders()" class="btn-orders"> 
            ?? Voir mes commandes 
          </button> 
        </div> 
      </div> 
    </div> 
  `, 
  styles: [` 
    .confirmation-container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 2rem; 
      min-height: calc(100vh - 200px); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
    } 
 
    .confirmation-card { 
      background: white; 
      padding: 3rem; 
      border-radius: 20px; 
      box-shadow: 0 20px 60px rgba(0,0,0,0.1); 
      text-align: center; 
      width: 100%; 
    } 
 
    .success-icon { 
      font-size: 4rem; 
      margin-bottom: 1.5rem; 
    } 
 
    h1 { 
      color: #2b2d42; 
      margin-bottom: 1rem; 
      font-size: 2.2rem; 
    } 
 
    .confirmation-message { 
      color: #6c757d; 
      font-size: 1.1rem; 
      line-height: 1.6; 
      margin-bottom: 2rem; 
    } 
 
    .order-details { 
      background: #f8f9fa; 
      padding: 1.5rem; 
      border-radius: 12px; 
      margin-bottom: 2rem; 
      text-align: left; 
    } 
 
    .detail-item { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: 0.75rem; 
      padding-bottom: 0.75rem; 
      border-bottom: 1px solid #e9ecef; 
    } 
 
    .detail-item:last-child { 
      margin-bottom: 0; 
      padding-bottom: 0; 
      border-bottom: none; 
    } 
 
    .label { 
      color: #6c757d; 
      font-weight: 500; 
    } 
 
    .value { 
      color: #2b2d42; 
      font-weight: 600; 
    } 
 
    .status-confirmed { 
      color: #28a745; 
    } 
 
    .confirmation-actions { 
      display: flex; 
      gap: 1rem; 
      justify-content: center; 
    } 
 
    .btn-continue, .btn-orders { 
      padding: 1rem 2rem; 
      border: none; 
      border-radius: 8px; 
      cursor: pointer; 
      font-weight: 600; 
      transition: all 0.3s ease; 
    } 
 
    .btn-continue { 
      background: linear-gradient(135deg, #4361ee, #3a0ca3); 
      color: white; 
    } 
 
    .btn-orders { 
      background: #6c757d; 
      color: white; 
    } 
 
    .btn-continue:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 6px 20px rgba(67, 97, 238, 0.3); 
    } 
 
    .btn-orders:hover { 
      background: #5a6268; 
    } 
 
    @media (max-width: 768px) { 
      .confirmation-container { 
        padding: 1rem; 
      } 
 
      .confirmation-card { 
        padding: 2rem; 
      } 
 
      .confirmation-actions { 
        flex-direction: column; 
      } 
    } 
  `] 
}) 
export class OrderConfirmationComponent { 
  orderNumber: string; 
  orderDate: string; 
 
  constructor(private router: Router) { 
    // G‚n‚rer un num‚ro de commande al‚atoire 
    this.orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase(); 
    this.orderDate = new Date().toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }); 
  } 
 
  continueShopping() { 
    this.router.navigate(['/products']); 
  } 
 
  viewOrders() { 
    // Rediriger vers la page des commandes (… impl‚menter) 
    this.router.navigate(['/dashboard']); 
  } 
} 
