"use strict";

let id = 'fr';

let lesPays = [];

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/pays")).data;
        lesPays = data;
        remplirLesPays(data);
    } catch(e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/ecuries")).data;
        remplirLesEcuries(data);
    } catch(e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        console.log("zdzdz");
        console.log(nom.value);
        console.log(id);

        if (id === undefined) {
            return;
        }

        try {
            const res = (await axios.post("/api/admin/ecurie", {
                nom: nom.value,
                idPays: id
            }));

            if (res.status === 204) {
                // montrer que c'est bien ajouté

                id = undefined;
                nom.innerText = "";

                alert("L'écurie a bien été ajouté");

                console.log('bien ajouté');
            } else {
                // montrer qu'il y a eu une erreur

                alert("Erreur : l'écurie n'a pas été correctement ajouté");

                console.log("erreur !");

            }
        } catch(e) {
            throw e;
        }
    }

    btnModifier.onclick = async () => {
        console.log("zdzdz");
        console.log(nom.value);
        console.log(id);

        if (id === undefined) {
            return;
        }

        try {
            const res = (await axios.put("/api/admin/ecurie", {
                nom: nom.value,
                idPays: id
            }));


            if (res.status === 204) {
                // montrer que c'est bien ajouté

                id = undefined;
                nom.innerText = "";

                alert("Modification réussie");
                console.log('bien ajouté');
            } else {
                // montrer qu'il y a eu une erreur

                alert("La modification n'a pas été réussie");
                console.log("erreur !");
            }
        } catch(e) {
            throw e;
        }
    }
}

function remplirLesPays(data) {
    let idPays = document.getElementById('idPays');

    for (const pays of data) {
        idPays.appendChild(new Option(pays.nom, pays.id));
        idPays.addEventListener('change', (ev) => {
            id = ev.target.value;
        });
    }
}

function remplirLesEcuries(data) {
    for (const ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = ecurie.id
        tr.insertCell().innerText = ecurie.nom

        let img = new Image()
        img.src = "/pages/ecurie/admin/img/" + ecurie.id + ".png"
        img.onerror = () => {
            img.src = "/pages/ecurie/admin/img/default.png"
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


function ajouter() {
    // contrôle des champs de saisie
    let erreur = false;
    for (const input of document.getElementsByClassName('ctrl')) {
        input.nextElementSibling.innerText = input.validationMessage;
        if (!input.checkValidity()) erreur = true;
    }
    // if (!Std.controler(input)) erreur = true;
    // si une erreur est détectée on quitte la fonction
    if (erreur) return;


    //  demande d'ajout dans la base de données
    $.ajax({
        url: 'ajax/ajouter.php',
        type: 'POST',
        data: {
            nom: nom.value,
            idPays: idPays.value,
            photo: photo.value,
        },
        dataType: "json",
        success: function () {
            Std.afficherSucces('Ecurie ajouté')
            // effacer le contenu des champs
            for(const input of document.querySelectorAll('input.ctrl'))
                input.value = "";
            nom.focus();
        },
        error: (reponse) => Std.afficherErreur(reponse.responseText)
    })
}

