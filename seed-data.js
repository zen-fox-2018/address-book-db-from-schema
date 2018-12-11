const fs = require('fs');
const db = require('./dbConnect');

class seedData {

    static readFile(file, callback) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    static seedContacts(callback) {
        seedData.readFile('./contacts.csv', (err, dataContact) => {
            if (err) {
                callback(err);
            } else {

                let cp = dataContact.split('\n').slice(1);

                db.serialize(() => {
                    for (let i = 0; i < cp.length; i++) {
                        let cpSplit = cp[i].split(',');
                        
                        let insCp =
                        `
                        INSERT INTO Contacts
                        (name, company, phone, email)
                        VALUES
                        ("${cpSplit[0]}", "${cpSplit[1]}", "${cpSplit[2]}", "${cpSplit[3]}")
                        ;`;

                        db.run(insCp, (err) => {
                            if (err) {
                                console.log('ERR :', err);
                            } else {
                                console.log('Insert seed data to Contacts ...');
                            }
                        });
                    }
                });
            }
        });
    }

    static seedGroups(callback) {
        seedData.readFile('./groups.csv', (err, dataGroup) => {
            if (err) {
                callback(err);
            } else {

                let gp = dataGroup.split('\n').slice(1);
                db.serialize(() => {
                    for (let i = 0; i < gp.length; i++) {
                        let gpSplit = gp[i].split(',');
                        let insGp =
                        `
                        INSERT INTO Groups
                        (name)
                        VALUES
                        ("${gpSplit[0]}")
                        ;`;


                        db.run(insGp, (err) => {
                            if (err) {
                                console.log('ERR :', err);
                            } else {
                                console.log('Insert seed data to Groups ...');
                            }
                        });
                    }
                });
            }
        });
    }

    static seedGroupCp(callback) {
        seedData.readFile('./groupContacts.csv', (err, dataGroupCp) => {
            if (err) {
                callback(err);
            } else {

                let gcp = dataGroupCp.split('\n').slice(1);
                db.serialize(() => {
                    for (let i = 0; i < gcp.length; i++) {
                        let gcpSplit = gcp[i].split(',');
                        let insGcp =
                        `
                        INSERT INTO GroupContacts
                        (contactId, groupId)
                        VALUES
                        (${+gcpSplit[0]}, ${+gcpSplit[1]})
                        ;`;


                        db.run(insGcp, (err) => {
                            if (err) {
                                console.log('ERR :', err);
                            } else {
                                console.log('Insert seed data to GroupContacts');
                            }
                        });
                    }
                });
            }
        });
    }
}

seedData.seedContacts();
seedData.seedGroups();
seedData.seedGroupCp();