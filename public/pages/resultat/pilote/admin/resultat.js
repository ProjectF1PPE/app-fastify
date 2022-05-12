"use strict";

window.onload = init;

async function init() {
    try {
        const data = (await axios.get("/api/resultats/pilotes/")).data;
        for (const element of data) {
            let label = document.createElement('label');
            label.id = element.id;
            label.innerText = element.nom;
            label.classList.add("rounded", "p-2", "m-1");
            label.draggable = true;
            label.ondragstart = (e) => e.dataTransfer.setData('id', e.target.id);
            if (element.groupe === null)
                equipe.appendChild(label);
            else
                document.getElementById(element.groupe).appendChild(label);
        }
    } catch (e) {
        throw e;
    }


// événement sur les balises groupeA à groupeH
for (const groupe of document.querySelectorAll('.groupe')) {
    groupe.ondragover = (e) => e.preventDefault();
    groupe.ondrop = (e) => {
        let id = e.dataTransfer.getData('id');
        let label = document.getElementById(id);
        groupe.appendChild(label);
        $.ajax({
            url: 'ajax/attribuergroupe.php',
            type: 'POST',
            data: {id: id, groupe: groupe.id},
            dataType: 'json',
            error: (reponse) => Std.afficherErreur(reponse.responseText)
        })
    }
}

// événement sur la balise 'equipe'
equipe.ondragover = (e) => e.preventDefault();
equipe.ondrop = (e) => {
    let id = e.dataTransfer.getData('id');
    let label = document.getElementById(id);
    equipe.appendChild(label);
    $.ajax({
        url: 'ajax/retirergroupe.php',
        type: 'POST',
        data: {id: id},
        dataType: 'json',
        error: (reponse) => Std.afficherErreur(reponse.responseText)
    })
}
}
