
const contacts = require('./contact.js')
const View = require('./view.js')

class controller {
    static findAll(){
        contacts.showAll(function(err,data){
            if(err){
                View.showData(err)
            }else {
                View.showData(data)
            }
        })
    }

    static insert(input1,input2,input3, input4){
        contacts.insertData(input1,input2,input3, input4, function(err){
            if(err == undefined){
                View.succed('insert')
            }
            else
                View.showData(err)
                
        })
    }
    static delete(input){
        contacts.deleteData(input, function(err){
            if(err == undefined){
                View.succed('delete')
            }else{
                View.showData(err)
            }
        })
    }
}

module.exports = controller