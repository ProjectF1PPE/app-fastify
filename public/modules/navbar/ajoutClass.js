window.onload=ajoutClass;

function ajoutClass() {
    const thePath = window.location.href;
    const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1);

    let ob = null;

    switch (lastItem) {
        case 'ecuries.html':
            ob = document.getElementById('ecuries');
            break;
        case 'gp.html':
            ob = document.getElementById('gp');
            break;
        case "classementEcuries.php":
        case 'classementPilote.php':
            ob = document.getElementById('classement');
            break;
        case 'pilotes.html':
            ob = document.getElementById('pilotes');
            break;
    }

    if (ob != null){
        ob.classList.add('active');
    }
}
