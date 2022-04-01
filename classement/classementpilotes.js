"use strict";

window.onload = init;

function init() {
    /*
    $.ajax({
        url: "ajax/getLeClassement.php",
        dataType: "json",
        success: remplirLesDonnees,
        error: reponse => console.log(reponse.reponseText)
    });*/

    afficher({
        lesPilotes: [
            {id: '1', nom: 'Michel', prenom: 'Jean', point: 120, idPays: 'ad'},
            {id: '2', nom: 'Ricquier', prenom: 'Jean Mohamed Dimitri', point: 110, idPays: 'et'}
        ],
        lesPays: [
            {id: 'et', nom: 'Estonie'},
            {id: 'ad', nom: 'AdLaurent'}
        ]
    });
}

// affichage des données retournées
function afficher(data) {
    for (const pilote of data.lesPilotes) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = pilote.nom

        let nomPays = "Pays non trouvé"
        for (const pays of data.lesPays) {
            if (pays.id === pilote.idPays) {
                nomPays = pays.nom
            }
        }

        tr.insertCell().innerText = nomPays;

        // TROUVER LE MOYEN D'ORDONNER LES DONNEES COMME IL FAUT
    }

    for (const pays of data.lesPays) {
        let img = new Image()
        img.src = "../Ressource/pays/" + pays.id + ".png"
        console.log(img.src);

        // TROUVER LE MOYEN D'AJOUTER L'IMAGE

    }
}

jQuery(function($) {
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 200) {
            $('.navbar').addClass('fixed-top');
        } else if ($(this).scrollTop() == 0) {
            $('.navbar').removeClass('fixed-top');
        }
    });

    function adjustNav() {
        var winWidth = $(window).width(),
            dropdown = $('.dropdown'),
            dropdownMenu = $('.dropdown-menu');

        if (winWidth >= 768) {
            dropdown.on('mouseenter', function() {
                $(this).addClass('show')
                    .children(dropdownMenu).addClass('show');
            });

            dropdown.on('mouseleave', function() {
                $(this).removeClass('show')
                    .children(dropdownMenu).removeClass('show');
            });
        } else {
            dropdown.off('mouseenter mouseleave');
        }
    }

    $(window).on('resize', adjustNav);

    adjustNav();
});

