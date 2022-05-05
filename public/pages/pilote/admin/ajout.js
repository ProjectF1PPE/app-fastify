"use strict";

window.onload = init;

function init() {
    // activation des popovers
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => new bootstrap.Popover(element));

    // chargement des données
    $.ajax({
        url: "ajax/getlespilotes.php",
        dataType: "json",
        error: response => console.error(response.responseText),
        success: (data) => {
            for (const pilote of data) {
                idPilote.add(new Option(pilote.id, pilote.idPays));
            }
        }
    });


    // traitement associé au bouton 'Ajouter'
    btnAjouter.onclick = ajouter;


    // effacer le messages d'erreur à la réception du focus
    for (const input of document.getElementsByClassName('ctrl'))
        input.onfocus = function () {
            this.nextElementSibling.innerText = '';
            this.classList.remove("erreur");
        }

    // contrôle en cours de frappe
    for (const input of document.getElementsByClassName('ctrl'))
        input.oninput = () => Std.verifier(input);

    // traitements associés au champ nom
    nom.onkeypress = function (e) { if (!/^[A-Za-z ]$/.test(e.key)) return false; };
    nom.onkeyup =  (e) => nom.value = nom.value.toUpperCase();


    // traitements associés au champ prenom
    prenom.onkeypress = function (e) { if (!/^[A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '\-]$/.test(e.key)) return false; };

    // traitements associés au champ dateNaissance
    dateNaissance.min = min;
    dateNaissance.max = max;

    // traitements associés au champ licence
    licence.onkeypress = function (e) { if (!/^[0-9]$/.test(e.key)) return false;};

    // attribution du focus sur le premier champ
    nom.focus();

}




/**
 * Contrôle des données saisies
 */
function ajouter() {
    // contrôle des champs de saisie
    let erreur = false;
    for (const input of document.getElementsByClassName('ctrl')) {
        input.nextElementSibling.innerText = input.validationMessage;
        if (!input.checkValidity()) erreur = true;
    }
        // if (!Std.controler(input)) erreur = true;
    // si une erreur est détectée on quitte la fonction
    if (erreur) return;


   //  demande d'ajout dans la base de données
    $.ajax({
        url: 'ajax/ajouter.php',
        type: 'POST',
        data: {
            nom: nom.value,
            prenom: prenom.value,
            sexe: sexe.value,
            dateNaissance: dateNaissance.value,
            licence: licence.value,
            idClub: idClub.value,
            ffa: ffa.checked ? 1 : 0
        },
        dataType: "json",
        success: function () {
            Std.afficherSucces('Coureur ajouté')
            // effacer le contenu des champs
            for(const input of document.querySelectorAll('input.ctrl'))
                input.value = "";
            nom.focus();
        },
        error: (reponse) => Std.afficherErreur(reponse.responseText)
    })
}
