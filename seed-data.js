const fs = require(`fs`)
const db = require(`./db`)
let contactsData = fs.readFileSync(`contacts.csv`, `utf8`)
let groupsData = fs.readFileSync(`groups.csv`, `utf8`)

contactsData = contactsData.split(`\n`)
contactsData = contactsData.slice(1)
contactsData = contactsData.filter(function (e) {
    return e != ''
})

groupsData = groupsData.split(`\n`)
groupsData = groupsData.slice(1)
groupsData = groupsData.filter(function (e) {
    return e != ''
})

for (let i = 0; i < contactsData.length; i++) {
    contactsData[i] = contactsData[i].split(`,`)
}

for (let i = 0; i < groupsData.length; i++) {
    groupsData[i] = groupsData[i].split(`,`)
    
}


db.serialize(function () {
    for (let i = 0; i < contactsData.length; i++) {
        contactsData[i][2] = contactsData[i][2].split(`-`)
        contactsData[i][2] = contactsData[i][2].join(``)
        console.log(contactsData);
        

        let qInsertContact = `INSERT INTO Contacts (
            name, company_name, telephone_number, email
        ) VALUES (
            "${contactsData[i][0]}", "${contactsData[i][1]}", ${Number(contactsData[i][2])}, "${contactsData[i][3]}"
        );`        
        db.run(qInsertContact, function (err) {
            err ? console.log(err) : console.log(`adding contacts...`);
            
        })
    }

    for (let j = 0; j < groupsData.length; j++) {
        let qInsertGroup = `INSERT INTO Groups (
          name  
        ) VALUES (
            "${groupsData[j][0]}"
        );`
        db.run(qInsertGroup, function (err) {
            err ? console.log(err) : console.log(`adding groups`);
            
        })
    }
})

db.close()





