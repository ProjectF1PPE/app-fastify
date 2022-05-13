"use strict";

window.onload = init;

async function init() {
    try {
        await axios.post("/api/authorization", {}, {headers: {Authorization: sessionStorage.getItem("token")}});
    } catch (e) {
        alert("Votre session a expiré");
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
        const data = (await axios.get("/api/gp")).data;
        afficherGp(data);
    } catch (e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }
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
            const res = (await axios.post("/api/admin/gp", {
                ville: ville.value,
                date: date.value,
                idPays: pays.value
            }));

            if (res.status === 204) {
                alert("Le grand prix a bien été ajouté");
                location.reload();
            } else {
                alert("Erreur : le grand prix n'a pas été correctement ajouté");
            }
        } catch (e) {
            throw e;
        }
    };
}

function afficherGp(data) {

    for (const gp of data) {

        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = gp.id;


        let date = document.createElement("input");
        date.id = "dateSelectionne";
        date.type = "text";
        date.value = gp.date;
        tr.insertCell().appendChild(date);

        let ville = document.createElement('input');
        ville.id = "circuitSelectionne";
        ville.type = "text";
        date.value = gp.ville;
        tr.insertCell().appendChild(ville);

        let paysListe = document.createElement('select');
        paysListe.id = "idPaysSelectionne";

        for (let lesPay of lesPays) {
            let option;
            if (lesPay.id === gp.idPays) {
                option = new Option(lesPay.nom, lesPay.id, false, true);
            } else {
                option = new Option(lesPay.nom, lesPay.id);
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
                await axios.delete("/api/admin/gp", {
                    data: {
                        id: gp.id
                    }
                });

                alert("L'écurie a bien été supprimée");
                location.reload();
            } catch (e) {
                alert("Erreur: L'écurie n'a pas été correctement supprimée");
                throw e;
            }
        }
        tr.insertCell().appendChild(btnSupprimer);
    }



}

