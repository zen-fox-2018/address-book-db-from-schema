class View {
  static disErr(err) {
    console.log(`Error :`, err)
  }

  static display(msg, data) {
    if(data) {
      console.log(`Success: `, msg, data)
    } else {
      console.log(`Success :` ,msg)
    }
  }

  static help() {
    console.log(`
    ===================== AVAILABLE COMMAND ===================
    node main.js <contact/ group /contactgroup> create <input>
    node main.js 
    node main.js 
    node main.js 
    node main.js 
    ===========================================================
    `)
  }
}
module.exports = View