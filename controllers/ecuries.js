const mysql = require("mysql2/promise");

const getEcuries = async (req, reply) => {
    const connection = await mysql.createConnection({
        host: 'casf1_db_1',
        user: 'root',
        password: '3M75B4fKWbsr',
        database: 'f1'
    })

    connection.connect();

    /*

    connection.promise().query('SELECT id, nom, photo, idPays from ecurie')
        .then(([ecuries, fields]) => {
            connection.promise().query('SELECT id, nom, prenom, ordre, idEcurie from pilote')
                .then(([pilotes, pilotesFields]) => {
                    connection.promise().query('SELECT id, nom from pays')
                        .then(([pays, paysFields]) => {
                            let result = [];

                            console.log(ecuries);
                            console.log(pays);
                            console.log(pilotes);

                            for (let ecurie of ecuries) {

                                let nomPays = "Pays non trouvé";
                                for (let pays of pays) {
                                    if (pays.id === ecurie.idPays) {
                                        nomPays = pays.nom;
                                    }
                                }

                                let pilote1 = "";
                                let pilote2 = "";
                                let pilote3 = "";

                                for (let pilote of pilotes) {
                                    if (pilote.idEcurie === ecurie.id) {
                                        if (pilote.ordre === 1) {
                                            pilote1 = pilote.nom + " " + pilote.prenom;
                                        } else if (pilote.ordre === 2) {
                                            pilote2 = pilote.nom + " " + pilote.prenom;
                                        } else if (pilote.ordre === 3) {
                                            pilote3 = pilote.nom + " " + pilote.prenom;
                                        }
                                    }
                                }

                                result.push({
                                    id: ecurie.id,
                                    nom: ecurie.nom,
                                    nomPays: nomPays,
                                    pilote1: pilote1,
                                    pilote2: pilote2,
                                    pilote3: pilote3
                                });
                            }

                            reply.send(result);
                        })
                })
        })

     */

    let ecuries = await connection.query('SELECT id, nom, photo, idPays from ecurie');
    let pilotes = await connection.query('SELECT id, nom, prenom, ordre, idEcurie from pilote');
    let pays = await connection.query('SELECT id, nom from pays');

    let result = [];

    console.log(ecuries);
    console.log(pays);
    console.log(pilotes);

    for (const ecurie of ecuries) {
        console.log("ecurie: " + ecurie.id + " - " + ecurie.nom);

        let nomPays = "Pays non trouvé";
        for (const unPays of pays) {
            console.log(unPays);

            if (unPays.id == ecurie.idPays) {
                nomPays = unPays.nom;
            }
        }

        let pilotes = [];

        for (const pilote of pilotes) {
            if (pilote.idEcurie == ecurie.id) {
                pilotes.push(pilote.nom + " " + pilote.prenom);
            }
        }

        result.push({
            "id": ecurie.id,
            "nom": ecurie.nom,
            "nomPays": nomPays,
            "pilotes": pilotes
        });
    }

    console.log(result);

    reply.send(result);

    // id ecurie
    // nom ecurie
    // nom du pays
    // pilote1
    // pilote2
    // pilote3

    connection.end();
}

const getEcurie = (req, reply) => {
    const { id } = req.params

    const ecurie = ecuries.find((ecurie) => ecurie.id === id)

    reply.send(ecurie)
}

const addEcurie = (req, reply) => {
    const { name } = req.body
    const ecurie = {
        id: '1',
        name,
    }

    ecuries = [...ecuries, ecurie]

    reply.code(201).send(ecurie)
}

const deleteEcurie = (req, reply) => {
    const { id } = req.params

    ecuries = ecuries.filter((ecurie) => ecurie.id !== id)

    reply.send({ message: `Ecurie ${id} has been removed` })
}

const updateEcurie = (req, reply) => {
    const { id } = req.params
    const { name } = req.body

    ecuries = ecuries.map((ecurie) => (ecurie.id === id ? { id, name } : ecurie))

    ecurie = ecuries.find((ecurie) => ecurie.id === id)

    reply.send(ecurie)
}

module.exports = {
    getEcuries,
    getEcurie,
    addEcurie,
    deleteEcurie,
    updateEcurie,
}