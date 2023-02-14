CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('consumer', 'advertiser') NOT NULL,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255),
  email VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS advertisements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  advertiser_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (advertiser_id) REFERENCES clients(id)
);
CREATE TABLE IF NOT EXISTS search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consumer_id INT NOT NULL,
  search_term VARCHAR(255) NOT NULL,
  FOREIGN KEY (consumer_id) REFERENCES clients(id)
);
CREATE TABLE IF NOT EXISTS ad_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consumer_id INT NOT NULL,
  advertisement_id INT NOT NULL,
  FOREIGN KEY (consumer_id) REFERENCES clients(id),
  FOREIGN KEY (advertisement_id) REFERENCES advertisements(id)
);

INSERT INTO clients (type, name, surname, email) VALUES ('consumer', 'Orlando', 'Barahona', 'obar@ahona.com');
INSERT INTO clients (type, name, surname, email) VALUES ('consumer', 'Manuel', 'Loper', 'man@uelgomez.com');
INSERT INTO clients (type, name, surname, email) VALUES ('consumer', 'Fulano', 'Detal', 'fula@no.com');
INSERT INTO clients (type, name, surname, email) VALUES ('consumer', 'Mengano', 'Barahona', 'megano@bar.com');
INSERT INTO clients (type, name, surname, email) VALUES ('advertiser', 'Coca-Cola', '', 'coca@cola.com');
INSERT INTO clients (type, name, surname, email) VALUES ('advertiser', 'HP', '', 'hp@yahoo.com');
INSERT INTO clients (type, name, surname, email) VALUES ('advertiser', 'Mextaco', '', 'mextaco@hn.com');
INSERT INTO clients (type, name, surname, email) VALUES ('advertiser', 'Samsung', '', 'samsung@gmail.com');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (5, 'El mejor refresco', 'Prueba el mejor refresco del mundo');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (5, 'Sin azúcar', 'Con la nueva coca-cola zero, no te preocupes por morir de diabetes');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (5, 'Nueva presentación', 'Con el nuevo envase, tus tragos serán mejores');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (6, 'Mejor gama', 'Las nuevas laptops de HP te traen las mejores características');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (6, 'Precios bajos', 'Los precios más bajos del mercado');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (6, 'Alta calidad', 'Aprovecha la alta calidad que tienen nuestros componentes');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (7, 'TACOOOOS', 'Con este nuevo restaurante, te chuparás los dedos cada vez que vengas');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (7, '¿Chilito?', 'Si te gusta lo picante, Mextaco es la mejor opción');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (7, 'Pozole', 'Prueba nuestro excelente pozole con el mejor maíz');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (8, 'Precio-Calidad', 'Celulares de alta gama. Buenos, bonitos y baratos');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (8, 'Samsung S28+', 'El nuevo Samsung S28+ trae las mejores aplicaciones');
INSERT INTO advertisements (advertiser_id, title, description) VALUES (8, 'eSim', 'Todos los celulares traen sim electrónico disponible');