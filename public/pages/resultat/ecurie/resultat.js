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

function remplirLesGrandsPrix(data) {
    for (const gp of data) {
        // ajouter le gp à la liste qui affiche les gp

        // mettre un event de on click
        // faire ca
        try {
            const data = (await axios.get("/api/resultats/pilotes/", { params: {gp: gp.id }})).data;
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
        let tr = lesLignes.insertRow();


        // place
        // img
        // element.nom = nom + prenom
        // id pays
        // point
        tr.insertCell().innerText = element.id;
        tr.insertCell().innerText = element.nom;
        tr.insertCell().innerText = element.groupe;
    }
}

