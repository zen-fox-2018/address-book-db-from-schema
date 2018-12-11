
const db = require('./setup.js')

class contacts {
    constructor(name,company,numbers, email){
        this.name =  name,
        this.company = company,
        this.phone_number = numbers,
        this.email = email
    }

    static showAll(input,callback) {
        let query = `SELECT * FROM ${input}`
        console.log(query)
        db.all(query,function(err,data){
            if(err){
                callback(err,null)
            }else {
                let objData = []
                for(let i = 0; i < data.length; i++){
                    objData.push(new contacts(data[i][0],data[i][1],data[i][2],data[i][3]))
                }
                callback(null,objData)
            }
        })
    }
}

module.exports = contacts