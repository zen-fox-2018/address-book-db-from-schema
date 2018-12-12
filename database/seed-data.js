const fs = require("fs")
const db = require("./connection.js")

function readFile(path, cb){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            cb(err, null)
        }   else{
            cb(null, data)
        }
    })
}

function saveContact(){
    readFile('./database/contacts.csv', function(err, data){
        if(err){
            console.log(err, 'ERROR!!!')
        }   else{

            parsedData = data.split("\n").slice(1)
            
            for(let i = 0; i < parsedData.length; i++){
                let arrData = parsedData[i].split(',')
                let query =
                `INSERT INTO Contacts (name, company, number, email)
                VALUES ('${arrData[0]}', '${arrData[1]}', '${arrData[2]}',' ${arrData[3]}')`

                db.run(query, function(err){
                    if(err) throw err
                })
            }
        }
    })
}

function saveGroup(){
    readFile('./database/groups.csv', function(err, data){
        if(err){
            console.log(err, 'ERROR!!!')
        }   else{

            parsedData = data.split("\n").slice(1)
            
            for(let i = 0; i < parsedData.length; i++){
                let arrData = parsedData[i]
                let query = 
                `INSERT INTO Groups(name)
                VALUES ('${arrData}')`

                db.run(query, function(err){
                    if(err) throw err
                })
            }
        }
    })
}

function saveContactGroup(){
    readFile('./database/contact_groups.csv', function(err, data){
        if(err){
            console.log(err, 'ERROR!!!')
        }   else{

            parsedData = data.split("\n").slice(1)
            
            for(let i = 0; i < parsedData.length; i++){
                let arrData = parsedData[i].split(',')
                let query =
                `INSERT INTO Contacts_Groups (Groups_id, Contacts_id)
                VALUES ('${arrData[0]}', '${arrData[1]}')`

                db.run(query, function(err){
                    if(err) throw err
                })
            }
        }
    })
}



// saveContact()
// saveGroup()
// saveContactGroup()
