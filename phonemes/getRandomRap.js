const mongoose = require('mongoose');
const LyricsModel = require('../dbSeed/newSchema');
// const db = 'mongodb://admin:password@54.198.104.223/rapBattleLyrics';
const db = 'mongodb://localhost:27017/lyricsRapBattle';
const _ = require('underscore');
const async = require('async');

// Maybe grab other random lines for safety. If there are results then just push in random lyrics

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
        console.log('Results: ', results);
    });

    function getFirstLineAndLastWord (next) {
        LyricsModel.find({
            keywords: {$all: [keyWord]}
        }, function (error, data) {
            if (error) return console.log(error);
            data = _.shuffle(data);
            let lastWord = data[0].lastWord;
            let firstLine = data[0].raw;
            next(null, {firstLine, lastWord});
        });
    }

    function getRap (lastWordLyric, next) {
        LyricsModel.find({
            rhymes: {$all: [lastWordLyric.lastWord]}
        }, function (error, data) {
            if (error) return console.log(error);
            data = _.shuffle(data);
            let newLines = data.slice(0, 3);
            lastWordLyric.newLines = newLines;
            next(null, lastWordLyric);
        });
    }

}

getRandomRap('sidewalk');

module.exports = getRandomRap;