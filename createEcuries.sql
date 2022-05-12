USE f1;

CREATE TABLE ecurie
(
    id int NOT NULL auto_increment primary key,
    nom varchar(50) NOT NULL,
    photo varchar(10),
    idPays char(2) NOT NULL
);
INSERT INTO ecurie (id,nom,photo,idPays)
VALUES(1,"Mercedes","1.png","de"),
      (2,"Ferrari","2.png","it"),
      (3,"Red Bull","3.png","at"),
      (4,"McLaren","4.png","gb"),
      (5,"Alpine","5.png","fr"),
      (6,"AlphaTauri","6.png","it"),
      (7,"Aston Martin","7.png","gb"),
      (8,"Alfa Romeo","8.png","ch"),
      (9,"Haas","9.png","us"),
      (10,"Williams","10.png","gb");



