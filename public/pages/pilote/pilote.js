"use strict";

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/pilotes")).data;
        afficher(data);
    } catch(e) {
        throw e;
    }

    $('#haut').slideUp(3000);
}

function afficher(data) {

    console.log(data)
    let row = document.createElement('div');
    row.classList.add("row");

    for (let pilote of data) {
        let col = document.createElement('div');
        col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");
        col.style.padding = "10px";
        let carte = document.createElement('div');
        carte.classList.add('card');

        let entete = document.createElement('div');
        entete.classList.add('card-header', 'bg-dark', 'text-white', 'text-center');
        entete.style.minHeight = '75px';
        entete.innerText = pilote.nom + " " + pilote.prenom;
        carte.appendChild(entete);

        let corps = document.createElement('div');
        corps.classList.add("card-body", "text-center");
        let img = document.createElement('img');
        img.src = '/pages/pilote/img/' + pilote.id + '.jpg';
        img.style.width = "150px";
        img.style.height = "150px";
        img.alt = "";
        corps.appendChild(img);
        carte.appendChild(corps);

        let pied = document.createElement('div');
        pied.classList.add("card-body", "text-center");
        pied.style.backgroundColor = "darkred";
        let img2 = document.createElement('img');
        img2.src = '/ressource/pays/' + pilote.idPays + '.png';
        img2.style.width = "40px";
        img2.style.height = "25px";
        img2.alt = "";
        pied.appendChild(img2);
        carte.appendChild(pied);

        col.appendChild(carte);
        row.appendChild(col);

        lesCartes.appendChild(row);
    }
}
// affichage des données retournées
/*function afficher(data) {
    console.log(data);

    for (const pilote of data) {
        let col = document.createElement('div');
        col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");

        let carte = document.createElement('div');
        carte.classList.add('card');

        let entete = document.createElement('div');
        entete.classList.add('card-header', 'bg-dark', 'text-white', 'text-center');
        entete.style.minHeight = '75px';
        entete.innerText = pilote.nom + ' ' + pilote.prenom;
        carte.appendChild(entete);

        let corps = document.createElement('div');
        corps.classList.add("card-body", "text-center");
        let img = document.createElement('img');
        img.src = '/pages/pilote/img/' + pilote.id + '.jpg';
        img.style.width = "150px";
        img.style.height = "150px";
        img.alt = "";
        corps.appendChild(img);
        carte.appendChild(corps);

        let pied = document.createElement('div');
        pied.classList.add('card-footer', 'text-muted', 'text-center');
        pied.innerText = pilote.dateNaissance;
        carte.appendChild(pied);

        col.appendChild(carte);
        row.appendChild(col);

        lesCartes.appendChild(row);
    }

}
*/



