let mysql = require('server')

function ecuries() {
    return [
        {
            id: '1',
            nom: 'Mercedes',
            pilotes: [
                {id: '1', nom: 'Gasly', prenom: 'Pierre'},
                {id: '2', nom: 'Eeeee', prenom: ''},
            ]
        },
        {
            id: '2',
            nom: 'Mercedes',
            pilotes: [
                {id: '1', nom: 'Gasly', prenom: 'Pierre'},
                {id: '2', nom: 'Eeeee', prenom: ''},
            ]
        },
    ];
}

module.exports = ecuries();