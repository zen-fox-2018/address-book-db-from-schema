const fs = require('fs')
const db = require('./setup')


function readDataContact(callback){
    fs.readFile('./database/contacts.csv', 'utf8', function(err,data){
        if(err){
            callback(err,null)
        }else {
            callback(null,data)
            //console.log(data)
        }
    })
}
//readDataContact()
function parsingData(){

 db.serialize(function(err){
     if(err){
         console.log(err)
     }else{
        readDataContact(function(err,data){
           // console.log(data)
            if(err){
                console.log(err)
            }
            else{
                let dataContact = []
                let rawData = data.split('\n').slice(1)
               // console.log(rawData)
                for(let i = 0; i < rawData.length; i++){
                    let pieceOfData = rawData[i].split(',')
                  console.log(pieceOfData)
                    const query = `INSERT INTO 'kontak'
                                   (name,company,phone_number,email)
                                   VALUES (
                                            "${pieceOfData[0]}",
                                            "${pieceOfData[1]}", 
                                            "${pieceOfData[2]}", 
                                            "${pieceOfData[3]}"                                       
                                            )`

                    db.run(query,function(err){
                        if(err){
                            console.log(err)
                        }
                    })
                }
                
            }
        })

     }
 })
}

    
parsingData()