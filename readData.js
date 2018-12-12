const fs = require('fs');
class readData {
  static readFile(file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.split('\n'));
      }
    });
  }

  static readData(file, callback) {
    readData.readFile(file, (err, rawData) => {
      if (err) {
        callback(err, null);
      } else {
        rawData = rawData.map( e => e.split(','));
        callback(null, rawData);
      }
    })
  }}


module.exports = readData;

//
// seedData.readData('./dummy.csv', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })
