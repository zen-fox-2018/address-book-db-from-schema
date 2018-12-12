const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Database/address-book.db');

module.exports = db;