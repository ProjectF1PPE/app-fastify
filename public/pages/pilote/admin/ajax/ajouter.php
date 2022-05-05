<?php
// Vérification des paramètres attendus
$erreur = false;
if (!isset($_POST['numéro'])) {
    echo "\nLe paramètre 'numéro' indiquant le numéro du pilote n'est pas transmis";
    $erreur = true;
}

if (!isset($_POST['pays'])) {
    echo "\nLe paramètre 'pays' indiquant le pays du pilote n'est pas transmis";
    $erreur = true;
}

if (!isset($_POST['nom'])) {
    echo "\nLe paramètre 'nom' indiquant le nom du pilote n'est pas transmis";
    $erreur = true;
}

if (!isset($_POST['prenom'])) {
    echo "\nLe paramètre 'prenom' indiquant le prénom du pilote n'est pas transmis";
    $erreur = true;
}

if (!isset($_POST['ecurie'])) {
    echo "\nLe paramètre 'ecurie' indiquant l'écurie du pilote n'est pas transmis";
    $erreur = true;
}

if (!isset($_POST['ordre'])) {
    echo "\nLe paramètre 'idPilote' indiquant le numéro du pilote au sein de l'écurie  n'est pas transmis";
    $erreur = true;
}

if ($erreur) exit;

// récupération des paramètres avec mise en forme attendue

require '../../class/class.controle.php';
$numero = trim($_POST['numero']);
$pays = strtoupper(Controle::supprimerEspace($_POST['pays']));
$nom = strtoupper(Controle::supprimerEspace($_POST['nom']));
$prenom =  strtolower(Controle::supprimerEspace($_POST['prenom']));
$ecurie = trim($_POST['ecurie']);
$ordre = trim($_POST['ordre']);

// Contrôle des données

require '../../class/class.database.php';
$db = Database::getInstance();

// contrôle du numéro du pilote
if (empty($numero)) {
    echo "\nLe numéro du pilote doit être renseigné.";
    $erreur = true;
} elseif (!preg_match("/^[0-9]{2}$/", $numero)) {
    echo "\nLe numéro du pilote doit être composé de 2 chiffres.";
    $erreur = true;
} else {
    // Vérification de l'unicité du numéro du pilote
    $sql = <<<EOD
			SELECT 1
			FROM pilote
			where id = :id;
EOD;
    $curseur = $db->prepare($sql);
    $curseur->bindParam('id', $numero);
    $curseur->execute();
    $ligne = $curseur->fetch(PDO::FETCH_ASSOC);
    $curseur->closeCursor();
    if ($ligne) {
        echo "Ce numéro de pilote est déjà attribué à un autre pilote";
        $erreur = true;
    }
}

// contrôle du nom
if ($nom === '') {
    echo "\nLe nom doit être renseigné.";
    $erreur = true;
} elseif (!preg_match("/^[A-Z]( ?[A-Z])*$/", $nom)) {
    echo "\nLe nom ne doit comporter que des lettres majuscules non accentuées et des espaces";
    $erreur = true;
} elseif (mb_strlen($nom) > 30) {
    echo "\nLe nom ne doit pas dépasser 30 caractères";
    $erreur = true;
}


// contrôle du prénom
if (empty($prenom)) {
    echo "\nLe prénom doit être renseigné.";
    $erreur = true;
} elseif (!preg_match("/^[A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]([ '-]?[A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])*$/", $prenom)) {
    echo "\nLe prénom n'est pas conforme";
    $erreur = true;
} elseif (mb_strlen($prenom) > 30) {
    echo "\nLe prénom ne doit pas dépasser 30 caractères";
    $erreur = true;
}

if ($erreur) exit;

// enregistrement de l'ajout

$sql = <<<EOD
    insert into pilote(id,idPays, nom, prenom, idEcurie, ordre)
           values (:numero, :pays, :nom, :prenom, :ecurie, :ordre);
EOD;
$curseur = $db->prepare($sql);
$curseur->bindParam('licence', $licence);
$curseur->bindParam('nom', $nom);
$curseur->bindParam('prenom', $prenom);
$curseur->bindParam('dateNaissance', $dateNaissance);
$curseur->bindParam('sexe', $sexe);
$curseur->bindParam('idClub', $idClub);
$curseur->bindParam('ffa', $ffa);
try {
    $curseur->execute();
    echo 1;
} catch(Exception $e) {
    echo substr($e->getMessage(),strrpos($e->getMessage(), '#') + 1);
}
