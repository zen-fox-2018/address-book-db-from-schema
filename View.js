class View {
  static error(err) {
    console.log(`Error:`);
    console.log(err);
  }

  static message(msg) {
    console.log(`Message:`);
    console.log(msg);
  }
}

module.exports = View