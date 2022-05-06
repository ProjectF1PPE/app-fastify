"use strict";

let lesPays = [];

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/pays")).data;
        lesPays = data;
        remplirLesPays(data);
    } catch(e) {
        throw e;
    }
    try {
        const data = (await axios.get("/api/admin/ecurie")).data;
        remplirLesPays(data);
    } catch(e) {
        throw e;
    }
}

function remplirLesPays(data) {
    for (const pays of data) {
        let nom = pays.nom;
    }
}

function remplirLesEcuries(data) {
    for (const ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell(0).innerText = ecurie.nom

        let img = new Image()
        img.src = "img/" + ecurie.id + ".png"
        img.onerror = () => {
            img.src = "img/default.png"
        }
        tr.insertCell(1).appendChild(img)
    }
}

// affichage des données retournées
function afficher(data) {
    console.log(data)

    for (const ecurie of data) {

        // id , nom , photo , pays , pilote 1 , pilote 2 , pilote 3

        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell(0).innerText = ecurie.nom

        let img = new Image()
        img.src = "img/" + ecurie.id + ".png"
        img.onerror = () => {
            img.src = "img/default.png"
        }

        tr.insertCell(1).appendChild(img)

        let nomPays = "Pays non trouvé"
        for (let unPays of lesPays) {
            if (unPays.id === ecurie.idPays) {
                nomPays = unPays.nom
            }
        }

        tr.insertCell(2).innerText = nomPays

        let pilotes = []
        for (let unPilote of lesPilotes) {
            if (unPilote.idEcurie === ecurie.id) {
                pilotes.push({
                    nom: unPilote.nom,
                    prenom: unPilote.prenom,
                    ordre: unPilote.ordre
                })
            }
        }

        for (let pilote of pilotes) {
            tr.insertCell().innerText = "#" + pilote.ordre + " - " + pilote.nom + " " + pilote.prenom
        }
    }
}

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
            idPays: idPays.value,
            photo: photo.value,
        },
        dataType: "json",
        success: function () {
            Std.afficherSucces('Ecurie ajouté')
            // effacer le contenu des champs
            for(const input of document.querySelectorAll('input.ctrl'))
                input.value = "";
            nom.focus();
        },
        error: (reponse) => Std.afficherErreur(reponse.responseText)
    })
}

