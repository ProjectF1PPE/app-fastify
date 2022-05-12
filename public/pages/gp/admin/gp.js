"use strict";

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
        const data = (await axios.get("/api/gp")).data;
        afficherGp(data);
    } catch(e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }
        try {
            const res = (await axios.post("/api/admin/gp", {
                nom: nom.value,
                date: date.value,
                circuit : ville.value,
                idPays: id
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

    for (const Gp of data) {

        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = gp.id;

        let nomChamp = document.createElement("input");
        nomChamp.id = "nomSelectionne";
        nomChamp.type = "text";
        nomChamp.value = ecurie.nomEcurie;
        nomChamp.setAttribute("required", "true");
        tr.insertCell().appendChild(nomChamp);

        let date = document.createElement("input");
        date.id = "dateSelectionne";
        date.type = "text"
        date.value = gp.date;
        tr.insertCell().appendChild(date);

        let circuitListe = document.createElement('select');
        circuitListe.id = "circuitSelectionne";

        for (let lesCircuits of lesCircuits) {
            let option;
            if (lesCircuits.id === gp.id) {
                option = new Option(lesCircuits.nom, lesCircuits.id, false, true);
            } else {
                option = new Option(lesCircuits.nom, lesCircuits.id);
            }
            lesCircuits.appendChild(option);
        }

        circuitListe.classList.add('form-select');
        tr.insertCell().appendChild(circuitListe);

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

    }
}
