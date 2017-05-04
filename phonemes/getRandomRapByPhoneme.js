const mongoose = require('mongoose');
const LyricsModel = require('../dbSeed/newSchema');
const db = 'mongodb://localhost:27017/lyricsRapBattle';
// const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
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
        console.log('getRandomRap results: ', results);
        results.newLines.forEach(function (el) {
            console.log(el.majorPhonemes);
        });
    });

    function getFirstLineAndLastWord(next) {
        LyricsModel.find({
            keywords: { $all: [keyWord] }
        }, function (error, data) {
            if (error) {
                return console.log(error);
            }
            data = _.shuffle(data);
            let lastWord = data[0].lastWord;
            let raw = data[0].raw;
            let phonemes = data[0].majorPhonemes;
            let numberOfPhonemes = data[0].numberOfPhonemes;
            next(null, { raw, lastWord, phonemes, numberOfPhonemes });
        });
    }

    function getRap(lastWordLyric, next) {
        // here might want to check how many phonemes there were in lastWord and add these to the query array below if more than one.
        console.log(lastWordLyric.numberOfPhonemes);
        let phonemeToFind = lastWordLyric.phonemes[lastWordLyric.phonemes.length - 1];
        let query = {};
        // need to have specific queries for specific cases:
        // if the number of Phonemes is greater than 5 (and)
        if (lastWordLyric.numberOfPhonemes > 5) {
            query['numberOfPhonemes'] = '$gt';
        }
        else {
        query['numberOfPhonemes'] = '$lt';
        }
        console.log(phonemeToFind);
        LyricsModel.find({
            majorPhonemes: { $all: [lastWordLyric.phonemes[0]] }
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

getRandomRap('headphones');

module.exports = getRandomRap;