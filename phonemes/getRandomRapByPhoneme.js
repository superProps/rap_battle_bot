const mongoose = require('mongoose');
const LyricsModel = require('./newSchema');
const db = 'mongodb://localhost:27017/lyrics';
const _ = require('underscore');
const async = require('async');

// Maybe grab other random lines for safety. If there aren't enough results then  push in random lyrics

function getRandomRap(keyWord) {
    
    mongoose.connect(db, (err) => {
        if (err) {
            console.log(err);
        }
        else console.log(`connected to ${db}`);
    });

    async.waterfall([
        getFirstLineAndLastWord,
        getRap
    ], function (err, results) {
        if (err) console.log(err);
        console.log("getRandomRap results: ", results);
    });

    function getFirstLineAndLastWord(next) {
        LyricsModel.find({
            keywords: { $all: [keyWord] }
        }, function (error, data) {
            if (error) {
                return console.log(error);
            }
            data = _.shuffle(data);
            lastWord = data[0].lastWord;
            var raw = data[0].raw;
            var phonemes = data[0].majorPhonemes;
            next(null, { raw, lastWord, phonemes })
        });
    }

    function getRap(lastWordLyric, next) {
        LyricsModel.find({
            rhymes: { $all: [lastWordLyric.lastWord] }
        }, function (error, data) {
            if (error) {
                return console.log(error);
            }
            data = _.shuffle(data);
            var newLines = data.slice(0, 3);
            lastWordLyric.newLines = newLines;
            next(null, lastWordLyric);
        });
    }
}

getRandomRap("money");

module.exports = getRandomRap;