Drop database if exists f1;
CREATE DATABASE f1 character set latin1 collate latin1_general_ci;
USE f1;

SET default_storage_engine=InnoDb;

# gestions des compétences
CREATE TABLE pays
(
    id char(2) primary key,
    nom varchar(60) NOT NULL
);

INSERT INTO pays (id, nom)
VALUES ('ad', 'Andorre'),
       ('ae', 'Émirats Arabes Unis'),
       ('af', 'Afghanistan'),
       ('ag', 'Antigua-et-Barbuda'),
       ('ai', 'Anguilla'),
       ('al', 'Albanie'),
       ('am', 'Arménie'),
       ('an', 'Antilles néerlandaises'),
       ('ao', 'Angola'),
       ('aq', 'Antarctique'),
       ('ar', 'Argentine'),
       ('as', 'Samoa américaines'),
       ('at', 'Autriche'),
       ('au', 'Australie'),
       ('aw', 'Aruba'),
       ('ax', 'Îles Aland'),
       ('az', 'Azerbaïdjan'),
       ('ba', 'Bosnie-Herzégovine'),
       ('bb', 'Barbades'),
       ('bd', 'Bangladesh'),
       ('be', 'Belgique'),
       ('bf', 'Burkina Faso'),
       ('bg', 'Bulgarie'),
       ('bh', 'Bahreïn'),
       ('bi', 'Burundi'),
       ('bj', 'Bénin'),
       ('bl', 'Saint Barthélemy'),
       ('bm', 'Bermudes'),
       ('bn', 'Brunei'),
       ('bo', 'Bolivie'),
       ('bq', 'Saba, Saint-Eustache et Bonaire'),
       ('br', 'Brésil'),
       ('bs', 'Bahamas'),
       ('bt', 'Bhoutan'),
       ('bv', 'Île Bouvet'),
       ('bw', 'Botswana'),
       ('by', 'Biélorussie'),
       ('bz', 'Belize'),
       ('ca', 'Canada'),
       ('cc', 'Îles Cocos'),
       ('cd', 'République démocratique du Congo'),
       ('cf', 'République centrafricaine'),
       ('cg', 'République du Congo'),
       ('ch', 'Suisse'),
       ('ci', 'Côte-d\'Ivoire'),
       ('ck', 'Îles Cook'),
       ('cl', 'Chili'),
       ('cm', 'Cameroun'),
       ('cn', 'Chine'),
       ('co', 'Colombie'),
       ('cr', 'Costa Rica'),
       ('cs', 'Serbie et Montenegro'),
       ('cu', 'Cuba'),
       ('cv', 'Cap vert'),
       ('cw', 'Curaçao'),
       ('cx', 'Îles Christmas'),
       ('cy', 'Chypre'),
       ('cz', 'République Tchèque'),
       ('de', 'Allemagne'),
       ('dj', 'Djibouti'),
       ('dk', 'Danemark'),
       ('dm', 'Dominique'),
       ('do', 'République Dominicaine'),
       ('dz', 'Algérie'),
       ('ec', 'Équateur'),
       ('ee', 'Estonie'),
       ('eg', 'Égypte'),
       ('eh', 'Sahara occidental'),
       ('er', 'Érythrée'),
       ('es', 'Espagne'),
       ('et', 'Éthiopie'),
       ('fi', 'Finlande'),
       ('fj', 'Fiji'),
       ('fk', 'Îles Falkland'),
       ('fm', 'Micronésie'),
       ('fo', 'Îles Féroé'),
       ('fr', 'France'),
       ('ga', 'Gabon'),
       ('gb', 'Royaume-Uni'),
       ('gd', 'Grenade'),
       ('ge', 'État de Géorgie'),
       ('gf', 'Guyane française'),
       ('gg', 'Guernesey'),
       ('gh', 'Ghana'),
       ('gi', 'Gribraltar'),
       ('gl', 'Groenland'),
       ('gm', 'Gambie'),
       ('gn', 'Guinée'),
       ('gp', 'Guadeloupe'),
       ('gq', 'Guinée équatoriale'),
       ('gr', 'Grèce'),
       ('gs', 'Géorgie du Sud et les îles Sandwich'),
       ('gt', 'Guatémala'),
       ('gu', 'Guam'),
       ('gw', 'Guinée-Bissau'),
       ('gy', 'Guyane'),
       ('hk', 'Hong Kong'),
       ('hm', 'Îles Heard et îles MacDonald'),
       ('hn', 'Honduras'),
       ('hr', 'Croatie'),
       ('ht', 'Haïti'),
       ('hu', 'Hongrie'),
       ('id', 'Indonésie'),
       ('ie', 'Irlande'),
       ('il', 'Israël'),
       ('im', 'Île de Man'),
       ('in', 'Inde'),
       ('io', 'Territoire Britannique de l\'Océan Indien'),
       ('iq', 'Irak'),
       ('ir', 'Iran'),
       ('is', 'Islande'),
       ('it', 'Italie'),
       ('je', 'Jersey'),
       ('jm', 'Jamaïque'),
       ('jo', 'Jordanie'),
       ('jp', 'Japon'),
       ('ke', 'Kenya'),
       ('kg', 'Kirghizistan'),
       ('kh', 'Cambodge'),
       ('ki', 'Kiribati'),
       ('km', 'Comores'),
       ('kn', 'Saint-Kitts-et-Nevis'),
       ('kp', 'Corée du Nord'),
       ('kr', 'Corée du Sud'),
       ('kw', 'Koweït'),
       ('ky', 'Îles Caïmans'),
       ('kz', 'Kazakhstan'),
       ('la', 'Laos'),
       ('lb', 'Liban'),
       ('lc', 'Sainte-Lucie'),
       ('li', 'Liechtenstein'),
       ('lk', 'Sri Lanka'),
       ('lr', 'Libéria'),
       ('ls', 'Lesotho'),
       ('lt', 'Lituanie'),
       ('lu', 'Luxembourg'),
       ('lv', 'Lettonie'),
       ('ly', 'Libye'),
       ('ma', 'Maroc'),
       ('mc', 'Monaco'),
       ('md', 'Moldavie'),
       ('me', 'Monténégro'),
       ('mf', 'Saint-Martin'),
       ('mg', 'Madagascar'),
       ('mh', 'Îles Marshall'),
       ('mk', 'Macédoine'),
       ('ml', 'Mali'),
       ('mm', 'Myanmar'),
       ('mn', 'Mongolie'),
       ('mo', 'Macao'),
       ('mp', 'Îles Mariannes du Nord'),
       ('mq', 'Martinique'),
       ('mr', 'Mauritanie'),
       ('ms', 'Montserrat'),
       ('mt', 'Malte'),
       ('mu', 'Île Maurice'),
       ('mv', 'Maldives'),
       ('mw', 'Malawi'),
       ('mx', 'Mexique'),
       ('my', 'Malaysie'),
       ('mz', 'Mozambique'),
       ('na', 'Namibie'),
       ('nc', 'Nouvelle-Calédonie'),
       ('ne', 'Niger'),
       ('nf', 'Île Norfolk'),
       ('ng', 'Nigéria'),
       ('ni', 'Nicaragua'),
       ('nl', 'Pays-Bas'),
       ('no', 'Norvège'),
       ('np', 'Népal'),
       ('nr', 'Nauru'),
       ('nu', 'Niue'),
       ('nz', 'Nouvelle Zélande'),
       ('om', 'Oman'),
       ('pa', 'Panama'),
       ('pe', 'Pérou'),
       ('pf', 'Polynésie française'),
       ('pg', 'Papouasie-Nouvelle-Guinée'),
       ('ph', 'Philippines'),
       ('pk', 'Pakistan'),
       ('pl', 'Pologne'),
       ('pm', 'Saint Pierre et Miquelon'),
       ('pn', 'Îles Pitcairn'),
       ('pr', 'Puerto Rico'),
       ('ps', 'Territoire Palestinien'),
       ('pt', 'Portugal'),
       ('pw', 'Palaos'),
       ('py', 'Paraguay'),
       ('qa', 'Qatar'),
       ('re', 'La Réunion'),
       ('ro', 'Roumanie'),
       ('rs', 'Serbie'),
       ('ru', 'Russie'),
       ('rw', 'Rwanda'),
       ('sa', 'Arabie Saoudite'),
       ('sb', 'Îles Salomon'),
       ('sc', 'Seychelles'),
       ('sd', 'Soudan'),
       ('se', 'Suède'),
       ('sg', 'Singapour'),
       ('sh', 'Sainte-Hélène'),
       ('si', 'Slovénie'),
       ('sj', 'Svalbard et Jan Mayen'),
       ('sk', 'Slovaquie'),
       ('sl', 'Sierra Leone'),
       ('sm', 'San Marin'),
       ('sn', 'Sénégal'),
       ('so', 'Somalie'),
       ('sr', 'Surinam'),
       ('ss', 'Soudan du Sud'),
       ('st', 'Sao Tomé-et-Principe'),
       ('sv', 'Le Salvador'),
       ('sx', 'Saint-Martin'),
       ('sy', 'Syrie'),
       ('sz', 'Swaziland'),
       ('tc', 'Îles Turques et Caïques'),
       ('td', 'Tchad'),
       ('tf', 'Terres australes et antarctiques françaises'),
       ('tg', 'Togo'),
       ('th', 'Thaïlande'),
       ('tj', 'Tajikistan'),
       ('tk', 'Tokelau'),
       ('tl', 'Timor oriental'),
       ('tm', 'Turkménistan'),
       ('tn', 'Tunisie'),
       ('to', 'Tonga'),
       ('tr', 'Turquie'),
       ('tt', 'Trinité et Tobago'),
       ('tv', 'Tuvalu'),
       ('tw', 'Taiwan'),
       ('tz', 'Tanzanie'),
       ('ua', 'Ukraine'),
       ('ug', 'Ouganda'),
       ('um', 'Îles Mineures éloignées des États-Unis'),
       ('us', 'États-Unis (USA)'),
       ('uy', 'Uruguay'),
       ('uz', 'Ouzbékistan'),
       ('va', 'Vatican'),
       ('vc', 'Saint-Vincent-et-les-Grenadines'),
       ('ve', 'Vénézuela'),
       ('vg', 'Îles Vierges britanniques'),
       ('vi', 'Îles Vierges des États-Unis'),
       ('vn', 'Vietnam'),
       ('vu', 'Vanuatu'),
       ('wf', 'Wallis et Futuna'),
       ('ws', 'Samoa'),
       ('xk', 'Kosovo'),
       ('ye', 'Yemen'),
       ('yt', 'Mayotte'),
       ('za', 'Afrique du Sud'),
       ('zm', 'Zambie'),
       ('zw', 'Zimbabwe');
CREATE TABLE grandprix
(
    id int auto_increment primary key,
    ville varchar(20),
    date DATE,
    photo varchar(20),
    idPays char(2),
    FOREIGN KEY (idPays) REFERENCES pays (id)
);

INSERT INTO grandprix (ville, date, photo, idPays)
VALUES ('Austin','2022-10-23','Austin','us'),
	   ('Bakou','2022-06-12','Bakou','az'),
       ('Barcelone','2022-05-22','Barcelone','es'),
	   ('Budapest','2022-07-31','Budapest','hu'),
       ('Hockenheim','2022-01-12','Hockenheim','al'),
       ('Imola','2022-04-24','Imola','it'),
       ('Djeddah','2022-03-27','Djeddah','sa'),
       ('Le Castellet','2022-01-12','Le Castellet','fr'),
       ('Marina Bay','2022-10-02','Marina Bay','sg'),
       ('Melbourne','2022-04-10','Melbourne','au'),
       ('Mexico','2022-10-30','Mexico','mx'),
       ('Miami','2022-05-08','Miami','us'),
       ('Monaco','2022-05-29','Monaco','mc'),
       ('Montréal','2022-06-19','Montréal','ca'),
       ('Monza','2022-09-11','Monza','it'),
       ('Sakhir','2022-03-20','Sakhir','bh'),
       ('São Paulo','2022-11-13','São Paulo','br'),
       ('Shanghai','2022-01-12','Shanghai','cn'),
       ('Silverstone','2022-07-03','Silverstone','gb'),
       ('Sotchi','2022-09-25','Sotchi','ru'),
       ('Spa-Francorchamps','2022-08-28','Spa-Francorchamps','be'),
       ('Spielberg','2022-07-10','Spielberg','at'),
       ('Suzuka','2022-10-09','Suzuka','jp'),
       ('Yas Marina','2022-11-20','Yas Marina','ae'),
       ('Zandvoort','2022-09-04','Zandvoort','nl')
       ;

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


CREATE TABLE pilote
(
    id int auto_increment primary key,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    dateNaissance DATE,
    ordre int,
    idPays char(2) NOT NULL,
	idEcurie int,
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



CREATE TABLE resultat
(
	idPilote int,
    idGP int,
    place int NOT NULL,
    point int,
    UNIQUE (place,idGP),
    PRIMARY KEY (idPilote, idGP),
    FOREIGN KEY (idPilote) REFERENCES pilote (id),
	FOREIGN KEY (idGP) REFERENCES grandprix (id)
);

INSERT INTO resultat (idGP, idPilote, place, point) VALUES
(1, 1, 2, 18),
(1, 3, 7, 6),
(1, 4, 4, 12),
(1, 5, 15, 0),
(1, 11, 5, 10),
(1, 16, 6, 8),
(1, 18, 10, 1),
(1, 22, 9, 2),
(1, 23, 12, 0),
(1, 24, 11, 0),
(1, 31, 13, 0),
(1, 44, 1, 25),
(1, 47, 16, 0),
(1, 55, 8, 4),
(1, 63, 14, 0),
(1, 77, 3, 16),
(3, 1, 2, 18),
(3, 3, 9, 2),
(3, 4, 5, 10),
(3, 5, 13, 0),
(3, 6, 18, 0),
(3, 9, 19, 0),
(3, 10, 10, 1),
(3, 11, 4, 12),
(3, 14, 8, 4),
(3, 16, 6, 8),
(3, 18, 14, 0),
(3, 22, 15, 0),
(3, 23, 12, 0),
(3, 31, 7, 6),
(3, 44, 1, 25),
(3, 47, 17, 0),
(3, 55, 11, 0),
(3, 63, 16, 0),
(3, 77, 3, 16);

CREATE TABLE numerointerdit
(
    id int,
    PRIMARY KEY (id)
);
INSERT INTO numerointerdit (id)
VALUES (1),(3),(44),(6),(14),(7),(8),(13),(22),(20),(27),(11),(99),(21),(25),(26),(19),(77),(17);





