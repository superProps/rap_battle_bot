var fs = require('fs');
var text = fs.readFileSync('./LYRICS_SIXTH_1000.txt', "utf8");

const newString = "[" + text + ']';
console.log(newString);
module.exports = JSON.parse(newString);