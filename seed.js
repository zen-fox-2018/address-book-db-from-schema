const fs = require('fs')
const db = require('./db')

function read(file) {
    return fs.readFileSync(file, 'utf8').split('\n')
}

let Contacts = read('contacts.csv')
let Groups = read('groups.csv')

db.serialize(() => {
    for (let i = 1; i < Contacts.length; i++) {
        let split = Contacts[i].split(',')
        let query = `
        INSERT INTO Contacts (${Contacts[0]})
        VALUES
        ("${split[0]}", "${split[1]}", "${split[2]}", "${split[3]}")`
        db.run(query, (err) => {
            err? console.log(err): console.log('success input contact');
        })
    }

    for (let i = 1; i < Groups.length; i++) {
        let split = Groups[i].split(',')
        let query = `
        INSERT INTO Groups (${Groups[0]})
        VALUES
        ("${split[0]}")`
        db.run(query, (err) => {
            err? console.log(err): console.log('success input group');
        })
    }
})