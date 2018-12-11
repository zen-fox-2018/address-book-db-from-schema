class View {

    static displayHelp() {
        console.log(
        ` ============= List Command =========
         node index.js Contact <create> <name> <company> <phone> <email>
         node index.js contact <findAll>
         node index.js contact <findByid> <id>
         node index.js contact <list-group> <email>`)
    }

    static displayErr(err) {
        console.log(err)
    }

    static displaySuccess(Data) {
        console.log(Data)
    }

}

module.exports = View