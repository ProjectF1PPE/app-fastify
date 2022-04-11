"use strict";


// TEMPORAIRE, JUSTE EN ATTENDANT DE FAIRE LE SQL
let lesPays
let lesPilotes

window.addEventListener('load', async () => {
    const response = await fetch('/ecurie');
    const ecuries = await response.json();

    afficher(remplirLesDonnees(ecuries));
})

async function init() {
    /*
    $.ajax({
        url: "ajax/getlesecuries.php",
        dataType: "json",
        success: remplirLesDonnees,
        error: reponse => console.log(reponse.reponseText)
    });

    /* // SINON ON FAIT CA EN ATTENDANT POUR QUAND MEME POUVOIR FAIRE DES TESTS
     let lesEcuries = [
         {id: "1", nom: "Carrefour", idPays: "1", pilotes: ["1", "2"]},
         {id: "2", nom: "Auchan", idPays: "2", pilotes: ["2", "1"]}
     ] */
    //afficher(remplirLesDonnees())
}

function remplirLesDonnees(data) {
    lesPays = data.lesPays
    lesPilotes = data.lesPilotes
    afficher(data.lesEcuries)

    console.log(lesPays)
    console.log(lesPilotes)
    console.log(data.lesEcuries)
}

// affichage des données retournées
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



