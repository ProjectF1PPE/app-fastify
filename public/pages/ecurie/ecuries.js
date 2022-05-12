"use strict";

window.onload = init;
// chargement des données
async function init() {
    console.log('init');

    try {
        const data = (await axios.get("/api/ecuries")).data;
        afficher(data);
    } catch(e) {
        throw e;
    }

    $('#haut').slideUp(3000);
}
//afficher le tableau des ecuries
function afficher(data) {
    console.log(data)

    for (let ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = ecurie.nomEcurie

        let img = new Image()
        img.src = "/pages/ecurie/ressource/" + ecurie.idEcurie + ".png";
        img.onerror = () => {
            img.src = "/pages/ecurie/ressource/default.png"
        }
        tr.insertCell().appendChild(img);

        tr.insertCell().innerText = ecurie.nomPays;

        ecurie.pilotes.sort((piloteA, piloteB) => {
            return piloteA.ordre - piloteB.ordre
        });

        for (let pilote of ecurie.pilotes) {
            tr.insertCell().innerText = pilote.nom;
        }
    }
}



