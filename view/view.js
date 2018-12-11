class View {
    static showErrorMessage(msg){
        console.log('ini adalah error',msg)
    }

    static showMessage(msg){
        console.log(msg)
    }

    static showSuccessMessage(data){
        let totalData = data.length
        let lastIndex = data.length-1
        console.log(`save contact success, data is ${JSON.stringify(data[lastIndex])}`)
        console.log(`total data = ${totalData}`)

    }

    static showDeleteMessage(data){
        let totalData = data.length
        console.log(`data is deleted, total data now = ${totalData}`)
    }
}

module.exports = View