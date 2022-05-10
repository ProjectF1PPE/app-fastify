﻿"use strict";

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
    let selectGp = document.getElementById('selectGp');

    for (const gp of data) {
        selectGp.appendChild(new Option(gp.nom, gp.id));
    }

    selectGp.onchange = async (ev) => {
        try {
            const data = (await axios.get("/api/resultats/pilotes/", { params: { gp: ev.target.value }})).data;
            console.log(data);
            afficherPilote(data);
        } catch(e) {
            throw e;
        }
    }
}

function afficherPilote(data) {
    lesLignes.innerHTML = "";

    for (let pilote of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = pilote.place;

        let img = new Image();
        img.src = "/pages/pilote/ressource/" + pilote.idPilote + ".jpg";
        img.onerror = () => {
            img.src = "/pages/pilote/ressource/1.jpg"
        }
        tr.insertCell().appendChild(img)

        tr.insertCell().innerText = pilote.nom + " " + pilote.prenom;

        let img2 = new Image();
        img2.src = '/ressource/pays/' + pilote.idPays + '.png';
        img2.onerror = () => {
            img2.src = "/ressource/f1.png";
        }
        img2.style.width = "40px";
        img2.style.height = "25px";
        img2.alt = "";
        tr.insertCell().appendChild(img2);

        tr.insertCell().innerText = pilote.point;
    }
}

