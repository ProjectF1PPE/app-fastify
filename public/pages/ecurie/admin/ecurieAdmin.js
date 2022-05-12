"use strict";

let id = 'fr';
let lesPays = [];
let lesPilotes = [];

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/pays")).data;
        lesPays = data;
        remplirLesPays(data);
    } catch (e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/pilotes")).data;
        lesPilotes = data;
    } catch (e) {
        throw e;
    }

    try {
        const data = (await axios.get("/api/admin/ecuries")).data;
        remplirLesEcuries(data);
    } catch (e) {
        throw e;
    }

    btnAjouter.onclick = async () => {
        if (!nom.checkValidity()) {
            alert("Vous devez entrer un nom");
            return;
        }

        try {
            const res = (await axios.post("/api/admin/ecurie", {
                nom: nom.value,
                idPays: id
            }));

            if (res.status === 204) {
                alert("L'écurie a bien été ajouté");
                location.reload();
            } else {
                alert("Erreur : l'écurie n'a pas été correctement ajouté");
            }
        } catch (e) {
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
        console.log(pays.id);
    }
}

async function remplirLesEcuries(data) {
    for (const ecurie of data) {
        console.log(ecurie);

        let tr = document.getElementById("lesLignes").insertRow();

        tr.insertCell().innerText = ecurie.idEcurie;

        let nomChamp = document.createElement("input");
        nomChamp.id = "nomSelectionne";
        nomChamp.type = "text";
        nomChamp.value = ecurie.nomEcurie;
        nomChamp.setAttribute("required", "true");
        tr.insertCell().appendChild(nomChamp);

        let img = new Image()
        img.src = "/pages/ecurie/admin/img/" + ecurie.idEcurie + ".png"
        img.onerror = () => {
            img.src = "/pages/ecurie/admin/img/default.png"
        }
        tr.insertCell().appendChild(img);

        let paysListe = document.createElement('select');
        paysListe.id = "idPaysSelectionne";

        for (let lesPay of lesPays) {
            let option;
            if (lesPay.id === ecurie.idPays) {
                option = new Option(lesPay.nom, lesPay.id, false, true);
            } else {
                option = new Option(lesPay.nom, lesPay.id);
            }
            paysListe.appendChild(option);
        }

        paysListe.classList.add('form-select');
        tr.insertCell().appendChild(paysListe);

        ecurie.pilotes.sort((piloteA, piloteB) => {
            return piloteA.ordre - piloteB.ordre
        });

        for (let i = 0; i < 3; i++) {
            let selectPilotes = document.createElement('select');
            selectPilotes.id = "idPiloteSelectionne" + i;

            let aucunPiloteOption = new Option("Aucun");
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

        /*
        for (let pilote of ecurie.pilotes) {
            tr.insertCell().innerText = pilote.nom;
        }

         */

        let btnModifier = document.createElement('button');
        btnModifier.classList.add('bi', 'bi-pencil-square');
        btnModifier.type = "submit";

        btnModifier.onclick = async () => {
            if (!document.getElementById("nomSelectionne").checkValidity()) {
                alert("Vous devez mettre un nom");
                return;
            }

            try {
                let changedData = {
                    id: ecurie.idEcurie
                };

                let changedName = document.getElementById('nomSelectionne').value;
                if (changedName !== ecurie.nom) {
                    changedData.nom = changedName;
                }

                let changedIdPays = document.getElementById('idPaysSelectionne').value;
                if (changedIdPays !== ecurie.idPays) {
                    changedData.idPays = changedIdPays;
                }

                let changedPilotes = [];
                for (let i = 0; i < 3; i++) {
                    let pilote = document.getElementById('idPiloteSelectionne' + i).value;
                    if (pilote !== undefined) {
                        changedPilotes.push({
                            id: pilote,
                            ordre: i+1
                        });
                    }
                }

                changedData.pilotes = changedPilotes;

                console.log(changedData);

                const res = (await axios.put("/api/admin/ecurie", {
                    data: changedData
                }));

                if (res.status === 204) {
                    alert("L'écurie a bien été modifiée");
                    //location.reload();
                } else {
                    alert("Erreur : l'écurie n'a pas été correctement modifiée");
                }
            } catch (e) {
                throw e;
            }
        };

        tr.insertCell().appendChild(btnModifier);


        let btnSupprimer = document.createElement('button');
        btnSupprimer.classList.add('bi','bi-backspace-fill');
        btnSupprimer.type = "submit";

        btnSupprimer.onclick = async () => {
            try {
                const res = (await axios.delete("/api/admin/ecurie", {
                    data: {
                        id: ecurie.id
                    }
                }));

                if (res.status === 204) {
                    alert("L'écurie a bien été supprimée");
                    location.reload();
                } else {
                    alert("Erreur : l'écurie n'a pas été correctement supprimée");
                }
            } catch (e) {
                throw e;
            }
        }
        tr.insertCell().appendChild(btnSupprimer);
    }

}



