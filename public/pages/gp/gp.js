"use strict";

window.onload = init;

function init() {
    /*
    // A METTRE QUAND SQL MARCHERA
    $.ajax({
        url: "ajax/getlespilotes.php",
        type: 'post',
        dataType: "json",
        success: afficher,
        error: reponse => console.log(reponse.responseText)
    });
     */

    // EN ATTENDANT POUR FAIRE DES TESTS
    let lesGrandsPrix = [
        {ville: "Austin",  date: '2022-10-23', photo:'Autin', idPays:'us'},
        {ville: "Bakou",  date: '2022-06-12', photo:'Bakou', idPays:'az'},
    ]
    afficher(lesGrandsPrix)
}

// affichage des données retournées
function afficher(data) {
    console.log(data);

    let row = document.createElement('div');
    row.classList.add("row");

    for (const grandprix of data) {
        let col = document.createElement('div');
        col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");

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
        img.src = 'circuit/' + grandprix.photo + '.png';
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

        lesCartes.appendChild(row);
    }


}
