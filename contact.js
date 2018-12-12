
const db = require('./setup.js')


class contacts {
    constructor(id,name,company,numbers, email){
        this.id =  id,
        this.name =  name,
        this.company = company,
        this.phone_number = numbers,
        this.email = email
    }

    static showAll(cb) {
        let query = `SELECT * FROM kontak`
        db.all(query,function(err, data){
            if (err){
                cb(err,null)
            }else {
                let objData = []
                for(let i = 0; i < data.length; i++){
                    objData.push(new contacts(data[i].id, data[i].name,data[i].company,data[i].phone_number, data[i].email))
                }
                cb(null,objData)
            }
        })
    }
    static insertData (input1,input2,input3, input4, callback){
        let query = `INSERT INTO kontak (
                                'name',
                                'company',
                                'phone_number',
                                'email' )
                        VALUES (
                                "${input1}",
                                "${input2}",
                                "${input3}",
                                "${input4}"
                        )`
            db.run(query, function(err){
                if(err){
                    callback(err)
                } else {
                    callback(null)
                }
            })
    }
    static deleteData (input,callback) {
        let query = `DELETE FROM kontak
                    WHERE ID = ${input}`
            db.run(query, function(err){
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
            })
    }
}

module.exports = contacts