import { Routes } from '@angular/router'; 
import { ProductsSoapComponent } from './components/products-soap.component'; 
import { LoginSoapComponent } from './components/login-soap.component'; 
import { TestSoapComponent } from './components/test-soap.component'; 
import { RegisterSoapComponent } from './components/register-soap.component'; 
import { DashboardComponent } from './components/dashboard.component'; 
import { CartComponent } from './components/cart.component'; 
import { ProductsComponent } from './components/products/products.component'; 
import { OrderConfirmationComponent } from './components/order-confirmation.component'; 
 
export const routes: Routes = [ 
  { path: '', redirectTo: '/products', pathMatch: 'full' }, 
  { path: 'products', component: ProductsComponent }, 
  { path: 'cart', component: CartComponent }, 
  { path: 'login', component: LoginSoapComponent }, 
  { path: 'register', component: RegisterSoapComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'test', component: TestSoapComponent }, 
  { path: 'soap-products', component: ProductsSoapComponent }, 
  { path: 'order-confirmation', component: OrderConfirmationComponent }, 
  { path: '**', redirectTo: '/products' } 
]; 
