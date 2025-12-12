const express = require('express');
const oracledb = require('oracledb');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.static('public'));

const dbConfig = {
    user: 'marketplace',
    password: 'marketplace123',
    connectString: 'localhost:1521/XE'  // ← Changez ceci
};

app.get('/', (req, res) => {
    res.send('<h1>Marketplace API - Oracle</h1><p><a href="/products">Produits Oracle</a> | <a href="/index.html">Interface</a></p>');
});

app.get('/products', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT id, nom, description, prix, categorie, quantite FROM produits ORDER BY id');
        await connection.close();
        const produits = result.rows.map(row => ({
            id: row[0],
            nom: row[1],
            description: row[2],
            prix: row[3],
            categorie: row[4],
            quantite: row[5]
        }));
        res.json(produits);
    } catch (err) {
        console.error('Erreur Oracle:', err.message);
        res.status(500).json({ error: 'Base de données indisponible', details: err.message });
    }
});

app.get('/health', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute('SELECT 1 FROM dual');
        await connection.close();
        res.json({ status: 'OK', oracle: 'connected', timestamp: new Date().toISOString() });
    } catch (err) {
        res.json({ status: 'ERROR', oracle: 'disconnected', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log('🚀 Serveur Marketplace avec Oracle');
    console.log('📡 URL: http://localhost:' + PORT);
    console.log('🗄️  Base: Oracle XE');
    console.log('📦 Produits: http://localhost:' + PORT + '/products');
    console.log('💻 Interface: http://localhost:' + PORT + '/index.html');
});