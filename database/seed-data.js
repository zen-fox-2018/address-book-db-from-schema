const db = require('./connection.js')
const fs = require('fs')
// const Contact = require('../models/Contact.js')

function readDocumentContact(cb){
    fs.readFile('./database/contacts.csv', 'utf8', function(err,data){
        if(err){
            cb(err, null)
        }
        else {
            cb(null,data)
        }
    })
}

function parsingAndInsertIntoTable(){
    db.serialize(function(){
        readDocumentContact(function (err, data){
            if(err){
                console.log(err)
            }
            else {
                let rawData = data.split('\n').slice(1)
                // console.log(rawData)
                for(let i = 0; i < rawData.length; i++){
                    let singleRawData = rawData[i].split(',')
                    let query = `INSERT INTO Contacts(name,company,phone,email)
                    VALUES (
                        "${singleRawData[0]}",
                        "${singleRawData[1]}",
                        "${singleRawData[2]}",
                        "${singleRawData[3]}"
                    )`
                    db.run(query, function(err){
                        if(err){
                            console.log(err)
                        }
                        else {
                            // console.log(null)
                        }
                    })
                    
                }
                
            }
        })
    })
    
}

parsingAndInsertIntoTable()