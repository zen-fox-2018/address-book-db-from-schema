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
    node main.js <contact/ group /contactgroup> add <input>
    node main.js <contact/ group /contactgroup> update <email> <field> <value>
    node main.js <contact/ group /contactgroup> delete <input>
    node main.js <contact/ group /contactgroup> show
    node main.js <group> invite <group_id> <contact_email>
    contact => name,company,phone,email
    group => name
    contactGroup => <contactId, groupId>
    ===========================================================
    `)
  }
}
module.exports = View