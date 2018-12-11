const fs = require ('fs')
const db = require('./setup.js')
const Contact = require('./contact.js')
const Grup = require('./group.js')
const contactGrup = require('./contact-group.js')

class InsertDummy {
  
    
    static readFile (file, callback) {
        fs.readFile(file,"utf8", function(err, data) {
            if(err) {
                callback(err, null)
            }else{
                callback(null, data)
            }
        })
    }

    static dataReady (file, callback) {
        InsertDummy.readFile(file, function(err, data){
            if(err){
                callback(err, null)
            }else{
                let split = data.split('\n')
                let input = split.slice(1)
                callback(null, input)
            }
        })
    }


}

// let contact = ('./contact.csv')
// let grup = ('./grup.csv')
// let contactGrups = ('./contactGrup.csv')

InsertDummy.dataReady(contactGrups, function(err, data) {
    if(err) {
        console.log(err)
    }else{
        // console.log(data)
        for(let i = 0; i < data.length; i++) {
            let split = data[i].split(',')
            // console.log(split)
            contactGrup.create(split[0],split[1], function(err, data){
                if(err) {
                    console.log(err)
                }else{
                    console.log('done')
                }
            })
            

        }
    }
})

module.exports = InsertDummy;
