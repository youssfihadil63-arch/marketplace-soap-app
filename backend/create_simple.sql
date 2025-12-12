DROP TABLE produits CASCADE CONSTRAINTS; 
CREATE TABLE produits ( 
    id NUMBER PRIMARY KEY, 
    nom VARCHAR2(100) NOT NULL, 
    description VARCHAR2(500), 
    prix NUMBER(10,2) NOT NULL, 
    categorie VARCHAR2(50), 
    quantite NUMBER DEFAULT 0 
); 
 
INSERT INTO produits (id,nom,description,prix,categorie,quantite) VALUES (1,'Ordinateur Portable Oracle','PC portable 16Go RAM',899.99,'Informatique',10); 
INSERT INTO produits (id,nom,description,prix,categorie,quantite) VALUES (2,'Smartphone Oracle','Smartphone Android 128Go',499.99,'êlectronique',25); 
INSERT INTO produits (id,nom,description,prix,categorie,quantite) VALUES (3,'Casque Audio Oracle','Casque sans-fil Bluetooth',129.99,'Audio',50); 
 
SELECT * FROM produits; 
COMMIT; 
EXIT; 
