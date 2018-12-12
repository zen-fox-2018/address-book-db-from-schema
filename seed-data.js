const fs = require('fs');
const contact = require('./Models/contact.js')
const contactGroup = require("./Models/contact-group.js")
function readData(path, callback) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
}

function createDataContact() {
    readData("./contact.csv", function(err, dataContact) {
        if (err) {
            console.log(err)
        } else {
            let dataSplit = dataContact.split("\n")
            for (let i = 1; i <= dataSplit.length-1; i++) {
                let theData = dataSplit[i].split(',')
                contact.insertContact(theData[0], theData[1], theData[2], theData[3], function(err) {
                    if (err) {
                        console.log(err)
                    }
                })            
            }
        }
    })
}
function createContactGroup() {
    readData("./contactGrup.csv", function(err, dataContactGroup) {
        if (err) {
            console.log(err)
        } else {
            let dataSplit = dataContactGroup.split("\n");
            for (let i = 1; i <= dataSplit.ldength-1; i++) {
                let theData = dataSplit[i].split(",");
                contactGroup.insertContactGroup(theData[0], theData[1], function(err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
    })
}
// createDataContact()
// createContactGroup()
