"use strict";

window.onload = init;

async function init() {
    try {
        await axios.post("/api/authorization", {}, {headers: {Authorization: sessionStorage.getItem("token")}});
    } catch (e) {
        window.location.href = '/';
        throw e;
    }

    let lesPays;
    try {
        const data = (await axios.get("/api/pays")).data;
        lesPays = data;

        let idPays = document.getElementById('idPays');
        for (const pays of data) {
            idPays.appendChild(new Option(pays.nom, pays.id));
        }
    } catch (e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/admin/gp")).data;
        afficherGP(data, lesPays);
    } catch (e) {
        throw e;
    }

    let btnAjouter = document.getElementById('btnAjouter');
    btnAjouter.onclick = async () => {
        let ville = document.getElementById('ville');
        if (!ville.checkValidity()) {
            alert("Vous devez entrer une ville");
            return;
        }

        let date = document.getElementById('date');
        if (!date.checkValidity()) {
            alert("Vous devez entrer une date");
            return;
        }

        let pays = document.getElementById('idPays');
        if (!pays.checkValidity()) {
            alert("Vous devez entrer un pays");
            return;
        }

        try {
            await axios.post("/api/admin/gp", {
                ville: ville.value,
                date: date.value,
                idPays: pays.value
            });

            alert("Le grand prix a bien été ajouté");
            location.reload();
        } catch (e) {
            alert("Erreur : le grand prix n'a pas été correctement ajouté");
            throw e;
        }
    };
}

function afficherGP(data, lesPays) {
    for (const gp of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = gp.id;

        let ville = document.createElement('input');
        ville.id = "villeSelectionne";
        ville.type = "text";
        ville.value = gp.ville;
        ville.required = true;
        tr.insertCell().appendChild(ville);

        let date = document.createElement("input");
        date.id = "dateSelectionne";
        date.type = "text";
        date.value = gp.date;
        date.required = true;
        tr.insertCell().appendChild(date);

        let paysListe = document.createElement('select');
        paysListe.id = "idPaysSelectionne";
        for (let pays of lesPays) {
            let option;
            if (pays.id === gp.idPays) {
                option = new Option(pays.nom, pays.id, false, true);
            } else {
                option = new Option(pays.nom, pays.id);
            }
            paysListe.appendChild(option);
        }
        paysListe.classList.add('form-select');
        tr.insertCell().appendChild(paysListe);

        let btnModifier = document.createElement('button');
        btnModifier.classList.add('bi', 'bi-pencil-square');
        btnModifier.type = "submit";

        tr.insertCell().appendChild(btnModifier);

        let btnSupprimer = document.createElement('button');
        btnSupprimer.classList.add('bi','bi-backspace-fill');
        btnSupprimer.type = "button";
        btnSupprimer.onclick = async () => {
            try {
                await axios.delete("/api/admin/gp", { data: { id: gp.id}});
                alert("Le grand prix a bien été supprimé");
                location.reload();
            } catch (e) {
                alert("Erreur: Le grand prix n'a pas été correctement supprimé");
                throw e;
            }
        }
        tr.insertCell().appendChild(btnSupprimer);
    }
}

