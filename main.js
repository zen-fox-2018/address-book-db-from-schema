const Controller  = require('./controller.js')
const command = process.argv.slice(2)

class Index{
    constructor(command){
        this.command = command
    }

    executeCommand(){
        switch(this.command[0]){
            case 'saveContact':
                Controller.saveContact(this.command[1], this.command[2], this.command[3], this.command[4])
            break;
            case 'saveGroup':
                 Controller.saveGroup(this.command[1])
            break;
            case 'saveGroupContact':
                 Controller.saveGroupContact(this.command[1], this.command[2])
            break;
            case 'updateContact':
                Controller.updateContact(this.command[1], this.command[2], this.command[3])
            break;
            case 'updateGroups':
                Controller.updateGroup(this.command[1], this.command[2], this.command[3])
            break;
            case 'deleteContact':
                Controller.deleteContact()
            break;
            case 'deleteGroup':
                Controller.deleteGroup()
            break;
            case 'showContact':
                Controller.showContact(this.command[1])
            break;
            case 'showGroup':
                 Controller.showGroup(this.command[1])
            break;
            case 'assignContact':
                Controller.assignContact(this.command[1], this.command[2])
            break;
        }
    }
}

let action = new Index(command)
action.executeCommand()
