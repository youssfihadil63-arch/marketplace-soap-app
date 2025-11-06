import express from 'express';
import { createServer } from 'http';
import soap from 'soap';
import path from 'path';

const app = express();
const PORT = 8080;

// Middleware de base
app.use(express.json());

// Service SOAP très simple
const serviceObject = {
  AuthService: {
    AuthPort: {
      Login: (args: any, callback: any) => {
        console.log('Login called with:', args);
        callback(null, {
          success: true,
          message: 'Login successful',
          token: 'jwt-token-123',
          user: { id: '1', username: args.username }
        });
      },
      Register: (args: any, callback: any) => {
        console.log('Register called with:', args);
        callback(null, {
          success: true,
          message: 'User created',
          user: { id: '2', username: args.username, email: args.email }
        });
      }
    }
  }
};

// XML WSDL inline (plus simple)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions name="AuthService"
  targetNamespace="http://localhost:8080/ws/auth"
  xmlns="http://schemas.xmlsoap.org/wsdl/"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:tns="http://localhost:8080/ws/auth"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <types>
    <xsd:schema targetNamespace="http://localhost:8080/ws/auth">
      <xsd:element name="LoginRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="username" type="xsd:string"/>
            <xsd:element name="password" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="LoginResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="success" type="xsd:boolean"/>
            <xsd:element name="message" type="xsd:string"/>
            <xsd:element name="token" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>

  <message name="LoginInput">
    <part name="parameters" element="tns:LoginRequest"/>
  </message>
  <message name="LoginOutput">
    <part name="parameters" element="tns:LoginResponse"/>
  </message>

  <portType name="AuthPort">
    <operation name="Login">
      <input message="tns:LoginInput"/>
      <output message="tns:LoginOutput"/>
    </operation>
  </portType>

  <binding name="AuthBinding" type="tns:AuthPort">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="Login">
      <soap:operation soapAction="http://localhost:8080/ws/auth/Login"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>

  <service name="AuthService">
    <port name="AuthPort" binding="tns:AuthBinding">
      <soap:address location="http://localhost:8080/ws/auth"/>
    </port>
  </service>
</definitions>`;

// Créer le serveur HTTP
const server = createServer(app);

// Configurer SOAP avec le WSDL inline
soap.listen(server, '/ws/auth', serviceObject, xml);

// Route santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 SOAP Service: http://localhost:${PORT}/ws/auth?wsdl`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
});