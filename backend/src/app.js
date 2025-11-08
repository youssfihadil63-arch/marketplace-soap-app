const express = require('express');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const PORT = 8081;

app.use(express.json());

// Service SOAP simple
const serviceObject = {
  AuthService: {
    AuthPort: {
      Login: (args, callback) => {
        console.log('Login called with:', args);
        callback(null, {
          success: true,
          message: 'Login successful',
          token: 'jwt-token-123',
          user: { id: '1', username: args.username }
        });
      },
      Register: (args, callback) => {
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

// Route santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Servir le WSDL - CORRIGÉ : pas de ? dans le chemin
app.get('/wsdl/auth', (req, res) => {
  res.setHeader('Content-Type', 'text/xml');
  res.send(`
    <definitions name="AuthService"
      targetNamespace="http://localhost:8080/ws/auth"
      xmlns="http://schemas.xmlsoap.org/wsdl/"
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
      xmlns:tns="http://localhost:8080/ws/auth">
      <service name="AuthService">
        <port name="AuthPort" binding="tns:AuthBinding">
          <soap:address location="http://localhost:8080/ws/auth"/>
        </port>
      </service>
    </definitions>
  `);
});

// Endpoint SOAP
app.post('/ws/auth', (req, res) => {
  console.log('SOAP request received');
  res.setHeader('Content-Type', 'text/xml');
  res.send(`
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <LoginResponse>
          <success>true</success>
          <message>Request processed</message>
        </LoginResponse>
      </soap:Body>
    </soap:Envelope>
  `);
});

// Route pour servir WSDL avec paramètre query
app.get('/ws/auth', (req, res) => {
  if (req.query.wsdl) {
    res.setHeader('Content-Type', 'text/xml');
    res.send(`
      <definitions name="AuthService"
        targetNamespace="http://localhost:8080/ws/auth"
        xmlns="http://schemas.xmlsoap.org/wsdl/"
        xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
        xmlns:tns="http://localhost:8081/ws/auth">
        <service name="AuthService">
          <port name="AuthPort" binding="tns:AuthBinding">
            <soap:address location="http://localhost:8080/ws/auth"/>
          </port>
        </service>
      </definitions>
    `);
  } else {
    res.json({ message: 'SOAP endpoint - use ?wsdl for WSDL' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 SOAP Service: http://localhost:${PORT}/ws/auth?wsdl`);
  console.log(`📄 WSDL: http://localhost:${PORT}/wsdl/auth`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
});