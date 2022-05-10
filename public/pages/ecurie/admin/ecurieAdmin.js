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
        if (id === undefined) {
            return;
        }

        try {
            const res = (await axios.post("/api/admin/ecurie", {
                nom: nom.value,
                idPays: id
            }));

            if (res.status === 204) {
                alert("L'écurie a bien été ajouté");
            } else {
                alert("Erreur : l'écurie n'a pas été correctement ajouté");
            }
        } catch(e) {
            throw e;
        }
    };

    btnSupprimer.onclick = async () => {
        if (id === undefined) {
            return;
        }

        try {
            const res = (await axios.delete("/api/admin/ecurie", {
                id: id
            }));

            if (res.status === 204) {
                alert("L'écurie a bien été ajouté");
            } else {
                alert("Erreur : l'écurie n'a pas été correctement ajouté");
            }
        } catch(e) {
            throw e;
        }
    };

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
    }
}



