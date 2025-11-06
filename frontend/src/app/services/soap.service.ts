import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private baseUrl = 'http://localhost:8080/ws/auth';

  constructor() { }

  // Méthode pour appeler les services SOAP
  async callSOAPService(method: string, parameters: any): Promise<any> {
    const soapEnvelope = this.createSOAPEnvelope(method, parameters);
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'SOAPAction': `http://localhost:8080/ws/auth/${method}`
        },
        body: soapEnvelope
      });
      
      const xmlResponse = await response.text();
      return this.parseSOAPResponse(xmlResponse);
    } catch (error) {
      console.error('SOAP Error:', error);
      throw error;
    }
  }

  private createSOAPEnvelope(method: string, parameters: any): string {
    let paramsXml = '';
    
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        paramsXml += `<${key}>${parameters[key]}</${key}>`;
      }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                 xmlns:tns="http://localhost:8080/ws/auth">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:${method}>
      ${paramsXml}
    </tns:${method}>
  </soapenv:Body>
</soapenv:Envelope>`;
  }

  private parseSOAPResponse(xmlResponse: string): any {
    // Extraction simplifiée de la réponse SOAP
    const successMatch = xmlResponse.match(/<success>(.*?)<\/success>/);
    const messageMatch = xmlResponse.match(/<message>(.*?)<\/message>/);
    
    if (successMatch && messageMatch) {
      return {
        success: successMatch[1] === 'true',
        message: messageMatch[1]
      };
    }
    return { success: false, message: 'Parse error' };
  }
}