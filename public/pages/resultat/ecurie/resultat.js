"use strict";

window.onload = init

async function init() {
    try {
        const data = (await axios.get("/api/resultats/gp")).data;
        remplirLesGrandsPrix(data);
    } catch(e) {
        throw e;
    }
}

async function remplirLesGrandsPrix(data) {
    for (const gp of data) {
        // ajouter le gp à la liste qui affiche les gp

        // mettre un event de on click
        // faire ca
        try {
            const data = (await axios.get("/api/resultats/ecurie/", { params: {gp: gp.id }})).data;
            afficher(data);
        } catch(e) {
            throw e;
        } // finir l'event
    }
}

/**
 * demande d'ajout dans la base de données
 */
function afficher(data) {
    for (const element of data) {
        let tr = document.getElementById('lesLignes').insertRow();

        // place
        tr.insertCell().innerText = element.place;
        // img
        tr.insertCell().innerText = element.img;
        // element.nom = nom + prenom
        tr.insertCell().innerText = element.nom;
        // id pays
        tr.insertCell().innerText = element.idPays;
        // point
        tr.insertCell().innerText = element.point;

    }
}


