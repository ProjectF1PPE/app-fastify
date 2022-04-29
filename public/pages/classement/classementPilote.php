<!DOCTYPE html>
<html lang="fr">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta charset="UTF-8" name="Classement">

    <title>Cas F1</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link href="public/pages/classement/style.css" rel="stylesheet"/>

    <script src="//code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="public/pages/classement/classementpilotes.js"></script>
</head>

<?php require '../Includes/header.html'; ?>

<body>
<div class="container-fluid">


    <div class="ecuries">
        <div class="row">
            <div>
                <div class='table-responsive'>
                    <table id="leClassement" class='table table-hover table-borderless table-sm'>
                        <thead>
                        <tr>
                            <th style='width:15%'>Position</th>
                            <th style='width:15%'>Nom</th>
                            <th style='width:15%'>Prénom</th>
                            <th style='width:15%'>Points</th>
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