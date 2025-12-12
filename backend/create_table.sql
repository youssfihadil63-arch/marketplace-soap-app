CREATE TABLE produits ( 
    id NUMBER PRIMARY KEY, 
    nom VARCHAR2(100) NOT NULL, 
    description VARCHAR2(500), 
    prix NUMBER(10,2) NOT NULL, 
    categorie VARCHAR2(50), 
    quantite NUMBER DEFAULT 0, 
    image_url VARCHAR2(255), 
    date_creation DATE DEFAULT SYSDATE, 
    date_modification DATE DEFAULT SYSDATE 
); 
 
CREATE SEQUENCE produits_seq START WITH 1 INCREMENT BY 1; 
 
CREATE OR REPLACE TRIGGER produits_bir 
BEFORE INSERT ON produits 
FOR EACH ROW 
BEGIN 
    SELECT produits_seq.NEXTVAL INTO :new.id FROM dual; 
END; 
/ 
 
INSERT INTO produits (nom,description,prix,categorie,quantite) VALUES ('Ordinateur Portable Oracle','PC portable 16Go RAM',899.99,'Informatique',10); 
INSERT INTO produits (nom,description,prix,categorie,quantite) VALUES ('Smartphone Oracle','Smartphone Android 128Go',499.99,'êlectronique',25); 
INSERT INTO produits (nom,description,prix,categorie,quantite) VALUES ('Casque Audio Oracle','Casque sans-fil Bluetooth',129.99,'Audio',50); 
 
SELECT * FROM produits; 
COMMIT; 
EXIT; 
