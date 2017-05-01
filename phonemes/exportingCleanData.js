var fs = require('fs');
var text = fs.readFileSync('./cleanData6.txt', "utf8");

const newString = "[" + text + ']';
console.log(newString);
module.exports = JSON.parse(text);