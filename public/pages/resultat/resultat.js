﻿"use strict";

window.onload = init

function init() {
    $.ajax({
        url: 'ajax/getlesequipes.php',
        type: 'POST',
        dataType: "json",
        error: response => console.error(response.responseText),
        success: afficher
    });
}

/**
 * demande d'ajout dans la base de données
 */
function afficher(data) {
    for (const element of data) {
        let tr = lesLignes.insertRow();

        // place
        // sa tete avec son id
        // element.nom = nom + prenom
        // son id pays pour son drapeau
        // points

        tr.insertCell().innerText = element.id;
        tr.insertCell().innerText = element.nom;
        tr.insertCell().innerText = element.groupe;
    }
}

