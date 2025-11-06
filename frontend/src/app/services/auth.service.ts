import { Injectable } from '@angular/core';
import { SoapService } from './soap.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private soapService: SoapService) { }

  async login(username: string, password: string): Promise<any> {
    return await this.soapService.callSOAPService('Login', {
      username: username,
      password: password
    });
  }

  async register(username: string, password: string, email: string): Promise<any> {
    return await this.soapService.callSOAPService('Register', {
      username: username,
      password: password,
      email: email
    });
  }
}