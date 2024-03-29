"use strict";

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/gp")).data;
        afficher(data);
    } catch(e) {
        throw e;
    }
    $('#haut').slideUp(3000);
}

function afficher(data) {
    console.log(data);

    let row = document.createElement('div');
    row.classList.add("row");

    for (const grandprix of data) {
        let col = document.createElement('div');
        col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");
        col.style.padding = "10px";
        let carte = document.createElement('div');
        carte.classList.add('card');

        let entete = document.createElement('div');
        entete.classList.add('card-header', 'bg-dark', 'text-white', 'text-center');
        entete.style.minHeight = '75px';
        entete.innerText = grandprix.ville;
        carte.appendChild(entete);


        let corps = document.createElement('div');
        corps.classList.add("card-body", "text-center");
        let img = document.createElement('img');
        img.src = '/pages/gp/circuit/' + grandprix.photo + '.png';
        img.style.width = "150px";
        img.style.height = "150px";
        img.alt = "";
        corps.appendChild(img);
        carte.appendChild(corps);

        let pied = document.createElement('div');
        pied.classList.add('card-footer', 'text-muted', 'text-center');

        pied.innerText = grandprix.date;
        carte.appendChild(pied);

        col.appendChild(carte);
        row.appendChild(col);

        lesGP.appendChild(row);
    }
}
