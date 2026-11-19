drop database if exists tellmewhere;

Create database if not exists TELLMEWHERE;

use TELLMEWHERE;

-- SET SQL_SAFE_UPDATES = 0;

CREATE TABLE IF NOT EXISTS USUARIO(
	Id INT unsigned auto_increment primary key,
	Nombre varchar (250) not null,
	Apellidos  varchar (250) not null,
	Contraseña char (60) not null,
	Fecha_nacimiento date,
	Nacionalidad varchar (250) not null,
	Telefono int not null,
	Email varchar (250) NOT NULL,
	Tarjeta_credito varchar (50),
	Puntos varchar (300),
	activo boolean
);

CREATE TABLE IF NOT EXISTS VUELO(
	Id int unsigned auto_increment primary key,
	Dia_salida datetime,
	Dia_llegada datetime,
	Pais varchar (50),
	Origen varchar(150),
	Destino varchar(150),
	Precio float
);

CREATE TABLE IF NOT EXISTS VUELO_SALIDA(
	Id int unsigned auto_increment primary key,
	Id_vuelo int unsigned,
	FOREIGN KEY (Id_vuelo) REFERENCES VUELO(Id)
);

CREATE TABLE IF NOT EXISTS VUELO_LLEGADA(
	Id int unsigned auto_increment primary key,
	Id_vuelo int unsigned,
	FOREIGN KEY (Id_vuelo) REFERENCES VUELO(Id)
);

CREATE TABLE IF NOT EXISTS HOTEL(
	Id int unsigned auto_increment primary key,
	Nombre varchar(100),
	Pais varchar(50),
	Estrellas int,
	Localizacion varchar(250),
	Noches int,
	Numeros_huespedes int,
	Precio float
);

CREATE TABLE IF NOT EXISTS PAQUETE(
	Id int unsigned primary key auto_increment,
    Id_vuelo_salida int unsigned,
    Id_vuelo_llegada int unsigned,
    Id_hotel int unsigned,
	FOREIGN KEY (Id_vuelo_salida) REFERENCES VUELO_SALIDA (Id),
	FOREIGN KEY (Id_vuelo_llegada) REFERENCES VUELO_LLEGADA(Id),
	FOREIGN KEY (Id_hotel) REFERENCES HOTEL(Id),
	Pais varchar(50),
	Continente varchar(50),
	Precio float
);

CREATE TABLE IF NOT EXISTS COMENTARIO(
	Id int unsigned primary key auto_increment,
    Id_usuario int unsigned,
	FOREIGN KEY (Id_usuario) REFERENCES USUARIO(Id),
	Puntuación int unsigned
);

CREATE TABLE IF NOT EXISTS COMPRA(
	Id int unsigned auto_increment primary key,
    Id_paquete int unsigned,
    Id_vuelo_ida int unsigned,
    Id_vuelo_vuelta int unsigned,
    Id_Usuario int unsigned,
    Id_hotel int unsigned,
	FOREIGN KEY (Id_paquete) REFERENCES PAQUETE(Id),
	FOREIGN KEY (Id_vuelo_ida) REFERENCES VUELO(Id),
    FOREIGN KEY (Id_vuelo_vuelta) REFERENCES VUELO(Id),
	FOREIGN KEY (Id_hotel) REFERENCES HOTEL(Id),
	FOREIGN KEY (Id_Usuario) REFERENCES USUARIO(Id)
);

-- Insertar 10 usuarios
INSERT INTO USUARIO (Nombre, Apellidos, Contraseña, Fecha_nacimiento, Nacionalidad, Telefono, Email, Tarjeta_credito, Puntos, activo)
VALUES ('Juan', 'González', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1990-05-15', 'España', 123456789, 'juan@gmail.com', '1234-5678-9012-3456', '100', true),
       ('María', 'Martínez', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1985-09-20', 'España', 987654321, 'maria@gmail.com', '2345-6789-0123-4567', '150', true),
       ('Carlos', 'Rodríguez', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1988-11-10', 'España', 654321987, 'carlos@gmail.com', '3456-7890-1234-5678', '200', true),
       ('Ana', 'López', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1992-03-25', 'España', 321987654, 'ana@gmail.com', '4567-8901-2345-6789', '250', true),
       ('Laura', 'Sánchez', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1995-07-08', 'España', 789456123, 'laura@gmail.com', '5678-9012-3456-7890', '300', true),
       ('Pedro', 'Díaz', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1980-12-12', 'España', 159357246, 'pedro@gmail.com', '6789-0123-4567-8901', '50', true),
       ('Sofía', 'Fernández', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1998-04-30', 'España', 357159246, 'sofia@gmail.com', '7890-1234-5678-9012', '75', true),
       ('Daniel', 'Gómez', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1983-06-18', 'España', 246813579, 'daniel@gmail.com', '8901-2345-6789-0123', '120', true),
       ('Elena', 'Hernández', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1993-09-12', 'España', 123698745, 'elena@gmail.com', '9012-3456-7890-1234', '180', true),
       ('Javier', 'Pérez', '$2a$10$zDTDHWVleJbA30DjxZ59xeXhYbIawz5b2Is7XvZlPAoIly3q2OVDi', '1991-02-28', 'España', 369852147, 'javier@gmail.com', '0123-4567-8901-2345', '220', true);

-- Insertar 10 vuelos
INSERT INTO VUELO (Dia_salida, Dia_llegada, Pais, Origen, Destino, Precio)
VALUES ('2024-05-15 08:00:00', '2024-05-15 12:30:00', 'España', 'Madrid', 'Barcelona', 100.00),
       ('2024-05-16 10:00:00', '2024-05-16 12:00:00', 'Francia', 'Niza', 'Paris', 120.00),
       ('2024-05-17 12:00:00', '2024-05-17 14:30:00', 'Italia', 'Venecia', 'Roma', 130.00),
       ('2024-05-18 08:30:00', '2024-05-18 10:45:00', 'Alemania', 'Berlín', 'Munich', 110.00),
       ('2024-05-19 11:15:00', '2024-05-19 15:45:00', 'Reino Unido', 'Londres', 'Edimburgo', 140.00),
       ('2024-05-20 13:30:00', '2024-05-20 16:45:00', 'Países Bajos', 'Amsterdam', 'Rotterdam', 125.00),
       ('2024-05-21 10:45:00', '2024-05-21 15:00:00', 'Suiza', 'Zurich', 'Ginebra', 135.00),
       ('2024-05-22 09:00:00', '2024-05-22 13:30:00', 'Portugal', 'Lisboa', 'Oporto', 115.00),
       ('2024-05-23 12:45:00', '2024-05-23 16:15:00', 'Grecia', 'Atenas', 'Salónica', 145.00),
       ('2024-05-24 14:00:00', '2024-05-24 17:30:00', 'Turquía', 'Estambul', 'Ankara', 160.00);

-- Insertar 10 vuelos de salida
INSERT INTO VUELO_SALIDA (Id_vuelo)
VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- Insertar 10 vuelos de llegada
INSERT INTO VUELO_LLEGADA (Id_vuelo)
VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- Insertar 10 hoteles
INSERT INTO HOTEL (Nombre, Pais, Estrellas, Localizacion, Noches, Numeros_huespedes, Precio)
VALUES ('Hotel Madrid', 'España', 4, 'Centro de la ciudad', 3, 2, 150.00),
       ('Hotel París', 'Francia', 3, 'Cerca de la Torre Eiffel', 4, 2, 120.00),
       ('Hotel Roma', 'Italia', 5, 'En el corazón de Roma', 5, 2, 180.00),
       ('Hotel Berlín', 'Alemania', 4, 'Centro de la ciudad', 3, 2, 160.00),
       ('Hotel Londres', 'Reino Unido', 5, 'Cerca del Big Ben', 4, 2, 170.00),
       ('Hotel Ámsterdam', 'Países Bajos', 3, 'Junto a los canales', 5, 2, 140.00),
       ('Hotel Zurich', 'Suiza', 4, 'En el centro histórico', 3, 2, 155.00),
       ('Hotel Lisboa', 'Portugal', 3, 'En el Barrio Alto', 4, 2, 130.00),
       ('Hotel Atenas', 'Grecia', 4, 'Cerca de la Acrópolis', 5, 2, 165.00),
       ('Hotel Estambul', 'Turquía', 5, 'Vistas al Bósforo', 3, 2, 175.00);

-- Insertar 10 paquetes
INSERT INTO PAQUETE (Id_vuelo_salida, Id_vuelo_llegada, Id_hotel, Pais, Continente, Precio)
VALUES (1, 1, 1, 'España', 'Europa', 300.00),
       (2, 2, 2, 'Francia', 'Europa', 320.00),
       (3, 3, 3, 'Italia', 'Europa', 350.00),
       (4, 4, 4, 'Alemania', 'Europa', 330.00),
       (5, 5, 5, 'Reino Unido', 'Europa', 340.00),
       (6, 6, 6, 'Países Bajos', 'Europa', 310.00),
       (7, 7, 7, 'Suiza', 'Europa', 325.00),
       (8, 8, 8, 'Portugal', 'Europa', 295.00),
       (9, 9, 9, 'Grecia', 'Europa', 360.00),
       (10, 10, 10, 'Turquía', 'Europa', 370.00);

-- Insertar 10 compras
INSERT INTO COMPRA (Id_paquete, Id_vuelo_ida, Id_vuelo_vuelta, Id_Usuario, Id_hotel)
VALUES (1, 1, 1, 1, 1),
       (2, 2, 2, 2, 2),
       (3, 3, 3, 3, 3),
       (4, 4, 4, 4, 4),
       (5, 5, 5, 5, 5),
       (6, 6, 6, 6, 6),
       (7, 7, 7, 7, 7),
       (8, 8, 8, 8, 8),
       (9, 9, 9, 9, 9),
       (10, 10, 10, 10, 10);
       
-- Insertar 10 comentarios

INSERT INTO COMENTARIO (Id_usuario, Puntuación)
VALUES (6, 4),
       (7, 3),
       (8, 5),
       (9, 2),
       (10, 4),
       (1, 5),
       (2, 4),
       (3, 3),
       (4, 5),
       (5, 2);

