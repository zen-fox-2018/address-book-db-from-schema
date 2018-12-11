const db = require('./db')
const fs = require('fs')

function getData(path) {
    let data = fs.readFileSync(path, "utf8")
    return data
}
function executes(query, callback) {
    db.run(query,function(err) {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

function seedData() {
    // let data = getData("contacts.csv").split('\n')
    // let fields = data[0].split(",").slice(1)
    // let rows = data.slice(1)
    // rows.forEach(person => {
    //     let row = person.split(",").slice(1)
    //     let query = `
    //     INSERT INTO Contacts (${fields.join(",")}) 
    //     VALUES ("${row[0]}", "${row[1]}", "${row[2]}", "${row[3]}") `
    //     executes(query, function (err) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log(`berhasil ngeseed ke Contacts`)
    //         }
    //     })
    // })

    // let datagroup = getData("groups.csv").split('\n')
    // let fieldsgroup = datagroup[0].split(",").slice(1)
    // let rowsgroup = datagroup.slice(1)
    // rowsgroup.forEach(person => {
    //     let row = person.split(",").slice(1)
    //     let query = `
    //     INSERT INTO Groups (${fieldsgroup.join(",")}) 
    //     VALUES ("${row[0]}") `
    //     executes(query, function (err) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             console.log(`berhasil ngeseed ke Groups`)
    //         }
    //     })
    // })


    let datacontactgroup = getData("contactsGroup.csv").split('\n')
    let fieldscontactgroup = datacontactgroup[0].split(",").slice(1)
    let rowscontactgroup = datacontactgroup.slice(1)
    rowscontactgroup.forEach(person => {
        let row = person.split(",").slice(1)
        let query = `
        INSERT INTO ContactGroups (${fieldscontactgroup.join(",")}) 
        VALUES ("${row[0]}", ${row[1]}) `
        executes(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`berhasil ngeseed ke ContactGroups`)
            }
        })
    })

}

seedData()

