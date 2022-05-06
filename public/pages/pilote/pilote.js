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

// affichage des données retournées
function afficher(data) {
    console.log(data);

    let row = document.createElement('div');
    row.classList.add("row");

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


