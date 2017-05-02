const mongoose = require('mongoose');
const LyricsModel = require('../dbSeed/newSchema');
const db = 'mongodb://localhost:27017/lyricsRapBattle';
// const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
const _ = require('underscore');
const async = require('async');

// Maybe grab other random lines for safety. If there aren't enough results then  push in random lyrics

function getRandomRap (keyWord) {

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
    });

    function getFirstLineAndLastWord (next) {
        LyricsModel.find({
            keywords: {$all: [keyWord]}
        }, function (error, data) {
            if (error) {
                return console.log(error);
            }
            data = _.shuffle(data);
            let lastWord = data[0].lastWord;
            let raw = data[0].raw;
            let phonemes = data[0].majorPhonemes;
            next(null, {raw, lastWord, phonemes});
        });
    }

    function getRap (lastWordLyric, next) {
        let data = [];
        lastWordLyric.phonemes.forEach(function (el) {
            LyricsModel.find({
                phonemes: {$all: [el]}
            }, function (error, data) {
                if (error) {
                    return console.log(error);
                }
                data.push(data);
            });
        });
        data = _.shuffle(data);
        let newLines = data.slice(0, 3);
        lastWordLyric.newLines = newLines;
        next(null, lastWordLyric);
    }
}

getRandomRap('power');

module.exports = getRandomRap;