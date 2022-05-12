"use strict";

window.onload = init;

// chargement des données
async function init() {
    try {
        await axios.post("/api/authorization", {}, { headers: {Authorization: sessionStorage.getItem("token")}});
    } catch (e) {
        alert("Votre session a expiré");
        window.location.href='/';
        throw e;
    }

    let lesPays;
    let lesPilotes;

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
        const res = await axios.get("/api/pilotes");
        lesPilotes = res.data;
    } catch (e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/admin/ecuries")).data;
        await remplirLesEcuries(data, lesPays, lesPilotes);
    } catch (e) {
        throw e;
    }

    //évenement sur le clique du bouton Ajouter qui vérifie la conformité du nom et envoit la requête au serveur
    btnAjouter.onclick = async () => {
        let nom = document.getElementById('nom');
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }

        let pays = document.getElementById('idPays');
        if (!pays.checkValidity()) {
            alert("Vous devez entrer un pays");
            return;
        }

        try {
            await axios.post("/api/admin/ecurie", {
                nom: nom.value,
                idPays: pays.value
            });

            alert("L'écurie a bien été ajouté");
            location.reload();
        } catch (e) {
            alert("Erreur : l'écurie n'a pas été correctement ajouté");
            throw e;
        }
    };
}

// créer le tableau des ecuries avec la possibilité de modifier directement dans le tableau et de pouvoir supprimer
async function remplirLesEcuries(data, lesPays, lesPilotes) {
    for (const ecurie of data) {
        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = ecurie.idEcurie;

        let nomChamp = document.createElement("input");
        nomChamp.id = "nomSelectionne" + ecurie.idEcurie;
        nomChamp.type = "text";
        nomChamp.value = ecurie.nomEcurie;
        nomChamp.required = true;
        tr.insertCell().appendChild(nomChamp);

        let img = new Image()
        img.src = "/pages/ecurie/admin/img/" + ecurie.idEcurie + ".png";
        img.onerror = () => {
            img.src = "/pages/ecurie/admin/img/default.png"
        }
        tr.insertCell().appendChild(img);

        // zone de liste avec tous les pays dans le tableau
        let paysListe = document.createElement('select');
        paysListe.id = "idPaysSelectionne" + ecurie.idEcurie;
        paysListe.classList.add('form-select');

        for (const pays of lesPays) {
            let option;
            if (pays.id === ecurie.idPays) {
                option = new Option(pays.nom, pays.id, false, true);
            } else {
                option = new Option(pays.nom, pays.id);
            }
            paysListe.appendChild(option);
        }

        tr.insertCell().appendChild(paysListe);

        /*
        ecurie.pilotes.sort((piloteA, piloteB) => {
            return piloteA.ordre - piloteB.ordre
        });

         */

        for (let i = 0; i < 3; i++) {
            let selectPilotes = document.createElement('select');
            selectPilotes.id = "idPiloteSelectionne" + ecurie.idEcurie + i;

            let aucunPiloteOption = new Option("Aucun", "-1");
            selectPilotes.appendChild(aucunPiloteOption);

            let piloteEcurie = ecurie.pilotes[i];
            if (piloteEcurie === undefined) {
                aucunPiloteOption.selected = true;
            }

            for (const pilote of lesPilotes) {
                let option;
                if (piloteEcurie !== undefined && piloteEcurie.id == pilote.id) {
                    option = new Option(pilote.nom + " " + pilote.prenom, pilote.id, true, true);
                } else {
                    option = new Option(pilote.nom + " " + pilote.prenom, pilote.id);
                }

                selectPilotes.appendChild(option);
            }

            selectPilotes.classList.add('form-select');
            tr.insertCell().appendChild(selectPilotes);
        }

        let btnModifier = document.createElement('button');
        btnModifier.classList.add('bi', 'bi-pencil-square');
        btnModifier.type = "button";
        btnModifier.onclick = async () => {
            let changedName = document.getElementById('nomSelectionne' + ecurie.idEcurie);
            if (!changedName.checkValidity()) {
                alert("Erreur: Vous devez mettre un nom");
                return;
            }

            try {
                let changedData = {
                    id: ecurie.idEcurie
                };

                if (changedName.value !== ecurie.nom) {
                    changedData.nom = changedName.value;
                }

                let changedIdPays = document.getElementById('idPaysSelectionne' + ecurie.idEcurie).value;
                if (changedIdPays !== ecurie.idPays) {
                    changedData.idPays = changedIdPays;
                }

                let changedPilotes = [];
                let removedPilotes = [];

                console.log(lesPilotes);

                for (let i = 0; i < 3; i++) {
                    let pilote = document.getElementById('idPiloteSelectionne' + ecurie.idEcurie + i).value;

                    console.log("i=" + i);
                    console.log(pilote);

                    if (pilote == "-1") {
                        for (let everyPilote of lesPilotes) {
                            if (everyPilote.idEcurie == ecurie.idEcurie && everyPilote.ordre == (i+1)) {
                                removedPilotes.push(everyPilote.id);
                                console.log('add removed pilote');
                                console.log(everyPilote);
                            }
                        }
                        continue;
                    }

                    changedPilotes.push({
                        id: pilote,
                        ordre: i+1
                    });
                }

                changedData.removedPilotes = removedPilotes;
                changedData.pilotes = changedPilotes;

                console.log(changedData);

                await axios.put("/api/admin/ecurie", {
                    data: changedData
                });

                alert("L'écurie a bien été modifiée");
                //location.reload();

            } catch (e) {
                alert("Erreur : l'écurie n'a pas été correctement modifiée");
                throw e;
            }
        };

        tr.insertCell().appendChild(btnModifier);

        let btnSupprimer = document.createElement('button');
        btnSupprimer.classList.add('bi','bi-backspace-fill');
        btnSupprimer.type = "button";
        btnSupprimer.onclick = async () => {
            try {
                await axios.delete("/api/admin/ecurie", {
                    data: {
                        id: ecurie.idEcurie
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



