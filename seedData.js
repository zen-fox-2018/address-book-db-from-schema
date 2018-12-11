const fs = require('fs')
const db = require('./Database/Connector')

class seedData {
    static readData(pathFile, callback){
        fs.readFile(pathFile, 'utf8', (err, data)=> {
            if(err) callback(err, null)
            else callback(null, data)
        })
    }

    static getDataContact(callback) {
        seedData.readData('contacts.csv', (err,data)=> {
            if(err) callback(err)
            else {
                let datasplit= data.split('\n').slice(1)
                let resultdata =''
                db.serialize(()=> {
                    for(let i = 0; i < datasplit.length ; i++){
                        resultdata = datasplit[i].split(',')
                        db.run(`INSERT INTO contacts VALUES (
                              null,
                             "${resultdata[0]}", 
                             "${resultdata[1]}", 
                             "${resultdata[2]}",
                             "${resultdata[3]}")`, 
                             (err)=> {
                                if(err) console.log(err);
                                else console.log('Success Add Data');
                                
                             })
                    }
                })
                
                callback(null)
            }
        })
    }
    static getDataGroup(callback) {
        seedData.readData('groups.csv', (err,data)=> {
            if(err) callback(err)
            else {
                let datasplit= data.split('\n').slice(1)
                let resultdata =''
                db.serialize(()=> {
                    for(let i = 0; i < datasplit.length ; i++){
                        resultdata = datasplit[i].split(',')
                        console.log(resultdata);
                        
                        db.run(`INSERT INTO groups VALUES (
                              null,
                             "${resultdata[0]}" 
                               )`, 
                             (err)=> {
                                if(err) console.log(err);
                                else console.log('Success Add Data');
                                
                             }) 
                    }
                })
               
                callback(null)
            }
        })
    }

    static getDataContactGroup(callback) {
        seedData.readData('contactsgroup.csv', (err,data)=> {
            if(err) callback(err)
            else {
                
                let datasplit= data.split('\n').slice(1)
                let resultdata =''
                db.serialize(()=> {
                    for(let i = 0; i < datasplit.length ; i++){
                        resultdata = datasplit[i].split(',')
                        console.log(resultdata);
                        
                        db.run(`INSERT INTO contactgroups VALUES (
                              null,
                             ${Number(resultdata[0])},
                             ${Number(resultdata[1])} 
                               )`, 
                             (err)=> {
                                if(err) console.log(err);
                                else console.log('Success Add Data');
                                
                             })
                      
                        
                    }
                })
                callback(null)
            }
        })
    }
    
}


db.serialize(()=> {

    seedData.getDataContact((err)=> {
        if(err) console.log(err);
        else {
            console.log('Now Add Data to database');
            
        }
    })

    seedData.getDataGroup((err)=> {
        if(err) console.log(err);
        else {
            console.log('Now Add Data to database');
        }
    })

    seedData.getDataContactGroup((err)=> {
        if(err) console.log(err);
        else {
            console.log('Now Add Data to database');
        }
    })
})