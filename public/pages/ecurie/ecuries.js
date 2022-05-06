"use strict";

window.onload = init;

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

function afficher(data) {
    console.log(data)

    for (let ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = ecurie.nom

        let img = new Image()
        img.src = "/pages/ecurie/img/" + ecurie.id + ".png"
        img.onerror = () => {
            img.src = "/pages/ecurie/img/default.png"
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



