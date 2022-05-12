USE f1;

SET default_storage_engine=InnoDb;

CREATE TABLE pilote
(
    id int auto_increment primary key,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    dateNaissance DATE,
    ordre int,
    idPays char(2) NOT NULL,
    idEcurie int NOT NULL,
    FOREIGN KEY (idPays) REFERENCES pays (id),
    FOREIGN KEY (idEcurie) REFERENCES ecurie (id)
);
INSERT INTO pilote (id,nom,prenom,dateNaissance,ordre,idPays,idEcurie)
VALUES (1,'Verstappen','Max','1997-09-30',1,'nl',3),
       (77,'Bottas','Valtteri','1989-08-28',1,'fi',8),
       (63,'Russel','George','1998-02-15',2,'gb',1),
       (55,'Sainz','Carlos','1994-09-01',2,'es',2),
       (44,'Hamilton','Lewis','1985-01-07',1,'gb',1),
       (47,'Schumacher','Mick','1999-03-22',1,'de',9),
       (31,'Ocon','Esteban','1996-09-17',1,'fr',5),
       (24,'Zhou','Guanyu','1999-05-30',2,'cn',8),
       (23,'Albon','Alexander','1996-03-23',2,'th',10),
       (22,'Tsunoda','Yuki','2000-05-11',2,'jp',6),
       (18,'Stroll','Lance','1998-10-29',2,'ca',7),
       (16,'Leclerq','Charles','1997-10-16',1,'ca',2),
       (14,'Alonso','Fernando','1981-07-29',2,'es',5),
       (11,'Perez','Sergio','1990-01-26',2,'mx',3),
       (10,'Gasly','Pierre','1996-02-07',1,'fr',6),
       (9,'Mazepin','Nikita','1999-03-02',2,'ru',9),
       (6,'Latifi','Nicholas','1995-06-29',1,'ca',10),
       (5,'Vettel','Sebastian','1987-07-03',1,'nl',7),
       (4,'Norris','Lando','1999-11-13',1,'gb',4),
       (3,'Ricciardo','Daniel','1989-07-01',2,'au',4);