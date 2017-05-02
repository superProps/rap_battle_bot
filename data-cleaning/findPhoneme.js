const fs = require('fs');
// let path = require('path');
let text = fs.readFileSync('../data/phonemeData.txt').toString('utf-8');
let textByLine = text.split('\n');

function findPhoneme (word) {
    let reduced = textByLine.reduce(function (acc, el) {
        let key = el.split(' ');
        // removes empty string space and 1 letter phonemes (which are not useful for rhyming)
        let majorPhonemes = key.slice(1).filter(function (el) {
        return el.length > 1;
        });
        let numberOfPhonemes = key.slice(1).length;
        acc[key[0]] = {majorPhonemes, numberOfPhonemes};
        return acc;
    }, {});
    return reduced[word];
}

module.exports = findPhoneme;