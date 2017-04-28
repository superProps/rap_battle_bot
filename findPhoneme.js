var fs = require("fs");
var path = require('path');

var text = fs.readFileSync("./data.txt").toString('utf-8');
var textByLine = text.split("\n");


function findPhoneme (word) {
    var reduced = textByLine.reduce(function (acc, el) {
        var key = el.split(" ");
        // removes empty string space and 1 letter phonemes (which are not useful for rhyming)
        var majorPhonemes = key.slice(1).filter(function (el) {
        return el.length > 1;
        })
        var numberOfPhonemes = key.slice(1).length;
        acc[key[0]] = {majorPhonemes, numberOfPhonemes};
        return acc;
    }, {});
    return reduced[word];
}

module.exports = findPhoneme;