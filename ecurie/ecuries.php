<!DOCTYPE html>
<html lang="fr">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta charset="UTF-8" name="page d'accueil">

    <title>Cas F1</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link href="style.css" rel="stylesheet"/>

    <script src="//code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="ecurie.js"></script>
    <script src="../Includes/navbar.js"></script>
</head>
<?php require '../Includes/header.php'; ?>

<body>
<div class="container-fluid">
    <a><img src="img/img1.jpg" class="img1 img-responsive "/></a>

    <div class="ecuries">
        <div class="row">
            <div>
                <div class='table-responsive'>
                    <table id='lesEcuries' class='table table-hover table-borderless table-sm'>
                        <thead>
                        <tr>
                            <th style='width:15%'>Nom</th>
                            <th class="photoecurie">Photo</th>
                            <th style='width:15%'>Pays</th>
                            <th style='width:15%'>Pilote 1</th>
                            <th style='width:15%'>Pilote 2</th>
                            <th style='width:15%'>Pilote 3</th>
                        </tr>
                        </thead>
                        <tbody id="lesLignes"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <footer>
        ©Nedhor 2022 – Tous droits réservés
    </footer>
</div>
</body>
</html>