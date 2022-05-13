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
        const data = (await axios.get("/api/admin/pilote")).data;
        remplirAjouter(data.pays, data.ecuries);
        remplirLesPilotes(data.pilotes, data.pays, data.ecuries);
    } catch(e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        let id = document.getElementById('ajouterId');
        if (!id.checkValidity()) {
            alert("Vous devez entrer un numéro");
            return;
        }

        let nom = document.getElementById('ajouterNom');
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }

        let prenom = document.getElementById('ajouterPrenom');
        if (!prenom.checkValidity()) {
            alert("Vous devez entrer un prenom");
            return;
        }

        let ordre = document.getElementById('ajouterOrdre');
        if (!ordre.checkValidity()) {
            alert("Vous devez entrer l'ordre");
            return;
        }

        let dateNaissance = document.getElementById('ajouterDateNaissance');
        if (!dateNaissance.checkValidity()) {
            alert("Vous devez entrer une date de naissance");
            return;
        }

        let ecurie = document.getElementById('ajouterEcurie');
        if (!ecurie.checkValidity()) {
            alert("Vous devez selectionner une ecurie");
            return;
        }

        let pays = document.getElementById('ajouterPays');
        if (!pays.checkValidity()) {
            alert("Vous devez selectionner un pays");
            return;
        }

        try {
            await axios.post("/api/admin/pilote", {
                id: id.value,
                nom: nom.value,
                prenom: prenom.value,
                ordre: ordre.value,
                dateNaissance: dateNaissance.value,
                idEcurie: ecurie.value,
                idPays: pays.value
            });

            alert("Le pilote a bien été ajouté");
            location.reload();
        } catch(e) {
            alert("Erreur : le pilote n'a pas été correctement ajouté");
            throw e;
        }
    };
}

function remplirAjouter(pays, ecuries) {
    let ajouterPays = document.getElementById('ajouterPays');
    for (const unPays of pays) {
        ajouterPays.appendChild(new Option(unPays.nom, unPays.id));
    }

    let ajouterEcurie = document.getElementById('ajouterEcurie');
    for (const uneEcurie of ecuries) {
        ajouterEcurie.appendChild(new Option(uneEcurie.nom, uneEcurie.id));
    }
}

function remplirLesPilotes(pilotes, pays, ecuries) {
    for (const pilote of pilotes) {
        let tr = document.getElementById("lesLignes").insertRow();

        let idChamp = document.createElement("input");
        idChamp.id = "idSelectionne" + pilote.id;
        idChamp.type = "text";
        idChamp.value = pilote.id;
        idChamp.required = true;
        tr.insertCell().appendChild(idChamp);

        let nomChamp = document.createElement("input");
        nomChamp.id = "nomSelectionne" + pilote.id;
        nomChamp.type = "text";
        nomChamp.value = pilote.nom;
        nomChamp.required = true;
        tr.insertCell().appendChild(nomChamp);

        let prenomChamp = document.createElement("input");
        prenomChamp.id = "prenomSelectionne" + pilote.id;
        prenomChamp.type = "text";
        prenomChamp.value = pilote.prenom;
        prenomChamp.required = true;
        tr.insertCell().appendChild(prenomChamp);

        let paysChamp = document.createElement('select');
        paysChamp.id = "idPaysSelectionne" + pilote.id;
        paysChamp.classList.add('form-select');
        for (const unPays of pays) {
            let option;
            if (pilote.idPays == unPays.id) {
                option = new Option(unPays.nom, unPays.id, false, true);
            } else {
                option = new Option(unPays.nom, unPays.id);
            }
            paysChamp.appendChild(option);
        }
        tr.insertCell().appendChild(paysChamp);

        let ecurieChamp = document.createElement('select');
        ecurieChamp.id = "idEcurieSelectionne" + pilote.id;
        ecurieChamp.classList.add('form-select');
        for (const uneEcurie of ecuries) {
            let option;
            if (pilote.idEcurie == uneEcurie.id) {
                option = new Option(uneEcurie.nom, uneEcurie.id, false, true);
            } else {
                option = new Option(uneEcurie.nom, uneEcurie.id);
            }
            ecurieChamp.appendChild(option);
        }
        tr.insertCell().appendChild(ecurieChamp);

        let ordreChamp = document.createElement("input");
        ordreChamp.id = "ordreSelectionne" + pilote.id;
        ordreChamp.type = "text";
        ordreChamp.value = pilote.ordre;
        ordreChamp.required = true;
        tr.insertCell().appendChild(ordreChamp);

        let btnModifier = document.createElement('button');
        btnModifier.classList.add('bi', 'bi-pencil-square');
        btnModifier.type = "submit";

        btnModifier.onclick = async () => {
            try {
                await axios.put("/api/admin/pilote", {id: pilote.id});
                alert("Le pilote a bien été modifié");
            } catch(e) {
                alert("Erreur : le pilote n'a pas été correctement modifié");
                throw e;
            }
        };
        tr.insertCell().appendChild(btnModifier);

        let btnSupprimer = document.createElement('button');
        btnSupprimer.classList.add('bi','bi-backspace-fill');
        btnSupprimer.type = "submit";
        btnSupprimer.onclick = async () => {
            try {
                await axios.delete("/api/admin/pilote", {
                    data: {
                        id: pilote.id
                    }
                });
                alert("Le pilote a bien été supprimé");
                location.reload();
            } catch(e) {
                alert("Erreur : le pilote n'a pas été correctement supprimé");
                throw e;
            }
        };

        tr.insertCell().appendChild(btnSupprimer);
    }
}