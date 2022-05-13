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

        try {
            const res = (await axios.post("/api/admin/pilote", {
                idPays: id,
                nom: nom.value,
                prenom: prenom.value,
                id: id.value,
                ordre: ordre.value,
                idEcurie: idEcurie.value
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

        let img = document.createElement('img');
        img.src = '/pages/pilote/ressource/pays/' + pilote.idPays + '.png';
        img.style.width = "40px";
        img.style.height = "25px";
        img.alt = "";
        tr.insertCell().appendChild(img);

        tr.insertCell().innerText = pilote.idEcurie;

        tr.insertCell().innerText = pilote.ordre;


        let btnSupprimer = document.createElement('button');
        btnSupprimer.innerHTML = "Supprimer";
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