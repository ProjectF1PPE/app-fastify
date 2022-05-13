"use strict";

let id = 'fr';

let lesPays = [];

window.onload = init;

async function init() {
    try {
        await axios.post("/api/authorization", {}, { headers: {Authorization: sessionStorage.getItem("token")}});
    } catch (e) {
        alert("Votre session a expiré");
        window.location.href='/';
        throw e;
    }

    try {
        const data = (await axios.get("/api/pays")).data;
        lesPays = data;
        remplirLesPays(data);
    } catch(e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/pilotes")).data;
        remplirLesPilotes(data);
    } catch(e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        if (id === undefined) {
            return;
        }
        let id = document.getElementById('id');
        if (!id.checkValidity()) {
            alert("Vous devez entrer un numéro");
            return;
        }
        let nom = document.getElementById('nom');
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }
        let prenom = document.getElementById('prenom');
        if (!prenom.checkValidity()) {
            alert("Vous devez entrer un prenom");
            return;
        }
        let ordre = document.getElementById('ordre');
        if (!ordre.checkValidity()) {
            alert("Vous devez entrer l'ordre");
            return;
        }
        try {
            const res = (await axios.post("/api/admin/pilote", {
                id: id.value,
                nom: nom.value,
                prenom: prenom.value,
                ordre: ordre.value,
            }));

            if (res.status === 204) {
                alert("Le pilote a bien été ajouté");
            } else {
                alert("Erreur : le pilote n'a pas été correctement ajouté");
            }
        } catch(e) {
            throw e;
        }
    };
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

async function remplirLesPilotes(data) {
    for (const pilote of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = pilote.id
        tr.insertCell().innerText = pilote.nom + " " + pilote.prenom



        tr.insertCell().innerText = pilote.idEcurie;


        let btnModifier = document.createElement('button');
        btnModifier.classList.add('bi', 'bi-pencil-square');
        btnModifier.type = "submit";

        btnModifier.onclick = async () => {
            try {
                const res = (await axios.delete("/api/admin/pilote", {
                    data: {
                        id: pilote.id
                    }
                }));

                if (res.status === 204) {
                    alert("Le pilote a bien été modifié");
                } else {
                    alert("Erreur : le pilote n'a pas été correctement modifié");
                }
            } catch(e) {
                throw e;
            }
        };
        tr.insertCell().appendChild(btnModifier);

        let btnSupprimer = document.createElement('button');
        btnSupprimer.classList.add('bi','bi-backspace-fill');
        btnSupprimer.type = "submit";

        btnSupprimer.onclick = async () => {
            try {
                const res = (await axios.delete("/api/admin/pilote", {
                    data: {
                        id: pilote.id
                    }
                }));

                if (res.status === 204) {
                    alert("Le pilote a bien été supprimée");
                } else {
                    alert("Erreur : le pilote n'a pas été correctement supprimée");
                }
            } catch(e) {
                throw e;
            }
        };

        tr.insertCell().appendChild(btnSupprimer);
    }
}