class View {
    static displayError(msg, err) {
        console.log(msg)
        console.log(err)
    }
    
    static displaySuccess(msg) {
        console.log(msg)
    }

    static alert(msg) {
        console.log(msg)
    }

    static help() {
        console.log('========== Address Book Command Center ==========')
        console.log('Table List: ')
        console.log('contact')
        console.log('group')
        console.log('=================================================')
    }
}

module.exports = View
