"use strict";

window.onload = init;

function init() {


    /*
    $.ajax({
        url: "ajax/getlesecuries.php",
        dataType: "json",
        success: remplirLesDonnees,
        error: reponse => console.log(reponse.reponseText)
    });
    */
    let lesEcuries = [
         {id: "1", nom: "Carrefour", idPays: "1", pilotes: ["1", "2"]},
         {id: "2", nom: "Auchan", idPays: "2", pilotes: ["2", "1"]}
    ]

    afficher(lesEcuries);
}

function afficher(data) {
    console.log(data)

    for (const ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell(0).innerText = ecurie.nom

        let img = new Image()
        img.src = "img/" + ecurie.id + ".png"
        img.onerror = () => {
            img.src = "img/default.png"
        }

        tr.insertCell(1).appendChild(img)

        let nomPays = "Pays non trouvÃ©"
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



