var fs = require('fs');
var text = fs.readFileSync('./cleanData.txt', "utf8");

const newString = "module.exports = [" + text + ']';
console.log(newString);
module.exports = newString;