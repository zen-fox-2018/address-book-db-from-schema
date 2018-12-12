const command = process.argv.slice(2)
const Controller = require('./controller.js')
console.log(command)
switch (command[0]) {
    case "showAll":
        Controller.findAll()
        break;
    case "insert":
    Controller.insert(command[1],command[2], command[3], command[4])
        break;
    case "delete":
    Controller.delete(command[1])
    default:
        break;
}