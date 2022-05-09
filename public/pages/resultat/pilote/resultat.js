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
    let selectGp = document.getElementById('selectGp');

    for (const gp of data) {
        selectGp.appendChild(new Option(gp.nom, gp.id));

        console.log(gp.id);

        selectGp.onchange = async () => {
            try {
                const data = (await axios.get("/api/resultats/pilotes/", { params: { gp: gp.id }}));
                console.log(data);
                console.log(gp.id);
                afficherPilote(data);
            } catch(e) {
                throw e;
            }
        }
    }
}

function afficherPilote(data) {
    lesLignes.innerHTML = "";

    for (let pilote of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = pilote.place;

        let img = new Image();
        img.src = "/pages/pilote/img/" + pilote.id + ".png";
        img.onerror = () => {
            img.src = "/pages/img/1.png"
        }
        tr.insertCell(1).appendChild(img)

        tr.insertCell().innerText = pilote.nom;

        let img2 = new Image();
        img2.src = '/ressource/pays/' + pilote.idPays + '.png';
        img2.style.width = "40px";
        img2.style.height = "25px";
        img2.alt = "";
        tr.insertCell(2).appendChild(img2);

        tr.insertCell().innerText = pilote.point;
    }
}

