
const db = require("./db");
const fs = require("fs");

function readFile(file) {
    const read = fs.readFileSync(file, "utf8");

    return read;
}

db.serialize(function() {
    let contacts = readFile("contacts.csv").split("\n").slice(1);
    for(let i = 0; i < contacts.length; i++) {
        let splitted = contacts[i].split(",");
        let insert = `INSERT INTO Contacts(name, company, phone_number,email)
                      VALUES("${splitted[0]}", "${splitted[1]}", "${splitted[2]}", "${splitted[3]}");`
        db.run(insert, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("seed data contacts")
            }
        })
    }

    let groups = readFile("groups.csv").split("\n").slice(1);
    for(let i = 0; i < groups.length; i++) {
        let insertGroups = `INSERT INTO Groups(group_name)
                            VALUES("${groups[i]}");`
        db.run(insertGroups, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("seed data groups")
            }
        })
    }

    let contact_group = readFile("contact-groups.csv").split("\n").slice(1);
    for(let i = 0; i < contact_group.length; i++) {
        let splitted = contact_group[i].split(",");
        let insertConjc = `INSERT INTO groups_contacts (groupsId, contactsId)
                           VALUES(${splitted[0]}, ${splitted[1]});`
        db.run(insertConjc, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("seed data table conjunction")
            }
        })
    }
})