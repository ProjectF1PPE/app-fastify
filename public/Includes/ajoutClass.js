window.onload=ajoutClass;

function ajoutClass() {
    const thePath = window.location.href;
    const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1);

    let ob = null;

    switch (lastItem) {
        case 'ecuries.html':
            ob = document.getElementById('ajtclassEcurie');
            break;
        case 'gp.php':
            ob = document.getElementById('ajtclassG');
            break;
        case 'classementEcurie.php ':
        case 'classementPilote.php':
            ob = document.getElementById('ajtclassClassement');
            break;
        case 'pilote.html':
            ob = document.getElementById('ajtPilote');
            break;
    }

    if (ob != null){
        ob.classList.add('active');
    }

}
