const argv = process.argv.slice(2);
const Controller = require('./controller.js');

class Main {
    constructor(command) {
        this.command = command;
        this.mainCommand();
    }

    mainCommand() {
        switch (this.command) {
            case 'showContact':
                Controller.showContact();
                break;
        
            default:
                break;
        }
    }
}

const main = new Main(argv[0]);