const db = require('./db')
const fs = require('fs')

function readFile(path) {
    return fs.readFileSync(path, 'utf8').split('\n')
}

db.serialize(() => {
    const dataContact = readFile('./contact.csv')
    for(let i = 1; i < dataContact.length; i++) {
        let data = dataContact[i].split(',')
        const qInsertDataContact = 
        `INSERT INTO Contacts (name, company, phone, email)
        VALUES("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}")`

        db.run(qInsertDataContact, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log('Success insert data to Contact Table')
            }
        })
    }

    const dataGroup = readFile('./group.csv')
    for(let i = 1; i < dataGroup.length; i++) {
        let data = dataGroup[i].split(',')
        const qInsertDataContact = 
        `INSERT INTO Groups (group_name)
        VALUES("${datac[0]}")`

        db.run(qInsertDataContact, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log('Success insert data to Group Table')
            }
        })
    }
})